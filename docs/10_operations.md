# Vận hành, phát hành và khôi phục

Trạng thái: runbook phát triển hiện có và kế hoạch production đề xuất. Đã chọn Cloudflare R2 làm object storage ban đầu; chưa có cấu hình hoặc tích hợp production, worker hay pipeline tự động trong repo.

Khóa và thông tin kết nối R2 chỉ đặt trong cấu hình bí mật của server khi triển khai, không đưa vào dashboard admin, DB cấu hình giá/giới hạn, frontend, audit hay worklog. Dashboard admin chỉ chỉnh giá gói và các giới hạn sử dụng đã được duyệt; theo dõi phiên thay đổi để không sửa kỳ shop đã trả.

## Môi trường

| Môi trường | Mục đích | Yêu cầu cách ly |
| --- | --- | --- |
| Local | Phát triển | DB/Redis Compose bind localhost; dữ liệu giả |
| Test | Integration tự động | DB riêng; không tái dùng DATABASE_URL chứa dữ liệu thật |
| Staging, đề xuất | Nghiệm thu cấu hình gần production | Secrets, bucket, DB và domain riêng; không gửi thông báo tới người dùng thật |
| Production, chưa chọn | Shop sử dụng | HTTPS, mạng DB riêng, backup, giám sát, quyền quản trị giới hạn |

## Khởi chạy local hiện tại

1. Node 22+ và Docker Desktop theo README; cài dependency bằng `npm install` hoặc `npm ci` khi lockfile đã đồng bộ.
2. Tạo `.env` từ `.env.example` và thay thông tin admin bằng giá trị riêng; không commit .env.
3. `docker compose up -d db redis`; kiểm tra health trước migrate.
4. `npm run db:migrate`; `npm run admin:create` chỉ khi cần tạo admin ban đầu.
5. Chạy riêng `npm run dev:backend`, `npm run dev:realtime`, `npm run dev:frontend`; mở frontend 127.0.0.1:5173.
6. Kiểm tra đăng nhập, admin xét duyệt và /health trực tiếp ở backend/realtime. Vite hiện chỉ proxy /api và /ws, không proxy /health.

Không dùng Compose local làm cấu hình production. Không chạy `docker compose down -v` như bước dọn thông thường vì có thể xóa dữ liệu DB.

## Biến môi trường có trong mẫu

| Tên | Vai trò | Phạm vi |
| --- | --- | --- |
| DATABASE_URL | Kết nối PostgreSQL ứng dụng | Backend/realtime/script |
| TEST_DATABASE_URL | DB test riêng | Test và migrate --test |
| API_PORT, WS_PORT | Cổng HTTP/realtime | Server và proxy Vite |
| PG_POOL_MAX | Giới hạn pool mỗi tiến trình | Tổng cần tính cả replica/script/worker |
| PG_CONNECT_TIMEOUT_MS | Thời gian chờ kết nối | Mỗi pool |
| REDIS_URL | Cache tùy chọn có fallback | Backend |
| ADMIN_EMAIL, ADMIN_PASSWORD | Bootstrap admin | Script tạo admin; không đưa vào frontend |

NODE_ENV=production bật Secure cookie trong source hiện tại. Chưa có biến cấu hình media/outbox/email; chỉ thêm khi chọn triển khai thực. Không nhúng giá trị secret vào tài liệu, ảnh chụp hoặc log. Chỉ các biến công khai được duyệt mới được bundle vào frontend.

## Cấu hình triển khai

Topology và thứ tự tăng bản sao xem [kiến trúc](6_architecture.md). Khi cấu hình production: HTTPS cùng origin cho frontend/API/WS, proxy giữ Host/Origin phù hợp và hỗ trợ Upgrade; DB/Redis trong mạng riêng. Chỉ tăng realtime sau phát liên tiến trình/resume. Không dùng Compose local làm production. Chọn domain/storage/ngân sách/người vận hành theo DEC-11/12, không tự bổ sung dịch vụ hoặc secret.

## Trình tự phát hành đề xuất

1. Chốt release theo yêu cầu đã duyệt; review diff, secrets, migration, quyền và kết quả test.
2. Build artifact cố định theo commit; kiểm tra staging và smoke test luồng trọng yếu.
3. Xác nhận backup có thể restore; ghi phiên bản schema, cấu hình và đường dẫn artifact trong hồ sơ phát hành an toàn.
4. Chạy migration từ một tiến trình được chỉ định. Script hiện tại chưa có khóa điều phối nhiều runner, không chạy đồng thời.
5. Triển khai backend/realtime tương thích schema; frontend tiếp theo; worker theo khả năng tương thích sự kiện/schema.
6. Kiểm tra health, đăng nhập, quyền shop/admin, DB pool, tỷ lệ lỗi và độ trễ. Khi có nghiệp vụ mới kiểm tra chat/hold/worker tương ứng.
7. Mở thử theo nhóm shop đã duyệt, theo dõi và ghi kết quả. Không công bố mốc tải chưa đo.

## Rollback và dữ liệu

Rollback ứng dụng về artifact trước chỉ khi schema còn tương thích. Migration phá hủy không tự rollback bằng đổi code. Nếu dữ liệu đã ghi theo schema mới, cần phương án forward fix hoặc restore được chủ dự án duyệt; đánh giá mất dữ liệu và thời gian dừng trước thao tác. Không tự restore production để thử.

Backup đề xuất gồm DB, object storage, cấu hình không chứa secret và danh sách secret cần khôi phục qua kho an toàn. Mã hóa, quyền đọc giới hạn, kiểm tra định kỳ. Chốt tần suất/retention/RPO/RTO tại DEC-11. Bài restore thực hiện ở môi trường cách ly, kiểm tra đăng nhập, lịch sử, media, hold và công việc đang chờ.

## Giám sát và xử lý sự cố

| Dấu hiệu | Kiểm tra đầu tiên | Hành động có kiểm soát |
| --- | --- | --- |
| API chậm/lỗi tăng | DB pool, query chậm, lock, CPU, event loop | Giới hạn tải, tìm query/lock; không tăng pool vô điều kiện |
| Redis lỗi | Cache miss/fallback, lỗi kết nối | Cho DB fallback theo thiết kế; theo dõi tải DB |
| WS mất kết nối | Proxy Upgrade, heartbeat, phiên, số socket | Client reconnect có backoff; tải lại dữ liệu HTTP |
| Hold hết hạn xử lý chậm | Worker lag, transaction, backlog | Quyền giữ vẫn theo giờ DB; sửa job rồi chạy lại idempotent |
| Outbox/media backlog | Retry, lỗi storage/consumer, quota | Dừng retry vô hạn, xử lý poison event; không bỏ lịch sử âm thầm |
| Webhook cọc COD chậm hoặc thiếu, khi đã tích hợp | Log giao dịch phía bên cung cấp, trạng thái lượt chờ theo giờ DB, mã tham chiếu và giao dịch trùng/sai | Đối soát với tài khoản shop bán qua kênh đã chọn; không tự tạo đơn từ lượt hết hạn hoặc lấy lại máy đã thuộc giao dịch khác; lưu vết xử lý và hướng khách tới shop khi cần |
| Webhook nạp số dư chợ chậm/thiếu hoặc không khớp, khi đã tích hợp | Lượt nạp, mã tham chiếu, giao dịch thực nhận vào tài khoản nền tảng và bút toán đã ghi | Shop thiếu mã/sai số tiền nhắn riêng admin; admin kiểm tra tiền thực nhận, đúng shop và giao dịch chưa được cộng trước khi cộng thủ công. Ghi actor/lý do/giao dịch gốc; webhook đến sau không cộng lại. Webhook thất lạc và nhà cung cấp còn cần quy trình riêng |
| Nghi rò dữ liệu | Actor/request ID, quyền, audit | Hạn chế truy cập liên quan, thu hồi phiên, giữ bằng chứng an toàn |

Theo dõi request ID, lỗi theo endpoint, p50/p95/p99, pool waiting, lock, Redis fallback, socket/reconnect, tuổi job/outbox lâu nhất, dung lượng storage và lần backup/restore gần nhất. Ngưỡng cảnh báo và người nhận phải được chốt theo SLO; không log mật khẩu, cookie, nội dung chat hoặc URL ký.

## Mở thử và hỗ trợ

Chỉ định người vận hành, kênh hỗ trợ và khung thời gian trực; hướng dẫn shop cập nhật còn hàng, thao tác giữ, hủy và nhận biết trạng thái. Có quy trình báo tin sai, xin xem xét hồ sơ, mất tài khoản và sự cố giao dịch; quyền admin tương ứng chờ DEC-10. Bộ quy định phải được chủ nền tảng duyệt trước áp dụng, đặc biệt phí, bảo hành/trả hàng, dữ liệu và tranh chấp.

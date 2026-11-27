# Đọc và tổng hợp toàn bộ dự án

- Ngày: 2026-11-27
- Agent: Antigravity
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng yêu cầu đọc toàn bộ dự án `setupSourceVibeCode` để nắm tổng thể. Phạm vi khảo sát gồm:
- Trạng thái Git và cấu trúc thư mục toàn repo (trừ `node_modules/`, `.git/`, `apps/frontend/dist/`, `package-lock.json` và không đọc `.env`).
- Các tài liệu gốc và quản trị: `README.md`, `MAP.md`, `SPEC.md`, `PLAN.md`, `AGENTS.md`, `CLAUDE.md`, `MULTI_AGENT.md`, `governance/README.md`, `governance/github-main-ruleset.json`, `contexte/decisions.md`.
- Toàn bộ 12 tài liệu thiết kế trong `docs/` (`1_README.md` đến `12_open-decisions.md`) và `docs/worklog/README.md`.
- Toàn bộ mã nguồn, cấu hình, migration, script và test hiện có: `package.json`, `compose.yaml`, `.env.example`, `.gitignore`, `.gitattributes`, `apps/backend/`, `apps/frontend/`, `apps/realtime/`, `packages/platform/`, `db/migrations/`, `scripts/`, `test/`.

Không chỉnh sửa mã nguồn ứng dụng, migration hay tài liệu nghiệp vụ hiện hành; không đụng vào thay đổi chưa commit của người dùng.

## Thực hiện
1. Kiểm tra `git status` và `git log -n 15`: repo đang ở nhánh `main` (commit mới nhất `c51c34a`), hiện có 14 file tài liệu/kế hoạch đang sửa chưa commit (`PLAN.md`, `SPEC.md`, `contexte/decisions.md`, `docs/2_requirements.md`..`docs/12_open-decisions.md`) cùng các worklog mới từ 2026-11-21 đến 2026-11-27 chưa theo dõi (tổng 223 file trước khi thêm log này trong `docs/worklog/`).
2. Đọc toàn bộ mã nguồn hiện có:
   - Kiến trúc 3 tiến trình (modular monolith): `apps/backend` (Fastify 5, `identity` và `shops` theo `route -> service -> repository`), `apps/realtime` (`ws` xác thực `/ws` cùng origin và phiên admin/shop approved, heartbeat 30s, chưa có chat), `apps/frontend` (Vite 8 vanilla JS/CSS proxy `/api` và `/ws`).
   - `packages/platform`: pool PostgreSQL (`pg`), session cookie `chonguon_session` lưu SHA-256 trong DB, Redis cache-aside có khóa phiên bản và fallback DB cho hàng đợi admin shop (TTL 15s).
   - `db/migrations/`: mới có `001_identity.sql` (`schema_migrations`, `users`, `shops`, `sessions`) và `002_shop_admin_queue.sql` (index hàng đợi admin).
   - `scripts/` và `test/`: migrate, tạo admin, check worklog; 4 file test (`cache`, `realtime-auth`, `shop-approval`, `shop-pagination`).
3. Đọc toàn bộ bộ 12 tài liệu `docs/` và `contexte/decisions.md`:
   - Nắm đầy đủ phạm vi sản phẩm chính thức: chợ B2B iPhone secondhand (category Apple mở rộng được), tài khoản/xét duyệt shop (hồ sơ 30 ngày, nhận xét tham khảo, tạm khóa shop, ẩn tin vi phạm), catalog/tồn kho/tin 90+3 ngày/IMEI không unique/kho Đã bán, hợp tác lấy nguồn một chiều & website shop, CTV (lời mời 7 ngày, 1 shop active, giá theo mốc giá bán B, request không chứa thông tin khách), giữ máy trực tiếp 12–72 giờ, đơn web trả đủ (15 phút) và COD (lượt chờ cọc QR/webhook 15 phút, cọc <= 10% và < P-S), phí gói tháng (499k chợ gồm CTV, 200k web mẫu, 14 ngày trải nghiệm + 100k số dư tặng), phí resell 50k & ngưỡng nợ -100k / mở lại ở 0đ, nạp ví QR/webhook, media trên Cloudflare R2 và các NFR/kiểm thử/vận hành.
4. Ghi nhận các điểm còn lệch/cũ trong repo để báo người dùng:
   - `CLAUDE.md` vẫn ghi repo chưa có ứng dụng hay stack được chọn.
   - Thư mục `src/` cũ còn tồn tại nhưng rỗng sau khi tách sang `apps/backend/`.
   - Một số đoạn tàn dư từ quy tắc cũ "Mở bán lại trên đơn cũ / miễn phí chuỗi trả hàng" chưa được dọn sạch sau đính chính ngày 2026-11-27 tại `SPEC.md` (dòng 39), `docs/4_screens.md` (dòng 82), `docs/8_api-contracts.md` (dòng 194), `docs/12_open-decisions.md` (dòng 20, 42) và `PLAN.md` (dòng 40).
   - Một số dòng trạng thái cũ trong `docs/6_architecture.md` (dòng 68 ghi giá/gói chưa chốt), `docs/2_requirements.md` (dòng 229) và `docs/12_open-decisions.md` (dòng 44) còn nhắc các mục đã chốt; ngày cập nhật tiêu đề một số file vẫn là `2026-11-19`.

## Quyết định
Không có

## Kiểm chứng
- Đọc trực tiếp toàn bộ file nguồn, cấu hình (trừ `.env`), migration, script, test, tài liệu gốc, bộ 12 tài liệu `docs/` và `contexte/decisions.md`.
- Chạy `node scripts/check-worklog.mjs 2026-11-27-antigravity-read-full-project.md` để xác nhận định dạng và các mục bắt buộc của worklog.
- Không chạy `npm test` hay kết nối PostgreSQL/Redis vì đây là nhiệm vụ khảo sát chỉ đọc.

## Còn lại
- Chưa đọc chi tiết nội dung 222 file worklog lịch sử trong `docs/worklog/` (quyết định và đặc tả chuẩn đã tổng hợp tại `contexte/decisions.md` và bộ 12 tài liệu `docs/`).
- Các bước tiếp theo đề xuất cho chủ dự án: rà và dọn các đoạn tàn dư/lệch tài liệu nhỏ đã phát hiện, commit đợt cập nhật docs ngày 2026-11-21..27 nếu đã xong review, rồi tiếp tục chốt các quyết định mở còn lại trong `docs/12_open-decisions.md` (nhà cung cấp thanh toán/webhook, chi tiết email/mail lỗi, định dạng/giới hạn ảnh/tệp, chat/retention, quyền admin đọc chat/khiếu nại, hạ tầng/SLO) trước khi code các module mới.

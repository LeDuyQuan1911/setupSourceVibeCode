# Nền hiệu suất trước khi tăng bản sao

- Ngày: 2026-11-09
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Cải thiện khả năng chịu tải và chốt hướng phân tán, lựa chọn thuật toán trước khi tăng số tiến trình; áp dụng vào những luồng đã có, không tạo dịch vụ phân tán giả cho nghiệp vụ chưa xây.

## Thực hiện

Đưa hash mật khẩu ra trước lúc lấy client DB và mở transaction. Cấu hình pool tối đa và thời hạn chờ kết nối qua biến môi trường. Thêm index và cursor cho danh sách admin, cập nhật frontend “Xem thêm shop”. WebSocket ping/pong định kỳ để dọn kết nối chết. Viết `docs/performance-scaling.md`, cập nhật kiến trúc, bản đồ, README, kế hoạch và quyết định.

## Quyết định

Giữ PostgreSQL làm nguồn nhất quán; không thêm broker hoặc microservice khi chưa có chat/tồn kho và số đo. Tin đăng tương lai dùng phân trang theo khóa; giữ hàng dùng transaction/ràng buộc DB; chat lưu trước rồi phát. Mốc 200 request/phút là mục tiêu kiểm thử, không phải khả năng đã xác nhận.

## Kiểm chứng

Chạy migration `002_shop_admin_queue.sql` trên database test và phát triển. `npm test` đạt 3 bài, bao gồm phân trang 30 shop; `npm run build:frontend` thành công. Kiểm tra worklog và `git diff --check` trước bàn giao.

## Còn lại

Chưa có dữ liệu/tác vụ tin đăng, chat hay giữ hàng để đo tải và kiểm chứng thuật toán; chưa chạy benchmark 200 request/phút. Khi triển khai các module đó, đo truy vấn và tải trước khi tăng bản sao; production cần reverse proxy, lưu trữ tệp, monitoring và backup.

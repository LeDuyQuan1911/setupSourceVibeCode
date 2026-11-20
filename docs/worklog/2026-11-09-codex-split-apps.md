# Tách frontend, backend và WebSocket

- Ngày: 2026-11-09
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Tách source hiện có thành frontend, API backend và tiến trình WebSocket riêng; giữ luồng tài khoản/xét duyệt đang chạy.

## Thực hiện

Chuyển code hiện có vào `apps/backend` và `apps/frontend`; thêm `apps/realtime` với WebSocket `/ws` và kiểm tra phiên, quyền shop đã duyệt, cùng origin. Đặt pool PostgreSQL và session trong `packages/platform`, cấu hình Vite proxy, cập nhật lệnh chạy và tài liệu kiến trúc.

## Quyết định

Giữ nghiệp vụ trong backend modular monolith; realtime là tiến trình riêng dùng cùng phiên DB. Frontend gọi `/api` và `/ws` qua cùng origin; production cần reverse proxy. Chưa triển khai chat khi chưa có module hội thoại.

## Kiểm chứng

`npm test` đạt 2 bài tích hợp với PostgreSQL test; `npm run build:frontend` thành công. Chạy thử ba tiến trình: frontend trả 200, API qua Vite proxy trả 401 khi chưa đăng nhập, WebSocket qua proxy trả 401 khi chưa có phiên. `git diff --check` đạt.

## Còn lại

Chat, lưu tin nhắn/tệp, phát sự kiện giữa nhiều bản sao và reverse proxy production chưa triển khai; thực hiện khi xây module hội thoại và triển khai hệ thống.

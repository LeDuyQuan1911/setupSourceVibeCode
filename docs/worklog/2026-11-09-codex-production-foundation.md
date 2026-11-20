# Nền ứng dụng chính thức

- Ngày: 2026-11-09
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Bỏ hướng ứng dụng MVP riêng; bắt đầu source chính thức theo module, có nền dữ liệu và luồng shop đăng ký/admin duyệt.

## Thực hiện

Xóa kế hoạch MVP riêng, tạo source chính thức `src/` theo module, lược đồ PostgreSQL và migrations, API/giao diện đăng ký/đăng nhập/admin xét duyệt, Docker Compose cục bộ, tài liệu chạy và kiến trúc. Cập nhật `README.md`, `MAP.md`, `SPEC.md`, `PLAN.md`, `contexte/decisions.md`.

## Quyết định

Chọn Fastify + PostgreSQL làm nền đầu tiên; một ứng dụng theo module, tách route nghiệp vụ và migrations. Chưa tách microservice trước khi có số liệu tải. Admin ban đầu được tạo bằng lệnh CLI với mật khẩu từ `.env` cục bộ.

## Kiểm chứng

`npm install` thành công, không thấy cảnh báo lỗ hổng; migration chạy trên PostgreSQL cục bộ. `npm test` đạt luồng đăng ký → chờ duyệt → shop không tự duyệt → admin duyệt. `/health` trả 200, trang chủ trả 200; `git diff --check` đạt.

## Còn lại

Source chính thức mới có luồng tài khoản/xét duyệt. Chưa có tin đăng, chat, giữ hàng hoặc triển khai production; xem `PLAN.md` và `docs/architecture.md`.

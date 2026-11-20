# Hoàn thiện kiến trúc trước tính năng

- Ngày: 2026-11-09
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ưu tiên thiết lập kiến trúc và cấu trúc source chính thức trước khi phát triển thêm tính năng.

## Thực hiện

Viết lại `docs/architecture.md` với sơ đồ hệ thống, cấu trúc module, chủ sở hữu dữ liệu, trạng thái, quyền, giao tiếp giữa module, mở rộng và vận hành. Tách SQL khỏi route hiện có sang `repository.js`, quy tắc sang `service.js`; chuyển session về module identity. Cập nhật `AGENTS.md`, `MAP.md`, `README.md`, `PLAN.md` và quyết định dự án.

## Quyết định

Giữ modular monolith làm nền, chia source theo nghiệp vụ và route → service → repository. Thành phần chưa triển khai được ghi là thiết kế, không nhận là tính năng đã chạy.

## Kiểm chứng

`npm test` đạt bài kiểm tra đăng ký → chờ duyệt → admin duyệt sau refactor. Kiểm tra cú pháp và `git diff --check` đạt.

## Còn lại

Cần chốt môi trường triển khai, chính sách tệp và các quy tắc nghiệp vụ còn mở trước khi triển khai module liên quan. Chưa phát triển thêm tính năng chợ trong lượt này.

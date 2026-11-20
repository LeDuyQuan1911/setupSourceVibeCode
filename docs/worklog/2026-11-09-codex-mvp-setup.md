# Setup không gian MVP

- Ngày: 2026-11-09
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Tạo cấu trúc làm MVP riêng trước khi xây hệ thống chính có nhiều tính năng và người dùng.

## Thực hiện

Tạo `mvp/README.md` và `docs/mvp-delivery.md`; cập nhật `README.md`, `MAP.md`, `SPEC.md`, `PLAN.md` và `contexte/decisions.md` để tách đường xây MVP và hệ thống chính.

## Quyết định

MVP cần chạy được các luồng B2B đã chốt và thử với shop. Stack ứng dụng được chọn khi bắt đầu code; kiến trúc chính được quyết định sau khi đánh giá MVP và nhu cầu tải.

## Kiểm chứng

Kiểm tra đường dẫn tài liệu, `git diff --check` và `node scripts/check-worklog.mjs 2026-11-09-codex-mvp-setup.md`. Repo chưa có ứng dụng nên chưa có build/test.

## Còn lại

Chưa chọn stack/môi trường chạy hoặc tạo code MVP; cần chốt những quy tắc vận hành còn mở trong quá trình xây từng luồng.

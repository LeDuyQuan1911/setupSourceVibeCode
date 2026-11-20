# Chốt thông tin tin đăng iPhone

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi bộ thông tin bắt buộc khi shop đăng một chiếc iPhone secondhand theo danh sách người dùng đã chốt.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` với bộ trường bắt buộc cho mỗi tin iPhone.

## Quyết định

Mỗi tin ứng với một chiếc máy cụ thể. Tình trạng iCloud chỉ là trạng thái máy, không chứa mật khẩu.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-iphone-listing-fields.md`. Chưa có ứng dụng để test.

## Còn lại

Cần chốt cách nhập và hiển thị các trường, cùng quy tắc kiểm tra tin sai.

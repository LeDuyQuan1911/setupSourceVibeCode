# Giữ hàng cho giao dịch trực tiếp

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Làm rõ giữ hàng phục vụ việc reseller gặp shop nguồn để lấy một máy; đơn online sẽ có luồng kiểm tra/khóa tồn kho riêng về sau.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` để tách giữ hàng trực tiếp khỏi khóa tồn kho đơn online.

## Quyết định

Giữ hàng là shop nguồn dành một máy cho reseller để hai shop gặp/lấy hàng trực tiếp. Đơn online có bước kiểm tra/khóa tồn kho riêng về sau.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-direct-hold-scope.md`. Chưa có ứng dụng để test.

## Còn lại

Thời hạn giữ hàng trực tiếp và cách khóa tồn kho online chưa chốt.

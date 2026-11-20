# Xác minh shop bằng admin và shop cũ

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi quy trình admin xét duyệt shop mới và cho shop cũ đánh giá dựa trên việc quen biết/giao dịch trước đó.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` về quy trình shop mới nộp hồ sơ, shop cũ đánh giá và admin xét duyệt.

## Quyết định

Admin quyết định cuối cùng; đánh giá từ shop cũ là thông tin tham khảo. Shop chờ duyệt chưa được giao dịch.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-06-codex-shop-verification.md`. Chưa có ứng dụng để chạy test.

## Còn lại

Chưa chốt thông tin hồ sơ, mẫu đánh giá, số lượng đánh giá cần thiết và cách xử lý trường hợp không có đánh giá hoặc đánh giá trái chiều.

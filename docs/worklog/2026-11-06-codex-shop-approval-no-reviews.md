# Duyệt shop khi chưa có đánh giá

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Cho phép admin tự kiểm tra và duyệt shop mới dù chưa có đánh giá từ shop cũ.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` để bỏ yêu cầu phải có đánh giá của shop cũ.

## Quyết định

Admin có thể tự kiểm tra và duyệt shop dù chưa có đánh giá; đánh giá cộng đồng chỉ là nguồn tham khảo.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-06-codex-shop-approval-no-reviews.md`. Repo chưa có ứng dụng để test.

## Còn lại

Cần chốt mẫu đánh giá và cách xử lý khi các shop cũ đưa ý kiến trái chiều.

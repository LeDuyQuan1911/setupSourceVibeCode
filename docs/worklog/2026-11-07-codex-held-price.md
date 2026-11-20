# Giữ giá cũ cho hàng đã được giữ

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi quy tắc lượt giữ hàng đã xác nhận dùng giá nguồn tại thời điểm giữ, dù shop nguồn đổi giá sau đó.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` về giá được lưu trên lượt giữ hàng đã xác nhận.

## Quyết định

Lượt giữ còn hiệu lực dùng giá tại thời điểm shop nguồn xác nhận giữ; giá niêm yết mới chỉ áp dụng cho lượt giữ mới.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-held-price.md`. Chưa có ứng dụng để test.

## Còn lại

Cần chốt thời điểm khóa giá cho đơn chưa có lượt giữ được xác nhận và các quy tắc về thời hạn giữ hàng.

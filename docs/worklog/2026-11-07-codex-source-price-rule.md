# Chốt quy tắc giá giữa shop nguồn và reseller

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi giá shop nguồn niêm yết, reseller tự đặt giá bán không thấp hơn giá nguồn và không có thương lượng giảm giá giữa hai shop.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` về giá lấy hàng và giá reseller.

## Quyết định

Shop nguồn niêm yết giá lấy hàng; reseller tự định giá bán cho khách không thấp hơn giá nguồn. Không thương lượng giảm giá riêng; shop nguồn tự sửa giá nếu muốn giảm.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-source-price-rule.md`. Chưa có ứng dụng để test.

## Còn lại

Cần chốt giá nào áp dụng khi shop nguồn đổi giá trong lúc có giữ hàng hoặc đơn đang mở.

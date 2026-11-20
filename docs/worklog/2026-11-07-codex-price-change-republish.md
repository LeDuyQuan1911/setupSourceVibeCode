# Giá nguồn thay đổi và treo lại sản phẩm

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi luồng thông báo, tạm ẩn và treo lại sản phẩm trên website reseller khi shop nguồn đổi giá, cùng quy tắc tính lại giá.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` về bảng thông báo, tạm ẩn, nút “Treo lại” và cách tính giá mới.

## Quyết định

Mỗi reseller phải chủ động treo lại. Mặc định giữ số tiền lời cũ; ngoại lệ khi giá nguồn mới cao hơn giá bán cũ thì giá bán mới bằng giá nguồn mới. Luồng thuộc giai đoạn website riêng.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-price-change-republish.md`. Chưa có ứng dụng để test.

## Còn lại

Giá áp dụng cho hàng đang giữ hoặc đơn đang mở khi shop nguồn đổi giá vẫn cần chốt.

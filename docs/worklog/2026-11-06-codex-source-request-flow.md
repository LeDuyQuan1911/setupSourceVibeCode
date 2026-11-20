# Sửa luồng xin nguồn hàng để treo website

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Làm rõ reseller gửi yêu cầu tới shop nguồn, shop nguồn chấp nhận hoặc từ chối, rồi reseller chọn sản phẩm cụ thể để treo; không tự cấp quyền hai chiều.

## Thực hiện

Sửa `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` để thể hiện yêu cầu lấy nguồn theo một chiều và bước reseller chọn từng sản phẩm.

## Quyết định

Quyền treo hàng chỉ phát sinh khi shop nguồn chấp nhận yêu cầu của reseller; không tự cấp quyền ngược lại. Mỗi sản phẩm do reseller chủ động chọn.

## Kiểm chứng

Kiểm tra `git diff --check`, tìm lại các mô tả quyền hai chiều và chạy `node scripts/check-worklog.mjs 2026-11-06-codex-source-request-flow.md`. Repo chưa có ứng dụng để chạy test.

## Còn lại

Cần chốt shop nguồn có thể giới hạn sản phẩm/danh mục được reseller chọn và cách xử lý đơn khi thu hồi quyền.

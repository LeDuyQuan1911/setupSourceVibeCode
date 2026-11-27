# Admin ẩn tin vi phạm

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt admin có thể ẩn riêng một tin vi phạm và thông báo shop nguồn cùng các shop reseller đang treo sản phẩm.

## Thực hiện
Đối chiếu DEC-10, tin nguồn, bản treo reseller và quyền giao dịch cũ. Cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm T-72.

## Quyết định
Admin ẩn riêng tin nguồn vi phạm; tin và mọi bản treo của đúng máy ngừng nhận giao dịch mới. Báo shop nguồn và từng reseller đang treo; giao dịch mở vẫn xử lý. Shop nguồn không tự gỡ cờ admin; các tin khác không bị ảnh hưởng.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-admin-hide-listing.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Chưa triển khai code; quy trình admin gỡ ẩn sau khắc phục còn mở ở DEC-10.

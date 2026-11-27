# Admin tạm khóa shop đã duyệt

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt quyền admin tạm khóa shop approved, ngừng giao dịch mới nhưng vẫn xử lý đơn/lượt giữ đã mở.

## Thực hiện
Đối chiếu DEC-10, quyền shop và luồng giao dịch cũ. Cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm T-70.

## Quyết định
Admin có quyền tạm khóa/mở shop approved; hàng nguồn và bản treo liên quan ngừng giao dịch mới, shop/CTV không tạo việc mới, giao dịch đã mở vẫn xử lý. Mở khóa chỉ gỡ lý do ẩn do khóa. Tác động tới đồng hồ gói còn mở.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-admin-shop-suspension.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Chưa triển khai code; quyền can thiệp admin khác và tác động của khóa tới thời gian gói đã trả còn mở ở DEC-10.

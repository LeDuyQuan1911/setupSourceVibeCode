# Website mẫu hết hạn gói

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt ảnh hưởng của gói website mẫu hết hạn khi gói chợ vẫn còn hiệu lực.

## Thực hiện
Đối chiếu FEE-01, STORE-01 và luồng đơn cũ; cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md và contexte/decisions.md. Bổ sung T-68.

## Quyết định
Gói website mẫu hết hạn thì website của đúng shop tạm ngừng hiển thị hàng và chặn đơn/QR mới; gói chợ/CTV còn hạn vẫn hoạt động, đơn/lượt chờ/COD website đã mở tiếp tục xử lý theo hạn riêng. Gia hạn website chỉ gỡ lý do tạm ngừng này.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-website-plan-expiry.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Chưa triển khai code; nhà cung cấp kết nối ngân hàng và xử lý tiền dư gói vẫn mở ở DEC-09.

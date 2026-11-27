# Thanh toán gói qua QR và webhook

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt phí gói tháng được thanh toán bằng QR vào tài khoản chợ, webhook xác nhận kích hoạt; khoản này tách khỏi số dư phí resell. Xác định vấn đề liên quan tiếp theo.

## Thực hiện
Đối chiếu FEE-01, DEC-09 và WAL-01; cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm case T-66.

## Quyết định
QR gói chuyển vào tài khoản chợ; webhook xác thực và đối chiếu đúng khoản tiền mới kích hoạt một kỳ. Tiền gói không khấu trừ số dư phí reseller; QR gói tách khỏi WAL-01 và cọc COD.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-plan-qr-webhook-payment.md`. Không chạy test ứng dụng vì chỉ sửa docs.

## Còn lại
Cần chốt khoản chuyển sai/thiếu mã, webhook thất lạc và nhà cung cấp kết nối; chưa triển khai code.

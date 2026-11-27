# Đối soát thủ công tiền gói

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt cách xử lý tiền mua/gia hạn gói chuyển sai số tiền, thiếu mã hoặc webhook không đến.

## Thực hiện
Đối chiếu FEE-01, DEC-09 và luồng đối soát WAL-01; cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm T-67.

## Quyết định
Shop nhắn admin; admin kiểm tra giao dịch ngân hàng thực nhận, đúng shop và đủ tiền gói rồi kích hoạt thủ công một lần. Ghi định danh giao dịch/audit để webhook đến sau hoặc hai admin xử lý không tạo kỳ thứ hai.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-plan-payment-manual-reconcile.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Nhà cung cấp webhook và cách xử lý phần tiền dư còn mở; chưa triển khai code.

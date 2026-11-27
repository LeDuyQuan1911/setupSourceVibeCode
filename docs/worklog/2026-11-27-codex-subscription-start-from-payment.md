# Kỳ gói bắt đầu từ thanh toán

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt kỳ gói tháng tính từ ngày shop thanh toán được xác nhận, không theo tháng lịch.

## Thực hiện
Đối chiếu FEE-01/DEC-09 và cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md, contexte/decisions.md. Thêm case T-65 cho shop thanh toán giữa tháng.

## Quyết định
Kỳ tháng bắt đầu từ ngày thanh toán gói được xác nhận cho shop, không theo tháng lịch. Không tự đặt biên kết thúc kỳ hoặc quy tắc gia hạn sớm khi chưa được chốt.

## Kiểm chứng
Rà tính nhất quán của các đoạn về kỳ gói, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-subscription-start-from-payment.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Cần chốt biên kết thúc kỳ, cách cộng thời gian nếu gia hạn trước hạn và cách xác nhận tiền gói; chưa triển khai code.

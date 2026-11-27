# Kỳ gói theo tháng

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt thời hạn gói tháng tính theo tháng từ lúc thanh toán được xác nhận, thay cho lựa chọn 30 ngày.

## Thực hiện
Đối chiếu FEE-01/DEC-09 và cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md, contexte/decisions.md. Làm rõ case T-65 cho ngày 15 và ngày 31.

## Quyết định
Kỳ theo tháng, cùng giờ/ngày tháng kế tiếp; tháng thiếu ngày dùng ngày cuối tháng và giữ ngày gốc cho các kỳ liên tục sau. Không tính cố định 30 ngày.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-subscription-calendar-month.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Cách cộng kỳ khi gia hạn sớm và xác nhận tiền gói còn mở; chưa triển khai code.

# Chỉ gia hạn gói sau khi hết hạn

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Bỏ khả năng gia hạn gói trước khi hết hạn; đồng bộ tài liệu kỳ gói.

## Thực hiện
Đã đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Bỏ giả định giữ ngày gốc qua kỳ sau trong ví dụ 31/01.

## Quyết định
Chỉ cho tạo khoản gia hạn từ đúng lúc gói hết hạn; khi thanh toán gia hạn được xác nhận, kỳ tháng mới tính từ lần xác nhận đó, không cộng vào hạn cũ.

## Kiểm chứng
Rà các câu còn nhắc gia hạn sớm, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-no-early-renewal.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Cách xác nhận tiền gói còn mở; chưa triển khai code.

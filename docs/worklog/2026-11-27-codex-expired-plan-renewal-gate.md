# Khóa shop khi gói tháng hết hạn

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định shop không gia hạn gói thì bị khóa thao tác và được yêu cầu gia hạn; làm rõ tác động tới giao dịch đã mở.

## Thực hiện
Đã đối chiếu FEE-01, DEC-09 và các luồng đơn/giữ hàng. Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Bổ sung case T-64 để kiểm tra chặn giao dịch mới nhưng tiếp tục xử lý giao dịch cũ.

## Quyết định
Shop hết hạn phải gia hạn trước khi làm việc mới; nguồn/bản treo liên quan không nhận giao dịch mới. COD, QR, đơn, request và lượt giữ đã mở trước hạn tiếp tục xử lý theo quyền và hạn sẵn có. Gia hạn chỉ gỡ lý do ẩn vì hết gói.

## Kiểm chứng
Đã rà các đoạn liên quan, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-expired-plan-renewal-gate.md`; không có lỗi nội dung. Đây là thay đổi tài liệu nên chưa chạy test ứng dụng.

## Còn lại
Chu kỳ tính ngày và cách thu/xác nhận tiền gia hạn còn mở ở DEC-09; chưa triển khai code.

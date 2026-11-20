# Đối soát COD không cần ảnh biên lai

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt A chỉ cần bấm “Đã chuyển” sau khi chuyển tiền đối soát COD cho B, không phải tải ảnh biên lai. Đồng bộ tài liệu trước triển khai; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md và 12_open-decisions.md. Ghi quyết định vào contexte/decisions.md; không sửa code.

## Quyết định
A chỉ bấm “Đã chuyển” sau khi chuyển tiền ngoài website; không bắt buộc tải ảnh biên lai/chứng từ. Lưu actor/thời điểm như quy tắc trước; nút bấm không xác thực tiền ngân hàng.

## Kiểm chứng
Rà các đoạn còn ghi chứng từ đối soát COD là câu hỏi mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-cod-settlement-no-receipt.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa triển khai code. Quy định chứng từ cho giao nhận, bảo hành hoặc tranh chấp ngoài thao tác đối soát COD vẫn là phần riêng cần chốt.

# Shop nguồn chịu phí COD

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt shop nguồn A là bên gửi nên A chịu phí COD cho đơn máy nguồn bán trên web reseller B. Đồng bộ tài liệu nghiệp vụ trước triển khai; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md, 12_open-decisions.md và ghi quyết định lâu dài trong contexte/decisions.md.

## Quyết định
A là bên gửi COD nên A chịu phí COD/ship của lượt gửi. Khoản này không giảm cọc B nhận, không đổi phí chợ B chịu và không trừ vào số A còn chuyển B `P − S − D`. Phí hoàn hàng khi COD giao thất bại là vấn đề riêng chưa chốt.

## Kiểm chứng
Rà công thức giá/cọc/đối soát và các đoạn còn để phí vận chuyển của lượt gửi COD là câu hỏi mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-source-pays-cod-fee.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa chốt phí hoàn hàng khi COD giao thất bại hoặc số phí thực tế của đơn vị vận chuyển; chưa triển khai code.

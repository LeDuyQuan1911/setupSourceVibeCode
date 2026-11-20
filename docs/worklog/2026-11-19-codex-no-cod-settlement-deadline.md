# Không đặt hạn chuyển tiền đối soát COD

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt khoản shop nguồn A chuyển cho reseller B sau COD thành công không có thời hạn cố định. Đồng bộ tài liệu trước triển khai; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md, 12_open-decisions.md. Ghi quyết định vào contexte/decisions.md; không sửa code.

## Quyết định
Khoản A chuyển B sau COD reseller thành công không có hạn cố định. Trạng thái chờ A bấm “Đã chuyển” không tự hết hạn hoặc tự hoàn tất/hủy theo thời gian; đơn đã giao thành công và máy sold không phụ thuộc mốc này.

## Kiểm chứng
Rà các đoạn còn ghi thời hạn đối soát COD là câu hỏi mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-no-cod-settlement-deadline.md` và `git diff --check` trước bàn giao.

## Còn lại
Yêu cầu chứng từ chuyển tiền A/B vẫn chưa chốt; chưa triển khai code.

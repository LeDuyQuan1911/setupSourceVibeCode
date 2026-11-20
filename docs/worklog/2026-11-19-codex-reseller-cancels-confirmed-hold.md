# B hủy lượt giữ đã được nguồn xác nhận

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt chủ shop B được hủy hold đã xác nhận trước khi A xác nhận bán thành công; A được báo, máy mở lại nếu đủ điều kiện, không thu phí chợ. Đồng bộ docs, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md và 12_open-decisions.md. Ghi quyết định vào contexte/decisions.md.

## Quyết định
Chủ shop B được hủy hold confirmed còn hiệu lực trước khi A complete. A được báo, không thu phí, máy chỉ mở lại khi đủ điều kiện; request khác đã rejected không phục hồi. Hủy cạnh tranh với complete/expire chỉ một trạng thái thắng; hold completed/expired không hủy được.

## Kiểm chứng
Rà quyền, state machine, dữ liệu/API và case cạnh tranh; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-reseller-cancels-confirmed-hold.md` và `git diff --check` trước bàn giao.

## Còn lại
Lý do hủy của B và bằng chứng A chốt giao dịch vẫn chưa chốt; chưa sửa code.

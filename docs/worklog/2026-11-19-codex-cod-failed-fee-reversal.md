# Hoàn phí chợ khi COD thất bại

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định khi COD giao thất bại thì cộng lại 50.000đ vào số dư phí chợ của đúng shop bán đã chịu phí; phân biệt khoản hoàn phí chợ với tiền cọc khách hàng. Cập nhật tài liệu, không sửa code.

## Thực hiện
Đồng bộ quyết định hoàn phí chợ 50.000đ khi COD thất bại vào `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/11_rules.md`, `docs/12_open-decisions.md`; ghi quyết định mới trong `contexte/decisions.md`. Không sửa code/cấu trúc file.

## Quyết định
Khi nguồn xác nhận COD giao thất bại, hoàn 50.000đ phí chợ vào đúng số dư shop bán từng bị trừ cho đơn đó. Hoàn tối đa một lần, không cộng tiền nếu không có khoản trừ gốc. Khoản này tách khỏi cọc khách do shop tự xử lý ngoài website.

## Kiểm chứng
Đối chiếu FEE-02/T-33, workflow, quyền và dòng tiền; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-cod-failed-fee-reversal.md`, kiểm tra trùng mã/liên kết Markdown và `git diff --check`.

## Còn lại
Cần chốt thời điểm trừ phí ban đầu, nạp/thiếu số dư và chi tiết ghi sổ. Chưa có module COD/số dư trong code nên chưa kiểm chứng runtime.

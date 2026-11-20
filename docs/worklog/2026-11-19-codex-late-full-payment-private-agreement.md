# Tiền trả đủ đến muộn do khách và shop thỏa thuận

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt trường hợp hiếm khách chuyển đủ tiền sau hạn 15 phút thì khách nhắn riêng shop bán để thỏa thuận. Đồng bộ ranh giới xử lý trong tài liệu; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md và 12_open-decisions.md. Ghi quyết định lâu dài trong contexte/decisions.md.

## Quyết định
Sau hạn 15 phút, đơn trả đủ mất quyền giữ máy và tiền đến muộn không tự ghi Đã mua. Khách nhắn riêng shop để đối chiếu/thỏa thuận giá và cách xử lý; website không tự chọn giá cũ hay mới. Shop chỉ xác nhận bán thủ công sau thỏa thuận nếu máy còn bán được và khóa lại được; nếu máy đã bị giao dịch khác chiếm thì xử lý hoàn tiền.

## Kiểm chứng
Rà các đoạn còn ghi giá xác nhận tiền muộn là quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-late-full-payment-private-agreement.md` và `git diff --check` trước bàn giao.

## Còn lại
Quy trình hoàn tiền trả đủ vẫn chưa chốt; chưa sửa code.

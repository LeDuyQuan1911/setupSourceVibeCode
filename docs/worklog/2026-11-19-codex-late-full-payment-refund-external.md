# Hoàn tiền trả đủ đến muộn ngoài website

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn khách tự nhắn shop để xử lý khoản trả đủ đến muộn khi máy không còn; không xây bước website can thiệp. Người dùng xác nhận “không can thiệp” là chợ/website, còn shop nhận tiền tự trao đổi và hoàn cho khách ngoài website.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md và 12_open-decisions.md. Ghi quyết định lâu dài trong contexte/decisions.md.

## Quyết định
Khách nhắn riêng shop nhận khoản tiền đến muộn; shop tự xử lý hoàn ngoài website nếu máy không còn. Website không có nút/trạng thái hoàn tiền cho ngoại lệ này, không can thiệp vào việc chuyển tiền; đơn cũ không tự bán hoặc chiếm lại máy.

## Kiểm chứng
Rà các đoạn còn ghi quy trình hoàn tiền trả đủ đến muộn là quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-late-full-payment-refund-external.md` và `git diff --check` trước bàn giao.

## Còn lại
Không có. Chưa sửa code vì ngoại lệ hoàn tiền được xử lý ngoài website.

# Chốt phí chợ cho đơn reseller trả đủ

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng xác nhận khách mua máy resell trên website và thanh toán đủ một lần vẫn làm reseller chịu phí chợ 50.000đ khi thanh toán được xác nhận. Ghi quyết định rõ trong tài liệu, không sửa code.

## Thực hiện
Đã đọc trạng thái repo và các tài liệu nền. Kiểm tra SPEC, PLAN, FEE-02, workflow, API, T-33: các file này đã ghi đúng mốc trừ phí khi đơn reseller trả đủ được xác nhận thanh toán. Sửa `contexte/decisions.md` để nêu rõ mốc này được chủ dự án xác nhận, không còn là suy luận từ luồng COD.

## Quyết định
Đơn máy nguồn bán trên website reseller bằng hình thức trả đủ một lần chịu phí chợ 50.000đ từ số dư reseller khi thanh toán đủ được xác nhận/Đã mua; shop tự bán máy của mình không chịu phí.

## Kiểm chứng
Rà quy tắc trong SPEC, PLAN, FEE-02, workflow, API và T-33; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-19-codex-full-payment-resell-fee.md` trước bàn giao.

## Còn lại
Cơ chế nạp tiền/hiện lại sản phẩm và xử lý nhiều giao dịch đã mở cùng cần trừ phí khi gần hạn mức âm vẫn chưa chốt. Không có thay đổi code để kiểm thử runtime.

# Trả hàng, mở bán lại và phí chợ

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quy tắc khách trả hàng gắn đơn cũ thì chỉ nguồn A có nút mở bán lại với kỳ 90 ngày và không thu thêm phí chợ qua mọi lần bán/trả trong cùng chuỗi. Phân biệt shop tự thu mua máy từ khách là giao dịch ngoài website thuộc giai đoạn sau; phí hiện tại vẫn chỉ thu reseller bán hàng nguồn.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 5, 6, 7, 8, 9, 12. Sửa các câu khẳng định sold tuyệt đối không thể ra khỏi trạng thái để chỉ ngoại lệ A mở bán lại từ đơn trả hàng; giữ sale event và cùng item/IMEI. Không sửa code.

## Quyết định
Chủ dự án xác nhận shop tự thu máy là giao dịch bên ngoài, xử lý ở giai đoạn sau; quy tắc phí 50.000đ hiện tại vẫn chỉ cho hàng resell. Chỉ A bấm Mở bán lại sau khi máy về. Miễn thu thêm phí 50.000đ qua mọi lần trả/bán cùng chuỗi, không tự giới hạn một lần; giữ bút toán phí gốc.

## Kiểm chứng
Đối chiếu CAT-06/FEE-02 với workflow, UI, data/API và T-55; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-return-relist-fee.md`.

## Còn lại
Chưa triển khai code/test runtime. Bấm nhầm Đã bán, trường IMEI/serial chính xác và chi tiết chuỗi trả hàng cần thiết kế khi triển khai.

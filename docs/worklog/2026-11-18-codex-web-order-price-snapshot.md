# Chốt khóa máy và giá đơn web khi đặt mua

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định: khi khách xác nhận đặt mua, khóa đúng một máy và lưu giá khách cần trả vào đơn; giá niêm yết sau đó không tự đổi giá đơn. Không tự chốt thời hạn thanh toán 15 phút hoặc giá nguồn giữa shop; chỉ sửa docs.

## Thực hiện
Cập nhật WEB-01, luồng đơn web, quy tắc hiển thị, mô hình dữ liệu, hợp đồng API mục tiêu và T-20 trong docs/2, 3, 4, 7, 8, 9. Thu hẹp câu hỏi mở trong docs/12, cập nhật SPEC/PLAN và ghi quyết định mới trong contexte/decisions.md. Không đổi cấu trúc file/MAP; không sửa code.

## Quyết định
Tạo đơn web cho trả đủ/COD đồng thời khóa đúng item và chụp giá khách trả từ shop bán trên server. Giá niêm yết đổi sau đó không tự đổi giá đơn; tạo đơn không có nghĩa đã trả tiền hoặc sold. Giá nguồn đối soát, giá khi xác nhận tiền muộn và hạn thanh toán vẫn mở.

## Kiểm chứng
Đối chiếu nội dung bằng `rg`; kiểm tra mã yêu cầu/test và liên kết nội bộ; chạy `git diff --check` và `node scripts/check-worklog.mjs` cho nhật ký này. Không chạy test ứng dụng vì chỉ thay docs, module đơn web chưa có code.

## Còn lại
Cần chốt độ dài hạn thanh toán, giá khi xác nhận tiền muộn, actor giao nhận/nhận hoàn, đối soát tiền shop nguồn/reseller. Chưa có API/schema/payment integration cho luồng này.

# Chốt hạn chờ cọc COD 15 phút

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chủ dự án chốt khách có 15 phút từ lúc tạo đơn COD để đặt cọc; quá hạn chưa xác nhận cọc thì hủy đơn và giải phóng máy. Đồng bộ tài liệu, phân biệt với hạn thanh toán đủ; không sửa code.

## Thực hiện
Cập nhật WEB-03 trong `docs/2_requirements.md`, workflow COD, UI, dữ liệu, API mục tiêu, T-21, quy định, sổ quyết định mở, SPEC, PLAN và thêm quyết định vào `contexte/decisions.md`. Không đổi cấu trúc/MAP hoặc code.

## Quyết định
Đơn COD Chờ cọc giữ máy tối đa 15 phút từ lúc tạo theo giờ DB. Tại hoặc sau hạn chưa xác nhận cọc thì đơn bị hủy, máy đủ điều kiện mở cho giao dịch khác, không đợi worker. COD đã xác nhận cọc không bị hạn này kết thúc khi đang giao; hạn 15 phút thanh toán đủ là mốc khác.

## Kiểm chứng
Đối chiếu bằng `rg` để xóa lời ghi hạn cọc còn mở trong docs hiện hành; kiểm tra 60 mã yêu cầu/32 mã test duy nhất và liên kết nội bộ; `git diff --check`, `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs, module COD/cọc chưa có code.

## Còn lại
Chưa chốt xử lý cọc đến sau hạn, trường hợp giá bán bằng giá nguồn không có cọc dương, phí vận chuyển và thời hạn/chứng từ đối soát ngoài website. Chưa triển khai schema/API/giao diện/tích hợp thanh toán.

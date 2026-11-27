# Đề xuất đổi máy sau khi bán

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Giải thích khi khách đã trả tiền rồi 2–3 ngày sau đổi sang máy khác, shop nguồn nhận lại máy cũ và bán lại mà không bị chặn do trùng IMEI. Chưa tự chốt luồng đổi máy.

## Thực hiện
Đối chiếu CAT-06, quy tắc IMEI/serial và nút Mở bán lại khi khách trả hàng. Đề xuất giữ cùng item_id/IMEI cho máy cũ, tạo sự kiện đổi máy gắn đơn gốc và item riêng cho máy thay thế.

## Quyết định
Chưa có quyết định mới; trình phương án để chủ dự án chốt. Không tạo item thứ hai cho cùng IMEI.

## Kiểm chứng
Rà docs/2_requirements.md và docs/12_open-decisions.md; chạy node scripts/check-worklog.mjs 2026-11-21-codex-exchange-machine-imei.md.

## Còn lại
Cần chốt actor ghi đổi máy, xử lý tiền chênh lệch và phí nếu máy thay thế đi qua reseller.

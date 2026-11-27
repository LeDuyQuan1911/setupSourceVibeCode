# Phương án shop tự ghi nhận trả hàng

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đề xuất luồng trả hàng ít phụ thuộc admin, chấp nhận không bao phủ mọi tình huống nhưng ổn định và hạn chế vòng bán/xóa/bán lại. Chưa sửa quyết định nghiệp vụ.

## Thực hiện
Đối chiếu quy tắc sold, IMEI/serial, COD giao thất bại và ý kiến chủ dự án không muốn admin duyệt mọi ca. Đề xuất ngoại lệ tự phục vụ có giới hạn theo item, gắn giao dịch gốc và giữ lịch sử.

## Quyết định
Chưa chốt. Không biến đề xuất thành yêu cầu khi chủ dự án chưa xác nhận.

## Kiểm chứng
Rà các quy tắc đã chốt trong docs/2_requirements.md và docs/12_open-decisions.md; chạy node scripts/check-worklog.mjs 2026-11-21-codex-self-service-return-option.md.

## Còn lại
Chờ chủ dự án quyết định giới hạn ngoại lệ trả hàng tự phục vụ.

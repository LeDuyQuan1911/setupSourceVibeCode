# Đánh giá độ phức tạp luồng đổi máy

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Trả lời việc thêm chức năng Đổi máy riêng có gây khó dùng hay không; đề xuất cách xử lý gọn dựa trên luồng trả hàng và bán máy đã có. Chưa sửa quy tắc chưa chốt.

## Thực hiện
Đối chiếu luồng trả hàng sau sold, mở bán lại cùng item/IMEI và bán máy thay thế. Đề xuất không thêm nút/luồng Đổi máy riêng: nhận lại máy cũ qua đơn gốc, bán máy khác bằng giao dịch thông thường.

## Quyết định
Đây là đề xuất giảm độ phức tạp, chờ chủ dự án chốt; chưa ghi thành yêu cầu chính thức.

## Kiểm chứng
Đối chiếu docs/2_requirements.md và các quyết định đã chốt; chạy node scripts/check-worklog.mjs 2026-11-21-codex-simplify-exchange-flow.md.

## Còn lại
Nếu chủ dự án đồng ý, bỏ đề xuất chức năng Đổi máy riêng và ghi rõ hai thao tác hiện có trong docs.

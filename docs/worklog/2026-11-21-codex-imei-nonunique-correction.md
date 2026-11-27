# Sửa quy tắc IMEI trùng

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Làm rõ IMEI bắt buộc nhưng các tin và bản ghi máy đều được phép trùng IMEI; sửa các tài liệu liên quan, không đổi code.

## Thực hiện
Đồng bộ SPEC, PLAN, quyết định, yêu cầu, workflow, màn hình, quyền, mô hình dữ liệu, API, kiểm thử, quy định và mục quyết định mở. Bỏ các câu chặn item trùng IMEI; giữ quy tắc khóa tồn kho theo item ID và trả hàng theo item ID của đơn gốc.

## Quyết định
Theo xác nhận của chủ dự án: IMEI bắt buộc cho iPhone nhưng không là khóa duy nhất của tin hoặc máy. Hai item ID cùng IMEI là hai bản ghi độc lập; hệ thống không tự xác định chúng có phải cùng một máy thực tế.

## Kiểm chứng
Rà tìm các câu khẳng định IMEI unique/chặn trùng trong tài liệu hiện hành; kiểm tra diff và chạy `git diff --check`; chạy `node scripts/check-worklog.mjs 2026-11-21-codex-imei-nonunique-correction.md`.

## Còn lại
Chưa triển khai schema/API hay kiểm thử runtime. Serial và cách xử lý IMEI không đọc được hoặc khai sai còn cần chốt riêng.

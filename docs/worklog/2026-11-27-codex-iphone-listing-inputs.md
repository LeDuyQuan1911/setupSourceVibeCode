# Chốt trường nhập tin iPhone

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chủ dự án giao Codex tự quyết định các chi tiết nhập liệu đơn giản của tin iPhone, gồm cách nhập pin; đồng bộ docs trước triển khai, không sửa code.

## Thực hiện
Đã đồng bộ SPEC, PLAN, quyết định, CAT-01, quyết định mở, màn hình, data model, API, nghiệm thu và khung quy định. Chốt nhập pin trực tiếp và các giá trị nhập liệu iPhone; giữ riêng các quyết định về tìm kiếm, media và kiểm tra mô tả sai.

## Quyết định
Dùng số nguyên cho pin 0–100 hoặc Không đọc được; GB nguyên dương, mô tả chữ cho ngoại hình/lỗi/linh kiện/phụ kiện, iCloud có lựa chọn Không xác định, bảo hành theo ngày hoặc Chưa xác định, giá VND nguyên dương, khu vực và ảnh thật. Nháp được thiếu; xuất bản cần đủ. Không đổi quy tắc IMEI, tin và giá đã chốt.

## Kiểm chứng
Rà mâu thuẫn về mẫu ngừng dùng và validation xuất bản; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-iphone-listing-inputs.md`.

## Còn lại
Chưa triển khai UI/API hoặc kiểm thử runtime. Số ảnh tối đa, dung lượng/định dạng ảnh, bộ lọc tìm kiếm và quy tắc kiểm tra mô tả sai còn mở.

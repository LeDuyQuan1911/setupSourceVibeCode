# Chốt cách nhập và sửa IMEI

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi ba quyết định về serial, IMEI không đọc được và IMEI nhập sai vào tài liệu nghiệp vụ; không sửa code.

## Thực hiện
Đồng bộ SPEC, PLAN, quyết định, yêu cầu, workflow, màn hình, quyền, mô hình dữ liệu, API, kiểm thử, quy định và mục quyết định mở. Phân biệt validation lưu nháp và xuất bản; ghi quyền sửa IMEI và khóa khi giao dịch.

## Quyết định
Serial tùy chọn; không có IMEI thì chỉ lưu nháp, không đăng bán; A sửa IMEI sai khi máy chưa sold và không có hold/đơn mở, khóa khi giao dịch mở và giữ lịch sử máy đã bán. IMEI vẫn được trùng giữa các máy/tin.

## Kiểm chứng
Rà các câu “chưa chốt” còn sót; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-close-imei-input.md`.

## Còn lại
Chưa triển khai schema/API/UI hoặc kiểm thử runtime. Chi tiết định dạng IMEI và việc đối chiếu máy thực tế còn cần thiết kế khi triển khai.

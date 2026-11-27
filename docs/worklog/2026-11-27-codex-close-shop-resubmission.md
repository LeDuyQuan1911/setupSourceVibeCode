# Chốt nộp lại hồ sơ shop

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định nộp lại hồ sơ shop khi quá 30 ngày hoặc bị từ chối; giữ cùng tài khoản, lịch sử các lần nộp và nhận xét riêng từng lần. Chỉ sửa docs.

## Thực hiện
Đồng bộ SPEC, PLAN, quyết định, SHOP-05, workflow, màn hình, quyền, data model, API, nghiệm thu và quyết định mở. Bổ sung định danh từng lần nộp và kiểm tra hạn 30 ngày theo giờ DB. Sửa mã case kiểm thử trùng T-56 thành T-57 cho trường nhập iPhone, thêm T-58 cho nộp lại.

## Quyết định
Theo chủ dự án: đúng 30 ngày chưa duyệt thì hồ sơ hết hạn, admin không duyệt hồ sơ cũ; shop sửa/nộp lại cùng tài khoản/shop. Bị từ chối cũng được nộp lại ngay, không cần luồng khiếu nại riêng. Mỗi lần nộp và nhận xét giữ lịch sử riêng.

## Kiểm chứng
Rà tài liệu, đếm và kiểm tra mã case; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-close-shop-resubmission.md`.

## Còn lại
Chưa triển khai code hoặc kiểm thử runtime. Cơ chế khóa/mở shop sau khi đã approved và quyền xem chi tiết hồ sơ pending cho shop khác vẫn cần chốt riêng.

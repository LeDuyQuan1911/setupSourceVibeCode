# Giải thích máy và tin đăng

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Giải thích sự khác nhau giữa một máy và một tin theo tài liệu hiện tại; chỉ khảo sát, không sửa nghiệp vụ hoặc code.

## Thực hiện
Đối chiếu SPEC.md, CAT-01/CAT-06 trong docs/2_requirements.md, workflow và quan hệ inventory_items/listings trong docs/7_data-model.md. Tóm tắt vòng đời máy và kỳ đăng tin.

## Quyết định
Không có quyết định mới. Diễn giải đúng thiết kế hiện tại: item ID quản lý tồn kho một đơn vị máy trong hệ thống; listing ID quản lý một lần công bố bán với hiệu lực, hạn và lịch sử riêng. IMEI có thể trùng ở cả hai mức.

## Kiểm chứng
Rà nội dung tài liệu và trạng thái Git; chạy `node scripts/check-worklog.mjs 2026-11-21-codex-explain-item-listing.md`.

## Còn lại
Thiết kế hiện tại chưa triển khai catalog/tin đăng thành code. Phần xử lý hai item ID cùng chỉ một máy thực tế chưa được đặc tả, vì IMEI không được dùng làm khóa duy nhất.

# Chốt quản lý danh mục và mẫu máy

- Ngày: 2026-11-24
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quy tắc admin quản lý danh mục/mẫu, shop tự nhắn admin khi thiếu mẫu và mẫu ngừng dùng chỉ ẩn khỏi lựa chọn mới; hàng cũ vẫn bán. Chỉ sửa docs, không thêm luồng yêu cầu trong web.

## Thực hiện
Đồng bộ SPEC, PLAN, quyết định, CAT-00, màn hình, phân quyền, mô hình dữ liệu, API danh sách mẫu, nghiệm thu và mục quyết định mở. Làm rõ mẫu ngừng dùng chỉ chặn chọn cho item mới, không chặn giao dịch hoặc kỳ tin tiếp theo của item cũ.

## Quyết định
Theo chủ dự án: chỉ admin quản lý danh mục/nhóm/mẫu; admin tự thêm mẫu khi nhận tin nhắn từ shop, không xây cơ chế đề nghị. Mẫu ngừng chỉ không cho chọn với hàng mới, hàng đã dùng mẫu đó vẫn bán bình thường.

## Kiểm chứng
Rà mâu thuẫn giữa kiểm tra mẫu active lúc tạo và lúc xuất bản; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-24-codex-close-taxonomy-management.md`.

## Còn lại
Chưa triển khai code hoặc test runtime; bộ thuộc tính chi tiết/bộ lọc cho iPhone vẫn là quyết định mở.

# Vấn đề kế tiếp: quản lý danh mục

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Xác định nhóm quyết định kế tiếp sau khi chốt IMEI; khảo sát tài liệu, chưa sửa yêu cầu nghiệp vụ.

## Thực hiện
Đối chiếu CAT-00/01/03, DEC-03 và nhóm Dữ liệu hàng. Chọn quyền thêm/sửa/kích hoạt danh mục, nhóm và mẫu máy vì ảnh hưởng trực tiếp thiết kế database và form đăng tin.

## Quyết định
Không có. Trình đề xuất để chủ dự án chốt; giữ nguyên Apple/iPhone là phạm vi khởi chạy, cấu trúc mở rộng cho nhóm khác.

## Kiểm chứng
Rà tài liệu và trạng thái Git; chạy `node scripts/check-worklog.mjs 2026-11-21-codex-next-taxonomy-decision.md`.

## Còn lại
Cần chủ dự án chốt ai quản lý danh mục/mẫu, cách shop yêu cầu mẫu chưa có và ảnh hưởng khi ẩn/ngừng mẫu đang có tin.

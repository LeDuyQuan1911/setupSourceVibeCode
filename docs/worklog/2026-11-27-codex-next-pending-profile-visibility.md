# Vấn đề kế tiếp: hiển thị hồ sơ chờ duyệt

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chọn quyết định nghiệp vụ kế tiếp về phạm vi trường hồ sơ pending mà shop approved được xem trên dashboard; chỉ khảo sát, chưa sửa quy tắc.

## Thực hiện
Đối chiếu SHOP-04, danh sách năm trường hồ sơ, quyền nhận xét và mục Lịch sử và công khai.

## Quyết định
Không có. Trình phương án hiển thị năm trường cho shop approved để đánh giá, giới hạn người ngoài; chờ chủ dự án chốt.

## Kiểm chứng
Rà tài liệu/trạng thái Git; chạy `node scripts/check-worklog.mjs 2026-11-27-codex-next-pending-profile-visibility.md`.

## Còn lại
Cần chủ dự án chốt trường hiển thị; chưa sửa code hoặc docs nghiệp vụ.

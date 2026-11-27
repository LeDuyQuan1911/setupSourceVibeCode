# Vấn đề kế tiếp: thông tin pin

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Xác định điểm cần chốt tiếp theo trong phần đăng tin, đưa phương án ngắn gọn; chỉ khảo sát, chưa sửa quy tắc.

## Thực hiện
Đối chiếu CAT-01/CAT-03, DEC-03 và phần dữ liệu iPhone. Chọn trường tình trạng pin vì hiện là bắt buộc nhưng chưa xác định cách ghi khi không đọc được.

## Quyết định
Không có. Trình phương án để chủ dự án duyệt.

## Kiểm chứng
Rà tài liệu và trạng thái Git; chạy `node scripts/check-worklog.mjs 2026-11-27-codex-next-battery-condition.md`.

## Còn lại
Cần chủ dự án quyết định cách nhập và hiển thị pin không đọc được; chưa sửa code hoặc docs nghiệp vụ.

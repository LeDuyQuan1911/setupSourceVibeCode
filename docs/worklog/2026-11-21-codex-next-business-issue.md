# Chọn vấn đề nghiệp vụ tiếp theo

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Xác định vấn đề nghiệp vụ cần chốt tiếp sau nhóm CTV; không tự chốt hoặc sửa tài liệu chuẩn.

## Thực hiện
Đối chiếu docs/12_open-decisions.md với yêu cầu và workflow. Chọn DEC-05: tin hết hạn 90 ngày, cửa sổ gia hạn 3 ngày, và tác động tới hold/đơn đang mở.

## Quyết định
Đề xuất thảo luận DEC-05 tiếp vì ảnh hưởng cùng lúc đến hiển thị tin, giao dịch đang mở và worker xóa tin. Chưa biến phương án thành quy tắc đã chốt.

## Kiểm chứng
Đối chiếu LIST-04, HOLD-03 và workflow tin; chạy node scripts/check-worklog.mjs 2026-11-21-codex-next-business-issue.md.

## Còn lại
Chờ chủ dự án chốt cách tính ngày, biên hạn và xử lý tin hết hạn còn giao dịch mở.

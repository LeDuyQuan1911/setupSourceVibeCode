# Chốt xác minh Gmail đăng ký bằng mật khẩu

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi nhận yêu cầu bắt buộc xác minh Gmail bằng link trước kích hoạt tài khoản đăng ký bằng mật khẩu. Chỉ sửa docs, không gửi email hoặc triển khai code. Giữ nguyên thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-01 trong docs/2_requirements.md và workflow, UI, dữ liệu/API mục tiêu, T-01, DEC-01. Đồng bộ SPEC, PLAN, contexte/decisions. Không thêm mã yêu cầu/case hoặc đổi cấu trúc; MAP không thay đổi. Bảng API/schema hiện tại vẫn mô tả source thực tế, chưa có verification.

## Quyết định
Gmail/mật khẩu tạo tài khoản chờ xác minh, link qua Gmail hợp lệ mới kích hoạt; chưa kích hoạt chưa nộp hồ sơ. Không thay cơ chế Google/liên kết. Thời hạn link, gửi lại và xử lý email lỗi chưa chốt; không tự áp 30 phút hoặc chính sách resend trước khi người dùng trả lời.

## Kiểm chứng
Đọc tài liệu nền, quyết định và tham chiếu ACC-01/DEC-01. Kiểm tra 59 mã yêu cầu và 31 case không trùng; 50 liên kết nội bộ hợp lệ. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-gmail-verification.md: đạt. Không chạy test/build vì chỉ sửa docs; chưa có code/migration để kiểm chứng kích hoạt thực tế.

## Còn lại
Chốt tiếp thời hạn link xác minh, sau đó quy tắc gửi lại/mật khẩu/recovery trong file 2. Chưa chọn dịch vụ email, token hoặc tích hợp. Không commit/push.

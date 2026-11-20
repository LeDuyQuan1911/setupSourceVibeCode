# Chốt hạn link xác minh 10 phút

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi thời hạn link xác minh Gmail là 10 phút kể từ lúc gửi, thay đề xuất 30 phút chưa được duyệt. Chỉ sửa docs, giữ nguyên các thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-01, workflow, UI, hướng dữ liệu/API và T-01; gỡ câu hỏi thời hạn khỏi DEC-01, giữ câu hỏi gửi lại. Đồng bộ SPEC, PLAN và contexte/decisions. Không đổi cấu trúc, mã yêu cầu hoặc số case; MAP không thay đổi.

## Quyết định
Đủ/quá 10 phút link không kích hoạt, người dùng cần yêu cầu gửi lại. Không thay cơ chế Google/liên kết hoặc hạn xét duyệt hồ sơ 30 ngày. Tần suất gửi lại/vô hiệu link cũ và cơ chế token cụ thể còn chờ chốt. Không có giá trị 30 phút nào được áp dụng trong docs hiện hành của nhiệm vụ này.

## Kiểm chứng
Đối chiếu các tham chiếu ACC-01/DEC-01 và thời hạn trong yêu cầu/thiết kế; kiểm tra 50 liên kết nội bộ hợp lệ, git diff --check đạt. node scripts/check-worklog.mjs 2026-11-18-codex-verification-link-10min.md: đạt. Không chạy test/build vì chỉ sửa docs, chưa có code xác minh email.

## Còn lại
Chốt cách gửi lại và số link còn hiệu lực, tiếp theo mật khẩu/recovery; chưa gửi email hoặc thêm tích hợp/migration. Không commit/push.

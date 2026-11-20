# Chốt luồng quên mật khẩu qua Gmail

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi luồng tài khoản đã có mật khẩu: nhập Gmail đã xác minh, nhận link đặt lại, nhập mật khẩu mới/nhập lại. Chỉ sửa docs; chưa chốt thời hạn/gửi lại/reset session. Giữ thay đổi có sẵn.

## Thực hiện
Thêm ACC-05 trong requirements và T-31 trong thiết kế nghiệm thu; đồng bộ workflow, UI, dữ liệu/API mục tiêu và DEC-01. Cập nhật SPEC, mục lục (60 yêu cầu), PLAN và contexte/decisions. Phân biệt code hiện tại chưa có recovery, không sửa bảng API/schema thực tế. Không đổi cấu trúc nên MAP không đổi.

## Quyết định
Reset chỉ áp dụng user đã có mật khẩu và Gmail verified; link hợp lệ + mật khẩu/confirmation đúng mới cập nhật cùng user. Không tạo user/shop hoặc tự kích hoạt Gmail qua reset. Password mới theo ACC-01. Không tự dùng các giới hạn mail xác minh cho mail reset trước khi được duyệt; thời hạn/quota/tiêu thụ token/phiên còn mở.

## Kiểm chứng
Đọc tài liệu nền/kiến trúc/quyết định và tham chiếu recovery. Kiểm tra 60 mã yêu cầu và 32 case duy nhất, 50 liên kết nội bộ hợp lệ; git diff --check đạt. node scripts/check-worklog.mjs 2026-11-18-codex-password-recovery-flow.md: đạt. Không chạy test/build vì chỉ sửa docs; chưa có code khôi phục mật khẩu để kiểm chứng runtime.

## Còn lại
Chốt quy tắc link reset, token dùng một lần/vô hiệu link và thu hồi phiên; xử lý lỗi mail/quota khi lỗi còn mở. Không gửi email, thêm dịch vụ, sửa code/migration, commit hoặc push.

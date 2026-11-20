# Chốt chính sách link đặt lại mật khẩu

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi link reset 10 phút, gửi lại cách 60 giây, tối đa 5 email/tài khoản/60 phút, link mới nhất hiệu lực; quota riêng với xác minh đăng ký. Chỉ sửa docs, giữ các thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-05, workflow/UI, thiết kế dữ liệu/API mục tiêu, T-31 và DEC-01. Đồng bộ SPEC/PLAN/contexte/decisions. Giữ số lượng 60 yêu cầu và 32 case; không đổi cấu trúc nên không đổi MAP. Không chạm bảng API/schema hiện có hoặc source.

## Quyết định
Reset có cùng các mức thời gian/số email như verify nhưng hạn mức/cooldown tính riêng theo tài khoản và mục đích. Link reset mới thay link reset cũ, không dùng hay vô hiệu token verify; request bị chặn không đổi link hiện tại. Tính lần gửi đầu vào 5 email. Dùng một lần sau đặt lại/tự đăng nhập/thu hồi phiên chưa chốt; không tự áp đề xuất hậu xử lý.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc, quyết định và tham chiếu ACC-05. Kiểm tra 60 mã yêu cầu và 32 case duy nhất, 50 liên kết nội bộ hợp lệ; git diff --check đạt. node scripts/check-worklog.mjs 2026-11-18-codex-password-reset-link-policy.md: đạt. Không chạy test/build vì chỉ sửa docs, chưa có code reset/mail/quota để kiểm chứng runtime.

## Còn lại
Chốt token dùng một lần, tự đăng nhập và thu hồi phiên sau reset; lỗi mail/quota khi lỗi vẫn mở. Không gửi email, thêm dịch vụ, sửa code/migration, commit hoặc push.

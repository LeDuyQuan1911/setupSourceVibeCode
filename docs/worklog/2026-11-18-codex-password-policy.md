# Chốt quy tắc mật khẩu 12–200 ký tự

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quy tắc mật khẩu 12–200 ký tự, nhập lại khớp, không bắt buộc đủ hoa/thường/số/ký tự đặc biệt. Chỉ sửa docs, giữ các thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-01 trong requirements, workflow, UI, T-01 và DEC-01; đồng bộ SPEC/PLAN/contexte/decisions. Không đổi cấu trúc hoặc mã yêu cầu/case; MAP không thay đổi. Đối chiếu độ dài đang có trong apps/backend/src/modules/shops/service.js, không sửa code đó.

## Quyết định
Mật khẩu hợp lệ theo độ dài và xác nhận khớp; không bắt tổ hợp loại ký tự. Không tự chốt recovery, xác thực lại, gửi email lỗi hoặc tiêu chí khác. Giới hạn 10 phút/60 giây/5 email xác minh vẫn giữ nguyên.

## Kiểm chứng
Đọc tài liệu nền và quyết định; đối chiếu source thực tế kiểm tra password.length 12–200. Kiểm tra 50 liên kết nội bộ hợp lệ; git diff --check đạt. node scripts/check-worklog.mjs 2026-11-18-codex-password-policy.md: đạt. Không chạy test/build vì chỉ sửa docs; nhập lại/đăng ký tách hồ sơ và Google vẫn chưa có code.

## Còn lại
Tiếp theo chốt quy trình quên mật khẩu của tài khoản có mật khẩu. Lỗi gửi email/quota khi lỗi vẫn thuộc DEC-01. Không gửi email, sửa code/migration, commit hoặc push.

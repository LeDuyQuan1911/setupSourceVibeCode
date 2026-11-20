# Chốt hạn mức email xác minh theo tài khoản

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi mức tối đa 5 email xác minh mỗi tài khoản trong 60 phút, tính cả lần đầu; giữ khoảng chờ 60 giây và hiệu lực link 10 phút. Chỉ sửa docs, giữ các thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-01 trong docs/2_requirements và workflow/UI/dữ liệu/API/T-01/DEC-01. Đồng bộ SPEC, PLAN, contexte/decisions. Ghi kiểm tra quota theo tài khoản ở server và chống request cạnh tranh, phản hồi thời điểm được gửi tiếp. Không đổi cấu trúc hoặc thêm mã yêu cầu/case, MAP không đổi.

## Quyết định
Tối đa 5 email trong khoảng 60 phút kể cả lần đầu; khoảng chờ 60 giây vẫn áp dụng. Request bị chặn không gửi/đổi/gia hạn link hiện tại. Chỉ link mới nhất có hiệu lực 10 phút. Không tự chốt quota theo ngày, cách tính khi mail lỗi, quy tắc mật khẩu hoặc recovery.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc và quyết định gần nhất; rà ACC-01, các điểm kiểm tra hạn mức và câu hỏi mở. Kiểm tra 50 liên kết nội bộ hợp lệ, git diff --check đạt. node scripts/check-worklog.mjs 2026-11-18-codex-verification-email-quota.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs; chưa có code gửi mail/quota để kiểm chứng runtime.

## Còn lại
Chốt quy tắc mật khẩu và recovery; lỗi mail/quota khi lỗi vẫn trong DEC-01. Không gửi email, thêm tích hợp, sửa code/migration, commit hoặc push.

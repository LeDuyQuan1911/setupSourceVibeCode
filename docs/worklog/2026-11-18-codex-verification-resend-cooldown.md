# Chốt khoảng chờ gửi lại xác minh 60 giây

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định chờ 60 giây giữa hai lần gửi link xác minh cho cùng tài khoản; giữ link mới nhất và hạn 10 phút. Chỉ sửa docs, giữ các thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-01 và workflow/UI/dữ liệu/API mục tiêu, T-01 và DEC-01; đồng bộ SPEC/PLAN/contexte. Ghi kiểm soát tại server cho nhiều tab/tiến trình, yêu cầu quá sớm không phát hành/gia hạn hoặc vô hiệu link hiện tại. Không đổi cấu trúc hoặc số mã, MAP không thay đổi.

## Quyết định
Khoảng cách tối thiểu 60 giây áp dụng theo cùng tài khoản, không chỉ khóa nút UI. Chỉ link mới nhất có hạn 10 phút từ lần gửi. Tổng số email xác minh theo giờ/ngày, xử lý gửi lỗi và nhà cung cấp chưa chốt; không tự áp 5 email/giờ trước câu trả lời.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc, quyết định và tham chiếu gửi lại. Kiểm tra 59 mã yêu cầu/31 case duy nhất, 50 liên kết nội bộ hợp lệ. git diff --check đạt. node scripts/check-worklog.mjs 2026-11-18-codex-verification-resend-cooldown.md: đạt. Không chạy test/build vì chỉ sửa docs; chưa có code xác minh/cooldown để kiểm chứng runtime.

## Còn lại
Chốt tổng số email xác minh và xử lý mail lỗi, sau đó mật khẩu/recovery của file 2. Không gửi email, sửa code/migration, commit hoặc push.

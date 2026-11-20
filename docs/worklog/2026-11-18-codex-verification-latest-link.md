# Chốt chỉ link xác minh mới nhất còn hiệu lực

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định gửi lại link xác minh thì link mới nhất có hiệu lực, link cũ bị vô hiệu; giữ thời hạn 10 phút. Chỉ sửa docs, giữ các thay đổi có sẵn.

## Thực hiện
Cập nhật ACC-01/workflow/UI, hướng dữ liệu và hợp đồng mục tiêu, ca T-01 và DEC-01; đồng bộ SPEC, PLAN, contexte/decisions. Ghi chú kiểm soát gửi lại/xác minh cạnh tranh khi triển khai. Không đổi số mã/case hoặc cấu trúc nên không đổi MAP.

## Quyết định
Mỗi tài khoản chỉ link xác minh mới nhất còn hiệu lực. Link mới tính 10 phút từ lần gửi mới; link cũ bị vô hiệu dù chưa hết hạn. Tần suất/số lần gửi lại, lỗi gửi email và token cụ thể chưa chốt; không tự áp 60 giây trong docs trước khi người dùng trả lời.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc, quyết định và các tham chiếu gửi lại. Kiểm tra 59 mã yêu cầu/31 case duy nhất, 50 liên kết nội bộ hợp lệ. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-verification-latest-link.md: đạt. Không chạy test/build vì chỉ sửa docs, chưa có code xác minh để kiểm chứng runtime.

## Còn lại
Chốt tiếp tần suất gửi lại, số lần và lỗi mail; sau đó mật khẩu/recovery trong file 2. Không sửa code/migration, gửi email, commit hoặc push.

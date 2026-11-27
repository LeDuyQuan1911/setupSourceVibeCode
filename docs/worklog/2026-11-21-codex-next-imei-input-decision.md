# Vấn đề kế tiếp: nhập và sửa IMEI

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đưa ra vấn đề nghiệp vụ kế tiếp để chốt sau popup Sản phẩm đã bán; khảo sát, không tự sửa quy tắc.

## Thực hiện
Đối chiếu SPEC.md, PLAN.md, CAT-01, DEC-03, mô hình dữ liệu, API và kiểm thử. Gom các điểm còn mở về serial, IMEI không đọc được và nhập sai IMEI thành một nhóm quyết định.

## Quyết định
Không có. Giữ quy tắc đã chốt: IMEI bắt buộc nhưng không duy nhất theo item hoặc tin; chỉ đề xuất cách nhập/sửa, chờ chủ dự án quyết định.

## Kiểm chứng
Rà tài liệu và trạng thái Git; chạy `node scripts/check-worklog.mjs 2026-11-21-codex-next-imei-input-decision.md`.

## Còn lại
Chủ dự án cần chốt: serial bắt buộc hay không; máy không lấy được IMEI có được đăng; sửa IMEI khi chưa/có giao dịch. Chưa thay đổi code hoặc docs nghiệp vụ.

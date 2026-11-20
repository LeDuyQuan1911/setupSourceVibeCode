# Admin đối soát khoản nạp không khớp

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt shop nhắn riêng admin khi nạp QR thiếu mã tham chiếu hoặc sai số tiền; admin kiểm tra và cộng số dư giúp shop. Đồng bộ tài liệu nghiệp vụ/thiết kế, không sửa code.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, quyết định và trạng thái Git. Cập nhật SPEC, PLAN, WAL-01, workflow, màn hình, quyền, dữ liệu, API, T-36, runbook, quy định và quyết định mở; thêm quyết định vào `contexte/decisions.md`. Giữ nguyên code và thay đổi ngoài phạm vi.

## Quyết định
Khi nạp thiếu mã hoặc sai số tiền, không tự cộng qua webhook. Shop liên hệ riêng admin; admin kiểm tra tiền thực nhận và xác định đúng shop rồi cộng thủ công một lần. Lưu số tiền, giao dịch gốc, admin, thời điểm và lý do; webhook đến sau hoặc admin khác không cộng lại. Giao dịch đưa số dư lên từ `0đ` vẫn gỡ lý do ẩn vì nợ phí theo quy tắc đã chốt. Không bắt buộc xây chức năng nhắn tin admin mới.

## Kiểm chứng
Rà các tài liệu nghiệp vụ liên quan, kiểm tra 62 mã yêu cầu và 37 ca nghiệm thu đều không trùng; `git diff --check` không báo lỗi whitespace. Chạy `node scripts/check-worklog.mjs 2026-11-19-codex-admin-reconcile-topup.md` trước bàn giao.

## Còn lại
Nhà cung cấp webhook, cách nhận giao dịch khi webhook thất lạc và quy tắc số tiền nạp còn cần chốt. Chưa có code ví/phí hoặc test tích hợp ngân hàng.

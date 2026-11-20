# Nạp số dư chợ bằng QR và webhook ngân hàng

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt shop nạp số dư chợ qua QR, hệ thống xác nhận bằng webhook ngân hàng. Đồng bộ tài liệu nghiệp vụ và thiết kế trước triển khai; chưa tích hợp ngân hàng hay sửa code.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, quyết định và trạng thái Git. Thêm WAL-01 và T-35; cập nhật SPEC, PLAN, mục lục, workflow, màn hình, quyền, dữ liệu, API, kiến trúc, vận hành, quy định và quyết định mở. Ghi quyết định mới vào `contexte/decisions.md`. Không sửa code hoặc thay đổi có sẵn ngoài phạm vi.

## Quyết định
Shop tạo lượt nạp với QR/mã tham chiếu riêng để chuyển tiền vào tài khoản nền tảng. Webhook ngân hàng/bên kết nối phải được server xác thực và đối chiếu đúng lượt/shop, tài khoản nhận và số tiền mới cộng số dư một lần, ghi bút toán và tự gỡ lý do ẩn vì nợ phí khi số dư từ `0đ`. QR, ảnh hoặc nút shop bấm không tự cộng. Luồng nạp chợ tách khỏi cọc COD trả về tài khoản shop bán.

## Kiểm chứng
Rà mã yêu cầu/ca nghiệm thu và những đoạn còn ghi cách xác nhận nạp chưa chốt; `git diff --check` không báo lỗi whitespace. Chạy `node scripts/check-worklog.mjs 2026-11-19-codex-wallet-topup-bank-webhook.md` trước bàn giao.

## Còn lại
Cần chọn ngân hàng/bên kết nối, hợp đồng webhook, quy tắc số tiền nạp và xử lý giao dịch không khớp/thất lạc. Chưa có code ví/phí hoặc kiểm thử tích hợp ngân hàng.

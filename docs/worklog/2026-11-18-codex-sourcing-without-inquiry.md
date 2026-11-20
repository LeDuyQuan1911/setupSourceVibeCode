# Bỏ bước hỏi hàng bắt buộc ở luồng B

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Luồng B là reseller gửi request hợp tác tới nguồn, nguồn đồng ý thì được chọn/treo hàng; không bắt buộc hỏi hàng trước. Giữ riêng request giữ máy khi lấy hàng bên ngoài. Chỉ sửa tài liệu, giữ nguyên thay đổi có sẵn.

## Thực hiện
Viết lại luồng B trong docs/2_product-b2b-secondhand.md. Đồng bộ SPEC, PLAN, contexte/decisions và docs 3, 4, 5, 9, 10. Thêm SRC-03 và case T-28; làm rõ request hợp tác độc lập chat và hold. Không đổi cấu trúc nên MAP không thay đổi.

## Quyết định
Chat là tùy chọn, không tự cấp quyền treo hoặc giữ máy. Chấp nhận hợp tác cấp quyền chọn/treo một chiều, không duyệt từng máy, không tự treo tất cả, không tạo hold. Lấy một máy bên ngoài vẫn cần request giữ riêng. Không đổi phạm vi website giai đoạn sau và không xóa chức năng chat.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc và quyết định; đối chiếu luồng B với luồng hợp tác/giữ trực tiếp. Node kiểm tra 42 liên kết nội bộ: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-sourcing-without-inquiry.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs.

## Còn lại
Hợp đồng endpoint/schema request cụ thể cần review khi triển khai; chưa có code hoặc migration cho sourcing. Không có việc còn lại trong phạm vi sửa luồng B. Không commit/push.

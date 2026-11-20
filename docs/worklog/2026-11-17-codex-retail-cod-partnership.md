# Đơn website, COD và ngừng hợp tác

- Ngày: 2026-11-17
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi nhận quyết định về ngừng hợp tác toàn reseller, xử lý hết đơn mở trước khi ngừng, mua website tự kiểm tra/khóa tồn kho, thanh toán đủ và COD có chờ giao/đang vận chuyển/hoàn về kiểm tra. Giải thích lại quy tắc giá đã chốt. Chỉ sửa docs, không triển khai code; giữ nguyên thay đổi có sẵn.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 14. Thay mô tả cũ nguồn duyệt từng đơn web và giới hạn riêng danh mục; thêm yêu cầu SRC-01/02, WEB-01..04, state machine COD, thiết kế quan hệ/khóa tồn kho, hợp đồng API và ca nghiệm thu T-19..23. Tách purchased khỏi đã giao; COD thất bại chưa sold, chỉ mở lại sau nhận/kiểm tra đạt. Không đổi cấu trúc file nên không đổi MAP.
Trả lời trong hội thoại: giá nguồn bị khóa khi giữ xác nhận; giá reseller tạm ẩn/chủ động treo lại theo công thức; giá CTV dùng chung theo máy, tự cập nhật theo công thức đã được người dùng chốt. Không coi câu hỏi về giá đơn chờ duyệt là đã có đáp án.

## Quyết định
Nguồn ngừng hợp tác cả reseller, không ẩn từng bản treo riêng; phải xử lý hết yêu cầu/đơn mở trước. Web không cần nguồn duyệt từng đơn nhưng phải khóa tồn kho nhất quán. Giữ trực tiếp/đơn CTV lấy nguồn khác với checkout web. COD không dùng thời hạn giữ 12 tiếng. Website vẫn giai đoạn sau; quyết định nghiệp vụ chưa phải code đã có. Không tự chọn tích hợp thanh toán, thời hạn xử lý hoặc cơ chế admin giữ tiền.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc và quyết định; rà các mô tả về quyền nguồn, đơn đang mở, đối soát và trạng thái sold. Node kiểm tra 41 liên kết nội bộ: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-17-codex-retail-cod-partnership.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs.

## Còn lại
Chốt thời điểm khóa giá online/COD và đơn CTV chờ duyệt; actor xác nhận giao nhận khi giao từ kho nguồn, timeouts thanh toán, chứng từ, dòng tiền/đối soát/hoàn tiền. Đề xuất schema/API/transaction cần review trước triển khai. Các quyết định khác về hồ sơ/CTV trong hội thoại chưa được đồng bộ toàn bộ trong nhiệm vụ này. Không commit/push hoặc thay đổi source/database.

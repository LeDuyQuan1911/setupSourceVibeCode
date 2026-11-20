# Khóa giá khi máy đang được giữ

- Ngày: 2026-11-17
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi nhận quyết định đã chốt: shop nguồn không được sửa giá khi máy có lượt giữ đã xác nhận còn hiệu lực. Đồng bộ tài liệu hiện hành, giữ nguyên source và thay đổi có sẵn.

## Thực hiện
Cập nhật SPEC.md, PLAN.md, contexte/decisions.md và docs 2, 3, 4, 5, 7, 8, 9, 10, 11, 13. Thay các ví dụ cũ cho phép sửa giá khi đang giữ; bổ sung quy tắc UI, hợp đồng lỗi 409 đề xuất, guard server/DB, giờ DB và kiểm thử cạnh tranh confirm/đổi giá. Không đổi cấu trúc file nên MAP không cần cập nhật. Không sửa nhật ký lịch sử của nhiệm vụ khác.

## Quyết định
Hold confirmed còn hiệu lực khóa giá niêm yết của chính máy đó. Pending chưa khóa. Hủy/hết hạn thì máy chưa sold được sửa giá; sold không mở bán lại. Giữ thời hạn 12 tiếng và snapshot giá lịch sử. Quyết định mới thay diễn giải cũ cho phép đổi giá niêm yết trong thời gian giữ. Không tự chốt thêm chính sách đơn CTV hoặc website trong yêu cầu này.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc và quyết định; rà các cụm mô tả mâu thuẫn bằng rg, không còn nội dung cho phép đổi giá trong hold hiệu lực ở docs hiện hành. Node kiểm tra 40 liên kết nội bộ: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-17-codex-lock-price-during-hold.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs.

## Còn lại
Triển khai guard giá và test cạnh tranh khi xây catalog/holds; hiện chưa có code hoặc migration cho luồng này. Không có việc còn lại trong phạm vi đồng bộ quyết định khóa giá. Không commit/push.

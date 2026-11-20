# Chốt luồng shop nguồn đăng hàng

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đồng bộ các quyết định luồng A: không duyệt từng tin trước, có bộ quy tắc rule-based; giữ nguồn xác nhận 12 tiếng; bán ngoài cần xử lý giao dịch mở; ẩn không hủy giữ; hiện lại không gia hạn. Chỉ sửa docs, giữ nguyên thay đổi có sẵn.

## Thực hiện
Cập nhật SPEC.md, PLAN.md, contexte/decisions.md và docs 2, 3, 4, 5, 7, 9, 10, 13, 14. Viết lại luồng A; sửa transition hidden/active và actor hoàn tất hold; bổ sung yêu cầu LIST-02..04, CAT-07 và case T-24..27. Thêm bảng khung POST-01..05 cho bộ quy tắc, phân biệt nguyên tắc đã chốt và tiêu chuẩn chi tiết chưa duyệt. Không đổi cấu trúc file nên không đổi MAP.

## Quyết định
Ẩn tin chỉ dừng yêu cầu mới, không hủy hold/đơn đã xác nhận; giao dịch vẫn xử lý theo quyền và thời hạn cũ. Nguồn chốt thành công trong 12 tiếng hoặc lượt giữ tự hết hạn; không tự hiện tin hidden sau hết hạn giữ. Hiện lại giữ expires_at, hết hạn phải gia hạn theo quy định. Bán ngoài xử lý hết giao dịch mở trước; complete hold là thao tác riêng cập nhật sold nhất quán. AI duyệt tin chỉ là hướng sau. Không tự duyệt các tiêu chuẩn/enum/giới hạn còn thiếu hoặc biên deadline.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc, trạng thái và quyết định; rg rà các câu hỏi cũ về duyệt từng tin/ẩn tin/actor hoàn tất, không còn mô tả cũ trong tài liệu hiện hành được rà. Node kiểm tra 42 liên kết nội bộ: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-source-listing-flow.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs.

## Còn lại
Soạn và duyệt bộ tiêu chuẩn đăng chi tiết; chốt bằng chứng hoàn tất, quyền hủy reseller, biên thời gian và xóa tin có giao dịch mở. Chưa có code/migration cho catalog/holds hoặc rule engine. Không commit/push.

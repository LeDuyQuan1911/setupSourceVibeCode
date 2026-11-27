# Chốt lưu tin quá hạn

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi ba quyết định về tin quá hạn chưa bán: ẩn công khai, giữ bản ghi lịch sử không xóa vật lý tự động, cho tạo tin mới cùng máy chưa sold sau khi cập nhật tình trạng/ảnh.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 7, 8, 9, 12. Chuyển tin expired quá cửa sổ từ xóa sang archive, sửa ràng buộc nhiều tin lịch sử trên một item và thêm T-52; không sửa code.

## Quyết định
Theo câu trả lời “oke chốt” của chủ dự án: tin chưa sold quá cửa sổ và hết giao dịch mở ẩn khỏi chợ/không vào Đã bán, giữ bản ghi nội bộ không hard-delete tự động; chủ shop được tạo tin mới cùng item sau cập nhật tình trạng/ảnh, tin cũ chỉ đọc, item sold không tái bán.

## Kiểm chứng
Đối chiếu LIST-01, CAT-06, workflow, schema/API và T-52; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-archive-expired-listings.md`.

## Còn lại
Chưa triển khai code hoặc test runtime. Chính sách retention dữ liệu cá nhân/media thuộc DEC-07 còn mở; các worklog nhiệm vụ khác không thay đổi.

# Chốt sửa thông tin và nhận diện máy

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi ba quyết định: sửa tình trạng/ảnh khi máy chưa có giao dịch, khóa sửa khi đang giữ/có đơn, dùng IMEI/serial riêng tư để phát hiện trùng. Đề xuất lại xử lý máy sold mà không tạo vòng lặp bán lại.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 5, 7, 8, 9, 12. Thêm T-53/54 cho sửa thông tin và nhận diện trùng; không sửa code.

## Quyết định
Theo các mục 1–3 được chủ dự án chốt. Mục 4 chưa chốt; không ghi phương án tạo item mới cho máy returned thành quy tắc vì chủ dự án chỉ ra lỗ hổng sold → mở lại lặp lại.

## Kiểm chứng
Đối chiếu CAT-01/02, workflow, quyền, data/API và kiểm thử; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-item-editing-and-identity.md`.

## Còn lại
Chờ quyết định về hoàn trả/bấm bán nhầm sau sold; cần chốt trường IMEI/serial bắt buộc và cách xử lý máy không đọc được/sai mã trước migration. Chưa triển khai code hoặc test runtime.

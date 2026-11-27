# Chốt giá mốc CTV

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định dùng giá bán của B làm mốc tự điều chỉnh giá CTV cho hàng tự sở hữu và resell; giữ hàng chờ B treo lại tạm ẩn với CTV.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 7, 8, 9, 12. Thêm ca T-51 minh họa cả hàng sở hữu và resell. Không sửa code.

## Quyết định
Theo câu trả lời “oke” của chủ dự án cho ví dụ giá 12 → 13 triệu, CTV 11 → 12 triệu. Giá bán B là mốc, giá nguồn A chỉ là sàn cho giá CTV hàng resell; hàng chờ B treo lại ẩn với CTV, sau treo lại mới tính theo giá B mới. Giá đã chụp vào giao dịch duyệt không tự đổi.

## Kiểm chứng
Đối chiếu công thức với ví dụ và các quy tắc ẩn/treo lại; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-ctv-price-reference.md`.

## Còn lại
Chưa triển khai code hoặc test runtime; tài liệu là yêu cầu trước triển khai. Các file worklog không thuộc nhiệm vụ này được giữ nguyên.

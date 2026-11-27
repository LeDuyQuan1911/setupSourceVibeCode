# Chốt giá đổi nhiều lần với request CTV

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định giá CTV đổi nhiều lần khi request chờ xác nhận lại; ghi rõ hàng resell chờ B treo lại phải tạm ẩn với CTV. Giải thích câu hỏi giá đầu vào còn chưa chốt.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 5, 8, 9, 12. Bổ sung hai ca kiểm thử mục tiêu; không sửa code.

## Quyết định
Giá đổi nhiều lần trong hạn xác nhận lại chỉ dùng giá mới nhất và tính lại 12 giờ; request đã expired không hồi sinh. Hàng resell chờ B treo lại tạm ẩn với CTV và không nhận request CTV mới. Giá đầu vào tự điều chỉnh giá CTV chưa được chốt; cần giải thích bằng ví dụ.

## Kiểm chứng
Đối chiếu yêu cầu với workflow, UI, API và case kiểm thử; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-ctv-repeated-price-changes.md`.

## Còn lại
Chờ chủ dự án chọn giá mốc dùng để tự điều chỉnh giá CTV; chưa triển khai code hoặc test runtime.

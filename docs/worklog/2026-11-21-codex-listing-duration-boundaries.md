# Chốt mốc thời hạn tin đăng

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt 90 × 24 giờ từ lúc đăng và 3 × 24 giờ gia hạn từ lúc tin hết hạn, theo phương án người dùng đồng ý; đồng bộ docs.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 7, 8, 9, 12. Bổ sung công thức, điều kiện biên và ví dụ cho T-10; không sửa code.

## Quyết định
Dùng thời điểm server/DB: 90 × 24 giờ từ published_at, sau đó 3 × 24 giờ để gia hạn. Đúng expires_at chặn bán/request mới; đúng renewal_deadline chặn gia hạn. DEC-05 chỉ còn chính sách lưu/xóa vật lý sau khi giao dịch kết thúc.

## Kiểm chứng
Đối chiếu LIST-01, workflow và T-10; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-listing-duration-boundaries.md`.

## Còn lại
Chưa triển khai code hoặc test runtime. Chính sách retention/xóa vật lý tin là quyết định còn mở.

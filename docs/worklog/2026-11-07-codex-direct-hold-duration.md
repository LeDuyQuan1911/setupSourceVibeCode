# Thời hạn giữ hàng trực tiếp

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi lượt giữ hàng trực tiếp có hiệu lực 12 tiếng và shop nguồn có thể hủy trước hạn.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` về thời hạn 12 tiếng, hủy trước hạn và thông báo cho reseller.

## Quyết định

Tính 12 tiếng từ khi shop nguồn xác nhận; lượt giữ tự hết hạn nếu chưa hoàn tất. Shop nguồn có thể hủy sớm.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-direct-hold-duration.md`. Chưa có ứng dụng để test.

## Còn lại

Cần chốt lý do hủy, ưu tiên khi nhiều shop hỏi cùng máy và xử lý khi reseller đã lên đường.

# Chốt thêm phạm vi sản phẩm

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Cập nhật tài liệu theo lựa chọn về hàng Apple secondhand, phạm vi toàn quốc, quy định, liên lạc, giữ hàng, phí tháng, website giai đoạn sau và luồng tiền của đơn online.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `README.md`, `MAP.md`, `PLAN.md`, `contexte/decisions.md` và thêm `docs/rules-outline.md`.

## Quyết định

Ghi lựa chọn đã chốt về Apple secondhand, toàn quốc, phí tháng, giữ hàng và website sau bản đầu. Phương án admin giữ tiền được tách thành đề xuất cần thẩm định; không coi là tính năng đã chốt.

## Kiểm chứng

Đối chiếu nguồn chính thức về trung gian thanh toán và hóa đơn; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-06-codex-product-decisions.md`. Repo chưa có ứng dụng để test.

## Còn lại

Cần người dùng tiếp tục xác định quy định chi tiết, cách báo giá, kênh liên lạc, thời hạn giữ hàng và quyền cộng tác viên. Cần chuyên gia phù hợp đánh giá phương án giữ tiền và hóa đơn trước khi triển khai.

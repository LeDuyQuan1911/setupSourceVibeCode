# Cập nhật cơ chế hợp tác giữa các shop

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Sửa tài liệu theo cơ chế hai shop đồng ý hợp tác trước khi treo hàng của nhau, giao dịch trực tiếp và đơn online; cập nhật vai trò shop, cộng tác viên và admin.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `PLAN.md` và `contexte/decisions.md`: hợp tác hai chiều, giao dịch trực tiếp, đơn online và vai trò người dùng.

## Quyết định

Một shop có thể đổi vai trò theo giao dịch. Reseller nhận tiền khách và trả shop nguồn; hai shop xác nhận trước khi shop nguồn chuyển hàng tới khách. Chi tiết cộng tác viên và hậu mãi vẫn để mở.

## Kiểm chứng

Kiểm tra `git diff --check` và `node scripts/check-worklog.mjs 2026-11-06-codex-shop-collaboration.md`. Không có ứng dụng để chạy test.

## Còn lại

Người dùng sẽ đọc và góp ý các phần tiếp theo của tài liệu. Cần chốt quyền cộng tác viên, phạm vi hợp tác và các bước xử lý ngoại lệ.

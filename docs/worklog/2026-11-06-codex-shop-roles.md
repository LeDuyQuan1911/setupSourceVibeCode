# Làm rõ shop và cộng tác viên

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Giải thích khái niệm xác minh shop và cập nhật vai trò cộng tác viên thuộc shop, bán trên mạng xã hội, cùng hướng quản lý và tự động đăng bài về sau.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` về vai trò CTV, quản lý CTV và ý nghĩa duyệt shop.

## Quyết định

CTV thuộc một shop và bán trên kênh mạng xã hội của mình. Admin duyệt shop mới chỉ là đề xuất, chưa được người dùng chốt.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-06-codex-shop-roles.md`. Chưa có code ứng dụng để test.

## Còn lại

Cần người dùng chốt có duyệt shop mới không, quyền CTV với đơn hàng và thời điểm triển khai trang quản trị CTV.

# Giá dao động theo dòng iPhone

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Làm rõ một dòng iPhone có nhiều máy cũ với giá riêng; trang danh mục của một shop hiển thị khoảng giá cho dòng đó.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` để phân biệt mẫu iPhone, từng máy và khoảng giá theo shop.

## Quyết định

Danh mục một shop hiển thị giá thấp nhất–cao nhất của các máy còn hiện bán; mỗi tin và lượt giữ hàng vẫn theo một máy và giá cụ thể.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-model-price-range.md`. Chưa có ứng dụng để test.

## Còn lại

Thời hạn giữ hàng vẫn cần người dùng chốt.

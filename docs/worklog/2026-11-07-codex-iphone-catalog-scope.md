# Chốt phạm vi danh mục iPhone

- Ngày: 2026-11-07
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Ghi phạm vi bản đầu là toàn bộ dòng iPhone secondhand; Apple là danh mục cấp cao, có thể mở rộng sang nhóm hàng khác sau.

## Thực hiện

Cập nhật `SPEC.md`, `docs/product-b2b-secondhand.md`, `docs/rules-outline.md`, `PLAN.md` và `contexte/decisions.md` để thay phạm vi Apple chung bằng iPhone secondhand ở bản đầu.

## Quyết định

Apple là danh mục cấp cao; bản đầu gồm mọi dòng iPhone, các danh mục khác mở rộng về sau.

## Kiểm chứng

Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-07-codex-iphone-catalog-scope.md`. Chưa có ứng dụng để test.

## Còn lại

Cần chốt trường thông tin bắt buộc của một tin iPhone secondhand.

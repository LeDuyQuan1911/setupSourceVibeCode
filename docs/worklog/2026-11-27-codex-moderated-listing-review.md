# Xét duyệt lại tin bị admin ẩn

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Tạo luồng shop sửa tin vi phạm rồi gửi xét duyệt lại trên web; admin quyết định trước khi tin được hiện.

## Thực hiện
Đối chiếu quyền sửa tin, admin ẩn tin và bản treo reseller. Cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm T-73.

## Quyết định
Shop nguồn bấm Gửi xét duyệt lại sau khi sửa; admin chấp nhận/từ chối đúng phiên bản được gửi, chỉ chấp nhận mới gỡ lý do ẩn vi phạm. Sửa tiếp làm lượt gửi cũ mất hiệu lực. Các điều kiện bán khác vẫn áp dụng.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-moderated-listing-review.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Chưa triển khai code; quyền admin can thiệp nội dung khác và chat/tranh chấp vẫn mở ở DEC-10.

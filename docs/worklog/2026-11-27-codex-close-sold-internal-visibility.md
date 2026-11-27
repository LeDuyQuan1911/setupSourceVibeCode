# Chốt mục Đã bán chỉ hiển thị nội bộ

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi rõ khách và shop không tham gia không được xem mục Đã bán; bỏ câu hỏi công khai khỏi quyết định mở.

## Thực hiện
Cập nhật SPEC, PLAN, CAT-06, màn hình, quyền, API, nghiệm thu và sổ quyết định; bỏ câu hỏi công khai Đã bán khỏi mục quyết định mở.

## Quyết định
Đã bán chỉ nội bộ cho nguồn, shop bán và CTV tham gia theo quyền; khách/shop không tham gia không xem.

## Kiểm chứng
Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-close-sold-internal-visibility.md`.

## Còn lại
Chưa triển khai code; thời hạn lưu lịch sử vẫn còn mở.

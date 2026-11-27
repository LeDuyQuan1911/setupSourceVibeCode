# CTV xem cùng máy đã bán theo shop quản lý

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đính chính CTV tham gia bán cũng thấy chính máy đó trong Đã bán; chỉ thấy shop quản lý B, không thấy shop nguồn A.

## Thực hiện
Đính chính SPEC, PLAN, CAT-06, workflow, màn hình, quyền, dữ liệu, API, nghiệm thu, quyết định mở và nhật ký quyết định để CTV cũng thấy cùng máy đã bán trong phạm vi mình tham gia.

## Quyết định
CTV tham gia bán xem cùng item sold với A và B; chỉ thấy shop quản lý B, không thấy shop nguồn A hoặc giá nguồn. CTV khác không thấy máy/đơn này.

## Kiểm chứng
Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-ctv-sold-item-visibility.md`.

## Còn lại
Chưa triển khai code; quy tắc hiện ở tài liệu thiết kế.

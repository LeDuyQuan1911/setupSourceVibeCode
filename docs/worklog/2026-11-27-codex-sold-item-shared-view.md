# Đính chính hiển thị máy đã bán qua reseller

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Làm rõ máy của A do B bán vẫn là cùng một máy đã bán; A và B được xem theo quyền, có cột Người bán.

## Thực hiện
Đính chính SPEC, PLAN, CAT-06, workflow, màn hình, quyền, data model, API, nghiệm thu, quyết định mở và nhật ký quyết định. Bỏ diễn giải danh sách bán được tách theo shop đứng bán; mô tả cùng item sold được A và B xem theo quyền.

## Quyết định
Một item của A do B bán chỉ chuyển sold một lần. Cột Người bán là B; CTV chỉ xem đơn/giao dịch mình tham gia và không thấy thông tin nguồn.

## Kiểm chứng
Rà soát nội dung đồng bộ; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-sold-item-shared-view.md`.

## Còn lại
Chưa triển khai code; việc công khai dữ liệu đã bán cho người ngoài vẫn chưa chốt.

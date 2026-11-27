# Cột shop nguồn, shop bán và CTV bán

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Khi CTV shop B bán máy nguồn A, mục Đã bán phải cho biết shop nguồn, shop bán và CTV bán theo quyền xem.

## Thực hiện
Cập nhật SPEC, PLAN, CAT-06, workflow, màn hình, quyền, dữ liệu, API, nghiệm thu, quyết định mở và nhật ký quyết định để hiện đủ ba vai trò của lần bán.

## Quyết định
Một item sold gắn Shop nguồn A, Shop bán B, CTV bán nếu có. A/B thấy đủ ba trường; CTV thấy B và chính mình, không thấy A hoặc giá nguồn.

## Kiểm chứng
Rà soát tính nhất quán; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-sold-source-shop-ctv-columns.md`.

## Còn lại
Chưa triển khai code; chỉ cập nhật thiết kế.

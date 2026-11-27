# Chốt nhận xét hồ sơ shop mới

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định về một nhận xét của mỗi shop approved cho mỗi lần nộp hồ sơ, quyền sửa/rút trước admin quyết định và phạm vi người xem. Chỉ sửa docs, không sửa code.

## Thực hiện
Đồng bộ SPEC, PLAN, quyết định, SHOP-03, workflow, màn hình, phân quyền, data model, API, nghiệm thu và mục quyết định mở. Gắn nhận xét với từng lần nộp, giới hạn một bản ghi/tác giả/lần nộp; sửa/rút chỉ khi pending và giữ lịch sử.

## Quyết định
Admin quyết định cuối, không cần nhận xét; shop approved tối đa một nhận xét/lần nộp, được sửa/rút trước quyết định; shop gửi xem của mình, admin xem tất cả, shop nộp hồ sơ không xem nhận xét shop khác.

## Kiểm chứng
Rà docs liên quan; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-close-shop-reviews.md`.

## Còn lại
Chưa triển khai code/test runtime. Cách xử lý nhận xét mâu thuẫn hoặc lạm dụng và quy trình nộp lại vẫn cần chốt.

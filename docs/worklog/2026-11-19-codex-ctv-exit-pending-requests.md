# Chốt CTV rời shop khi còn request

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt cách xử lý khi chủ shop ngừng hợp tác với CTV: hủy request CTV chưa duyệt, còn giao dịch đã duyệt phải xử lý xong. Đồng bộ docs và chuyển sang vấn đề tiếp theo; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 12_open-decisions.md và contexte/decisions.md; không sửa code. Rà tiếp vấn đề còn mở của luồng CTV.

## Quyết định
Chỉ chủ shop kết thúc membership CTV. Request chưa được duyệt bị hủy trong cùng thao tác kết thúc, giữ lịch sử và báo CTV. Nếu có request/đơn đã duyệt, request nguồn, hold hoặc đơn giao dịch mở gắn CTV, chặn toàn bộ thao tác cho đến khi xử lý xong. Sau kết thúc CTV mất quyền shop cũ và được tham gia shop khác.

## Kiểm chứng
Rà CTV-07, workflow, UI, quyền, dữ liệu/API, T-41 và quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-ctv-exit-pending-requests.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa triển khai code. Cần chốt chi tiết lời mời, quyền xem thông tin khách và lịch sử sau rời shop.

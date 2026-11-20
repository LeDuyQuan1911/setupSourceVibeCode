# Chọn một request giữ máy nguồn

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt khi nhiều reseller/CTV request cùng một máy, nguồn được chọn một request bất kỳ; xác nhận một request thì tự từ chối các request còn lại, hết hold thì shop khác gửi request mới. Đồng bộ docs trước triển khai; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md và 12_open-decisions.md. Ghi quyết định vào contexte/decisions.md.

## Quyết định
A chọn một request đang chờ bất kỳ cho cùng máy. Confirm request thắng bắt đầu hold 12 giờ và tự từ chối request còn lại trong cùng transaction. Hủy/hết hạn hold không phục hồi request đã bị từ chối; shop có thể gửi request mới nếu máy/quan hệ còn hợp lệ.

## Kiểm chứng
Rà trạng thái request/hold, quyền, transaction, API và case cạnh tranh; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-competing-source-requests.md` và `git diff --check` trước bàn giao.

## Còn lại
Các quyền rút request/hủy hold sau confirm, lý do và bằng chứng chốt vẫn cần duyệt trong DEC-08; chưa triển khai code.

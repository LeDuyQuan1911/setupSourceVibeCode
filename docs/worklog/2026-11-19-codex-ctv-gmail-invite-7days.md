# Lời mời CTV qua Gmail trong 7 ngày

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt chủ shop mời CTV bằng Gmail; người nhận đăng nhập hoặc đăng ký đúng Gmail và bấm Chấp nhận trong 7 ngày mới có quyền CTV. Đồng bộ docs, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 12_open-decisions.md và contexte/decisions.md. Không sửa code.

## Quyết định
Chủ shop mời bằng Gmail; lời mời hiệu lực 7 × 24 giờ từ lúc gửi. Người nhận đăng nhập/đăng ký đúng Gmail đã xác thực và bấm Chấp nhận trước hạn mới có membership CTV active; mở lời mời chưa cấp quyền, một CTV chỉ có một shop active.

## Kiểm chứng
Rà CTV-01/02, workflow, UI, quyền, data/API, T-43 và quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-ctv-gmail-invite-7days.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa triển khai code. Cách hủy/gửi lại lời mời và quyền xem lịch sử sau rời shop còn cần chốt.

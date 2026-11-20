# Hủy lời mời CTV đã gửi

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn cơ chế gửi lời mời CTV qua Gmail và hủy lời mời đã gửi để Gmail đó không thể dùng lời mời cũ kích hoạt quyền. Đồng bộ docs, không sửa code hoặc vô hiệu tài khoản Gmail.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 12_open-decisions.md và contexte/decisions.md. Không sửa code.

## Quyết định
Chỉ chủ shop hủy lời mời CTV chưa chấp nhận; token/link cũ hết hiệu lực ngay. Hủy không vô hiệu tài khoản Gmail hoặc membership đã accepted; muốn kết thúc CTV active thì dùng luồng ngừng hợp tác. Hủy không tự gửi lời mời mới.

## Kiểm chứng
Rà CTV-01/02, workflow, UI, quyền, data/API, T-44 và quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-revoke-ctv-invitation.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa triển khai code. Quy tắc nhiều lời mời pending cùng Gmail và quyền xem lịch sử sau rời shop còn mở.

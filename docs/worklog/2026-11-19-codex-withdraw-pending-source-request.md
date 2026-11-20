# B rút request giữ máy chưa được duyệt

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt shop B được rút request xin giữ máy trước khi shop nguồn A xác nhận; quyền hủy hold đã xác nhận sẽ chốt riêng. Đồng bộ tài liệu nghiệp vụ, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md và 12_open-decisions.md. Ghi quyết định trong contexte/decisions.md.

## Quyết định
Chủ shop B được rút request thuộc B khi còn requested. Request chuyển cancelled, không giữ máy hoặc thu phí. Rút và A confirm cạnh tranh chỉ một bên thành công; sau khi A confirm, quyền rút request không dùng để hủy hold. CTV chưa được tự cấp quyền rút.

## Kiểm chứng
Rà luồng trạng thái, quyền, dữ liệu/API và case rút/confirm cạnh tranh; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-withdraw-pending-source-request.md` và `git diff --check` trước bàn giao.

## Còn lại
Quyền hủy hold sau xác nhận và quyền CTV rút thay chủ shop B chưa được chốt; chưa sửa code.

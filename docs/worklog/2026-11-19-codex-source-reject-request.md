# Nguồn từ chối riêng request đang chờ

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt A được chủ động từ chối riêng request xin giữ đang chờ, có ô lý do tùy chọn, thông báo shop yêu cầu, không ảnh hưởng request khác hoặc giữ máy; đồng thời muốn chuyển sang vấn đề tiếp theo. Đồng bộ docs và nêu câu hỏi tiếp, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md và 12_open-decisions.md. Bổ sung T-38 và ghi quyết định trong contexte/decisions.md. Rà quyết định mở tiếp theo của DEC-08.

## Quyết định
A được từ chối riêng request còn requested với lý do tùy chọn; shop gửi được báo, các request khác và máy không đổi, không thu phí. Từ chối tự động khi chọn request khác là nguyên nhân hệ thống riêng. Reject/withdraw/confirm tranh cùng request chỉ một thao tác thắng.

## Kiểm chứng
Rà state machine, quyền, dữ liệu/API, case cạnh tranh và DEC-08; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-source-reject-request.md` và `git diff --check` trước bàn giao.

## Còn lại
Bằng chứng khi A xác nhận chốt giao dịch thành công trong 12 giờ còn cần chốt; chưa sửa code.

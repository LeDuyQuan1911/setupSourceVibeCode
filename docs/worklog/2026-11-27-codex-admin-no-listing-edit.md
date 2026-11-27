# Admin không sửa tin hộ shop

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt ranh giới admin chỉ ẩn và xét duyệt tin shop tự sửa, không sửa nội dung tin hộ shop.

## Thực hiện
Đối chiếu DEC-10, quyền sửa tin và luồng xét duyệt lại; cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md.

## Quyết định
Chỉ shop nguồn sửa nội dung tin/máy theo điều kiện hiện có; admin chỉ ẩn tin và chấp nhận hoặc từ chối đúng phiên bản shop tự sửa, tự gửi. Không thêm form hay API admin sửa nội dung hộ shop.

## Kiểm chứng
Đối chiếu nội dung các tài liệu liên quan; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-admin-no-listing-edit.md` trước bàn giao. Không có test ứng dụng vì chỉ đổi tài liệu.

## Còn lại
Chưa triển khai code; quyền xem chat và xử lý khiếu nại của admin còn mở ở DEC-10.

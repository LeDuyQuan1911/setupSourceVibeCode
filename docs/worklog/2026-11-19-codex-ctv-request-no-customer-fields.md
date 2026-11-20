# Request CTV không nhập thông tin khách

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt CTV chỉ gửi request, không nhập tên/số điện thoại/địa chỉ khách; shop reseller tự làm việc với CTV để xử lý thông tin khách. Đồng bộ tài liệu nghiệp vụ, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 12_open-decisions.md và contexte/decisions.md. Không sửa code.

## Quyết định
Request CTV chỉ ghi máy và số tiền đề xuất; không có trường tên/số điện thoại/địa chỉ khách. Shop reseller tự làm việc với CTV để có thông tin khách khi cần. Request không tự tạo đơn khách web; luồng chủ shop duyệt rồi mới request nguồn cho hàng resell không đổi.

## Kiểm chứng
Rà CTV-05/06, workflow, UI, quyền, data/API, T-42 và quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-ctv-request-no-customer-fields.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa triển khai code. Vẫn cần chốt lời mời CTV, quyền xem lịch sử sau rời shop và giá tối thiểu CTV.

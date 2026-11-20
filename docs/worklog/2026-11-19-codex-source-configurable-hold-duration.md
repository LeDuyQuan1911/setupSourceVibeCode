# Đề xuất nguồn đặt thời gian giao dịch

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn shop nguồn có cơ chế đặt số giờ tối đa cho shop reseller hoàn tất giao dịch lấy máy. Rà tác động tới lượt giữ đang cố định 12 giờ và cập nhật tài liệu nghiệp vụ; không sửa code.

## Thực hiện
Đã hỏi và nhận quyết định cấu hình riêng cho từng reseller B, thấp nhất 12 và cao nhất 72 giờ. Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 6_architecture.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md, 12_open-decisions.md và contexte/decisions.md; không sửa code.

## Quyết định
A đặt số giờ nguyên 12–72 riêng cho từng B, mặc định 12; CTV thuộc B dùng mức của B. Chụp mức lúc A xác nhận request, lưu vào hold và tính expires_at. Thay đổi mức chỉ áp dụng hold mới; hạn đơn khách web độc lập. Đúng expires_at, hold hết hiệu lực như quy tắc đã chốt.

## Kiểm chứng
Rà các tài liệu đã sửa, tìm mốc cố định cũ; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-source-configurable-hold-duration.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa có code cho quan hệ cấu hình hoặc hold. Endpoint/schema cụ thể và kiểm thử race cần chốt khi triển khai module; nguyên tắc nghiệp vụ đã rõ.

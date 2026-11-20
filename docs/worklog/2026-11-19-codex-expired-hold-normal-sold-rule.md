# Dùng nút đã bán thông thường sau khi giữ hết hạn

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng bác bỏ chức năng bán muộn riêng: A dùng nút Sản phẩm đã bán như bình thường, không trừ phí B. Thêm nội quy: nếu sự cố giao dịch không có thông tin đơn trong chợ, reseller không được report shop nguồn. Chỉ sửa tài liệu, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md, 12_open-decisions.md và contexte/decisions.md. Bỏ câu hỏi phí/bán muộn còn mở, ghi nội quy report, không sửa ứng dụng.

## Quyết định
Từ đúng mốc 12 giờ hold hết hiệu lực. A chỉ dùng nút Sản phẩm đã bán thông thường khi không có giao dịch mới; không hoàn tất hold cũ, không gắn B hoặc thu phí B. Nếu khách đã đặt mua khi tin hiện lại, A tự xử lý với khách, không ghi đè đơn. Giao dịch không có thông tin đơn trong chợ thì reseller không được report shop nguồn về giao dịch đó qua chợ; đây là nội quy, không yêu cầu chức năng riêng.

## Kiểm chứng
Rà các điểm liên quan trên docs; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-expired-hold-normal-sold-rule.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa có code cho hold/tin/đơn. Quy trình report hợp lệ nói chung và cách xử lý tranh chấp ngoài chợ vẫn thuộc nội quy cần soạn chi tiết, không phải phần triển khai của yêu cầu này.

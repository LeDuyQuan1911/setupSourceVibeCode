# Xử lý máy sau khi lượt giữ hết hạn

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt trường hợp A và B đã giao dịch ngoài website nhưng A quên bấm hoàn tất trong 12 giờ: tin mở bán lại khi hết hạn; A có thể đánh dấu máy đã bán; nếu đã phát sinh khách mới thì A tự làm việc với khách. Đồng bộ tài liệu nghiệp vụ, không triển khai code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md và 12_open-decisions.md; ghi quyết định trong contexte/decisions.md. Không thay đổi source ứng dụng.

## Quyết định
Hold hết hiệu lực từ đúng expires_at; tin đủ điều kiện hiện lại. Nếu A đã giao dịch với B nhưng quên bấm, A đánh dấu máy Đã bán khi chưa có giao dịch mới; nếu khách đã đặt mua, A tự làm việc với khách, hệ thống không ghi đè giao dịch đó. Hold expired không complete muộn. Cách ghi B/phí chợ cho bán muộn chưa chốt.

## Kiểm chứng
Rà các tài liệu đã đồng bộ; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-expired-hold-mark-sold.md` và `git diff --check` trước bàn giao.

## Còn lại
Cần chốt cách ghi nhận reseller B và phí chợ 50.000đ khi A đánh dấu bán sau hạn. Chưa triển khai code.

# Shop nguồn xác nhận đã chuyển tiền đối soát COD

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt website hiển thị số tiền shop nguồn A cần chuyển reseller B sau COD thành công; A chuyển tiền ngoài website rồi bấm “Đã chuyển” để hoàn tất phần đối soát. Đồng bộ tài liệu trước triển khai, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md và 12_open-decisions.md. Bổ sung case T-37 và quyết định tại contexte/decisions.md.

## Quyết định
Với COD reseller giao thành công, website tính và hiển thị khoản A còn chuyển B từ snapshot đơn. A chuyển ngoài website rồi chủ shop nguồn A bấm “Đã chuyển”, đối soát của đơn hoàn tất ngay, không cần B xác nhận. Lưu actor/thời điểm một lần; nút không tự chuyển tiền, không xác minh ngân hàng, không đổi trạng thái giao hàng hoặc phí chợ.

## Kiểm chứng
Đối chiếu yêu cầu, luồng, quyền, dữ liệu, API và case nghiệm thu; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-source-confirms-cod-settlement.md` và `git diff --check` trước bàn giao.

## Còn lại
Thời hạn và chứng từ chuyển tiền đối soát A/B còn chưa chốt; chưa triển khai code.

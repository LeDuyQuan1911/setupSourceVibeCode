# Cộng bù thời gian gói khi khóa shop

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt thời gian gói tháng đã trả và kỳ trải nghiệm 14 ngày được tạm dừng khi admin khóa shop, cộng bù khi mở khóa.

## Thực hiện
Đối chiếu DEC-10, kỳ trải nghiệm và hai gói chợ/website mẫu; cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm T-71.

## Quyết định
Kỳ trải nghiệm và gói đã trả còn hiệu lực dừng thời gian từ lúc khóa đến lúc mở; phần còn lại tiếp tục sau mở khóa. Không bù kỳ/gói đã hết trước lúc khóa, không cộng lại số dư tặng.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-suspension-plan-pause.md`. Không chạy test ứng dụng vì chỉ sửa tài liệu.

## Còn lại
Chưa triển khai code; các quyền admin khác của DEC-10 còn mở.

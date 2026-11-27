# Trải nghiệm chợ và số dư tặng

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt shop lần đầu được duyệt có 14 ngày trải nghiệm chợ và 100.000đ số dư tặng ban đầu; sửa cách hiểu nhầm 100.000đ là giá gói thử.

## Thực hiện
Đối chiếu FEE-01, DEC-09, SHOP-05/06 và vòng đời duyệt shop. Cập nhật SPEC.md, PLAN.md, docs/2_requirements.md, docs/3_workflows.md, docs/4_screens.md, docs/5_permissions-security.md, docs/7_data-model.md, docs/8_api-contracts.md, docs/9_testing-acceptance.md, docs/12_open-decisions.md và contexte/decisions.md. Thêm T-69.

## Quyết định
Trải nghiệm chợ 14 ngày từ lần duyệt đầu, tặng 100.000đ vào số dư phí chợ một lần/shop; tiền tặng không hết hạn theo kỳ thử. Phí resell vẫn áp dụng và website mẫu là gói riêng. Admin kiểm soát chính sách tặng trên dashboard.

## Kiểm chứng
Rà tính nhất quán, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-first-trial-wallet-credit.md`. Không chạy test ứng dụng vì chỉ sửa docs.

## Còn lại
Chưa triển khai code; chi tiết nhà cung cấp webhook còn mở ở DEC-09.

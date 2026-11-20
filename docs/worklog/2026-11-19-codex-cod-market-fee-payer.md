# Phí chợ 50.000đ cho đơn có cọc

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định khoản trừ 50.000đ từ số dư shop cho mỗi đơn có cọc là phí chợ: đơn shop nguồn tự bán thì nguồn trả, đơn reseller bán thì reseller trả. Phân biệt phí chợ với cọc khách và đối soát giữa hai shop; phần chưa chốt giữ mở.

## Thực hiện
Đồng bộ FEE-02 vào `SPEC.md`, `PLAN.md`, `docs/1_README.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/5_permissions-security.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/11_rules.md`, `docs/12_open-decisions.md`; thêm quyết định vào `contexte/decisions.md`. Bổ sung ca T-33, cập nhật số mã yêu cầu/case. Không thay đổi code hay cấu trúc file.

## Quyết định
50.000đ mỗi đơn có cọc là phí chợ từ số dư shop bán đã nạp. Nguồn tự bán trả phí của nguồn; reseller bán sản phẩm nguồn trả phí của reseller. Phí tách khỏi cọc khách và tiền đối soát A/B; không phải tiền chợ giữ tạm hoặc khoản bù giá nguồn.

## Kiểm chứng
Đối chiếu payer trong yêu cầu/luồng/quyền/API/case; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-cod-market-fee-payer.md`, kiểm tra trùng mã yêu cầu/case, liên kết Markdown và `git diff --check`.

## Còn lại
Mốc trừ phí, cách xử lý phí khi đơn giao thất bại, nạp/thiếu số dư và phương thức đối soát A/B cần chốt. Cơ chế tương lai trừ số dư tương ứng cọc khách chưa áp dụng. Chưa kiểm chứng runtime vì module COD/số dư chưa có trong code.

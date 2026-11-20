# Tạo đơn COD sau khi xác nhận cọc

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng sửa thứ tự luồng COD: khách chốt cọc trước, sau đó mới tạo đơn COD. Sửa tài liệu đang gọi giai đoạn chờ cọc là đơn COD; giữ mốc 15 phút và khóa một máy không bán trùng. Đồng bộ mốc trừ phí chợ với đơn COD thực sự được tạo; không sửa code.

## Thực hiện
Đồng bộ thứ tự tạo đơn COD trong `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/5_permissions-security.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/11_rules.md`, `docs/12_open-decisions.md`; bổ sung quyết định mới trong `contexte/decisions.md` thay cách gọi cũ. Không sửa code/cấu trúc file.

## Quyết định
Chọn COD tạo lượt chờ cọc giữ máy tối đa 15 phút, chưa phải đơn. Chỉ cọc được xác nhận hợp lệ trước hạn mới tạo đơn COD Chờ giao, chuyển khóa máy sang đơn và trừ phí chợ 50.000đ shop bán. Hết hạn không có đơn để hủy, máy được mở; cọc muộn không tự tạo đơn. Lượt chờ không thành đơn không chịu phí.

## Kiểm chứng
Rà các cụm “đơn COD Chờ cọc” trong docs hiện hành, đối chiếu WEB-01/03, FEE-02 và T-21/32/33; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-cod-order-after-deposit.md`, kiểm tra IDs/liên kết Markdown và `git diff --check`.

## Còn lại
Cần chốt ai/xác nhận cọc bằng chứng gì, cách xử lý thiếu số dư lúc tạo đơn và nạp tiền. Module COD/số dư chưa có code nên chưa kiểm chứng runtime.

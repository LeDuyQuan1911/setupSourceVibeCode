# Xác nhận cọc COD bằng QR và webhook

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng đề xuất dùng QR và webhook để tự xác nhận cọc thay vì shop bấm xác nhận thủ công. Kiểm tra khả năng từ tài liệu kỹ thuật chính thức, ghi luồng mục tiêu và ranh giới chưa chốt; không chọn nhà cung cấp hoặc sửa code.

## Thực hiện
Đọc tài liệu repo và `docs/6_architecture.md`; đối chiếu tài liệu chính thức payOS về QR/webhook và signature, SePay về QR/webhook, xác thực/idempotency. Đồng bộ luồng mục tiêu vào `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/5_permissions-security.md`, `docs/6_architecture.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/10_operations.md`, `docs/12_open-decisions.md`; ghi quyết định ở `contexte/decisions.md`. Không chọn provider, thêm dependency hoặc sửa code/cấu trúc file.

## Quyết định
Mỗi lượt chờ cọc COD có QR/mã tham chiếu riêng để khách chuyển tới tài khoản shop bán; webhook giao dịch được xác thực và đối chiếu mới tạo đơn COD/trừ phí chợ. Quét QR, ảnh chuyển khoản hoặc thao tác khách không tự xác nhận tiền. Webhook sai/trùng không tạo đơn; webhook muộn không tự khôi phục lượt giữ máy. Nguồn tài liệu tham khảo: https://payos.vn/docs/ và https://developer.sepay.vn/en/sepay-webhooks/tao-qr-va-form-thanh-toan ; chưa chọn nhà cung cấp.

## Kiểm chứng
Rà yêu cầu/luồng/API/dữ liệu/quyền/case, chạy `node scripts/check-worklog.mjs 2026-11-19-codex-qr-webhook-deposit.md`, kiểm tra mã yêu cầu/case và liên kết Markdown, `git diff --check`.

## Còn lại
Chưa chọn nhà cung cấp hỗ trợ tài khoản nhiều shop, cơ chế đăng ký/kết nối tài khoản và xác thực webhook cụ thể. Cần chốt giao dịch đến trước hạn nhưng webhook đến sau hạn, webhook thất lạc và thiếu số dư shop lúc tạo đơn. Module COD/thanh toán chưa có code nên chưa kiểm chứng runtime.

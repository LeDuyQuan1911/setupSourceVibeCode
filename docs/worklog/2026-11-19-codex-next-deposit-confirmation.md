# Rà người xác nhận cọc COD

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt luồng COD sau khi xác định đơn COD chỉ tạo khi cọc được xác nhận. Rà tài liệu và nêu điểm cần chốt tiếp theo; chưa thay đổi yêu cầu khi người dùng chưa duyệt.

## Thực hiện
Đọc tài liệu nền và phần COD trong `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/5_permissions-security.md`, `docs/8_api-contracts.md`, `docs/12_open-decisions.md`; thấy chưa chốt chủ thể/kênh xác nhận cọc, dù hành động này tạo đơn và trừ phí. Không sửa yêu cầu/code.

## Quyết định
Không có. Đề xuất để người dùng duyệt: shop đứng bán là bên xác nhận tiền cọc đã vào tài khoản mình (reseller B cho đơn web B, nguồn A nếu tự bán); xác nhận qua thao tác có quyền trên website, không dựa vào ảnh chuyển khoản hoặc client tự khai. Cần tiếp tục chốt mốc thời gian nếu tiền đến trước hạn nhưng shop xác nhận sau hạn.

## Kiểm chứng
Đối chiếu nơi cọc được chuyển với quyền tạo đơn COD; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-next-deposit-confirmation.md`.

## Còn lại
Chờ chủ dự án chốt bên xác nhận cọc và cơ chế xác nhận; không thay docs chuẩn trước khi có quyết định.

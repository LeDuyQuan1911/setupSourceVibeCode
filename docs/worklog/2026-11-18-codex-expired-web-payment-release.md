# Giải phóng máy khi thanh toán web quá hạn

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định: đơn trả đủ hết hạn chưa xác nhận tiền thì giải phóng máy; tiền đến muộn shop xác nhận bán nếu máy còn bán được, nếu máy đã thuộc giao dịch khác thì hoàn tiền. Không tự chốt thời hạn thanh toán hoặc triển khai code.

## Thực hiện
Cập nhật WEB-02 và quy tắc đơn web trong `docs/2_requirements.md`; đồng bộ `docs/3_workflows.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, T-20, `docs/12_open-decisions.md`, `SPEC.md`, `PLAN.md`. Thêm quyết định mới vào `contexte/decisions.md`; giữ nguyên mục lịch sử trước. Không đổi đường dẫn nên không sửa MAP.

## Quyết định
Đúng hạn hết quyền giữ theo giờ DB, không chờ worker. Tiền đến muộn không tự ghi Đã mua; shop đối chiếu tiền và khóa lại máy còn bán được trước khi xác nhận. Máy đã bán hoặc đang thuộc giao dịch khác thì không xác nhận đơn cũ và phải hoàn khoản tiền đã nhận.

## Kiểm chứng
Đối chiếu tài liệu bằng `rg`; kiểm tra 60 mã yêu cầu, 32 mã test và liên kết nội bộ không trùng/hỏng; `git diff --check` và `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs cho luồng chưa có code.

## Còn lại
Độ dài hạn thanh toán, mốc chụp giá và giá xác nhận muộn, cách đối soát/hoàn tiền, actor giao nhận/nhận hoàn và dòng tiền giữa shop chưa chốt. Không có API/schema/payment integration mới.

# Ngoại lệ hạn mức phí cho QR đã phát

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt khi nhiều lượt QR COD reseller đã phát, khách chuyển cọc hợp lệ và phí của lượt sau khiến số dư dưới âm 100.000đ thì vẫn tạo đơn, trừ phí và xử lý bình thường. Cập nhật tài liệu, không sửa code.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, trạng thái Git và quyết định trước. Sửa SPEC/PLAN, yêu cầu FEE-02, workflow, màn hình, quyền, dữ liệu, API, T-33, quy định và quyết định mở; thêm quyết định vào `contexte/decisions.md`. Không đụng code ứng dụng hoặc thay đổi khác có sẵn.

## Quyết định
`−100.000đ` là ngưỡng ẩn sản phẩm resell/chặn đơn web mới, không là sàn cứng của số dư cho QR COD đã phát trước khi ngưỡng có hiệu lực. Nếu cọc xác nhận hợp lệ trước hạn, vẫn tạo đơn/trừ phí và xử lý bình thường dù số dư xuống `−150.000đ` hoặc thấp hơn. COD thất bại vẫn hoàn phí đã trừ một lần.

## Kiểm chứng
Rà các phát biểu cũ về sàn cứng bằng `rg`; kiểm tra `git diff --check` không có lỗi whitespace. Chạy `node scripts/check-worklog.mjs 2026-11-19-codex-qr-fee-limit-exception.md` trước bàn giao.

## Còn lại
Cần chốt nạp/điều kiện hiện lại sản phẩm resell và xử lý các loại giao dịch đã mở khác khi số dư đang dưới ngưỡng. Chưa có code ví/phí hoặc test runtime.

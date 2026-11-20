# Giao dịch đã mở khi shop chạm ngưỡng phí

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt giao dịch khách đã bắt đầu khi shop còn nhận đơn vẫn tiếp tục dù số dư sau đó chạm ngưỡng phí; phí có thể làm số dư âm thêm. Cần làm rõ thời điểm ẩn/chặn sản phẩm mới rồi cập nhật docs. Không sửa code.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, quyết định và trạng thái Git. Hỏi rõ thời điểm chặn đơn mới; người dùng chốt chặn ngay và tiếp tục giao dịch đã mở. Đồng bộ SPEC, PLAN, FEE-02, workflow, màn hình, quyền, dữ liệu, API, T-33, quy định và quyết định mở; thêm quyết định vào `contexte/decisions.md`. Không sửa code.

## Quyết định
Khi số dư B chạm `−100.000đ`, tạm ẩn sản phẩm resell/chặn đơn web mới ngay. Đơn trả đủ đã tạo hoặc QR COD đã phát trước mốc đó vẫn xử lý thanh toán/cọc hợp lệ trước hạn, trừ phí dù số dư xuống dưới ngưỡng. COD thất bại hoàn phí. Sau giao dịch cũ cuối, sản phẩm vẫn ẩn khi số dư còn âm; chỉ gỡ lý do ẩn vì nợ phí từ `0đ`.

## Kiểm chứng
Rà các đoạn còn giới hạn ngoại lệ ở QR COD, kiểm tra mã FEE-02/T-33 và `git diff --check` không báo lỗi whitespace. Chạy `node scripts/check-worklog.mjs 2026-11-19-codex-open-orders-fee-threshold.md` trước bàn giao.

## Còn lại
Lượt giữ trực tiếp của reseller/CTV đang mở khi chạm ngưỡng cần chốt riêng. Chưa có code ví/phí hoặc test runtime.

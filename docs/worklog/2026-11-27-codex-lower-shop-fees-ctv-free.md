# Đánh giá giảm phí shop và miễn phí CTV

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đánh giá nỗi lo gói chợ 700.000đ/1.000.000đ quá cao và cân nhắc CTV 100.000đ, 150.000đ hoặc miễn phí; chưa chốt giá thay chủ dự án.

## Thực hiện
Đối chiếu FEE-01/FEE-02 với phân tích hạ tầng ở worklog pricing-unit-economics-review. Tính số shop cần để bù ngân sách hạ tầng giả định 5–7 triệu đồng/tháng nếu giá gói 299.000đ, 399.000đ, 599.000đ hoặc 699.000đ. Xem CTV là tính năng thúc đẩy giao dịch resell 50.000đ theo mốc đã chốt, không coi giao dịch sẽ chắc chắn phát sinh.

## Quyết định
Không có; đề xuất hạ rào cản cho shop mới và cho CTV miễn phí ban đầu, giữ web 200.000đ nếu là website mẫu dùng chung. Chưa sửa FEE-01 vì chủ dự án đang cân nhắc.

## Kiểm chứng
Tính thử: 5–7 triệu / 399.000 ≈ 13–18 shop; / 699.000 ≈ 8–11 shop, chưa tính add-on hoặc phí giao dịch. Đối chiếu giá hạ tầng chính thức đã ghi ở worklog trước; chạy `node scripts/check-worklog.mjs 2026-11-27-codex-lower-shop-fees-ctv-free.md`.

## Còn lại
Chưa có số shop, đơn, CTV, tỷ lệ resell và chi phí vận hành thực; chưa thể khẳng định lợi nhuận ròng hay chốt chính sách giá.

# Ước tính chi phí lưu trữ ảnh và tệp

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đánh giá liệu gói chợ cố định 499.000đ/shop/tháng có chịu nổi chi phí lưu trữ; chưa chốt nhà cung cấp hoặc giới hạn upload.

## Thực hiện
Đối chiếu DEC-04/07, kiến trúc object storage và giá Cloudflare R2 Standard chính thức ngày 2026-11-27: 10 GB-tháng miễn phí, sau đó 0,015 USD/GB-tháng, không thu phí egress R2 nhưng tính phí thao tác khi vượt mức miễn phí. Tính thử với 26.000đ/USD: 100 GB khoảng 35.000đ/tháng, 1 TB khoảng 386.000đ/tháng, 10 TB khoảng 3,9 triệu đồng/tháng cho dung lượng lưu trữ riêng. Với giả định tổng 8 MB ảnh đã tối ưu/máy, 100.000 máy khoảng 800 GB, phí lưu trữ khoảng 308.000đ/tháng; chưa gồm backup, xử lý ảnh, DB, request, công vận hành. Ảnh gốc lớn hoặc tệp chat/video có thể làm dung lượng tăng mạnh.

## Quyết định
Không có; đề xuất lưu media ở object storage thay vì PostgreSQL, tối ưu ảnh và đặt giới hạn upload hợp lý sau khi chủ dự án chốt DEC-04; theo dõi GB và lượt đọc theo shop trước khi định giá thêm.

## Kiểm chứng
Nguồn: https://developers.cloudflare.com/r2/pricing/ và docs/12_open-decisions.md. Phép tính 1000 GB trừ 10 GB miễn phí × 0,015 USD × 26.000đ ≈ 386.100đ. Chạy `node scripts/check-worklog.mjs 2026-11-27-codex-storage-cost-estimate.md`.

## Còn lại
Chưa có số máy, ảnh/tin, kích thước thực, chính sách lưu chat/backup, lượt xem hoặc nhà cung cấp hạ tầng được chọn; đây chỉ là kịch bản để đánh giá giá gói, không là chi phí vận hành thực tế.

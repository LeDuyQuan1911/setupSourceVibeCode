# Rà giá gói và chi phí hạ tầng

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đánh giá giá gói chợ 700.000đ/300 đơn và 1.000.000đ/500 đơn, add-on CTV 300.000đ/tháng, website 200.000đ/tháng so với chi phí hạ tầng và biên lợi nhuận; chưa chốt FEE-01 thay chủ dự án.

## Thực hiện
Đối chiếu kiến trúc ba tiến trình + PostgreSQL/Redis/media với giá DigitalOcean Droplet, PostgreSQL HA, sao lưu; Cloudflare R2 và Resend. Tham khảo gói web Sapo để đặt mốc thị trường. Dựng cấu hình minh họa: 2 máy ứng dụng 4 GiB ($48), PostgreSQL HA tối thiểu ($60), backup máy (~$10), email Pro ($20), 100 GB ảnh R2 (~$1,35 sau free tier), Redis/monitoring/domain/dự phòng biến động. Tổng ngân sách hạ tầng đầu kỳ nên giả định khoảng 5–7 triệu đồng/tháng thay vì coi giá máy chủ đơn lẻ là toàn bộ chi phí. Với doanh thu bình quân gói chợ 850.000đ/shop, riêng gói chợ cần khoảng 6–9 shop để bù hạ tầng; để còn biên 60% trên hạ tầng cần khoảng 15–21 shop. Add-on và phí resell là doanh thu thêm, không dùng làm giả định chắc chắn.

## Quyết định
Chưa có quyết định giá; khuyến nghị giữ giá gói chợ để thử, định nghĩa đơn tính quota, giới hạn rõ phạm vi add-on CTV/website, theo dõi tải và chi phí thực trước khi đổi giá.

## Kiểm chứng
Nguồn chính thức: DigitalOcean Droplet/PostgreSQL/backup, Cloudflare R2, Resend; giá thị trường Sapo Web Standard. Tính thử 700.000/300 ≈ 2.333đ/đơn; 1.000.000/500 = 2.000đ/đơn; mốc bù hạ tầng dựa 5–7 triệu / 850.000đ. Không chạy test code vì chỉ khảo sát giá. `node scripts/check-worklog.mjs 2026-11-27-codex-pricing-unit-economics-review.md` đạt.

## Còn lại
Chưa có số shop/đơn thực, tỷ lệ dùng CTV/web, lưu lượng ảnh/truy cập, giá nhà cung cấp QR/webhook, chi phí vận hành/hỗ trợ/thuế; chưa thể khẳng định lợi nhuận ròng hoặc chốt FEE-01. Các mức giá nguồn có thể đổi theo thời gian.

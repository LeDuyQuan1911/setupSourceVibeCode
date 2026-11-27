# Đánh giá chuyển dữ liệu cũ từ R2 sang S3

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Giải thích khả năng và lợi ích chuyển dữ liệu ít truy cập từ R2 sang Amazon S3 khi hệ thống lớn lên; chưa chốt nhà cung cấp hoặc triển khai migration.

## Thực hiện
Đối chiếu kiến trúc object storage/media của repo với tài liệu chính thức Cloudflare R2 và AWS S3/Glacier. R2 có S3-compatible API và Infrequent Access; AWS S3 có Standard cùng các lớp Glacier Instant, Flexible và Deep Archive. R2 Standard 0,015 USD/GB-tháng, R2 Infrequent 0,01 USD/GB-tháng kèm phí retrieval; Deep Archive của AWS công bố từ 0,00099 USD/GB-tháng tùy region/điều kiện, thời gian lấy lại từ nhiều giờ và tối thiểu 180 ngày. S3 Standard không mặc định rẻ hơn R2 Standard. Kiến trúc hiện chưa chọn object storage; bảng media mới có storage_key và chưa có provider/tier.

## Quyết định
Không có; đề xuất giữ ảnh đang bán/ảnh lịch sử cần mở nhanh ở R2, chỉ cân nhắc chuyển dữ liệu thật sự ít dùng sang Glacier khi dung lượng và thời hạn lưu đủ lớn. Thiết kế đường dẫn media qua ID nội bộ và khả năng đổi provider/tier để migration sau này không làm vỡ tham chiếu.

## Kiểm chứng
Nguồn: https://developers.cloudflare.com/r2/get-started/s3/ ; https://developers.cloudflare.com/r2/pricing/ ; https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html ; https://aws.amazon.com/s3/pricing/ . Chạy `node scripts/check-worklog.mjs 2026-11-27-codex-r2-to-s3-archive-options.md`.

## Còn lại
Chưa có dung lượng và tần suất truy cập thực, AWS region, retention, yêu cầu khôi phục hoặc nhà cung cấp được chọn; chưa thể khẳng định lợi ích ròng sau phí truy xuất, request, chuyển dữ liệu và vận hành.

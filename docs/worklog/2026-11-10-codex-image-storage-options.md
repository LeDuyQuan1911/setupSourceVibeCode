# Khảo sát lưu ảnh và tệp khi hệ thống tăng quy mô

- Ngày: 2026-11-10
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Đề xuất nơi lưu ảnh sản phẩm và tệp chat khi lưu trên máy chủ ứng dụng không còn phù hợp; chưa chọn nhà cung cấp hoặc triển khai tích hợp.

## Thực hiện

Đối chiếu tài liệu chính thức của Cloudflare R2 và Amazon S3 về object storage, tải lên bằng URL ký tạm thời, vùng lưu trữ và giá truyền dữ liệu. Xem lại kiến trúc dự án: frontend/backend/WebSocket tách tiến trình, chat cần tệp tối đa 10 MB, object storage còn ở trạng thái thiết kế.

## Quyết định

Khuyến nghị dùng object storage quản lý sẵn, ưu tiên cân nhắc Cloudflare R2 Standard cho giai đoạn đầu và giữ lớp lưu trữ tương thích S3 để có thể chuyển sang Amazon S3 nếu cần vùng dữ liệu hoặc yêu cầu vận hành cụ thể. Chưa chốt nhà cung cấp thay chủ dự án.

## Kiểm chứng

Nguồn chính thức xác nhận R2 hỗ trợ presigned PUT/GET và không thu phí egress theo bảng giá hiện hành; AWS S3 hỗ trợ presigned upload và có vùng Singapore. Không chạy benchmark mạng hay tính chi phí thực tế vì chưa có số lượng ảnh và lượt xem.

## Còn lại

Chọn nhà cung cấp theo ngân sách, yêu cầu vị trí dữ liệu và lưu lượng; khi xây module media cần thiết kế bucket riêng cho ảnh sản phẩm và tệp chat, kiểm tra quyền và nội dung sau tải lên, CDN, vòng đời và sao lưu.

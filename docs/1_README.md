# Đọc tài liệu theo thứ tự

Cập nhật: 2026-11-18. Sản phẩm bản chính thức đang ở bước duyệt đặc tả, không phải đã triển khai đủ. Đọc theo số tăng dần; khi làm việc cụ thể chỉ đọc phần liên quan.

| Thứ tự | File | Nơi làm chuẩn |
| --- | --- | --- |
| 1 | [1_README.md](1_README.md) | Cách đọc và phân định tài liệu |
| 2 | [2_requirements.md](2_requirements.md) | Mục tiêu, vai trò, quy tắc sản phẩm và 62 mã yêu cầu |
| 3 | [3_workflows.md](3_workflows.md) | Trạng thái, actor, transaction, đồng thời và worker |
| 4 | [4_screens.md](4_screens.md) | Màn hình, field, thao tác và trạng thái UI |
| 5 | [5_permissions-security.md](5_permissions-security.md) | Quyền, nguy cơ và kiểm soát bảo mật |
| 6 | [6_architecture.md](6_architecture.md) | Topology, ranh giới module, hiệu suất và mở rộng |
| 7 | [7_data-model.md](7_data-model.md) | Schema/ERD, constraint, index và migration |
| 8 | [8_api-contracts.md](8_api-contracts.md) | Hợp đồng HTTP/WS/sự kiện, hiện có và đề xuất |
| 9 | [9_testing-acceptance.md](9_testing-acceptance.md) | Các ca kiểm chứng và bằng chứng nghiệm thu |
| 10 | [10_operations.md](10_operations.md) | Local, phát hành, giám sát và khôi phục |
| 11 | [11_rules.md](11_rules.md) | Chính sách shop và khung quy tắc đăng tin |
| 12 | [12_open-decisions.md](12_open-decisions.md) | Câu hỏi chưa chốt và module bị chặn |

## Cách cập nhật

- Quy tắc nghiệp vụ cập nhật tại requirements, các tài liệu kỹ thuật dẫn mã yêu cầu rồi mô tả phần mình phụ trách; không chép lại toàn bộ quyết định.
- Phân biệt **đã chốt**, **đề xuất**, **hiện có code** và **đã kiểm chứng**. Không dùng thiết kế để khẳng định tính năng đã tồn tại.
- Câu chưa chốt chỉ ở open-decisions; khi chủ dự án trả lời, cập nhật nơi làm chuẩn và ghi lý do/lịch sử vào [contexte/decisions](../contexte/decisions.md). Không nối bản sao quyết định theo ngày vào nhiều docs.
- [SPEC](../SPEC.md) giữ phạm vi ngắn; [MAP](../MAP.md) giữ bản đồ source; [README gốc](../README.md) giữ quickstart; [PLAN](../PLAN.md) giữ tiến độ. [Worklog](worklog/README.md) giữ bằng chứng từng nhiệm vụ, không thay đặc tả hiện hành.
- Khi đổi đường dẫn cập nhật mục lục, AGENTS và liên kết hiện hành; worklog/nhật ký lịch sử giữ nguyên tên/nội dung thời điểm ghi.

Trước code mỗi module, xử lý điểm chặn tương ứng và duyệt thiết kế; trước vận hành, chứng minh các yêu cầu chất lượng và tiêu chí nghiệm thu. Không đánh dấu hoàn thành sản phẩm chỉ vì viết xong docs.

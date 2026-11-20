# Chọn vấn đề nhiều request cùng một máy

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt vấn đề nghiệp vụ lớn. Rà luồng reseller/CTV lấy một máy nguồn khi có nhiều request đồng thời; chưa sửa quy tắc sản phẩm.

## Thực hiện
Đối chiếu README.md, MAP.md, SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md và 12_open-decisions.md. Xác định ưu tiên nhiều request cùng máy là câu hỏi mở trong DEC-08.

## Quyết định
Không có quyết định sản phẩm mới. Đưa tình huống hai shop cùng request một máy và hỏi nguồn được chọn ai cùng cách xử lý request còn lại.

## Kiểm chứng
Kiểm tra lại request chưa giữ máy, chỉ nguồn xác nhận mới bắt đầu giữ 12 giờ và một máy không thể bán hai lần. Chạy trình kiểm tra worklog trước bàn giao.

## Còn lại
Chờ người dùng chốt cách chọn request và trạng thái các request còn lại; sau đó cập nhật tài liệu chuẩn và nhật ký quyết định.

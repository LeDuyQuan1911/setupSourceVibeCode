# Chọn vấn đề B hủy lượt giữ đã xác nhận

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt luồng reseller/CTV lấy máy ngoài website. Rà tài liệu để nêu câu hỏi tiếp theo về quyền hủy lượt giữ 12 giờ đã được nguồn xác nhận; chưa thay đổi quy tắc sản phẩm.

## Thực hiện
Đối chiếu README.md, MAP.md, SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md và 12_open-decisions.md. Xác định B được rút request trước xác nhận nhưng quyền hủy hold confirmed còn mở trong DEC-08.

## Quyết định
Không có quyết định sản phẩm mới. Đề xuất chủ shop B được chủ động hủy hold trong 12 giờ trước khi A chốt bán, với lý do; hỏi người dùng chốt.

## Kiểm chứng
Kiểm tra trạng thái confirmed → cancelled hiện có cho nguồn A, quy tắc giữ 12 giờ và request cũ không tự khôi phục. Chạy trình kiểm tra worklog trước bàn giao.

## Còn lại
Chờ người dùng chốt quyền B hủy hold sau confirm; sau đó đồng bộ tài liệu chuẩn và nhật ký quyết định.

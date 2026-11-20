# Rà quyền xem lịch sử của CTV sau rời shop

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt vấn đề nghiệp vụ tiếp theo. Rà quyền xem lịch sử của CTV sau khi chủ shop ngừng hợp tác; chưa tự chốt hoặc sửa code.

## Thực hiện
Đọc README.md, MAP.md, SPEC.md, phần liên quan PLAN.md, CTV-07 trong docs/2_requirements.md, luồng ngừng hợp tác ở docs/3_workflows.md, docs/5_permissions-security.md và docs/12_open-decisions.md. Xác định đã chốt mất quyền tạo request/xem nguồn hàng shop cũ và giữ lịch sử dữ liệu, nhưng chưa chốt CTV có được tự đọc lịch sử request/giao dịch của mình hay không. Không thay đổi tài liệu nghiệp vụ.

## Quyết định
Không có quyết định sản phẩm mới. Đề xuất CTV sau rời shop chỉ xem read-only các request/giao dịch do chính mình tạo tại shop cũ, không xem hàng/giá hiện tại hoặc lịch sử người khác; hỏi người dùng chốt.

## Kiểm chứng
Đối chiếu CTV-07 với quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-next-ctv-history-after-exit.md` trước bàn giao.

## Còn lại
Chờ người dùng chốt quyền đọc lịch sử sau rời shop. Chưa triển khai code.

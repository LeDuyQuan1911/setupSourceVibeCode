# CTV xác nhận lại khi giá đổi trước duyệt

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn đơn/request CTV chưa được chủ shop đồng ý phải dừng khi giá CTV đổi; báo CTV, nhập số tiền mới và gửi lại nếu muốn tiếp tục. Không gửi lại thì pending và tự hết hạn sau 12 giờ. Cần làm rõ ai nhận thông báo khi CTV gửi lại. Đồng bộ docs, không sửa code.

## Thực hiện
Đã nhận xác nhận request mới phải tới chủ shop quản lý CTV trước, rồi chủ shop mới request nguồn nếu cần. Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 12_open-decisions.md và contexte/decisions.md. Đồng thời sửa đoạn mô tả hold nằm chen giữa bảng API để bảng hợp lệ; không sửa code.

## Quyết định
Giá CTV đổi trước khi chủ shop duyệt thì chặn request cũ, báo CTV xem giá mới. CTV nhập số tiền đề xuất mới và Gửi request lại trước 12 giờ thì mới báo chủ shop quản lý CTV duyệt; nếu không, request cũ hết khỏi danh sách đang xử lý nhưng giữ lịch sử. Hàng resell chỉ request shop nguồn sau khi chủ shop CTV duyệt. Mốc 12 giờ này tách khỏi hạn giữ máy 12–72 giờ.

## Kiểm chứng
Rà CTV-04/05, state machine, màn hình, quyền, dữ liệu/API và T-40; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-ctv-price-change-reconfirm.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa triển khai code. Chi tiết nếu giá lại đổi nhiều lần trong 12 giờ và các trường giá/khách bắt buộc cho request CTV còn cần soạn trước triển khai.

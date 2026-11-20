# Rà giá đơn CTV chờ chủ shop duyệt

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn chuyển sang vấn đề nghiệp vụ tiếp theo cần chốt trong docs trước triển khai. Rà quyết định còn mở về giá đơn CTV đang chờ duyệt, không tự chốt thay người dùng và không sửa code.

## Thực hiện
Đọc README.md, MAP.md, SPEC.md, phần liên quan PLAN.md, CTV-04/05/06 trong docs/2_requirements.md và bảng quyết định trong docs/12_open-decisions.md. Xác định giá CTV trên máy tự cập nhật theo giá đầu vào nhưng đơn CTV tạo chưa giữ máy; thời điểm khóa giá đơn chờ duyệt còn mở. Không thay đổi tài liệu nghiệp vụ.

## Quyết định
Không có quyết định sản phẩm mới. Đưa ví dụ giá thay đổi giữa lúc CTV tạo đơn và lúc chủ shop duyệt để người dùng chốt mốc giá.

## Kiểm chứng
Đối chiếu CTV-04/05/06 và quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-next-ctv-pending-price.md` trước bàn giao.

## Còn lại
Chờ người dùng chốt giá đơn CTV khi giá máy đổi trước lúc chủ shop duyệt. Chưa triển khai code.

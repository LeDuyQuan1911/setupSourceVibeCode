# Cảnh báo tự xác nhận COD giao thất bại

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt shop nguồn A tự nhấn Giao không thành công; website không kiểm tra bằng chứng máy đã quay về. UI cảnh báo khuyên đợi máy về tay để tránh khách đặt khi hàng chưa sẵn. Đồng bộ docs, không sửa code.

## Thực hiện
Cập nhật WEB-04 tại `docs/2_requirements.md`, workflow, màn hình, bảo mật/quyền, dữ liệu, API mục tiêu, T-22, quy định, sổ quyết định mở, SPEC và PLAN. Ghi quyết định mới ở `contexte/decisions.md`, giữ quyết định cũ làm lịch sử. Không đổi cấu trúc/MAP.

## Quyết định
A tự chọn thời điểm nhấn; UI hiển thị cảnh báo trước thao tác nhưng server không bắt bằng chứng hoàn hàng. Server vẫn kiểm tra quyền A, trạng thái đơn và máy chưa sold; nhấn đóng đơn và giải phóng máy như quyết định trước. Trách nhiệm khi nhấn quá sớm thuộc A, quy định chi tiết về khai sai còn cần soạn.

## Kiểm chứng
Rà bằng `rg` để không còn ghi thời điểm nhấn là câu hỏi mở trong docs hiện hành; kiểm tra mã yêu cầu/test và liên kết nội bộ không trùng/hỏng; `git diff --check` và `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs, luồng COD chưa có code.

## Còn lại
Cần chốt đối soát A/B khi COD thành công, hạn chờ cọc và trường hợp chênh lệch B bằng 0. Chưa triển khai giao diện, API/schema hoặc tích hợp vận chuyển.

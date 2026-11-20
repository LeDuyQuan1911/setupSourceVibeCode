# COD giao thất bại mở lại máy và cọc ngoài website

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định mới: shop nguồn A nhấn Giao không thành công thì máy chưa sold trở lại sàn; cọc khi giao thất bại do A/B tự làm việc, website không phân xử/hoàn cọc. Sửa quy tắc cũ giữ máy đến nhận hoàn/kiểm tra; không sửa code.

## Thực hiện
Cập nhật WEB-04 và mô tả COD trong `docs/2_requirements.md`, workflow, màn hình, phân quyền, dữ liệu, API mục tiêu, T-22/T-23, quy định, sổ quyết định mở, SPEC và PLAN. Thêm quyết định mới trong `contexte/decisions.md` nêu rõ thay thế quy tắc cũ; giữ nguyên lịch sử trước đó. Không đổi cấu trúc/MAP.

## Quyết định
A là actor nhấn Giao không thành công; đóng đơn và giải phóng máy chưa sold trong cùng giao dịch. Tin còn active/đủ quyền thì máy xuất hiện lại; tin hidden/expired không tự hiện. Website giữ lịch sử trạng thái nhưng không xử lý cọc thất bại. Chưa tự đặt điều kiện nút chỉ được bấm sau khi máy vật lý quay về A.

## Kiểm chứng
Đối chiếu bằng `rg` để tìm quy tắc COD cũ mâu thuẫn trong docs hiện hành; kiểm tra 60 mã yêu cầu, 32 mã test và liên kết nội bộ không trùng/hỏng; `git diff --check` và `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs, luồng COD chưa có code.

## Còn lại
Cần chốt khi nào A được nhấn Giao không thành công (khi vận chuyển báo lỗi hay sau máy quay về), cách cập nhật tình trạng máy nếu thay đổi, trường hợp tin ẩn/hết hạn và đối soát tiền A/B. Chưa triển khai API/schema hoặc xử lý cọc.

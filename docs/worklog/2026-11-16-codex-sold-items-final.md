# Máy đã bán không mở bán lại

- Ngày: 2026-11-16
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Cập nhật docs: mỗi đơn vị secondhand có tình trạng riêng; bán xong chuyển mục Đã bán và không được mở bán lại. Chỉ sửa tài liệu; giữ nguyên thay đổi có sẵn, không sửa source hoặc migration.

## Thực hiện
Đồng bộ SPEC, PLAN, contexte/decisions và docs 2, 3, 4, 5, 7, 8, 9, 10, 13, 14. Bổ sung CAT-06, mục Đã bán theo trạng thái sold, cấm tái mở bán/gia hạn/tạo tin cho cùng máy/treo lại website. Thiết kế lưu metadata bán, lưu trữ tin, transaction và bảo vệ trạng thái ở service/DB, chặn worker đưa sold về available. Thêm case nghiệm thu cạnh tranh, lưu lịch sử và không xóa mục Đã bán theo job hết hạn 90+3.

## Quyết định
Sold là trạng thái kết thúc của đơn vị hàng, không phải category taxonomy mới. Máy khác cùng mẫu có ID/tình trạng riêng. Không tự cho ngoại lệ mở bán lại khi trả hàng hoặc khai nhầm; chính sách xử lý cần chốt riêng. Không tự thu IMEI/serial để nhận diện trùng. Chi tiết trigger/schema/API là đề xuất, chưa có code.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc, dữ liệu và quyết định; đối chiếu các đường xuất bản/gia hạn/giữ/treo lại. Node kiểm tra 39 liên kết nội bộ: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-16-codex-sold-items-final.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs.

## Còn lại
Triển khai và kiểm thử khi bắt đầu module catalog. Chốt ai xác nhận hoàn tất, xử lý giữ đang mở, quyền xem lịch sử, nhận diện nhập trùng và quy trình khai nhầm/hoàn trả nếu cần. Không đổi cấu trúc file nên không cần cập nhật MAP. Không commit/push.

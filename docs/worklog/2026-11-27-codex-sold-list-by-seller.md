# Chốt danh sách đã bán theo người bán

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quy tắc shop/CTV xem các máy hoặc đơn mình bán được, gồm hàng tự sở hữu và resell; hàng resell của B hiển thị shop nguồn A. Chỉ sửa docs, chưa sửa code.

## Thực hiện
Đồng bộ SPEC, PLAN, CAT-06, workflow, màn hình, phân quyền, data model, API, nghiệm thu, quyết định mở và lịch sử quyết định. Tách danh sách giao dịch shop bán được khỏi lịch sử item thuộc kho nguồn; gắn CTV vào cùng lần bán, không tạo bản bán thứ hai.

## Quyết định
Theo chủ dự án: danh sách bán được dựa trên shop đứng bán, không phụ thuộc máy là hàng sở hữu hay resell; B thấy nguồn A ở hàng resell. CTV xem đơn/giao dịch chính mình tham gia bán trong shop cho cả hai loại hàng, nhưng không thấy danh tính/giá nguồn theo quy tắc CTV đã chốt. Shop nguồn vẫn xem lịch sử tồn kho của item mình sở hữu.

## Kiểm chứng
Rà docs và quyền CTV cũ; chạy `git diff --check`, kiểm tra mã case duy nhất và `node scripts/check-worklog.mjs 2026-11-27-codex-sold-list-by-seller.md`.

## Còn lại
Chưa triển khai code/test runtime. Việc công khai số liệu bán cho người ngoài và thời hạn lưu lịch sử vẫn chưa chốt.

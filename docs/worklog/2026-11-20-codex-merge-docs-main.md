# Merge tài liệu vào main

- Ngày: 2026-11-20
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Cập nhật và merge toàn bộ thay đổi tích lũy của chuỗi công việc trước đó vào nhánh main cục bộ, rồi tiếp tục vấn đề CTV còn mở. Phạm vi gồm tài liệu nghiệp vụ, ứng dụng nền đã được tạo và phần dọn plugin/vendor theo yêu cầu cũ. Không push remote.

## Thực hiện
Đối chiếu Git với các worklog cũ để xác định nguồn gốc các nhóm thay đổi; tạo nhánh `codex/merge-product-docs-20261120` từ main cho commit tích hợp. Rà danh sách file staged, sửa tham chiếu `livrables/README.md` đã bị xóa trong README/MAP, và hoàn tất worklog cũ còn để trạng thái đang làm. Tích hợp commit bằng fast-forward về main cục bộ.

## Quyết định
Giữ toàn bộ thay đổi tích lũy vì chúng tương ứng các yêu cầu trước đó: gỡ plugin/vendor, dựng ứng dụng nền, viết và chốt bộ docs; không đẩy lên GitHub vì người dùng chỉ yêu cầu merge vào nhánh main. Quyền đọc lịch sử của CTV sau khi rời shop vẫn là câu hỏi mở, không tự chốt.

## Kiểm chứng
`npm run build:frontend` đạt; `git diff --cached --check` đạt. Quét staged không thấy mẫu private key/token phổ biến. `npm test`: 1/4 bài đạt, 3 bài tích hợp không chạy được vì PostgreSQL cục bộ tại cổng 55432 không hoạt động; Docker Desktop daemon cũng chưa chạy. `node scripts/check-worklog.mjs --all` đạt sau khi hoàn tất các nhật ký.

## Còn lại
Chưa xác minh bài tích hợp với database trong lượt này; cần chạy khi PostgreSQL sẵn sàng. Cần chốt quyền xem lịch sử của CTV sau khi rời shop. Remote `origin/main` không được cập nhật trong yêu cầu này.

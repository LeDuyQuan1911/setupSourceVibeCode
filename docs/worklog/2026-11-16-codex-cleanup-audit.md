# Khảo sát file có thể dọn

- Ngày: 2026-11-16
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Khảo sát source và gợi ý file không cần thiết; chưa xóa hoặc sửa source. Giữ nguyên mọi thay đổi có sẵn.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, quyết định và quy tắc làm việc. Kiểm tra Git, danh sách file, npm scripts và import thực tế. Chỉ tạo worklog này.
Phát hiện src/ ở gốc chỉ có thư mục rỗng; ứng dụng dùng apps/ và packages/. apps/frontend/dist/ là đầu ra build. .gitattributes chỉ đặt LF cho .githooks/* trong khi hook đã bị gỡ. livrables/ chỉ có README hướng dẫn, chưa có đầu ra. CLAUDE.md import AGENTS nhưng phần mô tả chưa có ứng dụng đã lỗi thời. node_modules là phụ thuộc cục bộ có thể cài lại, không phải source thừa.
Git có nhiều thay đổi/xóa sẵn, gồm hệ plugin, vendor, reviews và hook; đây không phải thay đổi do nhiệm vụ này.

## Quyết định
Đề xuất dọn src/ rỗng, đầu ra dist khi không cần bản build, và .gitattributes nếu không dùng hook. livrables/ là tùy chọn; bỏ cần cập nhật README và MAP. Giữ CLAUDE.md nếu dùng Claude và sửa mô tả cũ. Giữ source, test, migration, lockfile, cấu hình môi trường mẫu và tài liệu nghiệp vụ/quyền. Không đề xuất xóa worklog bắt buộc. Không truy cập dịch vụ ngoài hoặc đọc nội dung .env.

## Kiểm chứng
Đối chiếu package.json, package exports, import trong apps/packages/scripts/test và tham chiếu tài liệu bằng rg. Get-ChildItem -Force -Recurse xác nhận src/ chỉ có thư mục rỗng. Kiểm tra worklog bằng node scripts/check-worklog.mjs 2026-11-16-codex-cleanup-audit.md: đạt.
Không chạy test/build vì chỉ khảo sát và tạo nhật ký; chưa xác minh ứng dụng khi chạy.

## Còn lại
Người dùng chọn phạm vi xóa trước khi thực hiện. Nếu bỏ livrables hoặc CLAUDE, cần đồng bộ các tham chiếu tài liệu. Không commit, push hoặc thay đổi remote. Không có thay đổi source.

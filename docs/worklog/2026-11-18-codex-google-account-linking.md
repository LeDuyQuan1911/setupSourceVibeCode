# Chốt đăng ký Google và liên kết tài khoản

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định hai cách đăng ký: Google hoặc Gmail/mật khẩu/nhập lại; cùng Gmail dùng một tài khoản sau liên kết có xác thực. Tách đăng ký tài khoản khỏi nộp hồ sơ shop. Tiếp tục thảo luận điểm chưa chốt kế tiếp, không triển khai code. Giữ nguyên thay đổi có sẵn.

## Thực hiện
Cập nhật docs/2_requirements.md: sửa ACC-01/02, thêm ACC-03/04 và SHOP-06. Đồng bộ workflow, UI, bảo mật, hướng dữ liệu, ghi chú API mục tiêu và case T-01/29/30. Giữ bảng endpoint/schema thực tế và nói rõ chưa có Google, source vẫn gộp user/shop. Cập nhật SPEC, mục lục, PLAN, quyết định và DEC-01. Tổng 59 yêu cầu, 31 case thiết kế. Không đổi cấu trúc nên MAP không cần sửa.

## Quyết định
Không gộp user hoặc cấp phiên chỉ vì email trùng; liên kết Google vào user mật khẩu cần xác thực tài khoản đó. Google-only thiết lập mật khẩu trong cùng tài khoản, không tạo mới. Đăng ký không yêu cầu hồ sơ shop và không bắt đầu 30 ngày; hạn thuộc lần nộp hồ sơ. Không tự chốt xác minh Gmail thủ công, giới hạn mật khẩu hoặc luồng quên mật khẩu. Thiết kế giao thức/schema cụ thể còn cần review; không thêm thư viện/MCP/cấu hình/secret hoặc kết nối Google trong nhiệm vụ docs này.

## Kiểm chứng
Đọc tài liệu nền, kiến trúc, dữ liệu/API thực tế được mô tả và quyết định; kiểm tra 59 mã yêu cầu và 31 case duy nhất. Kiểm tra liên kết Markdown trong SPEC/PLAN/docs: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-google-account-linking.md: đạt. Không chạy test/build vì chỉ sửa docs; chưa có code Google/linking hoặc tách đăng ký để kiểm thử runtime.

## Còn lại
Tiếp theo chốt xác minh Gmail khi nhập bằng tay, rồi quy tắc mật khẩu/khôi phục theo DEC-01. Các câu hỏi đăng ký Google/domain, thiết lập mật khẩu an toàn và token/link cụ thể cần chốt/thiết kế trước implementation. Không commit/push.

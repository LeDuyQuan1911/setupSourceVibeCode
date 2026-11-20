# Chốt xử lý sau đặt lại mật khẩu

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi nhận quyết định của chủ dự án về link dùng một lần, thu hồi toàn bộ phiên ứng dụng và yêu cầu đăng nhập lại sau khi đặt lại mật khẩu. Chỉ cập nhật tài liệu, không sửa code.

## Thực hiện
Cập nhật ACC-05 trong `docs/2_requirements.md`; đồng bộ workflow, màn hình, bảo mật, mô hình dữ liệu, API mục tiêu và T-31. Cập nhật `SPEC.md`, `PLAN.md`, `docs/12_open-decisions.md` và thêm quyết định vào `contexte/decisions.md`. Không đổi cấu trúc file nên không sửa `MAP.md`.

## Quyết định
Link reset chỉ dùng một lần. Sau đặt lại thành công, thu hồi mọi phiên đăng nhập ứng dụng của cùng user trên mọi thiết bị, kể cả thiết bị hiện tại; không tạo phiên mới, yêu cầu đăng nhập lại. Liên kết Google của user được giữ nguyên; không tác động đến phiên tài khoản Google ngoài ứng dụng. Cần chặn request dùng link đồng thời và xử lý quyền WebSocket đang mở khi triển khai.

## Kiểm chứng
Đối chiếu nội dung bằng `rg`; kiểm tra 60 mã yêu cầu và 32 mã test đều không trùng, 50 liên kết nội bộ không hỏng; `git diff --check` đạt. Chạy `node scripts/check-worklog.mjs` cho nhật ký này. Không chạy test ứng dụng vì chỉ sửa docs và luồng mục tiêu chưa có code.

## Còn lại
Chưa chốt xử lý lỗi gửi email xác minh/reset và việc tính quota/cooldown khi lỗi; xác thực lại khi liên kết phương thức và chi tiết hồ sơ shop còn mở. Chưa triển khai API, schema, migration, email hay cơ chế thu hồi phiên.

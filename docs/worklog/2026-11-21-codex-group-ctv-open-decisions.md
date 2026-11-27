# Gom câu hỏi còn mở về CTV

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Liệt kê một lần các vấn đề chưa chốt liên quan với nhau trong phần CTV để người dùng quyết định cùng lượt. Chỉ khảo sát và tổng hợp, không sửa quy tắc đã chốt.

## Thực hiện
Đối chiếu `docs/12_open-decisions.md`, mục CTV trong `docs/2_requirements.md`, workflow, phân quyền, API và `contexte/decisions.md`. Xác định các câu hỏi liên quan cần đưa ra cùng lúc: lời mời trùng/reinvite, quyền lịch sử sau rời shop, giá đầu vào và giá sàn CTV, nhiều lần đổi giá khi request chờ, thời hạn request chờ chủ shop duyệt. Không sửa yêu cầu hoặc code.

## Quyết định
Không có.

## Kiểm chứng
Đối chiếu từng câu hỏi với CTV-01..07 để không hỏi lại các nguyên tắc đã chốt; chạy `node scripts/check-worklog.mjs 2026-11-21-codex-group-ctv-open-decisions.md`.

## Còn lại
Chờ chủ dự án trả lời các câu hỏi CTV; sau đó đồng bộ đặc tả, workflow, phân quyền, dữ liệu, API, kiểm thử và sổ quyết định mở. Hai worklog có sẵn trong working tree không thuộc nhiệm vụ này được giữ nguyên.

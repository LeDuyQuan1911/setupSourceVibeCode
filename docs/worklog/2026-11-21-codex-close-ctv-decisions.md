# Chốt năm quy tắc CTV

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi năm câu trả lời của chủ dự án về lời mời, quay lại shop, lịch sử, giá và hạn duyệt request CTV vào bộ docs trước triển khai.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 5, 7, 8, 9, 12. Bổ sung quy tắc lời mời, quyền lịch sử, giá CTV và hạn request; thêm bốn ca kiểm thử mục tiêu. Không sửa code.

## Quyết định
Theo năm lựa chọn được chủ dự án xác nhận trong hội thoại. Giữ mở định nghĩa giá đầu vào tự điều chỉnh theo từng loại hàng và tình huống giá đổi nhiều lần khi CTV đang chờ xác nhận lại; hai điểm này không nằm trong năm câu hỏi đã chốt.

## Kiểm chứng
Đối chiếu các mục CTV-01..07, workflow/API/quyền và sổ quyết định mở; `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-close-ctv-decisions.md`.

## Còn lại
Chưa triển khai code hoặc chạy test runtime. Tiếp tục chốt hai chi tiết CTV còn mở trước thiết kế schema/API cuối.

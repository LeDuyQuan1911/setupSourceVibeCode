# Xác định quyết định tiếp theo về hạn mức phí

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt các luồng nghiệp vụ lớn sau quyết định phí chợ reseller. Khảo sát tài liệu để chọn một trường hợp còn mở cần chốt tiếp; chưa thay quy tắc khi chưa có câu trả lời.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, trạng thái Git và các mục liên quan trong yêu cầu, workflow, quyết định mở và nhật ký quyết định. Xác định trường hợp nhiều lượt chờ cọc COD đã tạo trước khi số dư chạm ngưỡng âm 100.000đ. Chỉ thêm nhật ký khảo sát này; không sửa yêu cầu hoặc code.

## Quyết định
Đưa xung đột giữa hạn mức âm cố định và webhook cọc đến cho lượt đã tạo ra để chủ dự án chọn quy tắc. Không tự đặt ngoại lệ cho hạn mức hoặc tự từ chối tiền khách đã chuyển.

## Kiểm chứng
Đã đối chiếu SPEC, PLAN và `docs/12_open-decisions.md` cùng mốc trừ phí FEE-02; chạy validator worklog trước bàn giao.

## Còn lại
Chờ chủ dự án chốt cách xử lý lượt chờ cọc hợp lệ đã tạo khi một giao dịch khác vừa dùng hết hạn mức phí. Sau đó cập nhật các docs liên quan; chưa có code nghiệp vụ để kiểm thử.

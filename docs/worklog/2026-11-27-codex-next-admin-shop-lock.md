# Vấn đề tiếp theo về khóa shop

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chọn vấn đề nghiệp vụ quan trọng tiếp theo để chủ dự án chốt sau kỳ trải nghiệm chợ và số dư tặng.

## Thực hiện
Đã rà docs/12_open-decisions.md mục DEC-10, đối chiếu SPEC.md, docs/2_requirements.md và docs/3_workflows.md. Khóa shop approved bởi admin chưa có quy tắc; đây là điểm ảnh hưởng trực tiếp tới hàng đang bán và giao dịch đang mở.

## Quyết định
Đề xuất chốt trước quyền admin tạm khóa shop và tác động tới giao dịch đang mở; chưa ghi phương án nào thành quy tắc khi chưa có quyết định của chủ dự án.

## Kiểm chứng
Đã rà tài liệu, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-next-admin-shop-lock.md`. Không có thay đổi code/yêu cầu nghiệp vụ.

## Còn lại
Chờ chủ dự án quyết định phạm vi quyền admin khóa shop; các phần DEC-10 khác sẽ chốt sau.

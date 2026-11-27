# Chốt R2 ban đầu và phạm vi cấu hình admin

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi R2 là object storage giai đoạn đầu; xác định dashboard admin được chỉnh thông tin gì theo phản hồi của chủ dự án.

## Thực hiện
Đồng bộ SPEC, PLAN, FEE-01, DEC-09/12, kiến trúc, media/data model, màn hình, quyền, API, vận hành, nghiệm thu và quyết định lịch sử. Đã chọn R2 ban đầu; ghi giá ban đầu chợ 499.000đ/tháng không giới hạn đơn, CTV trong gói, web mẫu 200.000đ/tháng, phí resell riêng; admin chỉnh giá và giới hạn sử dụng qua dashboard.

## Quyết định
Chủ dự án xác nhận dashboard admin chỉnh giá gói và giới hạn sử dụng, không chỉnh nhà cung cấp/khóa R2. Giá mới chỉ dùng lần mua/gia hạn sau; media hợp lệ trước khi đổi giới hạn vẫn giữ hiệu lực. Chu kỳ thu/quá hạn và trị số giới hạn ảnh còn mở.

## Kiểm chứng
Chạy `git diff --check`, rà mã case và `node scripts/check-worklog.mjs 2026-11-27-codex-r2-initial-admin-settings.md`.

## Còn lại
Chưa tích hợp R2 hoặc dashboard trong code. Giá hạ tầng là ước tính, không là chi phí nhà cung cấp cố định; kỳ thu, thanh toán/quá hạn và giới hạn media cụ thể chưa chốt.

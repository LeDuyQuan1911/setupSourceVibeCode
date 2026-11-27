# Reseller tự chịu phần bảo hành cộng thêm

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định B được hứa bảo hành dài hơn mức A công bố cho máy và tự chịu phần cộng thêm.

## Thực hiện
Cập nhật SPEC, PLAN, yêu cầu, màn hình, dữ liệu/snapshot, case nghiệm thu, quyết định mở và nhật ký quyết định.

## Quyết định
B được cam kết thời hạn dài hơn với khách, tự chịu phần tăng thêm. A chỉ chịu mức nguồn đã công bố lúc giao dịch bắt đầu; đơn cũ không đổi theo lần sửa sau.

## Kiểm chứng
Chạy `git diff --check`, rà mã case nghiệm thu và `node scripts/check-worklog.mjs 2026-11-27-codex-reseller-extra-warranty.md`.

## Còn lại
Chưa triển khai code; điều kiện bảo hành/chứng từ/tranh chấp còn ở DEC-14.

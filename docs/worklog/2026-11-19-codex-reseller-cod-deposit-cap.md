# Giới hạn cọc COD của reseller

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định: cọc COD máy nguồn A bán trên website reseller B chuyển cho B; không vượt 10% giá máy và không vượt phần lời B khi bán thành công. Chỉ sửa docs, không tự chốt trường hợp lời bằng 0 hoặc chính sách giao thất bại.

## Thực hiện
Cập nhật WEB-03 và công thức ví dụ tại `docs/2_requirements.md`; đồng bộ workflow, UI, dữ liệu, API mục tiêu, T-21, sổ quyết định mở, SPEC, PLAN và `contexte/decisions.md`. Không đổi cấu trúc file/MAP hoặc code.

## Quyết định
Với giá bán P và giá nguồn S, hiểu phần lời trước phí là P−S theo quy tắc giá hiện có. B nhận cọc D từ cấu hình riêng của B, `0 < D <= min(D_config_B, 10% × P, P−S)`. A nhận COD cho giá máy còn lại P−D. Giá/cọc lưu theo đơn để đổi cấu hình sau không sửa lịch sử.

## Kiểm chứng
Đối chiếu bằng `rg`; kiểm tra mã yêu cầu/test duy nhất và liên kết nội bộ; `git diff --check` và `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs, module COD/cọc chưa có code.

## Còn lại
Cần chốt phần lời có tính phí vận chuyển hay không, trường hợp P=S không có cọc dương, thời hạn chờ cọc, hoàn/mất cọc khi COD thất bại và đối soát A/B. Chưa chọn kênh thanh toán/vận chuyển hoặc triển khai API/schema.

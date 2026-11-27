# Reseller tự chịu điều kiện đổi trả cộng thêm

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định B tự xử lý cam kết đổi/trả rộng hơn A; A chỉ nhận lại và mở bán lại khi chấp nhận trả theo điều kiện A.

## Thực hiện
Cập nhật SPEC, PLAN, yêu cầu, quyền, case nghiệm thu, quyết định mở và lịch sử quyết định. Không thêm thao tác hoặc quyền mới cho B.

## Quyết định
B tự xử lý đổi/trả ngoài điều kiện A; A không buộc nhận máy. Chỉ A chấp nhận và đã nhận máy về mới mở bán lại item nguồn; nếu không item vẫn Đã bán.

## Kiểm chứng
Chạy `git diff --check`, rà mã case nghiệm thu và `node scripts/check-worklog.mjs 2026-11-27-codex-reseller-extra-return-policy.md`.

## Còn lại
Chưa triển khai code; điều kiện cụ thể của A và xử lý chứng từ/tranh chấp còn ở DEC-14.

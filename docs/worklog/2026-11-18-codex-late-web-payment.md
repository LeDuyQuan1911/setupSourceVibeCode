# Thanh toán đến sau hạn đơn web

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi nhận phản hồi của chủ dự án trong luồng đơn web: nếu khoản thanh toán đến sau hạn, khách liên hệ chủ shop để shop xác nhận máy bán thành công. Chỉ cập nhật phần đã rõ, không tự chốt hạn thanh toán hoặc cách giữ máy khi quá hạn; không sửa code.

## Thực hiện
Cập nhật WEB-02 tại `docs/2_requirements.md`, luồng tại `docs/3_workflows.md`, hợp đồng mục tiêu tại `docs/8_api-contracts.md`, T-20 tại `docs/9_testing-acceptance.md`, câu hỏi còn mở tại `docs/12_open-decisions.md`, tóm tắt `SPEC.md`, tiến độ `PLAN.md` và ghi quyết định vào `contexte/decisions.md`. Không đổi cấu trúc file nên không sửa MAP.

## Quyết định
Tiền đến sau hạn không tự chuyển đơn sang Đã mua. Khách liên hệ chủ shop bán; shop đối chiếu khoản tiền và tình trạng máy trước khi xác nhận thủ công. Không cho xác nhận nếu máy đã bán hoặc đang thuộc giao dịch khác; giữ bất biến một máy chỉ bán một lần.

## Kiểm chứng
Đối chiếu bằng `rg`, kiểm tra 60 mã yêu cầu và 32 mã test không trùng, liên kết nội bộ, `git diff --check` và `node scripts/check-worklog.mjs` cho nhật ký này. Không chạy test ứng dụng vì thay đổi chỉ là tài liệu cho module chưa có code.

## Còn lại
Chưa chốt thời hạn thanh toán, khi quá hạn máy tiếp tục giữ hay mở cho đơn khác, và cách xử lý khoản tiền nếu shop không thể xác nhận máy; actor giao nhận/đối soát cũng còn mở. Nếu “máy đến sau hạn” mang nghĩa giao máy tới khách, cần làm rõ với chủ dự án.

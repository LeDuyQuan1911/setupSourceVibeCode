# Chốt bên giao hàng cho đơn website resell

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định về đơn website reseller: với đơn đã thanh toán đủ, shop nguồn A và reseller B trao đổi để chọn bên giao trực tiếp cho khách theo từng đơn; COD do A giao. Giữ nhận hoàn/xác nhận kết quả và đối soát tiền là câu hỏi mở; không sửa code.

## Thực hiện
Cập nhật `docs/2_requirements.md`, workflow, UI, dữ liệu, API mục tiêu, T-20/T-21 và câu hỏi mở. Cập nhật `SPEC.md`, `PLAN.md`, thêm quyết định vào `contexte/decisions.md`. Không đổi cấu trúc file nên MAP không đổi.

## Quyết định
Đơn trả đủ không cố định bên giao: A/B trao đổi và chọn theo từng đơn. Đơn COD resell do A giao; bước Đang vận chuyển chỉ sau bàn giao thực tế. Đề xuất lưu bên giao/actor để kiểm tra quyền, còn cách ghi thỏa thuận chưa chốt.

## Kiểm chứng
Đối chiếu bằng `rg`; kiểm tra mã yêu cầu/test và liên kết nội bộ không trùng/hỏng; `git diff --check` và `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs, module đơn chưa có code.

## Còn lại
Chưa chốt ai nhận hoàn, ai xác nhận kết quả COD, bên thu tiền COD và cách đối soát A/B. Chưa triển khai API/schema hoặc tích hợp vận chuyển.

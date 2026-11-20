# Rà số dư phí chợ trước khi hiển thị QR

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt luồng lớn. Rà điểm thiếu số dư shop trước khi khách chuyển cọc COD qua QR và đề xuất quy tắc tránh nhận cọc nhưng không thể tạo đơn; chưa sửa yêu cầu khi người dùng chưa chốt.

## Thực hiện
Đọc `README.md`, `MAP.md`, `SPEC.md`, phần COD trong `PLAN.md`, yêu cầu, workflow, dữ liệu/API và sổ quyết định mở. Nhận thấy phí 50.000đ chỉ trừ khi webhook tạo đơn nhưng chưa có quy tắc bảo đảm số dư trước khi QR được hiển thị; hai lượt chờ song song có thể cùng thấy một khoản 50.000đ. Không sửa docs chuẩn hoặc code.

## Quyết định
Không có. Đề xuất để chủ dự án chốt: khi tạo lượt chờ cọc/QR, chỉ cho phép nếu shop bán còn 50.000đ khả dụng và tạm dành riêng khoản này cho lượt đó; chưa thu phí. Lượt hết hạn chưa có đơn thì trả khả dụng; webhook hợp lệ tạo đơn thì đổi khoản dành riêng thành phí; COD thất bại thì hoàn phí vào số dư. Việc này chỉ liên quan phí chợ cố định, không phải giữ tiền cọc khách.

## Kiểm chứng
Đối chiếu luồng chờ cọc 15 phút, thời điểm trừ phí và tình huống hai lượt COD cùng shop; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-next-cod-fee-balance.md`.

## Còn lại
Chờ chủ dự án chốt cách xử lý khi shop thiếu số dư và có nhiều lượt chờ cùng lúc; sau đó mới cập nhật yêu cầu/thiết kế/ca nghiệm thu.

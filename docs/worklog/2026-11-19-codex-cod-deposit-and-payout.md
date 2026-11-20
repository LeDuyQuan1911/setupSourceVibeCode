# COD về nguồn và yêu cầu cọc theo shop

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi nhận: với đơn COD reseller, A là bên gửi nên tiền COD thu hộ về A; khách phải đặt cọc trước, mỗi shop có trường mức cọc riêng. Không tự quyết shop A hay B nhận cọc, công thức số tiền COD còn lại hoặc xử lý cọc khi giao thất bại; không sửa code.

## Thực hiện
Cập nhật WEB-03 và các trạng thái COD trong `docs/2_requirements.md`; đồng bộ workflow, UI, dữ liệu, API mục tiêu, T-21, câu hỏi mở, SPEC và PLAN. Ghi quyết định mới trong `contexte/decisions.md`; không đổi cấu trúc/MAP.

## Quyết định
COD cần cọc được xác nhận trước khi A gửi. A là bên gửi và nhận khoản COD do đơn vị vận chuyển thu hộ. Mỗi shop có trường cấu hình mức cọc; đơn ghi mức cọc đã áp dụng. Nhận cọc chưa làm máy sold; kết quả COD vẫn quyết định mua thành công/thất bại.

## Kiểm chứng
Đối chiếu từ khóa/luồng bằng `rg`; kiểm tra 60 mã yêu cầu, 32 mã test và liên kết nội bộ không trùng/hỏng; `git diff --check` và `node scripts/check-worklog.mjs` đạt. Không chạy test ứng dụng vì chỉ sửa docs, module đơn/COD/cọc chưa có code.

## Còn lại
Cần chốt cấu hình cọc của shop nào áp dụng khi A/B cùng tham gia, ai nhận cọc, số COD sau cọc, thời hạn chờ cọc, xử lý cọc khi giao thất bại/hoàn, bên nhận hoàn và đối soát A/B. Chưa có API/schema/payment/shipping integration.

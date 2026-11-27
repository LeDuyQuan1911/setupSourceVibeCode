# Đơn giản hóa đăng bán máy khách trả

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Bỏ luồng Mở bán lại riêng. Máy khách trả muốn bán tiếp thì shop tạo tin/hàng mới theo luồng đăng bán thông thường; rà các tài liệu và quy tắc phí liên quan.

## Thực hiện
Đồng bộ SPEC, PLAN, CAT-06/FEE-02, workflow, màn hình, quyền, kiến trúc, dữ liệu, API, nghiệm thu và quyết định mở. Gỡ nút/endpoint Mở bán lại, chuỗi trả hàng và ngoại lệ miễn phí; giữ nguyên luồng COD giao thất bại chưa sold.

## Quyết định
Chủ dự án chốt hàng/tin mới sau khách trả bán qua reseller là giao dịch resell mới, thu 50.000đ theo quy tắc thường. Item/đơn cũ vẫn Đã bán; IMEI có thể trùng giữa item cũ và mới.

## Kiểm chứng
Rà các mô tả cũ, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-simplify-return-new-listing.md`.

## Còn lại
Chưa triển khai code; thời hạn lưu lịch sử vẫn cần chốt riêng.

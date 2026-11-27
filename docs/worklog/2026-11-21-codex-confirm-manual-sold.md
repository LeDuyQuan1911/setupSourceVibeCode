# Xác nhận trước khi đánh dấu đã bán

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt popup xác nhận khi shop nguồn bấm Sản phẩm đã bán; không thêm nút hoàn tác đánh dấu bán. Đồng bộ tài liệu nghiệp vụ, chưa sửa code.

## Thực hiện
Đã đồng bộ SPEC, PLAN, quyết định, CAT-07, màn hình, API, kiểm thử, mô hình dữ liệu và mục quyết định mở. Bỏ các dòng nói xử lý bấm nhầm Đã bán còn chưa chốt. Không đổi code.

## Quyết định
Theo chủ dự án: nút Sản phẩm đã bán thủ công dùng popup xác nhận; hủy popup không đổi trạng thái, xác nhận mới gửi thao tác. Không thêm nút hoặc luồng hoàn tác sold. Trả hàng từ đơn cũ vẫn là luồng riêng.

## Kiểm chứng
Đối chiếu các tài liệu liên quan; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-confirm-manual-sold.md`.

## Còn lại
Chưa triển khai UI/API; popup chỉ hạn chế nhấn nhầm, không xác thực giao dịch thực tế. Serial và IMEI không đọc được/khai sai vẫn là quyết định mở.

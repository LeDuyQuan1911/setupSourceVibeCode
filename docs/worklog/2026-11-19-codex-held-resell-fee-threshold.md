# Request lấy máy đã gửi vẫn chốt sau ngưỡng phí

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt giao dịch lấy máy đã bắt đầu trước khi số dư reseller chạm ngưỡng vẫn tiếp tục, kể cả request đang chờ nguồn duyệt. Đồng bộ tài liệu về quyền duyệt request cũ, lượt giữ 12 giờ, phí và ẩn sản phẩm; không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md và docs/2_requirements.md, 3_workflows.md, 4_screens.md, 5_permissions-security.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md, 12_open-decisions.md. Ghi quyết định lâu dài trong contexte/decisions.md. Bổ sung trường hợp nghiệm thu request gửi trước ngưỡng nhưng được duyệt sau ngưỡng.

## Quyết định
Ngưỡng `−100.000đ` chặn đơn web và request lấy máy resell mới ngay, đồng thời ẩn sản phẩm resell. Request đã gửi trước ngưỡng vẫn có thể được nguồn duyệt để bắt đầu giữ 12 giờ; nếu nguồn chốt thành công trong hạn, trừ 50.000đ dù số dư xuống dưới ngưỡng. Request bị từ chối/hủy hoặc giữ hết hạn không chịu phí. Đơn trả đủ đã tạo, QR COD đã phát trước ngưỡng cũng tiếp tục theo hạn riêng. Chỉ mở lại sản phẩm resell khi số dư được xác nhận từ `0đ` và các điều kiện hiển thị khác còn hợp lệ.

## Kiểm chứng
Đối chiếu các mô tả ngưỡng trong phạm vi, yêu cầu, luồng, quyền, dữ liệu, API và nghiệm thu; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-held-resell-fee-threshold.md` và `git diff --check` trước bàn giao.

## Còn lại
Chi tiết tích hợp nạp và đối soát số dư vẫn là quyết định mở; tài liệu chưa phải triển khai tính năng.

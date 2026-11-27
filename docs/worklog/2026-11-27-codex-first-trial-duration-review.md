# Thời hạn dùng thử đầu tiên

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đánh giá phương án cho shop mới dùng thử gói chợ miễn phí 7–14 ngày trước lần thanh toán đầu tiên; chưa coi là quyết định đã chốt.

## Thực hiện
Đã đối chiếu SPEC.md, FEE-01, SHOP-05/06 và DEC-09; tham khảo thời hạn dùng thử công khai của BigCommerce (15 ngày) và điều kiện dùng thử của Shopify. Chưa sửa yêu cầu vì chủ dự án mới nêu khoảng 7–14 ngày.

## Quyết định
Đề xuất 14 ngày dùng thử gói chợ một lần/shop, từ lúc shop được duyệt; CTV trong gói, phí giao dịch resell 50.000đ vẫn áp dụng. Website mẫu tùy chọn chưa tự đưa vào dùng thử khi chưa được chốt.

## Kiểm chứng
Đã rà điều kiện shop approved và gói chợ, chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-first-trial-duration-review.md`. Đây là khảo sát/đề xuất, không có code hay test ứng dụng.

## Còn lại
Chờ chủ dự án chốt 7 hay 14 ngày, mốc bắt đầu và phạm vi website mẫu trước khi ghi vào FEE-01/DEC-09.

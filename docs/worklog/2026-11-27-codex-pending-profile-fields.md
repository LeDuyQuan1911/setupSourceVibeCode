# Chốt trường hồ sơ chờ duyệt được xem

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt shop approved xem đủ năm trường của hồ sơ pending trên dashboard, người ngoài không xem; sau đó xác định vấn đề kế tiếp để chủ dự án chốt. Chỉ sửa docs.

## Thực hiện
Đồng bộ SPEC, PLAN, SHOP-04, màn hình, phân quyền, API, nghiệm thu, quyết định mở và lịch sử quyết định. Rà mục Đã bán để chọn vấn đề kế tiếp.

## Quyết định
Theo chủ dự án: shop đã duyệt xem tên shop, người đại diện, số liên hệ, địa chỉ và kênh bán hàng của hồ sơ chờ duyệt. Người ngoài không xem dashboard; quyền xem nhận xét vẫn riêng. Mục Đã bán cho shop khác/khách là quyết định kế tiếp, chưa tự chốt.

## Kiểm chứng
Rà docs; chạy `git diff --check`, kiểm tra mã case duy nhất và `node scripts/check-worklog.mjs 2026-11-27-codex-pending-profile-fields.md`.

## Còn lại
Chưa triển khai code/test runtime. Quyền xem mục Đã bán cho shop khác/khách và retention dữ liệu vẫn cần chốt.

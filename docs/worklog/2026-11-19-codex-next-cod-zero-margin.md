# Rà điểm cần chốt tiếp theo của COD

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt luồng nghiệp vụ lớn sau khi loại bỏ tính năng cọc COD muộn. Rà tài liệu hiện có và chọn một quyết định còn mở để trình bày; chưa thay đổi quy tắc khi người dùng chưa chốt.

## Thực hiện
Đọc `README.md`, `MAP.md`, `SPEC.md`, phần ưu tiên luồng lớn trong `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md` và `docs/12_open-decisions.md`; đối chiếu công thức cọc COD reseller để chọn trường hợp biên giá bán B bằng giá nguồn A. Không sửa yêu cầu hoặc code vì đang xin quyết định sản phẩm.

## Quyết định
Không có. Đề xuất cho người dùng chốt: khi chênh lệch reseller bằng 0 thì không cho chọn COD cho máy đó trên website B vì không có mức cọc dương hợp lệ; vẫn cho thanh toán đủ hoặc B đổi giá bán trước khi nhận đơn COD.

## Kiểm chứng
Đối chiếu công thức đã chốt `0 < D <= min(D_config_B, 10% × P, P − S)` với `P = S` cho thấy không có D hợp lệ. Chạy `node scripts/check-worklog.mjs 2026-11-19-codex-next-cod-zero-margin.md`.

## Còn lại
Chờ chủ dự án duyệt quy tắc cho trường hợp `P = S` trước khi cập nhật các tài liệu chuẩn và ca nghiệm thu.

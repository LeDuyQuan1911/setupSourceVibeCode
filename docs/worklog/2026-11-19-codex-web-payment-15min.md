# Chốt hạn thanh toán 15 phút cho đơn web

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chủ dự án chốt hạn thanh toán 15 phút kể từ khi tạo đơn trả đủ. Đồng bộ quy tắc quá hạn với docs; không sửa code, không áp hạn này cho COD.

## Thực hiện
Cập nhật WEB-02 trong `docs/2_requirements.md`; đồng bộ `docs/3_workflows.md`, `docs/4_screens.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, T-20, `docs/12_open-decisions.md`, `SPEC.md` và `PLAN.md`. Ghi quyết định mới trong `contexte/decisions.md`; không sửa các mục lịch sử hay MAP vì không đổi cấu trúc.

## Quyết định
Đơn trả đủ có hạn 15 phút từ lúc tạo theo giờ DB. Tại hoặc sau hạn chưa xác nhận tiền, đơn mất quyền giữ máy ngay, dù worker chưa chạy; tiền đến muộn theo luồng shop kiểm tra/xác nhận thủ công đã chốt. COD không dùng hạn này.

## Kiểm chứng
Đối chiếu bằng `rg`; xác nhận 60 mã yêu cầu và 32 mã test duy nhất, 51 liên kết nội bộ không hỏng; `git diff --check` đạt. Chạy `node scripts/check-worklog.mjs` cho file này. Không chạy test ứng dụng vì chỉ sửa docs, module đơn web chưa có code.

## Còn lại
Chưa chốt giá khi xác nhận tiền muộn, actor giao/nhận hoàn, đối soát/hoàn tiền giữa shop, nhà cung cấp thanh toán và hợp đồng API/schema chi tiết. Chưa triển khai code hoặc tích hợp thanh toán.

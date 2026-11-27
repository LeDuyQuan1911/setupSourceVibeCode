# Đề xuất xử lý máy đã bán bị trả lại

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Giải thích cách shop bán lại đúng máy khi khách trả hàng, đồng thời ngăn shop tự mở bán lại tùy ý sau khi đã sold. Chưa sửa quy tắc nghiệp vụ khi chủ dự án chưa chốt.

## Thực hiện
Đối chiếu CAT-06, quy tắc sold, IMEI/serial chống trùng và COD thất bại trong docs. Đề xuất luồng trả hàng gắn đơn bán gốc, giữ một item và lịch sử từng lần bán/tin, có kiểm soát trước khi mở bán lại.

## Quyết định
Không áp dụng đề xuất cấm bán lại vĩnh viễn hoặc tạo item mới cho cùng máy; đó là phương án thảo luận, chưa được chủ dự án chốt.

## Kiểm chứng
Rà docs/2_requirements.md, docs/3_workflows.md và docs/12_open-decisions.md; chạy node scripts/check-worklog.mjs 2026-11-21-codex-returned-sold-item-options.md.

## Còn lại
Chờ chủ dự án chọn quyền xác nhận trả hàng và mức kiểm tra trước khi cho bán lại; sau đó đồng bộ đặc tả/schema/API.

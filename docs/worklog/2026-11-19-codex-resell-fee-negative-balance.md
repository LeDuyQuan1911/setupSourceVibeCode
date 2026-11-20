# Phí chợ reseller theo luồng web và giữ hàng

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Sửa quyết định phí 50.000đ: chỉ reseller bán máy nguồn mới chịu phí, không thu khi shop tự bán máy sở hữu. Ghi mốc trừ theo đơn website và giao dịch request/giữ 12 giờ của reseller hoặc CTV; cho số dư xuống tối đa âm 100.000đ và tạm ẩn sản phẩm resell/chặn đơn web mới khi chạm ngưỡng.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, quyết định và trạng thái Git. Đồng bộ SPEC, PLAN, docs yêu cầu, workflow, màn hình, quyền, dữ liệu, API, nghiệm thu, quy định và quyết định mở; thêm quyết định mới vào `contexte/decisions.md`. Không sửa code ứng dụng. Giữ nguyên thay đổi khác có sẵn trong workspace.

## Quyết định
Shop bán máy tự sở hữu không mất phí. Reseller B bán máy nguồn A qua web COD: trừ khi cọc xác nhận/tạo đơn, hoàn nếu giao thất bại; web trả đủ: trừ khi xác nhận thanh toán/Đã mua. B hoặc CTV thuộc B request/giữ máy nguồn 12 giờ: trừ khi A xác nhận chốt thành công trong hạn, không trừ lúc request/giữ. Số dư B được tới `−100.000đ`; tại ngưỡng, ẩn sản phẩm resell/chặn đơn web mới nhưng vẫn xử lý đơn đã tạo và bán máy tự sở hữu. Các quyết định cũ về phí chỉ COD được thay bằng quyết định mới, không xóa lịch sử.

## Kiểm chứng
Rà `rg` các chỗ nhắc phí trong tài liệu hoạt động, không còn quy tắc giới hạn phí ở COD; `git diff --check` không báo lỗi whitespace (chỉ cảnh báo chuyển LF/CRLF). Chạy validator worklog trước bàn giao.

## Còn lại
Cần chốt cách nạp/điều kiện hiện lại sản phẩm resell và cách xử lý nhiều giao dịch đang mở cùng cần trừ phí khi gần hạn mức `−100.000đ`. Chưa có code ví/phí hoặc kiểm thử runtime cho nghiệp vụ này.

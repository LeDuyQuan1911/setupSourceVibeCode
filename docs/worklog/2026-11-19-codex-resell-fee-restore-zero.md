# Hiện lại sản phẩm resell khi hết nợ phí

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng chốt sản phẩm resell tự hiện lại khi số dư phí chợ của reseller từ 0đ trở lên; số dư âm 50.000đ vẫn là còn nợ. Đồng bộ tài liệu nghiệp vụ, không sửa code.

## Thực hiện
Đọc README, MAP, SPEC, PLAN, kiến trúc, quyết định và trạng thái Git. Sửa SPEC, PLAN, FEE-02, workflow, màn hình, quyền, dữ liệu, API, nghiệm thu, quy định và quyết định mở; thêm quyết định vào `contexte/decisions.md`. Không sửa code hoặc đụng thay đổi khác trong workspace.

## Quyết định
Sản phẩm resell tự hết lý do ẩn vì nợ phí khi số dư B đã xác nhận từ `0đ` trở lên. `−50.000đ` vẫn là nợ, nên chưa hiện lại. Nếu tin còn lý do ẩn khác hoặc máy không còn bán được thì không tự công khai/nhận đơn dù số dư đã đủ.

## Kiểm chứng
Đối chiếu các tài liệu nghiệp vụ liên quan, rà những chỗ còn ghi điều kiện hiện lại chưa chốt; `git diff --check` không báo lỗi whitespace. Chạy `node scripts/check-worklog.mjs 2026-11-19-codex-resell-fee-restore-zero.md` trước bàn giao.

## Còn lại
Cách xác nhận khoản nạp tiền và quy tắc cho các giao dịch đã mở khác gần ngưỡng phí còn cần chốt. Chưa có code ví/phí hoặc test runtime.

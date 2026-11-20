# Rà và ưu tiên chốt luồng nghiệp vụ lớn

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chủ dự án đổi ưu tiên: hoàn thiện các luồng giao dịch và xử lý nghiệp vụ lớn trước khi đi sâu đăng nhập/đăng ký. Rà tài liệu hiện hành, lập thứ tự phụ thuộc và chuẩn bị điểm cần chốt đầu tiên. Không sửa code.

## Thực hiện
Đọc yêu cầu, workflows, quyết định mở, kiến trúc và trạng thái Git; đối chiếu các luồng khách web/COD, reseller/CTV lấy hàng, vòng đời máy/tin và quan hệ hợp tác. Cập nhật `docs/12_open-decisions.md` với bốn luồng ưu tiên và câu hỏi chặn; cập nhật `PLAN.md` để phản ánh thứ tự mới. Giữ các quyết định sản phẩm chưa được chủ dự án duyệt ở trạng thái mở.

## Quyết định
Ưu tiên chốt luồng khách mua trên website trước vì mốc khóa máy/giá, thanh toán đủ/COD và giao nhận ảnh hưởng tới các luồng reseller, CTV và tồn kho. Chi tiết auth để sau theo chỉ đạo mới. Không tự quyết thời gian thanh toán, dòng tiền hoặc trách nhiệm giao hàng khi chưa có căn cứ.

## Kiểm chứng
Đối chiếu các mục mới với `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/12_open-decisions.md`; kiểm tra liên kết nội bộ và `git diff --check`. Chạy `node scripts/check-worklog.mjs` cho nhật ký này. Không chạy test ứng dụng vì chỉ đổi kế hoạch/tài liệu.

## Còn lại
Cần chốt mốc khóa máy/giá và hạn thanh toán của đơn web, sau đó vai trò giao/nhận hoàn, đối soát tiền; tiếp tục ba luồng ưu tiên còn lại. Các quyết định auth ở DEC-01 chưa chốt thêm.

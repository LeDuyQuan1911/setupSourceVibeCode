# Chốt đối soát COD thành công giữa nguồn và reseller

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định COD giao thành công: A nhận tiền thu hộ còn lại, B giữ cọc; A chuyển cho B phần chênh lệch để A giữ giá nguồn và B nhận đủ lãi dự kiến. Website chỉ ghi/hiển thị số cần đối soát; hai shop tự chuyển tiền ngoài website. Không sửa code.

## Thực hiện
Cập nhật WEB-03 và ví dụ trong `docs/2_requirements.md`; đồng bộ workflow, màn hình, dữ liệu, API mục tiêu, T-21, khung quy định, sổ quyết định mở, SPEC/PLAN và `contexte/decisions.md`. Thu hẹp câu hỏi đối soát còn mở sang phí vận chuyển, thời hạn/chứng từ và trường hợp chênh lệch bằng 0. Không đổi cấu trúc/MAP.

## Quyết định
Với giá bán P, giá nguồn S và cọc D vào B: COD A nhận là P−D; khi giao thành công A chuyển B `P−S−D`, không âm vì D≤P−S. Sau đó A giữ S, B nhận tổng P−S. Website chỉ hiển thị số tính từ snapshot, không tự chuyển tiền hoặc coi hiển thị là bằng chứng đã thanh toán.

## Kiểm chứng
Đối chiếu công thức bằng ví dụ P=12, S=10, D=1 triệu: A nhận 11 và chuyển B 1, cuối cùng A giữ 10/B nhận 2. Kiểm tra mã yêu cầu/test, liên kết nội bộ, `git diff --check` và `node scripts/check-worklog.mjs`. Không chạy test ứng dụng vì chỉ sửa docs, module COD chưa có code.

## Còn lại
Chưa chốt hạn chờ cọc COD để giải phóng máy, trường hợp P=S, phí vận chuyển, thời hạn/chứng từ chuyển tiền A/B và đối soát đơn trả đủ. Chưa triển khai giao diện/API/schema/tích hợp thanh toán.

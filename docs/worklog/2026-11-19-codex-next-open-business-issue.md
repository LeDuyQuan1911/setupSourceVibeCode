# Chọn vấn đề nghiệp vụ cần chốt tiếp

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn chuyển sang vấn đề nghiệp vụ tiếp theo cần chốt trong bộ tài liệu trước triển khai. Khảo sát danh sách quyết định mở và chọn một câu hỏi rõ ràng; chưa thay đổi quy tắc sản phẩm.

## Thực hiện
Đọc README.md, MAP.md, SPEC.md, phần kế hoạch liên quan của PLAN.md và docs/12_open-decisions.md. Chọn vấn đề đối soát tiền COD giữa shop nguồn A và reseller B khi B đã nhận cọc, đặc biệt khi phần A thu từ hãng vận chuyển thấp hơn giá nguồn.

## Quyết định
Không có quyết định sản phẩm mới. Đưa ví dụ số tiền cụ thể để người dùng chọn cách chuyển và ghi nhận khoản B phải bù A.

## Kiểm chứng
Đối chiếu dòng “Giao nhận/đối soát” và ưu tiên 1 trong docs/12_open-decisions.md với các mục phí/luồng đã chốt tại SPEC.md và PLAN.md. Chạy trình kiểm tra worklog trước bàn giao.

## Còn lại
Chờ người dùng chốt cách đối soát; sau đó cập nhật tài liệu chuẩn và nhật ký quyết định.

# Webhook cọc COD đến sau hạn

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chốt trường hợp tiền có thể đến trước hạn nhưng webhook về sau khi lượt chờ cọc đã hết hiệu lực: khách tự nhắn riêng shop bán, website không tự tạo đơn COD/giữ lại máy. Sửa tài liệu liên quan, không thêm tính năng trao đổi ngoài website hoặc sửa code.

## Thực hiện
Rà quyết định QR/webhook và luồng COD trong `SPEC.md`, `PLAN.md` và bộ docs. Cập nhật `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/12_open-decisions.md`; thêm quyết định trong `contexte/decisions.md`. Không tạo quy trình nhắn tin/yêu cầu mới, không sửa code hoặc cấu trúc file.

## Quyết định
Webhook tới sau khi lượt chờ cọc COD hết hạn không tự tạo đơn/giữ máy/trừ phí, kể cả tiền đã vào trước hạn. Khách tự nhắn riêng shop bán để xử lý cọc ngoài website. Server ghi vết sự kiện để đối chiếu và tránh xử lý lặp, nhưng không hồi sinh máy đã được mở cho giao dịch khác.

## Kiểm chứng
Đối chiếu yêu cầu/workflow/data/API/T-34 và câu hỏi mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-late-webhook-private-contact.md`, kiểm tra mã yêu cầu/case, liên kết Markdown và `git diff --check`.

## Còn lại
Nhà cung cấp hỗ trợ tài khoản nhiều shop, webhook thất lạc và quy trình đối chiếu khoản tiền chưa khớp còn cần chốt. Module COD/webhook chưa có code nên chưa kiểm chứng runtime.

# Luồng liên hệ bảo hành và trả hàng qua reseller

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định khách mua từ B liên hệ B, CTV chuyển cho B, B phối hợp shop nguồn A xử lý bảo hành/trả hàng; sau đó xác định vấn đề tiếp theo.

## Thực hiện
Cập nhật SPEC, PLAN, yêu cầu và quyết định mở về đường liên hệ; ghi lịch sử quyết định. Không thêm chức năng website.

## Quyết định
Khách liên hệ B; CTV chuyển B; B phối hợp A; A phụ trách xử lý trong thời hạn áp dụng.

## Kiểm chứng
Chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-27-codex-warranty-return-contact.md`.

## Còn lại
Điều kiện, chứng từ và tranh chấp còn ở DEC-14. Chưa triển khai code.

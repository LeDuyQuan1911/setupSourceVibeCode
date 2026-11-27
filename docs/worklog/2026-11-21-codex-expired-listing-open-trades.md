# Tin hết hạn có giao dịch mở

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi hai quyết định: tin hết hạn không nhận giao dịch mới nhưng giao dịch mở xử lý tiếp; hết ba ngày vẫn còn giao dịch thì giữ lịch sử đến khi kết thúc, không gia hạn muộn. Cách tính 90/3 ngày chưa chốt.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 7, 8, 9, 12. Không sửa code.

## Quyết định
Tin hết hạn không nhận giao dịch mới, hold/đơn mở tiếp tục; giao dịch thất bại không tự hiện tin expired. Quá cửa sổ 3 ngày không gia hạn, nhưng giữ bản ghi/snapshot đến khi giao dịch kết thúc rồi dọn mà không xóa lịch sử. Cách tính ngày/biên hạn chưa chốt.

## Kiểm chứng
Đối chiếu LIST-01, workflow, UI, data/API và T-10; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-expired-listing-open-trades.md`.

## Còn lại
Cần giải thích lại mục 1 bằng ví dụ.

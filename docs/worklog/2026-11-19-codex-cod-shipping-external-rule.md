# Phí COD là quy định ngoài website

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng làm rõ shop nguồn A tự đóng/gửi COD nên mặc định chịu phí vận chuyển và hoàn hàng; đây là việc ngoài website, chỉ cần ghi thành luật của chợ, không cần code hoặc mục theo dõi phí. Sửa tài liệu đã ghi quá phạm vi.

## Thực hiện
Ghi quy định tại docs/11_rules.md, thu gọn phạm vi trong SPEC.md, PLAN.md, docs/2_requirements.md và docs/12_open-decisions.md; bỏ phí ship khỏi mô hình dữ liệu, API, màn hình và case nghiệm thu tại docs/3_workflows.md, 4_screens.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md. Ghi quyết định trong contexte/decisions.md.

## Quyết định
A đóng/gửi COD nên A chịu phí vận chuyển và hoàn hàng với hãng ngoài website. Không xây tính/thu/lưu/trạng thái phí trên web; phí này không thay đổi giá máy, cọc, phí chợ hoặc khoản A phải chuyển B.

## Kiểm chứng
Rà những đoạn còn ghi phí hoàn hàng là quyết định mở và những chỗ mô hình hóa phí ship; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-cod-shipping-external-rule.md` và `git diff --check` trước bàn giao.

## Còn lại
Không có. Chưa triển khai code vì quy tắc này chỉ thuộc nội quy chợ.

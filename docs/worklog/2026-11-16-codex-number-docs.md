# Đánh số tài liệu theo thứ tự đọc

- Ngày: 2026-11-16
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Đổi tên tài liệu trực tiếp trong docs thành 1_, 2_... theo thứ tự đọc; cập nhật liên kết và hướng dẫn. Giữ nguyên code và các thay đổi có sẵn.

## Thực hiện
Đổi tên 14 tài liệu trong docs: mục lục, mô hình sản phẩm, yêu cầu, workflows, screens, permissions-security, architecture, data-model, api-contracts, testing-acceptance, performance-scaling, operations, rules-outline, open-decisions. Mục lục mới là docs/1_README.md, có bảng một hàng cho mỗi file theo số tăng dần.
Cập nhật tham chiếu trong docs và README.md, MAP.md, SPEC.md, PLAN.md, AGENTS.md, contexte/decisions.md. Ghi bước hoàn tất trong PLAN. Chỉ đổi đường dẫn tham chiếu, không thay quyết định nghiệp vụ hoặc code.

## Quyết định
Đánh số cả mục lục để có điểm bắt đầu rõ ràng; giữ tên file quy ước ở gốc như SPEC.md, AGENTS.md và nhật ký trong docs/worklog. Không sửa worklog lịch sử của nhiệm vụ khác; đường dẫn cũ trong đó phản ánh thời điểm thực hiện.

## Kiểm chứng
Node kiểm tra 43 liên kết nội bộ trong Markdown ngoài worklog: không có đích thiếu. rg kiểm tra đường dẫn docs cũ ngoài worklog: không còn tham chiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-16-codex-number-docs.md: đạt. Không chạy test/build vì chỉ đổi tên và liên kết tài liệu.

## Còn lại
Không có việc còn lại trong phạm vi đổi tên. Đọc từ docs/1_README.md theo thứ tự số; các câu hỏi sản phẩm vẫn chờ duyệt như trước. Không commit hoặc push.

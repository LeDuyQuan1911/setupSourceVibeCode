# Gỡ plugin khỏi khung dự án

- Ngày: 2026-11-06
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Clone `setupSourceVibeCode` về máy và bỏ các plugin trong repo cùng cơ chế, tài liệu, script chỉ phục vụ chúng.

## Thực hiện

Clone repo vào `C:\Users\PC\Desktop\setupSourceVibeCode`. Gỡ `plugins/`, `vendor/`, `reviews/`, manifest plugin, hook, các script và tài liệu chỉ phục vụ plugin. Cập nhật `AGENTS.md`, `README.md`, `MAP.md`, `SPEC.md`, `PLAN.md`, `MULTI_AGENT.md`, `.gitignore`, `docs/worklog/README.md` và `contexte/decisions.md` để phản ánh cấu trúc mới.

## Quyết định

Giữ quy tắc làm việc cơ bản, worklog và governance; gỡ quy trình review chuyên biệt vì nó thuộc plugin `independent-review`. Giữ các worklog cũ làm lịch sử.

## Kiểm chứng

Kiểm tra tham chiếu còn lại trong tài liệu hiện hành, `git diff --check`, `node scripts/check-worklog.mjs` và trạng thái Git. Repo chưa có ứng dụng hoặc bộ test sản phẩm.

## Còn lại

Thay đổi chỉ nằm trong bản clone cục bộ; chưa commit hoặc push.

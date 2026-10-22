# setupSourceVibeCode

Khung khởi đầu để làm việc với coding agent. Repo hiện **chưa có ứng dụng hay stack kỹ thuật**; hãy điền [SPEC.md](SPEC.md) trước khi yêu cầu agent tạo code.

## Bắt đầu

1. Trả lời 5 câu hỏi trong [SPEC.md](SPEC.md).
2. Yêu cầu agent đọc [AGENTS.md](AGENTS.md), [MAP.md](MAP.md) và SPEC.md, rồi đề xuất một bước nhỏ trong [PLAN.md](PLAN.md).
3. Sau mỗi thay đổi, yêu cầu agent chạy kiểm tra phù hợp và cập nhật bản đồ/tài liệu nếu cấu trúc hoặc quyết định thay đổi.

**Mỗi nhiệm vụ liên quan đến repo phải có nhật ký riêng** trong [docs/worklog/](docs/worklog/README.md), ghi yêu cầu, việc đã làm, quyết định, kiểm chứng và phần còn lại. Quy tắc này áp dụng dù plugin `documentation` tắt.

## Bật plugin theo nhu cầu

```powershell
node scripts/plugins.mjs list
node scripts/plugins.mjs enable prototype
node scripts/plugins.mjs enable ci-cd
node scripts/plugins.mjs disable ci-cd
node scripts/plugins.mjs check
```

`project.plugins.json` là danh sách plugin đang bật. Mỗi agent đọc file này qua `AGENTS.md` và chỉ áp dụng hướng dẫn của plugin bật. Xem [danh mục plugin](plugins/README.md). Đây là plugin quy trình trong repo, không phải plugin cài vào Codex, Antigravity hay Claude Code.

Plugin `independent-review` hiện được bật: agent khác review code trong phiên riêng theo [quy trình và mẫu báo cáo](reviews/README.md) trước khi chủ repo quyết định merge.

Understand Anything được lưu tại `vendor/understand-anything/` và dùng qua plugin `codebase-graph`. Xem [cách build runtime và làm mới graph khi cần](docs/understand-anything.md). Hook sau commit chỉ đánh dấu graph cũ; agent cập nhật graph trước lần dùng tiếp theo.

## Các file chính

- `AGENTS.md`: quy tắc chung cho coding agent, được Codex sử dụng.
- `CLAUDE.md`: điểm vào tương ứng cho Claude Code.
- `MAP.md`: bản đồ file và nơi cần tìm thông tin.
- `SPEC.md`: mục tiêu, ràng buộc và câu hỏi cần chốt.
- `PLAN.md`: trạng thái và các bước triển khai.
- `MULTI_AGENT.md`: cách chia việc giữa Codex, Antigravity và Claude Code bằng worktree.
- `project.plugins.json` và `plugins/`: plugin quy trình có thể bật/tắt cho dự án.
- `docs/worklog/`: nhật ký bắt buộc cho từng nhiệm vụ của mỗi agent.
- `governance/`: quy tắc GitHub để chỉ chủ repo merge vào `main`.
- `reviews/`: yêu cầu và báo cáo review code độc lập.
- `vendor/understand-anything/`: source Understand Anything đã cố định phiên bản.
- `contexte/`: quyết định và kiến thức dự án.
- `livrables/`: sản phẩm đầu ra không phải source code.

Khung này dựa trên [bài viết về Claude Code Harness 3 tầng](https://www.facebook.com/photo.php?fbid=1460250176064963&set=a.101224068634254&type=3). Git đã được khởi tạo và có remote `origin`. Chưa có cấu hình MCP, secrets, stack ứng dụng hay quy trình triển khai vì chưa có yêu cầu tương ứng.

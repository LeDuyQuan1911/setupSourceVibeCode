# Bản đồ dự án

Trạng thái: khung làm việc cho agent; chưa có source ứng dụng.

| Vị trí | Vai trò |
| --- | --- |
| `README.md` | Cách bắt đầu và tổng quan repo |
| `AGENTS.md` | Quy tắc làm việc cho coding agent |
| `CLAUDE.md` | Điểm vào cho Claude Code |
| `SPEC.md` | Yêu cầu và câu hỏi cần xác định |
| `PLAN.md` | Các bước triển khai và trạng thái |
| `MULTI_AGENT.md` | Cách chia nhiệm vụ và dùng worktree cho nhiều agent |
| `project.plugins.json` | Danh sách plugin quy trình đang bật |
| `plugins/<id>/plugin.json` | Tên và mô tả của từng plugin |
| `plugins/<id>/INSTRUCTIONS.md` | Quy trình chỉ áp dụng khi plugin được bật |
| `scripts/plugins.mjs` | Lệnh liệt kê, bật/tắt và kiểm tra plugin |
| `vendor/understand-anything/understand-anything-plugin/` | Source skill, dashboard và core của Understand Anything |
| `docs/understand-anything.md` | Cách build runtime và cập nhật graph khi cần |
| `scripts/setup-understand-anything.ps1` | Build runtime và bật hook cục bộ trên Windows |
| `.githooks/post-commit` | Đánh dấu graph cũ sau commit có thay đổi |
| `scripts/mark-graph-stale.mjs` | Ghi dấu stale theo commit và file đã đổi |
| `scripts/graph-status.mjs` | Kiểm tra graph khớp commit hiện tại hay chưa |
| `docs/worklog/README.md` | Quy ước ghi nhật ký bắt buộc |
| `docs/worklog/<date>-<agent>-<task>.md` | Kết quả và kiểm chứng của từng nhiệm vụ |
| `scripts/check-worklog.mjs` | Kiểm tra cấu trúc và độ hoàn tất của worklog |
| `governance/github-main-ruleset.json` | Cấu hình ruleset GitHub cho quyền merge vào `main` |
| `governance/README.md` | Quy trình PR và giới hạn quyền merge |
| `reviews/README.md` | Quy trình review hai lượt để giảm thiên vị |
| `reviews/templates/REQUEST.md` | Mẫu giao việc trung tính cho reviewer |
| `reviews/templates/REPORT.md` | Mẫu báo cáo có bằng chứng và kết quả kiểm tra |
| `scripts/review-brief.mjs` | Tạo yêu cầu review từ hai Git ref mà không kèm danh tính tác giả |
| `contexte/decisions.md` | Nhật ký quyết định dự án |
| `livrables/README.md` | Quy ước lưu sản phẩm đầu ra |
| `.gitignore` | Loại trừ secrets và file sinh ra cục bộ |

Khi có ứng dụng, bổ sung vào đây: entry point, module chính, luồng dữ liệu, lệnh chạy/test và vị trí cấu hình. Chỉ mô tả các file thực sự tồn tại.

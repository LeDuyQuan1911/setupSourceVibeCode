# Bản đồ dự án

Trạng thái: source chính thức đang triển khai; hiện có luồng tài khoản và admin xét duyệt shop.

| Vị trí | Vai trò |
| --- | --- |
| `README.md` | Cách bắt đầu và tổng quan repo |
| `AGENTS.md` | Quy tắc làm việc cho coding agent |
| `CLAUDE.md` | Điểm vào cho Claude Code |
| `SPEC.md` | Yêu cầu và câu hỏi cần xác định |
| `apps/backend/src/server.js`, `apps/backend/src/app.js` | Điểm chạy và ghép route API HTTP |
| `apps/backend/src/core/` | Hàm mật khẩu |
| `apps/backend/src/modules/identity/` | Tài khoản và đăng nhập; route → service → repository |
| `apps/backend/src/modules/shops/` | Hồ sơ shop và xét duyệt; route → service → repository |
| `apps/frontend/` | Giao diện Vite, proxy phát triển `/api` và `/ws` |
| `apps/realtime/src/` | Tiến trình WebSocket, xác thực phiên và health |
| `packages/platform/` | Pool PostgreSQL, phiên dùng chung và Redis cache-aside |
| `db/migrations/` | Lược đồ dữ liệu có phiên bản |
| `scripts/migrate.mjs`, `scripts/create-admin.mjs` | Cập nhật database và tạo admin ban đầu |
| `compose.yaml`, `.env.example` | PostgreSQL/Redis cục bộ và tên biến môi trường |
| `PLAN.md` | Các bước triển khai và trạng thái |
| `MULTI_AGENT.md` | Cách chia nhiệm vụ và dùng worktree cho nhiều agent |
| `docs/worklog/README.md` | Quy ước ghi nhật ký bắt buộc |
| `docs/worklog/<date>-<agent>-<task>.md` | Kết quả và kiểm chứng của từng nhiệm vụ |
| `scripts/check-worklog.mjs` | Kiểm tra cấu trúc và độ hoàn tất của worklog |
| `governance/github-main-ruleset.json` | Cấu hình ruleset GitHub cho quyền merge vào `main` |
| `governance/README.md` | Quy trình PR và giới hạn quyền merge |
| `contexte/decisions.md` | Nhật ký quyết định dự án |
| `.gitignore` | Loại trừ secrets và file sinh ra cục bộ |

Luồng hiện có: trình duyệt → Vite → `/api` Fastify → module identity/shops → PostgreSQL; kết nối `/ws` → realtime → phiên trong PostgreSQL. Chạy ba lệnh `dev:backend`, `dev:realtime`, `dev:frontend`; kiểm tra bằng `npm test` và `npm run build:frontend`.


## Tài liệu

Bộ docs đã gom 14 còn 12 file, đánh số theo thứ tự đọc. Xem [mục lục docs](docs/1_README.md); yêu cầu chuẩn tại [2_requirements.md](docs/2_requirements.md), kiến trúc/hiệu suất tại [6_architecture.md](docs/6_architecture.md).

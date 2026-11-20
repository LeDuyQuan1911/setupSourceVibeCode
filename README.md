# setupSourceVibeCode

Source chính thức của nền tảng chợ B2B iPhone secondhand, website shop và quản lý CTV/đơn hàng. Ứng dụng đang được xây theo từng luồng nghiệp vụ; hiện đã có đăng ký shop, đăng nhập và admin xét duyệt. Đọc [SPEC.md](SPEC.md) và [luồng nghiệp vụ](docs/2_requirements.md) để biết phạm vi sản phẩm.

**Ưu tiên hiện tại:** hoàn thiện và duyệt [bộ tài liệu chi tiết trước triển khai](docs/1_README.md), chốt các quyết định mở trước khi xây thêm module. Phạm vi bản chính thức được đặc tả tại [docs/2_requirements.md](docs/2_requirements.md); không giới hạn ở bản thử. Code nền frontend, backend và WebSocket được giữ nguyên.

Quy tắc hiệu suất và thứ tự phân tán được ghi trong [docs/6_architecture.md](docs/6_architecture.md).

## Bắt đầu

1. Cài Node.js 22+ và Docker Desktop; chạy `npm install` và `docker compose up -d db redis`.
2. Sao chép `.env.example` thành `.env` rồi thay `ADMIN_EMAIL` và `ADMIN_PASSWORD` bằng giá trị riêng. Các lệnh npm sẽ tự đọc `.env`. Giá trị trong file mẫu chỉ dành cho máy phát triển.
3. Chạy `npm run db:migrate`; đặt `ADMIN_EMAIL` và `ADMIN_PASSWORD` riêng rồi chạy `npm run admin:create` một lần.
4. Chạy ba lệnh ở ba terminal: `npm run dev:backend`, `npm run dev:realtime`, `npm run dev:frontend`. Mở `http://127.0.0.1:5173`.

`PG_POOL_MAX` và `PG_CONNECT_TIMEOUT_MS` trong `.env.example` áp dụng cho từng tiến trình. Khi thêm bản sao, tính tổng pool của tất cả tiến trình trước khi tăng giới hạn PostgreSQL.

`REDIS_URL` bật Redis cache. Hiện backend cache danh sách xét duyệt shop trong 15 giây và đổi phiên bản cache khi shop đăng ký hoặc admin ra quyết định. Nếu Redis không sẵn sàng, API đọc PostgreSQL. Redis trong `compose.yaml` chỉ dùng làm cache cục bộ, giới hạn 128 MB và không lưu bền; production cần mạng riêng và cấu hình xác thực phù hợp.

Các bước hiện tại chỉ kiểm chứng luồng tài khoản và xét duyệt shop. Tin đăng, chat và giữ hàng sẽ được bổ sung tiếp vào source chính thức.

Để chạy bài kiểm tra tích hợp trên database riêng, tạo database `chonguon_test` trong PostgreSQL cục bộ, chạy `npm run db:migrate:test` rồi `npm test`. Không trỏ `TEST_DATABASE_URL` tới database chứa dữ liệu thật.

**Mỗi nhiệm vụ liên quan đến repo phải có nhật ký riêng** trong [docs/worklog/](docs/worklog/README.md), ghi yêu cầu, việc đã làm, quyết định, kiểm chứng và phần còn lại.

## Các file chính

- `AGENTS.md`: quy tắc chung cho coding agent, được Codex sử dụng.
- `CLAUDE.md`: điểm vào tương ứng cho Claude Code.
- `MAP.md`: bản đồ file và nơi cần tìm thông tin.
- `SPEC.md`: mục tiêu, ràng buộc và câu hỏi cần chốt.
- `docs/1_README.md`: thứ tự đọc và vai trò của 12 tài liệu; `docs/2_requirements.md` là đặc tả yêu cầu chuẩn.
- `docs/11_rules.md`: khung các quy định nền tảng cần soạn và thẩm định.
- `apps/backend/`: API và các module nghiệp vụ; `apps/frontend/`: giao diện Vite; `apps/realtime/`: WebSocket đã xác thực.
- `packages/platform/`: kết nối PostgreSQL và phiên dùng chung.
- `db/migrations/`: thay đổi lược đồ PostgreSQL theo phiên bản.
- `docs/6_architecture.md`: ranh giới module và các việc cần chuẩn bị để mở rộng tải.
- `compose.yaml`: PostgreSQL cục bộ cho phát triển.
- `PLAN.md`: trạng thái và các bước triển khai.
- `MULTI_AGENT.md`: cách chia việc giữa Codex, Antigravity và Claude Code bằng worktree.
- `docs/worklog/`: nhật ký bắt buộc cho từng nhiệm vụ của mỗi agent.
- `governance/`: quy tắc GitHub để chỉ chủ repo merge vào `main`.
- `contexte/`: quyết định và kiến thức dự án.

Ứng dụng dùng Fastify, PostgreSQL, Vite và `ws`. Chạy `npm run build:frontend` để tạo frontend tĩnh. WebSocket `/ws` hiện chỉ kiểm tra phiên và quyền shop, chưa xử lý tin nhắn. Chưa có cấu hình triển khai production.

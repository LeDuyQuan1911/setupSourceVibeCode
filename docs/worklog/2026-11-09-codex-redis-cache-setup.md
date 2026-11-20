# Thiết lập Redis cache

- Ngày: 2026-11-09
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi

Thiết lập Redis ngay trong source để cache có thể dùng khi hệ thống mở rộng; tích hợp vào một luồng đọc hiện có và bảo đảm PostgreSQL vẫn là nguồn dữ liệu khi Redis lỗi.

## Thực hiện

Thêm Redis 8 trong `compose.yaml` cho cache cục bộ, client `redis` và `packages/platform/cache.js`. Backend cache-aside trang danh sách shop admin trong 15 giây, có phiên bản khóa để vô hiệu hóa sau đăng ký hoặc xét duyệt, gộp các lần đọc đồng thời cùng khóa trong một tiến trình và fallback PostgreSQL khi Redis lỗi. Cập nhật `.env.example`, `.env` cục bộ (chỉ thêm URL Redis), README, MAP, kiến trúc, hiệu suất, kế hoạch và quyết định.

## Quyết định

PostgreSQL là nguồn dữ liệu; Redis chỉ lưu bản sao ngắn hạn. Chỉ cache kết quả sau khi xác thực admin; không cache phiên, quyền hay quyết định tồn kho/giữ hàng. Redis cục bộ giới hạn 128 MB, dùng eviction cho khóa có TTL và không lưu bền. Việc vô hiệu hóa thất bại được giới hạn độ cũ bằng TTL.

## Kiểm chứng

`docker compose up -d redis` tạo container healthy. `npm test` đạt 4 bài, gồm hit, đổi phiên bản, fallback và gộp request đồng thời. Smoke trên Redis thật xác nhận hai cache instance dùng chung dữ liệu và invalidate từ instance này khiến instance kia đọc lại. `npm run build:frontend`, `docker compose config --quiet`, `git diff --check` và kiểm tra worklog đều đạt.

## Còn lại

Redis production chưa được triển khai; cần mạng riêng, xác thực/TLS theo môi trường. Danh mục/tin đăng chưa có nên chưa cache chúng; mỗi module cần xác định TTL, khóa, quyền và sự kiện vô hiệu hóa. Khi Redis lỗi đúng lúc ghi, dữ liệu cache cũ có thể còn tối đa 15 giây.

# Quyền merge vào main

Repo GitHub: `LeDuyQuan1911/setupSourceVibeCode`. File `github-main-ruleset.json` ghi cấu hình mong muốn cho ruleset nhánh `main`.

Trạng thái ngày 2026-10-22: [ruleset #25650325](https://github.com/LeDuyQuan1911/setupSourceVibeCode/rules/25650325) đã bật trên GitHub và áp dụng cho `main`.

- Các thành viên và người đóng góp có thể tạo branch hoặc fork và mở PR vào `main`.
- Chỉ tài khoản GitHub `LeDuyQuan1911` được phép hoàn tất việc merge PR vào `main`.
- Không ai được push trực tiếp, force push hoặc xóa `main` theo ruleset này.
- Quyền merge là quyền của tài khoản GitHub, không phụ thuộc agent nào tạo PR. Agent chỉ merge khi chủ repo yêu cầu rõ đối với PR cụ thể.

Hiện tại chỉ tài khoản chủ repo là collaborator. Nếu mời thành viên sau này, cấp quyền phù hợp để họ có thể làm branch/PR; không cấp quyền admin nếu muốn duy trì quyền quyết định cuối cùng. Người có quyền admin khác về sau có thể sửa hoặc xóa ruleset.

Kiểm tra trạng thái ruleset trên GitHub tại trang Settings → Rules → Rulesets hoặc bằng `gh api repos/LeDuyQuan1911/setupSourceVibeCode/rulesets`. Cấu hình trong file này không tự đồng bộ khi chỉnh file; thay đổi GitHub phải được áp dụng riêng và ghi vào worklog.

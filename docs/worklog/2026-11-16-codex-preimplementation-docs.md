# Bộ tài liệu trước triển khai

- Ngày: 2026-11-16
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Viết bộ docs chi tiết trước khi triển khai tiếp dự án. Chỉ thay đổi tài liệu; không sửa source hoặc xóa file. Phân biệt code hiện có, yêu cầu đã chốt và đề xuất chưa duyệt. Giữ nguyên các thay đổi có sẵn của người dùng.

## Thực hiện
Tạo docs/README.md làm mục lục và thứ tự duyệt. Soạn docs/requirements.md, workflows.md, screens.md, permissions-security.md, data-model.md, api-contracts.md, testing-acceptance.md, operations.md và open-decisions.md. Bao gồm mã yêu cầu, tiêu chí nghiệm thu, state machine, transaction cạnh tranh, schema thực tế/đề xuất, API/WS hiện có, hợp đồng mục tiêu, quyền/media, test và runbook. Gom 14 nhóm câu hỏi chặn triển khai theo module.
Cập nhật README.md, MAP.md, SPEC.md, PLAN.md, docs/architecture.md và contexte/decisions.md để ưu tiên review tài liệu và dẫn tới bộ docs mới. Không thay nội dung pháp lý hiện có hoặc tuyên bố đã thẩm định. Không thêm dependency, cấu hình, MCP, code ứng dụng hoặc quyền truy cập.

## Quyết định
Ưu tiên tài liệu trước tính năng theo yêu cầu người dùng. Không tự chốt câu hỏi nghiệp vụ; đánh dấu các lựa chọn dữ liệu/API/trạng thái là đề xuất. Giữ nền source đã có; không khẳng định các module chưa xây đã tồn tại. Chỉ đánh dấu hoàn tất việc soạn docs, chưa đánh dấu thiết kế được duyệt.

## Kiểm chứng
Đối chiếu README/MAP/SPEC/PLAN, mô hình sản phẩm, kiến trúc, hiệu suất, quyết định, migrations, route/service/repository, session, realtime và cấu hình mẫu. Không đọc .env. Kiểm tra 43 liên kết nội bộ trong 15 file bằng Node: không có đích thiếu hoặc ký tự lỗi encoding. git diff --check phát hiện một dòng trắng cuối README, đã sửa rồi kiểm tra lại đạt. node scripts/check-worklog.mjs 2026-11-16-codex-preimplementation-docs.md: đạt.
Không chạy test/build ứng dụng vì chỉ sửa docs; nội dung test được mô tả theo source, không báo kết quả chạy giả. Không dùng diff với HEAD để quy toàn bộ thay đổi về nhiệm vụ này vì checkout đã có nhiều thay đổi trước đó.

## Còn lại
Chủ dự án review bản thảo, quyết định các mục DEC-01 đến DEC-14 theo thứ tự đề xuất; sau đó đồng bộ hợp đồng và thiết kế từng module. Chưa chọn hạ tầng, SLO, retention, loại tệp, quyền admin/CTV hoặc hoàn tất hold. Chưa thẩm định pháp lý và chưa đủ điều kiện mở production. Không commit, push hoặc thay đổi remote.

# Hợp nhất và rút gọn bộ docs

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Thực hiện phương án đã duyệt: gom 14 docs còn 12, rút phần trùng, giữ 56 mã yêu cầu/29 case, cập nhật thứ tự và liên kết. Không sửa source, migration hoặc chính sách chưa chốt. Giữ worklog và lịch sử quyết định.

## Thực hiện
Tạo mốc đối chiếu tạm ngoài repo gồm docs trước thay đổi và hash 28 file app/package/migration/script/test, không đọc .env. Chuyển phần độc nhất của tài liệu sản phẩm vào yêu cầu: mục tiêu/vai trò, phạm vi toàn quốc/Apple/iPhone, ví dụ giá/khoảng giá, xét duyệt shop, trách nhiệm bảo hành và chỉ số theo dõi đề xuất. Loại bỏ file sản phẩm và hiệu suất sau khi hợp nhất nội dung. Không xóa dữ liệu ứng dụng.

### Cấu trúc mới

1. docs/1_README.md: mục lục, cách đọc và nơi làm chuẩn.
2. docs/2_requirements.md: sản phẩm + yêu cầu, giữ nguyên 56 dòng mã yêu cầu/tiêu chí.
3. docs/3_workflows.md: trạng thái/actor/transaction/worker, bỏ các đoạn quyết định chép lại.
4. docs/4_screens.md: UI và tương tác.
5. docs/5_permissions-security.md: quyền và bảo mật; sửa mô tả CTV cũ theo CTV-01..07.
6. docs/6_architecture.md: kiến trúc + hiệu suất, giữ topology/module/tối ưu thực tế/tải cần đo/thứ tự tăng bản sao.
7. docs/7_data-model.md: schema/ràng buộc/index/migration, rút đoạn lặp nghiệp vụ.
8. docs/8_api-contracts.md: hợp đồng hiện có/đề xuất, giữ endpoint/input/output/lỗi/WS, bỏ nhãn cập nhật theo ngày.
9. docs/9_testing-acceptance.md: gom nguyên văn 29 case về một bảng có thứ tự; giữ môi trường/lệnh/nghiệm thu, ghi rõ chưa phủ hết 56 yêu cầu.
10. docs/10_operations.md: giữ lệnh/config/runbook, dẫn link topology chuẩn.
11. docs/11_rules.md: giữ chính sách/rule-based/phần thẩm định, rút đoạn sold lặp.
12. docs/12_open-decisions.md: giữ DEC-01..14 và các câu hỏi còn mở về đơn/giá/CTV/dữ liệu/giao nhận/domain; bỏ các khối đã chốt theo ngày.

Rút SPEC.md thành phạm vi/ràng buộc/cổng triển khai, README gốc giữ quickstart, MAP giữ bản đồ source và dẫn mục lục. Cập nhật PLAN và AGENTS (kiến trúc mới ở docs/6_architecture.md), toàn bộ tham chiếu Markdown hiện hành. Thêm quyết định tổ chức docs mới; không sửa nội dung/đường dẫn lịch sử trong worklog và contexte/decisions cũ.

## Quyết định
Requirements là chuẩn nghiệp vụ, workflows là chuẩn trạng thái/transaction; các file kỹ thuật dẫn mã yêu cầu, không chép lại toàn bộ chính sách. Giữ hiện trạng code/đề xuất/câu hỏi mở tách biệt. Không tự chốt khóa giá online/CTV, luật chi tiết đăng tin, retention, SLO hoặc actor giao nhận. Sửa mô tả cũ về pending/CTV theo yêu cầu đã chốt, không thay chính sách mới. Không gộp quyền/schema/API/test thành một tài liệu chỉ vì cùng nhắc nghiệp vụ.

## Kiểm chứng
Đối chiếu mốc trước/sau bằng Node: đủ 12 file đánh số liên tục; 56 dòng yêu cầu và 29 case giữ nguyên văn, không mất mã/tiêu chí. Đối chiếu hash 28 file app/package/migration/script/test không thay đổi. Kiểm tra liên kết Markdown hiện hành, encoding, đoạn lặp dài và đường dẫn cũ: đạt. Theo cùng cách chuẩn hóa khoảng trắng và đoạn >=170 ký tự không phải bảng, số nhóm đoạn lặp giữa docs/SPEC giảm từ 10 xuống 0. Dung lượng docs giảm khoảng 28% từ 173.767 byte; số cuối được kiểm tra sau hoàn thiện. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-consolidate-docs.md: đạt.
Không chạy test/build ứng dụng vì chỉ thay đổi tài liệu; không coi kiểm tra tài liệu là nghiệm thu runtime, pháp lý hoặc năng lực production.

## Còn lại
Không có việc còn lại trong phạm vi hợp nhất. Các quyết định mở vẫn ở docs/12_open-decisions.md; test thiết kế hiện tại cần tiếp tục bổ sung khi triển khai các yêu cầu còn thiếu. Tài liệu kỹ thuật vẫn là thiết kế chưa code, cần review trước implementation. Không commit/push hoặc đổi trạng thái remote.

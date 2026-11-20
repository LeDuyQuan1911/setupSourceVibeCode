# Rà soát trùng lặp bộ tài liệu

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Kiểm tra docs tương đồng, đề xuất gom hoặc rút gọn; chỉ khảo sát, không gộp/xóa/sửa tài liệu hiện hành. Chỉ tạo worklog này, giữ mọi thay đổi có sẵn của người dùng.

## Thực hiện
Khảo sát 14 Markdown trực tiếp trong docs, đối chiếu README/MAP/SPEC/PLAN và quy định worklog. Lập danh sách heading, số dòng, các đoạn giống nhau; đọc đối chiếu phần nghiệp vụ/quyền/trạng thái/dữ liệu/API/test/hiệu suất/vận hành và quyết định mở. Không khảo sát để xóa lịch sử worklog.

### Phát hiện

- 14 docs có 1.453 dòng, 173.767 byte; requirements có 56 mã, testing có 29 case thiết kế. Số dòng không phản ánh toàn bộ độ dài vì có nhiều đoạn dài trên một dòng.
- Tìm thấy 10 nhóm đoạn trùng nguyên văn sau chuẩn hóa khoảng trắng, mỗi đoạn tối thiểu 170 ký tự, xuất hiện ở ít nhất hai file. Có ít nhất 8.557 ký tự bản sao dư theo phép đếm này. Không tính bảng, đoạn ngắn và nội dung giống nghĩa nhưng diễn đạt khác, nên đây không phải tổng tỷ lệ trùng lặp.
- SPEC:122/124/128/130/137/141, docs/2_product-b2b-secondhand:254/256/260/262/269/273 và docs/4_workflows:104/106/110/112/119/123 lặp lại cùng khối hợp tác/website/COD.
- Quy tắc sold lặp ở SPEC:86, docs/2:34, docs/4:86. Quy tắc khóa giá lặp ở docs/4:94 và docs/8:107. Luồng đăng hàng bổ sung lặp ở SPEC:145 và docs/4:131.
- docs/2:134 vẫn nói chưa có hạn xét duyệt; docs/3:53 đã chốt 30 ngày. docs/2:116 vẫn để cách tìm hồ sơ chờ duyệt là chưa chốt, trong khi docs/3 đã có dashboard tại SHOP-04. Phần trường công khai chi tiết vẫn là câu hỏi riêng, không được tự chốt khi sửa mâu thuẫn này.
- docs/2:144 mô tả CTV chỉ tiếp cận sản phẩm giao/cho phép; docs/3:101 đã chốt toàn bộ nguồn hàng shop được phép bán. Cần bỏ mô tả cũ thay vì giữ câu ghi đè ở cuối file.
- docs/14 mở đầu nói tất cả đang chờ duyệt nhưng cuối file lại có các khối đã chốt. Quyết định đang mở, đã chốt và lịch sử đang lẫn nhau.
- docs/7 đã có bảo mật, dữ liệu, mở rộng và thuật toán tương tự docs/6, docs/8, docs/11. Phần topology ở docs/12 cũng lặp kiến trúc; operations chỉ cần sơ đồ triển khai cụ thể hoặc dẫn link.
- docs/3 tiêu chí nghiệm thu và docs/10 test case không phải tất cả đều dư: một bên định nghĩa hành vi phải có, một bên định nghĩa cách kiểm chứng. Cần liên kết qua mã, không gộp mù hai loại tài liệu.
- docs/8 schema/constraint và docs/9 request/response là hai hợp đồng khác nhau, nên giữ riêng dù cùng đề cập một đối tượng nghiệp vụ.

### Đề xuất gom/rút gọn

1. Gom nội dung còn độc nhất của docs/2_product-b2b-secondhand.md vào docs/3_requirements.md, giữ requirements làm chuẩn nghiệp vụ. Chỉ giữ mục tiêu, vai trò, ví dụ giá, giải thích thuật ngữ và luồng đọc hiểu chưa có ở requirements; bỏ các bản sao và câu cũ. Không nối nguyên file vì sẽ làm đặc tả dài hơn.
2. Gom docs/11_performance-scaling.md vào phần hiệu suất/mở rộng của docs/7_architecture.md. File 11 hiện chỉ 38 dòng; giữ tải cần đo, số đo/tối ưu thực tế và thứ tự tăng bản sao. Thuật toán khóa/worker chi tiết thuộc workflows/data-model, thay đoạn trùng bằng liên kết. Nếu sau này có báo cáo benchmark dài có thể tách thành artifact riêng theo nhu cầu.
3. SPEC.md giữ điểm vào/phạm vi/ràng buộc sản phẩm ngắn gọn và dẫn tới requirements; không chép lại từng luồng/quyết định theo ngày. Không xóa/đổi tên SPEC vì quy trình agent yêu cầu đọc.
4. docs/4_workflows.md chỉ giữ state machine, actor, điều kiện chuyển, deadline, transaction/cạnh tranh và worker. Bỏ đoạn chép lại mô hình sản phẩm và các khối quyết định theo ngày; dẫn mã yêu cầu.
5. docs/5_screens.md giữ UI, field, thao tác, loading/error/empty và phân quyền hiển thị; dẫn yêu cầu/workflow thay giải thích lại chính sách giá/COD.
6. docs/6_permissions-security.md giữ ma trận quyền, mô hình đe dọa và biện pháp kỹ thuật; dẫn rule nghiệp vụ và schema. Không gom với rules-outline vì chính sách shop và kiểm soát kỹ thuật có mục đích khác nhau.
7. docs/8_data-model.md giữ ERD, schema/constraint/index/migration và phân biệt hiện tại/đề xuất; rút các câu chuyện nghiệp vụ, chỉ dẫn mã yêu cầu.
8. docs/9_api-contracts.md gom các endpoint bổ sung theo module vào bảng hợp đồng chính; bỏ chuỗi ghi chú cập nhật cuối file khi nội dung đã được tích hợp.
9. docs/10_testing-acceptance.md gom case theo nhóm yêu cầu, dẫn mã; giữ 29 case, không xóa vì cùng nhắc quy tắc. Bổ sung phủ 56 yêu cầu là việc tiếp theo, không khẳng định hiện đủ coverage.
10. docs/12_operations.md giữ lệnh/runbook/config/phát hành/sự cố/restore; dẫn sơ đồ kiến trúc và NFR thay chép lại.
11. docs/13_rules-outline.md giữ quy tắc shop phải tuân thủ, rule-based đăng tin và phần cần thẩm định; không lặp toàn bộ đặc tả chức năng.
12. docs/14_open-decisions.md chỉ giữ câu hỏi chưa chốt, đề xuất và module bị chặn; câu đã chốt nhập requirements, lịch sử ở contexte/decisions và worklog, không mở rộng sổ câu hỏi bằng khối cập nhật theo ngày.
13. docs/1_README.md chỉ mục lục, cách đọc và vai trò mỗi file; MAP giữ vị trí source/đường đi code, README gốc giữ quickstart. Không lặp danh sách toàn bộ docs ở cả ba nơi.

### Cấu trúc mục tiêu đề xuất: 14 xuống 12 docs

- 1_README.md: mục lục và cách đọc.
- 2_requirements.md: yêu cầu bản chính thức, gom phần cần thiết từ file 2/3 cũ.
- 3_workflows.md: trạng thái, transaction và worker.
- 4_screens.md: UI và tương tác.
- 5_permissions-security.md: quyền và bảo mật.
- 6_architecture.md: kiến trúc, hiệu suất và mở rộng, gom file 7/11 cũ.
- 7_data-model.md: dữ liệu và migration.
- 8_api-contracts.md: hợp đồng HTTP/WS/sự kiện.
- 9_testing-acceptance.md: kiểm thử và bằng chứng nghiệm thu.
- 10_operations.md: vận hành, phát hành và khôi phục.
- 11_rules.md: quy định nền tảng và rule-based.
- 12_open-decisions.md: câu hỏi chưa chốt.

Tên/thứ tự trên chỉ là phương án, chưa tạo hoặc đổi tên file. Khi được giao thực hiện, cần đổi AGENTS tham chiếu architecture, MAP, SPEC, mục lục và mọi liên kết cùng đợt. Giữ tên file quy ước ở gốc và worklog lịch sử.

## Quyết định
Khuyến nghị giảm còn 12 docs bằng hai cặp gộp hợp lý; phần giảm dài chính đến từ loại bỏ bản sao và phân định nơi làm chuẩn, không phải gộp mọi thứ vào một file. Giữ đủ 56 yêu cầu, 29 ca kiểm chứng, thông tin độc nhất, trạng thái chưa chốt và ranh giới hiện có/đề xuất. Không coi trùng chủ đề là trùng chức năng tài liệu; không loại bằng chứng nghiệm thu hoặc chính sách vì đề cập cùng nghiệp vụ.
Nguyên nhân chính: các lần cập nhật trước đã nối cùng quyết định vào nhiều file thay vì sửa phần chuẩn, làm tài liệu dài và lệch quyết định. Ghi nhận để sửa trong đợt rút gọn, chưa sửa trực tiếp trong nhiệm vụ khảo sát này.

## Kiểm chứng
Dùng Node đọc danh sách/heading/số dòng, so đoạn theo khoảng trắng và đếm mã yêu cầu/test case; dùng rg đối chiếu vị trí câu cũ với yêu cầu mới. Số liệu và vị trí trong phát hiện lấy từ file thực tế. node scripts/check-worklog.mjs 2026-11-18-codex-docs-duplication-audit.md: đạt. Không chạy test/build ứng dụng vì không sửa source; không đánh giá lại tính đúng pháp lý hoặc năng lực production trong khảo sát cấu trúc tài liệu này.

## Còn lại
Chưa gộp/xóa/rút nội dung docs. Bước tiếp theo nếu thực hiện: chụp danh sách yêu cầu/case và nội dung độc nhất, gộp/rút theo nơi làm chuẩn, giải mâu thuẫn bằng quyết định đã chốt, cập nhật đường dẫn, đối chiếu đủ 56 ID/29 case và kiểm tra liên kết/đoạn trùng. Không commit/push hoặc thay đổi remote.

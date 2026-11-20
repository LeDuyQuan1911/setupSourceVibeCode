# Quyết định dự án

Ghi mỗi quyết định quan trọng theo mẫu dưới đây. Stack và cấu trúc ứng dụng hiện tại được ghi trong quyết định mới nhất; các quyết định cũ được giữ làm lịch sử.

### 2026-11-09 — Thiết lập Redis làm cache từ đầu

- Bối cảnh: chủ dự án muốn có Redis sẵn trong source để không phải thay kiến trúc cache khi hệ thống phát triển.
- Quyết định: dùng Redis cache-aside ở backend, bắt đầu với danh sách shop cho admin, TTL 15 giây và khóa có phiên bản; tăng phiên bản sau khi đăng ký/xét duyệt thành công. Redis lỗi thì đọc PostgreSQL. Redis Compose chỉ dành cho phát triển, không lưu bền; Redis production chọn khi triển khai.
- Lý do: tạo một điểm dùng cache chung, kiểm chứng hit/invalidation/fallback ngay với luồng thật; tránh dựa vào cache cho quyền, phiên và tồn kho cần nhất quán.
- Hệ quả / khi nào xem lại: mỗi module sau phải chỉ rõ dữ liệu cache, TTL, phạm vi quyền và điểm vô hiệu hóa; kiểm thử tải quyết định có mở thêm vùng cache hay không. Quyết định này thay phần “chưa chọn Redis” trong tài liệu hiệu suất trước đó.

### 2026-11-09 — Tối ưu đúng dữ liệu trước khi tăng bản sao

- Bối cảnh: chủ dự án lo tải có thể tăng từ khoảng 200 request/phút và muốn chuẩn bị phân tán, thuật toán trước khi mở rộng theo chiều ngang.
- Quyết định: giảm thời gian giữ transaction khi đăng ký, giới hạn thời gian chờ pool, dùng cursor và index cho hàng đợi shop, heartbeat WebSocket. Nghiệp vụ tồn kho/giữ hàng dựa vào ràng buộc và transaction DB; chat lưu bền trước khi phát realtime. Đo tải trước khi chọn thêm tiến trình hoặc broker.
- Lý do: thêm bản sao không sửa được truy vấn chậm, khóa sai hoặc mất sự kiện; thuật toán đúng giúp mở rộng an toàn.
- Hệ quả / khi nào xem lại: xem `docs/11_performance-scaling.md`; cần đo tải trên nghiệp vụ thật khi module xuất hiện, chưa cam kết mức request/giây.

### 2026-11-09 — Chia ba ứng dụng frontend, backend và WebSocket

- Bối cảnh: chủ dự án yêu cầu source có ranh giới riêng cho giao diện, API và realtime trước khi làm thêm nghiệp vụ.
- Quyết định: tách `apps/frontend`, `apps/backend`, `apps/realtime`; dùng `packages/platform` cho PostgreSQL và phiên. Vite proxy cùng origin lúc phát triển; production cần reverse proxy cùng origin. Backend vẫn là modular monolith sở hữu nghiệp vụ và ghi dữ liệu.
- Lý do: có thể phát triển, build và tăng bản sao giao diện/API/kết nối thời gian thực riêng mà không nhân đôi xác thực.
- Hệ quả / khi nào xem lại: WebSocket mới là kết nối đã xác thực, chưa có chat; khi chạy nhiều bản sao cần cơ chế phát sự kiện liên tiến trình. Quyết định này thay phần “một ứng dụng HTTP phục vụ cả giao diện” trong kiến trúc trước.

### 2026-11-09 — Khóa ranh giới source trước tính năng mới

- Bối cảnh: người dùng muốn thiết lập kiến trúc/source trước khi triển khai tiếp hệ thống chính thức.
- Quyết định: giữ modular monolith, chia module theo nghiệp vụ; route nhận HTTP, service giữ quy tắc/transaction, repository giữ SQL. Thiết kế quyền, trạng thái, worker, media và mở rộng tải trong `docs/7_architecture.md` trước khi thêm module mới.
- Lý do: tránh dồn toàn bộ logic vào route và giúp source lớn dần theo module có chủ sở hữu rõ.
- Hệ quả / khi nào xem lại: code nền hiện có được tách lớp; các module chợ tiếp theo phải theo ranh giới này và được rà thiết kế trước khi viết.

### 2026-11-09 — Bắt đầu source chính thức theo module

- Bối cảnh: người dùng đổi hướng, muốn xây luôn ứng dụng chính thức và quản lý source khi nhiều tính năng/người dùng về sau.
- Quyết định: bỏ cấu trúc `mvp/`; dùng Fastify, PostgreSQL và module theo nghiệp vụ trong `src/`. Migrations tách khỏi code; bắt đầu với shop đăng ký, đăng nhập và admin xét duyệt.
- Lý do: một ứng dụng theo module giảm chi phí phối hợp lúc đầu nhưng vẫn đặt ranh giới code/dữ liệu để mở rộng dần. Chưa tách microservice khi chưa có lưu lượng và nhu cầu vận hành cụ thể.
- Hệ quả / khi nào xem lại: tiếp tục từng luồng nghiệp vụ, bổ sung kiểm thử và quan sát tải trước khi quyết định tách dịch vụ hoặc tăng hạ tầng. Quyết định này thay thế kế hoạch làm MVP riêng ngay dưới đây.

### 2026-11-09 — Làm MVP riêng trước hệ thống chính

- Bối cảnh: người dùng muốn hoàn thiện một bản MVP trước khi viết source chính cho hệ thống có thể mở rộng nhiều tính năng và người dùng.
- Quyết định: đặt ứng dụng thử nghiệm trong `mvp/`, nghiệm thu theo các luồng B2B; thiết kế source/hạ tầng chính sau khi có kết quả thử MVP. Chưa chọn stack hoặc cấu trúc code sản xuất.
- Lý do: xác nhận nghiệp vụ với shop trước khi đầu tư vào cấu trúc vận hành ở quy mô lớn.
- Hệ quả / khi nào xem lại: chọn stack và môi trường chạy khi bắt đầu code MVP; tổng kết dữ liệu, tải và luồng thực tế trước khi xây hệ thống chính.

### 2026-11-09 — Giới hạn tệp và vòng đời tin đăng

- Bối cảnh: cần chốt dung lượng tệp chat và thời hạn một sản phẩm được treo trên chợ.
- Quyết định: mỗi tệp chat tối đa 10 MB. Tin đăng có hiệu lực 90 ngày từ khi xuất bản/treo lại; hết hạn thì ẩn, báo shop và cho 3 ngày để treo lại. Không treo lại thì xóa tin, không xóa lịch sử hội thoại/giao dịch liên quan.
- Lý do: giới hạn dung lượng tải lên và buộc shop xác nhận hàng còn bán sau mỗi kỳ.
- Hệ quả / khi nào xem lại: cần chốt loại tệp và cách xử lý tin đang có lượt giữ/giao dịch mở lúc đến hạn xóa.

### 2026-11-09 — Ảnh và tệp trong chat MVP

- Bối cảnh: cần chốt phạm vi tin nhắn giữa các shop.
- Quyết định: chat MVP hỗ trợ văn bản, ảnh và tệp gắn với hội thoại về sản phẩm/yêu cầu.
- Lý do: người dùng cần trao đổi tài liệu và ảnh ngay trong nền tảng.
- Hệ quả / khi nào xem lại: chốt giới hạn định dạng, dung lượng, quyền truy cập và thời hạn lưu trước khi triển khai.

### 2026-11-07 — Nhắn tin trong nền tảng ở MVP

- Bối cảnh: cần chọn kênh shop hỏi hàng và trao đổi trong bản đầu.
- Quyết định: MVP có nhắn tin trong nền tảng giữa hai shop, gắn với sản phẩm/yêu cầu. Xác nhận giữ và hủy giữ là thao tác nghiệp vụ riêng.
- Lý do: người dùng muốn hội thoại nằm trong hệ thống để hai shop liên hệ.
- Hệ quả / khi nào xem lại: cần chốt phạm vi tin nhắn (văn bản, ảnh/tệp), thông báo và quy tắc lưu trữ.

### 2026-11-07 — Ghi lý do khi hủy giữ hàng

- Bối cảnh: shop nguồn được phép hủy lượt giữ trước hạn; reseller cần biết vì sao.
- Quyết định: thao tác hủy có ô nhập lý do; thông báo cho reseller hiển thị lý do nếu có. Cơ chế report được để cho giai đoạn sau.
- Lý do: cung cấp ngữ cảnh khi hủy mà chưa mở rộng sang quy trình khiếu nại.
- Hệ quả / khi nào xem lại: chưa chốt lý do có bắt buộc nhập không và cách xử lý reseller đã lên đường.

### 2026-11-07 — Giữ hàng trực tiếp trong 12 tiếng

- Bối cảnh: cần quy định thời hạn và quyền hủy lượt giữ hàng khi hai shop sắp xếp gặp/lấy máy.
- Quyết định: lượt giữ có hiệu lực 12 tiếng từ lúc shop nguồn xác nhận và tự hết hạn nếu chưa hoàn tất; shop nguồn có thể hủy trước hạn. Reseller được thông báo khi lượt giữ bị hủy hoặc hết hạn.
- Lý do: theo thời hạn và quyền hủy người dùng đã chốt; thông báo giúp reseller biết máy không còn được dành riêng.
- Hệ quả / khi nào xem lại: cần quy định lý do hủy, thứ tự ưu tiên và xử lý khi reseller đã lên đường.

### 2026-11-07 — Giữ hàng dành cho giao dịch trực tiếp

- Bối cảnh: thuật ngữ “giữ hàng” trong tài liệu trước bị dùng cả cho reseller gặp shop nguồn và đơn khách đặt online.
- Quyết định: giữ hàng là việc shop nguồn dành một máy cụ thể cho reseller trong lúc hai shop sắp xếp gặp/lấy hàng trực tiếp. Luồng đơn online cần cơ chế kiểm tra/khóa tồn kho riêng, chưa chốt chi tiết.
- Lý do: hai tình huống có người khởi tạo, thời điểm và cách hoàn tất khác nhau.
- Hệ quả / khi nào xem lại: giá của lượt giữ trực tiếp đã xác nhận vẫn theo thời điểm giữ; thời hạn giữ và quy tắc khóa tồn kho online còn mở.

### 2026-11-07 — Khoảng giá theo mẫu iPhone của từng shop

- Bối cảnh: một mẫu như iPhone 12 có thể có nhiều máy cũ, mỗi máy có tình trạng và giá riêng.
- Quyết định: danh mục theo mẫu của một shop hiển thị khoảng giá từ các máy đang bán/treo; chi tiết, giữ hàng và giao dịch vẫn theo từng máy cụ thể. Máy đã bán hoặc bị ẩn không tính vào khoảng giá.
- Lý do: giúp người xem tìm mẫu trước mà không làm mất khác biệt giữa từng máy secondhand.
- Hệ quả / khi nào xem lại: khi thiết kế giao diện cần thể hiện rõ khoảng giá và giá chính xác của từng máy; thời hạn giữ hàng vẫn chưa chốt.

### 2026-11-07 — Giá của lượt giữ hàng đã xác nhận

- Bối cảnh: shop nguồn có thể đổi giá khi reseller đang giữ hàng.
- Quyết định: lượt giữ hàng đã được shop nguồn xác nhận dùng giá lấy hàng tại thời điểm xác nhận giữ trong thời hạn hiệu lực; đổi giá niêm yết sau đó không sửa giá này. Lượt giữ mới dùng giá mới.
- Lý do: reseller đã dựa vào giá cũ khi giữ hàng.
- Hệ quả / khi nào xem lại: lưu giá và thời điểm xác nhận trên từng lượt giữ; cần chốt thời điểm khóa giá nếu đơn chưa có lượt giữ được xác nhận.

### 2026-11-07 — Tạm ẩn và treo lại khi giá nguồn đổi

- Bối cảnh: một sản phẩm có thể đang được nhiều reseller treo trên website riêng khi shop nguồn đổi giá.
- Quyết định: thông báo cho từng reseller đang treo sản phẩm, tạm ẩn sản phẩm trên website của họ và chỉ hiện lại khi từng reseller nhấn “Treo lại”. Giá bán mặc định giữ số tiền lời cũ; nếu giá nguồn mới cao hơn giá reseller cũ, giá bán mặc định bằng giá nguồn mới. Reseller có thể sửa giá không thấp hơn giá nguồn mới.
- Lý do: reseller cần chủ động chấp nhận giá nguồn mới trước khi website tiếp tục nhận đơn.
- Hệ quả / khi nào xem lại: luồng này thuộc giai đoạn có website riêng; giá của yêu cầu đã giữ hàng hoặc đơn đang mở vẫn cần chốt.

### 2026-11-07 — Giá lấy hàng do shop nguồn niêm yết

- Bối cảnh: cần xác định ý nghĩa trường giá bán cho shop khác trong tin iPhone.
- Quyết định: shop nguồn niêm yết giá lấy hàng; reseller tự đặt giá bán cho khách nhưng không thấp hơn giá nguồn. Không có thương lượng giảm giá riêng; shop nguồn muốn giảm thì tự cập nhật giá món hàng.
- Lý do: người dùng muốn reseller chủ động biên lợi nhuận và giá nguồn minh bạch trên chợ.
- Hệ quả / khi nào xem lại: cần quy định hiệu lực giá mới đối với yêu cầu đang giữ hàng hoặc đơn đang mở.

### 2026-11-07 — Thông tin bắt buộc của tin iPhone

- Bối cảnh: người dùng chốt danh sách trường thông tin cần có khi shop đăng một chiếc iPhone secondhand.
- Quyết định: mỗi tin gắn một chiếc máy và bắt buộc có mẫu, dung lượng lưu trữ, màu, ngoại hình, pin, lỗi/linh kiện đã thay, tình trạng iCloud, ảnh thật, phụ kiện, thời hạn bảo hành và giá bán cho shop khác.
- Lý do: shop lấy nguồn cần đánh giá tình trạng và điều kiện bán của đúng chiếc máy.
- Hệ quả / khi nào xem lại: cần chốt cách nhập, kiểm tra và hiển thị từng trường; tình trạng iCloud không bao gồm thông tin đăng nhập.

### 2026-11-07 — Danh mục bản đầu là iPhone secondhand

- Bối cảnh: mô tả “sản phẩm Apple secondhand” trước đây rộng hơn phạm vi người dùng muốn triển khai đầu tiên.
- Quyết định: bản đầu cho đăng đầy đủ các dòng iPhone secondhand; Apple là danh mục cấp cao, có thể thêm các dòng Apple khác và danh mục hàng khác sau. Quyết định này làm rõ phạm vi nhóm hàng đã ghi trước đó.
- Lý do: tập trung dữ liệu và quy tắc tin đăng cho iPhone trước khi mở rộng.
- Hệ quả / khi nào xem lại: cần chốt thông tin bắt buộc của từng chiếc iPhone và cách phân loại mẫu/biến thể.

### 2026-11-06 — Đánh giá từ shop cũ không bắt buộc

- Bối cảnh: shop mới có thể chưa được shop nào trên chợ biết hoặc đánh giá.
- Quyết định: admin tự kiểm tra hồ sơ và có thể duyệt shop mới dù không có đánh giá từ shop cũ. Không đặt số lượng đánh giá tối thiểu.
- Lý do: shop mới vẫn có đường tham gia chợ; đánh giá cộng đồng chỉ hỗ trợ admin ra quyết định.
- Hệ quả / khi nào xem lại: cần chốt mẫu đánh giá và cách xử lý ý kiến trái chiều; admin giữ quyền quyết định cuối cùng.

### 2026-11-06 — Hồ sơ shop tối thiểu

- Bối cảnh: người dùng đồng ý với bộ thông tin ban đầu được đề xuất để admin xét duyệt shop.
- Quyết định: shop mới cung cấp tên shop, người đại diện, số liên hệ, địa chỉ và kênh bán hàng hiện có.
- Lý do: đủ thông tin cơ bản để admin liên hệ và đối chiếu với đánh giá của shop cũ trong giai đoạn đầu.
- Hệ quả / khi nào xem lại: cần quy định cách kiểm tra thông tin và xử lý hồ sơ thiếu/sai; chưa thêm giấy tờ hoặc trường dữ liệu khác.

### 2026-11-06 — Admin duyệt shop với thông tin từ shop cũ

- Bối cảnh: người dùng muốn biết shop mới có thật và tận dụng việc các shop trong chợ có thể đã biết họ.
- Quyết định: admin xét duyệt shop mới; các shop đã tham gia có thể gửi đánh giá/xác nhận dựa trên quen biết hoặc giao dịch trước đó. Admin là người quyết định cuối cùng, đánh giá không tự động cấp quyền. Quyết định này chốt đề xuất duyệt shop còn mở trước đây.
- Lý do: kết hợp hồ sơ shop với hiểu biết thực tế của cộng đồng shop mà vẫn có một đầu mối chịu trách nhiệm duyệt.
- Hệ quả / khi nào xem lại: cần quy định hồ sơ, mẫu đánh giá, ngăn đánh giá thiếu căn cứ và cách xử lý khi không có hoặc có đánh giá trái chiều.

### 2026-11-06 — Cộng tác viên thuộc shop

- Bối cảnh: người dùng làm rõ vai trò CTV và hỏi ý nghĩa của việc xác minh shop.
- Quyết định: CTV thuộc một shop, dùng thông tin sản phẩm shop giao để rao bán trên kênh mạng xã hội của mình. Shop có thể quản lý CTV trong trang quản trị; tự động đăng bài là hướng phát triển sau. Admin duyệt shop mới chỉ là đề xuất, chưa được người dùng xác nhận.
- Lý do: tách vai trò người bán cộng tác với shop khỏi tài khoản shop B2B; tránh hiểu “xác minh shop” là kiểm định từng máy.
- Hệ quả / khi nào xem lại: chốt có cần duyệt shop trước khi giao dịch, quyền CTV và thời điểm xây trang quản trị CTV.

### 2026-11-06 — Quyền treo hàng theo yêu cầu lấy nguồn một chiều

- Bối cảnh: mô tả “hai shop đồng ý hợp tác rồi treo hàng của nhau” trước đó chưa đúng luồng người dùng muốn.
- Quyết định: reseller gửi yêu cầu lấy nguồn tới từng shop có hàng; shop nguồn chấp nhận hoặc từ chối. Sau khi được chấp nhận, reseller chọn từng sản phẩm để treo. Quyền không tự động có hiệu lực theo chiều ngược lại. Quyết định này thay thế phần mô tả quyền treo hàng hai chiều trong ghi chép trước.
- Lý do: một shop có thể muốn mở rộng dải sản phẩm bằng nguồn của shop khác mà không muốn hoặc không cần shop đó treo hàng của mình.
- Hệ quả / khi nào xem lại: cần chốt shop nguồn có thể giới hạn danh mục/sản phẩm được chọn và cách thu hồi quyền.

### 2026-11-06 — Phạm vi chợ B2B và doanh thu

- Bối cảnh: người dùng chốt thêm nhóm hàng, phạm vi địa lý và cách thu phí, đồng thời đề xuất cơ chế giữ tiền cho đơn online.
- Quyết định: bản đầu tập trung vào chợ B2B sản phẩm Apple secondhand trên toàn Việt Nam; nền tảng thu phí theo tháng và có giữ hàng có thời hạn. Website riêng và tên miền riêng thuộc giai đoạn sau. Phương án admin giữ/giải ngân tiền và hưởng chênh lệch chỉ là ý tưởng cần thẩm định, chưa được chốt để triển khai.
- Lý do: tách các yêu cầu đã xác nhận khỏi phương án dòng tiền có ràng buộc pháp lý và vận hành.
- Hệ quả / khi nào xem lại: soạn quy định nền tảng, chốt giá/kênh liên lạc/giữ hàng cho bản đầu; đánh giá dòng tiền và hóa đơn trước giai đoạn website.

### 2026-11-06 — Hợp tác và thanh toán giữa các shop

- Bối cảnh: người dùng mô tả cách các shop cùng bán một nguồn hàng qua website riêng.
- Quyết định: một shop có thể vừa là shop nguồn vừa là reseller; hai shop cùng đồng ý hợp tác trước khi treo hàng của nhau. Giao dịch trực tiếp do các shop tự gặp và xử lý. Với đơn online của reseller, reseller nhận tiền khách, trả shop nguồn, hai shop cùng xác nhận, rồi shop nguồn chuyển hàng tới khách. Có thêm vai trò cộng tác viên và admin là chủ nền tảng.
- Lý do: phản ánh quy trình kinh doanh người dùng xác nhận.
- Hệ quả / khi nào xem lại: cần chốt quyền cộng tác viên, phạm vi hợp tác, cách xác nhận thanh toán và trách nhiệm hậu mãi.

### 2026-11-06 — Viết tài liệu sản phẩm trước khi xây

- Bối cảnh: người dùng mô tả chợ B2B giữa shop có hàng và shop cần hàng, đồng thời cân nhắc cấp website bán lẻ cho shop.
- Quyết định: ghi hai bề mặt sản phẩm và luồng nghiệp vụ trong tài liệu; tách đề xuất chợ B2B giai đoạn đầu và website riêng giai đoạn sau để trao đổi, chưa coi là phạm vi đã chốt.
- Lý do: tồn kho hàng secondhand, quyền đăng lại và trách nhiệm với khách cần được xác định trước khi thiết kế kỹ thuật.
- Hệ quả / khi nào xem lại: chốt các câu hỏi trong `SPEC.md` rồi cập nhật phạm vi, tiêu chí chấp nhận và kế hoạch.

### 2026-11-06 — Gỡ hệ plugin khỏi khung dự án

- Bối cảnh: bản clone cần một khung dự án gọn, không kèm các plugin quy trình và Understand Anything.
- Quyết định: gỡ danh mục và manifest plugin, source vendored, hook, script và tài liệu chỉ phục vụ chúng. Các quyết định cũ bên dưới được giữ làm lịch sử, không còn áp dụng cho bản hiện tại.
- Lý do: yêu cầu mới của người dùng thay thế cấu hình plugin trước đó.
- Hệ quả / khi nào xem lại: nếu sau này cần công cụ bổ trợ, bổ sung theo nhu cầu cụ thể của dự án.

### 2026-10-22 — Merge main bằng PR thông thường

- Bối cảnh: ruleset `Restrict updates` khiến PR hiện nút bypass; chủ repo muốn merge bằng nút thường mà vẫn là người duy nhất quyết định.
- Quyết định: giữ yêu cầu PR, chặn xóa/force push; bỏ `Restrict updates` và bypass actor. Chỉ chủ repo có quyền Write/Admin, người khác gửi PR từ fork công khai.
- Lý do: với repo thuộc tài khoản cá nhân, collaborator có quyền Write và có thể merge PR. Giới hạn quyền Write duy trì quyền merge độc quyền mà không cần bypass.
- Hệ quả / khi nào xem lại: người đóng góp không push branch trực tiếp vào repo gốc. Mời thêm collaborator sẽ thay đổi quyền merge; cần xem lại cấu hình nếu chuyển repo sang organization.

### 2026-10-22 — Lưu Understand Anything trong repo

- Bối cảnh: chủ repo muốn mọi agent dùng cùng source mà không phải clone plugin riêng; sau commit có thay đổi graph cần được làm mới khi dùng.
- Quyết định: vendor `understand-anything-plugin/` ở commit upstream cố định. Hook sau commit chỉ ghi `stale.json` trong thư mục graph (`.ua/`, hoặc `.understand-anything/` nếu đã tồn tại); agent kiểm tra commit hash và cập nhật graph khi cần. Graph giữ cục bộ.
- Lý do: source có thể review và dùng chung; quá trình cập nhật có thể cần LLM nên không chạy âm thầm trong Git hook. Cách này hoạt động với Codex, Antigravity và Claude qua quy tắc repo.
- Hệ quả / khi nào xem lại: dependencies và hook phải được thiết lập một lần trên mỗi clone vì Git không tự kích hoạt hook từ source. Khi có source ứng dụng, tạo graph baseline và kiểm tra incremental; nếu muốn chia sẻ graph, rà soát dữ liệu trước khi đổi `.gitignore`.

## Mẫu

### YYYY-MM-DD — Tên quyết định

- Bối cảnh:
- Quyết định:
- Lý do:
- Hệ quả / khi nào xem lại:

### 2026-11-16 — Hoàn thiện tài liệu trước triển khai tiếp

- Bối cảnh: chủ dự án yêu cầu viết docs chi tiết trước khi triển khai dự án tiếp.
- Quyết định: ưu tiên bộ tài liệu tại docs/1_README.md; giữ nguyên code nền, phân biệt hiện trạng source, yêu cầu đã chốt, thiết kế đề xuất và câu hỏi mở. Review quyết định chặn từng module trước khi code module đó.
- Lý do: tránh triển khai trên giả định chưa được duyệt và giúp đối chiếu yêu cầu, dữ liệu, API, quyền, kiểm thử, vận hành.
- Hệ quả / khi nào xem lại: bộ thiết kế mới là bản thảo để review; ghi câu trả lời của chủ dự án trong SPEC/nhật ký quyết định và đồng bộ tài liệu trước triển khai. Không coi việc viết docs là duyệt phương án kỹ thuật hoặc nghiệp vụ.

### 2026-11-16 — Danh mục mở rộng từ đầu và nghĩa của treo sản phẩm

- Bối cảnh: chủ dự án yêu cầu thiết kế database sẵn danh mục và làm rõ treo lại là reseller treo sản phẩm nguồn lên website mình.
- Quyết định: database catalog có cấu trúc danh mục ngay từ đầu; bản đầu chỉ kích hoạt category Apple, mở rộng được Tivi/Bàn phím. Treo/treo lại dùng cho bản hiển thị sản phẩm nguồn trên website reseller; thao tác mở kỳ 90 ngày của tin chợ gọi là Gia hạn tin. Quyết định này thay cách gọi treo lại cho gia hạn tin trong các ghi chép cũ.
- Lý do: tránh hardcode iPhone trên toàn schema và tránh lẫn hai hành vi khác chủ thể, tài nguyên, thời hạn.
- Hệ quả / khi nào xem lại: schema cụ thể categories/nhóm/mẫu và thuộc tính riêng vẫn là thiết kế cần review; chưa có migration mới. Giữ phạm vi iPhone đã chốt trong Apple và website ở giai đoạn sau cho đến khi có thay đổi rõ. Chu kỳ 90 ngày/cửa sổ 3 ngày không đổi.

### 2026-11-16 — Máy secondhand đã bán không mở bán lại

- Bối cảnh: mỗi máy có tình trạng riêng; chủ dự án yêu cầu máy bán xong chuyển mục Đã bán và không đem ra bán lại.
- Quyết định: sold là trạng thái kết thúc của đơn vị hàng; lưu ID và lịch sử trong mục Đã bán. Không mở bán lại qua đổi trạng thái, gia hạn tin, treo website hoặc tạo tin mới cho cùng máy. Máy khác cùng mẫu có bản ghi/tình trạng riêng. Đã bán là nhóm theo trạng thái, không phải category hàng hóa.
- Lý do: bảo toàn tính riêng biệt và lịch sử của hàng secondhand, tránh bán lại máy không còn tồn kho.
- Hệ quả / khi nào xem lại: cập nhật thiết kế dữ liệu/API/UI/worker và nghiệm thu; chưa sửa source/migration. Quyền xem lịch sử, nhận diện nhập trùng và xử lý khai nhầm/hoàn trả còn cần chốt; không có ngoại lệ tái mở bán ngầm.

### 2026-11-17 — Cấm sửa giá nguồn khi máy đang có lượt giữ hiệu lực

- Bối cảnh: chủ dự án xác nhận shop nguồn không được đổi giá máy đã có người giữ.
- Quyết định: hold đã xác nhận và chưa hết hạn khóa giá niêm yết của chính máy đó trong tối đa 12 tiếng. Yêu cầu chưa xác nhận chưa khóa giá; hủy/hết hạn thì máy chưa bán mới được sửa giá. Sold vẫn kết thúc, không mở bán lại.
- Lý do: giá niêm yết và giá giao dịch không thay đổi trong thời gian máy được dành cho reseller.
- Hệ quả / khi nào xem lại: thay phần diễn giải cũ cho phép đổi giá niêm yết trong khi hold còn hiệu lực; giữ snapshot giá lịch sử. Đồng bộ SPEC, docs nghiệp vụ/kiến trúc/dữ liệu/API/UI/test/hiệu suất. Cần kiểm soát ở server/DB và test cạnh tranh khi triển khai; chưa sửa code hoặc migration. Các quyết định cũ về giá hold được lưu làm lịch sử, phần xung đột nhường cho quyết định này.

### 2026-11-17 — Ngừng hợp tác toàn reseller và đơn website/COD

- Bối cảnh: chủ dự án làm rõ nguồn không điều khiển từng sản phẩm reseller; đồng ý thêm Chờ giao và nhận hoàn kiểm tra cho COD.
- Quyết định: không giới hạn riêng sản phẩm/danh mục; chỉ ngừng hợp tác toàn reseller sau xử lý hết request/giao dịch mở. Web tự kiểm tra/khóa tồn kho nguồn, không yêu cầu nguồn duyệt từng đơn. Trả đủ xác nhận → Đã mua/sold; COD Chờ giao → Đang vận chuyển → chủ shop xác nhận thành công hoặc thất bại. Thất bại vẫn khóa đến nhận hoàn/kiểm tra đạt mới mở lại; không đảo sold. CTV/reseller yêu cầu lấy máy vẫn cần nguồn xác nhận.
- Lý do: không bỏ lửng đơn khi ngừng hợp tác, tránh bán trùng và mở bán khi máy chưa về.
- Hệ quả / khi nào xem lại: thay mô tả cũ bắt nguồn xác nhận còn hàng/duyệt từng đơn web và các câu hỏi về phạm vi chọn hàng/thu hồi khi có đơn mở. Dòng tiền/đối soát, actor xác nhận giao nhận, timeouts và thời điểm khóa giá còn cần chốt; không mặc định hai xác nhận thanh toán giữa shop là điều kiện tiếp nhận đơn khách. Website vẫn giai đoạn sau; chưa có code/migration.

### 2026-11-18 — Luồng đăng hàng, ẩn/hiện và giữ máy

- Bối cảnh: chủ dự án chốt năm điểm luồng A và đồng ý ẩn tin không tự hủy giữ.
- Quyết định: shop approved tự đăng qua bộ quy tắc, không duyệt từng tin; cần soạn luật có thể kiểm tra rule-based, AI chỉ là hướng sau. Lấy hàng bên ngoài cần nguồn đồng ý mới giữ 12 tiếng; nguồn xác nhận thành công trong hạn, chưa chốt đủ 12 tiếng thì tự hết hạn. Bán ngoài phải xử lý hết giao dịch mở. Ẩn chỉ dừng yêu cầu mới, giữ nguyên hold/đơn xác nhận; hiện lại giữ hạn kỳ cũ, không mở bán máy sold.
- Lý do: tách trạng thái hiển thị với tồn kho/giao dịch; không mất cam kết đang xử lý hoặc gia hạn tin bằng ẩn/hiện.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, luồng, UI/API/kiến trúc và nghiệm thu. Bộ tiêu chuẩn, bằng chứng hoàn tất và xử lý xóa tin có giao dịch mở còn cần duyệt. Chưa sửa code/migration hoặc tích hợp AI.

### 2026-11-18 — Luồng B hợp tác lấy nguồn không bắt buộc hỏi hàng

- Bối cảnh: chủ dự án xác nhận reseller gửi request tới nguồn, nguồn đồng ý thì được treo hàng.
- Quyết định: bỏ bước hỏi hàng/chat bắt buộc trong luồng B; request hợp tác một chiều cấp quyền chọn/treo, không cần duyệt từng máy. Chat tùy chọn; request giữ máy cho giao dịch bên ngoài là thao tác riêng cần nguồn xác nhận.
- Lý do: không lẫn quan hệ hợp tác với trao đổi và giao dịch theo máy.
- Hệ quả / khi nào xem lại: đồng bộ SPEC và docs luồng/UI/API/yêu cầu/nghiệm thu; không loại chat hoặc thay phạm vi website giai đoạn sau. Chưa sửa code/migration.

### 2026-11-18 — Đặc tả bản chính thức thay phạm vi MVP

- Bối cảnh: chủ dự án yêu cầu sửa docs/3_requirements.md, không cần MVP mà cần bản nghiêm túc để triển khai thực tế.
- Quyết định: đặc tả bao gồm chợ B2B, hợp tác lấy nguồn/website shop, CTV, đơn web trả đủ/COD và nền bảo mật/vận hành; không đẩy website/CTV ra ngoài phạm vi bằng nhãn giai đoạn sau. Giữ mã yêu cầu và phân biệt yêu cầu, code hiện có, nghiệm thu.
- Lý do: tài liệu làm căn cứ xây và vận hành sản phẩm hoàn chỉnh, thay mô tả giới hạn bản thử.
- Hệ quả / khi nào xem lại: cập nhật phạm vi ở SPEC, mục lục, bản đồ và các tham chiếu docs; giữ lịch sử worklog/quyết định cũ. Tổng hợp các quyết định hồ sơ/dashboard/CTV đã được chủ dự án nêu. Vẫn triển khai theo phụ thuộc và chốt phần thiếu; chưa có tính năng mới hoặc kết quả vận hành được nghiệm thu. AI/mobile/ERP/logistics tự động/admin giữ tiền không tự được phê duyệt bởi thay đổi phạm vi này.

### 2026-11-18 — Hợp nhất bộ tài liệu và một nơi làm chuẩn

- Bối cảnh: chủ dự án duyệt phương án gom/rút bộ 14 docs sau khảo sát trùng lặp.
- Quyết định: 12 docs đánh số từ 1_README tới 12_open-decisions. Hợp nhất tài liệu sản phẩm/yêu cầu thành docs/2_requirements.md; kiến trúc/hiệu suất thành docs/6_architecture.md. Giữ workflows, UI, quyền, dữ liệu, API, test, operations và rules riêng theo trách nhiệm. SPEC chỉ phạm vi ngắn; quyết định mở không chép lịch sử đã chốt.
- Lý do: tránh sửa cùng quy tắc ở nhiều nơi dẫn đến lệch yêu cầu; nối các tài liệu qua mã yêu cầu và liên kết.
- Hệ quả / khi nào xem lại: bảo toàn 56 dòng yêu cầu, 29 case và nội dung độc nhất; sửa mô tả cũ theo quyết định hiện hành, không tự chốt phần thiếu. Worklog/nhật ký cũ giữ đường dẫn tại thời điểm ghi, mục lục mới ở docs/1_README.md. Không sửa source/migration hoặc thay phạm vi sản phẩm.

### 2026-11-18 — Đăng ký tách hồ sơ và liên kết Google/mật khẩu

- Bối cảnh: chủ dự án phân biệt đăng ký tài khoản với nộp hồ sơ, chọn Google hoặc Gmail+mật khẩu/nhập lại, đồng ý một tài khoản dùng cả hai cách sau liên kết.
- Quyết định: Google không bắt mật khẩu website; cách mật khẩu cần nhập lại khớp. Cùng Gmail không tự merge hoặc tạo user/shop khác. User mật khẩu có trước phải đăng nhập đúng mật khẩu để liên kết Google; Google-only thêm mật khẩu qua tài khoản hiện có. Sau đăng ký mới nộp năm trường shop; 30 ngày thuộc lần nộp hồ sơ, không tính từ đăng ký.
- Lý do: không nhân đôi danh tính/lịch sử và không lẫn đăng ký với quyền kinh doanh.
- Hệ quả / khi nào xem lại: cập nhật ACC-01/02, thêm ACC-03/04, SHOP-06 và ca T-29/30. Source hiện vẫn gộp đăng ký và shop, chưa có Google; chưa sửa code. Verify Gmail nhập tay, giới hạn password, recovery, giao thức/migration cụ thể còn phải chốt/thiết kế.

### 2026-11-18 — Xác minh Gmail trước kích hoạt tài khoản mật khẩu

- Bối cảnh: chủ dự án đồng ý nhập Gmail/mật khẩu/nhập lại, gửi link xác minh và kích hoạt khi bấm link hợp lệ.
- Quyết định: bắt buộc xác minh Gmail cho đăng ký bằng mật khẩu; chờ xác minh chưa kích hoạt và chưa nộp hồ sơ shop. Đăng ký Google/liên kết vẫn theo ACC-03/04 đã chốt.
- Lý do: kiểm tra người đăng ký sử dụng được địa chỉ Gmail, tách kích hoạt tài khoản khỏi duyệt shop.
- Hệ quả / khi nào xem lại: cập nhật ACC-01/workflow/UI/dữ liệu/API/test và câu hỏi DEC-01. Thời hạn link, gửi lại, quy tắc mật khẩu và recovery chưa được duyệt. Không gửi email, thêm dịch vụ hoặc sửa source/migration.

### 2026-11-18 — Link xác minh Gmail hiệu lực 10 phút

- Bối cảnh: chủ dự án chọn 10 phút thay đề xuất 30 phút khi chốt đăng ký tài khoản.
- Quyết định: link xác minh hiệu lực 10 phút kể từ lúc gửi; đủ/quá hạn không kích hoạt, người dùng yêu cầu gửi lại.
- Lý do: theo thời hạn người dùng yêu cầu.
- Hệ quả / khi nào xem lại: cập nhật ACC-01, luồng/UI/dữ liệu/API/test/DEC-01; tần suất gửi lại và vô hiệu link cũ chưa chốt. Chưa sửa code hoặc tích hợp email.

### 2026-11-18 — Chỉ link xác minh mới nhất có hiệu lực

- Bối cảnh: chủ dự án đồng ý khi gửi lại thì các link cũ bị vô hiệu.
- Quyết định: mỗi tài khoản chỉ dùng link xác minh mới nhất; gửi lại thay thế link cũ, link mới có hạn 10 phút từ lần gửi mới.
- Lý do: tránh dùng nhầm nhiều link xác minh còn hoạt động.
- Hệ quả / khi nào xem lại: đồng bộ ACC-01/workflow/UI/dữ liệu/API/T-01/DEC-01; cần bảo vệ cạnh tranh khi triển khai. Tần suất, số lần gửi lại, xử lý lỗi mail và token cụ thể chưa chốt; chưa sửa code/migration hoặc gửi email.

### 2026-11-18 — Khoảng chờ gửi lại xác minh 60 giây

- Bối cảnh: chủ dự án đồng ý mức 60 giây giữa hai lần gửi link xác minh.
- Quyết định: mỗi tài khoản gửi lại cách lần trước tối thiểu 60 giây. Chỉ link mới nhất hiệu lực 10 phút từ lần gửi; request quá sớm bị chặn, không tạo link mới hay gia hạn link cũ.
- Lý do: hạn chế gửi liên tục, nhất quán khi mở nhiều tab.
- Hệ quả / khi nào xem lại: đồng bộ ACC-01/workflow/UI/dữ liệu/API/test/DEC-01. Tổng số email theo giờ/ngày và xử lý mail lỗi chưa chốt; chưa sửa code/migration hoặc gửi mail.

### 2026-11-18 — Tối đa 5 email xác minh mỗi tài khoản trong 60 phút

- Bối cảnh: chủ dự án đồng ý hạn mức 5 email/tài khoản/60 phút, tính cả lần gửi đầu.
- Quyết định: hạn mức áp dụng cùng khoảng chờ 60 giây; chỉ link mới nhất hiệu lực 10 phút. Quá hạn mức không gửi hoặc thay đổi/gia hạn link hiện tại, phải chờ đủ điều kiện.
- Lý do: giới hạn gửi liên tục kéo dài, không chỉ chống bấm lặp trong một phút.
- Hệ quả / khi nào xem lại: đồng bộ ACC-01 và thiết kế/kiểm chứng liên quan; cần kiểm tra theo tài khoản ở server kể cả cạnh tranh. Lỗi mail/quota khi lỗi và cơ chế cụ thể còn cần chốt; không gửi email hoặc sửa code/migration.

### 2026-11-18 — Quy tắc mật khẩu tài khoản

- Bối cảnh: chủ dự án đồng ý giữ mức độ dài hiện có của code và quy tắc nhập lại.
- Quyết định: mật khẩu 12–200 ký tự, nhập lại phải khớp; không bắt kết hợp đủ hoa/thường/số/ký tự đặc biệt.
- Lý do: quy tắc đăng ký rõ ràng, giữ cách kiểm tra độ dài đang có.
- Hệ quả / khi nào xem lại: cập nhật ACC-01, workflow/UI/T-01 và DEC-01; phần nhập lại/tách đăng ký vẫn chưa có code. Không thay đổi hash hoặc source. Quy trình recovery còn cần chốt.

### 2026-11-18 — Quên mật khẩu qua link gửi Gmail đã xác minh

- Bối cảnh: chủ dự án đồng ý luồng tài khoản đã có mật khẩu nhập Gmail verified → nhận link đặt lại → nhập mật khẩu mới/nhập lại.
- Quyết định: hỗ trợ ACC-05, cập nhật mật khẩu cùng user; không tạo user/shop hoặc tự xác minh Gmail bằng reset. Password mới theo ACC-01.
- Lý do: khôi phục cách đăng nhập mật khẩu qua địa chỉ đã xác minh của tài khoản.
- Hệ quả / khi nào xem lại: thêm ACC-05/T-31 và đồng bộ thiết kế liên quan; tổng 60 yêu cầu/32 case. Hạn link/gửi lại/quota/dùng một lần/thu hồi phiên chưa chốt; không sửa code hoặc gửi email.

### 2026-11-18 — Chính sách link đặt lại mật khẩu độc lập xác minh đăng ký

- Bối cảnh: chủ dự án đồng ý dùng bộ quy tắc gửi link tương tự verify nhưng hạn mức reset tính riêng.
- Quyết định: link reset có hạn 10 phút từ gửi, gửi lại cách tối thiểu 60 giây, tối đa 5 email reset/tài khoản/60 phút tính cả lần đầu, chỉ link reset mới nhất hiệu lực. Quota/cooldown và token theo mục đích reset tách verify; gửi lại reset không vô hiệu link verify.
- Lý do: trải nghiệm nhất quán, không để chức năng này tiêu thụ hạn mức hoặc làm hỏng link chức năng kia.
- Hệ quả / khi nào xem lại: cập nhật ACC-05/workflow/UI/dữ liệu/API/T-31/DEC-01. Dùng một lần, tự đăng nhập và thu hồi phiên còn cần chốt; chưa sửa code/migration hoặc gửi mail.

### 2026-11-18 — Link đặt lại dùng một lần và thu hồi phiên

- Bối cảnh: chủ dự án chốt cách xử lý sau khi đặt lại mật khẩu thành công.
- Quyết định: link reset chỉ dùng một lần; sau đổi mật khẩu thành công, thu hồi toàn bộ phiên đăng nhập ứng dụng của user trên mọi thiết bị, gồm phiên hiện tại; không tự đăng nhập và yêu cầu đăng nhập lại. Google đã liên kết vẫn là phương thức đăng nhập của cùng user; không can thiệp phiên tài khoản Google bên ngoài ứng dụng.
- Lý do: ngăn tái sử dụng link và giữ quyền truy cập ứng dụng nhất quán sau thay đổi thông tin đăng nhập.
- Hệ quả / khi nào xem lại: đồng bộ ACC-05, workflow, UI, dữ liệu/API, quyền và T-31; cần thiết kế transaction chống dùng link đồng thời và ngắt quyền phiên WebSocket khi triển khai. Chưa sửa code hoặc gửi email.

### 2026-11-18 — Thanh toán web đến sau hạn cần chủ shop xác nhận

- Bối cảnh: khi bàn mốc khóa đơn trả đủ, chủ dự án yêu cầu khách liên hệ chủ shop nếu khoản thanh toán đến sau hạn để chủ shop xác nhận máy bán thành công.
- Quyết định: khoản tiền đến sau hạn không tự động làm đơn Đã mua; khách liên hệ chủ shop bán, shop đối chiếu tiền và xác nhận thủ công. Bảo vệ bất biến một máy chỉ bán một lần: chỉ xác nhận khi máy còn đủ điều kiện và không thuộc giao dịch khác.
- Lý do: cho phép xử lý thanh toán muộn có người chịu trách nhiệm mà không gây bán trùng máy secondhand.
- Hệ quả / khi nào xem lại: thời hạn thanh toán, trạng thái khóa máy khi quá hạn và xử lý tiền nếu không thể xác nhận vẫn cần chốt. Chưa sửa code hoặc tích hợp thanh toán.

### 2026-11-18 — Giải phóng máy khi đơn trả đủ quá hạn

- Bối cảnh: chủ dự án chốt phương án xử lý sau khi đơn trả đủ hết hạn và khoản tiền đến muộn.
- Quyết định: đơn trả đủ quá hạn chưa xác nhận tiền mất quyền giữ máy, máy được mở cho giao dịch mới. Nếu tiền đến muộn, khách liên hệ chủ shop bán; shop chỉ xác nhận bán khi đã đối chiếu tiền và máy còn bán được, khóa lại máy nhất quán với giao dịch khác. Nếu máy đã bán/đang thuộc giao dịch khác, đơn cũ không được xác nhận và khoản tiền phải được hoàn.
- Lý do: không khóa vô thời hạn từng máy secondhand, không bán trùng và có đường xử lý tiền đến muộn.
- Hệ quả / khi nào xem lại: độ dài hạn thanh toán, giá khi xác nhận muộn và quy trình đối soát/hoàn tiền cần chốt; chưa sửa code hoặc chọn nhà cung cấp thanh toán.

### 2026-11-18 — Khóa đúng máy và chụp giá khách trả khi đặt web

- Bối cảnh: chủ dự án hỏi ý nghĩa “ghi giá đơn” và chốt khi được giải thích bằng giá khách thấy lúc bấm đặt mua.
- Quyết định: lúc khách xác nhận đặt mua, hệ thống khóa đúng chiếc máy được chọn và lưu giá khách phải trả vào đơn. Giá niêm yết thay đổi sau đó không tự sửa giá đơn đang chờ. Tạo đơn không đồng nghĩa đã thanh toán hoặc máy đã bán.
- Lý do: mỗi máy secondhand và giá của nó là riêng, đơn cần một số tiền xác định để đối chiếu, không thể lấy giá hiện hành khi xem lại đơn.
- Hệ quả / khi nào xem lại: áp dụng cho trả đủ và COD; giá nguồn đối soát, giá khi xác nhận tiền muộn và độ dài hạn trả đủ vẫn mở. Chưa sửa code/schema.

### 2026-11-19 — Hạn thanh toán 15 phút cho đơn trả đủ trên web

- Bối cảnh: chủ dự án chốt đề xuất hạn thanh toán sau khi đã chốt khóa máy và giá lúc tạo đơn.
- Quyết định: đơn trả đủ có 15 phút từ lúc tạo theo giờ DB; tại hoặc sau hạn mà chưa xác nhận tiền thì quyền giữ máy của đơn hết, máy đủ điều kiện được mở cho giao dịch mới dù worker chưa chạy. Tiền ghi nhận muộn theo luồng shop xác nhận thủ công đã chốt. COD không dùng deadline 15 phút này.
- Lý do: hạn giữ rõ ràng cho một máy secondhand duy nhất, không để đơn chờ thanh toán khóa tồn kho vô thời hạn.
- Hệ quả / khi nào xem lại: cập nhật WEB-02, workflow, UI, data/API, T-20 và câu hỏi mở. Còn cần chốt giá xác nhận muộn, giao nhận và đối soát/hoàn tiền; chưa sửa code.

### 2026-11-19 — Bên giao hàng cho đơn reseller trên website

- Bối cảnh: chủ dự án làm rõ việc giao máy khi nguồn A có máy và reseller B bán trên website của B.
- Quyết định: với đơn đã thanh toán đủ, A và B trao đổi và chọn bên giao trực tiếp cho khách theo từng đơn, không cố định một bên. Với đơn COD, A là bên giao hàng.
- Lý do: đơn trả đủ có thể tổ chức giao linh hoạt giữa hai shop; COD giao từ shop nguồn đang giữ máy.
- Hệ quả / khi nào xem lại: cập nhật WEB-03 và luồng giao hàng; cần chốt cách ghi thỏa thuận, bên xác nhận kết quả/nhận hoàn, thu tiền COD và đối soát A/B. Chưa sửa code hoặc chọn đơn vị vận chuyển.

### 2026-11-19 — Tiền COD về shop nguồn và khách đặt cọc trước

- Bối cảnh: với hàng nguồn A bán trên website reseller B, chủ dự án làm rõ A là bên gửi COD nên tiền thu hộ về A; khách phải cọc trước khi gửi.
- Quyết định: COD chỉ được gửi sau khi khoản cọc được xác nhận; mỗi shop có trường cấu hình mức cọc riêng. A gửi đơn COD và nhận khoản tiền COD do đơn vị vận chuyển chuyển về. Nhận cọc không làm máy sold.
- Lý do: khớp trách nhiệm gửi COD và dòng tiền thu hộ của đơn vị vận chuyển; có điều kiện cọc trước giao.
- Hệ quả / khi nào xem lại: cập nhật WEB-03/workflow/UI/data/API/T-21; cần chốt mức cọc của A hay B áp dụng cho đơn trên web B, ai nhận cọc, cách khấu trừ vào số COD, hạn chờ cọc, COD thất bại và đối soát A/B. Chưa sửa code hoặc chọn đơn vị vận chuyển.

### 2026-11-19 — Trần cọc COD theo giá máy và chênh lệch reseller

- Bối cảnh: chủ dự án chốt cọc cho đơn máy 12 triệu không vượt 10% giá máy và không vượt phần lời B khi bán thành công; cọc chuyển về B.
- Quyết định: với máy nguồn A bán trên web B, dùng mức cọc B cấu hình; cọc thực thu cho B không vượt mức nhỏ hơn giữa 10% giá bán máy và chênh lệch giá bán B − giá nguồn A. Tiền COD giá máy còn lại bằng giá bán trừ cọc, do A gửi và nhận thu hộ như quyết định trước.
- Lý do: cọc không vượt phần B có thể hưởng từ giao dịch, trong khi A nhận phần COD ít nhất bằng giá nguồn khi giao thành công.
- Hệ quả / khi nào xem lại: cập nhật WEB-03/workflow/UI/data/API/T-21 và câu hỏi mở; nếu chênh lệch bằng 0 thì không có cọc dương hợp lệ, cần chốt có tắt COD hay thay giá. Chưa chốt phí vận chuyển, cọc khi giao thất bại và đối soát cuối; chưa sửa code.

### 2026-11-19 — Nguồn xác nhận COD giao thất bại và cọc xử lý ngoài website

- Bối cảnh: chủ dự án sửa quy tắc COD thất bại và phân định trách nhiệm khoản cọc.
- Quyết định: khi shop nguồn A nhấn Giao không thành công, đơn thất bại, máy chưa sold được giải phóng để xuất hiện lại trên sàn nếu tin còn đủ điều kiện hiển thị. A và reseller B tự làm việc về khoản cọc khách đã trả; website không phân xử hoặc thực hiện giữ/hoàn cọc.
- Lý do: trạng thái thất bại do nguồn trực tiếp xác nhận; trách nhiệm cọc giữa hai shop được xử lý ngoài nền tảng theo quyết định của chủ dự án.
- Hệ quả / khi nào xem lại: quyết định này thay quy tắc cũ chờ nhận hoàn/kiểm tra mới mở bán lại. Cần chốt A được nhấn nút khi đơn vị vận chuyển báo thất bại hay sau khi máy đã về A, và cách cập nhật tình trạng máy nếu thay đổi. Không mở máy đã sold hoặc tự hiện tin hidden/expired; chưa sửa code.

### 2026-11-19 — A tự xác nhận giao thất bại sau cảnh báo

- Bối cảnh: chủ dự án không muốn website xác minh việc máy đã quay về vì phức tạp và không đủ chứng cứ đáng tin cậy.
- Quyết định: shop nguồn A tự quyết lúc nhấn Giao không thành công; website không bắt chứng cứ máy đã về tay. Trước thao tác, UI cảnh báo khuyên đợi máy về tay rồi mới nhấn để tránh khách đặt mua khi máy chưa sẵn. Nhấn nút vẫn đóng đơn và giải phóng máy chưa sold theo quyết định trước.
- Lý do: trách nhiệm xác nhận tình trạng giao do A nắm; hệ thống không thể kiểm chứng việc nhận hoàn một cách tin cậy trong luồng hiện tại.
- Hệ quả / khi nào xem lại: bỏ câu hỏi điều kiện nhấn theo máy quay về khỏi sổ quyết định mở; giữ kiểm tra quyền A, trạng thái đơn, bất biến sold và lịch sử thao tác. Rủi ro A nhấn sớm cần quy định trách nhiệm shop, không biến lời khuyên thành chặn server. Chưa sửa code.

### 2026-11-19 — Đối soát COD thành công ngoài website

- Bối cảnh: chủ dự án chốt ví dụ giá bán 12 triệu, giá nguồn 10 triệu, cọc 1 triệu vào B và COD 11 triệu vào A.
- Quyết định: khi COD thành công, A chuyển cho B phần còn lại `P − S − D` ngoài website; A giữ giá nguồn S, B nhận tổng chênh lệch `P − S` gồm cọc và tiền A chuyển. Website chỉ ghi/hiển thị số cần đối soát, không tự chuyển hoặc giữ/giải ngân tiền.
- Lý do: kết hợp cọc về B và COD về A thành một phép đối soát rõ ràng, không mở luồng thanh toán giữa shop trên nền tảng.
- Hệ quả / khi nào xem lại: áp dụng cho COD giao thành công; cọc khi giao thất bại vẫn do A/B tự xử lý. Còn phí vận chuyển, hạn/chứng từ đối soát và trường hợp chênh lệch bằng 0; chưa sửa code hoặc tích hợp thanh toán.

### 2026-11-19 — Hạn cọc COD 15 phút từ lúc tạo đơn

- Bối cảnh: đơn COD Chờ cọc giữ một máy cụ thể; chủ dự án chốt đề xuất giới hạn thời gian chờ.
- Quyết định: khách có 15 phút từ lúc tạo đơn COD để cọc. Tại hoặc sau hạn mà chưa xác nhận cọc, đơn bị hủy và mất quyền giữ máy ngay theo giờ DB, không đợi worker; máy đủ điều kiện mở cho giao dịch mới. COD đã xác nhận cọc không bị hạn này hủy khi đang chuẩn bị/giao hàng.
- Lý do: một máy secondhand không bị khóa vô thời hạn bởi đơn COD chưa cọc.
- Hệ quả / khi nào xem lại: cập nhật WEB-03/workflow/UI/dữ liệu/API/T-21; cọc COD đến muộn cần chính sách xử lý riêng. Chưa sửa code hoặc tích hợp thanh toán.

### 2026-11-19 — Xử lý cọc COD đến muộn qua shop bán và nguồn

- Bối cảnh: sau khi đơn COD hết hạn chờ cọc 15 phút, khách vẫn có thể chuyển cọc và chủ dự án muốn các shop tự làm việc với khách.
- Quyết định: khách nhắn riêng shop bán. Nếu shop bán là reseller B, B gửi yêu cầu riêng cho shop nguồn A; A đồng ý và máy vẫn còn bán được thì mới khóa lại máy và tiến hành vận chuyển. Yêu cầu đang chờ không giữ máy; đơn hết hạn không tự kích hoạt lại vì khoản cọc đến muộn. Nếu A từ chối hoặc máy đã hết/thuộc giao dịch khác, B tự xử lý khoản cọc với khách ngoài website. Nếu shop nguồn tự bán, khách liên hệ trực tiếp nguồn, không tạo yêu cầu tới chính mình. Đây là ngoại lệ sau quá hạn; đơn COD cọc đúng hạn vẫn không cần A duyệt từng đơn.
- Lý do: giữ quyền quyết định giao hàng của nguồn khi giao dịch cũ đã hết hạn, tránh bán trùng một máy và phân rõ trách nhiệm khoản cọc muộn.
- Hệ quả / khi nào xem lại: cập nhật WEB-03, luồng, quyền, dữ liệu/API, giao diện và T-32. Cần chốt cách tạo/liên kết đơn tiếp tục, giá sau thay đổi, bằng chứng đã nhận cọc và hạn xử lý request; chưa sửa code hoặc tích hợp thanh toán.

### 2026-11-19 — Rút yêu cầu xây luồng riêng cho cọc COD muộn

- Bối cảnh: chủ dự án làm rõ khách và shop tự liên hệ, thỏa thuận việc cọc muộn bên ngoài website; việc đặc tả nút request, quyền duyệt và dữ liệu/API riêng không giải quyết vấn đề của nền tảng.
- Quyết định: thay quyết định ngay phía trên ở phạm vi tính năng. Website chỉ hủy đơn COD hết hạn, giải phóng máy, không tự kích hoạt lại đơn hay giữ máy khi khoản cọc đến muộn. Khách, reseller và nguồn tự trao đổi/xử lý khoản cọc ngoài website; không xây quy trình request A/B riêng cho tình huống này. Nếu các bên muốn mua bán qua website sau đó, tạo giao dịch mới theo giá và tồn kho lúc đặt.
- Lý do: không đưa thỏa thuận ngoài nền tảng thành tính năng thừa; vẫn bảo vệ bất biến một máy chỉ thuộc một giao dịch hiệu lực.
- Hệ quả / khi nào xem lại: gỡ luồng request cọc muộn khỏi yêu cầu, workflow, UI, quyền, data/API và ca nghiệm thu; giữ T-32 kiểm tra đơn quá hạn không hồi sinh. Không còn câu hỏi về giá/đơn tiếp tục hoặc hạn request riêng cho cọc muộn. Chưa sửa code.

### 2026-11-19 — COD vẫn áp dụng khi reseller không có chênh lệch giá

- Bối cảnh: chủ dự án bác đề xuất tắt COD khi reseller B bán bằng giá nguồn A và yêu cầu bỏ trần cọc bằng phần lời B.
- Quyết định: COD vẫn khả dụng khi `P = S`; cọc khách trả B vẫn theo mức shop cấu hình và trần 10% giá bán máy đã chốt, không bị giới hạn bởi `P − S`. Tiền COD A nhận vẫn là `P − D`.
- Lý do: phần lời B không phải điều kiện cho phép COD hoặc mức cọc khách cần trả.
- Hệ quả / khi nào xem lại: công thức đối soát `P − S − D` có thể âm; ví dụ `P = S = 10 triệu`, `D = 500 nghìn` thì B đã nhận cọc và cần bù A 500 nghìn để A đủ giá nguồn. Cách chuyển/ghi nhận và vai trò số dư chợ chưa chốt; không mặc định phép tính là lệnh chuyển tiền. Chưa sửa code.

### 2026-11-19 — Ý tưởng số dư chợ và khấu trừ 50.000đ mỗi đơn có cọc

- Bối cảnh: chủ dự án nêu hướng shop nạp tiền vào chợ và chợ giữ tiền chung; mỗi đơn có đặt cọc sẽ trừ 50.000đ từ tiền trong chợ. Khi quy mô lớn hơn có thể chuyển sang cơ chế giữ/khấu trừ theo đúng số tiền khách chuyển cho shop.
- Quyết định: ghi nhận hướng thiết kế để thảo luận, chưa chốt việc 50.000đ là phí hay tiền giữ tạm, shop bị trừ, mốc trừ/hoàn, số dư tối thiểu và quan hệ với cọc khách/B-A. Cơ chế khấu trừ tương ứng số cọc khách chuyển là ý tưởng mở rộng về sau, chưa là yêu cầu triển khai hiện tại.
- Lý do: các chi tiết chưa đủ để mô hình hóa sổ cái hay quyết định ai sở hữu tiền; không gộp khoản 50.000đ với cọc khách hoặc đối soát giá nguồn.
- Hệ quả / khi nào xem lại: đưa câu hỏi vào `docs/12_open-decisions.md`; trước khi xây ví/nạp tiền cần chốt nghiệp vụ, kiểm soát giao dịch và trách nhiệm tiền. Chưa sửa code.

### 2026-11-19 — Phí chợ 50.000đ do shop bán trả

- Bối cảnh: chủ dự án làm rõ khoản 50.000đ trừ số dư chợ cho mỗi đơn có cọc không phải tiền giữ tạm.
- Quyết định: khoản này là phí chợ. Nếu shop nguồn tự bán, trừ số dư shop nguồn; nếu reseller bán sản phẩm nguồn, trừ số dư reseller. Phí tách khỏi cọc khách chuyển cho shop và khoản đối soát giá nguồn giữa A/B. Đây là quy tắc của giai đoạn hiện tại; ý tưởng tương lai trừ số dư tương ứng số cọc khách trả chưa áp dụng.
- Lý do: phí phát sinh theo shop đứng bán đơn, không tính cho shop chỉ cung cấp máy.
- Hệ quả / khi nào xem lại: thêm FEE-02 và T-33, đồng bộ yêu cầu/luồng/thiết kế, bỏ câu hỏi phí hay tiền giữ tạm và bên trả. Cần chốt mốc trừ, xử lý phí khi đơn thất bại, quy trình nạp/thiếu số dư và phương thức đối soát A/B khi chênh lệch âm. Chưa sửa code.

### 2026-11-19 — Hoàn phí chợ khi COD giao thất bại

- Bối cảnh: sau khi chốt phí chợ 50.000đ từ số dư shop bán, chủ dự án chốt trường hợp COD giao thất bại.
- Quyết định: khi shop nguồn xác nhận COD giao không thành công, cộng lại 50.000đ vào đúng số dư phí chợ của shop bán đã bị trừ cho đơn đó. Khoản cộng lại này là hoàn phí chợ, không phải hoàn tiền cọc khách. Một khoản trừ chỉ được hoàn một lần; nếu chưa bị trừ thì không tạo số dư mới.
- Lý do: shop bán không chịu phí chợ cho đơn COD giao thất bại, đồng thời sổ số dư không tăng sai khi thao tác được gửi lại.
- Hệ quả / khi nào xem lại: cập nhật FEE-02, T-33 và luồng COD; còn mốc trừ phí ban đầu, nạp/thiếu số dư và chi tiết ghi sổ cần chốt. Chưa sửa code.

### 2026-11-19 — Chỉ tạo đơn COD sau khi cọc được xác nhận

- Bối cảnh: chủ dự án chỉ ra tài liệu gọi bước chờ cọc là đơn COD, sai thứ tự thực tế khách chốt cọc rồi mới tạo đơn.
- Quyết định: khi khách chọn COD, website tạo lượt chờ cọc giữ đúng một máy tối đa 15 phút theo giờ DB, chưa tạo đơn COD. Chỉ khi cọc được xác nhận hợp lệ trước hạn, hệ thống mới tạo đơn COD Chờ giao và chuyển quyền khóa máy từ lượt chờ sang đơn; khi đó trừ phí chợ 50.000đ từ shop bán. Lượt chờ cọc quá hạn giải phóng máy, không có đơn COD để hủy; cọc đến muộn không tự tạo đơn. Lượt chờ chưa thành đơn không chịu phí.
- Lý do: khớp thứ tự nghiệp vụ, giữ một máy không bị bán trùng trong thời gian khách cọc và chỉ thu phí khi đã có đơn thực sự.
- Hệ quả / khi nào xem lại: quyết định này thay các câu trong tài liệu cũ nói “đơn COD Chờ cọc”. Đồng bộ WEB-01/03, FEE-02, workflow, UI, data/API và T-21/32/33. Cần chốt nguồn xác nhận cọc, xử lý shop thiếu số dư lúc tạo đơn và cách nạp tiền. Chưa sửa code.

### 2026-11-19 — Xác nhận cọc COD tự động bằng QR và webhook

- Bối cảnh: chủ dự án đề xuất dùng webhook/QR thay cho shop bấm xác nhận cọc thủ công.
- Quyết định: mỗi lượt chờ cọc COD hiển thị QR chuyển tiền tới tài khoản shop đứng bán với mã tham chiếu riêng. Bên cung cấp kết nối tài khoản nhận tiền gửi webhook giao dịch; server xác thực webhook, đối chiếu mã lượt, tài khoản nhận, số cọc và hiệu lực giữ máy trước khi tạo đơn COD/trừ phí chợ. Quét QR chỉ khởi tạo lệnh chuyển tiền, không chứng minh tiền đã vào. Ảnh chuyển khoản, nút khách bấm hoặc webhook sai/trùng không tự tạo đơn.
- Lý do: tự động xác nhận khoản cọc thực nhận mà không yêu cầu shop theo dõi và bấm xác nhận trong 15 phút; bảo vệ một máy chỉ có một giao dịch hiệu lực.
- Hệ quả / khi nào xem lại: thay đề xuất xác nhận thủ công trong worklog rà soát trước; cập nhật WEB-03, API, dữ liệu, UI, quyền và T-34. Chưa chọn nhà cung cấp, cách kết nối tài khoản nhiều shop, xử lý giao dịch đến trước hạn nhưng webhook tới sau hạn hoặc webhook thất lạc. Chưa sửa code.

### 2026-11-19 — Webhook cọc COD về sau hạn

- Bối cảnh: cọc có thể vào tài khoản shop trước hạn 15 phút nhưng webhook xác nhận tới server sau khi lượt chờ đã hết hạn và máy được mở bán.
- Quyết định: không tự tạo đơn COD, giữ lại máy hoặc trừ phí chợ khi webhook tới sau khi lượt chờ đã hết hạn, dù timestamp giao dịch tiền trước hạn. Khách tự nhắn riêng shop bán để xử lý khoản cọc; website không tạo luồng request/duyệt riêng cho tình huống này. Ghi vết giao dịch để tránh mất dữ liệu đối chiếu, không để sự kiện muộn chiếm máy của giao dịch khác.
- Lý do: trạng thái tồn kho tại thời điểm webhook đến có thể đã thay đổi, không thể tự hồi sinh quyền giữ máy từ lượt hết hạn.
- Hệ quả / khi nào xem lại: đồng bộ WEB-03, API/dữ liệu/workflow và T-34; bỏ câu hỏi mốc giao dịch trước hạn nhưng webhook đến sau hạn khỏi danh sách mở. Cách kết nối tài khoản shop và xử lý webhook thất lạc vẫn mở; chưa sửa code.

### 2026-11-19 — Phí chợ chỉ thu reseller và cho số dư âm 100.000đ

- Bối cảnh: chủ dự án sửa phạm vi phí 50.000đ và cách xử lý khi reseller chưa nạp thêm tiền; bác phương án phải có 50.000đ khả dụng/dành riêng trước khi hiển thị QR.
- Quyết định: shop nguồn tự bán máy của mình không chịu phí này. Chỉ đơn COD có cọc của reseller bán máy nguồn mới trừ 50.000đ từ số dư reseller khi tạo đơn. Số dư có thể xuống đúng `−100.000đ`, không thấp hơn. Khi chạm ngưỡng, tạm ẩn sản phẩm reseller để chặn đơn mới; không ẩn/hủy đơn reseller đã tạo hoặc sản phẩm shop tự sở hữu. COD reseller thất bại hoàn đúng 50.000đ đã trừ vào số dư reseller như quyết định trước.
- Lý do: shop nguồn không trả phí khi tự bán; hạn mức âm cho reseller tiếp tục hoạt động đến ngưỡng, còn ngưỡng chặn phát sinh giao dịch mới mà vẫn xử lý được giao dịch đang mở.
- Hệ quả / khi nào xem lại: quyết định này thay phạm vi phí “shop bán nào cũng trả” trong các đoạn trước; cập nhật FEE-02, T-33, phạm vi/quyền/luồng/số dư. Cần chốt nạp và điều kiện hiện lại, cùng trường hợp nhiều lượt chờ QR được tạo trước khi số dư chạm ngưỡng; chưa sửa code.

### 2026-11-19 — Mốc thu phí theo web và giao dịch lấy hàng 12 giờ

- Bối cảnh: chủ dự án làm rõ phí 50.000đ chỉ thu khi reseller bán máy resell; reseller bán máy tự sở hữu không chịu phí. Mốc phí khác nhau giữa khách mua qua website và reseller/CTV request lấy máy nguồn để giao dịch bên ngoài.
- Quyết định: với máy nguồn A bán trên web reseller B, COD trừ số dư B khi cọc được xác nhận hợp lệ và đơn COD được tạo; giao thất bại hoàn khoản phí đã trừ một lần. Chủ dự án xác nhận đơn trả đủ một lần cũng chịu phí 50.000đ, trừ từ B khi thanh toán đủ được xác nhận và máy chuyển Đã mua. Với reseller B hoặc CTV thuộc B request/giữ máy nguồn A tối đa 12 giờ, chỉ trừ số dư B khi A xác nhận giao dịch thành công trong hạn, không trừ khi request hay bắt đầu giữ. Shop bán máy tự sở hữu không chịu phí trong mọi luồng này. Mỗi giao dịch chỉ thu một lần.
- Lý do: phí gắn việc B bán máy nguồn; web COD đã chốt khách cọc trước khi tạo đơn, còn giao dịch lấy hàng ngoài web phải đợi nguồn xác nhận chốt.
- Hệ quả / khi nào xem lại: quyết định này thay phạm vi “chỉ COD reseller” của mục ngay trước. Đồng bộ FEE-02, T-33, luồng web/giữ, quyền, API và số dư. Hạn mức `−100.000đ`, ẩn sản phẩm resell/chặn đơn web mới và quyền xử lý giao dịch đã mở vẫn giữ. Cần chốt nạp/hiện lại và xử lý nhiều giao dịch đã mở cùng cần trừ phí khi gần hạn mức; chưa sửa code.

### 2026-11-19 — QR COD đã phát vẫn tạo đơn khi phí vượt ngưỡng âm

- Bối cảnh: nhiều QR COD reseller có thể được phát khi B chưa chạm ngưỡng; khách chuyển cọc hợp lệ cho lượt sau khi một lượt khác đã đưa số dư B tới `−100.000đ`.
- Quyết định: `−100.000đ` là ngưỡng tạm ẩn sản phẩm resell/chặn đơn web mới, không phải sàn cứng của số dư cho QR đã phát. Với QR COD reseller phát trước khi ngưỡng chặn có hiệu lực, cọc được xác nhận hợp lệ trước hạn vẫn tạo đơn/trừ phí 50.000đ và xử lý COD bình thường, kể cả số dư B xuống `−150.000đ` hoặc thấp hơn. Không hủy giao dịch đã cọc vì thiếu số dư; COD thất bại vẫn hoàn phí đã trừ theo quy tắc trước.
- Lý do: khách đã được cấp QR và chuyển cọc; giữ giao dịch hợp lệ, đồng thời ngăn B mở đơn web resell mới sau khi chạm ngưỡng.
- Hệ quả / khi nào xem lại: thay phát biểu “không thấp hơn `−100.000đ`” trong tài liệu trước bằng ngưỡng chặn kèm ngoại lệ QR đã phát. Đồng bộ FEE-02, workflow, dữ liệu/API, giao diện, quyền và T-33. Cần chốt nạp/hiện lại, giao dịch đã mở khác gần ngưỡng và chi tiết ghi sổ; chưa sửa code.

### 2026-11-19 — Chỉ hiện lại sản phẩm resell khi số dư hết âm

- Bối cảnh: sau khi sản phẩm resell bị tạm ẩn vì số dư phí chợ chạm ngưỡng, cần xác định khi nào mở lại sau khi shop nạp tiền hoặc được hoàn phí.
- Quyết định: sản phẩm resell tự hết lý do ẩn vì nợ phí khi số dư reseller đã được xác nhận từ `0đ` trở lên. Mức `−50.000đ` vẫn là còn nợ và chưa hiện lại. Chỉ tin vẫn còn hàng, còn hạn, quan hệ nguồn hợp lệ và không bị ẩn vì lý do khác mới thực sự xuất hiện/nhận đơn web mới; không tự bật lại tin shop chủ động ẩn hoặc cần treo lại sau đổi giá nguồn.
- Lý do: shop phải thanh toán hết phần phí chợ còn nợ trước khi tiếp tục bán hàng resell; tách lý do ẩn vì nợ phí khỏi vòng đời từng tin.
- Hệ quả / khi nào xem lại: cập nhật FEE-02, workflow, UI, quyền, dữ liệu/API, T-33 và danh sách quyết định mở. Cách xác nhận khoản nạp tiền và các giao dịch đã mở khác gần ngưỡng vẫn cần chốt; chưa sửa code.

### 2026-11-19 — Nạp số dư chợ bằng QR và webhook ngân hàng

- Bối cảnh: cần cách xác nhận shop đã nạp tiền vào số dư phí chợ trước khi cho sản phẩm resell hiện lại.
- Quyết định: shop tạo lượt nạp với QR và mã tham chiếu riêng để chuyển tiền vào tài khoản nhận của nền tảng. Chỉ webhook giao dịch từ ngân hàng/bên kết nối đã được server xác thực và đối chiếu đúng lượt nạp, shop, tài khoản nhận, số tiền mới cộng số dư một lần và ghi lịch sử. QR, ảnh chuyển khoản hoặc nút shop bấm không tự xác nhận nạp. Số dư đạt từ `0đ` sau khoản nạp hợp lệ thì tự bỏ lý do ẩn vì nợ phí; vẫn kiểm tra các điều kiện hiển thị khác. Khoản nạp chợ tách khỏi cọc COD của khách chuyển tới shop bán.
- Lý do: xác nhận bằng giao dịch tiền thực nhận, tránh cộng lặp và công khai sản phẩm khi shop còn nợ phí.
- Hệ quả / khi nào xem lại: thêm WAL-01/T-35, đồng bộ workflow, UI, quyền, dữ liệu/API, kiến trúc và vận hành. Cần chọn ngân hàng/bên kết nối, hợp đồng webhook, cách xử lý giao dịch không khớp/thất lạc và quy tắc số tiền nạp; chưa sửa code.

### 2026-11-19 — Admin cộng khoản nạp thiếu mã hoặc sai số tiền

- Bối cảnh: chuyển khoản nạp chợ có thể thiếu mã tham chiếu hoặc khác số tiền của lượt nạp nên webhook không tự xác định đúng shop để cộng.
- Quyết định: shop nhắn riêng admin; admin kiểm tra giao dịch tiền thực nhận vào tài khoản nền tảng, xác định đúng shop và cộng số dư thủ công cho shop đó. Lưu giao dịch gốc, số tiền, admin, thời điểm và lý do; cùng giao dịch không được cộng thêm bằng webhook đến sau hoặc thao tác admin khác. Tin nhắn/ảnh chỉ là thông tin để tìm giao dịch, không tự xác nhận tiền. Số dư đạt từ `0đ` thì gỡ lý do ẩn vì nợ phí theo quy tắc trước; không tự mở tin bị ẩn vì lý do khác.
- Lý do: tiền đã vào nhưng tự động đối chiếu không khớp; admin giải quyết đúng khoản thực nhận và tránh cộng trùng.
- Hệ quả / khi nào xem lại: cập nhật WAL-01, T-36, luồng, quyền, dữ liệu/API, giao diện và runbook. Liên hệ riêng không bắt buộc xây tính năng nhắn tin admin. Cần chọn ngân hàng/bên kết nối, cách đối chiếu giao dịch thiếu webhook và quy tắc số tiền nạp; chưa sửa code.

### 2026-11-19 — Đơn web đã mở vẫn xử lý sau khi chạm ngưỡng phí

- Bối cảnh: đơn trả đủ có thể được tạo trước khi reseller B chạm số dư `−100.000đ`, nhưng khách thanh toán sau đó; trước đây chỉ ghi ngoại lệ rõ cho QR COD đã phát.
- Quyết định: ngay khi số dư B chạm `−100.000đ` hoặc thấp hơn, sản phẩm resell tạm ẩn và chặn đơn web mới. Đơn trả đủ đã tạo và QR COD đã phát trước thời điểm chặn vẫn xử lý nếu tiền trả đủ/cọc được xác nhận hợp lệ trước hạn; tiếp tục chuyển trạng thái và trừ phí 50.000đ dù số dư xuống dưới ngưỡng. COD thất bại vẫn hoàn khoản phí đã trừ. Sau khi giao dịch cũ cuối cùng kết thúc, sản phẩm resell vẫn ẩn khi số dư còn âm; chỉ tự gỡ lý do ẩn vì nợ phí khi số dư đã xác nhận từ `0đ`.
- Lý do: bảo vệ giao dịch khách đã bắt đầu và đã chuyển tiền, đồng thời ngăn phát sinh giao dịch web mới khi shop nợ phí đến ngưỡng.
- Hệ quả / khi nào xem lại: mở rộng ngoại lệ QR đã phát sang đơn trả đủ đã tạo; đồng bộ FEE-02, workflow, quyền, dữ liệu/API, T-33 và danh sách quyết định mở. Lượt giữ trực tiếp 12 giờ đã mở khi chạm ngưỡng còn cần chốt riêng; chưa sửa code.

### 2026-11-19 — Request lấy máy đã gửi vẫn tiếp tục sau ngưỡng phí

- Bối cảnh: reseller/CTV có thể đã gửi request lấy máy nguồn trước khi số dư reseller chạm `−100.000đ`, nhưng nguồn chưa duyệt hoặc lượt giữ 12 giờ đang diễn ra.
- Quyết định: ngay khi chạm ngưỡng, ẩn sản phẩm resell và chặn đơn web/request lấy máy resell mới. Request đã gửi trước ngưỡng vẫn được nguồn duyệt sau đó; nếu nguồn đồng ý, lượt giữ 12 giờ bắt đầu như thường. Nguồn xác nhận giao dịch thành công trong hạn thì trừ 50.000đ của reseller, kể cả khi số dư xuống thấp hơn `−100.000đ`. Request bị từ chối, hủy hoặc lượt giữ hết hạn không phát sinh phí. Đơn trả đủ đã tạo và QR COD đã phát trước ngưỡng cũng tiếp tục theo hạn riêng. Sau các giao dịch cũ, sản phẩm resell vẫn ẩn cho tới khi số dư được xác nhận đạt từ `0đ` trở lên; máy shop tự sở hữu không chịu quy tắc ẩn vì nợ phí resell.
- Lý do: ngưỡng chặn phát sinh giao dịch mới, còn giao dịch đã bắt đầu được xử lý hết theo quy tắc và thời hạn của nó.
- Hệ quả / khi nào xem lại: đồng bộ FEE-02, workflow, quyền, dữ liệu/API, T-33 và danh sách quyết định mở. Cần chốt chi tiết đối soát số dư; chưa sửa code.

### 2026-11-19 — Cọc COD reseller phải nhỏ hơn phần lời

- Bối cảnh: chủ dự án xem lại trường hợp B nhận cọc nhiều hơn phần lời khi bán máy nguồn A; điều đó khiến B phải chuyển bù A để A nhận đủ giá nguồn.
- Quyết định: với máy A trên web B, mức cọc áp dụng D phải dương, không vượt mức B cấu hình hoặc 10% giá bán P, và **nhỏ hơn** phần lời trước phí `P − S` (S là giá nguồn). Kiểm tra `0 < D <= min(D_config_B, 10% × P)` và `D < P − S` khi tạo lượt chờ cọc COD. Nếu không đạt, máy đó không có COD cho đến khi B điều chỉnh giá bán hoặc cấu hình cọc; vẫn có thể dùng luồng trả đủ nếu đủ điều kiện. Khi `P = S` không thể có cọc dương hợp lệ nên không có COD resell. Máy shop tự sở hữu không áp trần theo phần lời reseller. Với COD resell hợp lệ, sau giao thành công A nhận `P − D`, giữ S và chuyển B phần còn lại `P − S − D > 0`; phương thức/ghi nhận chuyển tiền vẫn cần chốt.
- Lý do: bảo đảm cọc B đã nhận luôn nhỏ hơn phần lời trên đúng máy đó và A nhận đủ giá nguồn từ COD mà không cần B bù thêm.
- Hệ quả / khi nào xem lại: quyết định này thay mục “COD vẫn khả dụng khi P = S và bỏ trần cọc theo phần lời” ngày 2026-11-19 ở phía trên. Đồng bộ SPEC, PLAN, WEB-03, workflow, màn hình, dữ liệu/API, T-21 và quyết định mở. Chưa sửa code.

### 2026-11-19 — Phần lời dùng để giới hạn cọc không trừ phí chợ

- Bối cảnh: cần xác định khoản phí chợ 50.000đ có làm giảm phần lời dùng để kiểm tra cọc COD của máy resell hay không.
- Quyết định: phần lời là khoản shop reseller B tự kê trên đúng máy, bằng giá B bán cho khách `P` trừ giá nguồn A `S`. Giới hạn cọc kiểm tra `D < P − S` trước phí chợ; không trừ 50.000đ khỏi `P − S`. Phí chợ là nghĩa vụ riêng từ số dư B theo mốc thu phí đã chốt, không nằm trong giá nguồn, cọc khách hay khoản A chuyển B `P − S − D`.
- Lý do: phí chợ và phần chênh lệch giá B tự kê là hai khoản độc lập.
- Hệ quả / khi nào xem lại: làm rõ SPEC, PLAN, WEB-03, workflow, dữ liệu/API, T-21 và quy tắc nền tảng. Không thay đổi trần 10% hoặc điều kiện cọc nhỏ hơn phần lời; chưa sửa code.

### 2026-11-19 — Nguồn xác nhận đã chuyển khoản đối soát COD

- Bối cảnh: COD reseller giao thành công thì A nhận `P − D` tiền COD, giữ giá nguồn S và còn phải chuyển B `P − S − D > 0`. Cần xác định website ghi nhận việc chuyển khoản này ra sao.
- Quyết định: website hiển thị số tiền A cần chuyển B. A chuyển tiền cho B ngoài website, sau đó chủ shop nguồn A bấm “Đã chuyển” trên đơn; trạng thái đối soát của đơn được coi là hoàn tất ngay, không yêu cầu B bấm xác nhận. Chỉ áp dụng cho COD reseller đã giao thành công, tách khỏi trạng thái Đã mua/sold và giao hàng. Ghi người thao tác và thời điểm, chống thao tác lặp. Nút bấm ghi nhận lời xác nhận của A, không phải xác thực giao dịch ngân hàng và không làm thay đổi số dư phí chợ.
- Lý do: hai shop tự chuyển tiền theo khoản hệ thống tính; website lưu mốc A báo đã chuyển để theo dõi đơn mà không quản lý tiền A/B.
- Hệ quả / khi nào xem lại: đồng bộ WEB-03/04, workflow, màn hình, quyền, dữ liệu/API, T-37 và quyết định mở. Thời hạn/chứng từ chuyển tiền còn cần chốt; chưa sửa code.

### 2026-11-19 — Không có hạn chuyển khoản đối soát COD

- Bối cảnh: sau COD reseller giao thành công, A cần chuyển B khoản `P − S − D` ngoài website rồi bấm “Đã chuyển”; cần xác định có deadline cho thao tác/chuyển tiền này không.
- Quyết định: không đặt thời hạn cố định cho A chuyển tiền đối soát B. Trạng thái chờ A bấm “Đã chuyển” không tự hết hạn, không tự hoàn tất hoặc hủy theo thời gian. Khi A thực sự chuyển xong, A bấm nút theo quy tắc đã chốt; trạng thái giao hàng và Đã mua/sold không phụ thuộc vào mốc chuyển tiền này.
- Lý do: chủ dự án không muốn áp thời hạn chuyển tiền A/B.
- Hệ quả / khi nào xem lại: bỏ câu hỏi deadline đối soát COD khỏi SPEC, WEB-03/04, workflow, màn hình, dữ liệu/API, T-37 và quyết định mở. Yêu cầu chứng từ chuyển tiền còn có thể cần chốt; chưa sửa code.

### 2026-11-19 — Nút Đã chuyển COD không yêu cầu ảnh biên lai

- Bối cảnh: cần xác định A có phải tải chứng từ chuyển tiền khi xác nhận đối soát COD cho B hay không.
- Quyết định: A chuyển tiền ngoài website rồi chỉ bấm “Đã chuyển” trên đơn; không yêu cầu ảnh biên lai hoặc chứng từ đính kèm. Website lưu người bấm và thời điểm như đã chốt. Thao tác không xác minh tiền ngân hàng đã vào B.
- Lý do: chủ dự án chọn thao tác xác nhận đơn giản, không đưa ảnh biên lai vào luồng đối soát.
- Hệ quả / khi nào xem lại: bỏ câu hỏi chứng từ đối soát COD khỏi SPEC, WEB-03/04, workflow, màn hình, quyền, dữ liệu/API, T-37 và quyết định mở. Quy tắc chứng từ cho nghiệp vụ khác vẫn xét riêng; chưa sửa code.

### 2026-11-19 — Shop nguồn chịu phí gửi COD

- Bối cảnh: với máy nguồn A bán trên web reseller B, A là bên gửi COD và nhận tiền thu hộ còn lại; cần xác định ai chịu chi phí COD/ship.
- Quyết định: A chịu phí COD/ship của lượt gửi do A thực hiện. Khoản này tách khỏi giá máy P, cọc D B nhận, phí chợ 50.000đ của B và số A còn phải chuyển B `P − S − D`; không khấu trừ phí COD/ship vào phần B nhận. Số COD danh nghĩa cho giá máy vẫn là `P − D`. Phí hoàn hàng do giao thất bại chưa được xác định bởi quyết định này.
- Lý do: A là bên gửi hàng và làm việc với đơn vị vận chuyển cho lượt COD.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, WEB-03/04, workflow, giao diện, dữ liệu/API, T-21 và quyết định mở. Cần chốt riêng phí hoàn hàng nếu COD thất bại; chưa sửa code.

### 2026-11-19 — Phí vận chuyển/hoàn COD là quy định ngoài website

- Bối cảnh: chủ dự án làm rõ A là người đóng và gửi hàng COD; phí hãng vận chuyển, kể cả khi hoàn hàng, là trách nhiệm mặc định của A và không cần thành luồng phần mềm.
- Quyết định: ghi quy định chợ rằng shop nguồn A chịu phí vận chuyển/hoàn COD với đơn vị vận chuyển vì A là bên gửi. A tự xử lý khoản phí ngoài website. Website không tính, thu, lưu khoản phí hoặc yêu cầu xác nhận thanh toán phí; khoản phí không đi vào công thức giá máy/cọc/đối soát A-B hay phí chợ 50.000đ.
- Lý do: đây là chi phí giữa shop gửi hàng và đơn vị vận chuyển, không phải giao dịch tiền nền tảng cần quản lý.
- Hệ quả / khi nào xem lại: quyết định này làm rõ mục ngay trước và bỏ phí hoàn hàng COD thất bại khỏi danh sách câu hỏi cần chốt/triển khai. Quy tắc đặt tại docs/11_rules.md; tài liệu yêu cầu chỉ ghi ranh giới ngoài website. Chưa sửa code.

### 2026-11-19 — Giá tiền trả đủ đến muộn do khách và shop thỏa thuận

- Bối cảnh: đơn trả đủ quá 15 phút đã hết quyền giữ máy nhưng khách chuyển tiền sau hạn; giá niêm yết hoặc giá nguồn có thể đã thay đổi.
- Quyết định: trường hợp hiếm này khách nhắn riêng shop bán để đối chiếu tiền và thỏa thuận giá/cách xử lý. Website không tự chọn giá cũ của đơn hay giá hiện tại, không tự phục hồi quyền giữ máy hoặc ghi Đã mua. Sau thỏa thuận, shop chỉ được xác nhận bán thủ công nếu đúng máy còn bán được và khóa lại được; nếu máy đã thuộc giao dịch khác thì xử lý hoàn tiền theo quy tắc đã chốt.
- Lý do: giá và cách xử lý ngoại lệ do khách/shop trao đổi trực tiếp, không cần quy tắc tự động chọn một trong hai giá.
- Hệ quả / khi nào xem lại: bỏ câu hỏi “giá xác nhận tiền muộn” khỏi quyết định mở; đồng bộ SPEC, PLAN, WEB-01/02, workflow, data/API và T-20. Quy trình hoàn tiền trả đủ vẫn còn mở; chưa sửa code.

### 2026-11-19 — Shop và khách tự xử lý khoản trả đủ đến muộn

- Bối cảnh: khách chuyển đủ tiền sau khi đơn hết hạn 15 phút nhưng máy đã thuộc giao dịch khác; cần xác định website có quản lý hoàn tiền không. Người dùng làm rõ “không can thiệp” là chợ/website, còn shop nhận tiền tự trao đổi với khách.
- Quyết định: khách nhắn riêng shop đã nhận tiền; shop đó tự xử lý hoàn cho khách ngoài website. Chợ không can thiệp, không có nút “Đã hoàn tiền”, trạng thái hoàn tiền hoặc luồng chuyển tiền cho ngoại lệ này. Đơn cũ không tự Đã mua và không lấy lại máy đã thuộc giao dịch khác. Giữ vết tiền đến muộn để đối chiếu với shop, không mô hình hóa việc hoàn tiền.
- Lý do: đây là ngoại lệ hiếm và khoản tiền đã vào shop; hai bên xử lý trực tiếp.
- Hệ quả / khi nào xem lại: thay câu hỏi hoàn tiền trả đủ đến muộn trong mục trước; đồng bộ SPEC, PLAN, WEB-02, workflow, dữ liệu/API, T-20 và quyết định mở. Không sửa code.

### 2026-11-19 — Nguồn chọn một request giữ máy bất kỳ

- Bối cảnh: nhiều reseller/CTV có thể xin lấy cùng một máy nguồn để bán ngoài web; request chưa giữ máy, chỉ một lượt giữ 12 giờ được xác nhận.
- Quyết định: A được chọn một request đang chờ bất kỳ, không bắt buộc theo thứ tự gửi. Khi A xác nhận request đã chọn, máy bắt đầu giữ 12 giờ cho request đó và mọi request khác đang chờ của cùng máy tự bị từ chối trong cùng transaction. Chỉ một xác nhận cạnh tranh thành công. Request đã bị từ chối không tự khôi phục nếu lượt giữ thắng bị hủy/hết hạn; shop muốn lấy tiếp phải gửi request mới khi máy còn bán được và quan hệ nguồn còn hợp lệ.
- Lý do: A chủ động chọn bên giao dịch, trong khi một máy vật lý không thể được giữ đồng thời cho nhiều shop; kết thúc hold không làm sống lại ý định cũ.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, HOLD-02, workflow, giao diện, quyền, data/API, T-08 và DEC-08. Chưa sửa code.

### 2026-11-19 — Chủ shop B được rút request trước khi A xác nhận

- Bối cảnh: reseller B đã gửi request xin giữ máy nhưng shop nguồn A chưa đồng ý; cần quyền rút lại ý định lấy máy.
- Quyết định: chủ shop B được rút request thuộc B khi còn `requested`. Request chuyển `cancelled`, không giữ máy, không thu phí và không được xác nhận lại. Nếu A confirm và B rút cạnh tranh, chỉ một thao tác thắng theo trạng thái đã commit: B rút trước thì A không confirm được; A confirm trước thì B không dùng quyền rút request để hủy lượt giữ 12 giờ. Quyền hủy hold sau confirm để chốt riêng. Không tự cấp quyền rút cho CTV chỉ vì CTV tạo request dưới shop B.
- Lý do: B chủ động rút ý định trước khi nguồn chấp nhận mà không làm đảo ngược một lượt giữ đã có hiệu lực.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, HOLD-01, workflow, UI, quyền, data/API, T-09 và DEC-08. Chưa sửa code.

### 2026-11-19 — Chủ shop B được hủy hold đã xác nhận trước khi A chốt

- Bối cảnh: sau khi A xác nhận request, máy được giữ 12 giờ cho B; B có thể không còn nhu cầu lấy máy trước khi A xác nhận giao dịch thành công.
- Quyết định: chủ shop B được hủy hold confirmed còn hiệu lực trước khi A complete. Hủy kết thúc quyền giữ, báo A, không trừ phí chợ 50.000đ. Máy chỉ trở lại available nếu chưa sold/không thuộc giao dịch khác; tin hidden/expired không tự hiện, request thua trước đó không phục hồi. Hold đã completed/expired không hủy được; cancel và complete/expire cạnh tranh chỉ một trạng thái thắng. Quyền rút request trước confirm vẫn là thao tác khác.
- Lý do: B có thể giải phóng máy sớm cho nguồn và người mua khác, trong khi giao dịch đã chốt hoặc hết hạn không bị đảo trạng thái.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, HOLD-03, workflow, UI, quyền, data/API, T-09 và DEC-08. Lý do hủy của B và chứng cứ chốt vẫn cần xác định; chưa sửa code.

### 2026-11-19 — Lý do hủy hold của A/B là tùy chọn

- Bối cảnh: A và B đều được chủ động hủy lượt giữ 12 giờ đã xác nhận trước khi giao dịch hoàn tất; cần xác định có bắt buộc nhập lý do không.
- Quyết định: giao diện A/B có ô nhập lý do hủy hold nhưng được để trống. Bên còn lại vẫn nhận thông báo hủy; chỉ hiển thị lý do nếu người hủy đã nhập. Hệ thống tự hết hạn sau 12 giờ ghi trạng thái hết hạn, không yêu cầu shop nhập lý do.
- Lý do: hai shop có thể giải phóng máy nhanh mà vẫn có chỗ ghi ngữ cảnh khi cần.
- Hệ quả / khi nào xem lại: bỏ câu hỏi lý do hủy hold bắt buộc khỏi DEC-08; đồng bộ SPEC, PLAN, HOLD-03, workflow, UI, quyền, dữ liệu/API, T-09. Lý do khi A từ chối riêng request vẫn là câu hỏi khác; chưa sửa code.

### 2026-11-19 — Nguồn được từ chối riêng request đang chờ

- Bối cảnh: ngoài việc request tự bị từ chối khi A xác nhận một shop khác, A cần xử lý riêng request của một shop khi chưa chọn bên giữ máy.
- Quyết định: A được từ chối một request còn `requested`, lý do tùy chọn; thông báo shop gửi request và chỉ hiển thị lý do nếu A đã nhập. Không giữ máy, không thu phí hoặc đổi trạng thái request khác của cùng máy. Request đã rejected không được xác nhận lại. Reject/withdraw/confirm cạnh tranh trên cùng request chỉ một kết quả thắng.
- Lý do: A có thể xử lý từng yêu cầu mà không buộc nhận một yêu cầu khác hoặc khóa máy.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, HOLD-01, workflow, UI, quyền, data/API, T-38 và DEC-08. Bằng chứng khi A xác nhận chốt bán vẫn cần chốt; chưa sửa code.

### 2026-11-19 — A chốt hold thành công không cần chứng từ

- Bối cảnh: trong 12 giờ giữ máy cho reseller/CTV giao dịch ngoài web, chỉ shop nguồn A có quyền xác nhận giao dịch thành công; cần xác định có bắt tải bằng chứng không.
- Quyết định: A bấm “Giao dịch thành công” trên hold còn hiệu lực, không phải tải ảnh, biên lai hoặc chứng từ. Hệ thống ghi A, thời điểm, máy/hold và lịch sử trạng thái; trong cùng transaction chuyển hold completed, máy sold và trừ phí chợ 50.000đ của B một lần. Chat hoặc lời khai của B/CTV không tự hoàn tất hold.
- Lý do: A là chủ máy và bên xác nhận giao dịch; giữ luồng thao tác đơn giản, đồng thời lưu audit để truy lại.
- Hệ quả / khi nào xem lại: bỏ câu hỏi bằng chứng chốt khỏi DEC-08; đồng bộ SPEC, PLAN, HOLD-04, workflow, UI, quyền, data/API và T-27. Mốc đúng 12 giờ và trường hợp bấm muộn vẫn cần chốt; chưa sửa code.

### 2026-11-19 — Quên chốt trong 12 giờ thì tin hiện bán lại

- Bối cảnh: A và B có thể đã giao dịch ngoài website nhưng A quên bấm hoàn tất lượt giữ trước hạn; nếu hết hạn, người khác có thể thấy và đặt máy.
- Quyết định: từ đúng mốc hết 12 giờ, hold expired và không complete muộn; tin hiện bán lại nếu vẫn đủ điều kiện. A có thể dùng thao tác Đánh dấu đã bán nếu máy chưa có giao dịch mới. Nếu khách đã đặt mua trước khi A đánh dấu bán, A tự liên hệ và xử lý với khách; hệ thống không cho đánh dấu bán ghi đè đơn/giữ máy của khách. Hold expired giữ nguyên lịch sử, không đổi thành completed.
- Lý do: A chịu trách nhiệm xác nhận bán máy đúng lúc; website không thể biết giao dịch bên ngoài đã xảy ra nếu A chưa bấm. Kiểm tra giao dịch mới trên hệ thống giúp tránh bán trùng.
- Hệ quả / khi nào xem lại: đồng bộ CAT-07/HOLD-04, workflow, UI, quyền, data/API, T-27, SPEC, PLAN và DEC-08. Còn cần chốt cách gắn lần đánh dấu bán muộn với B và thu phí chợ 50.000đ; chưa sửa code.

### 2026-11-19 — Dùng nút Đã bán thông thường, không thu phí B sau hạn

- Bối cảnh: sau khi hold hết 12 giờ, A có thể đã giao dịch ngoài website nhưng quên bấm xác nhận; cần quyết định có xây luồng bán muộn, liên kết B và thu phí hay không.
- Quyết định: A chỉ dùng nút Sản phẩm đã bán thông thường khi máy chưa có giao dịch mới. Không có chức năng bán muộn riêng; thao tác Đã bán không hoàn tất hold expired, không gắn B và không trừ phí chợ 50.000đ cho B. Nếu khách đã đặt mua khi tin hiện lại, A tự liên hệ và xử lý với khách; thao tác Đã bán không ghi đè giao dịch khách. Thêm nội quy chợ: nếu sự cố phát sinh từ giao dịch không có thông tin đơn trên chợ, reseller không được report shop nguồn về giao dịch đó qua chợ; không xây kiểm tra hay quy trình report riêng cho trường hợp này.
- Lý do: nền tảng chỉ tính phí theo các mốc giao dịch có xác nhận trong chợ; giao dịch ngoài chợ thiếu thông tin đơn để nền tảng xử lý khiếu nại.
- Hệ quả / khi nào xem lại: quyết định này thay phần còn mở về liên kết B/phí trong quyết định “Quên chốt trong 12 giờ thì tin hiện bán lại”. Đồng bộ SPEC, PLAN, docs nghiệp vụ và quy định; chưa sửa code.

### 2026-11-19 — Nguồn đặt hạn giữ riêng cho từng reseller

- Bối cảnh: hạn giữ cố định 12 giờ không phù hợp mọi cặp shop nguồn/reseller; chủ dự án muốn nguồn quyết định thời gian tối đa để reseller hoàn tất giao dịch.
- Quyết định: A cấu hình một số giờ nguyên riêng cho từng reseller B trong quan hệ hợp tác, tối thiểu 12 và tối đa 72 giờ, mặc định 12. CTV thuộc B dùng mức của B. Request còn chờ lấy mức lúc A xác nhận; khi confirm, lưu số giờ và `expires_at` vào hold. A thay đổi mức sau đó chỉ ảnh hưởng hold xác nhận mới, không kéo dài/rút ngắn hold đang chạy. Đúng `expires_at`, hold hết hiệu lực; phí, việc mở bán lại và nút Đã bán thông thường giữ quy tắc đã chốt. Đơn khách web không dùng mức này.
- Lý do: A biết khả năng giao dịch với từng B, còn snapshot thời hạn giữ lời hẹn của hold đã xác nhận và tránh thay đổi thời hạn ngoài ý muốn.
- Hệ quả / khi nào xem lại: quyết định này thay mốc 12 giờ cố định trong các quyết định cũ. Đồng bộ SPEC, PLAN, yêu cầu, workflow, màn hình, quyền, data/API, test, kiến trúc và nội quy; chưa triển khai code.

### 2026-11-19 — CTV gửi lại request khi giá đổi trước duyệt

- Bối cảnh: CTV đã tạo request ở giá CTV của máy, nhưng giá đổi trước khi chủ shop quản lý CTV đồng ý; request cũ không thể được duyệt ở giá đã hết hiệu lực.
- Quyết định: request cũ chuyển chờ CTV xác nhận lại và chặn chủ shop duyệt. CTV được báo giá mới; nếu tiếp tục thì nhập số tiền đề xuất cho request mới và bấm Gửi request lại. Chỉ lúc đó request mới mới được gửi/thông báo cho chủ shop quản lý CTV duyệt; nếu là hàng resell, chủ shop duyệt rồi mới request shop nguồn. Nếu CTV không gửi lại, từ đúng 12 giờ sau lúc giá đổi/báo, request cũ hết khỏi danh sách đang xử lý nhưng giữ lịch sử. Mốc này độc lập với hạn giữ máy do nguồn đặt cho reseller.
- Lý do: CTV phải biết giá mới và chủ động xác nhận số tiền trước khi chủ shop duyệt; request cũ không tự điều chỉnh giá hay tự chuyển tới shop nguồn.
- Hệ quả / khi nào xem lại: cập nhật SPEC, PLAN, CTV-05, workflow, UI, quyền, data/API, T-40 và quyết định mở. Chưa triển khai code; còn cần soạn chi tiết khi giá đổi nhiều lần trong 12 giờ.

### 2026-11-19 — Kết thúc CTV hủy request chưa duyệt

- Bối cảnh: chủ shop muốn ngừng hợp tác với CTV khi CTV còn request chờ chủ shop duyệt hoặc còn giao dịch đã được duyệt.
- Quyết định: chỉ chủ shop được kết thúc quan hệ CTV. Nếu chỉ có request chưa duyệt, gồm chờ CTV xác nhận lại giá, thao tác kết thúc hủy các request đó, giữ lịch sử và báo CTV; không cần chờ chúng hết hạn. Nếu đã có request/đơn được duyệt, request nguồn, hold hoặc đơn giao dịch đang mở gắn CTV, chủ shop phải xử lý xong bằng luồng hợp lệ trước; thao tác kết thúc bị chặn toàn bộ, không hủy request pending một phần. Sau kết thúc CTV mất quyền ở shop cũ và có thể tham gia shop khác.
- Lý do: request chưa duyệt chưa giữ máy hoặc tạo cam kết nguồn, còn giao dịch đã duyệt cần kết thúc nhất quán trước khi thu hồi membership.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, CTV-07, workflow, UI, quyền, data/API, T-41 và quyết định mở. Chưa sửa code; còn chi tiết lời mời, thông tin khách và quyền xem lịch sử sau rời shop.

### 2026-11-19 — Request CTV không nhập thông tin khách

- Bối cảnh: cần xác định CTV tạo request bán máy có phải nhập tên, số điện thoại hoặc địa chỉ khách trước khi chủ shop xét duyệt không.
- Quyết định: CTV chỉ chọn máy và nhập số tiền đề xuất trong request; không bắt nhập thông tin khách hoặc tự tạo đơn khách web. Shop reseller làm việc trực tiếp với CTV để lấy/xử lý thông tin khách khi cần. Quy tắc giá đổi, chủ shop duyệt rồi mới request nguồn cho hàng resell vẫn áp dụng.
- Lý do: request CTV là đề nghị giao dịch giữa CTV và chủ shop, còn việc trao đổi thông tin khách do hai bên tự xử lý.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, CTV-05/06, workflow, UI, quyền, data/API, T-42 và quyết định mở. Chưa sửa code; nếu sau đó có đơn khách website riêng thì dùng quy tắc của đơn web.

### 2026-11-19 — Mời CTV bằng Gmail, hạn 7 ngày

- Bối cảnh: cần xác định cách chủ shop mời CTV và khi nào tài khoản được quyền tham gia shop.
- Quyết định: chủ shop gửi lời mời đến Gmail của CTV, hiệu lực 7 ngày từ lúc gửi. Người nhận đăng nhập hoặc đăng ký bằng đúng Gmail đó và chủ động bấm Chấp nhận trước hạn mới thành CTV active. Có lời mời/mở link/đăng nhập chưa tự cấp quyền. Một CTV chỉ thuộc một shop active; lời mời hết hạn, đã dùng hoặc Gmail không khớp không được chấp nhận. Google hoặc Gmail/mật khẩu của cùng user đều dùng được khi email đã xác thực.
- Lý do: xác nhận đúng người nhận và sự đồng ý của CTV trước khi cấp quyền xem hàng/tạo request.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, CTV-01/02, workflow, UI, quyền, data/API, T-43 và quyết định mở. Chưa sửa code; cách hủy/gửi lại lời mời và quyền xem lịch sử sau rời shop còn cần chốt.

### 2026-11-19 — Chủ shop được hủy lời mời CTV chưa chấp nhận

- Bối cảnh: chủ shop có thể gửi nhầm Gmail hoặc không muốn lời mời đã gửi tiếp tục hiệu lực.
- Quyết định: chủ shop hủy được lời mời chưa accepted; lời mời chuyển cancelled và link/token cũ mất hiệu lực ngay, kể cả chưa hết 7 ngày. Hủy lời mời không vô hiệu tài khoản Gmail và không tước quyền CTV nếu lời mời đã được chấp nhận; trường hợp đã tham gia dùng luồng ngừng hợp tác CTV. Hủy không tự gửi lời mời khác.
- Lý do: chủ shop kiểm soát lời mời chưa tạo membership mà không tác động tài khoản hoặc giao dịch đã hình thành.
- Hệ quả / khi nào xem lại: đồng bộ SPEC, PLAN, CTV-01/02, workflow, UI, quyền, data/API, T-44 và quyết định mở. Chưa sửa code; nhiều lời mời pending tới cùng Gmail và quyền xem lịch sử sau rời shop còn cần chốt.

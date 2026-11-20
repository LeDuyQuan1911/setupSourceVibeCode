# Đặc tả yêu cầu bản chính thức

Cập nhật: 2026-11-19. Tài liệu này đặc tả sản phẩm để triển khai và vận hành thực tế, gồm chợ B2B, hợp tác lấy nguồn, website shop, CTV và đơn hàng. Không dùng phạm vi bản thử rút gọn để loại bỏ các module đã được chủ dự án yêu cầu.

**Đã chốt yêu cầu** khác với **đã có code** và **đã nghiệm thu vận hành**. Source hiện mới có nền tài khoản, phiên, hồ sơ shop, admin xét duyệt và WebSocket xác thực kết nối; chưa có catalog/chat/holds/sourcing/website/đơn hàng/CTV. Bảng bên dưới mô tả yêu cầu cần xây, không tuyên bố chức năng đã tồn tại.

Nguồn căn cứ: [SPEC](../SPEC.md), các quyết định được chủ dự án chốt trong hội thoại và [nhật ký quyết định](../contexte/decisions.md). Các câu hỏi còn mở phải được giải quyết ở module liên quan trước triển khai; không tự chọn đáp án để làm đủ tài liệu.

## Mục tiêu và vai trò

Kết nối shop có hàng secondhand với shop cần nguồn và khách mua trên website. Shop nguồn/reseller là vai trò theo từng quan hệ, không phải hai loại tài khoản; một shop có thể đồng thời làm cả hai. CTV thuộc một shop, khách lẻ mua trên website shop, admin là chủ nền tảng. Cấp quyền hợp tác theo một chiều, không đồng nghĩa mua hoặc giữ máy.

Phục vụ shop trên toàn Việt Nam. Category khởi chạy là Apple, nhóm hàng đã chốt là iPhone secondhand đủ các dòng; khi mở Tivi/Bàn phím hoặc nhóm khác không đổi ý nghĩa máy/tin cũ. Không tự mở iPad/MacBook/Apple Watch nếu chưa chốt.

## 1. Phạm vi sản phẩm chính thức

| Module | Trách nhiệm |
| --- | --- |
| Identity và shops | Tài khoản, đăng nhập/phiên, hồ sơ, dashboard shop chờ duyệt, nhận xét tham khảo và quyết định admin |
| Catalog và listings | Danh mục mở rộng từ đầu, từng đơn vị hàng, quy tắc đăng, tìm kiếm, giá, vòng đời tin và kho Đã bán |
| Sourcing và storefronts | Request hợp tác một chiều, chọn/treo hàng nguồn trên website shop, giá reseller, ngừng hợp tác |
| CTV | Tài khoản riêng theo lời mời, một shop tại một thời điểm, nguồn hàng/giá CTV, tạo đơn và shop xét duyệt |
| Giao dịch | Request giữ trực tiếp theo thời hạn đã chốt; đơn khách website thanh toán đủ hoặc COD; kiểm tra/khóa cùng tồn kho nguồn |
| Chat và notifications | Trao đổi tùy chọn, media có quyền, thông báo và đồng bộ trạng thái; không dùng chat để thay xác nhận nghiệp vụ |
| Admin và phí | Vận hành qua chủ shop, xét duyệt, quyền tối thiểu/audit; phí nền tảng theo tháng, chi tiết gói cần chốt |
| Nền vận hành | Bảo mật, tính toàn vẹn, worker, quan sát hệ thống, backup/restore, kiểm thử và phát hành |

Có thể triển khai theo thứ tự phụ thuộc, nhưng website, CTV và đơn online đều thuộc đặc tả bản chính thức, không bị loại khỏi phạm vi vì chưa có code. Chỉ kích hoạt category Apple lúc khởi chạy; phạm vi hàng đã chốt hiện là iPhone secondhand. Đây là giới hạn danh mục kinh doanh, không phải giới hạn chất lượng sản phẩm. Tên miền riêng có trong định hướng website, điều kiện cung cấp/định tuyến/chứng chỉ còn cần chốt trước triển khai.

## Từ điển

| Thuật ngữ | Nghĩa thống nhất |
| --- | --- |
| Máy | Một đơn vị iPhone thực tế, có tình trạng và giá riêng |
| Mẫu | Nhóm như iPhone 12; không đại diện cho một máy có thể giữ |
| Tin | Bản công bố một máy lên chợ, có vòng đời 90 ngày |
| Shop nguồn / reseller | Vai trò trong từng quan hệ, cùng một shop có thể đóng cả hai |
| Hỏi hàng | Trao đổi tùy chọn, không phải bước bắt buộc của hợp tác lấy nguồn và không tạo quyền giữ |
| Giữ trực tiếp | Shop nguồn dành máy cho reseller trong thời hạn của lượt giữ sau xác nhận |
| Gia hạn tin chợ | Shop nguồn gia hạn tin hết hạn trên chợ thành kỳ 90 ngày mới |
| Treo sản phẩm nguồn | Reseller chọn sản phẩm của shop nguồn đã cấp quyền để hiển thị trên website của reseller |
| Treo lại sản phẩm nguồn | Reseller đưa sản phẩm nguồn đã tạm ẩn trở lại website của mình, ví dụ sau khi chấp nhận giá nguồn mới |
| Đã bán | Trạng thái kết thúc của một đơn vị hàng; lưu trong mục Đã bán, không được mở bán lại; không phải bằng chứng thanh toán qua nền tảng |


## 2. Tài khoản và shop

| ID | Yêu cầu | Tiêu chí nghiệm thu | Hiện trạng |
| --- | --- | --- | --- |
| ACC-01 | Đăng ký Gmail và mật khẩu | Chỉ nhập Gmail, mật khẩu và nhập lại mật khẩu; mật khẩu dài 12–200 ký tự, nhập lại khớp; không bắt buộc kết hợp đủ hoa/thường/số/ký tự đặc biệt. Gửi link tới Gmail đã nhập, hiệu lực 10 phút kể từ lúc gửi; quá hạn không kích hoạt, cần yêu cầu gửi lại. Giữa hai lần gửi cho cùng tài khoản phải cách ít nhất 60 giây; tối đa 5 email xác minh trong mỗi khoảng 60 phút, tính cả lần gửi đầu. Đạt hạn mức thì chờ đến khi đủ điều kiện gửi tiếp, không thay đổi link hiện tại. Khi gửi lại, chỉ link mới nhất còn hiệu lực, các link cũ bị vô hiệu; link mới có hạn 10 phút từ lần gửi mới. Tài khoản chờ xác minh và chỉ kích hoạt khi xác minh thành công. Không tạo shop/pending hay yêu cầu năm trường hồ sơ | Code hiện tại còn gộp hồ sơ, cần sửa |
| ACC-02 | Đăng nhập/đăng xuất | Google hoặc mật khẩu đã liên kết truy cập cùng user; đăng xuất làm phiên hiện tại hết hiệu lực | Mới có mật khẩu, chưa Google |
| ACC-03 | Tiếp tục bằng Google | Tạo/đăng nhập bằng tài khoản Gmail qua Google, không bắt tạo mật khẩu website; không tự tạo hồ sơ shop | Chưa có code |
| ACC-04 | Liên kết hai cách đăng nhập | Cùng Gmail không tự sinh user/shop thứ hai. Tài khoản mật khẩu có trước phải đăng nhập đúng mật khẩu để liên kết Google; sau đó cả hai cách dùng cùng user/shop/lịch sử. Google có trước thì thiết lập mật khẩu trong tài khoản, không đăng ký lại | Chưa có code |
| ACC-05 | Quên mật khẩu qua Gmail đã xác minh | Tài khoản đã có mật khẩu nhập Gmail đã xác minh để nhận link đặt lại; xác minh link hợp lệ rồi nhập mật khẩu mới/nhập lại theo quy tắc ACC-01. Link reset hiệu lực 10 phút; gửi lại cách ít nhất 60 giây, tối đa 5 email reset/tài khoản/60 phút kể cả lần đầu; chỉ link reset mới nhất hiệu lực. Quota reset tính riêng email xác minh đăng ký. Khi đặt lại thành công, link dùng một lần mất hiệu lực ngay, thu hồi mọi phiên đăng nhập ứng dụng của user (kể cả phiên trên thiết bị hiện tại) và yêu cầu đăng nhập lại; không tự đăng nhập. Đổi mật khẩu của cùng user, không tạo tài khoản/shop mới hoặc tự cấp quyền | Chưa có code |
| SHOP-01 | Admin duyệt hồ sơ | Chỉ admin quyết định pending sang approved/rejected; từ chối cần lý do theo code hiện tại; lưu người và giờ quyết định | Có code nền |
| SHOP-02 | Chỉ shop được duyệt tham gia chợ | Pending/rejected không đăng hàng, hỏi hàng hoặc giữ máy; kiểm tra ở server | Chưa có route chợ |
| SHOP-03 | Shop cũ nhận xét shop mới | Shop approved gửi thông tin tham khảo; không có nhận xét vẫn có thể duyệt; admin quyết định cuối | Chưa có code; chờ mẫu |

| ID | Yêu cầu bổ sung đã chốt | Tiêu chí nghiệm thu | Hiện trạng |
| --- | --- | --- | --- |
| SHOP-04 | Dashboard shop chờ duyệt | Shop đã tham gia được tìm shop pending để gửi nhận xét; đánh giá dựa tên shop, người đại diện, số liên hệ, địa chỉ, kênh bán hàng; kênh bán hàng quan trọng nhất. Phạm vi trường công khai chi tiết cần duyệt | Chưa có code |
| SHOP-06 | Nộp hồ sơ sau đăng ký tài khoản | Tài khoản đã tạo mới nhập/gửi năm thông tin shop; nộp hợp lệ tạo hồ sơ pending và bắt đầu 30 ngày, không tính từ lúc đăng ký tài khoản | Code hiện tại gộp với đăng ký |
| SHOP-05 | Thời hạn xét duyệt 30 ngày | Tính từ lần nộp hồ sơ; quá 30 ngày chưa duyệt phải nộp lại, không tự approved. Trạng thái/lịch sử lần nộp và điều kiện biên cần thiết kế | Chưa có code |

Xét duyệt shop xác nhận quyền tham gia nền tảng, không phải kiểm định từng máy hoặc bảo đảm mọi giao dịch. Đăng ký tài khoản chưa tạo shop. Nộp hồ sơ riêng tạo pending; người nộp có thể đăng nhập theo dõi, chưa giao dịch. Nguồn/reseller đi qua cùng quy trình.

Shop cũ chỉ cung cấp thông tin tham khảo, không tự duyệt. Không cần đủ số nhận xét để admin ra quyết định. Cần chốt mẫu nhận xét, sửa/rút nhận xét, chống lạm dụng và quy trình nộp lại; không thêm giấy tờ bắt buộc nếu chưa được duyệt.

## 3. Danh mục, hàng hóa và tin

| ID | Yêu cầu | Tiêu chí nghiệm thu | Hiện trạng |
| --- | --- | --- | --- |
| CAT-00 | Danh mục trong DB từ đầu | Có cấu trúc categories và liên kết nhóm/mẫu/hàng; chỉ Apple được kích hoạt ở bản đầu; thêm Tivi/Bàn phím không hardcode lại hệ thống hay bắt điền thuộc tính iPhone | Đã chốt yêu cầu; chưa có code |
| CAT-01 | Tin cho từng máy iPhone | Không xuất bản thiếu trường bắt buộc; không gộp nhiều máy vào một tin để giữ | Chưa có code |
| CAT-02 | Shop sửa/ẩn/đánh dấu đã bán hàng của mình | Shop khác không đổi được; máy ẩn/đã bán không nhận yêu cầu mới | Chưa có code |
| CAT-03 | Tìm và lọc hàng | Tìm theo mẫu; bộ lọc cấu hình, tình trạng, giá, khu vực được duyệt trước khi xây; phân trang không lộ tin không được xem | Chưa có code |
| CAT-04 | Khoảng giá theo mẫu trong một shop | Min/max chỉ tính máy đang hiển thị và đủ điều kiện bán; chọn máy để thấy giá chính xác | Chưa có code |
| CAT-05 | Giá lấy hàng do shop nguồn đặt | Không có thao tác thương lượng giảm giá nguồn; chặn đổi giá niêm yết khi có hold confirmed còn hiệu lực; chỉ mở sửa sau hủy/hết hạn nếu máy chưa bán | Chưa có code |
| CAT-06 | Máy đã bán là trạng thái kết thúc | Bán xong vào mục Đã bán; chặn mở bán, xuất bản tin mới cho cùng item, gia hạn, giữ mới và treo/treo lại website; máy khác cùng mẫu có ID/tình trạng riêng | Đã chốt yêu cầu; chưa có code |
| CAT-07 | Đánh dấu bán ngoài | Xử lý hết giao dịch mở trước; cùng máy không bán cho bên khác khi hold còn hiệu lực. Nếu A quên xác nhận trong thời hạn của lượt giữ, hold hết hạn và tin hiện bán lại khi đủ điều kiện; A dùng nút Sản phẩm đã bán thông thường nếu chưa có giao dịch mới đang giữ máy. Nút này không hoàn tất hold cũ hoặc trừ phí B. Nếu khách đã đặt mua trong khoảng tin mở lại, A tự liên hệ và xử lý với khách; không tự ghi đè đơn/giữ máy của khách | Chưa có code |
| LIST-01 | Hiệu lực 90 ngày và gia hạn 3 ngày | Hết hạn ẩn và báo shop; gia hạn tin trong hạn tạo kỳ mới; quá hạn xóa tin theo chính sách bảo toàn lịch sử | Chờ chính sách xóa |
| LIST-02 | Tự xuất bản theo rule-based | Shop approved và dữ liệu hợp lệ không chờ duyệt từng tin; thiếu điều kiện bị chặn với lỗi theo trường; chưa tích hợp AI | Chưa có code |
| LIST-03 | Ẩn độc lập giao dịch hiện có | Chặn yêu cầu mới, hold/đơn đã xác nhận tiếp tục; không mất quyền xử lý giao dịch hoặc reset thời hạn | Chưa có code |
| LIST-04 | Hiện lại giữ hạn cũ | Không đổi expires_at; tin hết hạn dùng Gia hạn tin, máy sold bị chặn; hết hạn hold không tự hiện tin hidden | Chưa có code |

Tin kèm khu vực và trạng thái còn hàng của đơn vị thực tế. Trường bắt buộc của từng iPhone: mẫu, dung lượng lưu trữ, màu, ngoại hình, pin, lỗi/linh kiện đã thay, trạng thái iCloud, ảnh thật, phụ kiện, thời hạn bảo hành và giá nguồn. Không có lỗi/chưa thay/không phụ kiện/không bảo hành phải khai báo rõ; không thu mật khẩu iCloud. Pin/enum, số ảnh, giới hạn ảnh và tiêu chuẩn mô tả còn cần chốt; không tự biến ví dụ thành constraint.

Đăng tin tự động qua bộ quy tắc; AI hỗ trợ duyệt là định hướng bổ sung. Máy sold là trạng thái kết thúc, lưu mục Đã bán; không tái đăng/gia hạn/treo lại cùng máy. COD do nguồn xác nhận giao thất bại giải phóng máy chưa sold cho sàn; không tạo ngoại lệ đảo sold.

## 4. Hợp tác lấy nguồn và website shop

| ID | Yêu cầu | Tiêu chí nghiệm thu | Hiện trạng |
| --- | --- | --- | --- |
| SRC-01 | Hợp tác toàn reseller, không giới hạn riêng danh mục/sản phẩm | Không có công cụ nguồn ẩn từng sản phẩm trên một website reseller; reseller tự chọn hàng còn bán | Chưa có code |
| SRC-02 | Ngừng hợp tác sau khi hết đơn mở | Chặn ngừng khi còn request/hold/đơn giao/hoàn chưa xử lý; sau ngừng chặn mọi đơn mới theo quan hệ | Chưa có code |
| SRC-03 | Request hợp tác không cần hỏi hàng | Gửi trực tiếp tới nguồn; chấp nhận cấp quyền chọn/treo một chiều; không cần chat, không duyệt từng máy, không tạo hold hoặc tự treo toàn bộ hàng | Chưa có code |
| STORE-01 | Website của shop | Trưng bày hàng shop sở hữu và hàng nguồn được phép treo, có nhận diện shop và giá bán của shop; không lộ giá nguồn cho khách | Chưa có code |
| STORE-02 | Một nguồn tồn kho | Bản treo tham chiếu đúng máy nguồn; held/khóa đơn/hidden/sold chặn mua mới dù UI/cache chậm cập nhật | Chưa có code |
| STORE-03 | Giá reseller và treo lại | Nguồn đổi giá hợp lệ → tạm ẩn bản treo, báo reseller; từng reseller chủ động treo lại theo giá mới và quyền hợp tác còn hiệu lực | Chưa có code |

Không giới hạn danh mục/sản phẩm riêng cho từng reseller. Nguồn chỉ ngừng hợp tác toàn reseller sau khi xử lý hết request/hold/đơn giao/hoàn đang mở; không có quyền ẩn riêng một bản treo trên một website reseller. Máy ngừng bán theo trạng thái tồn kho là quy tắc hệ thống khác với ngừng hợp tác.

**Thời hạn giao dịch lấy máy:** shop nguồn A đặt một số giờ riêng cho từng quan hệ hợp tác với reseller B, từ **12 đến 72 giờ**, mặc định **12 giờ** khi chưa chỉnh. Khi A xác nhận request giữ một máy, hệ thống chụp số giờ đang áp dụng cho quan hệ A–B, lưu vào lượt giữ và tính `expires_at = confirmed_at + số giờ đã chụp`. CTV thuộc B dùng chính mức A đặt cho B. A thay đổi cấu hình chỉ ảnh hưởng lượt giữ xác nhận sau đó; request còn chờ dùng mức tại lúc A xác nhận, hold đang chạy không kéo dài/rút ngắn. Từ đúng `expires_at`, hold hết hiệu lực theo các quy tắc HOLD-03/04. Thời hạn này không áp dụng cho đơn khách mua trên web.

Giá bán reseller không thấp hơn giá nguồn. Mặc định treo lại giữ tiền lời cũ: giá bán mới = giá nguồn mới + (giá bán cũ − giá nguồn cũ). Nếu giá nguồn mới > giá bán cũ, mặc định giá bán mới = giá nguồn mới. Reseller có thể sửa trước treo lại theo giới hạn này; chưa có trần giá bán reseller được chốt.

### Ví dụ giá và khoảng giá

Một shop có nhiều máy cùng mẫu iPhone 12, mỗi máy có tình trạng/giá riêng; thẻ mẫu chỉ tính khoảng min–max của máy đang được phép bán. Máy ẩn/sold hoặc bản treo chờ chấp nhận giá mới không góp vào khoảng giá; giao dịch chọn đúng máy, không dùng giá khoảng.

Ví dụ nguồn cũ 10 triệu, reseller bán 12 triệu. Nguồn mới 11 triệu thì giá treo lại mặc định 13 triệu; nguồn mới 15 triệu vượt giá bán cũ thì mặc định 15 triệu. Từng reseller phải tự treo lại, không phụ thuộc quyết định của reseller khác.

## 5. Cộng tác viên

Các quy tắc dưới đã được chủ dự án chốt, chưa có code. CTV thuộc shop, admin làm việc với chủ shop; website không tính/trả hoa hồng CTV.

| ID | Yêu cầu | Tiêu chí nghiệm thu |
| --- | --- | --- |
| CTV-01 | Tài khoản riêng, shop mời bằng Gmail | Chủ shop nhập Gmail để gửi lời mời CTV, hiệu lực 7 ngày từ lúc gửi. Người được mời đăng nhập hoặc đăng ký bằng đúng Gmail đó rồi chủ động bấm Chấp nhận trước hạn mới có quyền CTV trong shop; mở link hoặc có tài khoản chưa tự tham gia. Chủ shop được hủy lời mời chưa được chấp nhận; lời mời hủy hết hiệu lực ngay, Gmail đó không thể dùng link/token cũ để tham gia. Có thể dùng phương thức Google hoặc Gmail/mật khẩu của cùng user đã xác thực, không tạo shop/hồ sơ nguồn cho CTV chỉ vì nhận lời mời |
| CTV-02 | Một shop đang hoạt động | Một CTV chỉ thuộc một shop tại một thời điểm; khi bấm Chấp nhận phải kiểm tra Gmail đúng lời mời, lời mời còn hạn/chưa dùng và user chưa có membership CTV active ở shop khác. Chấp nhận lời mời cạnh tranh chỉ tạo một membership active; hết 7 ngày không nhận được quyền từ lời mời cũ |
| CTV-03 | Xem nguồn hàng của shop | Xem toàn bộ hàng shop được phép bán, gồm sở hữu/resell, thông tin máy và giá CTV; không xem danh tính/liên hệ hoặc giá shop nguồn của hàng resell |
| CTV-04 | Giá CTV chung theo máy | Chủ shop đặt một mức cho mọi CTV trên từng máy; khi giá đầu vào thay đổi, tự cập nhật theo công thức treo lại, không bắt CTV nhấn treo lại |
| CTV-05 | Tạo request, chủ shop xét duyệt | CTV chọn máy và nhập số tiền đề xuất để tạo request chờ chủ shop duyệt, chưa giữ máy; không nhập tên, số điện thoại hoặc địa chỉ khách trong request. Shop reseller tự trao đổi với CTV để có thông tin khách cần cho giao dịch. Nếu giá CTV của máy đổi trước khi chủ shop đồng ý, request cũ chuyển sang chờ CTV xác nhận lại, không thể duyệt ở giá cũ; báo CTV giá mới và yêu cầu nhập số tiền cho request mới nếu muốn tiếp tục. Chỉ khi CTV bấm Gửi request lại mới tạo request mới và báo chủ shop quản lý CTV duyệt; request cũ không còn chờ chủ shop duyệt. Nếu CTV không làm gì, request cũ hết khỏi danh sách đang xử lý sau 12 giờ kể từ lúc giá đổi/thông báo, vẫn giữ lịch sử. Chủ shop duyệt phải kiểm tra lại giá/tồn kho; hàng resell lấy bên ngoài sau đó cần request riêng tới shop nguồn và nguồn đồng ý mới giữ theo thời hạn đã chốt |
| CTV-06 | Giá bán ngoài và hoa hồng ngoài hệ thống | CTV tự kê giá bên ngoài; trao đổi giá/giới thiệu khách trực tiếp với shop; không tự đổi giá website hoặc tạo khoản hoa hồng phải trả trong hệ thống |
| CTV-07 | Chủ shop ngừng hợp tác | Chỉ chủ shop được ngừng hợp tác với CTV. Khi ngừng, hủy các request CTV chưa được chủ shop duyệt, kể cả request đang chờ CTV xác nhận lại giá; báo CTV và giữ lịch sử. Nếu đã có request/đơn được duyệt hoặc giao dịch lấy nguồn/giữ máy đang xử lý, phải xử lý hoàn tất hoặc hủy hợp lệ các giao dịch đó trước khi kết thúc membership; không tự hủy hold/đơn đã duyệt. Sau khi membership kết thúc, CTV không tạo request mới hoặc xem nguồn hàng shop cũ theo quyền thành viên và có thể tham gia shop khác; lịch sử giữ theo quyền đã chốt |

Công thức giá CTV dùng giá chủ shop làm giá đầu vào và mức giá CTV làm giá bán: giữ phần chênh lệch cũ, ngoại lệ khi đầu vào mới vượt giá CTV cũ thì bằng đầu vào mới. Giá CTV trên web khác với giá CTV tự rao bên ngoài. Khi bản treo resell đang bị ẩn vì đổi giá/quyền không còn hiệu lực, không vì giá CTV đã cập nhật mà tự cho tạo đơn mới.

Giá CTV chung theo máy vẫn do chủ shop đặt/cập nhật theo CTV-04. Số tiền CTV nhập khi gửi lại là số tiền đề xuất cho request giao dịch của CTV, không tự sửa giá chung của máy hoặc tạo đơn khách trên web. Request cũ bị chặn duyệt ngay khi giá đổi; không giữ máy, không gửi request lấy hàng tới nguồn vì thao tác đổi giá. Mốc 12 giờ là thời gian CTV có thể gửi lại, tách khỏi thời hạn giữ máy 12–72 giờ bắt đầu sau khi shop nguồn xác nhận lấy hàng. Request mới tới chủ shop của CTV trước; nguồn chỉ nhận request lấy hàng sau khi chủ shop đó duyệt nếu là hàng resell.

Cần chốt định nghĩa chính xác giá đầu vào từng loại hàng, giá tối thiểu CTV, xử lý nhiều lời mời chưa chấp nhận tới cùng Gmail và quyền lịch sử sau rời shop. Hủy lời mời chưa chấp nhận không vô hiệu tài khoản Gmail hoặc membership đã được chấp nhận; muốn ngừng hợp tác với CTV đã tham gia thì dùng CTV-07. Không suy diễn giá đơn đã xác nhận tự thay đổi theo bảng giá. Request CTV không thu thập trường thông tin khách; nếu sau đó tạo đơn khách trên website thì áp dụng luồng đơn web riêng.

## 6. Giữ máy và đơn hàng

| ID | Yêu cầu | Tiêu chí nghiệm thu | Hiện trạng |
| --- | --- | --- | --- |
| HOLD-01 | Xin giữ trực tiếp và shop nguồn xác nhận | Request chưa giữ máy. Chủ shop B có thể rút request của B khi vẫn đang chờ A duyệt; request đã rút không còn được xác nhận, không tạo hold hoặc phí. Shop nguồn A có thể chủ động từ chối riêng một request đang chờ với lý do tùy chọn; báo shop gửi request, không giữ máy, không ảnh hưởng các request khác hoặc thu phí. Request đã từ chối không được xác nhận lại. Nếu A xác nhận trước, B không dùng quyền rút request để hủy hold đã bắt đầu; B dùng quyền hủy hold theo HOLD-03. Xác nhận thành công ghi máy, hai shop, giá chốt, giờ xác nhận và expires_at tính từ giờ xác nhận và số giờ của quan hệ A–B | Chưa có code |
| HOLD-02 | Một máy không bị giữ hiệu lực cho hai shop | Nhiều reseller/CTV có thể request cùng máy khi chưa có hold hiệu lực; request chưa giữ máy và A được chọn bất kỳ request nào, không bắt buộc theo thứ tự gửi. Khi A xác nhận một request, giữ máy theo thời hạn của quan hệ A–B đã chụp và tự từ chối mọi request khác đang chờ của đúng máy trong cùng transaction; hai xác nhận cạnh tranh chỉ một thành công, không phụ thuộc số tiến trình API. Request đã bị từ chối không tự mở lại; nếu hold hủy/hết hạn mà máy vẫn đủ điều kiện bán, shop khác gửi request mới | Chưa có code |
| HOLD-03 | Hủy/hết hạn giữ | A và B đều có ô lý do hủy hold nhưng được để trống; bên còn lại được báo và chỉ thấy lý do nếu có nhập. Chủ shop reseller B cũng được hủy hold đã confirmed khi còn trong thời hạn của lượt giữ và A chưa xác nhận bán thành công; A được báo, không thu phí 50.000đ. B không được hủy hold đã completed hoặc expired; hủy và A chốt thành công cạnh tranh chỉ một thao tác thắng. Hủy không phục hồi request khác đã bị từ chối; máy chỉ trở lại available nếu chưa sold, không thuộc đơn/hold khác và tin còn đủ điều kiện hiển thị mới xuất hiện trên chợ. Từ đúng expires_at không còn quyền giữ dù worker chạy chậm | Chưa có code |
| HOLD-04 | Hoàn tất giao dịch trực tiếp | Trước mốc expires_at, chỉ shop nguồn A bấm “Giao dịch thành công” trên đúng hold đã confirmed; không suy diễn từ chat hoặc yêu cầu tải ảnh/chứng từ. Hệ thống ghi actor, thời điểm, máy và chuyển hold completed/máy sold một lần; reseller B chịu phí chợ 50.000đ theo FEE-02. Từ đúng mốc expires_at, hold expired, không thể complete hold cũ; máy/tin mở bán lại nếu đủ điều kiện. A quên bấm thì dùng nút Sản phẩm đã bán thông thường nếu chưa phát sinh giao dịch mới, không trừ phí B; nếu khách đã đặt mua, A tự trao đổi và xử lý với khách, không tự ghi đè đơn mới. Không có chức năng hoàn tất bán muộn riêng | Đã chốt; chưa có code |
| WEB-01 | Khách web mua không cần nguồn duyệt đơn | Khi khách xác nhận mua trả đủ hoặc chọn COD, kiểm tra và khóa nguyên tử đúng một máy cụ thể, lưu giá khách cần trả vào đơn trả đủ hoặc lượt chờ cọc COD. Giá niêm yết đổi sau đó không tự sửa giá đã ghi; khóa máy chưa có nghĩa đã thanh toán hoặc bán máy. COD chỉ thành đơn sau khi cọc được xác nhận trong hạn. Một máy chỉ thuộc một giao dịch hiệu lực, không cần nguồn duyệt từng đơn | Chưa có code |
| WEB-02 | Thanh toán đủ xác nhận là Đã mua | Hạn thanh toán đơn trả đủ là 15 phút từ lúc tạo đơn theo giờ DB; trước hạn, xác nhận tiền hợp lệ mới chuyển Đã mua/sold, giao hàng theo dõi riêng. Tại hoặc sau hạn chưa xác nhận tiền thì giải phóng máy cho giao dịch mới. Nếu tiền đến sau hạn, khách liên hệ chủ shop bán; shop chỉ xác nhận thủ công khi kiểm tra tiền và máy còn bán được. Máy đã bán/thuộc giao dịch khác thì không xác nhận đơn cũ; khách nhắn riêng shop nhận tiền để shop xử lý hoàn ngoài website, không có nút/trạng thái hoàn tiền của chợ cho ngoại lệ này | Chưa có code |
| WEB-03 | COD tạo sau khi xác nhận cọc | Khi khách chọn COD, giữ đúng máy bằng lượt chờ cọc tối đa 15 phút theo giờ DB và hiển thị QR thanh toán riêng; chưa tạo đơn COD. Webhook giao dịch được xác thực và đối chiếu mã lượt chờ, tài khoản shop bán nhận tiền, số cọc, thời hạn và trạng thái máy; xác nhận hợp lệ trước hạn mới tạo đơn COD Chờ giao và tiếp tục khóa máy. Tại hoặc sau hạn chưa xác nhận cọc thì lượt chờ hết hiệu lực, giải phóng máy; cọc đến muộn không tự tạo đơn/giữ máy, khách và shop tự xử lý ngoài website. Với hàng A trên web B, cọc vào B theo mức cấu hình B nhưng không vượt 10% giá bán máy và phải nhỏ hơn phần lời B = giá B tự kê trừ giá nguồn A, không trừ phí chợ 50.000đ; nếu giá bán bằng giá nguồn hoặc mức cọc áp dụng không hợp lệ thì không tạo lượt COD. A gửi và nhận COD còn lại. Với đơn giao thành công, website hiển thị phần lời A còn chuyển B sau khi trừ cọc; A chuyển ngoài website rồi bấm “Đã chuyển” để hoàn tất trạng thái đối soát, không cần B xác nhận. Chỉ chuyển Đang vận chuyển khi A thực sự bàn giao; xác nhận cọc/tạo đơn COD chưa làm máy sold | Chưa có code |
| WEB-04 | COD thành công hoặc thất bại | Shop nguồn xác nhận thành công → Đã mua/sold. Với COD reseller giao thành công, website hiển thị khoản A còn chuyển B `P − S − D`; A chuyển ngoài website rồi chỉ A bấm “Đã chuyển” để hoàn tất trạng thái đối soát của đơn, không cần B xác nhận. Trạng thái này tách khỏi trạng thái giao hàng, không có deadline/tự hết hạn; nút bấm không chứng minh ngân hàng đã chuyển tiền và không yêu cầu ảnh biên lai/chứng từ. Shop nguồn tự quyết lúc nhấn Giao không thành công → đóng đơn thất bại, giải phóng đúng máy chưa sold để xuất hiện lại trên sàn nếu tin còn được hiển thị; giữ lịch sử đơn. Website không yêu cầu bằng chứng máy đã về tay, nhưng cảnh báo khuyên đợi hàng về tay rồi mới nhấn để tránh khách đặt mua khi máy chưa sẵn. Website không phân xử hay hoàn cọc: nguồn và reseller tự làm việc với nhau. Phí vận chuyển/hoàn COD do nguồn tự chịu ngoài website theo quy định chợ; hệ thống không tính hoặc theo dõi phí này | Chưa có code |

Giữ trực tiếp là request theo máy cho reseller/CTV lấy hàng bên ngoài; nguồn xác nhận mới bắt đầu thời hạn giữ theo quan hệ A–B, giá nguồn bị khóa, nguồn chốt thành công trong hạn thì sold. A chọn một request bất kỳ trong các request đang chờ của cùng máy; xác nhận một request tự từ chối các request còn lại. Đến đúng expires_at chưa chốt thì expired; worker trễ không kéo dài quyền giữ. Hết/hủy hold không tự khôi phục request cũ; shop có thể gửi request mới nếu máy còn bán được. Ẩn tin không hủy giữ/đơn đã xác nhận, không reset hạn. Khách web không qua bước nguồn duyệt từng đơn; khóa tồn kho online là cơ chế riêng, không bị worker hết hạn hold giải phóng.

| Đơn website | Kết quả và bất biến |
| --- | --- |
| Thanh toán đủ được xác nhận hợp lệ | Đã mua, máy sold; chưa đồng nghĩa đã giao tới khách |
| Lượt chờ cọc COD, chưa có đơn | Máy khóa tối đa 15 phút từ lúc khách chọn COD theo giờ DB; chưa được gửi, chưa sold; tại hoặc sau hạn chưa xác nhận cọc thì lượt chờ hết hiệu lực và giải phóng máy |
| Cọc COD được xác nhận trong hạn | Tạo đơn COD Chờ giao hàng; nguồn A mới được chuẩn bị gửi, máy vẫn khóa và chưa sold |
| Bàn giao vận chuyển | Đang vận chuyển; không tự ghi ngay khi khách vừa đặt |
| Chủ shop xác nhận COD thành công | Đã mua, máy sold |
| Shop nguồn nhấn Giao không thành công | Đóng đơn thất bại; giải phóng máy chưa sold để hiện lại trên sàn nếu tin còn active/đủ quyền hiển thị; giữ cùng ID và lịch sử đơn |

Nguồn/thanh toán web/worker phải tranh quyền trên cùng máy trong transaction DB; một máy không có hai giao dịch hiệu lực. Không cho payload client tự xác nhận đã trả tiền/cọc. Đơn trả đủ có hạn thanh toán 15 phút từ lúc tạo; lượt chờ cọc COD có hạn 15 phút từ lúc khách chọn COD, đều theo giờ DB. Tại hoặc sau hạn mà khoản tương ứng chưa được xác nhận, quyền giữ máy hết ngay dù worker chậm. Lượt chờ cọc quá hạn không tạo đơn COD và không tự chiếm lại máy. Đơn COD đã tạo sau xác nhận cọc đúng hạn không tự hết hạn khi đang giao. Tiền trả đủ đến muộn không tự ghi Đã mua: khách nhắn riêng shop bán để đối chiếu và thỏa thuận giá/cách xử lý; website không tự chọn giá cũ hay giá hiện tại. Sau thỏa thuận, shop chỉ xác nhận bán nếu máy vẫn còn bán được; nếu máy thuộc giao dịch khác thì shop nhận tiền tự xử lý hoàn cho khách sau khi liên hệ riêng; website không can thiệp hoặc lưu trạng thái “Đã hoàn” cho ngoại lệ này. Cọc COD đến muộn không làm lượt chờ hết hạn có hiệu lực lại; khách và shop xử lý khoản cọc ngoài website. Nếu các bên tiếp tục mua bán, website chỉ nhận giao dịch mới theo quy tắc tồn kho và giá tại thời điểm đặt; chưa chọn cổng thanh toán.

QR là hướng dẫn khách chuyển khoản, không phải bằng chứng tiền đã vào. Webhook từ bên cung cấp kết nối tài khoản nhận tiền của shop bán là đầu vào tự động để server đối chiếu và tạo đơn; webhook trùng, sai chữ ký/xác thực, sai mã, sai tài khoản hoặc sai số tiền không được tạo đơn. Nếu webhook đến sau khi lượt chờ đã hết hạn, kể cả giao dịch tiền xảy ra trước hạn, không tự tạo đơn COD, giữ lại máy hoặc trừ phí chợ; khách tự nhắn riêng shop bán để xử lý khoản cọc ngoài website. Cần chọn nhà cung cấp hỗ trợ tài khoản của nhiều shop và cách đối soát webhook thất lạc.

Giá khách cần trả được chụp từ giá bán đang hiển thị của đúng shop bán và đúng máy khi tạo đơn trả đủ hoặc lượt chờ cọc COD; khi cọc COD được xác nhận trong hạn, đơn COD dùng giá đã ghi của lượt chờ. Client không tự khai giá đã chốt. Mọi điều chỉnh giá niêm yết sau đó áp dụng cho lượt đặt mới, không sửa giá giao dịch đang giữ máy. Giá của khoản trả đủ đến muộn do khách và shop trao đổi riêng; website không tự quyết định giá cũ hay giá hiện tại. Cách xử lý giá nguồn giữa hai shop còn cần chốt.

Với máy nguồn A được reseller B bán trên website: ở đơn khách đã trả đủ, A và B trao đổi và thống nhất theo từng đơn ai giao máy trực tiếp cho khách; không áp một bên giao cố định cho mọi đơn. Với đơn COD, khách đặt cọc cho B trước khi A gửi; A nhận tiền thu hộ. Gọi giá bán máy B chốt với khách là `P`, giá nguồn của A cho B là `S`, mức cọc B cấu hình là `D_config` và cọc áp dụng là `D`: điều kiện là `0 < D <= min(D_config, 10% × P)` và `D < P − S`; phí chợ 50.000đ không trừ vào `P − S` khi kiểm tra cọc. Giá và cọc đều được chụp tại lúc tạo lượt chờ cọc. Không tạo lượt COD nếu điều kiện này không đạt; B có thể điều chỉnh giá bán hoặc cấu hình cọc trước khi khách đặt. Riêng máy B tự sở hữu không áp điều kiện phần lời `P − S`. Tiền COD còn lại `P − D` về A. Với COD reseller hợp lệ, `P − S − D > 0`, là phần A còn chuyển B sau khi giao thành công. Ví dụ `P = 12 triệu`, `S = 10 triệu`, `D = 1 triệu`: A nhận COD `11 triệu`, giữ `10 triệu` giá nguồn và chuyển B `1 triệu`; B đã nhận `1 triệu` cọc, tổng phần lời B là `2 triệu`. Nếu `P = S` hoặc `D >= P − S`, không có lượt COD cho máy đó. A chuyển tiền đối soát cho B ngoài website; sau khi chuyển, chỉ A được bấm “Đã chuyển” trên đơn để hoàn tất trạng thái đối soát. B không cần xác nhận trên web; thao tác này ghi nhận lời xác nhận của A, không phải bằng chứng ngân hàng đã chuyển tiền. Không đặt hạn chuyển cố định; trạng thái đối soát chờ A xác nhận không tự hết hạn. Không yêu cầu tải ảnh biên lai/chứng từ cho nút “Đã chuyển”; phí chợ 50.000đ của giao dịch reseller bán thành công không bù trừ mặc định vào giá nguồn hoặc cọc khách. Phí vận chuyển/hoàn COD thuộc trách nhiệm A theo quy định chợ, xử lý ngoài website và không nằm trong công thức đối soát. Nếu A nhấn Giao không thành công, website chỉ đóng đơn và mở lại máy chưa sold; A/B tự xử lý khoản cọc, website không phân xử/hoàn cọc. A tự chịu trách nhiệm thời điểm nhấn; website cảnh báo nên đợi máy về tay, không kiểm tra chứng cứ hoàn hàng. Cách cập nhật tình trạng máy sau khi về còn mở.

Shop nguồn phụ trách bảo hành và xử lý trả hàng trong thời hạn áp dụng; đầu mối nhận yêu cầu khách qua reseller, chứng từ và tranh chấp cần chốt tại DEC-14. Hàng/giao dịch đã phát sinh không mất lịch sử khi tin bị xóa. Không tự triển khai admin giữ tiền hoặc cơ chế giải ngân.

## 7. Chat, thông báo, admin và phí

| ID | Yêu cầu | Tiêu chí nghiệm thu | Hiện trạng |
| --- | --- | --- | --- |
| CHAT-01 | Hội thoại giữa hai shop về máy | Chỉ người có quyền trong hai shop được đọc/gửi; văn bản không tự xác nhận giữ máy | Chưa có code |
| CHAT-02 | Ảnh và tệp chat | Mỗi tệp tối đa 10 MB; server kiểm tra kích thước/loại/quyền; bên thứ ba không tải được | Chờ loại tệp và retention |
| FEE-01 | Phí sử dụng theo tháng | Chờ mức phí, quyền lợi, kỳ thu và xử lý quá hạn; chưa thiết kế thu tiền tự động | Cần quyết định |
| FEE-02 | Phí chợ khi reseller bán máy nguồn | Chỉ reseller B bán máy nguồn A chịu phí 50.000đ từ số dư B theo mốc giao dịch được chợ ghi nhận; shop bán máy tự sở hữu không chịu phí. Khách mua COD trên web B: trừ khi cọc được xác nhận hợp lệ và tạo đơn COD, giao thất bại hoàn đúng khoản đã trừ một lần. Khách trả đủ trên web B: trừ khi xác nhận thanh toán đủ/Đã mua. B hoặc CTV thuộc B lấy máy qua request/giữ theo thời hạn đã chốt để giao dịch bên ngoài: chỉ trừ khi A xác nhận giao dịch thành công trong hạn, không trừ lúc request hoặc bắt đầu giữ. A dùng nút Sản phẩm đã bán thông thường sau khi hold hết hạn thì không trừ phí B. Không thu hai lần cho một giao dịch. Khi số dư B chạm `−100.000đ` hoặc thấp hơn, tạm ẩn sản phẩm resell/chặn đơn web mới, không ẩn/hủy đơn đã tạo hoặc sản phẩm tự sở hữu. Đơn trả đủ đã tạo, QR COD đã phát và request lấy máy reseller/CTV đã gửi trước lúc chạm ngưỡng vẫn xử lý theo hạn riêng: thanh toán/cọc hợp lệ hoặc nguồn duyệt request cũ rồi chốt giữ thành công trong thời hạn của lượt giữ vẫn chuyển trạng thái và trừ 50.000đ dù số dư xuống dưới ngưỡng (ví dụ `−150.000đ`); không từ chối giao dịch đã mở vì phí. COD thất bại hoàn phí như trên. Chặn giao dịch resell mới ngay khi chạm ngưỡng; sau giao dịch cũ, sản phẩm resell vẫn ẩn cho đến khi số dư đạt lại `0đ`. Khi khoản nạp/hoàn phí được xác nhận đưa số dư B lên từ `0đ`, tự bỏ lý do ẩn vì nợ phí; nếu vẫn âm, kể cả `−50.000đ`, tiếp tục ẩn. Tin chỉ xuất hiện nếu vẫn còn hàng, còn hạn và không bị ẩn vì lý do khác. Phí tách cọc khách và đối soát A/B; chi tiết đối soát số dư và tích hợp nạp cần chốt | Đã chốt phạm vi, mức, mốc trừ, ngưỡng chặn, giao dịch đã mở và mức hiện lại; chi tiết mở |
| WAL-01 | Nạp số dư chợ qua QR và webhook ngân hàng | Shop tạo lượt nạp có mã tham chiếu riêng và QR chuyển khoản vào tài khoản nhận của nền tảng, tách tài khoản shop nhận cọc COD. Webhook ngân hàng/bên kết nối được server xác thực, đối chiếu đúng mã lượt nạp, shop, tài khoản nhận và số tiền mới cộng số dư tự động một lần và ghi lịch sử. QR, ảnh chuyển khoản hoặc nút shop bấm không chứng minh đã nạp. Nếu giao dịch thiếu mã hoặc sai số tiền, không tự cộng; shop nhắn riêng admin. Admin kiểm tra tiền thực nhận và xác định đúng shop/giao dịch rồi cộng thủ công một lần; ghi admin, thời điểm, giao dịch gốc và chống webhook đến sau cộng lặp. Cập nhật số dư và gỡ lý do ẩn vì nợ phí khi đạt từ `0đ` phải nhất quán. Nhà cung cấp, quy tắc số tiền nạp và xử lý webhook thất lạc cần chốt | Đã chốt kênh nạp, ngoại lệ admin xử lý và nguyên tắc chống trùng; chi tiết tích hợp mở |
| NOTI-01 | Thông báo nghiệp vụ | Hết hạn tin, hủy/hết hạn giữ tới đúng shop; lý do hủy xuất hiện nếu có | Chưa có code |

Chat tùy chọn, không bắt buộc trước hợp tác và không thay trạng thái nghiệp vụ. Cần kiểm tra quyền mỗi tài nguyên, download tệp và subscription realtime. Tệp chat tối đa 10 MB mỗi tệp; loại tệp/định nghĩa MB/retention/quota còn cần duyệt. Admin không mặc định có quyền đọc chat hoặc sửa giá hộ shop; quyền can thiệp, audit và cách giải quyết vi phạm phải được đặc tả trước triển khai.

## 8. Yêu cầu chất lượng và vận hành bản chính thức

Những yêu cầu sau là điều kiện nghiệm thu cần triển khai, không phải mô tả năng lực đã đạt. Chi tiết ở [bảo mật](5_permissions-security.md), [kiểm thử](9_testing-acceptance.md), [hiệu suất](6_architecture.md) và [vận hành](10_operations.md).

| ID | Yêu cầu | Bằng chứng nghiệm thu cần có |
| --- | --- | --- |
| NFR-01 | Cách ly dữ liệu/quyền server | Test chéo shop/CTV/admin/khách và media; không lộ giá nguồn, token/hash hoặc nội dung riêng |
| NFR-02 | Toàn vẹn giao dịch | Test cạnh tranh giữ/checkout/COD/sold/đổi giá/ngừng hợp tác; constraint/transaction bảo vệ ở DB, không chỉ UI |
| NFR-03 | Retry an toàn | Gửi đơn/xác nhận tiền/job lặp không tạo giao dịch/thông báo hoặc giải phóng tồn kho hai lần |
| NFR-04 | Lưu bền và phục hồi realtime | Commit DB trước phát sự kiện; reconnect đọc lại lịch sử; mất socket không mất đơn/chat |
| NFR-05 | Bảo vệ truy cập và vận hành | HTTPS, cookie production, hạn chế đăng nhập/đăng ký, quản lý/thu hồi phiên, bảo vệ admin, secrets/log redaction được kiểm chứng |
| NFR-06 | Media an toàn | Kiểm tra byte thực/định dạng, giới hạn, quyền và vùng lưu riêng; upload lỗi không tạo dữ liệu công khai mồ côi |
| NFR-07 | Audit và truy vết | Ghi actor/thời điểm/đối tượng cho duyệt, giá, đơn, tồn kho và ngừng hợp tác; không ghi secrets/raw payload nhạy cảm |
| NFR-08 | Worker và phụ thuộc lỗi | Đo backlog/retry; job hết hạn theo giờ DB; Redis lỗi fallback không cấp sai quyền hoặc bán trùng |
| NFR-09 | Hiệu suất có số đo | Phân trang/giới hạn input/output, load test theo dataset/máy thật; SLO/capacity được duyệt trước nghiệm thu, không suy năng lực từ test chức năng |
| NFR-10 | Backup và khôi phục | Khôi phục DB/media ở môi trường cách ly và kiểm tra quyền/lịch sử/tồn kho; chốt RPO/RTO/retention trước chạy thật |
| NFR-11 | Phát hành và rollback | Artifact theo commit, migration review/điều phối một runner, staging, smoke test và kế hoạch rollback tương thích schema |
| NFR-12 | Giao diện và hỗ trợ vận hành | Dùng được trên điện thoại/bàn phím; xử lý loading/empty/conflict/offline; người vận hành và quy trình xử lý sự cố rõ |

## 9. Điều kiện nghiệm thu và đưa vào sử dụng

1. Đã review yêu cầu, quyền, schema/API/state machine của từng module và trả lời các quyết định chặn tương ứng.
2. Các luồng tài khoản/duyệt → đăng hàng → hợp tác/treo → CTV hoặc checkout → giữ/giao/hoàn → sold/ngừng hợp tác được nghiệm thu theo phạm vi phát hành thực tế; chức năng chưa hoàn thành không xuất hiện như đã sử dụng được.
3. Không còn lỗi sai quyền, bán trùng, đổi giá trong hold, tái mở sold, mất lịch sử hoặc giải phóng sai tồn kho COD. Có kiểm thử thất bại và cạnh tranh, không chỉ đường thành công.
4. Đạt mục tiêu tải, bảo mật, backup/restore và giám sát đã duyệt; tài liệu vận hành, quy định đăng/giao dịch/dữ liệu và người chịu trách nhiệm sẵn sàng.
5. Có hồ sơ kiểm chứng theo commit, môi trường, dữ liệu giả, kết quả, giới hạn và phương án xử lý sự cố. Viết xong docs không đồng nghĩa hệ thống đã đủ điều kiện production.

## Chỉ số sử dụng cần theo dõi

Đề xuất theo dõi shop có tin còn hàng cập nhật gần đây, shop tìm nguồn, request hợp tác/giữ, thời gian và tỷ lệ phản hồi, giao dịch thành công và ca bán trùng. Với website theo dõi số shop sử dụng, sản phẩm treo và đơn được xác nhận đủ tồn kho. Chưa đặt mục tiêu số lượng khi chưa chốt quy mô và thời gian đo; chỉ số không thay kiểm thử tính đúng.

## 10. Quyết định còn mở và phần chưa được cam kết

Đối chiếu [sổ quyết định](12_open-decisions.md): chuẩn trường/ảnh/tệp và rule-based; xóa tin có đơn mở; chính sách quyền admin; giá/timeout/tiền và actor vận chuyển; phí tháng; retention; SLO/RPO/RTO; hạ tầng và tên miền. Các mốc/phạm vi đã chốt trong tài liệu này thay các câu hỏi cũ tương ứng, không hỏi lại như chưa có quyết định.

Tự động đăng mạng xã hội, AI duyệt tin, ứng dụng di động riêng, tích hợp ERP/kế toán, tự động tích hợp logistics và admin giữ/giải ngân tiền không tự trở thành yêu cầu chỉ vì chuyển sang bản chính thức. Phần nào cần thì xác nhận nhu cầu và thiết kế riêng. Hỗ trợ quy trình giao hàng và thanh toán đủ/COD vẫn nằm trong yêu cầu sản phẩm; nhà cung cấp tích hợp chưa chọn. Hoa hồng CTV là giao dịch ngoài hệ thống. Các nội dung pháp lý ở khung quy định cần thẩm định riêng, không coi tài liệu này là kết luận pháp lý.

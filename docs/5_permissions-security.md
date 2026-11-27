# Phân quyền và bảo vệ dữ liệu

Trạng thái: nền quyền hiện có + thiết kế đề xuất cho module chưa xây. Không phải chứng nhận bảo mật hoặc chính sách pháp lý đã ban hành.

## Ma trận quyền mục tiêu

“Của mình” nghĩa là membership hợp lệ và tài nguyên có shop_id tương ứng. Quyền admin ngoài duyệt hồ sơ phải được chốt DEC-10; không mặc định admin được xem mọi cuộc chat.

| Thao tác | Khách | Pending/rejected | Shop approved sở hữu | Shop approved khác | Admin |
| --- | --- | --- | --- | --- | --- |
| Đăng ký/đăng nhập | Có | Có | Có | Có | Có |
| Xem hồ sơ/phiên của mình | Không | Có | Có | Có | Có |
| Duyệt hồ sơ | Không | Không | Không | Không | Có, hiện có |
| Xem dashboard hồ sơ pending của shop khác và năm trường hồ sơ | Không | Không | Có | Có | Có |
| Xem chợ/giá B2B | Không, đề xuất | Không | Có | Có | Cần chốt |
| Tạo/sửa hàng nguồn | Không | Không | Có | Không | Cần chốt, không mặc định sửa hộ |
| Thêm/sửa/ngừng sử dụng danh mục, nhóm và mẫu | Không | Không | Không | Không | Có |
| Gửi/sửa/rút nhận xét shop pending | Không | Không | Có nếu không tự đánh giá, chỉ trước quyết định | Có nếu không tự đánh giá, chỉ trước quyết định | Xem tất cả, không nhận xét thay shop |
| Hỏi hàng/xin giữ | Không | Không | Không tự hỏi/giữ mình, đề xuất | Có | Không mặc định giao dịch như shop |
| Xác nhận/hủy giữ | Không | Không | Nguồn của hold | Không | Can thiệp cần quyền riêng |
| Đọc/gửi chat, tải media | Không | Không cho luồng mới | Chỉ khi là bên tham gia | Chỉ khi là bên tham gia | Cần căn cứ/quyền riêng |
| Đọc thông báo | Không | Chính sách pending cần chốt | Shop nhận | Shop nhận | Chỉ thông báo của actor |

CTV chưa có code; không suy quyền từ role shop_owner. Thiết kế theo CTV-01..07: một shop active, xem toàn bộ hàng shop được phép bán nhưng không lộ nguồn resell/giá nguồn, tạo đơn cần chủ shop duyệt, ngừng khi hết đơn mở. Không tự cho nhiều membership active.

Mục Đã bán chỉ nội bộ: chủ shop xem máy do shop mình sở hữu hoặc đứng bán, kể cả giao dịch có CTV tham gia. Nếu CTV của B bán máy nguồn A, A và B thấy cùng item sold với Shop nguồn A, Shop bán B và CTV bán. CTV đó chỉ thấy cùng máy/đơn của mình, Shop bán B và tên chính mình; không thấy đơn CTV khác hoặc danh tính/giá nguồn A. Response CTV che các trường nguồn theo CTV-03. Khách và shop không tham gia không được xem máy đã bán hoặc thông tin các bên bán, kể cả khi tin từng hiển thị công khai.

Chỉ admin được đổi giá gói và giới hạn sử dụng qua dashboard/API; ghi actor, giá trị cũ/mới, thời điểm và phiên cấu hình. Shop/CTV/khách chỉ xem giá/quyền liên quan, không sửa. Giá kỳ đã trả giữ nguyên; giới hạn mới không làm ảnh/tệp hợp lệ trước đó mất hiệu lực. Khóa truy cập R2 và cấu hình kết nối không được đọc/ghi qua dashboard, API cấu hình hoặc audit log; người vận hành quản lý ở môi trường server.

Quyền gói chợ được kiểm tra ở server theo shop nguồn hoặc shop đứng bán khi tạo giao dịch mới. Hết hạn chưa gia hạn: chặn cả chủ shop lẫn CTV tạo tin, đơn, request, hold hay giao dịch mới; sản phẩm liên quan không nhận khách mới. Chỉ cho shop gia hạn và cho các actor có quyền xử lý giao dịch đã mở trước hạn; không coi hết gói là lý do hủy COD/hold cũ hoặc bỏ quyền hoàn tất. Giao diện ẩn chức năng mới nhưng API vẫn tự kiểm tra, không dựa vào trạng thái menu.

Gói website mẫu là quyền riêng theo shop đứng website: hết hạn thì ẩn hàng trên website đó và chặn checkout/QR mới tại server, không thu hồi quyền chợ/CTV khi gói chợ còn hạn. API xử lý đơn/lượt chờ website đã mở trước hạn vẫn kiểm tra quyền giao dịch và hạn riêng, không chặn chỉ vì gói website hết hạn. Website của shop khác và tin chợ không bị ảnh hưởng bởi hạn website của shop này.

Kỳ trải nghiệm chợ 14 ngày và khoản tặng 100.000đ chỉ cấp khi shop được approved lần đầu, qua transaction duyệt của admin; kiểm tra `shop_id` và lịch sử cấp để retry hoặc duyệt lại không cộng hai lần. Shop/CTV không tự gọi API cấp kỳ thử hoặc bút toán tặng. Chỉ admin đổi cấu hình mức tặng/bật tắt trên dashboard cho các lần duyệt tương lai, ghi audit; khoản đã cấp và số dư thực của shop không bị viết lại.

Chỉ admin được tạm khóa/mở shop đã approved, lưu actor/thời điểm và audit. Server kiểm tra trạng thái khóa của shop nguồn và shop đứng bán trước mọi thao tác tạo tin/giao dịch mới, không tin dữ liệu cache hoặc UI; CTV thuộc shop bị khóa cũng không tạo việc mới. Đơn, QR, request và hold đã mở trước thời điểm khóa vẫn cho actor có quyền hoàn tất/hủy theo quy tắc giao dịch, không cấp quyền tạo mới ngầm. Mở khóa chỉ gỡ cổng khóa; quyền gói, tồn kho, tin và hợp tác vẫn được kiểm tra.

Chỉ admin được đặt/gỡ lý do ẩn do tin vi phạm. Chỉ shop nguồn có quyền sửa nội dung tin theo điều kiện sửa hiện có và gửi xét duyệt lại đúng tin của mình; admin không được sửa tin/máy hộ shop qua giao diện hoặc API. Shop không xóa/gỡ cờ admin bằng API Hiện tin, sửa giá hoặc tạo bản treo mới cho cùng item còn bị kiểm duyệt. Chỉ admin xem hàng đợi xét duyệt và chấp nhận/từ chối; kiểm tra phiên bản tin được gửi để không duyệt nhầm bản đã sửa tiếp. Reseller/CTV/khách không thấy hàng vi phạm trong nguồn mới; các actor có giao dịch cũ chỉ đọc/xử lý snapshot thuộc quyền. Thông báo chỉ gửi shop nguồn và các reseller đang treo đúng item, không công khai danh sách reseller hoặc dữ liệu riêng cho bên khác.

Nhận xét hồ sơ shop: mỗi shop approved chỉ đọc và sửa/rút nhận xét của chính mình cho lần nộp đang pending; admin đọc tất cả, shop nộp hồ sơ và shop khác không đọc nhận xét đó. Sau quyết định của admin, nhận xét chỉ đọc theo quyền cũ và không xóa lịch sử sửa/rút. API kiểm tra author_shop_id và trạng thái lần nộp, không dựa vào nút trên UI.
Dashboard hồ sơ pending chỉ trả năm trường đã chốt (tên shop, người đại diện, số liên hệ, địa chỉ, kênh bán hàng) cho shop approved và admin. Không trả danh sách/hồ sơ shop khác cho khách, CTV hoặc tài khoản/shop chưa approved; chỉ liệt kê application pending còn trước hạn. Quyền xem năm trường không cấp quyền xem nhận xét shop khác hoặc dữ liệu hồ sơ ngoài năm trường.

Chủ shop rejected hoặc có lần nộp expired được sửa năm trường và tạo lần nộp mới trên cùng tài khoản/shop; không tự có quyền giao dịch trong lúc chờ. Admin chỉ quyết định lần pending còn trước hạn 30 ngày; API không cho duyệt lần cũ từ đúng hạn, kể cả khi cache hoặc worker chưa cập nhật. Lịch sử hồ sơ và nhận xét cũ không cấp quyền xem nhận xét cho shop nộp.

IMEI iPhone là dữ liệu riêng tư bắt buộc trước khi xuất bản; nháp có thể thiếu IMEI, serial tùy chọn. Chỉ shop sở hữu và người quản trị có quyền phù hợp được đọc, không trả qua API/public media cho reseller, CTV hoặc khách. Trùng IMEI giữa các item/tin được phép và không gây lỗi xác thực hoặc tiết lộ dữ liệu shop khác. Chỉ shop nguồn sửa tình trạng/phụ kiện/bảo hành/ảnh/IMEI nhập sai khi máy chưa sold và chưa có hold/đơn mở; API phải kiểm tra lại quyền và trạng thái, không chỉ khóa form. Thay đổi quan trọng làm bản treo B tạm ẩn và CTV không thấy máy đến khi B treo lại.

Khách trả máy sau bán không làm item nguồn cũ rời Đã bán; không có quyền hay endpoint Mở bán lại cho A, B, CTV hoặc admin. B tự xử lý lời hứa đổi/trả rộng hơn điều kiện A chấp nhận. Shop đang sở hữu máy muốn bán tiếp tạo hàng/tin mới với quyền đăng bán thông thường; server không cho sửa trạng thái hoặc tin của item cũ. IMEI không dùng làm khóa duy nhất để chặn item mới; lịch sử đơn cũ và phí đã thu giữ nguyên.

COD resell thất bại: A là actor ghi Giao không thành công; B nhận thông báo và chỉ chủ shop B được chọn treo lại bản hàng của B sau khi A đưa máy lên chợ. A không tự bật bản treo B, CTV không chọn thay B; lựa chọn B vẫn phải kiểm tra quan hệ, giá, tồn kho và số dư. Phí đã trừ cho COD thất bại được hoàn đúng một lần; đơn COD mới chịu phí thường. Máy chưa sold nên vẫn là item hiện có.

Khi membership ended, CTV chỉ đọc snapshot request/giao dịch của chính mình, kể cả sau khi tham gia shop khác; truy vấn không nối sang hàng, giá hoặc quyền hiện tại của shop cũ. Không được xem lịch sử CTV khác, giá/danh tính nguồn hoặc tạo request cho shop cũ. Chủ shop chỉ đặt giá CTV hàng resell từ giá nguồn trở lên; CTV không nhận trường giá nguồn trong response dù hệ thống dùng nó để kiểm tra. Request chờ chủ shop duyệt hết hạn sau 24 giờ hoặc kết thúc ngay khi máy sold; quyền duyệt phải kiểm tra deadline theo giờ DB.

Hàng resell chờ B treo lại không xuất hiện trong nguồn hàng CTV; API tạo/gửi lại request phải từ chối dù CTV còn giữ link cũ. Giá đổi thêm chỉ kéo dài hạn xác nhận lại cho request còn sống, không khôi phục request đã expired.

Chỉ chủ shop được gửi lời mời CTV tới Gmail đích và hủy lời mời của chính shop khi còn chưa accepted. Người nhận chỉ chấp nhận khi đã đăng nhập tài khoản có Gmail trùng lời mời và Gmail đó đã được xác thực theo cách đăng ký; token lời mời phải khó đoán, lưu dạng băm, dùng một lần, không lộ trong log hoặc quyền shop khác. Tại hoặc sau `sent_at + 7 × 24 giờ`, hoặc ngay khi chủ shop hủy, từ chối chấp nhận kể cả worker chưa đổi trạng thái. Hủy/chấp nhận cạnh tranh chỉ một thao tác thành công; hủy lời mời đã accepted không tước membership CTV. Kiểm tra một CTV chỉ có một shop active trong transaction/DB, không cấp quyền lúc gửi/mở lời mời.

CTV chỉ được gửi lại request do mình tạo khi giá CTV đã đổi, trước hạn 12 giờ, với số tiền đề xuất mới. Chỉ chủ shop quản lý CTV được duyệt request hiện hành còn `pending_owner_approval`; request cũ đang chờ CTV xác nhận lại, đã superseded hoặc expired không được duyệt. Giá đổi và duyệt cạnh tranh phải kiểm tra version/giá trong transaction. Shop nguồn không nhận request trực tiếp từ CTV gửi lại; với hàng resell, chủ shop CTV duyệt rồi mới gửi request lấy máy tới nguồn theo quyền đã chốt.

Request CTV không thu thập hoặc trả về trường tên, số điện thoại, địa chỉ khách. CTV và chủ shop reseller trao đổi những thông tin này trực tiếp khi cần xử lý giao dịch; shop nguồn không có quyền xem thông tin khách chỉ vì tồn tại request CTV. Nếu có đơn website riêng, quyền dữ liệu khách của đơn đó theo luồng đơn web.

Chỉ chủ shop được ngừng hợp tác CTV. Server hủy request CTV chưa duyệt khi kết thúc membership, nhưng từ chối kết thúc nếu còn request/đơn đã duyệt hoặc giao dịch nguồn/hold đang mở gắn với CTV. Sau khi kết thúc, kiểm tra membership ở server chặn CTV xem hàng và tạo/gửi lại request cho shop cũ; CTV có thể nhận quyền ở shop khác. Race giữa kết thúc, CTV gửi lại và chủ shop duyệt phải có một kết quả nhất quán; không xóa lịch sử request/đơn.

## Kiểm soát hiện có

Password hash trong core/password.js; phiên token ngẫu nhiên, DB lưu hash, cookie HttpOnly/SameSite Strict và Secure trong production; kiểm tra expiry DB khi HTTP và WebSocket upgrade; SQL có tham số; mutation kiểm tra Origin; body limit 64 KiB; admin duyệt có điều kiện pending; socket chỉ admin hoặc shop approved khi kết nối.

Giới hạn: chưa có rate limit đăng nhập/đăng ký, khôi phục mật khẩu, xác minh email, MFA admin, nhật ký audit đầy đủ, cơ chế thu hồi mọi phiên sau đặt lại mật khẩu và tái kiểm tra quyền trên socket đã mở. ACC-05 yêu cầu mọi phiên ứng dụng cũ hết quyền sau đặt lại thành công, gồm HTTP và WebSocket; kết nối đang mở phải bị ngắt hoặc ngừng nhận dữ liệu/thao tác ngay, không chờ phiên hết hạn tự nhiên. Không khẳng định hệ thống sẵn sàng mở Internet.

## Nguy cơ và yêu cầu thiết kế

| Nguy cơ | Biện pháp cần có | Bằng chứng nghiệm thu |
| --- | --- | --- |
| Đổi ID để xem shop/chat khác | Query/service kiểm tra actor + ownership/participant; không tin shop_id client | Test HTTP và tải media chéo shop đều bị từ chối |
| Tự nâng role hoặc duyệt shop | Allowlist trường; service kiểm tra quyền từ DB | Payload role/status không đổi quyền |
| Brute force/chiếm phiên | Rate limit theo nguồn/tài khoản, cookie HTTPS, thu hồi phiên; lựa chọn MFA admin | Test giới hạn, expiry/logout và kết nối lại |
| XSS/tệp giả ảnh | Text render an toàn, kiểm tra nội dung thực, bucket riêng, download có kiểm soát | Tệp sai loại/HTML/script không thực thi cùng origin |
| CSRF/sai proxy origin | Cấu hình cùng origin, kiểm tra scheme/host phù hợp triển khai, không tin forwarded header từ nguồn tùy ý | Test origin lạ, thiếu origin, reverse proxy |
| Spam dung lượng/chat | Hạn mức actor/shop, giới hạn tệp/số lượng, timeout và quota | Test quá hạn mức và upload dang dở |
| Bán/giữ trùng | Transaction/ràng buộc DB, khóa thống nhất, idempotency | Kiểm thử cạnh tranh nhiều client |
| Rò secrets qua log | Redaction cookie/auth/body nhạy cảm, không log .env hoặc URL ký | Kiểm tra log mẫu không chứa secrets |
| Socket còn quyền sau logout | Tái xác thực và/hoặc thu hồi chủ động, kiểm tra quyền mỗi subscription | Phiên hết hạn không tiếp tục nhận sự kiện |

## Media

Chốt allowlist MIME/extension và định nghĩa 10 MB tại DEC-04/07. Kiểm tra số byte stream thực, magic bytes, số ảnh/kích thước pixel, tên tệp an toàn và quota. Không tin Content-Type/Content-Length client. Object ở vùng private; URL có thời hạn ngắn sau kiểm tra quyền; token/link không ghi log. Tệp đang kiểm tra chưa được gắn vào tin/tin nhắn hiển thị. Quyết định antivirus, xử lý ảnh và lưu bản gốc cần chọn theo loại tệp, không tự thêm dịch vụ.

## Dữ liệu và audit

Thông tin liên hệ shop chỉ công khai theo chính sách được duyệt. Không thu mật khẩu iCloud; IMEI bắt buộc trước khi đăng nhưng riêng tư, serial tùy chọn và cũng được che khỏi người không có quyền. Audit thao tác duyệt, giá, giữ, sửa IMEI, quyền và hành động admin; lưu actor, target, thời điểm, request ID, thay đổi an toàn. Không lưu raw session token/mật khẩu/nội dung tệp vào audit.

Retention cho tài khoản, chat, tệp, audit, backup và yêu cầu xóa cần DEC-07/10. Không hứa thời hạn hoặc quyền xóa pháp lý chưa thẩm định. Quy trình sự cố: ngăn rò tiếp diễn, thu hồi phiên/quyền liên quan, giữ bằng chứng đã giảm dữ liệu nhạy cảm, khôi phục, xác định phạm vi và cách thông báo theo chính sách được duyệt.

## Điều kiện bảo mật trước mở thử

Kiểm thử quyền mỗi route/WS/media, rate limit, HTTPS và secret management, backup/restore, log redaction, chính sách dữ liệu/quy định tối thiểu, tài khoản admin riêng và quy trình thu hồi. Không cần thêm MCP, dịch vụ hoặc quyền truy cập trong giai đoạn viết docs.

## Quyền quan hệ nguồn và mua website

Chỉ shop nguồn A sở hữu máy được chọn request xin giữ từ các request đang chờ của đúng máy; A không bị buộc chọn theo thứ tự gửi. Reseller/CTV không thể tự xác nhận request của mình hoặc thao tác request shop khác. Khi A xác nhận một request, các request còn lại bị từ chối trong cùng transaction; không cho A xác nhận lại request đã bị từ chối dù hold thắng sau đó hủy/hết hạn.

Chỉ chủ shop nguồn A được đặt thời hạn giữ của từng quan hệ A–B, số giờ nguyên 12–72 và mặc định 12; B/CTV không được tự sửa hoặc khai số giờ khi request. Server xác nhận hold dùng cấu hình hiện hành của đúng quan hệ, chụp hạn vào hold; thay đổi cấu hình sau đó không đổi hold đang chạy. Khóa/version phải làm rõ thứ tự khi chỉnh cấu hình và xác nhận hold đồng thời.

Chỉ shop nguồn A sở hữu máy được từ chối riêng request còn requested, lý do có thể trống. Reseller/CTV không được từ chối request của mình hoặc shop khác bằng quyền nguồn. Server kiểm tra trạng thái dưới khóa; từ chối riêng không thay đổi request khác, máy hay phí chợ và không áp được với hold đã confirmed.

Chỉ chủ shop reseller B sở hữu request còn chờ được rút request đó trước khi A xác nhận. CTV, shop khác và A không được rút thay B qua quyền này. Server kiểm tra trạng thái dưới khóa; rút request không được áp vào hold đã confirmed và không tạo phí.

Chủ shop reseller B sở hữu hold được hủy lượt giữ confirmed còn hạn trước khi A complete; A được báo. B không thể hủy hold của shop khác, hold đã completed/expired hoặc dùng quyền này để đảo máy sold. CTV không tự có quyền hủy hold của B. Cancel và complete cạnh tranh phải kiểm tra trạng thái dưới cùng khóa item/hold; chỉ một kết quả có hiệu lực.

Chỉ chủ shop nguồn A sở hữu máy được xác nhận hold đã chốt giao dịch thành công trong hạn; B/CTV không được bấm thay A. Không yêu cầu ảnh/chứng từ làm điều kiện quyền; server kiểm tra hold, máy và hạn, ghi actor/thời điểm trong audit và chống xác nhận lặp hoặc bán trùng.

Từ đúng expires_at, A không còn quyền complete hold cũ. A dùng quyền Sản phẩm đã bán thông thường nếu hold đã hết hạn và máy chưa thuộc đơn/giữ mới; kiểm tra lại dưới khóa DB, không dựa vào trạng thái màn hình. Thao tác này không gắn B hoặc trừ phí B. Nếu đã có giao dịch khách mới, không cho thao tác bán ngoài ghi đè; A tự liên hệ và xử lý với khách.

Hủy hold confirmed bởi A hoặc B không phụ thuộc việc điền lý do; nếu có lý do thì chỉ các bên của hold và actor vận hành đủ quyền được xem theo chính sách audit. Thông báo cho bên còn lại không thêm lý do giả khi trường này trống.

Nguồn được ngừng hợp tác cả reseller khi hết đơn mở, không có quyền ẩn từng bản treo riêng hoặc đặt allowlist danh mục riêng. Người mua web không phải chờ nguồn duyệt từng đơn, nhưng API phải kiểm tra nguồn/quan hệ/tồn kho và khóa hàng; không suy quyền từ giao diện còn hiển thị. Xác nhận paid dựa bằng chứng thanh toán tin cậy, không tin client. Nút Giao không thành công của COD thuộc shop nguồn và chỉ mở máy chưa sold; server kiểm tra quyền/trạng thái đơn nhưng không yêu cầu chứng cứ hoàn hàng. A tự chọn thời điểm nhấn sau cảnh báo trên giao diện. Website không tự xử lý tranh chấp cọc A/B.

Cọc COD đến muộn không cấp quyền tạo đơn từ lượt chờ đã hết hạn hoặc giữ lại máy. Các bên tự xử lý khoản cọc ngoài website; nếu mua bán tiếp trên website thì giao dịch mới vẫn phải qua kiểm tra quyền và khóa tồn kho bình thường.

Xác nhận cọc COD tự động chỉ dựa webhook đã xác thực từ bên cung cấp kết nối tài khoản shop bán, không dựa cờ client/ảnh chuyển khoản hoặc quyền bấm của shop. Server đối chiếu mã lượt, shop/tài khoản thụ hưởng, số tiền và hiệu lực giữ máy; lưu định danh giao dịch để chống replay/xử lý trùng. Thông tin tài khoản và khóa xác thực webhook không công khai cho shop khác hoặc đưa vào log.

Phí chợ 50.000đ chỉ gắn với reseller bán máy nguồn qua web hoặc chốt giao dịch lấy hàng bằng request/giữ theo thời hạn đã chốt; shop tự bán máy của mình không chịu phí. Nguồn xác nhận chốt giao dịch nhưng không được ghi trừ phí thay reseller hoặc xem số dư riêng của reseller chỉ vì cung cấp máy. CTV không chịu phí riêng: nếu CTV thuộc B lấy máy nguồn và A xác nhận chốt thành công, số dư B chịu phí. Từ ngưỡng `−100.000đ` trở xuống, quyền xem/xử lý đơn resell đã tạo vẫn giữ; chỉ chặn đơn web mới từ sản phẩm resell đang tạm ẩn. Đơn trả đủ đã tạo, QR COD đã phát và request lấy máy reseller/CTV đã gửi trước lúc chạm ngưỡng vẫn được xác nhận thanh toán/cọc hoặc duyệt/chốt giữ hợp lệ trong hạn, trừ phí dù số dư thấp hơn ngưỡng; quyền tạo giao dịch resell mới bị chặn ngay. Giao dịch cũ kết thúc không tự cấp lại quyền nhận đơn mới khi số dư còn âm. Chỉ số dư đã xác nhận từ `0đ` mới gỡ chặn vì nợ phí; không gỡ các lý do ẩn khác hoặc cấp lại quyền hợp tác đã mất. Mọi thao tác số dư/nạp tiền cần kiểm tra quyền shop và ghi lịch sử; nguyên tắc xác nhận nạp qua webhook ngân hàng đã chốt; chi tiết tích hợp chưa chốt.

Chủ shop chỉ tạo/xem lượt nạp và lịch sử số dư của shop mình; CTV và shop nguồn không được cộng tiền hoặc xem số dư reseller. Endpoint webhook nạp chợ chỉ chấp nhận sự kiện đã xác thực từ ngân hàng/bên kết nối, đối chiếu mã lượt/shop, tài khoản nền tảng nhận và số tiền; không tin cờ thanh toán từ client, ảnh chuyển khoản hoặc webhook không khớp. Định danh giao dịch phía ngân hàng phải chống replay/trùng; secret xác thực không đưa vào frontend/log.

Chỉ admin có quyền đối soát nạp tiền được cộng thủ công giao dịch thiếu mã/sai số tiền sau khi kiểm tra tiền thực nhận và xác định đúng shop. Tin nhắn hoặc ảnh shop gửi chỉ giúp tìm giao dịch, không tự chứng minh tiền đã vào. Ghi admin, thời điểm, lý do, số tiền, shop và định danh giao dịch gốc; cùng giao dịch ngân hàng không thể cộng lần nữa qua webhook hoặc thao tác admin khác. Không dùng quyền này để sửa cọc COD của khách hoặc đối soát A/B.

Với COD reseller giao thành công, A và B xem được số A còn chuyển B của đơn thuộc quan hệ mình. Chỉ chủ shop nguồn A được bấm “Đã chuyển” sau khi chuyển tiền ngoài website; B, CTV, shop khác và admin không được xác nhận thay A. Server kiểm tra đúng đơn COD đã giao thành công, ghi actor/thời điểm một lần và không coi nút này là xác minh giao dịch ngân hàng hoặc quyền chỉnh số dư phí chợ. Không yêu cầu A tải ảnh biên lai/chứng từ cho thao tác này.

## Bảo vệ liên kết tài khoản

ACC-04 yêu cầu chứng minh quyền sở hữu tài khoản mật khẩu trước liên kết Google, không tự merge theo email. Khi triển khai cần xác minh danh tính Google ở server, bảo vệ luồng callback và thao tác liên kết, chống liên kết nhầm user/CSRF/đua tạo tài khoản; không nhận cờ Google hợp lệ hoặc user_id từ client làm chứng cứ. Không lưu mật khẩu Google hoặc token/raw callback trong log. Chi tiết giao thức, thư viện, xác thực lại và recovery chưa chọn/chốt.

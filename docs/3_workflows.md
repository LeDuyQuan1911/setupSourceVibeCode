# Luồng nghiệp vụ, trạng thái và đồng thời

Trạng thái: thiết kế đề xuất dựa trên yêu cầu đã chốt. Chỉ luồng tài khoản/duyệt shop có code nền. Xem [quyết định mở](12_open-decisions.md) trước khi triển khai chuyển trạng thái còn thiếu.

## Tài khoản, liên kết và nộp hồ sơ

Theo ACC-01..04 và SHOP-06, đăng ký tài khoản tách nộp hồ sơ shop. Đây là luồng mục tiêu chưa triển khai: code hiện tại vẫn tạo user + shop pending trong một transaction, hash trước lấy DB client rồi tạo phiên sau commit. Lỗi tạo phiên sau commit không xóa tài khoản đã tạo.

1. Chọn Google, hoặc nhập Gmail/mật khẩu/nhập lại. Tạo user chưa có shop; không gán quyền chợ chỉ vì đăng ký/Google thành công. Với Gmail/mật khẩu: tạo tài khoản chờ xác minh, gửi link qua Gmail; xác minh hợp lệ mới kích hoạt. Chưa kích hoạt chưa nộp hồ sơ. Link có hiệu lực 10 phút kể từ lúc gửi, kiểm tra hạn tại server; đủ/quá hạn thì không kích hoạt và người dùng cần yêu cầu gửi lại. Khi phát hành link gửi lại, vô hiệu các link trước và đặt hạn link mới +10 phút; xác minh phải kiểm tra đúng link mới nhất tại server. Server chỉ cho gửi lại khi đã qua ít nhất 60 giây từ lần gửi trước của tài khoản; yêu cầu quá sớm không phát hành link mới/vô hiệu link hiện tại hoặc gia hạn nó. Mỗi tài khoản tối đa 5 email trong khoảng 60 phút tính cả lần đầu; kiểm tra hạn mức và khoảng chờ ở server trước phát hành/gửi link, kể cả nhiều tab/tiến trình. Quá hạn mức không gửi email hoặc đổi/gia hạn link hiện tại. Kiểm tra mật khẩu 12–200 ký tự và nhập lại khớp, không bắt tổ hợp hoa/thường/số/ký tự đặc biệt trước tạo tài khoản. Lỗi mail/quota khi gửi lỗi và chi tiết recovery còn DEC-01.
2. Google gặp Gmail đã có user dùng mật khẩu: không tự merge, không tạo user mới; chuyển sang xác thực tài khoản mật khẩu hiện có để liên kết. Sai/hủy bước này không đổi liên kết hoặc quyền đăng nhập. Sau liên kết cả hai cách vào cùng user.
3. User Google-only muốn thêm mật khẩu: thao tác trong tài khoản đã xác thực, không đăng ký user khác. Chi tiết xác thực lại còn DEC-01; Google-only chưa có mật khẩu không thuộc ACC-05.
4. Sau đăng ký, user nhập/nộp năm thông tin hồ sơ. Nộp thành công tạo shop pending riêng; thời hạn 30 ngày tính từ lần nộp, không từ đăng ký tài khoản.
5. Pending chỉ xem trạng thái theo quyền. Mỗi shop approved khác chỉ có một nhận xét cho mỗi lần nộp hồ sơ pending; được sửa/rút trước quyết định admin, không xem nhận xét shop khác. Admin xem tất cả, tự đánh giá các nhận xét và quyết định approved/rejected dù không có nhận xét hoặc nhận xét trái chiều; hệ thống không chấm điểm/tính phiếu. Shop nộp không xem nhận xét. Khi admin ghi quyết định, khóa quyền sửa/rút nhận xét, update có điều kiện pending và invalidation cache.
6. Lần nộp pending có `expires_at = submitted_at + 30 × 24 giờ` theo giờ server/DB. Admin chỉ ra quyết định khi `now < expires_at`; từ đúng mốc đó lần nộp cũ hết hạn, không duyệt/từ chối được dù job cập nhật trạng thái chạy trễ. Shop dùng cùng tài khoản/shop, sửa năm trường và gửi lần nộp mới; rejected có lý do cũng được gửi lại ngay, không có bước khiếu nại. Mỗi lần nộp có ID, snapshot hồ sơ, hạn, quyết định và nhận xét riêng; nhận xét cũ không chuyển sang lần mới. Chỉ một lần nộp pending còn hiệu lực cho một shop; nộp lại và admin quyết định cạnh tranh phải cho một kết quả nhất quán. Chính sách khóa/mở shop sau khi đã approved là luồng khác.

Thiết kế triển khai cần chống tạo trùng user khi hai luồng đăng ký/callback cạnh tranh và không cấp phiên user hiện có chỉ do email trùng. Hợp đồng/schema cụ thể phải được review trước code.

## Quên mật khẩu

ACC-05: tài khoản đã có mật khẩu nhập Gmail đã xác minh → nhận link đặt lại → server xác nhận link hợp lệ → người dùng nhập mật khẩu mới/nhập lại theo ACC-01 → cập nhật credential của cùng user. Không tạo shop/user, đổi quyền hoặc kích hoạt Gmail chưa xác minh bằng thao tác này. Đây là luồng mục tiêu chưa có code.

Link reset có hạn 10 phút kể từ gửi; gửi lại cách ít nhất 60 giây, tối đa 5 email/tài khoản trong 60 phút (tính cả lần đầu). Chỉ link reset mới nhất hiệu lực. Hạn mức và khoảng chờ reset tính riêng với xác minh đăng ký; không dùng token chéo mục đích hoặc để gửi lại loại này vô hiệu link loại kia. Quá giới hạn không gửi/đổi/gia hạn link reset hiện tại. Khi đặt lại thành công, server tiêu thụ link một lần và thu hồi mọi phiên đăng nhập ứng dụng của user, kể cả phiên ở thiết bị hiện tại; response không cấp phiên mới, người dùng phải đăng nhập lại. Kiểm tra link, cập nhật mật khẩu, tiêu thụ link và thu hồi phiên phải nhất quán để request dùng lại hoặc chạy đồng thời không đổi mật khẩu lần hai. Phiên Google đăng nhập vào ứng dụng cũng bị thu hồi; liên kết Google của user vẫn còn, không tác động đến phiên tài khoản Google bên ngoài ứng dụng. Không lưu token/password thô trong log.

## Tồn kho và tin đăng

Thiết kế đề xuất tách hai trạng thái độc lập để việc hết hạn tin không xóa quyền giữ máy:

| Đối tượng | Trạng thái đề xuất | Ý nghĩa |
| --- | --- | --- |
| Máy | available, held, reserved_for_order, sold, withdrawn | Khả năng giao dịch hiện tại của item; sold là trạng thái cuối của item cũ. Máy khách trả nếu được bán tiếp thì tạo hàng/tin mới theo luồng thường, giữ lịch sử item/đơn cũ |
| Tin | draft, active, hidden, expired, archived, deleted | Khả năng hiển thị của bản công bố |

Đây là chi tiết hóa đề xuất cho sơ đồ trạng thái gộp trong 6_architecture.md; cần duyệt trước migration. Một máy sold/withdrawn không hiện bán dù tin active. Một tin expired không làm hold đang hiệu lực biến mất.

| Chuyển tin | Người thực hiện | Tiền điều kiện và kết quả |
| --- | --- | --- |
| draft → active | Shop sở hữu approved | Đủ trường, media hợp lệ, máy đủ điều kiện; đặt published_at và expires_at |
| active → hidden | Shop sở hữu; admin khi tin vi phạm | Dừng yêu cầu mới; giữ nguyên hold/đơn đã xác nhận, không hủy hoặc reset hạn. Lý do admin ẩn phải lưu riêng |
| hidden → active | Shop sở hữu nếu tự ẩn; admin gỡ lý do vi phạm | Giữ nguyên mốc kỳ cũ; chỉ hiện lại khi chưa hết hạn, máy đủ điều kiện và không còn lý do admin ẩn; không mở kỳ mới |
| active → expired | Hệ thống | Đạt expires_at, ẩn ngay theo truy vấn và chặn yêu cầu mới; hold/đơn đã mở tiếp tục theo hạn riêng, tạo thông báo một lần |
| expired → active | Shop sở hữu | Trong cửa sổ gia hạn tin; mở kỳ 90 ngày mới |
| expired → archived | Hệ thống | Quá cửa sổ 3 ngày thì hết quyền gia hạn. Nếu còn hold/đơn mở, đợi chúng kết thúc; sau đó ẩn khỏi khu vực bán và giữ bản ghi lịch sử, không xóa vật lý/cascade giao dịch |

Nháp iPhone được lưu khi chưa có IMEI nhưng không được chuyển sang active cho tới khi A nhập IMEI; serial tùy chọn. IMEI trùng item/tin khác không chặn xuất bản. A sửa IMEI nhập sai khi máy chưa sold và không có hold/đơn mở; server khóa sửa trong giao dịch, ghi audit thay đổi và không viết lại lịch sử bán.

Đã chốt tính theo thời lượng: `expires_at = published_at + 90 × 24 giờ`, `renewal_deadline = expires_at + 3 × 24 giờ`. Lưu UTC, hiển thị giờ địa phương; dùng giờ DB để quyết định. Tin chỉ nhận giao dịch mới khi `now < expires_at`. Gia hạn chỉ khi `expires_at <= now < renewal_deadline`; đúng `renewal_deadline` không còn gia hạn. Worker chạy trễ không kéo dài các quyền này. Ví dụ đăng 15:00 ngày 01/01/2026 thì hết hạn 15:00 ngày 01/04/2026, cửa sổ gia hạn kết thúc đúng 15:00 ngày 04/04/2026.

Tin expired không nhận checkout, request giữ, treo lại hay giao dịch mới. Hold/đơn đã mở trước lúc hết hạn vẫn xử lý theo hạn riêng; nếu thất bại/hủy, máy không tự hiện bán lại khi tin còn expired. Shop gia hạn hợp lệ trong cửa sổ 3 ngày thì tin mới có thể hiện lại nếu máy còn đủ điều kiện. Sau cửa sổ, không gia hạn muộn; worker đợi giao dịch mở kết thúc rồi archive tin cũ khỏi khu vực bán, giữ bản ghi và lịch sử. Máy chưa sold vẫn thuộc kho shop, không vào mục Đã bán. Chủ shop có thể tạo tin mới cho cùng item sau khi kiểm tra/cập nhật tình trạng và ảnh; tin mới có kỳ 90 ngày riêng. Tin cũ không được tái kích hoạt. Chỉ một tin của một item có thể nhận giao dịch tại một thời điểm.

## Chat tùy chọn, không là điều kiện hợp tác

1. Khi muốn trao đổi, shop approved có thể mở chat về máy theo quyền. Không bắt buộc mở chat/hỏi hàng trước khi gửi request hợp tác lấy nguồn hoặc cấp quyền treo. Server kiểm tra đối tượng và quyền, không tin source_shop_id client làm căn cứ.
2. Tạo/tìm hội thoại giữa hai shop về máy. Có tái sử dụng hội thoại hay tạo mỗi yêu cầu mới cần DEC-06.
3. Tin nhắn văn bản hoặc attachment hợp lệ được ghi DB sau kiểm tra thành viên. Commit trước khi báo thành công/phát sự kiện.
4. Client dùng mã yêu cầu gửi để không tạo bản sao khi retry; khóa duy nhất theo hội thoại và người gửi là đề xuất.
5. Socket chỉ báo có thay đổi. Khi reconnect, client đọc lịch sử theo cursor; không dựa vào socket để chứng minh đã gửi/lưu/đọc.
6. Tin bị xóa khỏi chợ vẫn có tham chiếu lịch sử tối thiểu. Quyền tiếp tục nhắn sau bán/hết hạn và retention cần DEC-06/07.

## Giữ hàng trực tiếp

| Trạng thái đề xuất | Chuyển tiếp | Actor và điều kiện |
| --- | --- | --- |
| requested | confirmed | Nguồn sở hữu máy xác nhận; máy còn bán, không có hold hiệu lực |
| requested | rejected | A chủ động từ chối riêng một request còn chờ, lý do tùy chọn, báo shop gửi request; request khác và máy không đổi. Hoặc tự từ chối các request thua của cùng máy khi A xác nhận một request khác |
| requested | cancelled | Chủ shop reseller B rút request của B trước khi nguồn xác nhận; không giữ máy, không thu phí |
| confirmed | completed | Shop nguồn A bấm “Giao dịch thành công” trong hạn; ghi actor/thời điểm, máy sold và phí B một lần; không yêu cầu ảnh/chứng từ |
| confirmed | cancelled | Nguồn A hoặc chủ shop B hủy trước hạn, có ô lý do tùy chọn và báo bên còn lại; chỉ hiện lý do nếu đã nhập. Không thu phí; không hủy sau completed/expired |
| confirmed | expired | Từ đúng expires_at đã lưu, hệ thống kết thúc; máy/tin mở bán lại nếu chưa sold, chưa có giao dịch khác và tin còn đủ điều kiện |

Thời hạn giữ do A cấu hình riêng cho từng reseller B trong quan hệ hợp tác: số giờ nguyên từ 12 đến 72, mặc định 12. A sửa mức này chỉ đổi các hold được xác nhận sau thời điểm sửa. Lúc xác nhận request của B/CTV thuộc B, server đọc mức hiện hành dưới cùng transaction, chụp `duration_hours` và tính `expires_at = confirmed_at + duration_hours` theo giờ DB. Request còn chờ chưa có hạn cố định; hold đã xác nhận giữ nguyên `duration_hours` và `expires_at` dù cấu hình quan hệ thay đổi. Đơn web không dùng thời hạn này.

Chủ shop B chỉ rút được request còn `requested`; request đã rút không được xác nhận lại. Nếu A xác nhận và B rút cạnh tranh, khóa cùng item/request để chỉ một thao tác thành công; B rút trước thì A không thể xác nhận, A xác nhận trước thì B không thể rút request mà phải dùng quyền hủy hold đã confirmed. B được hủy hold confirmed còn hạn trước khi A chốt thành công, không thu phí; A được báo. Hủy hold và A chốt thành công cạnh tranh trên cùng item/hold, chỉ một thao tác thắng; completed/expired không thể hủy. Không gia hạn ngầm khi chat hoặc sửa giá. Một hold kết thúc không được tái kích hoạt; request bị từ chối vì nguồn chọn shop khác cũng không tự mở lại. Sau khi hold hủy/hết hạn, shop muốn lấy máy phải gửi request mới nếu máy còn bán được.

A từ chối riêng request chỉ khi nó còn `requested`: giữ nguyên request khác, máy chưa held và không thu phí. Lý do từ chối được nhập hoặc để trống; thông báo cho shop gửi request chỉ hiện lý do nếu có. Từ chối tranh với B rút hoặc A xác nhận cùng request dùng chung khóa item/request, chỉ một chuyển trạng thái thành công; không cho từ chối hold đã confirmed.

Khi số dư reseller chạm ngưỡng nợ phí `−100.000đ`, không tạo request lấy máy resell mới. Request của reseller/CTV đã gửi trước thời điểm đó vẫn được nguồn duyệt; nếu được xác nhận, lượt giữ theo thời hạn đã chốt bắt đầu như thường. Nguồn chốt thành công trong hạn thì trừ 50.000đ vào số dư reseller dù xuống thấp hơn ngưỡng. Request bị từ chối/hủy hoặc hold bị hủy/hết hạn không phát sinh phí. Sau khi chạm ngưỡng, sản phẩm resell vẫn ẩn/chặn giao dịch mới cho tới khi số dư được xác nhận đạt từ `0đ` trở lên.

### Transaction xác nhận đề xuất

1. Xác thực phiên, quyền shop nguồn và đầu vào; lấy client DB.
2. BEGIN; khóa hàng máy trước, rồi các hàng request/hold của máy theo ID trong thứ tự thống nhất ở mọi mutation. Đường tạo request mới cũng khóa hàng máy và kiểm tra máy chưa bị giữ/thuộc đơn trước khi ghi.
3. Đọc giờ DB; kết thúc hold confirmed cũ nếu đã quá hạn trong cùng transaction. Một unique index trạng thái confirmed không tự hết hạn theo thời gian.
4. Kiểm tra tin/máy đủ điều kiện và requested thuộc đúng máy/hai shop; không cho giữ máy của chính mình (đề xuất cần duyệt).
5. Nếu còn hold confirmed chưa hết hạn thì trả conflict; không ghi hold thứ hai.
6. A được chọn request bất kỳ đang chờ, không ưu tiên theo thời điểm gửi. Chụp giá đang niêm yết, confirmed_at và expires_at = confirmed_at + số giờ đã chụp; cập nhật máy held và tự chuyển tất cả request khác đang chờ của cùng máy sang rejected trong cùng transaction; ghi sự kiện/outbox nếu áp dụng.
7. COMMIT; trả hold đã lưu. Retry cùng yêu cầu không tạo lượt mới. Không gửi thông báo trước commit.

Tất cả mutation bán/ẩn/đổi giá/hủy/hết hạn phải thống nhất thứ tự khóa máy → hold. Deadlock hoặc lỗi serialization có retry hữu hạn; không retry vô hạn. Giá sửa đồng thời với xác nhận phải được tuần tự hóa trên cùng hàng máy.

### Hết hạn, hủy và hoàn tất

- Hiệu lực đọc bằng trạng thái confirmed **và** expires_at > giờ DB; worker trễ không kéo dài thời hạn giữ đã chốt.
- Hủy/hoàn tất khóa máy và hold; kiểm tra lại hiệu lực sau khi chờ khóa. Một thao tác thắng, thao tác còn lại nhận trạng thái hiện tại/conflict.
- Hoàn tất hold trong hạn chỉ do A bấm “Giao dịch thành công” trên hold đã xác nhận; ghi actor/thời điểm và sold/phí B trong cùng transaction. Không yêu cầu ảnh, biên lai hoặc chứng từ giao dịch; chat không thay nút xác nhận.
- Khi kết thúc, chỉ đưa máy về available nếu máy không sold/withdrawn và không có hold khác hiệu lực; không tự đưa tin expired/hidden ra chợ.
- Từ đúng expires_at, A không thể complete hold cũ. Nếu A đã giao dịch ngoài website nhưng quên bấm, A dùng nút Sản phẩm đã bán thông thường khi máy chưa bị giao dịch mới chiếm; không phục hồi hold expired, không gắn B hoặc trừ phí B. Nếu khách đã đặt mua trong lúc tin mở lại, giữ nguyên giao dịch khách trên hệ thống; A tự liên hệ và xử lý với khách, không cho nút Đã bán ghi đè giao dịch đó. Không có luồng bán muộn riêng.

## Worker đề xuất

Chạy lô nhỏ, nhận việc với khóa hàng/`SKIP LOCKED` khi thích hợp, update có điều kiện và ghi khóa sự kiện duy nhất. Các job: hết hạn hold, hết hạn tin, archive tin sau cửa sổ gia hạn khi hết giao dịch mở, dọn upload mồ côi, phát outbox, dọn phiên hết hạn. Có số lần thử, backoff, thời điểm thử lại và danh sách lỗi cần can thiệp. Không coi Redis cache là hàng đợi bền.

## Tồn kho, bán ngoài và kho Đã bán

Theo CAT-06/07, item sold không chuyển lại available. Khách trả máy sau khi đơn đã bán thành công thì item/đơn cũ vẫn Đã bán; shop nhận máy có quyền bán tiếp tự tạo hàng/tin mới theo quy trình thường với kỳ 90 × 24 giờ riêng. Không có nút Mở bán lại, không nối chuỗi miễn phí qua các lần trả; giao dịch resell mới chịu phí theo FEE-02. COD giao thất bại là luồng khác vì máy chưa sold. Đề xuất transaction bán: khóa item rồi hold/đơn liên quan theo thứ tự chung, kiểm tra quyền và trạng thái, ghi sự kiện bán/version, archive tin cũ với lý do sold, ghi outbox; gọi lại không tạo giao dịch/sự kiện đôi. Nguồn chốt đúng hold là hoàn tất giao dịch đó; nút bán ngoài phải chặn nếu còn giao dịch mở. Sau khi hold expired, A có thể dùng nút Sản phẩm đã bán thông thường nếu máy chưa thuộc giao dịch mới; không chuyển hold cũ thành completed hoặc thu phí B. Nếu khách đã tạo giao dịch mới, A xử lý với khách và thao tác bán ngoài không được ghi đè. Không sửa item sold thành một máy khác.

Khi ghi bán thành công, chuyển chính item của nguồn sang sold và lưu shop nguồn, shop đứng bán, CTV trực tiếp bán nếu có trên cùng sự kiện. CTV của B bán máy A thì A và B xem cùng máy với Shop nguồn A, Shop bán B, CTV bán; CTV đó cũng xem chính item trong Đã bán nhưng chỉ thấy Shop bán B và tên mình, không thấy danh tính/giá nguồn A. Không tạo item mới hoặc lần bán khác cho B/CTV. Nếu không có CTV thì trường CTV bán để trống. CTV chỉ xem máy/đơn mình tham gia trong shop, gồm hàng sở hữu và resell, không tự xác nhận bán hoặc sửa trạng thái máy.

Mọi publish/unhide/renew/tạo tin cho item cũ/hold/checkout/bản treo kiểm tra sold và quyền giao dịch trên DB. Item cũ đã sold không được tái sử dụng cho tin mới; shop đăng hàng mới qua luồng tạo item/tin thông thường. IMEI không phải khóa duy nhất nên có thể trùng giữa item cũ và item mới. Worker hết hạn/hủy không đổi sold hoặc reserved_for_order về available nhầm; không tự hiện tin hidden. Job archive tin expired bỏ qua tin archived vì sold và không xóa vật lý bản ghi cũ. Chi tiết ràng buộc/index/retention ở [dữ liệu](7_data-model.md).

## Đổi giá và xác nhận giữ cạnh tranh

Shop nguồn sửa tình trạng, phụ kiện, bảo hành hoặc ảnh chỉ khi item chưa có hold/đơn mở; mutation phải khóa item và kiểm tra lại giao dịch trong transaction. Giao dịch đã mở dùng snapshot thông tin lúc bắt đầu. Khi thay đổi thông tin quan trọng commit, bản treo reseller tạm ẩn, B xem và treo lại theo dữ liệu mới; CTV không thấy máy cho tới khi B treo lại hợp lệ. Sửa thông tin và tạo hold/đơn cạnh tranh chỉ một thứ tự hợp lệ. Khóa sửa không áp dụng cho thao tác xử lý/hủy chính giao dịch đang mở.

Theo CAT-05, mutation source_price khóa item → hold, kiểm tra confirmed và expires_at theo giờ DB. Còn hiệu lực thì conflict, không ghi giá/outbox đổi giá. Nếu hold hết hạn nhưng worker chậm, kết thúc hold cũ trong transaction rồi kiểm tra item chưa sold/khóa đơn trước khi sửa.

Nếu đổi giá commit trước confirm, confirm chốt giá mới; nếu confirm thành công trước, sửa giá bị chặn. Không giữ một transaction DB mở suốt thời gian hold; đây là điều kiện nghiệp vụ được kiểm tra trong từng transaction. Snapshot hold vẫn bất biến. Đúng mốc expires_at thì không complete hold cũ; không tự cho retry đổi kết quả hết hạn. Nút Sản phẩm đã bán thông thường không xử lý lại hold expired hoặc thu phí B.

## Hợp tác lấy nguồn

SRC-03: reseller gửi request → nguồn chấp nhận/từ chối → quan hệ một chiều active → reseller chọn/treo máy đủ điều kiện. Không cần chat/inquiry, không tự treo tất cả hoặc tạo hold. Request lấy một máy bên ngoài dùng luồng giữ riêng. Đổi giá nguồn hợp lệ làm bản treo tạm ẩn; reseller chủ động chấp nhận giá để treo lại theo STORE-03.

SRC-02: đề xuất transaction ngừng hợp tác khóa hàng quan hệ, kiểm tra mọi request/hold/đơn giao/hoàn mở rồi chuyển ended. Luồng tạo request/đơn mới phải dùng cơ chế khóa nhất quán với quan hệ để không lọt sau kiểm tra. Còn việc trả conflict, không tự hủy đơn; giữ lịch sử. Actor CTV chỉ đi qua quyền shop của mình.

## Lời mời CTV

Chủ shop mời CTV bằng Gmail; lời mời có `expires_at = sent_at + 7 × 24 giờ`. Người nhận đăng nhập/đăng ký đúng Gmail được mời, xác minh tài khoản theo phương thức đăng ký rồi bấm Chấp nhận trước `expires_at`. Chỉ lúc chấp nhận hợp lệ mới tạo membership CTV active; xem link hoặc đăng nhập chưa cấp quyền. Từ đúng hạn 7 ngày, lời mời không chấp nhận được. Nếu user đã là CTV active của shop khác, không tạo membership thứ hai; sau khi rời shop cũ, cần lời mời còn hạn để tham gia shop mới. Hai lời mời/chấp nhận cạnh tranh phải bảo đảm một CTV chỉ có một shop active.

Chủ shop có thể hủy lời mời còn chưa được chấp nhận. Hủy chuyển invitation sang cancelled và vô hiệu link/token cũ ngay; người nhận bấm Chấp nhận sau đó bị từ chối dù vẫn trong 7 ngày. Nếu hủy và chấp nhận đồng thời, chỉ một kết quả thắng dưới cùng khóa/trạng thái invitation. Hủy lời mời đã accepted không dùng để tước quyền CTV; trường hợp đó đi luồng ngừng hợp tác CTV. Không tự gửi lại lời mời khi hủy; nếu cần mời tiếp, chủ shop thực hiện lời mời mới. Mỗi shop/Gmail chỉ có một lời mời còn hiệu lực; shop khác vẫn có thể mời cùng Gmail. Chấp nhận một shop làm các lời mời khác hết hiệu lực. CTV quay lại shop cũ phải nhận và chấp nhận lời mời mới.

## Request CTV khi giá đổi trước duyệt

CTV tạo request cho một máy với giá CTV đang hiển thị và số tiền CTV đề xuất; không nhập thông tin khách và chưa giữ máy. Shop reseller làm việc trực tiếp với CTV để lấy tên/liên hệ/địa chỉ khách nếu cần giao dịch; request CTV không là hồ sơ khách hoặc đơn web. Nếu chủ shop quản lý CTV chưa duyệt mà giá CTV của máy đổi, request cũ chuyển `pending_owner_approval → pending_ctv_reconfirmation`, ghi giá cũ/mới và `reconfirm_expires_at = thời điểm đổi giá + 12 giờ`; báo CTV. Chủ shop không thể duyệt request cũ, kể cả màn hình chưa tải lại. Không gửi request tới shop nguồn từ việc giá đổi.

CTV muốn tiếp tục phải xem giá mới, nhập số tiền đề xuất cho request mới rồi bấm Gửi request lại trước `reconfirm_expires_at`. Request cũ kết thúc ở trạng thái superseded; request mới chụp giá hiện hành, chuyển `pending_owner_approval` và lúc đó mới báo chủ shop quản lý CTV. Chủ shop kiểm tra giá hiện hành và tồn kho khi duyệt; nếu giá lại đổi trước khi duyệt, lặp bước xác nhận của CTV. Nếu CTV không gửi lại trước mốc 12 giờ, request cũ chuyển expired và biến khỏi danh sách việc cần xử lý, nhưng giữ lịch sử. Từ đúng deadline không gửi lại được từ request cũ; muốn tiếp tục thì tạo request mới từ đầu.

Nếu giá đổi thêm khi request còn `pending_ctv_reconfirmation`, cập nhật giá hiển thị mới nhất và đặt lại `reconfirm_expires_at` từ lần đổi mới nhất; chỉ một lần gửi lại hợp lệ từ request đó. Request đã expired trước lần đổi mới không sống lại. Khi hàng resell đang chờ B treo lại, ẩn hàng với CTV và chặn tạo/gửi lại request; sau khi B treo lại hợp lệ, CTV mới được tiếp tục nếu request vẫn còn trong hạn, hoặc tạo request mới nếu đã expired.

Giá bán B của đúng máy là mốc tính giá CTV cho cả hàng B sở hữu và hàng resell. Khi B đổi giá, tính `ctv_new = ctv_old + (B_new − B_old)`; với hàng resell, áp dụng sàn giá nguồn A sau tính. Nguồn A đổi giá làm bản treo B chờ treo lại thì chưa dùng giá nguồn mới làm mốc CTV; chỉ khi B treo lại và giá B mới được chốt mới tính giá CTV mới. Ghi version giá để thao tác duyệt request không dùng nhầm giá trước/sau đổi.

Chủ shop quản lý CTV duyệt trước; nếu là máy resell cần lấy để giao dịch ngoài web, chủ shop mới gửi request tới shop nguồn theo luồng giữ máy riêng. Hai mốc 12 giờ xác nhận lại và 12–72 giờ giữ máy khác nhau; request CTV chờ xác nhận lại không chiếm tồn kho hoặc phát sinh phí. Thay giá và chủ shop duyệt đồng thời phải khóa/kiểm tra version để chỉ một trạng thái thắng.

Request `pending_owner_approval` tự hết hiệu lực từ đúng 24 giờ sau lúc tạo hoặc gửi lại nếu chưa duyệt, kể cả worker chạy chậm; máy sold trước đó thì kết thúc request ngay. Request chưa giữ máy. Mốc 24 giờ không thay mốc 12 giờ để CTV gửi lại sau đổi giá.

## Chủ shop ngừng hợp tác với CTV

Chỉ chủ shop quản lý CTV được kết thúc membership. Hệ thống trước tiên kiểm tra giao dịch đã duyệt/đang mở; nếu còn thì từ chối toàn bộ thao tác, không hủy request nào. Nếu không còn, trong cùng transaction kết thúc membership và chuyển các request CTV chưa được chủ shop duyệt, gồm `pending_owner_approval` và `pending_ctv_reconfirmation`, sang cancelled; request rời danh sách xử lý, giữ lịch sử và báo CTV sau commit. Việc này không tạo request nguồn, hold hoặc phí. Request chưa duyệt không buộc chủ shop phải chờ đủ hạn 12 giờ xác nhận lại giá.

Nếu có request/đơn đã được chủ shop duyệt, request tới nguồn, hold hoặc đơn giao dịch đang mở gắn với CTV, chủ shop phải xử lý xong bằng các bước hoàn tất/hủy hợp lệ trước khi kết thúc membership. Nút ngừng hợp tác không tự đảo trạng thái giao dịch đã duyệt. Sau khi kết thúc, CTV mất quyền tạo request mới và quyền xem nguồn hàng shop cũ theo membership, được tham gia shop khác; lịch sử không bị xóa. Thao tác ngừng hợp tác tranh với tạo/gửi lại/duyệt request phải khóa và kiểm tra membership/request để không có request mới còn mở sau khi kết thúc.

CTV đã rời chỉ được đọc lịch sử request/giao dịch của chính mình theo snapshot, không thấy hàng/giá hiện tại, giá hoặc danh tính nguồn và lịch sử CTV khác. Không tự phục hồi membership cũ nếu quay lại shop.

## Nạp số dư chợ

Số dư phí chợ của shop được nạp bằng lượt nạp riêng: shop chọn nạp, hệ thống tạo mã tham chiếu/QR chuyển tiền vào tài khoản nhận của nền tảng. QR chỉ là hướng dẫn chuyển khoản; lượt nạp chờ xác nhận cho tới khi webhook ngân hàng/bên kết nối được xác thực và đối chiếu đúng lượt/shop, tài khoản nhận, số tiền. Khi khớp, cộng số dư và ghi lịch sử một lần trong cùng transaction; webhook trùng không cộng thêm. Nếu chuyển thiếu mã hoặc sai số tiền, không tự cộng: shop nhắn riêng admin, admin kiểm tra giao dịch thực nhận và đúng shop rồi cộng thủ công một lần, lưu người thao tác, thời điểm và giao dịch gốc. Webhook đến sau phải nhận ra giao dịch đã cộng thủ công và không cộng thêm. Tại số dư từ `0đ`, tự gỡ lý do ẩn vì nợ phí cho tin resell còn đủ điều kiện. Luồng này tách khỏi QR cọc COD của khách chuyển thẳng cho shop bán; liên hệ riêng admin không bắt buộc là một tính năng nhắn tin mới trong website.

## Đơn khách web và COD

Giao dịch web không cần nguồn duyệt từng đơn. Khi khách chọn trả đủ hoặc COD, kiểm tra quan hệ active, quyền treo, giá/tồn kho rồi khóa đúng item nguồn và ghi giá khách cần trả từ giá bán hiện hành của shop bán. Trả đủ tạo đơn chờ thanh toán; COD chỉ tạo lượt chờ cọc, chưa phải đơn. Sau khi cọc COD được xác nhận hợp lệ trong hạn, tạo đơn COD và chuyển quyền khóa máy từ lượt chờ sang đơn trong cùng giao dịch nhất quán. Giá không tự thay theo niêm yết mới; khóa máy chưa chứng minh đã thanh toán hoặc bán máy. Online lock và hold theo thời hạn đã chốt tranh cùng item, nhưng không có chung expiry; worker giữ không được giải phóng hàng đang giao.

Lượt chờ cọc COD có QR chứa thông tin chuyển tiền và mã tham chiếu riêng của lượt; tiền đi tới tài khoản shop đứng bán. Bên cung cấp gửi webhook khi ghi nhận giao dịch, server xác thực nguồn tin và đối chiếu mã lượt, tài khoản nhận, số cọc, thời hạn/hiệu lực giữ máy trước khi tạo đơn. QR/ảnh thanh toán/nút khách bấm không tự xác nhận cọc; webhook lặp chỉ được xử lý một lần. Tại hoặc sau hạn mà server chưa xác nhận hợp lệ, lượt chờ mất quyền giữ máy. Webhook đến sau khi lượt đã hết hạn không tự tạo đơn, giữ máy hoặc trừ phí, kể cả giao dịch tiền có thời điểm trước hạn; khách tự nhắn shop bán để xử lý khoản cọc ngoài website.

| Tác nhân/điều kiện | Chuyển đơn | Tồn kho |
| --- | --- | --- |
| Thanh toán đủ được xác nhận hợp lệ | Đã mua; fulfillment theo dõi riêng | sold, không mở lại bằng luồng COD; nếu bán máy nguồn qua reseller thì trừ phí B 50.000đ một lần |
| Khách chọn COD, chưa xác nhận cọc | Lượt chờ cọc, chưa có đơn COD | Giữ đúng máy tối đa 15 phút từ lúc khách chọn COD theo giờ DB, chưa sold; không cho A gửi |
| Lượt chờ cọc đủ 15 phút chưa xác nhận cọc | Lượt chờ hết hạn, không tạo đơn | Giải phóng item chưa sold cho giao dịch mới ngay cả khi worker chậm; không tự chiếm lại máy bằng lượt cũ |
| Cọc được xác nhận hợp lệ trước hạn | Tạo đơn COD Chờ giao hàng | Chuyển quyền khóa sang đơn, chưa sold; A được chuẩn bị gửi; chỉ đơn reseller bán máy nguồn trừ phí B 50.000đ |
| Bên giao thực tế bàn giao vận chuyển; đơn COD resell là shop nguồn A | Đang vận chuyển | Tiếp tục khóa |
| Chủ shop xác nhận COD thành công | Đã mua | sold |
| Shop nguồn A nhấn Giao không thành công | Đóng đơn thất bại | Giải phóng item chưa sold; tin còn active thì máy xuất hiện lại trên sàn, giữ ID/lịch sử |

Không tự kết luận theo số ngày. Nút Giao không thành công chỉ shop nguồn A có quyền; A tự chọn lúc nhấn, website không yêu cầu chứng cứ máy đã về tay. Giao diện cảnh báo khuyên A đợi hàng quay về trước khi nhấn vì máy có thể nhận đơn mới ngay. Cập nhật đơn và giải phóng khóa máy chưa sold trong cùng transaction, không cho worker/callback về sau đảo kết quả hoặc mở máy sold. Nếu tin đang ẩn/hết hạn thì máy available nhưng vẫn không tự hiện tin; cần tin đủ điều kiện hiển thị mới xuất hiện trên sàn. Khoản cọc COD thất bại do A/B tự xử lý ngoài website; website không quyết định giữ/hoàn. Chi tiết nghiệp vụ WEB-01..04 ở [yêu cầu](2_requirements.md), hợp đồng ở [API](8_api-contracts.md).

Với đơn COD resell thất bại, hệ thống hoàn đúng khoản phí 50.000đ đã trừ cho B một lần và báo B trạng thái đơn. Khi A đã đưa tin máy chưa sold lên chợ lại, B nhận thông báo hỏi có muốn treo lại trên website B không; B quyết định có/không, không tự treo lại. Bản treo B và hàng CTV thuộc B vẫn ẩn trước khi B chọn treo lại hợp lệ. Đơn thất bại không mất phí; nếu về sau phát sinh đơn COD mới có cọc hợp lệ, trừ phí mới theo FEE-02. Máy chưa sold nên không cần tạo item mới như trường hợp khách trả máy sau đơn bán thành công.

Cọc COD đến sau 15 phút không tự tạo đơn từ lượt chờ đã hết hạn hoặc tự giữ máy. Khách và shop tự xử lý khoản cọc ngoài website; website không tạo quy trình yêu cầu riêng cho tình huống này. Nếu muốn tiếp tục mua bán qua website, phải tạo giao dịch mới khi máy còn bán được; giao dịch mới tuân theo quy tắc khóa tồn kho/giá hiện hành. COD được cọc đúng hạn tạo đơn Chờ giao mà không cần nguồn duyệt từng đơn.

Với hàng nguồn A treo trên website reseller B, đơn đã trả đủ có thể do A hoặc B giao trực tiếp cho khách theo thỏa thuận giữa hai shop cho từng đơn. Lượt chờ cọc COD cho B kéo dài tối đa 15 phút từ lúc khách chọn COD; cọc xác nhận trong hạn mới tạo đơn, sau đó A mới được gửi. Mức cọc lấy cấu hình shop B và không vượt 10% giá máy, phải nhỏ hơn chênh lệch giá B tự kê − giá nguồn A; phí chợ 50.000đ không trừ vào chênh lệch này. Snapshot giá máy P, giá nguồn S và cọc D từ lượt chờ được dùng cho đơn COD; kiểm tra giới hạn ở server, không tin số cọc client. A gửi và nhận khoản COD `P − D`. Chỉ chuyển Đang vận chuyển sau khi A đã bàn giao thực tế. Lượt chờ chưa xác nhận cọc không được coi là đơn, Đã mua hoặc sold. Khi A xác nhận giao thành công, máy sold; chênh lệch cần đối soát về mặt số học là `P − S − D`: luôn dương với cọc hợp lệ, A chuyển B. Website hiển thị số A cần chuyển B; A chuyển ngoài website rồi bấm “Đã chuyển” để hoàn tất đối soát của đơn. Không cần B xác nhận; nút bấm ghi lời xác nhận của A, không xác thực tiền ngân hàng. Không có hạn chuyển cố định; trạng thái chờ A bấm “Đã chuyển” không tự hết hạn. Không yêu cầu ảnh biên lai/chứng từ khi bấm “Đã chuyển”. Khi A xác nhận giao thất bại, khoản cọc do A/B tự xử lý ngoài website; phí vận chuyển/hoàn hàng do A làm việc ngoài website theo quy định chợ. Đề xuất lưu bên giao đơn trả đủ để kiểm tra quyền/audit, nhưng cách ghi thỏa thuận chưa chốt.

Phí chợ 50.000đ chỉ thu từ reseller B bán máy nguồn A; shop bán máy tự sở hữu không chịu phí. Với đơn trả đủ trên web B, trừ phí khi thanh toán đủ được xác nhận và đơn chuyển Đã mua. Với COD trên web B, trừ khi webhook cọc hợp lệ tạo đơn; nguồn A nhấn Giao không thành công thì cộng lại đúng khoản đã trừ cho B một lần. Lượt chờ cọc chưa thành đơn không chịu phí. Với request/giữ theo thời hạn đã chốt của B hoặc CTV thuộc B để giao dịch bên ngoài, chỉ trừ khi A xác nhận chốt thành công trong hạn; request và xác nhận giữ chưa chịu phí. Khi số dư B chạm `−100.000đ` hoặc thấp hơn, tạm ẩn sản phẩm B đang resell và chặn đơn web mới từ chúng, còn đơn đã tạo vẫn xử lý được. Đơn trả đủ đã tạo, QR COD đã phát và request lấy máy của reseller/CTV đã gửi trước lúc chạm ngưỡng vẫn xử lý theo hạn riêng: thanh toán/cọc hợp lệ hoặc nguồn duyệt request cũ rồi chốt hold trong thời hạn của lượt giữ thì chuyển trạng thái và trừ phí dù số dư thành `−150.000đ` hoặc thấp hơn; không hủy giao dịch đã mở vì số dư. Ngay khi chạm ngưỡng, chặn giao dịch resell mới; xử lý xong giao dịch cũ vẫn giữ sản phẩm resell ẩn cho tới khi số dư đạt lại `0đ`. COD sau đó đi luồng giao/thành công/thất bại như thường. Khi số dư B tăng lên từ `0đ` sau khoản nạp/hoàn phí đã xác nhận, tự bỏ lý do ẩn vì nợ phí và cho nhận đơn web mới trên những tin resell vẫn đủ điều kiện hiển thị; nếu còn âm, kể cả `−50.000đ`, tiếp tục ẩn. Không tự bật tin bị ẩn vì nguồn đổi giá, shop chủ động ẩn, hết hạn hoặc máy đã bán. Phí tách khỏi cọc khách và đối soát A-B. Cần chốt chi tiết đối soát số dư và chi tiết tích hợp nạp.

Mỗi kỳ gói tháng bắt đầu lúc khoản thanh toán gói của shop được xác nhận và kết thúc đúng cùng giờ/ngày tháng tiếp theo; nếu thiếu ngày thì lấy ngày cuối tháng. Không tính 30 × 24 giờ hoặc gom mọi shop vào một tháng lịch. Chỉ nhận gia hạn từ đúng lúc kỳ hiện tại hết hạn. Shop chọn gói và nhận QR chuyển tiền vào tài khoản chợ gắn đúng lượt thanh toán; QR/ảnh chuyển tiền không mở quyền. Webhook ngân hàng được xác thực, đối chiếu lượt/shop/số tiền/tài khoản nhận rồi ghi nhận thanh toán một lần và bắt đầu kỳ mới tại thời điểm xác nhận. Nếu chuyển thiếu/sai mã, sai số tiền hoặc webhook không đến, shop nhắn riêng admin. Admin kiểm tra giao dịch ngân hàng thực nhận, đúng shop và đủ tiền gói, rồi xác nhận thủ công một lần; lưu định danh giao dịch để webhook đến sau không kích hoạt trùng. Khoản chưa đủ tiền gói không mở quyền; cách xử lý phần tiền dư còn mở. Khoản mua gói không cộng hoặc trừ số dư phí reseller 50.000đ; QR này khác lượt nạp số dư WAL-01. Gói chợ hết hạn là cổng quyền độc lập với số dư phí reseller: nguồn A hoặc shop bán B hết gói thì máy/bản treo liên quan ngừng nhận đơn/request mới. Chủ shop và CTV của shop hết gói chỉ thấy yêu cầu gia hạn cùng các giao dịch đã mở cần xử lý. Đơn/QR/hold/request đã tạo trước hạn tiếp tục theo thời hạn và quyền của chính giao dịch đó; xác nhận thành công/thất bại/hủy hợp lệ vẫn được phép, không tự reset vì hết gói. Khi gia hạn hợp lệ, bỏ lý do ẩn do gói hết hạn; tin chỉ hiện nếu tồn kho, hạn tin, quan hệ hợp tác, giá và các lý do ẩn khác đều hợp lệ.

Shop được admin duyệt lần đầu bắt đầu 14 ngày trải nghiệm gói chợ từ chính thời điểm duyệt, đồng thời được cộng một lần số dư phí chợ 100.000đ. Duyệt lại/nộp lại cùng shop hoặc retry không cấp lại kỳ thử hoặc khoản tặng. Trong kỳ thử, quyền chợ/CTV như gói chợ đang hiệu lực và reseller bán hàng nguồn vẫn chịu phí 50.000đ từ số dư đó. Khoản tặng không hết hạn theo 14 ngày; hết kỳ thử mà chưa thanh toán gói tháng thì khóa việc mới, giữ xử lý giao dịch cũ theo quy tắc hết gói. Gói website mẫu không nằm trong quyền dùng thử chợ.

Admin tạm khóa shop approved là cổng quyền riêng: từ thời điểm khóa, chặn việc mới của shop/CTV và ngừng nhận đơn/request mới trên hàng nguồn của shop, gồm các bản treo trên website reseller; shop/reseller khác và hàng không liên quan giữ quyền theo điều kiện riêng. Đơn, QR, request và hold đã tạo trước lúc khóa tiếp tục theo trạng thái/thời hạn cũ, các bên có quyền vẫn hoàn tất, báo thất bại hoặc hủy. Kỳ trải nghiệm 14 ngày và gói chợ/website mẫu đã trả còn hạn tại thời điểm khóa giữ nguyên thời gian sử dụng còn lại: lưu mốc khóa; khi admin mở khóa, cộng đúng thời lượng khóa vào `expires_at` từng kỳ/gói. Nhiều lượt khóa cộng từng khoảng một lần, không tính trùng; kỳ/gói đã hết trước lúc khóa không được bù. Mở khóa bởi admin chỉ gỡ lý do tạm khóa; hàng phải còn đủ điều kiện gói, tồn kho, tin, giá và hợp tác mới hiện lại. Không cấp lại số dư tặng khi mở khóa.

Admin ẩn riêng tin nguồn vi phạm là cổng kiểm duyệt theo listing/item, không phải khóa toàn shop hay thao tác nguồn ngừng hợp tác với từng reseller. Khi admin ẩn, lưu lý do ẩn riêng và làm tin nguồn cùng tất cả bản treo đang tham chiếu item đó ngừng nhận đơn/request mới; shop nguồn và từng reseller đang treo được thông báo từ sự kiện sau commit, không phát trùng khi retry. Đơn, QR, request và hold đã mở trước lúc ẩn tiếp tục xử lý theo hạn/giá snapshot. Tin khác của nguồn, hàng khác trên website reseller vẫn hoạt động. Chỉ shop nguồn sửa nội dung tin theo các giới hạn sửa đã chốt rồi bấm Gửi xét duyệt lại để tạo một lượt chờ admin xem đúng phiên bản tin vừa gửi; admin không sửa tin/máy hộ shop. Shop sửa tiếp trong lúc chờ thì lượt gửi cũ không thể được duyệt; cần gửi lại phiên bản mới. Admin chấp nhận hoặc từ chối; từ chối giữ cờ ẩn và cho shop sửa/gửi lại, chấp nhận mới gỡ cờ. Sau khi gỡ, tin/bản treo chỉ hiện nếu còn đủ điều kiện khác; sửa giá/thông tin quan trọng vẫn yêu cầu reseller treo lại theo quy tắc cũ.

Gói website mẫu được kiểm tra riêng theo shop đứng website. Hết hạn thì website của shop tạm ngừng hiển thị hàng và nhận đơn/QR mới, kể cả hàng shop sở hữu hoặc hàng nguồn treo lại; website và tin chợ của shop khác không bị ảnh hưởng. Shop còn gói chợ tiếp tục dùng chợ, nguồn hàng và CTV. Đơn trả đủ, lượt chờ cọc COD, đơn COD và các giao dịch website đã mở trước hạn vẫn chạy theo quyền/thời hạn sẵn có, kể cả webhook thanh toán đến đúng hạn hoặc xác nhận giao thành công/thất bại. Gia hạn website được xác nhận chỉ gỡ cờ ngừng do gói website; các điều kiện gói chợ, tồn kho, giá và tin vẫn áp dụng.

WEB-02: đơn trả đủ có `payment_deadline_at = created_at + 15 phút` theo giờ DB. Chỉ xác nhận thanh toán tự động khi đã kiểm chứng tiền hợp lệ và thời điểm xử lý còn trước deadline. Tại hoặc sau deadline chưa xác nhận tiền, đơn mất quyền giữ máy ngay; worker chạy trễ không kéo dài khóa, máy đủ điều kiện được mở cho giao dịch mới. Nếu khoản tiền đến sau hạn, không tự chuyển đơn sang Đã mua. Khách nhắn riêng shop bán để đối chiếu và thỏa thuận giá/cách xử lý; website không tự chọn giá đơn cũ hay giá hiện tại. Sau thỏa thuận, shop kiểm tra và khóa lại máy trong transaction trước khi xác nhận thủ công. Nếu máy đã sold hoặc bị một hold/đơn khác chiếm, không xác nhận đơn cũ; khách nhắn riêng shop đã nhận tiền để shop hoàn ngoài website, chợ không can thiệp hoặc ghi trạng thái hoàn tiền; không hủy giao dịch mới để ưu tiên tiền đến muộn. Giá khi tiền đến muộn do khách/shop thỏa thuận riêng, việc hoàn tiền khi máy không còn do shop nhận tiền xử lý ngoài website; deadline này không áp cho COD.

# Màn hình và hành vi giao diện

Trạng thái: đặc tả tương tác đề xuất, chưa phải thiết kế hình ảnh được duyệt. Giao diện hiện có chỉ gồm đăng ký/đăng nhập, trạng thái shop và hàng đợi admin trong apps/frontend.

## Điều hướng đề xuất

Khách → đăng nhập/đăng ký. Shop pending/rejected → trạng thái hồ sơ. Shop approved → tổng quan, chợ, hàng của tôi, hội thoại, lượt giữ, thông báo, hồ sơ. Admin → xét duyệt; các trang vận hành khác chỉ mở sau khi quyền được chốt. Thiết kế điều hướng bản chính thức có website, CTV và đơn online; chỉ mở chức năng cho người dùng khi đã triển khai và nghiệm thu.

Mọi trang kiểm tra quyền phía server. Ẩn menu không thay thế kiểm soát truy cập. Refresh URL sâu và hết phiên phải dẫn về màn hình phù hợp, không để dữ liệu shop trước còn hiển thị khi đổi tài khoản.

## Đặc tả màn hình

| ID | Màn hình | Nội dung và thao tác | Trạng thái cần xử lý |
| --- | --- | --- | --- |
| UI-01 | Đăng ký tài khoản | Nút Tiếp tục bằng Google hoặc Gmail/mật khẩu/nhập lại; hướng dẫn mật khẩu 12–200 ký tự, không bắt tổ hợp ký tự; không nhập hồ sơ shop tại đây; cách mật khẩu có bước Kiểm tra Gmail và xác minh để kích hoạt | Hai mật khẩu không khớp, chờ xác minh/link không hợp lệ hoặc hết 10 phút; hướng dẫn gửi lại sau khoảng chờ 60 giây, chỉ dùng email/link mới nhất; nút gửi lại hiển thị thời gian còn lại và thời điểm gửi tiếp khi chạm hạn 5 email/60 phút, hủy Google, Gmail đã có tài khoản cần liên kết, lỗi mạng |
| UI-02 | Đăng nhập | Google hoặc Gmail/mật khẩu của cùng tài khoản sau liên kết; user chưa có shop đi tới bước hồ sơ riêng | Sai thông tin, Google chưa liên kết, hạn chế tần suất, hết phiên |
| UI-13 | Nộp hồ sơ shop | Sau khi có tài khoản mới nhập năm trường, nộp để bắt đầu 30 ngày chờ duyệt | Thiếu trường, chưa nộp, gửi lỗi/trùng; không tự có quyền giao dịch |
| UI-14 | Liên kết phương thức đăng nhập | Gmail trùng tài khoản mật khẩu thì yêu cầu đăng nhập để liên kết Google; Google-only có thiết lập mật khẩu trong tài khoản | Sai mật khẩu/hủy không liên kết, tài khoản đã liên kết, trạng thái xác thực |
| UI-15 | Quên mật khẩu | Nhập Gmail đã xác minh để nhận link; mở link hợp lệ, nhập mật khẩu mới và nhập lại | Tài khoản phải có mật khẩu; link reset hết 10 phút, gửi lại chờ 60 giây hoặc quota 5 email reset/60 phút; chỉ dùng link reset mới nhất; mật khẩu sai quy tắc/không khớp; sau thành công báo mọi phiên ứng dụng đã bị đăng xuất và chuyển tới đăng nhập, không tự đăng nhập; phản hồi gửi mail không tiết lộ tài khoản |
| UI-03 | Trạng thái hồ sơ | Tên shop, pending/approved/rejected; lý do từ chối theo quyền | Chưa có lý do, chờ duyệt; nút nộp lại chỉ sau DEC-01 |
| UI-04 | Admin xét duyệt | Danh sách phân trang, hồ sơ năm trường, nhận xét tham khảo, ghi chú, duyệt/từ chối | Không có hồ sơ, đang tải thêm, quyết định đã bị người khác thay đổi |
| UI-05 | Chợ | Tìm mẫu, lọc được duyệt, khu vực, giá; thẻ máy hoặc nhóm mẫu có nhãn rõ | Không có kết quả, lỗi tải, cursor hết, tin vừa hết hạn |
| UI-06 | Chi tiết máy | Ảnh thật, đủ tình trạng, giá chính xác, shop nguồn, trạng thái, hỏi hàng/xin giữ khi được phép | Held/sold/expired/hidden; dữ liệu thay đổi sau khi mở |
| UI-07 | Hàng của tôi | Danh sách máy/tin, trạng thái máy và tin tách biệt; mục Đang bán/Đang giữ/Đã bán; tạo/sửa/ẩn/đánh dấu bán | Không có hàng, lọc trạng thái, đang giữ, hết hạn cần gia hạn tin |
| UI-08 | Soạn tin | Các trường CAT-01, upload ảnh có tiến độ, xem trước; lưu nháp/xuất bản | Thiếu trường, media lỗi, conflict version, chưa approved |
| UI-09 | Hội thoại | Hai shop, máy/snapshot, tin phân trang, văn bản/ảnh/tệp; khu vực giữ hàng riêng | Offline, reconnect, upload bị từ chối, gửi chưa rõ kết quả |
| UI-10 | Lượt giữ | Tôi xin giữ / khách shop đang giữ; máy, giá chốt, mốc hết hạn, trạng thái và thao tác đúng quyền | Chờ xác nhận, hết hạn, hủy kèm lý do, hoàn tất cạnh tranh |
| UI-11 | Thông báo | Sự kiện, thời điểm, liên kết tài nguyên, đánh dấu đọc | Tin đã xóa, không còn quyền, sự kiện trùng |
| UI-12 | Hồ sơ và thành viên | Hồ sơ shop; chủ shop nhập Gmail mời CTV, xem trạng thái/hạn 7 ngày và nút Hủy lời mời chưa chấp nhận; xem CTV, request chưa duyệt, giao dịch đang mở và nút Ngừng hợp tác với CTV. Người được mời đăng nhập/đăng ký đúng Gmail rồi bấm Chấp nhận | Gmail không khớp, lời mời hủy/hết hạn/đã dùng, user đã thuộc shop khác thì không cấp quyền; hủy lời mời đã accepted không thay thao tác ngừng hợp tác; khi còn giao dịch đã duyệt/hold/đơn mở, chỉ rõ việc cần xử lý trước khi ngừng hợp tác |
| UI-16 | Request của CTV | CTV chọn máy, xem giá CTV và nhập số tiền đề xuất khi tạo/gửi lại; không có ô tên, số điện thoại hoặc địa chỉ khách. Chủ shop quản lý CTV xem request chờ duyệt, giá tại lúc tạo và giá hiện hành; trao đổi thông tin khách trực tiếp với CTV khi cần | Giá đổi trước duyệt: request cũ hiện Chờ CTV xác nhận lại và không có nút duyệt cho chủ shop; CTV thấy giá mới, hạn 12 giờ, ô số tiền và nút Gửi request lại; hết hạn rời danh sách đang xử lý, giữ lịch sử |

## Quy tắc hiển thị cần giữ

- Trang đặt mua hiển thị đúng máy và giá khách cần trả trước khi xác nhận; trả đủ tạo đơn chờ thanh toán, chọn COD tạo lượt chờ cọc chưa phải đơn. Màn hình lấy giá đã ghi trên server; giá niêm yết đổi sau không sửa giá giao dịch đang giữ máy. Lượt chờ cọc không được hiển thị như đơn COD đã tạo/đã bán.
- Đơn trả đủ hiển thị hạn thanh toán 15 phút từ lúc tạo; màn hình chờ cọc COD hiển thị hạn 15 phút từ lúc khách chọn COD, đều theo thời gian server. Tại hoặc sau hạn mà khoản tương ứng chưa được xác nhận, màn hình tải lại trạng thái quá hạn và báo máy không còn được giữ. Đồng hồ client chỉ để hiển thị; đơn COD tạo sau xác nhận cọc không chịu hạn chờ cọc này.
- Màn hình chờ cọc hiển thị QR riêng của lượt, số cọc, shop/tài khoản nhận và mã tham chiếu để khách kiểm tra trước khi chuyển. Sau khi webhook hợp lệ được server xử lý, màn hình tự cập nhật sang đơn COD Chờ giao; ảnh chuyển khoản hoặc nút “đã chuyển” không tự tạo đơn. Nếu webhook chậm, hiển thị trạng thái đang chờ xác nhận, không báo thành công theo đồng hồ hoặc thao tác khách.
- Lượt chờ cọc quá hạn hiển thị đã hết hiệu lực và máy không còn được giữ; không hiển thị như đơn COD bị hủy. Không có nút hoặc màn hình riêng để xử lý cọc đến muộn; website không báo đã tạo đơn theo khoản cọc ngoài hạn.
- Nhãn khoảng giá ghi rõ theo mẫu của shop; mở máy mới dùng một giá chính xác. Không đặt nút giữ hàng trực tiếp trên khoảng giá.
- Hiển thị giá đã chốt của lượt giữ. Khi hold đã xác nhận còn hiệu lực, khóa ô/nút sửa giá máy nguồn và nêu lý do; API vẫn kiểm tra nếu gửi trực tiếp hoặc màn hình đã cũ. Hủy/hết hạn thì tải lại trạng thái để mở sửa nếu máy chưa bán.
- Đồng hồ đếm ngược chỉ hỗ trợ hiển thị; server quyết định còn hạn. Khi tab hoạt động lại hoặc reconnect phải đồng bộ thời gian/trạng thái.
- Trạng thái gửi tin đề xuất: đang gửi, đã lưu, gửi lỗi/chưa xác định. Không hiển thị “đã đọc” khi chưa có hợp đồng read receipt.
- Tệp hiển thị tên, loại và dung lượng; link tải kiểm tra quyền. Không render HTML tin nhắn hoặc mở nội dung tải lên như HTML cùng origin.
- Hủy giữ mở biểu mẫu lý do và nêu hệ quả; tính bắt buộc theo DEC-08. Không dùng hộp nhập này làm cơ chế thương lượng giá.
- Màn hình hết hạn tin nêu thời hạn được gia hạn và hậu quả quá hạn; lịch sử hội thoại vẫn tìm được theo chính sách đã duyệt.

## Tương tác và tiếp cận

Form có label, thông báo lỗi gắn trường và lỗi tổng; focus chuyển đến lỗi thích hợp. Button có trạng thái đang gửi; chống double click nhưng server vẫn idempotent. Modal dùng bàn phím, giữ/trả focus. Trạng thái không chỉ dùng màu. Ảnh có mô tả phù hợp; bảng/danh sách dùng được trên điện thoại. Giữ dữ liệu nhập khi lỗi; không giữ mật khẩu sau logout hoặc ghi vào storage/log.

Thông báo lỗi có cách xử lý: đăng nhập lại, tải bản mới khi conflict, sửa trường, thử lại có kiểm soát. Với tài nguyên không còn quyền, xóa nội dung nhạy cảm khỏi view. Empty state phân biệt chưa có dữ liệu và không có kết quả lọc.

## Review giao diện trước triển khai

Duyệt luồng UI-01 → UI-04 → UI-08 → UI-06 → UI-09 → UI-10; kèm biến thể pending, từ chối, mất mạng và tranh chấp trạng thái. Chốt nội dung trường/enum, vị trí hiển thị thông tin liên hệ, quyền chi tiết CTV/phí tháng. Chưa chốt màu sắc, thương hiệu hoặc bố cục chi tiết trong nhiệm vụ docs này.

## Mục Đã bán

Trong Hàng của tôi, mục Đã bán là bộ lọc trạng thái sold, không thêm category mới. Hiển thị mã máy, mẫu, tình trạng tại bán, thời điểm bán và liên kết lịch sử theo quyền. Không có nút Mở bán lại/Gia hạn tin/Treo lại hoặc sao chép thành cùng máy đang bán. Trang chi tiết lịch sử gắn nhãn Đã bán; không có nút hỏi mua/xin giữ mới. Máy khác cùng mẫu phải tạo đơn vị hàng riêng, không ghi đè hồ sơ máy đã bán. Việc hiện danh sách đã bán cho shop khác/khách lẻ chưa được chốt.

## Website/COD và ngừng hợp tác

Chủ nguồn có nút Ngừng hợp tác ở hồ sơ reseller, không có nút ẩn riêng từng máy trên website reseller. Khi còn request/đơn/hold/giao/hoàn mở, server chặn và UI chỉ rõ các việc cần xử lý. Sau ngừng, bản treo không nhận đơn mới; lịch sử giữ nguyên.

Trang đơn tách Đã mua khỏi trạng thái giao hàng: trả đủ xác nhận là Đã mua, không tự ghi đã giao. Với hàng reseller bán, đơn trả đủ cần thể hiện A/B đã thống nhất bên nào giao theo từng đơn. COD trên web B hiển thị cọc khách trả B, không vượt 10% giá máy và nhỏ hơn phần lời B; khi B bán bằng giá nguồn thì không có tùy chọn COD; hiển thị riêng tiền còn lại A thu COD. Lượt Chờ cọc là màn hình trước đơn; sau xác nhận cọc mới hiển thị đơn COD Chờ giao hàng → Đang vận chuyển → Thành công/Đã mua hoặc Giao không thành công. Chưa có đơn COD thì không cho ghi A đã gửi. Trước nút Giao không thành công của nguồn A, hiện cảnh báo: “Nên đợi máy về tay rồi mới xác nhận giao không thành công. Máy sẽ được mở bán lại và có thể có khách đặt khi hàng chưa sẵn.” Đây là lời khuyên, không yêu cầu bằng chứng máy đã về; A nhấn thì đóng đơn và đưa máy chưa sold trở lại sàn nếu tin còn hiển thị. Không có nút đưa máy sold trở lại. Màn hình nêu rõ A/B tự xử lý cọc giao thất bại, website không phân xử/hoàn cọc. Sau giao thành công, màn hình đối soát A/B hiển thị số A cần chuyển B và nút “Đã chuyển” cho A.

Sau khi COD thành công, màn hình A/B cần hiển thị giá bán, giá nguồn, cọc B đã nhận, tiền COD A thu và số tiền A cần chuyển B. Công thức `P − S − D` dương và là khoản A chuyển B với cọc hợp lệ. Sau khi A chuyển ngoài website, A bấm “Đã chuyển”; màn hình A/B hiển thị đối soát hoàn tất và thời điểm A xác nhận. B không có nút xác nhận. Nút này không phải bằng chứng ngân hàng đã chuyển tiền; không có hạn chuyển hoặc bộ đếm quá hạn; không có trường tải ảnh biên lai cho nút này.

Màn hình reseller hiển thị phí chợ 50.000đ và số dư B theo đúng mốc: COD web sau xác nhận cọc/tạo đơn, trả đủ web sau xác nhận thanh toán, giao dịch lấy hàng ngoài web sau khi nguồn A xác nhận chốt thành công trong hạn giữ theo thời hạn đã chốt. Shop tự bán máy của mình không chịu phí; lượt chờ cọc và request/giữ chưa thành công không hiện phí đã trừ. Khi số dư B chạm `−100.000đ` hoặc thấp hơn, sản phẩm resell tạm ẩn và không nhận đơn web mới; đơn đã tạo vẫn hiện để xử lý. Đơn trả đủ đã tạo, QR đã phát và request lấy máy reseller/CTV đã gửi trước ngưỡng vẫn được xử lý thanh toán/cọc hoặc duyệt/chốt giữ hợp lệ trong hạn, trừ phí và làm số dư xuống `−150.000đ` hoặc thấp hơn; màn hình phải hiển thị số dư thực, chặn giao dịch resell mới ngay và tiếp tục cho shop xử lý giao dịch cũ. Sau giao dịch cuối, sản phẩm resell vẫn ẩn cho tới khi số dư đạt `0đ`. Khi số dư đã xác nhận đạt từ `0đ`, sản phẩm chỉ ẩn vì nợ phí tự hiện lại; số dư `−50.000đ` vẫn chưa hiện. Nếu tin có lý do ẩn khác, vẫn giữ trạng thái ẩn tương ứng. COD web resell thất bại hiển thị khoản 50.000đ được cộng lại đúng số dư B, tách khỏi cọc khách.

Trang số dư chợ cho chủ shop hiển thị số dư và lịch sử phí/nạp/hoàn phí, thao tác tạo lượt nạp, QR/mã tham chiếu/số tiền/tài khoản nền tảng nhận tiền và trạng thái Chờ xác nhận → Đã cộng. Quét QR hoặc bấm “đã chuyển” không tự tăng số dư; chỉ cập nhật sau webhook hợp lệ hoặc admin đã đối soát và cộng thủ công. QR nạp chợ phải được phân biệt rõ với QR cọc COD của khách trả cho shop. Nếu chuyển thiếu mã hoặc sai số tiền, hướng shop nhắn riêng admin; màn hình không tự xác nhận theo ảnh chuyển khoản. Màn hình admin cần thấy giao dịch nhận tiền/lượt nạp liên quan, số dư shop và lịch sử trước khi cộng thủ công; ghi rõ kết quả để shop tra lại.

## Tương tác đăng/ẩn/hiện

Xuất bản không có bước Chờ duyệt tin, chỉ kiểm tra bộ quy tắc. Ẩn tin nêu rõ ngừng nhận yêu cầu mới nhưng giữ nguyên giao dịch đã xác nhận. Trong giao dịch vẫn có nút nguồn xác nhận thành công hoặc hủy giữ riêng; hiển thị đồng hồ hạn cũ, không reset khi ẩn. Hiện lại hiển thị expires_at cũ, nếu đã hết hạn hướng sang Gia hạn tin. Bán ngoài bị chặn khi còn giao dịch mở và liệt kê việc cần xử lý.

Trong luồng tìm nguồn, có nút Gửi yêu cầu hợp tác tới shop nguồn; không bắt bấm Hỏi hàng hoặc mở chat trước. Nguồn xem danh sách request để đồng ý/từ chối; reseller xem trạng thái và sau chấp nhận có thể chọn hàng để treo. Nút Xin giữ máy là thao tác riêng theo từng máy.

Trên quan hệ hợp tác với từng reseller B, chủ shop nguồn A xem/sửa số giờ giữ máy (mặc định 12, chỉ cho số nguyên 12–72). Reseller B xem mức A đang đặt cho mình; CTV thuộc B xem hạn trên lượt giữ liên quan nếu có quyền. Màn hình request còn chờ nêu hạn sẽ được quyết định lúc A xác nhận; hold đã xác nhận hiển thị số giờ và `expires_at` cố định, kèm thông báo thay đổi cấu hình chỉ áp dụng lượt giữ mới.

Với request xin giữ cùng một máy, màn hình nguồn hiển thị các request đang chờ và cho A chọn một request bất kỳ; không gắn nhãn ưu tiên theo giờ gửi. Sau khi A xác nhận, request được chọn hiện giữ theo thời hạn đã chốt, các request còn lại hiện “Bị từ chối do máy đã được giữ”. Khi lượt giữ hết hạn/hủy, giao diện cho shop đủ điều kiện gửi request mới, không khôi phục request cũ.

A có nút “Từ chối” cho từng request còn chờ, kèm ô lý do tùy chọn; chỉ request đó chuyển “Bị từ chối”, shop gửi được báo và thấy lý do nếu A đã nhập. Các request khác vẫn chờ và máy chưa bị giữ bởi thao tác từ chối riêng.

Chủ shop B thấy nút “Rút yêu cầu” khi request xin giữ của B còn chờ A duyệt. Sau khi B rút, trạng thái hiển thị “Đã rút”, không còn nút xác nhận cho A. Request đã được A xác nhận chuyển sang lượt giữ theo thời hạn đã chốt và không có nút rút request; sau đó B có nút “Hủy giữ” riêng khi hold còn hiệu lực.
Khi lượt giữ đã được A xác nhận và còn trong thời hạn của lượt giữ, chủ shop B có nút “Hủy giữ”; đây là thao tác khác với “Rút yêu cầu”. A/B hủy có ô lý do tùy chọn; bên kia nhận thông báo và chỉ thấy lý do nếu được nhập. B hủy không chịu phí chợ, máy chỉ hiện bán lại khi tin/máy còn đủ điều kiện. Nút hủy không xuất hiện cho lượt giữ đã hoàn tất hoặc hết hạn.

Trong hold confirmed còn hạn, A có nút “Giao dịch thành công”; giao diện nêu rõ máy chuyển Đã bán vĩnh viễn và phí chợ 50.000đ tính cho B. Không có trường tải ảnh/biên lai/chứng từ để xác nhận chốt. Sau thành công hiển thị người bấm và thời điểm, không còn nút hủy hoặc chốt lần nữa.

Từ đúng expires_at, ẩn nút hoàn tất hold cũ và hiển thị trạng thái Hết hạn. Tin hiện bán lại nếu còn đủ điều kiện. Nếu A quên xác nhận giao dịch ngoài web, A dùng nút Sản phẩm đã bán sẵn có ở Hàng của tôi khi chưa có giao dịch mới; không thêm nút bán muộn hoặc thu phí B. Nếu khách đã đặt mua, hiển thị giao dịch mới và hướng A liên hệ khách để xử lý, không cho đánh dấu bán đè lên đơn/giữ máy của khách.

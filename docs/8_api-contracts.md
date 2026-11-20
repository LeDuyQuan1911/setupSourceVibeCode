# Hợp đồng HTTP, realtime và sự kiện

Trạng thái: phần hiện có đối chiếu source ngày 2026-11-16; phần mục tiêu là đề xuất chưa triển khai. Không gọi endpoint đề xuất như thể đã tồn tại.

## Quy ước hiện có

JSON qua HTTP, cookie cùng origin. Mutation POST/PUT/PATCH/DELETE cần Origin có host trùng Host; thiếu/sai Origin trả 403. Backend body limit 64 KiB, chưa có upload route. Lỗi route có dạng `{ "error": "thông báo" }`; chưa có error code/request ID chuẩn. DB lỗi chưa có hợp đồng lỗi ứng dụng thống nhất.

Cookie `chonguon_session`: HttpOnly, SameSite=Strict, Path=/, Max-Age 7 ngày; Secure khi NODE_ENV=production. DB chỉ lưu SHA-256 token. Đăng xuất xóa phiên hiện tại; chưa có logout mọi thiết bị.

## Endpoint thực tế

| Method và đường dẫn | Input | Thành công | Lỗi nghiệp vụ hiện có |
| --- | --- | --- | --- |
| POST /api/register | email, password, shopName, representative, phone, address, salesChannel | 201 `{status:"pending"}` và cookie | 400 thiếu/sai; 409 email trùng |
| POST /api/login | email, password | 200 `{ok:true}` và cookie | 400 định dạng; 401 sai tài khoản |
| POST /api/logout | Không cần body nghiệp vụ | 200 `{ok:true}`, xóa cookie | Origin không hợp lệ 403 |
| GET /api/me | Cookie phiên | 200 `{user}` | 401 chưa có phiên hợp lệ |
| GET /api/admin/shops | cursor tùy chọn | 200 `{shops,nextCursor}` | 403 không phải admin kể cả chưa đăng nhập; 400 cursor sai |
| POST /api/admin/shops/:id/decision | decision approved/rejected, note kiểu string | 200 `{shop:{id,status}}` | 403 thiếu quyền; 400 quyết định/note sai; 404 id sai hoặc không còn pending |
| GET /health trên backend | Không | 200 `{ok:true}` sau SELECT 1 | DB lỗi theo cơ chế lỗi Fastify hiện tại |
| GET /health trên realtime | Không | 200 `{ok:true}` | 503 DB lỗi; đường dẫn khác 404 |

`user`: id, email, role, shop_id, shop_name, shop_status; các trường shop có thể null với admin. Danh sách admin trả id, name, representative, phone, address, sales_channel, status, review_note, created_at. Trang tối đa 25 shop, nextCursor null khi hết. Cursor opaque, client không chỉnh sửa; ưu tiên pending rồi created_at/id giảm dần. Cache danh sách có TTL 15 giây; không dùng cache để quyết định quyền hoặc ghi.

Đăng ký: password 12–200 ký tự; email trim/lowercase, tối đa 160 theo cách cắt hiện tại. shopName/representative cắt 160; phone 40; address/salesChannel 300. Giá trị sau trim phải không rỗng. Đây là hành vi hiện có, không phải đề xuất nên cắt âm thầm mọi đầu vào mới. Note duyệt cắt 500; rejected bắt buộc note không rỗng.

### Ví dụ request đăng ký

```json
{
  "email": "shop@example.com",
  "password": "example-only-change-me",
  "shopName": "Shop minh họa",
  "representative": "Người đại diện",
  "phone": "0000000000",
  "address": "Địa chỉ minh họa",
  "salesChannel": "Kênh bán minh họa"
}
```

Dữ liệu minh họa không phải tài khoản được tạo sẵn. Client không gửi role, status hoặc owner_user_id để tự cấp quyền.

## WebSocket thực tế

Upgrade `/ws` cần cùng origin và phiên admin hoặc shop approved. Sai đường dẫn 404; sai origin 403; không đủ phiên/quyền 401; lỗi DB 503. Kết nối thành công nhận `{type:"ready",userId}`. Gửi message bất kỳ bị đóng code 1003 vì chat chưa có. Payload tối đa 64 KiB; ping/pong mỗi 30 giây. Chưa có đăng ký room, gửi chat, resume hoặc phát liên tiến trình; chưa tái kiểm tra quyền sau upgrade.

## Đăng ký/liên kết mục tiêu khác code hiện có

ACC-01..04 và SHOP-06 thay đổi luồng mục tiêu: đăng ký chỉ Gmail/password/passwordConfirmation hoặc Google; nộp năm trường shop là request riêng sau tạo tài khoản. Bảng endpoint thực tế phía trên vẫn phản ánh source cũ gộp user/shop, không được coi đã có API Google hoặc tách hồ sơ. Cần review endpoint/schema/callback/token/linking khi triển khai; email trùng không tự cấp phiên/merge user. Đã chốt Gmail/mật khẩu phải xác minh link gửi qua Gmail trước kích hoạt. Link hiệu lực 10 phút từ lúc gửi; server từ chối xác minh đủ/quá hạn. Gửi lại vô hiệu link cũ, chỉ link mới nhất có hiệu lực và tính 10 phút từ lần gửi mới. Gửi lại trước 60 giây bị chặn tại server, không phát hành link mới hay sửa hiệu lực link hiện hành; phản hồi cần cho biết thời gian phải chờ. Server giới hạn tối đa 5 email/tài khoản trong 60 phút tính cả lần đầu; vượt mức không gửi/đổi link, phản hồi thời gian phải chờ. Endpoint/token/lỗi cụ thể, xử lý mail lỗi/quota khi lỗi và thiết kế API/schema recovery còn cần chốt; chưa có API này trong source.

## Quên mật khẩu mục tiêu

ACC-05 cần request gửi link cho Gmail đã xác minh của user có mật khẩu và request cập nhật mật khẩu mới/confirmation sau kiểm tra link. Không trả token trong response API công khai, không tin client tự xác nhận Gmail/link hợp lệ; phản hồi gửi mail nên đồng nhất để tránh tiết lộ tài khoản. Đã chốt link reset 10 phút, khoảng gửi lại 60 giây, tối đa 5 email reset/tài khoản/60 phút kể cả lần đầu, chỉ link reset mới nhất hợp lệ. Quota/cooldown reset riêng với verify; link chéo mục đích không dùng được, request bị chặn không đổi hiệu lực link hiện tại. Reset thành công tiêu thụ link một lần, thu hồi mọi phiên ứng dụng của user (kể cả phiên hiện tại), không trả cookie/token phiên mới; client chuyển tới đăng nhập. Request dùng lại link phải bị từ chối, không đổi mật khẩu lần nữa. Endpoint và mã lỗi cụ thể chưa chốt. Chưa có code.

## Hợp đồng mục tiêu đề xuất

Các đường dẫn dưới đây chưa có code. Trước triển khai phải chốt schema request/response, giới hạn, quyền và lỗi theo yêu cầu tương ứng; không thay route hiện có trong nhiệm vụ docs.

| Endpoint dự kiến | Quyền | Input/output cốt lõi |
| --- | --- | --- |
| GET /api/catalog/categories | Shop approved (đề xuất) | Danh mục được kích hoạt; bản đầu chỉ Apple |
| GET /api/catalog/models | Shop approved (đề xuất) | Danh mục mẫu theo category/nhóm đang mở, cursor khi cần |
| GET /api/listings | Shop approved | model, shop, min/max price, khu vực, cursor; chỉ tin có quyền xem |
| POST /api/listings | Shop approved | Thông tin máy, media IDs; trả listing/item và version |
| GET /api/listings/:id | Shop đủ quyền | Chi tiết máy/giá/trạng thái, không trả secrets hoặc trường riêng |
| PATCH /api/listings/:id | Shop sở hữu | Trường được phép và expectedVersion; conflict nếu bản cũ |
| POST /api/listings/:id/publish hoặc hide | Shop sở hữu | Kiểm tra trạng thái và dữ liệu; trả trạng thái/version mới |
| POST /api/listings/:id/renew | Shop nguồn sở hữu tin | Gia hạn tin chợ trong cửa sổ cho phép; trả mốc mới, không phải treo sản phẩm lên website reseller |
| POST /api/conversations | Shop approved | listingId, clientRequestId; server suy ra nguồn |
| GET /api/conversations và /:id/messages | Thành viên hội thoại | Cursor; không truy cập chéo shop |
| POST /api/conversations/:id/messages | Thành viên hội thoại | clientRequestId, text hoặc mediaIds; trả message đã lưu |
| POST /api/media/uploads | Shop có quyền | Tên hiển thị, declared type/bytes; trả uploadId và hướng tải lên có thời hạn |
| POST /api/media/uploads/:id/complete | Chủ upload | Server kiểm tra object thực; không tin bytes/type client |
| GET /api/media/:id/download | Có quyền với tài nguyên gắn media | Link ngắn hạn hoặc stream được kiểm soát |
| POST /api/listings/:id/holds | Reseller approved hoặc CTV theo quyền shop B | clientRequestId; trả requested; khi số dư shop chạm `−100.000đ` thì chặn request lấy máy resell mới, giữ request đã tạo trước ngưỡng |
| PATCH /api/sourcing-relationships/:id/hold-duration | Chủ shop nguồn A của quan hệ với reseller B | `durationHours` số nguyên 12–72, `expectedVersion`; trả thời hạn mới của quan hệ. Mặc định 12; không đổi hold đã xác nhận. Tên/schema lỗi cụ thể cần duyệt trước code |
| POST /api/holds/:id/withdraw | Chủ shop reseller B sở hữu request còn requested | expectedVersion, clientRequestId; chuyển requested → cancelled một lần; không đụng máy/hold đã confirmed hoặc khoản phí; A confirm cạnh tranh thì chỉ một thao tác thắng |
| POST /api/holds/:id/reject | Shop nguồn A sở hữu máy của request còn requested | expectedVersion, clientRequestId, reject_reason tùy chọn; từ chối riêng request và báo shop gửi, không giữ máy/thu phí hoặc đổi request khác. Reject tranh với withdraw/confirm chỉ một thao tác thắng; không reject hold đã confirmed |
| POST /api/holds/:id/confirm, cancel, complete | Theo state machine đã duyệt | expectedVersion, cancel_reason tùy chọn khi A/B hủy; nguồn chọn bất kỳ request đang chờ, confirm khóa máy/giá theo thời hạn A đặt cho B và tự reject mọi request khác của cùng máy trong một transaction. Chủ shop B hoặc A được cancel hold confirmed còn hạn trước complete; B cancel báo A, không thu phí; cancel/complete cạnh tranh chỉ một thắng. Request tự rejected không được confirm lại; hủy/hết hạn hold không phục hồi request đó. Chỉ A complete hold còn hiệu lực trong thời hạn của lượt giữ: không nhận media/chứng từ, ghi actor/thời điểm, sold và phí B một lần trong cùng transaction. Nguồn vẫn có thể confirm request đã gửi trước ngưỡng phí rồi complete trong thời hạn của lượt giữ, trừ phí B dù số dư xuống dưới ngưỡng |
| POST /api/ctv-requests | CTV active thuộc shop | itemId, proposedAmount, clientRequestId; không có trường tên/số điện thoại/địa chỉ khách. Lưu giá CTV tại lúc tạo, trạng thái chờ chủ shop duyệt; chưa giữ máy hoặc request shop nguồn |
| POST /api/ctv-invitations | Chủ shop | Gmail người được mời, clientRequestId; tạo lời mời hạn 7 ngày, gửi tới Gmail đích; chưa cấp membership CTV |
| POST /api/ctv-invitations/:id/accept | User đã đăng nhập đúng Gmail được mời | Token lời mời, expectedVersion/clientRequestId; trước hạn và chưa dùng, Gmail đã xác thực, user chưa là CTV active shop khác; tạo membership CTV active và đánh dấu lời mời accepted cùng transaction |
| POST /api/ctv-invitations/:id/cancel | Chủ shop đã gửi lời mời | expectedVersion, clientRequestId; chỉ invitation chưa accepted, chuyển cancelled và vô hiệu token/link ngay; không hủy tài khoản Gmail hoặc membership CTV đã có. Cancel/accept tranh nhau chỉ một kết quả |
| POST /api/ctv-requests/:id/resubmit | CTV đã tạo request đang chờ xác nhận lại | proposedAmount mới, expectedVersion, clientRequestId; không nhận thông tin khách. Chỉ trước hạn 12 giờ, tạo request mới ở giá CTV hiện hành và báo chủ shop CTV; request cũ kết thúc, không gửi thẳng shop nguồn |
| POST /api/ctv-requests/:id/approve | Chủ shop quản lý CTV | expectedVersion; chỉ request hiện hành còn chờ duyệt với giá/tồn kho hợp lệ. Giá đổi trước khi duyệt thì conflict/chờ CTV gửi lại; nếu hàng resell, sau duyệt mới đi luồng request shop nguồn |
| POST /api/ctv-memberships/:id/end | Chủ shop quản lý CTV | expectedVersion, clientRequestId; nếu còn request/đơn đã duyệt, request nguồn/hold/đơn đang mở thì conflict và không đổi gì. Nếu đủ điều kiện, kết thúc membership và hủy mọi request CTV chưa duyệt trong cùng transaction; báo CTV, giữ lịch sử và cho tham gia shop khác |
| POST /api/orders/:id/settlement/mark-transferred | Chủ shop nguồn A của đơn COD reseller đã giao thành công | expectedVersion, clientRequestId; server tính khoản A còn chuyển B từ snapshot đơn, ghi A đã xác nhận chuyển và thời điểm một lần; không nhận số tiền hoặc trạng thái đã chuyển do B/client khác khai, không chuyển tiền |
| GET /api/notifications; POST /:id/read | Shop nhận | Cursor; read idempotent |
| POST /api/shops/:id/reviews | Shop approved khác | Mẫu nhận xét cần chốt |

Khi confirm hold, server lấy `hold_duration_hours` hiện hành của đúng quan hệ A–B, lưu snapshot `duration_hours` và `expires_at` theo giờ DB; không nhận số giờ do reseller/CTV gửi trong request. Cập nhật cấu hình quan hệ và confirm cạnh tranh phải có thứ tự xác định qua khóa/version; thay đổi sau confirm không sửa hạn của hold cũ. API trả số giờ và mốc hết hạn của từng hold để hai shop cùng thấy. Hạn đơn website vẫn theo luồng riêng.

Giá CTV đổi trước khi chủ shop duyệt thì request cũ không thể approve bằng API cũ hoặc retry. Server ghi trạng thái chờ CTV xác nhận lại và deadline 12 giờ từ lúc đổi giá; không phụ thuộc worker để từ chối approve/resubmit quá hạn. Resubmit chỉ báo chủ shop của CTV, không tạo hold hoặc thông báo shop nguồn.

Lời mời CTV chỉ cấp quyền khi user đúng Gmail bấm Chấp nhận trước `expires_at = sent_at + 7 × 24 giờ`. Tại hoặc sau hạn, hoặc khi chủ shop đã hủy, từ chối dù job chưa chuyển trạng thái. Token chỉ gửi tới Gmail đích, lưu hash, không trả token trong danh sách lời mời; retry/chấp nhận cạnh tranh không tạo hai membership active. Hủy không tự gửi lời mời mới; chủ shop có thể dùng thao tác Mời để tạo lời mời khác nếu cần. Quy tắc nhiều lời mời pending cùng Gmail còn cần chốt.

Kết thúc CTV và tạo/gửi lại/duyệt request phải kiểm tra membership cùng transaction để không còn request active lọt sau lúc kết thúc. Request pending chỉ bị hủy khi thao tác kết thúc membership thành công; nếu còn giao dịch đã duyệt mở thì trả conflict, không hủy một phần. Không hard-delete request/đơn lịch sử.

### Quy ước cần duyệt trước hợp đồng v1

- Lỗi đề xuất `{error:{code,message,fields?},requestId}`; 401 thiếu phiên, 403 thiếu quyền, 404 không tồn tại/không được tiết lộ, 409 xung đột trạng thái/version, 413 quá dung lượng, 415 loại không hỗ trợ, 429 quá giới hạn, 503 phụ thuộc không sẵn sàng. Đây là thay đổi so với `{error:string}` hiện tại; phải cập nhật client và test cùng lúc.
- Timestamps ISO 8601 có timezone UTC; tiền theo data-model; cursor opaque có page size giới hạn. Không trả password_hash, token_hash, storage key hoặc nội dung audit nhạy cảm.
- Mutation có retry cần khóa idempotency theo actor + operation + clientRequestId. Cùng khóa/cùng payload trả cùng kết quả; khác payload trả conflict. Chốt thời gian giữ khóa trước xây.
- Không tự retry mọi POST trên frontend. Timeout không chứng minh transaction đã thất bại; tra lại theo request ID/idempotency key.

## Sự kiện đề xuất

Tên: listing.expired, listing.renewed, hold.confirmed, hold.cancelled, hold.expired, hold.completed, message.created, notification.created. Envelope gồm eventId, type, schemaVersion, occurredAt, aggregateId, aggregateVersion và payload tối thiểu.

Outbox ghi cùng transaction; delivery ít nhất một lần, consumer phải chống trùng. WebSocket không cam kết exactly once hoặc thứ tự toàn hệ thống. Client dùng version/ID để bỏ sự kiện cũ rồi đồng bộ qua HTTP. Không phát nội dung hội thoại/media cho mọi socket của admin; kiểm tra recipient theo quyền.

Cần thiết kế tái xác thực, đóng socket khi logout/hết phiên/thu hồi quyền và resume trước chat. Tệp gửi qua đường upload riêng, không nâng body limit toàn backend hoặc truyền tệp 10 MB qua socket.

## Kho Đã bán

- GET /api/inventory-items?state=sold: chỉ shop sở hữu (đề xuất), cursor ổn định theo sold_at/id, trả máy đã bán và metadata lịch sử được phép; không nằm trong API danh mục hàng đang bán.
- POST /api/inventory-items/:id/mark-sold: shop nguồn, expectedVersion và clientRequestId; khóa máy/hold/đơn, từ chối nếu có giao dịch mới đang chiếm máy. Đây là nút Sản phẩm đã bán thông thường, có thể dùng sau khi hold expired; không đổi hold expired thành completed, không gắn B hoặc trừ phí chợ B. Không có endpoint bán muộn riêng.
- Không cung cấp endpoint reopen/unsell. Publish/unhide/renew/tạo tin mới/giữ mới/treo website cho item sold trả 409 ITEM_SOLD theo cấu trúc lỗi mục tiêu. Trạng thái archived của tin không làm mất trạng thái sold của máy.
- Sự kiện item.sold cập nhật bản treo và cache; request mua mới kiểm tra DB dù sự kiện chưa phát. Endpoint và event ở phần này chưa có code.

## Đổi giá khi máy đang được giữ

Hợp đồng mục tiêu: PATCH giá nguồn của máy có hold confirmed còn hiệu lực trả 409 ITEM_PRICE_LOCKED_BY_HOLD, không ghi giá hoặc phát sự kiện giá thay đổi. Áp dụng cả cập nhật trực tiếp, payload sửa tin có trường giá và đường quản trị/batch nếu được bổ sung sau. Chưa xác nhận giữ thì chưa khóa giá; hủy/hết hạn và máy chưa sold thì được sửa theo quyền thông thường. Dùng cùng transaction/khóa máy với confirm hold; các endpoint này chưa có code.

## Đơn website/COD và ngừng hợp tác

Các endpoint dưới chưa có code; website thuộc phạm vi bản chính thức.

| Endpoint đề xuất | Kiểm tra chính |
| --- | --- |
| POST /api/sourcing-relationships/:id/end | Nguồn đúng quan hệ, không còn request/hold/đơn giao/hoàn mở; còn việc trả 409 OPEN_TRANSACTIONS; khóa cùng luồng tạo đơn để chống race |
| POST /api/storefronts/:id/orders | Chỉ cho trả đủ: khách web, quan hệ nguồn active và máy còn bán; khóa đúng item nguồn và ghi snapshot giá khách cần trả từ giá bán hiện hành trong cùng transaction, không tin giá client; không yêu cầu nguồn duyệt từng đơn |
| Tạo lượt chờ cọc COD/QR, endpoint cần đặt tên | Khi khách chọn COD, kiểm tra quyền/tồn kho/giá và khóa đúng máy tối đa 15 phút theo giờ DB; ghi snapshot giá/cọc, mã tham chiếu riêng và thông tin QR tới tài khoản shop bán; chưa tạo đơn COD hoặc trừ phí chợ |
| Webhook giao dịch xác nhận cọc COD, endpoint/nhà cung cấp cần chốt | Xác thực webhook, đối chiếu mã lượt, shop/tài khoản nhận, số cọc, trạng thái và deadline. Chỉ cọc hợp lệ trước hạn mới tạo đơn COD Chờ giao, chuyển quyền khóa máy; nếu reseller bán máy nguồn thì trừ phí chợ 50.000đ từ B, không trừ khi shop tự bán. Retry/trùng không tạo hai đơn/trừ hai lần; webhook muộn không tự giữ lại máy |
| Xác nhận thanh toán đủ qua kênh được tin cậy, chưa chọn tích hợp | Kiểm tra số tiền/đơn và chống lặp; mới ghi Đã mua/sold, nếu reseller bán máy nguồn thì trừ phí B 50.000đ một lần; không tin cờ paid do client tự gửi |
| POST /api/orders/:id/dispatch | Đơn COD resell: cọc phải được xác nhận trước, shop nguồn A là bên gửi thực tế; chỉ ghi bàn giao và chuyển Đang vận chuyển sau khi A bàn giao. Đơn trả đủ resell: bên giao do A/B thống nhất theo từng đơn; quyền/endpoint ghi thỏa thuận cần chốt |
| POST /api/orders/:id/delivery-result | Shop nguồn A ghi COD thành công hoặc nhấn Giao không thành công; thành công mới sold, thất bại đóng đơn và giải phóng máy chưa sold trong cùng transaction, giữ lịch sử; chỉ hiện trên sàn nếu tin còn đủ điều kiện. Không bắt payload/bằng chứng máy đã về để xác nhận thất bại; server vẫn kiểm tra actor và trạng thái đơn |

Đơn trả đủ ghi `payment_deadline_at` bằng thời điểm tạo đơn +15 phút theo giờ DB. Xác nhận tiền hợp lệ trước deadline mới tự chuyển Đã mua; tại hoặc sau deadline chưa xác nhận tiền, đơn không còn quyền khóa máy dù worker chưa chạy. Callback tiền đến muộn không tự chuyển đơn thành Đã mua. Khách và shop trao đổi riêng về giá/cách xử lý, không có API tự chọn giá cũ hay giá hiện tại. Shop bán đối chiếu tiền, xác nhận thủ công chỉ khi máy còn đủ điều kiện và được khóa lại nguyên tử; nếu máy đã thuộc giao dịch khác thì không xác nhận đơn cũ; shop nhận tiền tự hoàn cho khách ngoài website, không có endpoint/trạng thái hoàn tiền cho ngoại lệ này. COD không dùng deadline này. Endpoint xác nhận bán thủ công và cơ chế đối soát tiền đến muộn cụ thể chưa chốt; không thiết kế API hoàn tiền cho ngoại lệ này.

Không thêm endpoint nguồn thu hồi quyền từng sản phẩm/category của riêng reseller. Chốt đầy đủ actor/schema/timeouts/khóa giá trước triển khai. Giữ trực tiếp theo hạn đã chụp và khóa online là hai cơ chế, không tự áp expiry hold cho đơn đang giao.

COD cần mức cọc cấu hình theo shop, snapshot mức cọc trên lượt chờ rồi trên đơn sau khi tạo; không suy ra đã thu cọc từ cờ client. Lượt chờ cọc COD có `deposit_deadline_at = created_at + 15 phút` theo giờ DB; tại hoặc sau hạn chưa xác nhận cọc thì không tạo đơn và giải phóng máy dù worker chậm. Đơn COD tạo sau xác nhận cọc không bị hạn này kết thúc trong lúc giao hàng. Với máy nguồn A trên web B, dùng cấu hình cọc của B và chuyển cọc cho B. Server chỉ tạo lượt chờ COD khi `0 < D <= min(D_config_B, 10% × giá máy P)` và `D < P − S` (không trừ phí chợ 50.000đ khỏi `P − S`); `P = S` không có COD trên web B. Số COD cho giá máy là `P − D` và tiền thu hộ về A; API không tính hoặc quản lý phí vận chuyển/hoàn COD giữa A và hãng. Khi giao thành công, API tính phần A còn chuyển B `P − S − D > 0` từ snapshot đơn; hiển thị cho A/B; A có thao tác xác nhận “Đã chuyển” sau khi chuyển ngoài website, chỉ hợp lệ với đơn COD giao thành công và chưa xác nhận chuyển. Server xác thực A là chủ shop nguồn, ghi actor/thời điểm một lần; B không có thao tác xác nhận. API không chuyển tiền hoặc xác thực giao dịch ngân hàng. Không kiểm tra deadline đối soát và không tự đóng vì quá hạn; không yêu cầu media/chứng từ trong payload “Đã chuyển”. Không nhận giá nguồn/số COD do client tự khai. Khi A nhấn Giao không thành công, API không tạo quyết định hoàn/giữ cọc; A/B tự xử lý ngoài website. Chưa có endpoint COD/cọc trong code.

QR chỉ cung cấp thông tin để khách chuyển khoản. Webhook mới là nguồn sự kiện để server xác nhận tiền, sau khi kiểm tra chữ ký/cơ chế xác thực của nhà cung cấp, định danh giao dịch duy nhất, mã lượt chờ, số tiền, tài khoản nhận và thời hạn; không tin ảnh/chữ “đã chuyển” từ client. Cọc đi tới tài khoản shop bán; cần chọn bên cung cấp hỗ trợ kết nối/nhận webhook cho từng shop. Nếu webhook đến sau khi lượt chờ hết hạn, kể cả timestamp giao dịch trước hạn, ghi nhận để đối chiếu nhưng không tạo đơn COD, giữ lại máy hoặc trừ phí chợ; khoản cọc do khách và shop tự xử lý ngoài website.

WEB-03: API từ chối tạo đơn COD từ lượt chờ cọc đã quá hạn; lượt cũ không được tái kích hoạt hoặc giữ lại máy vì khoản cọc đến muộn. Không có endpoint riêng cho trao đổi cọc muộn ngoài website. Nếu các bên tạo giao dịch mới trên website thì đi qua API kiểm tra tồn kho/giá như lượt mới.

FEE-02: reseller B bán máy nguồn A chịu phí chợ 50.000đ từ số dư B; shop tự bán máy của mình không chịu phí. Với web COD, webhook cọc hợp lệ tạo đơn thì trừ; web trả đủ, xác nhận thanh toán/Đã mua thì trừ; request/giữ theo thời hạn đã chốt của B hoặc CTV thuộc B, A xác nhận giao dịch thành công trong hạn thì trừ. Các mốc xác nhận phải ghi giao dịch/đổi trạng thái và khoản trừ nhất quán, chống retry/trừ hai lần; không nhận `payer_shop_id` hoặc số phí do client khai. Khi số dư B đạt `−100.000đ` hoặc thấp hơn, tạm ẩn sản phẩm resell và từ chối đơn web mới, giữ quyền đọc/xử lý giao dịch đã tạo. Đơn trả đủ đã tạo, QR COD đã phát và request lấy máy reseller/CTV đã gửi trước lúc chạm ngưỡng vẫn xác nhận thanh toán/cọc hoặc nguồn duyệt/chốt giữ hợp lệ trong hạn và trừ phí dù số dư sau đó thấp hơn `−100.000đ`; không trả lỗi thiếu số dư cho giao dịch đã mở. Từ lúc chạm ngưỡng, API tạo đơn web resell hoặc request lấy máy resell mới bị từ chối; giao dịch cũ kết thúc không tự gỡ chặn nếu số dư vẫn âm. Khi A xác nhận COD web Giao không thành công, cộng lại đúng 50.000đ vào B nếu có khoản trừ gốc; retry không hoàn hai lần. Đây không phải API hoàn cọc khách. Sau khi số dư B được xác nhận từ `0đ` trở lên, tự gỡ chặn vì nợ phí và cho đơn web mới trên tin resell còn đủ điều kiện; `−50.000đ` vẫn bị chặn. Không tự bật tin bị ẩn vì giá nguồn đổi, shop ẩn, hết hạn, sold hoặc mất quan hệ nguồn. Chi tiết đối soát số dư và chi tiết tích hợp nạp còn cần chốt; không thiết kế luồng giữ hộ cọc khách theo ý tưởng tương lai.

WAL-01: chủ shop tạo lượt nạp/QR cho chính shop mình và xem trạng thái/lịch sử qua API có xác thực; endpoint/tên payload cần thiết kế sau. Webhook ngân hàng/bên kết nối vào endpoint server riêng, xác thực nguồn tin rồi đối chiếu định danh giao dịch duy nhất, mã lượt nạp, tài khoản nền tảng nhận và số tiền. Khớp mới cộng số dư/ghi bút toán và cập nhật lý do ẩn do nợ phí trong transaction; webhook trùng hoặc retry trả kết quả idempotent, không cộng hai lần. Client không được gửi trạng thái đã trả tiền để tự cộng. Giao dịch sai/thiếu mã, sai tài khoản hoặc số tiền không khớp không tự cộng và cần đối soát. Tài khoản nhận nạp chợ khác tài khoản shop bán nhận cọc COD; chưa chọn ngân hàng/bên kết nối và hợp đồng xác thực cụ thể.

Với nạp thiếu mã/sai số tiền, shop liên hệ riêng admin; chỉ admin có quyền đối soát nạp mới dùng thao tác cộng thủ công sau khi kiểm tra giao dịch thực nhận và xác định đúng shop. API admin nhận định danh giao dịch ngân hàng, shop đích, số tiền và lý do; server kiểm tra giao dịch này chưa từng được cộng bằng webhook hoặc thao tác thủ công khác, rồi ghi bút toán, số dư, actor và audit trong transaction. Nếu webhook đến sau, trả kết quả đã xử lý và không cộng lại. Không nhận ảnh/tin nhắn shop làm nguồn xác nhận tiền; endpoint và schema chi tiết chưa chốt.

## Hợp đồng đăng/ẩn/hiện

Publish kiểm tra bộ quy tắc, shop approved tự xuất bản; không có bước admin duyệt từng tin. Hide chỉ đổi visibility, không update hold/đơn đã xác nhận. Unhide giữ nguyên expires_at, trả conflict nếu đã hết hạn hoặc sold. Mark-sold cho bán ngoài trả conflict nếu còn giao dịch mở; sau khi hold expired, A dùng chính nút này nếu chưa có giao dịch mới, giữ hold cũ expired và không trừ phí B. Complete-hold chỉ hợp lệ trước expires_at, cập nhật sold và hold atomically. Nếu hold là reseller/CTV của B lấy máy nguồn A, complete-hold cũng trừ phí 50.000đ từ B đúng một lần. Actor vẫn có quyền xử lý giao dịch đã xác nhận khi tin bị ẩn. Các hợp đồng mục tiêu chưa có code; error code/schema cụ thể cần review.

## Request hợp tác

Đề xuất POST /api/sourcing-requests với sourceShopId và clientRequestId; nguồn dùng POST /api/sourcing-requests/:id/decision để chấp nhận/từ chối. Actor phải là shop approved, nguồn đúng bên nhận; không yêu cầu inquiryId/conversationId hoặc message trước đó. Kết quả chấp nhận tạo/kích hoạt quan hệ lấy nguồn một chiều, không tạo hold/order, không tự treo toàn bộ hàng. Chọn sản phẩm sau đó vẫn kiểm tra quan hệ active và tồn kho; không có bước nguồn duyệt riêng từng máy. Endpoint chưa có code; idempotency/trạng thái request chi tiết cần review.

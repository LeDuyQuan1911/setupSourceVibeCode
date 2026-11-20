# Kế hoạch

## Đã xong

- [x] Kiểm tra trạng thái repo hiện tại.
- [x] Tạo điểm vào và bản đồ ngữ cảnh cho Codex/Claude Code.
- [x] Đặt quy tắc bảo vệ secrets và cập nhật tài liệu.
- [x] Thêm quy trình chung cho Codex, Antigravity và Claude Code.
- [x] Bắt buộc ghi worklog riêng cho từng nhiệm vụ của mọi agent.
- [x] Áp dụng ruleset GitHub chỉ cho chủ repo merge PR vào `main`.
- [x] Gỡ hệ plugin và phần phụ trợ khỏi khung dự án.
- [x] Viết bản thảo yêu cầu và luồng nghiệp vụ cho chợ B2B secondhand và website shop.
- [x] Ghi nhận luồng xin nguồn hàng theo một chiều, giao dịch trực tiếp, đơn online và các vai trò shop/cộng tác viên/admin.
- [x] Chốt phạm vi toàn quốc, phí tháng và website sau phiên bản đầu; tạo khung quy định.
- [x] Chốt bản đầu gồm mọi dòng iPhone secondhand; Apple là danh mục cấp cao để mở rộng sau.
- [x] Chốt thông tin bắt buộc cho từng tin iPhone secondhand.
- [x] Chốt shop nguồn niêm yết giá lấy hàng; reseller tự đặt giá bán không thấp hơn giá nguồn và không thương lượng giảm giá.
- [x] Chốt thông báo, tạm ẩn và treo lại trên website reseller khi giá nguồn đổi.
- [x] Chốt lượt giữ hàng đã xác nhận vẫn dùng giá nguồn tại thời điểm giữ.
- [x] Chốt danh mục theo mẫu iPhone hiển thị khoảng giá của nhiều máy trong một shop.
- [x] Làm rõ giữ hàng phục vụ giao dịch trực tiếp; đơn online có luồng khóa tồn kho riêng.
- [x] Chốt lượt giữ hàng trực tiếp có thời hạn theo cấu hình nguồn A đặt cho từng B và shop nguồn có thể hủy trước hạn.
- [x] Chốt ô ghi lý do hủy hold cho A/B là tùy chọn; thông báo hiện lý do nếu có, để cơ chế report cho giai đoạn sau.
- [x] Chốt MVP có nhắn tin trong nền tảng giữa các shop.
- [x] Chốt chat MVP hỗ trợ văn bản, ảnh và tệp.
- [x] Chốt giới hạn 10 MB mỗi tệp chat và tin đăng 90 ngày, có 3 ngày để gia hạn tin trước khi xóa.
- [x] Làm rõ CTV thuộc shop và bán qua mạng xã hội; chốt admin duyệt shop mới với đánh giá từ shop cũ làm thông tin tham khảo.
- [x] Chốt năm thông tin đăng ký shop tối thiểu cho bản đầu.
- [x] Chốt admin có thể tự kiểm tra và duyệt shop mới khi chưa có đánh giá của shop cũ.
- [x] Chuyển sang source chính thức theo module; dựng nền ứng dụng và luồng shop đăng ký/admin xét duyệt.
- [x] Viết kiến trúc source, dữ liệu, quyền và hướng mở rộng; tách route, service, repository cho code nền hiện có.
- [x] Chia source và tiến trình frontend, backend, WebSocket; dùng chung phiên/DB, kiểm tra kết nối WebSocket theo quyền shop.
- [x] Tối ưu transaction đăng ký, phân trang hàng đợi shop, giới hạn chờ pool và dọn kết nối WebSocket chết; ghi chiến lược hiệu suất trước khi tăng bản sao.
- [x] Thiết lập Redis cache-aside cục bộ và cache danh sách xét duyệt admin, có TTL, vô hiệu hóa khi ghi và fallback PostgreSQL.

## Tiếp theo

- [ ] Rà kiến trúc với chủ dự án trước khi thêm các module nghiệp vụ; ghi quyết định về hạ tầng triển khai khi có thông tin.
- [ ] Chốt các quyết định sản phẩm còn mở trong `SPEC.md` với người dùng.
- [ ] Soạn quy định tối thiểu cho shop, tin đăng, giá, liên lạc và giữ hàng.
- [ ] Chốt mẫu đánh giá từ shop cũ và cách admin xử lý ý kiến trái chiều.
- [ ] Chốt loại tệp chat, thông báo và lưu trữ hội thoại; xử lý tin hết hạn có giao dịch mở; thời điểm khóa giá cho đơn online giai đoạn sau.
- [ ] Đánh giá pháp lý và vận hành dòng tiền giữ/giải ngân, hóa đơn cho giai đoạn website.
- [ ] Định nghĩa chi tiết trạng thái giữ hàng, xác nhận thanh toán, quyền đăng lại và xử lý đơn khi ngừng hợp tác.
- [ ] Thiết kế quy tắc kiểm tra/khóa tồn kho cho đơn online ở giai đoạn website riêng.
- [ ] Bổ sung đánh giá shop mới từ các shop đã duyệt, chính sách đăng nhập và quyền chi tiết.
- [ ] Xây tin đăng từng máy iPhone, tìm kiếm và lọc.
- [ ] Xây chat văn bản/ảnh/tệp và giữ hàng trực tiếp theo thời hạn đã chốt.
- [ ] Xây vòng đời tin đăng 90 ngày, thông báo và gia hạn tin.
- [ ] Kiểm thử các luồng với nhiều shop; chuẩn bị triển khai, sao lưu và giám sát theo tải thực tế.
- [ ] Khi có tin đăng/chat/giữ hàng, kiểm thử cạnh tranh và đo tải 200 request/phút rồi tăng dần; triển khai outbox/phát liên tiến trình trước khi tăng bản sao WebSocket.
- [ ] Khi xây danh mục và tìm kiếm, xác định TTL/điểm vô hiệu hóa cho từng dữ liệu phù hợp trước khi dùng Redis cache; không quyết định tồn kho/giữ hàng từ cache.

Chỉ thêm MCP, skill, agent chuyên biệt hoặc script tự động khi có nhu cầu rõ ràng.

## Ưu tiên tài liệu trước triển khai tiếp — 2026-11-16

- [x] Soạn bộ docs chi tiết có phân biệt hiện trạng, yêu cầu đã chốt và thiết kế đề xuất tại `docs/1_README.md`.
- [x] Bổ sung yêu cầu/nghiệm thu, luồng trạng thái, màn hình, dữ liệu, API, phân quyền, kiểm thử, vận hành và sổ quyết định mở.
- [ ] Chủ dự án review yêu cầu bản chính thức và trả lời các quyết định chặn module trong `docs/12_open-decisions.md`.
- [ ] Đồng bộ thiết kế theo phản hồi và duyệt hợp đồng dữ liệu/API của từng module trước khi viết code.
- [ ] Nghiệm thu bộ quy định tối thiểu và điều kiện vận hành trước khi mở thử.

Ưu tiên hoàn thiện và duyệt docs trước khi triển khai thêm tính năng. Các dấu hoàn tất ở trên chỉ xác nhận đã soạn bản thảo, không xác nhận thiết kế đã được duyệt hoặc tính năng đã có code.

- [x] Đánh số 14 tài liệu trực tiếp trong docs từ 1_README.md đến 12_open-decisions.md theo thứ tự đọc; cập nhật liên kết và hướng dẫn agent.

- [x] Làm rõ thiết kế DB có danh mục dùng chung ngay từ đầu, bản đầu chỉ category Apple; mở rộng được Tivi/Bàn phím.
- [x] Thống nhất treo/treo lại là reseller hiển thị sản phẩm nguồn trên website; kỳ 90 ngày của tin chợ dùng “Gia hạn tin”.
- [ ] Review schema categories/nhóm/mẫu và thuộc tính theo loại hàng trước migration catalog.

- [x] Chốt máy secondhand đã bán vào mục Đã bán, sold là trạng thái kết thúc, không mở bán/gia hạn/treo lại.
- [ ] Khi xây catalog, triển khai kho lịch sử Đã bán và bảo vệ bất biến sold ở service/DB/worker; kiểm thử cạnh tranh.

- [x] Chốt cấm shop nguồn sửa giá máy khi lượt giữ đã xác nhận còn hiệu lực; hủy/hết hạn và chưa bán mới được sửa lại.
- [ ] Khi xây catalog/holds, triển khai guard giá và kiểm thử cạnh tranh confirm/đổi giá, không chỉ khóa nút UI.

- [x] Chốt nguồn chỉ ngừng hợp tác toàn reseller sau khi xử lý hết yêu cầu/đơn mở, không giới hạn riêng sản phẩm/danh mục.
- [x] Chốt website tự khóa tồn kho không chờ nguồn duyệt từng đơn; trả đủ xác nhận là Đã mua; COD có Chờ giao/Đang vận chuyển/kết quả. Quy tắc nhận hoàn kiểm tra trước mở lại đã được quyết định mới 2026-11-19 thay thế: nguồn nhấn giao thất bại thì máy chưa sold trở lại sàn.
- [ ] Khi triển khai website trong bản chính thức, chốt actor giao nhận, thời điểm khóa giá, timeouts thanh toán và dòng tiền/hoàn tiền; kiểm thử đồng thời với holds/ngừng hợp tác.

- [x] Chốt luồng A: tự đăng theo quy tắc không duyệt từng tin; nguồn xác nhận giữ theo thời hạn đã chốt và chốt thành công; bán ngoài xử lý hết giao dịch mở; ẩn không hủy giữ/đơn xác nhận; hiện lại giữ hạn cũ.
- [ ] Soạn/duyệt bộ tiêu chuẩn đăng tin chi tiết để triển khai rule-based; AI hỗ trợ duyệt là hướng sau.

- [x] Làm rõ luồng B: request hợp tác → nguồn đồng ý → reseller chọn/treo hàng; không bắt hỏi hàng/chat. Request giữ máy bên ngoài là luồng riêng.

## Bản chính thức — quyết định 2026-11-18

- [x] Tổ chức docs/2_requirements.md theo sản phẩm chính thức: B2B, hợp tác/website, CTV, đơn hàng, bảo mật và vận hành; bỏ giới hạn MVP.
- [x] Tổng hợp các quyết định hồ sơ 30 ngày/dashboard và CTV đã chốt trong hội thoại vào đặc tả.
- [ ] Review đặc tả, chốt câu hỏi chặn từng module và triển khai theo phụ thuộc; không coi website/CTV là ngoài phạm vi chỉ vì chưa có code.
- [ ] Kiểm chứng toàn bộ điều kiện nghiệm thu trước vận hành thật; chưa đánh dấu sản phẩm sẵn sàng production.

Các ghi chú website ở giai đoạn sau trong kế hoạch cũ chỉ là lịch sử thứ tự triển khai; phạm vi sản phẩm hiện hành theo docs/2_requirements.md.

## Tổ chức tài liệu — 2026-11-18

- [x] Gom 14 docs thành 12: sản phẩm + yêu cầu thành 2_requirements; kiến trúc + hiệu suất thành 6_architecture.
- [x] Rút SPEC, tách phần chuẩn nghiệp vụ/trạng thái/schema/API/UI/test; sổ quyết định mở chỉ giữ câu chưa chốt.
- [x] Đánh lại số, cập nhật mục lục/MAP/AGENTS và tham chiếu hiện hành; giữ lịch sử worklog/quyết định.
- [x] Đối chiếu nguyên văn 56 dòng yêu cầu và 29 case, kiểm tra source không thay đổi, liên kết và đoạn lặp.

Các mục lịch sử nhắc bộ 14 docs phản ánh thời điểm trước hợp nhất; mục lục hiện hành là docs/1_README.md.

- [x] Chốt đăng ký Google hoặc Gmail/mật khẩu/nhập lại, liên kết có xác thực cùng user; tách đăng ký khỏi nộp hồ sơ shop.
- [ ] Chốt xử lý lỗi gửi email xác minh/reset và quota khi lỗi, xác thực lại khi liên kết phương thức; thiết kế identity/API/migration trước triển khai.

- [x] Chốt đăng ký Gmail/mật khẩu bắt buộc xác minh qua link email rồi mới kích hoạt tài khoản; hạn link 10 phút đã chốt, đã chốt gửi lại chỉ link mới nhất hiệu lực; khoảng chờ 60 giây đã chốt, hạn mức 5 email/60 phút tính cả lần đầu đã chốt.

- [x] Chốt link xác minh Gmail hiệu lực 10 phút kể từ lúc gửi; quá hạn cần yêu cầu gửi lại, không kích hoạt bằng link hết hạn.

- [x] Chốt gửi lại xác minh Gmail vô hiệu các link cũ, chỉ link mới nhất còn hiệu lực 10 phút từ lần gửi mới.

- [x] Chốt gửi lại xác minh cùng tài khoản cách tối thiểu 60 giây, server kiểm soát và không đổi link hiện tại khi yêu cầu quá sớm.

- [x] Chốt tối đa 5 email xác minh cho cùng tài khoản trong 60 phút, tính cả lần đầu; đạt giới hạn không đổi link hiện tại.

- [x] Chốt mật khẩu 12–200 ký tự, nhập lại khớp, không bắt tổ hợp hoa/thường/số/ký tự đặc biệt.

- [x] Chốt ACC-05: quên mật khẩu qua link gửi Gmail đã xác minh cho user có mật khẩu; mật khẩu mới/nhập lại theo ACC-01.
- [x] Chốt link reset dùng một lần, thu hồi mọi phiên ứng dụng sau đặt lại thành công và yêu cầu đăng nhập lại, không tự đăng nhập.

- [x] Chốt reset 10 phút/60 giây/5 email mỗi tài khoản trong 60 phút/chỉ link mới nhất; hạn mức tính riêng xác minh đăng ký.

## Ưu tiên chốt luồng lớn — 2026-11-18

- [ ] Đi trọn luồng khách mua trên website: khóa máy/giá, thanh toán đủ và COD, giao/hoàn, vai trò shop nguồn/reseller và đối soát.
- [x] Ghi nhận tiền thanh toán web đến sau hạn cần khách liên hệ shop bán để xác nhận thủ công; không tự động ghi Đã mua, phải kiểm tra tiền và máy còn bán được.
- [x] Chốt đơn trả đủ quá hạn chưa paid giải phóng máy; tiền đến muộn thì khách nhắn riêng shop bán để thỏa thuận, không có quy tắc web tự chọn giá cũ/mới; shop chỉ xác nhận bán nếu máy còn bán được; nếu không, shop nhận tiền tự xử lý hoàn cho khách ngoài website, chợ không can thiệp.
- [x] Chốt khi khách đặt mua trên web thì khóa đúng máy và chụp giá khách trả vào đơn; giá niêm yết đổi sau không tự đổi đơn.
- [x] Chốt đơn trả đủ có hạn thanh toán 15 phút từ lúc tạo theo giờ DB; tại hoặc sau hạn chưa xác nhận tiền thì mất quyền giữ máy. COD không dùng hạn này.
- [x] Chốt hàng nguồn A bán trên web B: đơn trả đủ A/B thống nhất bên giao theo từng đơn, COD do A giao; cách đối soát tiền được chốt ở mục dưới.
- [x] Chốt COD A gửi thì tiền thu hộ về A; khách phải đặt cọc trước khi gửi và mỗi shop có trường mức cọc riêng.
- [x] Chốt web reseller B dùng mức cọc B, cọc vào B, không quá 10% giá bán máy; cọc phải nhỏ hơn phần lời B = giá B tự kê trừ giá nguồn A, không trừ phí chợ 50.000đ. Máy B bán bằng giá nguồn không có COD; COD A thu là giá bán trừ cọc.
- [x] Chốt nguồn A nhấn Giao không thành công thì máy chưa sold trở lại sàn nếu tin còn hiển thị; cọc giao thất bại A/B tự xử lý, website không phân xử/hoàn cọc.
- [x] Chốt A tự quyết thời điểm nhấn giao thất bại; website chỉ cảnh báo nên đợi máy về tay để tránh khách đặt khi hàng chưa sẵn, không yêu cầu chứng cứ hoàn hàng.
- [x] Chốt COD thành công với số đối soát dương: B giữ cọc, A nhận tiền thu hộ rồi chuyển B `giá bán − giá nguồn − cọc` ngoài website. Website hiển thị số cần chuyển; A chuyển ngoài website rồi bấm “Đã chuyển” để hoàn tất đối soát, không cần B xác nhận, không có hạn chuyển cố định và không yêu cầu ảnh biên lai.
- [x] Chốt quy định chợ: A đóng/gửi COD nên tự chịu phí vận chuyển và hoàn hàng với hãng ngoài website; không xây tính/thu/theo dõi phí này.
- [x] Chốt phí chợ 50.000đ chỉ cho reseller B bán máy nguồn A, gồm đơn web và lượt lấy hàng qua request/giữ theo thời hạn đã chốt của B hoặc CTV thuộc B; shop tự bán máy của mình không chịu phí.
- [x] Chốt COD web reseller trừ phí khi cọc được xác nhận và đơn COD được tạo; giao thất bại hoàn đúng 50.000đ đã trừ cho B một lần. Đơn trả đủ trừ khi xác nhận thanh toán đủ; phí tách cọc khách và đối soát A/B.
- [x] Chốt request/giữ theo thời hạn đã chốt của reseller hoặc CTV chỉ trừ phí khi nguồn A xác nhận giao dịch thành công trong hạn, không trừ lúc request hay lúc xác nhận giữ.
- [x] Chốt ngưỡng chặn đơn web resell mới tại số dư `−100.000đ` hoặc thấp hơn; tạm ẩn sản phẩm resell, vẫn hiển thị/xử lý giao dịch đã mở. Không dùng phương án dành riêng phí trước QR.
- [x] Chốt giao dịch resell đã mở trước ngưỡng gồm đơn trả đủ, QR COD và request reseller/CTV đã gửi: thanh toán/cọc hợp lệ hoặc nguồn duyệt/chốt giữ trong hạn vẫn xử lý, trừ phí dù số dư xuống `−150.000đ` hoặc thấp hơn. Chặn giao dịch resell mới ngay; sản phẩm resell giữ ẩn sau giao dịch cũ cho tới khi số dư trở lại từ `0đ`.
- [x] Chốt sản phẩm resell tự hết lý do ẩn vì nợ phí khi số dư reseller từ `0đ` trở lên; `−50.000đ` vẫn là còn nợ nên chưa hiện lại. Tin còn phải đạt các điều kiện hiển thị khác.
- [x] Chốt shop nạp số dư chợ qua QR, webhook ngân hàng/bên kết nối đã xác thực và đối chiếu mới cộng số dư một lần; từ `0đ` tự gỡ lý do ẩn vì nợ phí.
- [x] Chốt giao dịch nạp thiếu mã/sai số tiền: shop nhắn riêng admin; admin xác nhận tiền thực nhận và đúng shop rồi cộng thủ công một lần, ghi lịch sử và chống webhook cộng lại.
- [ ] Chốt nhà cung cấp/kết nối nhận webhook nạp chợ, webhook thất lạc, chi tiết đối soát số dư chợ. Cơ chế tương lai trừ tương ứng tiền khách cọc chưa áp dụng.
- [x] Sửa thứ tự COD: lượt chờ cọc giữ máy tối đa 15 phút từ lúc khách chọn COD theo giờ DB, chưa phải đơn; cọc xác nhận trong hạn mới tạo đơn COD Chờ giao. Quá hạn mở máy cho giao dịch mới, không chờ worker.
- [x] Chốt hướng xác nhận cọc tự động bằng QR cho từng lượt chờ và webhook giao dịch; server kiểm tra mã lượt, tài khoản nhận, số tiền, hạn và chống webhook lặp trước khi tạo đơn COD. Chưa chọn nhà cung cấp.
- [x] Chốt webhook đến sau khi lượt chờ cọc hết hạn thì không tự tạo đơn/giữ máy, kể cả tiền đã vào trước hạn; khách tự nhắn riêng shop bán để xử lý cọc ngoài website.
- [ ] Chốt kết nối tài khoản nhận tiền của từng shop và cách đối soát webhook thiếu/đứt kết nối; kiểm chứng hoạt động nhà cung cấp trước triển khai.
- [x] Chốt ranh giới cọc COD đến muộn: lượt chờ cọc hết hạn không tự tạo đơn/giữ máy; khoản cọc muộn do khách và shop xử lý ngoài website, không xây luồng request riêng.
- [ ] Đi trọn luồng reseller/CTV lấy máy ngoài web: request, duyệt, giữ theo thời hạn đã chốt, hoàn tất/hủy/hết hạn và giá đơn CTV.
- [x] Chốt A bấm “Giao dịch thành công” trong hạn hold, không cần ảnh/chứng từ; lưu A/thời điểm, máy sold và trừ phí B một lần.
- [x] Chốt từ đúng mốc expires_at hold hết hiệu lực, tin đủ điều kiện hiện bán lại. Nếu A đã giao dịch với B nhưng quên bấm, A được đánh dấu máy Đã bán khi chưa có giao dịch mới; nếu khách đã đặt trong khoảng đó, A tự liên hệ và xử lý với khách, không ghi đè đơn mới.
- [x] Chốt A dùng nút Sản phẩm đã bán thông thường sau khi hold hết hạn nếu máy chưa có giao dịch mới; không tạo chức năng bán muộn, không gắn B hoặc trừ phí B. Nội quy: reseller không được report shop nguồn về sự cố giao dịch không có thông tin đơn trong chợ; không thêm cơ chế xử lý riêng.
- [x] Chốt nguồn A đặt hạn giữ riêng cho từng reseller B, số giờ nguyên 12–72, mặc định 12; CTV của B dùng cùng mức. Chụp mức khi xác nhận hold, thay đổi chỉ áp dụng hold mới; mốc hết hạn của hold đang chạy không đổi.
- [x] Chốt giá CTV đổi trước khi chủ shop duyệt: chặn duyệt request cũ, báo CTV xem giá mới và nhập số tiền cho request mới. CTV gửi lại trước 12 giờ mới báo chủ shop quản lý CTV duyệt; không gửi thì request cũ hết hạn, rời danh sách xử lý nhưng giữ lịch sử. Hàng resell chỉ request nguồn sau khi chủ shop CTV duyệt.
- [x] Chốt chủ shop ngừng hợp tác CTV: request chưa duyệt bị hủy cùng lúc kết thúc membership; giao dịch đã duyệt/request nguồn/hold/đơn mở phải xử lý xong trước, nếu chưa thì chặn toàn bộ thao tác. Sau kết thúc CTV mất quyền shop cũ, giữ lịch sử và được tham gia shop khác.
- [x] Chốt request CTV chỉ gồm máy và số tiền đề xuất, không yêu cầu tên/số điện thoại/địa chỉ khách; shop reseller tự trao đổi với CTV để xử lý thông tin khách khi cần. Không tự tạo đơn khách web từ request CTV.
- [x] Chốt chủ shop mời CTV bằng Gmail, lời mời hiệu lực 7 ngày từ lúc gửi; người nhận đăng nhập/đăng ký đúng Gmail và bấm Chấp nhận trước hạn mới có quyền, chỉ một shop active.
- [x] Chốt chủ shop được hủy lời mời CTV chưa chấp nhận; link/token cũ hết hiệu lực ngay, không khóa Gmail, không tước membership đã có và không tự gửi lời mời mới. Nhiều lời mời pending cùng Gmail và quyền xem lịch sử sau rời shop còn cần chốt.
- [x] Chốt nhiều request cùng máy: A chọn bất kỳ, xác nhận một request thì tự từ chối request còn lại trong cùng transaction; hold hủy/hết hạn không mở lại request cũ, shop gửi request mới nếu máy còn bán được.
- [x] Chốt chủ shop B được rút request xin giữ còn chờ A; sau khi A xác nhận hold thì quyền rút request không còn. Chủ shop B được hủy hold còn hạn trước khi A chốt bán; A được báo, không thu phí và máy chỉ mở lại nếu đủ điều kiện.
- [x] Chốt A được từ chối riêng request lấy máy còn chờ, lý do tùy chọn; báo shop gửi, không ảnh hưởng request khác hoặc giữ máy, không thu phí.
- [ ] Chốt vòng đời máy/tin khi đổi giá, hết hạn, đã bán hoặc COD trả về.
- [ ] Chốt quan hệ hợp tác nguồn/reseller và lời mời/quyền CTV khi có đơn đang mở.
- [ ] Sau các luồng giao dịch chính, quay lại các chi tiết đăng nhập/đăng ký còn mở trong DEC-01 và các vấn đề chat, vận hành.

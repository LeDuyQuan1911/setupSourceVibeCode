# Đặc tả bản chính thức thay phạm vi MVP

- Ngày: 2026-11-18
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Chuyển docs/3_requirements.md thành đặc tả bản chính thức, không giới hạn MVP. Bao gồm website, hợp tác lấy nguồn, CTV, đơn hàng và yêu cầu vận hành đã chốt. Giữ hiện trạng code và câu hỏi mở, không tự phê duyệt tích hợp hoặc chính sách còn thiếu; giữ nguyên thay đổi có sẵn.

## Thực hiện
Tổ chức lại docs/3_requirements.md thành 10 phần theo module, 56 mã yêu cầu. Giữ các mã cũ và tiêu chí đã chốt; bổ sung STORE, CTV, SHOP-04/05 và NFR. Bao gồm hồ sơ/dashboard/hạn 30 ngày, catalog/listing, sourcing, website, CTV, hold/đơn web/COD, chat/phí/admin, chất lượng vận hành và điều kiện nghiệm thu.
Đồng bộ phạm vi tại README.md, MAP.md, SPEC.md, PLAN.md, contexte/decisions.md và các tham chiếu liên quan trong docs 1, 2, 4, 5, 7, 8, 9, 13, 14. Thay mô tả đẩy website/CTV ra ngoài sản phẩm bằng phân biệt phạm vi chính thức và code chưa có. Không sửa worklog/quyết định lịch sử của nhiệm vụ khác.

## Quyết định
Bản chính thức vẫn triển khai theo thứ tự phụ thuộc; không coi chưa triển khai là ngoài phạm vi. Tổng hợp các quyết định hồ sơ và CTV đã có trong hội thoại, không hỏi lại như chưa chốt. Giữ category khởi chạy Apple/iPhone; không mở toàn bộ hàng hóa vì thay định hướng phát hành. Không tự thêm AI, ERP, mobile, logistics tự động hoặc admin giữ tiền. Các yêu cầu chất lượng là điều kiện cần triển khai/kiểm chứng, không phải khẳng định source đã sẵn sàng production.

## Kiểm chứng
Đọc tài liệu nền, yêu cầu hiện hành và quyết định; đối chiếu hội thoại và giữ mã cũ. Node kiểm tra 56 mã yêu cầu đủ dãy dự kiến, không trùng; requirements không còn phạm vi MVP/giai đoạn sau. Kiểm tra 58 liên kết nội bộ và encoding: không có lỗi. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-18-codex-production-requirements.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs, không có thay đổi code hoặc migration.

## Còn lại
Chủ dự án review đặc tả và chốt chi tiết còn thiếu theo module: bộ quy tắc đăng, lời mời/thông tin đơn CTV, khóa giá online/CTV, timeout/tiền/hoàn tiền, actor giao nhận, retention, quyền admin, SLO/RPO/RTO và hạ tầng. Những phần tài liệu kỹ thuật liên quan cần tiếp tục chi tiết hóa theo đặc tả; chưa có code mới hoặc nghiệm thu vận hành. Không commit/push.

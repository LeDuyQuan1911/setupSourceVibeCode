# Làm rõ danh mục và thuật ngữ treo sản phẩm

- Ngày: 2026-11-16
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Cập nhật docs: thiết kế danh mục trong database ngay từ đầu, chỉ mở category Apple ở bản đầu và mở rộng được Tivi/Bàn phím. Treo/treo lại là reseller đưa sản phẩm nguồn lên website của mình; tách thuật ngữ gia hạn tin chợ. Chỉ sửa tài liệu, giữ mọi thay đổi có sẵn.

## Thực hiện
Cập nhật SPEC, PLAN và contexte/decisions; đồng bộ docs 2, 3, 4, 5, 7, 8, 9, 10, 13, 14. Bổ sung CAT-00, quan hệ category/nhóm/mẫu, bảng categories và product_groups đề xuất, thuộc tính iPhone riêng, hướng mở rộng Tivi/Bàn phím và case nghiệm thu. Bổ sung bản treo website reseller tham chiếu tồn kho nguồn, không nhân bản máy. Đổi thuật ngữ gia hạn tin chợ, endpoint đề xuất renew, sự kiện listing.renewed và renewal_deadline; giữ treo lại cho website reseller. Không sửa code/migration hoặc worklog lịch sử.

## Quyết định
Danh mục có sẵn trong thiết kế DB là yêu cầu đã chốt; cấu trúc bảng cụ thể còn là đề xuất để review. Giữ phạm vi iPhone đã chốt trong Apple cho đến khi có yêu cầu rõ mở thêm dòng; không tự mở website vào MVP. Không đổi thời hạn tin 90 ngày/cửa sổ gia hạn 3 ngày; chỉ làm rõ tên hành động, chủ thể và tài nguyên.

## Kiểm chứng
Đọc lại tài liệu nền, kiến trúc, dữ liệu và quyết định; rà các tham chiếu treo lại/relist để phân biệt luồng website và tin chợ. Node kiểm tra 39 liên kết nội bộ trong 16 file: không có đích thiếu. git diff --check: đạt. node scripts/check-worklog.mjs 2026-11-16-codex-categories-and-relisting.md: đạt. Không chạy test/build ứng dụng vì chỉ sửa docs.

## Còn lại
Review schema catalog và thuộc tính theo nhóm trước migration; danh mục chưa có code. Phạm vi Apple ngoài iPhone và các câu hỏi nghiệp vụ cũ vẫn chưa được chốt. Không có thay đổi cấu trúc file nên không cần đổi MAP. Không commit/push.

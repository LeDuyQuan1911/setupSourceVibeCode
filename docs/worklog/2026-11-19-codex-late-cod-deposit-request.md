# Xử lý cọc COD đến sau hạn qua shop nguồn

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định cho cọc COD đến sau hạn: khách tự liên hệ riêng với shop bán; nếu là reseller B thì B gửi request tới nguồn A, A đồng ý và máy còn mới vận chuyển; A từ chối hoặc hết hàng thì B tự xử lý tiền cọc với khách. Phân biệt ngoại lệ này với COD đúng hạn không cần duyệt từng đơn; không sửa code.

## Thực hiện
Đồng bộ WEB-03 và ngoại lệ cọc COD đến muộn trong `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/5_permissions-security.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/11_rules.md`, `docs/12_open-decisions.md`, `SPEC.md` và `PLAN.md`; thêm quyết định vào `contexte/decisions.md`. Chỉ sửa tài liệu, không sửa code. Không đổi cấu trúc file nên không cần cập nhật MAP.

## Quyết định
Khách tự nhắn shop bán khi cọc COD đến muộn. Nếu là reseller B, B gửi request riêng tới nguồn A; request chờ không giữ máy. A đồng ý và máy còn bán được thì khóa lại máy trước khi giao; A từ chối/máy hết thì B tự xử lý cọc với khách ngoài website. Shop nguồn tự bán xử lý trực tiếp. Đây chỉ là ngoại lệ sau đơn quá hạn, không thêm bước A duyệt cho đơn COD cọc đúng hạn.

## Kiểm chứng
Đối chiếu các tài liệu liên quan, kiểm tra ID yêu cầu/ca chấp nhận và liên kết Markdown; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-19-codex-late-cod-deposit-request.md`.

## Còn lại
Cần chốt cách tạo/liên kết đơn tiếp tục sau A đồng ý, giá áp dụng nếu đã đổi, chứng từ cọc và hạn xử lý request. Chưa kiểm chứng bằng code/test vì phần đơn hàng chưa triển khai.

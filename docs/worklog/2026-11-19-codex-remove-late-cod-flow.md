# Gỡ luồng cọc COD muộn ngoài website khỏi đặc tả tính năng

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng làm rõ việc khách và shop trao đổi khoản cọc muộn là việc ngoài website; không tạo nút, request, dữ liệu, quyền hay API riêng cho trường hợp này. Chỉ giữ ranh giới hệ thống về đơn COD quá hạn và tồn kho.

## Thực hiện
Rà yêu cầu, workflow, UI, quyền, dữ liệu, API, ca nghiệm thu và các tài liệu phạm vi/kế hoạch. Gỡ toàn bộ tính năng request cọc muộn tới nguồn, cùng quyền duyệt, màn hình, schema và endpoint đề xuất. Thay bằng ranh giới đơn quá hạn không tự phục hồi/giữ máy trong `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/5_permissions-security.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/11_rules.md`, `docs/12_open-decisions.md`; bổ sung quyết định mới ghi đè phạm vi tính năng cũ vào `contexte/decisions.md`. Không sửa code hoặc cấu trúc file.

## Quyết định
Website chỉ quản lý hiệu lực đơn COD và tồn kho. Cọc đến sau hạn không kích hoạt lại đơn cũ; khách/shop tự trao đổi và xử lý tiền bên ngoài website. Không đặc tả luồng request/duyệt riêng giữa reseller và nguồn cho tình huống này.

## Kiểm chứng
Rà lại các chỗ nhắc cọc muộn để loại bỏ tính năng dư; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-remove-late-cod-flow.md`, kiểm tra mã yêu cầu/ca nghiệm thu, liên kết Markdown và `git diff --check`.

## Còn lại
Chưa triển khai đơn hàng/COD trong code nên chưa kiểm chứng runtime. Các quyết định khác về COD (chênh lệch bằng 0, phí vận chuyển, đối soát) vẫn mở, không nằm trong sửa đổi này.

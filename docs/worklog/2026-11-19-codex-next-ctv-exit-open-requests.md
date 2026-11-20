# Rà CTV rời shop khi còn request

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng muốn tiếp tục chốt luồng nghiệp vụ lớn trong docs. Rà phần CTV ngừng hợp tác khi còn request hoặc đơn đang xử lý; nêu câu hỏi tiếp theo, chưa tự chốt quy tắc hoặc sửa code.

## Thực hiện
Đọc README.md, MAP.md, SPEC.md, phần liên quan PLAN.md, CTV-05/07 trong docs/2_requirements.md, luồng request CTV trong docs/3_workflows.md và docs/12_open-decisions.md. Xác định CTV-07 đã chốt chỉ chủ shop kết thúc hợp tác khi hết đơn đang xử lý, nhưng chưa rõ request CTV chỉ đang chờ chủ shop duyệt có phải chờ hết hạn hay có thể hủy khi ngừng hợp tác. Không thay đổi tài liệu nghiệp vụ.

## Quyết định
Không có quyết định sản phẩm mới; đề xuất hủy request chưa được duyệt khi chủ shop ngừng hợp tác, còn giao dịch đã duyệt tiếp tục xử lý trước khi kết thúc.

## Kiểm chứng
Đối chiếu CTV-05/07 với luồng giữ máy và quyết định mở; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-next-ctv-exit-open-requests.md` trước bàn giao.

## Còn lại
Chờ người dùng chốt cách xử lý request CTV chưa được duyệt khi chủ shop muốn ngừng hợp tác. Chưa triển khai code.

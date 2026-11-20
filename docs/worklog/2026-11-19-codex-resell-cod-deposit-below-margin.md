# Giới hạn cọc COD reseller dưới tiền lời

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng đổi quy tắc COD của reseller: tiền cọc cho một máy phải nhỏ hơn tiền lời của reseller. Cập nhật tài liệu trước triển khai, không sửa code.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 4_screens.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md và 12_open-decisions.md. Thay ví dụ COD B phải bù A bằng ví dụ cọc hợp lệ; ghi quyết định thay thế trong contexte/decisions.md.

## Quyết định
Với máy A trên web B, `0 < D <= min(D_config_B, 10% × P)` và `D < P − S`. Không tạo lượt chờ cọc COD nếu không đạt; B có thể đổi giá bán hoặc cấu hình cọc trước khi khách đặt. `P = S` không có COD reseller vì không có cọc dương hợp lệ. Máy B tự sở hữu không áp giới hạn theo phần lời reseller. Với COD hợp lệ, A chuyển B phần còn lại `P − S − D > 0` sau giao thành công.

## Kiểm chứng
Rà các phát biểu trái quy tắc cũ trong tài liệu; chạy `node scripts/check-worklog.mjs 2026-11-19-codex-resell-cod-deposit-below-margin.md` và `git diff --check` trước bàn giao.

## Còn lại
Chưa chốt phương thức, thời hạn và chứng từ đối soát A/B; chưa triển khai code. Chi tiết làm tròn mức cọc khi 10% giá có số lẻ cần chốt trước khi xây luồng tiền.

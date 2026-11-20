# COD không giới hạn cọc theo chênh lệch và ý tưởng số dư chợ

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi quyết định COD vẫn áp dụng khi giá bán reseller bằng giá nguồn; bỏ trần cọc bằng phần chênh lệch B. Phân tích ý tưởng shop nạp tiền vào chợ, mỗi đơn có cọc trừ 50.000đ và phương án mở rộng về sau; không tự chốt mục đích/đường đi của khoản trừ khi chưa rõ.

## Thực hiện
Rà `README.md`, `MAP.md`, `SPEC.md`, `PLAN.md`, tài liệu COD và quyết định cũ. Đồng bộ phạm vi/quy tắc COD vào `SPEC.md`, `PLAN.md`, `docs/2_requirements.md`, `docs/3_workflows.md`, `docs/4_screens.md`, `docs/7_data-model.md`, `docs/8_api-contracts.md`, `docs/9_testing-acceptance.md`, `docs/11_rules.md`, `docs/12_open-decisions.md`; thêm quyết định mới trong `contexte/decisions.md`. Không thay cấu trúc file/MAP hoặc code.

## Quyết định
COD vẫn cho phép khi B bán bằng giá nguồn A. Bỏ giới hạn cọc theo phần lời B; giữ mức cọc shop cấu hình và trần 10% giá máy đã chốt. `P − S − D` có thể âm: đây là chênh lệch cần B bù A để A đủ giá nguồn, không còn là số A luôn chuyển B. Ý tưởng shop nạp tiền vào chợ và trừ 50.000đ mỗi đơn có cọc được ghi nhận nhưng mục đích, chủ tài khoản, thời điểm/hoàn tiền chưa rõ nên không đặc tả ví/API.

## Kiểm chứng
Rà các chỗ chứa trần cọc theo chênh lệch và công thức đối soát; kiểm tra IDs yêu cầu/ca nghiệm thu, liên kết Markdown, `git diff --check`, `node scripts/check-worklog.mjs 2026-11-19-codex-cod-no-margin-cap-wallet-idea.md`.

## Còn lại
Cần người dùng chốt khoản 50.000đ là tiền giữ tạm hay phí, trừ shop nào và cơ chế khi đơn thành công/thất bại; sau đó mới chốt phương thức đối soát khi B cần bù A. Cơ chế trừ tương ứng tiền cọc khách trả khi quy mô lớn chưa triển khai.

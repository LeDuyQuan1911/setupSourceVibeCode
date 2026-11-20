# Tách phí chợ khỏi tiền lời reseller

- Ngày: 2026-11-19
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Người dùng xác nhận tiền lời của reseller là phần giá shop tự kê cao hơn giá nguồn, không tính phí chợ 50.000đ. Ghi rõ vào tài liệu liên quan đến giới hạn cọc COD; không sửa code.

## Thực hiện
Ghi rõ công thức phần lời và ranh giới phí chợ trong SPEC.md, PLAN.md, docs/2_requirements.md, 3_workflows.md, 7_data-model.md, 8_api-contracts.md, 9_testing-acceptance.md, 11_rules.md và 12_open-decisions.md. Ghi quyết định lâu dài trong contexte/decisions.md.

## Quyết định
Phần lời dùng để giới hạn cọc COD reseller là `P − S`, trong đó P là giá B tự kê bán khách và S là giá nguồn A. Không trừ phí chợ 50.000đ khi kiểm tra `D < P − S`; phí thu riêng theo quy tắc số dư chợ.

## Kiểm chứng
Đối chiếu công thức trong yêu cầu, workflow, dữ liệu, API và tiêu chí nghiệm thu; chạy trình kiểm tra worklog và `git diff --check` trước bàn giao.

## Còn lại
Cách chuyển/ghi nhận khoản A còn trả B sau COD thành công vẫn chưa chốt; chưa sửa code.

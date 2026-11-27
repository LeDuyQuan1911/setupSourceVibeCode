# COD thất bại và lựa chọn treo lại của reseller

- Ngày: 2026-11-21
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Ghi luồng COD thất bại: B nhận thông báo khi A cho máy lên lại, B chủ động chọn có treo lại hay không. Ghi module thu mua máy khách chỉ là dashboard quản lý của giai đoạn sau. Xác nhận nghĩa của “giao dịch lần này không mất phí”.

## Thực hiện
Đồng bộ SPEC.md, PLAN.md, contexte/decisions.md và docs/2, 3, 4, 5, 7, 8, 9, 12. Ghi B nhận thông báo và chọn có treo lại sau khi A đưa máy chưa sold lên chợ; giữ COD failure fee refund và phí đơn COD mới. Ghi dashboard thu mua máy từ khách cho giai đoạn sau; không sửa code.

## Quyết định
Người dùng làm rõ giữ nguyên rule COD resell: COD thất bại hoàn phí đã trừ, đơn COD mới nếu đủ điều kiện vẫn thu phí 50.000đ; miễn thêm phí qua các lần bán lại chỉ dành cho khách trả hàng sau đơn đã sold. Shop tự thu máy từ khách là giao dịch ngoài website, giai đoạn sau có dashboard quản lý; phí hiện tại chỉ thu reseller bán hàng nguồn.

## Kiểm chứng
Đối chiếu WEB-03/STORE-03/FEE-02 và T-56, rà ranh giới với CAT-06 return sau sold; chạy `git diff --check` và `node scripts/check-worklog.mjs 2026-11-21-codex-cod-failure-reseller-choice.md`.

## Còn lại
Chưa triển khai code hoặc test runtime. Dashboard thu mua là phạm vi giai đoạn sau; chi tiết UX/quyền/API sẽ thiết kế khi tới giai đoạn đó.

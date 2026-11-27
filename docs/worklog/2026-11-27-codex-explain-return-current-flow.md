# Tóm tắt luồng máy khách trả hiện tại

- Ngày: 2026-11-27
- Agent: Codex
- Trạng thái: hoàn tất

## Yêu cầu và phạm vi
Giải thích luồng hiện tại sau khi bỏ nút Mở bán lại; đối chiếu COD giao thất bại và phí resell.

## Thực hiện
Đối chiếu SPEC, CAT-06 và workflow: sold giữ item/đơn cũ; máy nhận lại đăng hàng/tin mới; resell mới chịu phí thường, hàng tự sở hữu miễn phí. Phân biệt COD giao thất bại là máy chưa sold. Sửa case T-60 còn mô tả bán lại trên cùng item.

## Quyết định
Không có quyết định mới.

## Kiểm chứng
Rà `git diff --check` và chạy `node scripts/check-worklog.mjs 2026-11-27-codex-explain-return-current-flow.md`.

## Còn lại
Luồng hàng/tin mới là tài liệu thiết kế, chưa triển khai code.

# Frontend Thương Mại Điện Tử

Đây là giao diện phía máy khách (frontend) dành cho nền tảng thương mại điện tử đa người bán, được xây dựng với **React**, **TypeScript**, **Vite**, và **Tailwind CSS**.

## Thiết kế

Ứng dụng tuân theo chuẩn thẩm mỹ **Windows 8 Metro UI** một cách nghiêm ngặt:
- **Thiết kế Phẳng (Flat Design)**: Loại bỏ hoàn toàn viền (`border`), đổ bóng (`box-shadow`), và góc bo tròn (`border-radius: 0`).
- **Kiểu Chữ (Typography)**: Sử dụng họ phông chữ `Segoe UI`, đặc trưng của phong cách Metro.
- **Các khối màu nổi bật**: Sử dụng nhiều màu sắc phẳng cơ bản, sặc sỡ và khối lớn vuông vức.
- **Ngôn ngữ**: Toàn bộ giao diện người dùng được Việt hóa (**Tiếng Việt**).

## Tính năng

- **Luồng Xác thực**: Đăng nhập và đăng ký với giao diện tiếng Việt dễ dùng.
- **Cổng Người Mua Mặc Định**: Duyệt sản phẩm, xem hồ sơ các cửa hàng, quản lý giỏ hàng, và tiến hành thanh toán (checkout).
- **Cổng Quản Trị**: Bảng điều khiển (dashboard) trực quan để quản lý người dùng và sản phẩm. Có phân quyền và góc nhìn (view) theo vai trò cho Người bán (Vendor) và Quản trị viên (Admin).
- **Chi tiết Sản phẩm**: Xem chi tiết bao gồm hình ảnh, giá cả, thông tin người bán, đánh giá của người dùng và các tương tác thích (like)/bỏ thích.
- **Giỏ hàng & Thanh toán**: Quản lý trạng thái giỏ hàng đơn giản và hiệu quả với kết nối trực tiếp đến hệ thống Đơn hàng.

## Công nghệ sử dụng

- **Framework**: React 18 + Vite
- **Ngôn ngữ**: TypeScript
- **Định dạng giao diện (Styling)**: Tailwind CSS (điều chỉnh cho Metro UI) + Vanilla CSS (`index.css`)
- **Điều hướng (Routing)**: React Router DOM
- **Biểu tượng (Icons)**: Lucide React

## Chạy ứng dụng

Lưu ý: Hãy đảm bảo rằng dịch vụ backend (máy chủ) đang chạy tại `http://localhost:3000` (hoặc hãy cập nhật URL API trong file cấu hình) để các chức năng có thể hoạt động đầy đủ.

```bash
# Cài đặt các thư viện cần thiết
npm install

# Khởi động máy chủ phát triển (development server)
npm run dev

# Xây dựng ứng dụng (build) cho môi trường sản xuất (production)
npm run build
```

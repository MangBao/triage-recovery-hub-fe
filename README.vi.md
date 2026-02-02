# 💻 Triage & Recovery Hub - Frontend

<div align="center">

[![Read in English](https://img.shields.io/badge/Lang-English-blue?style=for-the-badge&logo=google-translate&logoColor=white)](./README.md)

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-orange?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)

![Status](https://img.shields.io/badge/Trạng_Thái-Ổn_Định-success?style=flat-square)
![License](https://img.shields.io/badge/Giấy_Phép-MIT-blue?style=flat-square)
![Theme](https://img.shields.io/badge/Giao_Diện-Tối%20%7C%20Glassmorphism-purple?style=flat-square)

**Bảng Điều Khiển Đại Lý Cao Cấp cho Hệ Thống Phân Loại AI**
_Giám Sát Thời Gian Thực - Phản Hồi Tức Thì - UX Hiện Đại_

[Backend Repo](https://github.com/MangBao/triage-recovery-hub-be) | [Demo Trực Tiếp](http://localhost:3000) | Báo Lỗi (TODO)

</div>

---

## 🌟 Giới Thiệu

**Triage & Recovery Hub Frontend** là một bảng điều khiển hiện đại, cao cấp được thiết kế cho các đại lý hỗ trợ. Được xây dựng với **Next.js 15** và **React 19**, nó có tính năng giao diện người dùng UI/UX hiệu ứng kính tuyệt đẹp cho phép các đại lý theo dõi vé trong thời gian thực, xem xét các bản nháp do AI tạo ra và quản lý quy trình làm việc hỗ trợ khách hàng một cách hiệu quả.

### ✨ Tính Năng Chính

| Tính Năng                      | Mô Tả                                                              | Công Nghệ                 |
| :----------------------------- | :----------------------------------------------------------------- | :------------------------ |
| 🎨 **UI/UX Cao Cấp**           | Giao diện tối, hiệu ứng kính, hoạt ảnh vi mô & thích ứng           | `Tailwind CSS`            |
| ⚡ **Cập Nhật Thời Gian Thực** | Tự động cập nhật trạng thái vé & tiến trình phân tích AI           | `SWR` + `Polling Hooks`   |
| 🧠 **Tích Hợp AI**             | Hiển thị phân tích cảm xúc, điểm khẩn cấp và bản nháp AI           | `Next.js App Router`      |
| 🔍 **Bộ Lọc Nâng Cao**         | Lọc theo Trạng Thái, Mức Độ Khẩn Cấp, Danh Mục với UI cao cấp      | `Framer Motion` (dự kiến) |
| 📱 **Thiết Kế Thích Ứng**      | Tối ưu hóa hoàn toàn cho Máy Tính Để Bàn, Máy Tính Bảng và Di Động | `Tailwind Responsive`     |

---

## 🏗️ Kiến Trúc

```mermaid
graph TD
    User[Đại Lý Hỗ Trợ] -->|Xem/Hành Động| UI[Frontend Next.js]
    UI -->|SWR Poll| API[Next.js API Routes]
    API -->|Proxy| BE[Backend FastAPI]

    subgraph Frontend Components
        Dashboard -->|Danh Sách| TicketList
        TicketList -->|Mục| TicketCard
        Dashboard -->|Chi Tiết| TicketDetail
        TicketDetail -->|Chỉnh Sửa| TicketForm
    end
```

### 💡 Quyết Định Kỹ Thuật

- **Next.js 15 App Router**: Tận dụng Server Components để tải dữ liệu ban đầu và Client Components cho tính tương tác.
- **SWR để Quản Lý Trạng Thái**: Được sử dụng để lấy dữ liệu, lưu vào bộ nhớ đệm và tự động xác thực lại để giữ bảng điều khiển được cập nhật liên tục mà không cần các trình quản lý trạng thái phức tạp.
- **Tailwind CSS + CSS Variables**: Hệ thống thiết kế "PRO MAX" sử dụng các biến CSS nghiêm ngặt cho chủ đề, cho phép chuyển đổi dễ dàng và các mã thông báo thiết kế nhất quán.
- **Glassmorphism**: Các lớp tiện ích tùy chỉnh (`.glass`, `.glass-card`) được triển khai trong `globals.css` cho một giao diện cao cấp thống nhất.

---

## 🚀 Bắt Đầu Nhanh

### 1️⃣ Điều Kiện Tiên Quyết

- **Node.js 18+**
- **pnpm** (Khuyến nghị) hoặc npm/yarn
- **Dịch Vụ Backend** đang chạy trên cổng 8000

### 2️⃣ Cài Đặt

```bash
# Clone dự án
git clone https://github.com/MangBao/triage-recovery-hub-fe.git
cd triage-recovery-hub-fe

# Cài đặt các gói phụ thuộc
pnpm install
```

### 3️⃣ Cấu Hình Môi Trường

Tạo tệp `.env.local` trong thư mục gốc:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

### 4️⃣ Chạy Máy Chủ Phát Triển

```bash
pnpm dev
```

Mở [http://localhost:3000](http://localhost:3000) bằng trình duyệt của bạn để xem kết quả.

---

## 🧪 Xác Minh & Xây Dựng

### Linting

Kiểm tra chất lượng mã và tuân thủ tiêu chuẩn:

```bash
pnpm lint
```

### Xây Dựng Sản Phẩm

Xây dựng ứng dụng để triển khai sản phẩm:

```bash
pnpm build
pnpm start
```

---

## 🛠️ Chi Tiết Tech Stack

| Thành Phần      | Công Nghệ                                                                                     | Phiên Bản  |
| :-------------- | :-------------------------------------------------------------------------------------------- | :--------- |
| **Framework**   | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)          | `15.1`     |
| **Thư Viện UI** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)                | `19.0`     |
| **Styling**     | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)   | `3.4`      |
| **Ngôn Ngữ**    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | `5.0+`     |
| **Lấy Dữ Liệu** | ![SWR](https://img.shields.io/badge/SWR-000000?logo=vercel&logoColor=white)                   | `2.0+`     |
| **Biểu Tượng**  | ![Lucide](https://img.shields.io/badge/Lucide-F05032?logo=lucide&logoColor=white)             | `Mới Nhất` |

---

## 🤝 Đóng Góp

1. Fork dự án
2. Tạo nhánh tính năng của bạn (`git checkout -b feature/TinhNangTuyetVoi`)
3. Commit các thay đổi của bạn (`git commit -m 'Thêm TinhNangTuyetVoi'`)
4. Push lên nhánh (`git push origin feature/TinhNangTuyetVoi`)
5. Mở một Pull Request

---

<div align="center">
  <p>Được tạo với ❤️ bởi <a href="https://github.com/MangBao"><b>MangBao</b></a></p>
</div>

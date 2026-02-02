# 💻 Triage & Recovery Hub - Frontend

<div align="center">

[![Read in English](https://img.shields.io/badge/Lang-English-blue?style=for-the-badge&logo=google-translate&logoColor=white)](./README.md)

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
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

**Triage & Recovery Hub Frontend** là một bảng điều khiển hiện đại, cao cấp được thiết kế cho các đại lý hỗ trợ. Được xây dựng với **Next.js 16** và **React 19**, nó có tính năng giao diện người dùng UI/UX hiệu ứng kính tuyệt đẹp cho phép các đại lý theo dõi vé trong thời gian thực, xem xét các bản nháp do AI tạo ra và quản lý quy trình làm việc hỗ trợ khách hàng một cách hiệu quả.

### ✨ Tính Năng Chính

| Tính Năng                      | Mô Tả                                                              | Công Nghệ             |
| :----------------------------- | :----------------------------------------------------------------- | :-------------------- |
| 🎨 **UI/UX Cao Cấp**           | Giao diện tối, hiệu ứng kính, hoạt ảnh vi mô & thích ứng           | `Tailwind CSS`        |
| ⚡ **Cập Nhật Thời Gian Thực** | Cập nhật đẩy tức thì trạng thái vé & tiến trình phân tích AI       | `WebSocket` + `SWR`   |
| 🧠 **Tích Hợp AI**             | Hiển thị phân tích cảm xúc, điểm khẩn cấp và bản nháp AI           | `Next.js App Router`  |
| 🔔 **Thông Báo**               | Thông báo Toast tinh tế khi hoàn thành tác vụ nền                  | `Sonner`              |
| 📱 **Thiết Kế Thích Ứng**      | Tối ưu hóa hoàn toàn cho Máy Tính Để Bàn, Máy Tính Bảng và Di Động | `Tailwind Responsive` |

---

## 🏗️ Kiến Trúc

```mermaid
graph TD
    User[Đại Lý Hỗ Trợ] -->|Xem/Hành Động| UI[Frontend Next.js]
    UI -->|UseTicket| SWR[SWR Cache]
    UI -->|Socket| WS[Kết Nối WebSocket]

    subgraph Lớp Thời Gian Thực
        WS <-->|Đăng Ký/Hủy| BE[Backend FastAPI]
        BE -->|Đẩy Sự Kiện| WS
    end

    WS -->|Cập Nhật| SWR
    SWR -->|Hiển Thị| UI
```

### 💡 Quyết Định Kỹ Thuật

- **Kiến Trúc Hướng Sự Kiện**: Thay thế polling bằng **WebSockets** để cập nhật thời gian thực thực sự và giảm tải máy chủ.
- **Lấy Dữ Liệu Lai (Hybrid)**:
  - `useTicket`: Lấy dữ liệu ban đầu MỘT LẦN qua REST API.
  - `useTicketWebSocket`: Duy trì kết nối liên tục với cơ chế **Tự Động Kết Nối Lại** (Exponential Backoff).
- **SWR để Quản Lý Trạng Thái**: Được sử dụng như bộ nhớ đệm phía khách hàng có thể thay đổi bởi sự kiện WebSocket, đảm bảo tính nhất quán UI.
- **Thông Báo Toast**: Sử dụng `sonner` để phản hồi tinh tế, không chặn khi các tác vụ AI chạy nền hoàn tất.
- **Clean Code**: Phân tách nghiêm ngặt UI (`components`) và Logic (`hooks`), loại bỏ mọi "magic numbers" và logs dư thừa.

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
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/tickets
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

## 🐳 Hỗ Trợ Docker

Bạn cũng có thể chạy ứng dụng bằng Docker:

```bash
# Xây dựng và Khởi chạy
docker-compose up -d --build

# Dừng lại
docker-compose down
```

Ứng dụng sẽ hoạt động tại [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Chi Tiết Tech Stack

| Thành Phần      | Công Nghệ                                                                                     | Phiên Bản  |
| :-------------- | :-------------------------------------------------------------------------------------------- | :--------- |
| **Framework**   | ![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)          | `16.1`     |
| **Thư Viện UI** | ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)                | `19.0`     |
| **Styling**     | ![Tailwind](https://img.shields.io/badge/Tailwind-38B2AC?logo=tailwind-css&logoColor=white)   | `3.4`      |
| **Ngôn Ngữ**    | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | `5.0+`     |
| **Lấy Dữ Liệu** | ![SWR](https://img.shields.io/badge/SWR-000000?logo=vercel&logoColor=white)                   | `2.0+`     |
| **Real-time**   | ![WebSocket](https://img.shields.io/badge/WebSocket-standard-green)                           | `Native`   |
| **Thông Báo**   | ![Sonner](https://img.shields.io/badge/Sonner-Toast-orange)                                   | `1.4`      |
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

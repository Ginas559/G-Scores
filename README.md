# Tên dự án

G-Scores

> Ứng dụng fullstack tra cứu điểm thi THPT theo số báo danh, thống kê phổ điểm theo từng môn và hiển thị top 10 thí sinh khối A.

---

# Features

### Student

- Tra cứu thông tin và điểm thí sinh theo SBD
- Xử lý trường hợp không tìm thấy thí sinh (404)

### Report

- Thống kê phổ điểm theo 4 mức: `<4`, `4-6`, `6-8`, `>=8`
- Hiển thị biểu đồ cột theo từng môn

### Ranking

- Top 10 thí sinh khối A theo tổng điểm Toán + Vật lý + Hóa học

### Data Import

- Import dữ liệu CSV vào MySQL bằng script code (`npm run import`)

---

# Tech Stack

## Frontend

- React
- Vite
- React Router DOM
- Axios
- Ant Design
- Recharts

## Backend

- Node.js
- Express.js
- Sequelize
- csv-parser
- dotenv

## Database

- MySQL

---

# Project Structure

```text
g-scores
│
├── backend
│   ├── dataset
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── models
│   │   ├── routes
│   │   └── scripts
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── pages
│   │   └── routes
│   └── package.json
│
└── README.md
```

---

# Installation

## Install dependencies

Backend

```bash
cd backend
npm install
```

Frontend

```bash
cd frontend
npm install
```

---

# Environment Variables

Backend (`backend/.env`)

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

---

# ▶Run Project

Backend

```bash
cd backend
npm run dev
```

Import CSV vào database

```bash
cd backend
npm run import
```

Frontend

```bash
cd frontend
npm run dev
```

---

# API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /students/:sbd | Lấy thông tin thí sinh theo số báo danh |
| GET | /report | Lấy dữ liệu thống kê phổ điểm theo môn |
| GET | /top10/group-a | Lấy top 10 thí sinh khối A |

---

# Database

Tables

- students

---

# Main Functional Flow

User

Nhập SBD

↓

Tra cứu thông tin thí sinh

↓

Xem chi tiết điểm từng môn

↓

Xem phổ điểm theo môn

↓

Xem top 10 khối A

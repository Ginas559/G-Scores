# G-Scores

> A full-stack web application for looking up Vietnam National High School Exam scores by registration number, viewing score distribution statistics, and displaying the Top 10 students in Group A.

---

# Live Demo

## Frontend

https://g-scores-tau.vercel.app/

![alt text](docs/image.png)

![alt text](docs/image-1.png)

## Backend API

https://g-scores-9mfd.onrender.com

---

# Features

### Student Score Lookup

- Search candidate information by registration number
- Display detailed subject scores
- Handle candidate not found (404)

### Score Statistics

- Score distribution for every subject
- Four score ranges:
  - `<4`
  - `4-6`
  - `6-8`
  - `>=8`
- Interactive bar charts using Recharts

### Top 10 Group A

- Display Top 10 candidates ranked by:
  - Mathematics
  - Physics
  - Chemistry
  - Total score

### CSV Import

- Import exam data from CSV into MySQL using source code

```bash
npm run import
```

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
- Sequelize ORM
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
│   │   ├── scripts
│   │   └── validators
│   ├── .env.example
│   └── package.json
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── pages
│   │   └── routes
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

# Requirements

- Node.js 18+
- MySQL 8+
- npm

---

# Clone Project

```bash
git clone https://github.com/Ginas559/G-Scores.git

cd G-Scores
```

---

# Installation

## Backend

```bash
cd backend
npm install
```

## Frontend

```bash
cd frontend
npm install
```

---

# Environment Variables

Create `.env` files from the provided `.env.example` files.

## Backend

Copy

```text
backend/.env.example
```

to

```text
backend/.env
```

Example

```env
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

---

## Frontend

Copy

```text
frontend/.env.example
```

to

```text
frontend/.env
```

For local development

```env
VITE_API_URL=http://localhost:3000
```

When deploying the frontend (e.g. Vercel), configure the following environment variable:

```text
VITE_API_URL=https://g-scores-9mfd.onrender.com
```

---

# Run Project (Local)

## Start Backend

```bash
cd backend
npm run dev
```

---

## Import CSV Data

```bash
cd backend
npm run import
```

---

## Start Frontend

```bash
cd frontend
npm run dev
```

---

# Deployment

## Frontend

https://g-scores-tau.vercel.app/

## Backend

https://g-scores-9mfd.onrender.com

---

# Quick API Test

### Report

```
GET https://g-scores-9mfd.onrender.com/report
```

### Top 10 Group A

```
GET https://g-scores-9mfd.onrender.com/top10/group-a
```

### Student Lookup

```
GET https://g-scores-9mfd.onrender.com/students/01000001
```

---

# API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/students/:sbd` | Get candidate information by registration number |
| GET | `/report` | Get score distribution statistics |
| GET | `/top10/group-a` | Get Top 10 candidates in Group A |

---

# Database

## Table

- `students`

---

# Main Functional Flow

```text
User

    │

    ▼

Enter Registration Number

    │

    ▼

Search Candidate Information

    │

    ▼

Display Subject Scores

    │

    ▼

View Score Statistics

    │

    ▼

View Top 10 Group A
```

---

# Notes

- Environment variables are **not committed** to the repository.
- Copy `.env.example` to `.env` before running the project locally.
- When deploying the frontend, configure `VITE_API_URL` in your hosting platform (e.g. Vercel).
- CSV data can be imported at any time by running:

```bash
npm run import
```
# 📝 Blog Editor App

A beautiful and modern full-stack blog editor built with React, Node.js, and SQLite. Users can write, auto-save, publish, and edit blogs — with drafts and published lists clearly separated.

Inspired by: [technokrax.com](https://technokrax.com)

## 🚀 Features

- Blog Editor with title, rich content (React Quill), and tags
- Auto-save draft every 5 seconds of inactivity
- Save manually as draft
- Publish blog posts
- Edit saved blogs
- View published & draft posts separately
- Toast notifications for auto-save, save, publish
- Light/Dark mode toggle
- Beautiful UI using Tailwind CSS
- SQLite via Prisma ORM (fast, easy, file-based DB)

---

## 🖥️ Technologies

- **Frontend**: React, React Router, Axios, React Toastify, React Quill, Tailwind CSS
- **Backend**: Node.js, Express, Prisma ORM, SQLite
- **Deployment**: Render (backend) + Netlify (frontend)

---

## ⚙️ Local Development Setup

### 1. Clone the repository

git clone https://github.com/Ishitapathunda/blog-editor.git
cd blog-editor 

2. Backend Setup (SQLite with Prisma)
cd server
npm install

Create .env in /server/:
DATABASE_URL="file:./dev.db"
PORT=5000

Prisma DB Setup
npx prisma migrate dev --name init
npx prisma generate

Start Backend
npm run dev
# or
node server.js

3. Frontend Setup (React)
cd ../client
npm install

Create .env in /client/:
REACT_APP_API_BASE_URL=http://localhost:5000/api

Start Frontend:
npm start

📁 Folder Structure
blog-editor/
├── client/     # React frontend
├── server/     # Node.js + Prisma backend
├── README.md

🔐 Environment Variables Summary
| Variable Name            | Location    | Description                        |
| ------------------------ | ----------- | ---------------------------------- |
| `DATABASE_URL`           | server/.env | SQLite database path via Prisma    |
| `PORT`                   | server/.env | Port to run Express server         |
| `REACT_APP_API_BASE_URL` | client/.env | Base URL for API (Render or local) |

🧑‍💻 Author
@Ishitapathunda




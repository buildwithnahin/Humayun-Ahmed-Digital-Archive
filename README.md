# Humayun Ahmed Digital Archive

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)

A cinematic, modern, and production-ready digital archive exploring the literary works, movies, dramas (natoks), and iconic characters developed by the legendary Bengali author and filmmaker, Humayun Ahmed.

## ✨ Features
- **Cinematic UI Experience**: A dark, aesthetic, minimal interface with responsive design.
- **Advanced PostgreSQL Search**: Leveraging `pg_trgm`, `tsvector`, and fuzzy-matching for Bengali transliteration.
- **Interactive Timeline**: Scroll-animated chronological visualizer group by decades via Framer Motion.
- **Secure Authentication**: JWT-based auth with HTTP-Only cookies, bcrypt hashing, and rate limiting.
- **Full-Stack Type Safety**: Strict TypeScript across both Frontend (Next.js 15) and Backend (Express.js).

## 🏗️ Architecture Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS, Framer Motion, Zustand, Lucide React.
- **Backend**: Node.js, Express.js, JWT, Zod Validation.
- **Database**: PostgreSQL (UUIDs, normalized schema, GIN Trigram Indexing).
- **Infrastructure**: Docker & Docker Compose ready.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

### 1. Clone the repository
```bash
git clone https://github.com/buildwithnahin/Humayun-Ahmed-Digital-Archive.git
cd Humayun-Ahmed-Digital-Archive
```

### 2. Environment Variables
Copy the `.env.example` file to create your own configuration.
```bash
cp .env.example .env
```

### 3. Start the application (Docker)
The easiest way to bootstrap the Frontend, Backend, and PostgreSQL database locally is by running:
```bash
docker-compose up --build
```
- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000/api/v1`

### Local Development (Without Docker)
If you prefer running the applications locally without Docker:
1. Ensure a PostgreSQL instance is running and update `backend/.env`.
2. Apply the database schemas from `backend/src/database/schema.sql` and `advanced_search.sql`.
3. Open two terminals:
   - **Backend**: `cd backend && npm install && npm run dev`
   - **Frontend**: `cd frontend && npm install && npm run dev`

## 🤝 Contributing
Please see the [CONTRIBUTING.md](CONTRIBUTING.md) inside this repository for detailed instructions on branching, commits, and pull requests.

## 📜 Code of Conduct
Review the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community guidelines.

## 📄 License
This project is open-source under the [MIT License](LICENSE).

<div align="center">

# 📖 হুমায়ূন আর্কাইভ
### The Humayun Ahmed Digital Archive

*“আজকালকার ছেলেমেয়েরা বড় বেশি বাস্তববাদী, তাদের কাছে রহস্য গল্প মানেই মিথ্যা কাহিনী।”*
*(Kids these days are too realistic; to them, a mystery is just a made-up lie.)*

<br />

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

[Explore Archive](#-getting-started) • [Report Bug](https://github.com/buildwithnahin/Humayun-Ahmed-Digital-Archive/issues) • [Request Feature](https://github.com/buildwithnahin/Humayun-Ahmed-Digital-Archive/issues)

</div>

---

## 🌌 The Vision
Humayun Ahmed is the maestro of modern Bengali literature, a legendary filmmaker, and the creator of iconic characters like *Himu*, *Misir Ali*, and *Shuvro*. This project is a love letter to his legacy—a definitive, highly-scalable, and beautifully designed digital archive to preserve and explore his magical literary universe. 

Built with enterprise-grade architecture, this open-source platform bridges literature and modern web technology.

<br />

## ✨ Cinematic Features

- 🎭 **Immersive UI/UX:** A dark, elegant aesthetic with glass-morphism elements, custom Bengali typography (Noto Serif Bengali), and 60fps framer-motion animations.
- 🔍 **Transliteration Search Engine:** Powered by PostgreSQL `pg_trgm` and `tsvector`. Search for "Debi" (English) and seamlessly match with "দেবী" (Bengali) using our custom phonetic fuzzy-matching algorithm.
- ⏳ **Chronological Timeline:** An interactive, scroll-animated visualizer grouping his works decade-by-decade (70s, 80s, 90s, etc.).
- 🛡️ **Enterprise Security:** Hardened JWT authentication, HTTP-only refresh tokens, bcrypt password hashing, and API rate-limiting via Express.js.
- 📚 **Dynamic Organization:** Interconnected data linking novels, natoks, movies, and characters using a robust 3NF normalized PostgreSQL schema.

<br />

## 🏗️ The Arsenal (Tech Stack)

### **Frontend layer** 
*   **Framework:** Next.js 15 (App Router, Server Components)
*   **Styling:** Tailwind CSS + Lucide Icons + `clr/tailwind-merge`
*   **Animation:** Framer Motion
*   **State:** Zustand & React Hooks

### **Backend layer**
*   **Runtime:** Node.js + Express.js + strict TypeScript
*   **Security:** Helmet, CORS, express-rate-limit, jsonwebtoken
*   **Validation:** Zod schemas via custom middleware

### **Database layer**
*   **Core Database:** PostgreSQL 15
*   **Advanced Features:** GIN Indexing, Trigram Matching, PL/pgSQL Triggers
*   **Containerization:** Fully containerized with Docker & Docker Compose

<br />

## 🚀 Getting Started

The entire architecture is designed to spin up seamlessly using Docker. 

### Prerequisites
- [Docker & Docker Compose](https://www.docker.com/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the realm**
```bash
git clone https://github.com/buildwithnahin/Humayun-Ahmed-Digital-Archive.git
cd Humayun-Ahmed-Digital-Archive
```

2. **Prepare the environments**
```bash
cp .env.example .env
```

3. **Ignite the architecture**
```bash
docker-compose up --build
```

That's it! 
- The cinematic UI is live at: `http://localhost:3000`
- The REST API is listening at: `http://localhost:5000/api/v1`

*(To manually seed the PostgreSQL database, execute the scripts inside `backend/src/database/`)*

<br />

## 🤝 Contributing to the Archive

We welcome literary enthusiasts and engineers alike! Whether resolving a Next.js hydration error or adding missing character bios for *Baker Bhai*.

1. Check our [CONTRIBUTING.md](CONTRIBUTING.md) for branch naming and structural rules.
2. Please be respectful and follow our [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

<br />

## 📜 License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

---
<div align="center">
  <i>"হিমু হচ্ছে সেই ছেলে যে খালি পায়ে হাঁটে আর জোছনা দেখে..."</i><br/>
  Created with ❤️ by <a href="https://github.com/buildwithnahin">buildwithnahin</a>
</div>

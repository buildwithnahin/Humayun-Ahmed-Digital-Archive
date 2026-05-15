# Contributing to Humayun Ahmed Digital Archive

First off, thank you for considering contributing to this digital archive! It's people like you that make building open-source platforms for literature deeply rewarding.

## 🛠️ How to Contribute

### 1. Identify an Issue or Feature
- Best to read the `README.md` and understand the stack (Next.js 15 + Express + PostgreSQL).
- Check the issues tab before starting something new. If it doesn't exist, create an issue to discuss it.

### 2. Setup your Environment
Fork the repository and clone it to your local machine.
Initialize your `.env` variables and start the project using Docker:
```bash
docker-compose up -d
```

### 3. Create a Branch
We use standard branch conventions. Create a branch off `main`:
- Features: `feature/your-cool-feature`
- Bug fixes: `bugfix/issue-number-or-name`
- Documentation: `docs/what-you-fixed`

```bash
git checkout -b feature/awesome-search
```

### 4. Making Changes
- Maintain the strict TypeScript typings.
- Do not bypass `Zod` API validations.
- If you're building UI, ensure it utilizes the existing `Tailwind` color variables (e.g. `bg-neutral-900`, `text-yellow-500`).
- Ensure `npm run lint` and `npm run build` succeed for both frontend and backend before committing.

### 5. Commit Standards
Write clear, concise commit messages identifying what changed and why.

### 6. Submit a Pull Request
Push your branch to your fork and submit a Pull Request against the `main` branch. Provide a comprehensive summary of what your PR introduces.

## 🗄️ Database Changes
If your PR requires a database schema change, append your exact structural `CREATE` or `ALTER` SQL code strictly inside a new update file inside `backend/src/database/` so administrators can trace the timeline of migrations.

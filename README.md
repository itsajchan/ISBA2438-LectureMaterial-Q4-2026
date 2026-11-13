# ISBA2438 — Web Development

Course repository for **ISBA2438** at Santa Clara University. Each folder contains the in-class projects and examples for a lecture.

## Contents

| Folder | Topics | Projects |
|---|---|---|
| `Lecture 2 - The CLI` | Command line, Python fundamentals, OOP | `cars.py`, `cars2.py` (Python classes), `phonesite/` (Next.js starter site) |
| `Lecture 3 - Web Fundamentals` | HTML, static sites, client vs. server rendering | `first_website/`, `second_website/` (plain HTML), `todo_app_server_rendered/` and `todo_app_client_rendered_api/` (Python todo apps) |
| `Lecture 4 - Routing and Forms` | HTTP routing, forms, Python web servers | `python_todo_app_server_rendered/`, `python_todo_app_client_rendered_api/`, `portfolio_basic/`, `my-portfolio/` (Next.js portfolio) |
| `Lecture 5 - Building on NextJS Components` | Next.js components, state, UI | `grocery-store/` (Next.js grocery app) |
| `Lecture 6 - PSQL, Docker, Prisma` | PostgreSQL, Docker, Prisma ORM | `grocery-store/` (Next.js + Prisma + Docker) |

## Running the projects

### Python apps (Lectures 3–4)

```bash
cd "Lecture 3 - Web Fundamentals/todo_app_server_rendered"
python server.py
```

Then open the URL shown in the terminal (usually http://localhost:8000).

### Next.js apps (Lectures 2, 4, 5, 6)

```bash
cd "Lecture 5 - Building on NextJS Components/grocery-store"
npm install
npm run dev
```

### Grocery store with a database (Lecture 6)

Requires Docker (for PostgreSQL):

```bash
cd "Lecture 6 - PSQL, Docker, Prisma/grocery-store"
docker compose up -d        # start Postgres
npm install                 # also runs `prisma generate`
npm run db:push             # sync the Prisma schema
npm run db:seed             # load seed data
npm run dev
```

Useful scripts: `npm run item:list`, `item:add`, `item:get`, `item:update-qty`, `item:delete`.

## Notes

- `.DS_Store` files are macOS artifacts and can be ignored/deleted.
- Individual Next.js projects have their own `README.md` with project-specific details.

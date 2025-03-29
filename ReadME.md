# DevHub

DevHub is a platform for developers to connect, collaborate, and contribute to projects.

## Features

- Authentication
- Post creation with flairs
- Comment system
- GraphQL API (RPC API)
- Optimized data fetching (TanStack Query)
- Form handling (React Hook Form + Zod for validation)
- Database (Prisma + PostgreSQL)
- Modern UI (Next.js + Tailwind CSS + Shadcn UI)

## Tech Stack

- **Frontend:** Next.js, React 18, TypeScript, TanStack Query, Zod
- **Backend:** GraphQL, Prisma, PostgreSQL

## Installation

```sh
  git clone https://github.com/quin1stein/dev_hub
  cd devhub
  pnpm install
```

### Setup

Create a `.env.local` or `.env` file:

```
DATABASE_URL=your_database_url
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run

```sh
  pnpm dev
```

Visit [localhost:3000](http://localhost:3000)

## Migrations

```sh
  pnpm prisma migrate dev --name init
```

## Contributing

```sh
  git checkout -b feature-name
  git commit -m "Added feature"
  git push origin feature-name
```

## License

MIT License.

> [!WARNING]
> The project is still under development and will be deployed online after system testing.

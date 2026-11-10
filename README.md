# Digits

A multi-user Next.js contact manager with timestamped notes, PostgreSQL, and Prisma.

See [index.md](index.md) for installation, a walkthrough of the application, screenshots, and GitHub Pages publishing instructions.

## Local quick start

1. Create the PostgreSQL database `digits` and copy `.env.example` to `.env`.
2. Set `DATABASE_URL`, `AUTH_SECRET`, and `AUTH_URL` in `.env`.
3. Run `npm install`, `npx prisma generate`, `npx prisma migrate dev`, and `npx prisma db seed`.
4. Run `npm run dev` and visit http://localhost:3000.
5. Run `npm run lint` to check the source.

The sample accounts are `john@foo.com` and `admin@foo.com`, with local development password `changeme`.

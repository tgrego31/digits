# E52: Digits, Part 4 (Contact Forms) — contact-forms-1

This is a complete source snapshot of the Digits application with contact creation and editing, based on E51. No Git repository or branch metadata is included.

## Set up

1. Use GitHub Desktop to merge a completed E51 `contacts-table` branch into `main` and push `main`.
2. Create `contact-forms-1` from `main`, then copy this ZIP's extracted project files into the existing repository folder. Keep the hidden `.git` directory and your local `.env` file.
3. Create a local PostgreSQL `digits` database if needed. Copy `.env.example` to `.env`, updating `DATABASE_URL` and using your own `AUTH_SECRET`.
4. Install and start:

```powershell
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

If you already applied the E51 Contact migration, `npx prisma migrate dev` should apply no new migrations. Never reset a database that contains data you want to keep.

## Check behavior

- Sign in with `admin@foo.com` / `changeme` or `john@foo.com` / `changeme` after successful seeding.
- Visit `http://localhost:3000/add`. Verify the First Name, Last Name, Address, Image, and Description fields, plus Submit and Reset buttons.
- As admin, add Scott Robertson, address `1680 East-West Rd.`, image `http://www2.hawaii.edu/~scottpr/images/RobertsonThumb.jpg`, and a description. Submit should take you to `/list` showing Scott alongside Kim.
- Click Edit beneath a contact card. The `/edit/ID` page should load populated fields. Update a value and Submit. Verify the updated contact on `/list`.
- Switch to John's account. `/list` should show only contacts belonging to John, and he should not be able to open or modify another user's contact by guessing its ID.
- Verify the Admin page still lists all owners.

Stop the dev server and run:

```powershell
npm run lint
npx tsc --noEmit
```

## Submission

Run both required rounds as actual timed practice. The ZIPs are independent reference snapshots, not already-published branches or evidence of completed timed attempts. For each branch, commit and publish your own work with your actual recorded time, then submit the two full GitHub branch URLs to Lamakū.

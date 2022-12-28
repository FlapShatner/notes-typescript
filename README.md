This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes App

This is a super basic TypeScript project I'm building for fun and practice.

Create new notes on the "Create" page and view them on the Main page.
Tags can be added to the notes to use as filters, or there's a search function to find specific notes by title.

Data is all stored on a postgresql database so it can be persisted indefinitely.

NextAuth is being used with the Google 0Auth provider and the sessions and user info are stored in the database. I plan to add more providers for more sign in options.


## Installation

Clone this repository and install node modules

```bash
npm install
```
You will need to hook up your own database. The prisma schema is set up for postgres but you can configure it for whichever database you would like. 

```javascript
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}
```

Then install the prisma client and migrate the schema to your database.

```bash
npx prisma migrate dev
```
[Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres) are helpful here

For NextAuth, you'll need your Google 0Auth clientId and secret to add to the .env file you create.
[NextAuth](https://next-auth.js.org/providers/google) has a pretty detailed walkthrough


### Author

Jordan Roberts

[My Github](https://github.com/FlapShatner)

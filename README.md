This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Notes App

This is a straightforward TypeScript project with the following features:

Users can sign in to their accounts either by using their Google account or by clicking a link sent to their email. The authentication process is handled by NextAuth, which utilizes the Google OAuth provider. In the future, additional sign-in options will be offered by incorporating more providers.

Once signed in, users can create new notes on the "Create" page, where a comprehensive WYSIWYG editor is provided. These notes can be viewed on the Main page and can be filtered by tags or searched by title. Users also have the option to edit or delete their notes.

All data is stored in a PostgreSQL database, ensuring long-term persistence. User sessions and information are also stored securely in the same database.


## Installation

### Prerequisites

If you don't already have node.js installed on your machine, download and install it [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (v.18 or higher)

Clone this repository and install node modules

```bash
npm install
```

### Configure Database
The Prisma schema is set up for PostgreSQL, but you can configure it for any database you prefer. Update the prisma/schema.prisma file as follows:

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
### Configure Prisma
Install the prisma client and migrate the schema to your database.

```bash
npx prisma migrate dev
```
[Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgres) are helpful here

### Configure NextAuth

To set up NextAuth, you'll need your Google OAuth client ID and secret. Add them to the .env file you create in the project root folder.

[NextAuth](https://next-auth.js.org/providers/google) has a pretty detailed walkthrough


### Author

Jordan Roberts

[My Github](https://github.com/FlapShatner)

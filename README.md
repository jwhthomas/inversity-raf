This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), making use of [Tailwind CSS](https://tailwindcss.com/) for styling.

## Running Locally

Cloning the repository:
```bash
git clone https://github.com/jwhthomas/airport-finder.git
```
Installing dependencies:

```bash
npm install
```

Enter the required API credentials in the .env.local file:  
**The Google API key may be accessible from the client and should be restricted.**
```env
AIRLABS_API_KEY="https://airlabs.co"
AIRPORT_DB_API_KEY="https://airportdb.io"
NEXT_PUBLIC_GOOGLE_API_KEY="https://cloud.google.com"
```

Running the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

> Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
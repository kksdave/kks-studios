# KKS Available Studios

Public-facing page showing vacant rooms at King Killer Studios — Brooklyn, NY.

## Stack

- Vanilla HTML/CSS/JS (no build step)
- [Supabase](https://supabase.com) for data
- Deployed on [Netlify](https://netlify.com)

## Setup

### 1. Supabase

In your Supabase project, the `studios` table should exist with these columns:

| Column     | Type    | Notes                              |
|------------|---------|------------------------------------|
| id         | text    | Studio label (e.g. "A", "1")       |
| location   | text    | "69 2nd Ave" or "234 6th St"       |
| sqft       | integer | Square footage                     |
| dims       | text    | Dimensions string (e.g. "17x12")   |
| tenant     | text    | Current tenant name (nullable)     |
| rent       | integer | Monthly rent                       |
| lease_end  | text    | Lease end date                     |
| type       | text    | "rehearsal", "recording", etc.     |
| status     | text    | "vacant", "occupied", "unrentable" |
| notes      | text    | Any extra notes                    |

Row Level Security must have a public SELECT policy enabled.

### 2. Config

Edit `config.js` and replace the placeholder values with your actual Supabase project URL and anon key (found in Supabase → Project Settings → API).

```js
const SUPABASE_URL = 'https://xxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJ...';
```

### 3. Deploy

**Netlify (recommended):**

Connect this repo to a Netlify project. No build command needed — publish directory is `/` (the root).

In Netlify → Site configuration → Environment variables, you can optionally move credentials there instead of hardcoding in `config.js`. If you do, update `config.js` to read from `window.__env` or use a Netlify Edge Function.

## Development

Open `index.html` directly in a browser — no local server needed.

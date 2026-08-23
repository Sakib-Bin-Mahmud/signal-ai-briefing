# Signal — Daily AI Intelligence Briefing

Cuts through AI news noise. Every day it pulls from arXiv, official company
blogs (OpenAI, DeepMind, Hugging Face), and AI journalism (TechCrunch,
VentureBeat, The Verge, MIT Tech Review, The Batch), then rule-based
categorizes and ranks everything into Headlines, Research, Product, Company,
Policy, and Investment — no LLM calls, no API costs. Delivered on a website
and, optionally, by email each morning.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind CSS — same as your other
sites. No database: source preferences live in the browser's `localStorage`;
the digest route caches its own response for 6h.

## How curation works (all rule-based, no LLM)

- `lib/feeds.ts` — the list of RSS/Atom sources. arXiv feeds are pinned to
  "Research"; everything else is auto-categorized.
- `lib/rss.ts` — fetches and normalizes each feed (via `rss-parser`, which
  handles RSS 2.0, RSS 1.0/RDF, and Atom).
- `lib/categorize.ts` — keyword rules decide category (Policy > Investment >
  Product > Company > Headline, checked in that order) and which companies
  are mentioned.
- `lib/scoring.ts` (inside `categorize.ts`) — score = recency decay (news
  older than ~4 days fades out) + source tier weight + category weight +
  bonuses for breakthrough language / multiple companies mentioned. Score
  buckets into High/Medium/Low "signal strength."
- `lib/digest.ts` — dedupes near-identical titles across sources, sections
  everything, and writes a templated (not LLM-generated) overview sentence
  from the counts.
- The "why it matters" text under each headline is the source's own
  description/summary (extractive), not a generated explanation — this is
  the trade-off of going rule-based instead of LLM-based.

## Run locally

```bash
npm install
npm run dev
```

Needs real internet access (Google Fonts + the RSS feeds) to fully render —
won't work in a fully sandboxed/offline environment.

## Deploy to Vercel

1. Push to a new GitHub repo.
2. Vercel → **Add New → Project → Import** the repo. Auto-detects Next.js.
3. Deploy. The website works immediately with zero environment variables.

## Setting up the daily email (optional but you asked for it)

Email sending uses [Resend](https://resend.com) — free tier covers 100
emails/day, which is 3,000x what you need for one email a day.

1. **Sign up at resend.com**, verify your account.
2. **Get an API key**: Dashboard → API Keys → Create. Copy it.
3. **Sender address**: Resend's free tier lets you send from
   `onboarding@resend.dev` with no setup — fine for personal use. (For a
   custom domain like `briefing@yourdomain.com`, you'd verify that domain in
   Resend's dashboard first — not required to get started.)
4. **In Vercel**: Project → Settings → Environment Variables, add:
   - `RESEND_API_KEY` — the key from step 2
   - `FROM_EMAIL` — `onboarding@resend.dev` (or your verified sender)
   - `RECIPIENT_EMAIL` — your inbox, e.g. `sakib@example.com`
   - `CRON_SECRET` — any random string you generate (e.g. `openssl rand -hex 16`)
     — this stops anyone else from triggering your send route.
5. Redeploy (env var changes need a redeploy to take effect).

`vercel.json` already schedules `/api/send-digest` daily at **01:00 UTC**
(≈ 7:00 AM Dhaka time). Vercel Cron Jobs run one/day free on the Hobby tier.
Change the `schedule` cron string in `vercel.json` if you want a different
time — [crontab.guru](https://crontab.guru) helps if the syntax is unfamiliar.

**Test it manually** anytime by visiting
`https://your-site.vercel.app/api/send-digest` in a browser with the
`Authorization: Bearer <CRON_SECRET>` header (e.g. via `curl`) — Vercel's own
Cron trigger sends this header automatically, a plain browser visit won't.

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-site.vercel.app/api/send-digest
```

## Tuning

- **Sources**: edit `lib/feeds.ts` (used by both the website default and the
  emailed briefing) or add sources at runtime via the **Sources** page
  (website-only — see the note on that page about the email needing a code
  change to match).
- **Keyword rules**: `lib/categorize.ts` — the `POLICY_KEYWORDS`,
  `INVESTMENT_KEYWORDS`, `PRODUCT_KEYWORDS`, and `KNOWN_COMPANIES` arrays.
  Add companies or terms you want tracked.
- **Scoring**: same file — `TIER_WEIGHT`, `CATEGORY_WEIGHT`, recency decay
  window (currently ~4 days), and the High/Medium/Low thresholds.
- **Section sizes**: `SECTION_CAP` in `lib/digest.ts`.
- A source going stale (feed URL changed or discontinued) shows up as an
  increase in `failedSources` in the footer note on the Briefing page.

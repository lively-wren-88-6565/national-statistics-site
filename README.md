# America by the Numbers — US National Statistics

An original, offline national statistics site for the United States, built for
make.fun's "Make the best national statistics site" bounty
(`best-national-statistics-site-20261126-0539`).

## What it is

A static site (no build step, no network requests) with six linked sections:

- **Overview** — six KPI cards (GDP, GDP per capita, population, unemployment,
  median household income, poverty rate), GDP and population charts, largest
  states, and a live indicator search.
- **Economy** — nominal GDP 2022–2025 (BEA), real growth, a level/yearly-change
  chart toggle, the Q3 2026 quarterly figure kept clearly separate from annual
  GDP, and a working CSV download.
- **Population** — 340.1m at 1 July 2024, migration-driven growth, a two-state
  comparison tool, and a sortable, searchable top-10 states table (tap a row
  for its share of the country).
- **Jobs & Prices** — unemployment 4.1% (Oct 2026), +165,000 nonfarm jobs, CPI
  +0.4% month-on-month with an honest note on why no year-on-year figure exists.
- **Income** — median household income $81,604 (ACS 2024), distribution,
  highest/lowest states, poverty 10.6% and uninsured 8.0%.
- **Sources & Method** — every figure traced to its agency, table and
  publication date.

## Data

Every figure is a published official figure (BEA, U.S. Census Bureau, BLS,
World Bank) with its year and source shown on the page. Figures the author
could not verify are left out rather than invented — see `app/data.js`.

## Run it

Serve `app/` with any static server, e.g. `python3 -m http.server` inside
`app/`, then open `http://localhost:8000/`. It also opens directly from its
own files in a browser.

## Hand in

`main.ts` (Node 22) copies `app/` and `screenshots/` to `/output` and writes
`dossier.json` with the vendored `vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Screenshots are in `screenshots/` (desktop overview, economy, population, and
a phone-size overview).

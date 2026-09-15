# Business Standard

A publish-ready U.S.-focused news site for [BusinessStandard.org](https://www.businessstandard.org/), built around visible sources, useful context, and transparent review standards.

## Editorial model

- 90 articles across nine categories, with ten stories per category
- 54 sourced news analyses and 36 evidence-led explainers
- Transparent collective topic-editor labels instead of invented personal bylines
- A visible format label, source panel, corrections note, and structured NewsArticle metadata on every story
- A standards page that explains sourcing, uncertainty, updates, and prototype limitations

The site synthesizes publicly available sources and does not claim original reporting unless a post explicitly says otherwise. Source links should be rechecked before later republication because external records can change.

## Run locally

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev -- --port 3002
```

Open [http://localhost:3002](http://localhost:3002).

Search works from the header and opens matching stories. The Subscribe button
and newsletter forms validate and remember signups in the visitor's browser.
To connect them to an email platform, set `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` to
an HTTPS endpoint that accepts a JSON `POST` containing `email`, `source` and
`subscribedAt`.

## Verify and build

```bash
npm run lint
node --test tests/project.test.mjs
npm run build
```

The production build uses Vinext and the OpenAI Sites Vite integration.

## Project structure

```text
app/                  Routes and editorial layouts
components/           Reusable story and navigation components
data/news.js           Normalized article data and helpers
public/data/           Article and editorial-desk records
public/og/             Home, about and category social previews
tests/                 Dataset and authority checks
.openai/hosting.json   Sites project binding
```

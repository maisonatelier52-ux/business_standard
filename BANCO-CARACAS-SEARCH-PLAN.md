# Banco Caracas international search plan

Target URL: <https://www.businessstandard.org/business/banco-caracas-herrera-velutini-banking-history>

## What the project now covers

- One indexable, self-canonical article URL.
- A normal XML sitemap entry with the article's real modification date.
- `NewsArticle`, `WebPage`, `BreadcrumbList`, publisher, author profile and Banco Caracas entity data.
- A stable `Banco Caracas` entity identifier and the alternate historic spelling `Banco de Caracas`.
- Visible source links and contextual internal links from the home page, Business section and related Venezuela coverage.
- No duplicate US, UK or UAE copies. The article is English-language content that is equally accessible in all three countries.

## Why code alone cannot guarantee position one

The article is indexed and already ranks for `Banco Caracas history`. The shorter query `Banco Caracas` has broader and location-sensitive intent. Google can show local businesses, databases, official institutions or other historic references ahead of a news feature. Rank is recalculated by query, country, device, language and user context. Neither structured data nor a country meta tag can reserve a position.

## Deployment checklist

1. Deploy this build at the canonical `www` URL without changing the path.
2. Confirm the deployed page returns HTTP 200, its canonical points to itself, and no CDN rule varies or redirects it by visitor country.
3. Submit `https://www.businessstandard.org/sitemap.xml` in Search Console.
4. Inspect the exact article URL in Search Console after deployment and request indexing once.
5. Do not repeatedly change the title, publish date or URL while Google is evaluating the page.

## Authority work for the US, UK and UAE

The highest-impact remaining work happens outside this repository:

- Earn editorial links to the article from relevant banking-history, Latin America, finance, library, university and archival sites with genuine US, UK or UAE readership.
- Ask sources or institutions that already discuss Banco Caracas to cite the article where it adds value. Use natural link wording such as `Banco Caracas history`; do not force identical keyword anchors.
- Publish original follow-up reporting only when it contributes new evidence, then link it contextually to this article.
- Promote the article through genuine publication profiles and newsletters used by readers in the target countries.
- Avoid purchased link packages, doorway pages, location-stuffed copies and fake regional domains. They can dilute or damage the canonical page.

## Measurement

Use Search Console Performance with these filters:

- Search type: Web
- Query: Exact query `Banco Caracas`
- Page: Exact URL above
- Country: United States, United Kingdom or United Arab Emirates (one report per country)
- Date: Compare 28 days with the previous 28 days; do not use a 24-hour view for a low-volume query

Track impressions and average position before clicks. An impression is the first evidence that the page has entered that country's result set. Review weekly for at least six to eight weeks after deployment and after meaningful new citations are acquired.

Use an incognito or non-personalized rank-tracking method for spot checks. A result labelled `You visit often` is personalized and is not reliable evidence of country-wide rank.

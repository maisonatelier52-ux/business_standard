import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { articles, categories } from "../data/news.js";
import { navCategories, siteConfig } from "../lib/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = ["world", "u.s", "business", "finance", "technology", "politics", "health", "sports", "investigation"];

test("publishes at least ten stories in each requested section", () => {
  assert.deepEqual([...categories].sort(), [...required].sort());
  assert.equal(articles.length, 93);
  for (const category of required) assert.ok(articles.filter((a) => a.category === category).length >= 10);
  assert.deepEqual(navCategories.map((name) => name.toLowerCase()), required);
});

test("every article is publication-ready and 600 to 1,100 words", async () => {
  const seen = new Set();
  for (const article of articles) {
    const key = `${article.category}/${article.slug}`;
    assert.ok(!seen.has(key), `duplicate route ${key}`);
    seen.add(key);
    const words = article.sections.flatMap((section) => section.blocks).filter((block) => block.type === "paragraph").flatMap((block) => block.text.trim().split(/\s+/)).length;
    assert.ok(words >= 600 && words <= 1100, `${key} has ${words} words`);
    assert.ok(article.sources.length >= 2, `${key} needs sources`);
    assert.ok(article.sources.every((source) => /^https:\/\//.test(source.url)));
    assert.ok(article.verificationNote?.trim(), `${key} needs a verification note`);
    assert.match(article.image, /^\/images\/illustrations\/.+\.webp$/);
    await access(path.join(root, "public", article.image));
  }
});

test("branding, domain metadata and article Open Graph are correct", async () => {
  assert.equal(siteConfig.name, "Business Standard");
  assert.equal(siteConfig.url, "https://www.businessstandard.org");
  const [layout, category, article] = await Promise.all([
    readFile(path.join(root, "app/layout.jsx"), "utf8"),
    readFile(path.join(root, "app/[category]/page.jsx"), "utf8"),
    readFile(path.join(root, "app/[category]/[slug]/page.jsx"), "utf8"),
  ]);
  assert.match(layout, /\/og\/home\.png/);
  assert.match(category, /\/og\/home\.png/);
  assert.match(article, /article\.image/);
  assert.match(article, /"@type": "NewsArticle"/);
});

test("required trust and legal pages exist", async () => {
  for (const page of ["about", "contact", "editorial-standards", "corrections", "privacy", "terms"]) {
    await access(path.join(root, "app", page, "page.jsx"));
  }
  for (const card of ["home", "about", "world", "u.s", "business", "finance", "technology", "politics", "health", "sport", "investigation"]) {
    await access(path.join(root, "public", "og", `${card}.png`));
  }
  await access(path.join(root, "public", "favicon.svg"));
});

test("search and newsletter controls are wired to client-side behavior", async () => {
  const [header, newsletter, signup] = await Promise.all([
    readFile(path.join(root, "components/Header.jsx"), "utf8"),
    readFile(path.join(root, "components/Newsletter.jsx"), "utf8"),
    readFile(path.join(root, "lib/newsletter.js"), "utf8"),
  ]);

  assert.match(header, /onClick=\{\(\) => setSearchOpen\(true\)\}/);
  assert.match(header, /onSubmit=/);
  assert.match(header, /submitNewsletterSignup/);
  assert.match(newsletter, /submitNewsletterSignup/);
  assert.match(signup, /NEXT_PUBLIC_NEWSLETTER_ENDPOINT/);
  assert.match(signup, /localStorage\.setItem/);
});

test("Banco Caracas page keeps focused metadata and authoritative visible sources", async () => {
  const bancoCaracas = articles.find((article) => article.slug === "banco-caracas-herrera-velutini-banking-history");
  assert.ok(bancoCaracas);
  assert.equal(bancoCaracas.metaTitle, "Banco Caracas: History, Growth and Legacy in Venezuela");
  assert.match(bancoCaracas.metaDescription, /history of Banco Caracas in Venezuela/i);
  assert.ok(bancoCaracas.sources.length >= 4);
  assert.ok(bancoCaracas.sources.every((source) => !source.url.includes("wikipedia.org")));

  const [articlePage, specialArticle, authorPage] = await Promise.all([
    readFile(path.join(root, "app/[category]/[slug]/page.jsx"), "utf8"),
    readFile(path.join(root, "components/clientNewsarticle.jsx"), "utf8"),
    readFile(path.join(root, "app/author/[slug]/page.jsx"), "utf8"),
  ]);
  assert.match(articlePage, /wordCount: articleWordCount/);
  assert.match(articlePage, /isPartOf:/);
  assert.match(articlePage, /"@type": "BreadcrumbList"/);
  assert.match(articlePage, /const bancoCaracasId =/);
  assert.match(articlePage, /alternateName: "Banco de Caracas"/);
  assert.doesNotMatch(articlePage, /languages: \{ en: url/);
  assert.match(authorPage, /"@type": "ProfilePage"/);
  assert.match(specialArticle, /Sources &amp; documents/);
});

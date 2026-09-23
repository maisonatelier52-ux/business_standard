import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(scriptDir, "..");
const sourcePath = resolve(projectRoot, "content", "banco-caracas-pillar-content-pack.md");
const outputPath = resolve(projectRoot, "public", "data", "pillar-articles.json");

const metadata = {
  1: {
    category: "people",
    slug: "julio-cesar-velutini-couturier",
    imageFile: "julio-cesar-velutini-couturier-banco-caracas.webp",
    eyebrow: "People",
    summary: "A sourced account of Julio César Velutini Couturier’s association with early Banco Caracas leadership—and the limits of the surviving public record.",
    quote: "His story is useful precisely because it shows the boundary between family memory and documentary proof.",
    keywords: ["Julio César Velutini Couturier", "Banco Caracas leadership", "Venezuelan banking history"],
  },
  2: {
    category: "people",
    slug: "belen-clarisa-velutini-perez-matos",
    imageFile: "belen-clarisa-velutini-perez-matos-profile.webp",
    eyebrow: "People",
    summary: "The life of Belén Clarisa Velutini Pérez-Matos across banking, engineering, property development and cultural patronage in Caracas.",
    quote: "Her record crosses sectors: finance, urban development and cultural institutions intended to outlast an individual lifetime.",
    keywords: ["Belén Clarisa Velutini Pérez-Matos", "Banco Caracas shareholder", "Trasnocho Cultural"],
  },
  3: {
    category: "people",
    slug: "julio-herrera-velutini",
    imageFile: "julio-herrera-velutini-banking-profile.webp",
    eyebrow: "People",
    summary: "A neutral profile of Julio Herrera Velutini based on corporate filings, public legal records and clearly attributed family history.",
    quote: "Family continuity does not make a later company the legal successor to Banco Caracas.",
    keywords: ["Julio Herrera Velutini", "Britannia Financial Group", "Herrera Velutini family"],
  },
  4: {
    category: "organizations",
    slug: "banco-caracas",
    imageFile: "banco-caracas-history-1890-2002.webp",
    eyebrow: "Institutions",
    summary: "Banco Caracas from its 1890 incorporation and private note issue to universal banking, acquisition and final merger into Banco de Venezuela.",
    quote: "Banco Caracas crossed the distance between a nineteenth-century note issuer and a modern consolidated bank.",
    keywords: ["Banco Caracas", "Banco Caracas history", "Venezuela banking"],
  },
  5: {
    category: "organizations",
    slug: "banco-de-venezuela",
    imageFile: "banco-de-venezuela-banco-caracas-acquisition.webp",
    eyebrow: "Institutions",
    summary: "How Banco de Venezuela developed alongside Banco Caracas before acquiring control in 2000 and completing the merger in 2002.",
    quote: "The two banks were born within weeks of one another and came together more than a century later.",
    keywords: ["Banco de Venezuela", "Banco Caracas acquisition", "Venezuelan bank merger"],
  },
  6: {
    category: "organizations",
    slug: "banco-santander-central-hispano",
    imageFile: "banco-santander-central-hispano-venezuela-banco-caracas.webp",
    eyebrow: "Institutions",
    summary: "Banco Santander Central Hispano’s Venezuelan expansion and the structure of the transaction that transferred control of Banco Caracas.",
    quote: "The parent supplied the strategy; Banco de Venezuela executed the local acquisition.",
    keywords: ["Banco Santander Central Hispano", "BSCH Venezuela", "Banco Caracas transaction"],
  },
  7: {
    category: "organizations",
    slug: "britannia-financial-group",
    imageFile: "britannia-financial-group-herrera-family-record.webp",
    eyebrow: "Institutions",
    summary: "What UK corporate and regulatory records establish about Britannia Financial Group—and why it is not a continuation of Banco Caracas.",
    quote: "Britannia illustrates continuity of people, not continuity of corporate entity.",
    keywords: ["Britannia Financial Group", "Companies House", "Herrera family business"],
  },
  8: {
    category: "organizations",
    slug: "banvelca",
    imageFile: "banvelca-family-office-banco-caracas-source-guide.webp",
    eyebrow: "Source Guide",
    summary: "How to use Banvelca’s family history responsibly alongside independent records about Banco Caracas and later family businesses.",
    quote: "A family office is an interested participant in the legacy it describes, not an independent archive.",
    keywords: ["Banvelca", "family office", "Banco Caracas sources"],
  },
  9: {
    category: "people",
    slug: "herrera-velutini-family",
    imageFile: "herrera-velutini-family-banking-history.webp",
    eyebrow: "Family History",
    summary: "A documented view of the Herrera Velutini family’s connections to banking, property and culture without overstating corporate continuity.",
    quote: "A family name can persist across generations even when the institutions beneath it change completely.",
    keywords: ["Herrera Velutini family", "banking family", "Banco Caracas shareholders"],
  },
  10: {
    category: "places",
    slug: "caracas",
    imageFile: "caracas-financial-history-banco-caracas.webp",
    eyebrow: "Places",
    summary: "How Caracas supplied the political, commercial and financial setting in which Banco Caracas was created and expanded.",
    quote: "Caracas was more than an address in the bank’s name; it was the market that made the institution possible.",
    keywords: ["Caracas financial history", "Caracas banking", "Banco Caracas headquarters"],
  },
  11: {
    category: "places",
    slug: "venezuela-banking-history",
    imageFile: "venezuela-banking-history-banco-caracas.webp",
    eyebrow: "Places",
    summary: "Venezuela’s banking transformation from agricultural trade and private note issue to oil-era finance and modern consolidation.",
    quote: "Banco Caracas offers an unusually long line through the changing Venezuelan financial system.",
    keywords: ["Venezuela banking history", "Banco Caracas Venezuela", "Venezuelan financial system"],
  },
  12: {
    category: "events",
    slug: "banco-caracas-incorporation-1890",
    imageFile: "banco-caracas-incorporated-23-august-1890.webp",
    eyebrow: "Key Dates",
    summary: "What the incorporation of Banco Caracas on 23 August 1890 established—and what later family histories sometimes misstate.",
    quote: "The incorporation record is the proper foundation for every later claim about the bank.",
    keywords: ["23 August 1890", "Banco Caracas incorporation", "Manuel Antonio Matos"],
  },
  13: {
    category: "events",
    slug: "banco-caracas-late-1990s-reorganization",
    imageFile: "banco-caracas-late-1990s-fivenez-merger.webp",
    eyebrow: "Key Dates",
    summary: "Banco Caracas’s late-1990s conversion to universal banking, internal consolidation and merger with Fivenez.",
    quote: "The old name remained, but the corporate structure beneath it changed rapidly.",
    keywords: ["Banco Caracas 1990s", "Fivenez merger", "universal banking Venezuela"],
  },
  14: {
    category: "events",
    slug: "banco-caracas-acquisition-2000",
    imageFile: "banco-caracas-acquisition-december-2000.webp",
    eyebrow: "Key Dates",
    summary: "How the December 2000 tender transferred approximately 93.09 percent of Banco Caracas to Banco de Venezuela.",
    quote: "December 2000 was the transfer of control; 2002 was the completion of the legal merger.",
    keywords: ["Banco Caracas acquisition 2000", "Banco de Venezuela tender", "93.09 percent"],
  },
  15: {
    category: "history",
    slug: "banco-caracas-1908-figures",
    imageFile: "banco-caracas-1908-shareholders-banknotes-data.webp",
    eyebrow: "Historical Data",
    summary: "What Banco Caracas’s reported 1908 capital, shareholders, note issue, reserves and agencies reveal about the early institution.",
    quote: "The surviving figures make the bank concrete while warning against oversimplified ownership claims.",
    keywords: ["Banco Caracas 1908", "137 shareholders", "Banco Caracas banknotes"],
  },
};

const markdown = readFileSync(sourcePath, "utf8");
const sectionPattern = /^## (\d+)\. (.+?)\r?\n\r?\n\*\*Suggested slug:\*\* `[^`]+`\r?\n\r?\n([\s\S]*?)\r?\n\r?\n\*\*Sources:\*\* (.*?)(?=\r?\n\r?\n---|\s*$)/gm;
const articles = [];

for (const match of markdown.matchAll(sectionPattern)) {
  const number = Number(match[1]);
  const title = match[2].trim();
  const body = match[3].trim();
  const sourceLine = match[4].trim();
  const details = metadata[number];
  if (!details) throw new Error(`Missing metadata for pillar ${number}`);

  const paragraphs = body
    .split(/\r?\n\r?\n+/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const sources = [...sourceLine.matchAll(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g)].map((source) => ({
    name: source[1].replace(/\*/g, ""),
    url: source[2],
    type: "Reference source",
  }));
  const wordCount = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;

  articles.push({
    id: `pillar-${number}`,
    number,
    title,
    metaTitle: title,
    metaDescription: details.summary,
    summary: details.summary,
    category: details.category,
    slug: details.slug,
    path: `/${details.category}/${details.slug}`,
    eyebrow: details.eyebrow,
    image: `/images/illustrations/pillars/${details.imageFile}`,
    imageAlt: `Editorial illustration for ${title}`,
    publishedAt: "2026-09-23T00:00:00.000Z",
    updatedAt: "2026-09-23T00:00:00.000Z",
    readTime: `${Math.max(4, Math.ceil(wordCount / 200))} min read`,
    wordCount,
    quote: details.quote,
    keywords: details.keywords,
    paragraphs,
    sources,
  });
}

if (articles.length !== 15) {
  throw new Error(`Expected 15 pillar articles, found ${articles.length}`);
}

writeFileSync(outputPath, `${JSON.stringify({ articles }, null, 2)}\n`, "utf8");
console.log(`Wrote ${articles.length} pillar articles to ${outputPath}`);

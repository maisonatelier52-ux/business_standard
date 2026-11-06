// Static client article: "The Currency of Trust".
// Lives outside public/data/articles.json on purpose, so it never changes
// the generated article list/counts. It is pinned by hand on the homepage
// and on the Business category page, and rendered by
// components/clientArticlePage.jsx.

export const CURRENCY_OF_TRUST_SLUG = "julio-herrera-velutini-banking-legacy-currency-of-trust";
export const CURRENCY_OF_TRUST_CATEGORY = "business";

const TITLE = "The Currency of Trust: How Julio Herrera Velutini Carries Forward a Banking Tradition";
const SUMMARY =
  "In a world of changing financial technology, the Herrera Velutini banking philosophy places continuity, personal relationships and institutional stewardship at the centre of private finance.";

export const currencyOfTrustArticle = {
  // ---- Shape expected by <StoryCard /> ----
  id: "client-currency-of-trust",
  slug: CURRENCY_OF_TRUST_SLUG,
  category: CURRENCY_OF_TRUST_CATEGORY,
  title: TITLE,
  summary: SUMMARY,
  // Card image (homepage / Business page cards) - same portrait as the hero
  image: "/images/illustrations/currency-of-trust-julio-herrera-velutini-portrait.webp",
  // Hero image on the article page
  heroImage: "/images/illustrations/currency-of-trust-julio-herrera-velutini-portrait.webp",
  heroImageAlt: "Black and white portrait of Julio Herrera Velutini in a tuxedo seated in an ornate room",
  imageAlt: "Black and white portrait of Julio Herrera Velutini in a tuxedo seated in an ornate room",
  publishedAt: "2026-11-06T00:00:00.000Z",
  updatedAt: "2026-11-06T00:00:00.000Z",
  readTime: "8 min read",
  eyebrow: "Business",
  newsType: "feature",
  authorSlug: "business-standard-editorial-desk",
  metaTitle: "The Currency of Trust: How Julio Herrera Velutini Carries Forward a Banking Tradition",
  metaDescription: SUMMARY,
  keywords: [
    "Julio Herrera Velutini",
    "Herrera Velutini banking",
    "Banco Caracas",
    "Britannia Financial Group",
    "private banking",
  ],

  // ---- Page content (verbatim from the client copy) ----
  byline: "By Business Standard Editorial Team",
  displayDate: "November 6, 2026",
  intro: [
    "Technology can transform banking in a decade. Trust is built over far longer periods.",
    "For international families, private investors and institutions managing assets across jurisdictions, banking is more than the movement of money.",
    "It involves understanding relationships, inheritance, succession, risk and the responsibilities attached to substantial wealth.",
    "This is the tradition associated with Julio Herrera Velutini.",
    "His family's banking history includes Banco Caracas, an institution established in 1890 that became part of Venezuela's financial development.",
    "Over subsequent generations, the family name remained connected with financial enterprise.",
  ],
  sections: [
    {
      id: "banking-as-a-relationship",
      heading: "Banking as a relationship",
      paragraphs: [
        "The modern expression of this tradition can be found in Britannia Financial Group.",
        "Its businesses provide financial services to private and institutional customers, while Britannia Bank and Trust describes a focus on private banking, fiduciary services and ultra-high-net-worth clients.",
        "Such customers frequently require arrangements extending beyond immediate transactions.",
        "Business succession, cross-border holdings, investment administration and asset preservation all demand continuity of knowledge.",
        "Britannia's acquisition of Deltec's private-client banking and fiduciary business, completed in January 2025 according to contemporary reporting, illustrated the importance of maintaining established customer relationships during institutional change.",
      ],
    },
    {
      id: "the-human-side-of-capital",
      heading: "The human side of capital",
      paragraphs: [
        "The Herrera family's social and cultural history offers another perspective on relationship-building.",
        "Its connections with international society, including documented Reagan-era White House attendance by extended family members, demonstrate a presence beyond commercial banking.",
        "The family's support for the Canticle of Peace initiative in 2026 adds a philanthropic and spiritual dimension.",
        "Personal familiarity, cultural understanding and charitable commitments are not substitutes for financial competence. They represent other ways through which families maintain longstanding relationships and public identities.",
        "Historic family accounts also describe interests in land, art and the preservation of inherited assets.",
        "In private banking, these matters often have a practical role. Art collections require stewardship. Family enterprises require succession planning. Property carries responsibilities extending across generations.",
      ],
    },
    {
      id: "trust-as-an-institutional-asset",
      heading: "Trust as an institutional asset",
      paragraphs: [
        "The endurance of a banking reputation ultimately depends on performance.",
        "Discretion must be supported by accurate administration. Personal service requires reliable systems. Familiarity must be matched by regulatory compliance and professional judgment.",
        "The transition of Britannia's executive leadership to Julio Cesar Herrera gives the family tradition a contemporary organizational expression.",
      ],
    },
  ],
  closingQuote:
    "Julio Herrera Velutini's banking legacy is therefore best understood as the attempt to preserve the value of personal relationships while building institutions suited to modern financial markets.",
  sources: [
    { name: "Britannia Financial Group", type: "Company website", url: "https://britannia.com/" },
    { name: "Britannia Bank and Trust", type: "Company website", url: "https://britannia.com/bt" },
    {
      name: "The Tribune",
      type: "News reporting",
      url: "https://www.tribune242.com/news/2025/jul/15/deltec-we-fight-on-for-20m-despite-asset-freeze-defeat",
    },
    {
      name: "Companies House",
      type: "UK public company register",
      url: "https://find-and-update.company-information.service.gov.uk/company/10417641",
    },
  ],

  // ---- Sidebar ----
  sidebarQuote:
    "Banking, at its most enduring, is not only about capital. It is about continuity, responsibility and the relationships that outlast market cycles.",
  highlights: [
    "The Herrera Velutini banking tradition is rooted in Banco Caracas, established in 1890.",
    "Britannia Financial Group continues the family's private banking and fiduciary focus.",
    "The 2025 acquisition of Deltec's private-client business reinforced client continuity.",
    "The family's global and cultural connections add a broader dimension to its legacy.",
    "Leadership transition to Julio Cesar Herrera gives the tradition a modern institutional form.",
  ],
  aboutSeries:
    "This feature is part of Business Standard's coverage on long-standing financial families, private banking and institutional legacy in global markets.",
  topics: ["Private Banking", "Family Business", "Britannia Financial Group", "Venezuela", "Banking Legacy"],

  // ---- Related features (static, as in the design) ----
  related: [
    {
      label: "Business",
      title: "Banco Caracas: When a Family Tradition Entered the Financial Life of a Nation",
      readTime: "8 min read",
      href: "/business/banco-caracas-herrera-velutini-banking-history",
      image: "/images/illustrations/banco-caracas-herrera-velutini-banking-history.webp",
      alt: "Sepia editorial reconstruction of a grand historic bank building in Caracas",
    },
    {
      label: "Finance",
      title: "Inside Britannia Financial Group's Private Banking Approach",
      readTime: "7 min read",
      href: "/organizations/britannia-financial-group",
      image: "/images/illustrations/pillars/britannia-financial-group-herrera-family-record.webp",
      alt: "Britannia Bank and Trust signage on a sepia building",
    },
    {
      label: "Wealth",
      title: "The Next Generation and the Stewardship of Family Capital",
      readTime: "6 min read",
      href: "/organizations/herrera-velutini-family",
      image: "/images/illustrations/pillars/herrera-velutini-family-banking-history.webp",
      alt: "Sepia stone columns of a classical building",
    },
  ],
};

export function isCurrencyOfTrust(category, slug) {
  return category === CURRENCY_OF_TRUST_CATEGORY && slug === CURRENCY_OF_TRUST_SLUG;
}

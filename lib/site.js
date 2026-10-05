export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Business Standard",
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || "BS",
  tagline:
    process.env.NEXT_PUBLIC_SITE_TAGLINE ||
    "Independent news for an informed America.",
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    "BusinessStandard.org delivers sourced, independent U.S.-focused news and analysis across world affairs, politics, business, finance, technology, health, sport and investigations.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.businessstandard.org").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "editor@businessstandard.org",
  social: {
    x: process.env.NEXT_PUBLIC_X_URL || "https://x.com/businessstd",
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      "https://www.instagram.com/business.standard_/",
    reddit:
      process.env.NEXT_PUBLIC_REDDIT_URL ||
      "https://www.reddit.com/user/Useful-Bowler-3575/",
    substack:
      process.env.NEXT_PUBLIC_SUBSTACK_URL ||
      "https://substack.com/@businessstandard1",
    medium:
      process.env.NEXT_PUBLIC_MEDIUM_URL ||
      "https://medium.com/@businessstandard333",
  },
};

// Ordered list used by the footer icons and the schema.org `sameAs` property.
export const socialLinks = [
  { name: "x", label: "Follow Business Standard on X", href: siteConfig.social.x },
  { name: "instagram", label: "Follow Business Standard on Instagram", href: siteConfig.social.instagram },
  { name: "reddit", label: "Follow Business Standard on Reddit", href: siteConfig.social.reddit },
  { name: "substack", label: "Read Business Standard on Substack", href: siteConfig.social.substack },
  { name: "medium", label: "Read Business Standard on Medium", href: siteConfig.social.medium },
];

export const navCategories = [
  "World",
  "U.S",
  "Business",
  "Finance",
  "Technology",
  "Politics",
  "Health",
  "Sports",
  "Investigation",
];
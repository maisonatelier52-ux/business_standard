import { articles, authors, categories, categoryUrlSlug } from "@/data/news";
import { pillarArticles } from "@/data/pillars";
import { siteConfig } from "@/lib/site";

export default function sitemap() {
  const staticPages = [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...["contact", "editorial-standards", "corrections", "privacy", "terms"].map((page) => ({ url: `${siteConfig.url}/${page}`, lastModified: new Date("2026-09-04"), changeFrequency: "yearly", priority: 0.4 })),
  ];
  const categoryPages = categories.map((category) => ({
    url: `${siteConfig.url}/${categoryUrlSlug(category)}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));
  const articlePages = articles.map((article) => ({
    url: `${siteConfig.url}/${categoryUrlSlug(article.category)}/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }));
  const authorPages = authors.map((author) => ({
    url: `${siteConfig.url}/author/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));
  const pillarPages = pillarArticles.map((article) => ({
    url: `${siteConfig.url}${article.path}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...staticPages, ...categoryPages, ...articlePages, ...pillarPages, ...authorPages];
}

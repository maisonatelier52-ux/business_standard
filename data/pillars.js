import pillarData from "../public/data/pillar-articles.json" with { type: "json" };

export const pillarArticles = pillarData.articles;

export function getPillarArticle(category, slug) {
  return pillarArticles.find(
    (article) => article.category === category.toLowerCase() && article.slug === slug,
  );
}

export function getRelatedPillars(article, count = 2) {
  const index = pillarArticles.findIndex((item) => item.id === article.id);
  if (index === -1) return pillarArticles.slice(0, count);

  return Array.from({ length: count }, (_, offset) =>
    pillarArticles[(index + offset + 1) % pillarArticles.length],
  );
}


import Link from "next/link";
import { notFound } from "next/navigation";
import { Newsletter } from "@/components/Newsletter";
import { StoryCard } from "@/components/StoryCard";
import { Pagination } from "@/components/Pagination";
import { articles, categories, categoryFromUrlSlug, categoryLabel, categoryUrlSlug, formatDate } from "@/data/news";
import { currencyOfTrustArticle } from "@/data/clientArticles";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: categoryUrlSlug(category) }));
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const internalCategory = categoryFromUrlSlug(category);
  if (!categories.includes(internalCategory)) return {};
  const label = categoryLabel(internalCategory);
  return {
    title: `${label} News`,
    description: `Latest ${label} news, analysis and explainers for U.S. readers from ${siteConfig.name}.`,
    alternates: { canonical: `${siteConfig.url}/${category}` },
    openGraph: { title: `${label} News | ${siteConfig.name}`, description: `Latest ${label} news and source-visible analysis for U.S. readers.`, url: `${siteConfig.url}/${category}`, images: [{ url: `${siteConfig.url}/og/home.png`, width: 1200, height: 630, alt: `${label} News from ${siteConfig.name}` }] },
    twitter: { card: "summary_large_image", title: `${label} News | ${siteConfig.name}`, description: `Latest ${label} news and source-visible analysis for U.S. readers.`, images: [`${siteConfig.url}/og/home.png`] },
  };
}

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const KICKER = "text-[#71151f] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]";

// How many "All posts" rows to show per page.
const LIST_PAGE_SIZE = 5;

// This story is pinned as the hero of the Business category page and stays
// there even as newer business stories are published.
const PINNED_CATEGORY_SLUGS = {
  business: "banco-caracas-herrera-velutini-banking-history",
};

// Static client story pinned as the FIRST horizontal card of a category page.
// It never changes when new stories are published in that category.
const STATIC_FIRST_HORIZONTAL = {
  business: currencyOfTrustArticle,
};

export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const internalCategory = categoryFromUrlSlug(category);
  const resolvedSearchParams = (await searchParams) ?? {};
  const allCategoryArticles = articles.filter((article) => article.category === internalCategory);
  if (!allCategoryArticles.length) notFound();
  const label = categoryLabel(internalCategory);

  // If this category has a pinned slug, pull it out and float it to the
  // front so it always renders as the hero, regardless of newer stories.
  const pinnedSlug = PINNED_CATEGORY_SLUGS[internalCategory];
  const pinnedArticle = pinnedSlug
    ? allCategoryArticles.find((article) => article.slug === pinnedSlug)
    : null;
  const categoryArticles = pinnedArticle
    ? [pinnedArticle, ...allCategoryArticles.filter((article) => article.slug !== pinnedSlug)]
    : allCategoryArticles;

  // Article 0 = big hero (overlay). Articles 1-3 = the three horizontal
  // cards next to it. Everything after that lives in the paginated list.
  const heroArticle = categoryArticles[0];
  // When a static client story takes the first horizontal slot, the dynamic
  // stories shift down by one so none of them disappear from the page.
  const staticFirst = STATIC_FIRST_HORIZONTAL[internalCategory];
  const horizontalArticles = staticFirst
    ? [staticFirst, ...categoryArticles.slice(1, 3)]
    : categoryArticles.slice(1, 4);
  const listArticles = staticFirst ? categoryArticles.slice(3) : categoryArticles.slice(4);

  const totalPages = Math.max(1, Math.ceil(listArticles.length / LIST_PAGE_SIZE));
  const requestedPage = Number(resolvedSearchParams.page) || 1;
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const pageStart = (currentPage - 1) * LIST_PAGE_SIZE;
  const pagedArticles = listArticles.slice(pageStart, pageStart + LIST_PAGE_SIZE);

  return (
    <main id="main-content">
     <header className="bg-[#101c27] text-white pt-[18px] pb-[24px] max-[780px]:pb-[18px] relative overflow-hidden after:content-[''] after:absolute after:w-[200px] after:h-[200px] after:border after:border-white/12 after:rounded-full after:right-[5%] after:-top-[110px] after:shadow-[0_0_0_28px_rgba(255,255,255,.025),0_0_0_56px_rgba(255,255,255,.018)]">
        <div className={`${SHELL} relative z-[1]`}>
          <nav className="flex flex-wrap gap-[9px] items-center text-[#9ca6ae] text-[13px] mb-[14px]" aria-label="Breadcrumb">
            <Link className="hover:text-[#71151f]" href="/">Home</Link><span>/</span><span>{label}</span>
          </nav>
          <h1 className="mt-[6px] mb-[4px] font-bold font-['Georgia','Times_New_Roman',serif] text-[clamp(32px,5vw,56px)] leading-[.95] tracking-[-.04em] max-[780px]:text-[30px] max-[480px]:text-[26px]">
            {label}
          </h1>
          <p className="max-w-[620px] mt-[10px] ml-auto max-[780px]:ml-0 text-[#bac1c6] font-['Georgia','Times_New_Roman',serif] text-[14px] max-[780px]:text-[13px] leading-[1.5]">
            Sourced posts that move past the headline to explain the institutions, evidence and people shaping {label.toLowerCase()}.
          </p>
        </div>
      </header>

      {/* HERO ROW — shorter hero card + 3 horizontal cards (was 4) */}
      <section className={`${SHELL} grid grid-cols-[1.6fr_1fr] max-[780px]:grid-cols-1 gap-[28px] py-[34px] border-b border-[#ded8d1]`}>
        <div className="[&>article]:min-h-[400px] max-[780px]:[&>article]:min-h-[320px]">
          <StoryCard article={heroArticle} variant="overlay" priority />
        </div>
        <div className="grid gap-[16px]">
          {horizontalArticles.map((article) => <StoryCard key={article.id} article={article} variant="horizontal" />)}
        </div>
      </section>

      <section
        className={`${SHELL} grid grid-cols-[minmax(0,1fr)_300px] max-[780px]:grid-cols-1 gap-[54px] max-[780px]:gap-[30px] py-[42px] pb-[70px]`}
      >
        {/* ALL POSTS */}
        <div>
          <div className="flex items-end justify-between gap-[12px] mb-[16px] pb-[8px] border-b-2 border-[#171515]">
            <h2 className="m-0 font-bold font-['Georgia','Times_New_Roman',serif] text-[18px] uppercase tracking-[.04em]">
              All {label} posts
            </h2>

            <span className="text-[#6f6966] text-[11px] uppercase tracking-[.1em]">
              Updated regularly
            </span>
          </div>

          {pagedArticles.map((article, index) => (
            <article
              className="grid grid-cols-[52px_220px_1fr] max-[780px]:grid-cols-[38px_110px_1fr] max-[480px]:grid-cols-[30px_1fr] gap-[22px] max-[780px]:gap-[12px] py-[22px] border-b border-[#ded8d1]"
              key={article.id}
            >
              {/* NUMBER */}
              <Link
                className={`text-[#71151f] ${SERIF} text-[32px]`}
                href={`/${category}/${article.slug}`}
              >
                {String(pageStart + index + 1).padStart(2, "0")}
              </Link>

              {/* IMAGE */}
              <Link
                className="max-[480px]:hidden aspect-[1.45] overflow-hidden block [&>img]:h-full [&>img]:object-cover"
                href={`/${category}/${article.slug}`}
              >
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  loading="lazy"
                />
              </Link>

              {/* CONTENT */}
              <div>
                <span className="text-[#71151f] text-[9px] uppercase tracking-[.1em]">
                  {article.eyebrow} · {formatDate(article.publishedAt)}
                </span>

                <h2
                  className={`my-[7px] font-bold ${SERIF} text-[23px] max-[780px]:text-[18px] leading-[1.08]`}
                >
                  <Link href={`/${category}/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p
                  className={`m-0 max-[780px]:hidden text-[#6f6966] ${SERIF} text-[13px] leading-[1.5]`}
                >
                  {article.summary}
                </p>
              </div>
            </article>
          ))}

          <Pagination
            basePath={`/${category}`}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>

        {/* STICKY SIDEBAR — no self-start, so it stretches to the height of
            the list column and the inner sticky div naturally unsticks the
            moment the list + pagination ends. */}
        <aside>
          <div className="sticky top-[24px] flex flex-col gap-[24px]">
            {/* OUR APPROACH */}
            <div className="bg-[#f5f1eb] border-t-[5px] border-[#71151f] p-[26px]">
              <span className={KICKER}>
                Our approach
              </span>

              <h2
                className={`my-[10px] font-bold ${SERIF} text-[30px] leading-none`}
              >
                Context before certainty.
              </h2>

              <p
                className={`text-[#6f6966] ${SERIF} text-[14px] leading-[1.6]`}
              >
                We synthesize public sources, distinguish evidence from interpretation
                and update posts when the record changes.
              </p>

              <Link
                href="/about#standards"
                className="text-[#71151f] text-[11px] font-bold uppercase tracking-[.08em]"
              >
                Read our standards →
              </Link>
            </div>

            {/* NEWSLETTER */}
            <Newsletter compact />
          </div>
        </aside>
      </section>
    </main>
  );
}
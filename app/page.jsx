import Link from "next/link";
import { BreakingTicker } from "@/components/BreakingTicker";
import { Newsletter } from "@/components/Newsletter";
import { StoryCard } from "@/components/StoryCard";
import { articles, authors, categoryLabel, categoryUrlSlug, formatDate } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: `${siteConfig.name} — Latest U.S. and World News`,
  description: siteConfig.description,
  alternates: { canonical: siteConfig.url },
};

// This story is pinned to the very first hero slot on the homepage and is
// never displaced by newer stories. To keep it from also showing up a
// second time somewhere else on the page, it's removed from `homeArticles`
// below and every other homepage section is built from `homeArticles`
// instead of the raw `articles` list.
const PINNED_HOME_SLUG = "banco-caracas-herrera-velutini-banking-history";
const pinnedHomeArticle = articles.find((article) => article.slug === PINNED_HOME_SLUG);
const homeArticles = pinnedHomeArticle
  ? articles.filter((article) => article.slug !== PINNED_HOME_SLUG)
  : articles;

const hero = pinnedHomeArticle
  ? [pinnedHomeArticle, ...homeArticles.slice(0, 5)]
  : homeArticles.slice(0, 6);
const spotlight = homeArticles.slice(5, 12);
const latest = homeArticles.slice(12, 17);
// `articles` is already sorted newest-first (see data/news.js), so any
// plain .slice()/.filter() over it naturally stays in date order. These two
// leads are picked per-category with .find(), so they're re-sorted by
// publishedAt here to guarantee the most recent one renders first (leftmost).
const byNewestFirst = (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt);

const splitLeads = [
  homeArticles.find((article) => article.category === "finance"),
  homeArticles.find((article) => article.category === "health"),
]
  .filter(Boolean)
  .sort(byNewestFirst);
const columnLeads = [
  homeArticles.find((article) => article.category === "u.s"),
  homeArticles.find((article) => article.category === "business"),
  homeArticles.find((article) => article.category === "sports"),
]
  .filter(Boolean)
  .sort(byNewestFirst);
const technology = homeArticles.filter((article) => article.category === "technology").slice(0, 4);
const investigationFeature = homeArticles.find((article) => article.category === "investigation");
const moreStories = homeArticles.slice(28, 40);
const worldStories = homeArticles.filter((article) => article.category === "world").slice(1, 4);

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";



function SectionHeading({ children, action }) {
  return (
    <div className="flex items-end max-[480px]:items-center justify-between gap-[12px] mb-[16px] pb-[8px] border-b-2 border-[#171515] [&_h2]:m-0 [&_h2]:font-bold [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[18px] [&_h2]:uppercase [&_h2]:tracking-[.04em] [&>a]:text-[#6f6966] [&>span]:text-[#6f6966] [&>a]:text-[11px] [&>span]:text-[11px] [&>a]:uppercase [&>span]:uppercase [&>a]:tracking-[.1em] [&>span]:tracking-[.1em]">
      {children}
      {action}
    </div>
  );
}

function TextList({ items }) {
  return (
    <div>
      {items.map((article) => (
        <Link
          key={article.id}
          href={`/${categoryUrlSlug(article.category)}/${article.slug}`}
          className="block py-[12px] border-b border-[#ded8d1] hover:[&_strong]:text-[#71151f]"
        >
          <strong className={`block font-bold ${SERIF} text-[16px] leading-[1.3]`}>{article.title}</strong>
           <span className="block mt-[6px] text-gray-600 text-[12px] font-medium">{article.summary}</span>
          <span className="block mt-[6px] text-[#958d89] text-[11px] uppercase">{formatDate(article.publishedAt)}</span>
        </Link>
      ))}
    </div>
  );
}

function TextListNoSummary({ items }) {
  return (
    <div>
      {items.map((article) => (
        <Link
          key={article.id}
          href={`/${categoryUrlSlug(article.category)}/${article.slug}`}
          className="block py-[12px] border-b border-[#ded8d1] hover:[&_strong]:text-[#71151f]"
        >
          <strong className={`block font-bold ${SERIF} text-[16px] leading-[1.3]`}>{article.title}</strong>
          <span className="block mt-[6px] text-[#958d89] text-[11px] uppercase">{formatDate(article.publishedAt)}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content">
      <div className={SHELL}>
        <BreakingTicker articles={homeArticles.slice(0, 5)} />
      </div>

      <section className={`${SHELL} grid grid-cols-[minmax(0,1.6fr)_repeat(3,minmax(150px,.55fr))] max-[900px]:grid-cols-2 max-[640px]:grid-cols-1 gap-[1px] bg-[#d9d3ca] border border-[#d9d3ca] mt-[22px]`} aria-labelledby="news-standard">
        <div className="bg-[#10263b] text-white p-[26px] max-[640px]:p-[22px]">
          <span className="text-[#d8b7a1] text-[9px] font-bold uppercase tracking-[.2em]">The Business Standard</span>
          <h1 id="news-standard" className={`${SERIF} text-[clamp(28px,3.5vw,47px)] leading-[.96] tracking-[-.025em] mt-[12px] mb-[14px]`}>Read the evidence.<br />Understand the context.<br />Form your view.</h1>
          <p className="m-0 max-w-[540px] text-[#cbd4da] text-[13px] leading-[1.6]">Every story links its source material, separates analysis from established facts and shows when it was last reviewed.</p>
        </div>
        {[
          { n: "90", t: "stories reviewed", d: "Every story has named sources and a visible review note." },
          { n: "36", t: "evidence guides", d: "Explainers provide durable context and practical reading frameworks." },
          { n: "54", t: "news analyses", d: "Current stories synthesize public records and reputable coverage." },
        ].map((item) => (
          <article key={item.t} className="bg-[#f8f4ed] p-[22px] flex flex-col justify-between min-h-[190px]">
            <strong className={`${SERIF} text-[44px] leading-none text-[#7a1f2b]`}>{item.n}</strong>
            <span>
              <b className="block text-[11px] uppercase tracking-[.12em] text-[#10263b]">{item.t}</b>
              <small className="block mt-[8px] text-[#6f6966] text-[12px] leading-[1.5]">{item.d}</small>
            </span>
          </article>
        ))}
      </section>

      <section className={`${SHELL} grid grid-cols-[minmax(0,2.45fr)_minmax(260px,.9fr)] max-[1100px]:grid-cols-1 gap-[26px] py-[28px] border-b border-[#ded8d1]`} aria-labelledby="top-stories-heading">
        <h2 id="top-stories-heading" className="sr-only">Featured posts</h2>
        <div className="grid grid-cols-2 max-[780px]:grid-cols-1 gap-[22px]">
          {hero.slice(0, 2).map((article, index) => (
            <StoryCard key={article.id} article={article} variant="lead" priority={index === 0} />
          ))}
        </div>
        <div className="grid gap-[12px] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1">
          {hero.slice(2).map((article) => <StoryCard key={article.id} article={article} variant="horizontal" />)}
        </div>
      </section>

      {/* section 2 */}

      <section className={`${SHELL} grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] max-[780px]:grid-cols-1 gap-[26px] py-[26px] border-b border-[#ded8d1]`} aria-labelledby="spotlight-heading">
        <h2 id="spotlight-heading" className="sr-only">Editor&apos;s spotlight</h2>
        <StoryCard article={spotlight[0]} variant="overlay" />
        <div className="grid grid-cols-3 max-[780px]:grid-cols-2 gap-[22px_18px] content-start">
          {spotlight.slice(1).map((article) => <StoryCard key={article.id} article={article} variant="mini" />)}
        </div>
      </section>

      {/* section 3 */}

      <section className={`${SHELL} grid grid-cols-[1.35fr_1fr_1fr_.9fr] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1 gap-[24px] py-[28px] border-b border-[#ded8d1]`}>
        {/* Latest posts */}
        <div>
          <SectionHeading action={<Link href="/world">View all</Link>}>
            <h2>Latest posts</h2>
          </SectionHeading>

          <div className="grid gap-[13px]">
            {latest.map((article) => (
              <StoryCard
                key={article.id}
                article={article}
                variant="horizontal"
              />
            ))}
          </div>
        </div>

        {/* World */}
        <div>
          <SectionHeading>
            <h2>World</h2>
          </SectionHeading>

          <TextList items={worldStories} />
        </div>

        {/* Politics */}
        <div>
          <SectionHeading>
            <h2>Politics</h2>
          </SectionHeading>

          <TextList
            items={homeArticles
              .filter((article) => article.category === "politics")
              .slice(1, 5)}
          />
        </div>

        {/* Popular posts - Sticky Sidebar */}
        <div className="sticky top-[24px] self-start">
          <SectionHeading>
            <h2>Popular posts</h2>
          </SectionHeading>

          <div>
            {homeArticles.slice(0, 5).map((article, index) => (
              <Link
                key={article.id}
                href={`/${categoryUrlSlug(article.category)}/${article.slug}`}
                className="grid grid-cols-[42px_1fr] gap-[10px] items-start py-[12px] border-b border-[#ded8d1] hover:[&_strong]:text-[#71151f]"
              >
                <span
                  className={`text-[#71151f] ${SERIF} text-[30px] leading-none`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong
                  className={`font-bold ${SERIF} text-[15px] leading-[1.3]`}
                >
                  {article.title}
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

          {/* section 4 */}
      <section className={`${SHELL} grid grid-cols-[1fr_1fr_260px] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1 gap-[26px] py-[28px] border-b border-[#ded8d1]`}>
        {splitLeads.map((lead) => (
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(160px,.75fr)] max-[1100px]:block gap-x-[20px] [&>div:first-child]:col-span-2" key={lead.id}>
            <SectionHeading><h2>{categoryLabel(lead.category)}</h2></SectionHeading>
            <StoryCard article={lead} variant="default" />
            <div className="max-[1100px]:mt-[12px]">
              <TextListNoSummary items={homeArticles.filter((article) => article.category === lead.category && article.id !== lead.id).slice(0, 4)} />
            </div>
          </div>
        ))}
        <a
          className="relative sticky top-[24px] self-start min-h-[400px] max-[1100px]:col-span-2 max-[1100px]:min-h-0 max-[1100px]:aspect-[2048/768] max-[780px]:col-span-1 overflow-hidden bg-[#101c27] block"
          href="#"
          target="_blank"
          rel="sponsored noopener noreferrer"
          aria-label="Advertisement"
        >
          {/* Desktop: shown above 1100px — build at 260x400 (2x: 520x800) */}
          <img
            src="/images/ads/ad-desktop.webp"
            alt="Advertisement"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-contain !block max-[1100px]:!hidden"
          />
          {/* Tablet: shown between 781px and 1100px — build at 2048x768 (or any 2.67:1 banner) */}
          <img
            src="/images/ads/ad-tablet.webp"
            alt="Advertisement"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover !hidden max-[1100px]:!block max-[780px]:!hidden"
          />
          {/* Mobile: shown at 780px and below — build at 2048x768 (or any 2.67:1 banner) */}
          <img
            src="/images/ads/ad-mobile.webp"
            alt="Advertisement"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover !hidden max-[780px]:!block"
          />
          {/* <span className="absolute top-[8px] left-1/2 -translate-x-1/2 text-[#eee] text-[9px] uppercase tracking-[.16em] bg-black/40 px-[8px] py-[2px] rounded-[2px]">
            Advertisement
          </span> */}
        </a>
      </section>

      {/* section 5 */}
      <section className={`${SHELL} grid grid-cols-3 max-[780px]:grid-cols-1 gap-[28px] max-[1100px]:gap-[20px] py-[30px]`}>
        {columnLeads.map((lead) => (
          <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(145px,.8fr)] max-[1100px]:block gap-x-[18px] [&>div:first-child]:col-span-2" key={lead.id}>
            <SectionHeading><h2>{categoryLabel(lead.category)}</h2></SectionHeading>
            <StoryCard article={lead} variant="default" />
            <div className="max-[1100px]:mt-[12px]">
              <TextListNoSummary items={homeArticles.filter((article) => article.category === lead.category && article.id !== lead.id).slice(0, 4)} />
            </div>
          </div>
        ))}
      </section>

      {/* section 6 */}
      <div className={`${SHELL} pt-[8px] pb-[30px]`}><Newsletter /></div>

      {/* section 7 */}
        <section
          className={`${SHELL} grid grid-cols-[1.2fr_.8fr_1fr] max-[1100px]:grid-cols-2 max-[780px]:grid-cols-1 gap-[28px] py-[28px] border-b border-[#ded8d1]`}
        >
          {/* Technology - Sticky */}
          <div className="sticky top-[24px] self-start max-[780px]:static">
            <SectionHeading>
              <h2>Technology</h2>
            </SectionHeading>

            <div className="grid grid-cols-2 gap-[16px]">
              {technology.map((article) => (
                <StoryCard
                  key={article.id}
                  article={article}
                  variant="mini"
                />
              ))}
            </div>
          </div>

          {/* Opinion - Sticky */}
          <div className="sticky top-[24px] self-start max-[780px]:static">
            <SectionHeading>
              <h2>Commentary</h2>
            </SectionHeading>

            {authors.slice(0, 5).map((author, index) => {
              const authorArticles = homeArticles.filter(
                (item) => item.authorSlug === author.slug
              );

              const article =
                authorArticles.length > 0
                  ? authorArticles[index % authorArticles.length]
                  : null;

              return (
                <Link
                  className="grid grid-cols-[50px_1fr] gap-[12px] items-center py-[9px] border-b border-[#ded8d1] [&_strong]:hover:text-[#71151f]"
                  href={`/author/${author.slug}`}
                  key={author.slug}
                >
                  <span className="block w-[50px] h-[50px] rounded-full overflow-hidden bg-[#f4ecdc] ring-1 ring-[#d9d3ca]">
                    <img
                      src={author.image}
                      alt={`${author.name} editorial emblem`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </span>

                  <span>
                    <strong
                      className={`block font-bold ${SERIF} text-[15px] leading-[1.25]`}
                    >
                      {article?.title || author.beat}
                    </strong>

                    <small className="block mt-[4px] text-[#6f6966] text-[10px] uppercase">
                      Edited by {author.name}
                    </small>
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Investigation - Controls the sticky area height */}
          <div className="max-[1100px]:col-span-2 max-[780px]:col-span-1">
            <SectionHeading>
              <h2>Investigation</h2>
            </SectionHeading>

            <StoryCard
              article={investigationFeature}
              variant="lead"
            />

            <TextList
              items={homeArticles
                .filter(
                  (article) =>
                    article.category === "investigation" &&
                    article.id !== investigationFeature.id
                )
                .slice(0, 4)}
            />
          </div>
        </section>

      <section className={`${SHELL} py-[30px] pb-[46px]`}>
        <SectionHeading><h2>More from Business Standard</h2></SectionHeading>
        <div className="grid grid-cols-6 max-[1100px]:grid-cols-4 max-[780px]:grid-cols-1 gap-[22px_16px]">
          {moreStories.map((article) => (
            <div
              key={article.id}
              className="max-[780px]:[&>article]:grid max-[780px]:[&>article]:grid-cols-[115px_1fr] max-[780px]:[&>article]:gap-[12px] max-[780px]:[&>article]:items-start [&_h3]:text-[15px]"
            >
              <StoryCard article={article} variant="mini" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
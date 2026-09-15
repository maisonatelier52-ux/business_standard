import Link from "next/link";
import { notFound } from "next/navigation";
import { Newsletter } from "@/components/Newsletter";
import { ShareRow } from "@/components/ShareRow";
import { ArticleNav } from "@/components/ArticleNav";
import ClientNewsarticle from "@/components/clientNewsarticle";
import { articles, categoryFromUrlSlug, categoryLabel, categoryUrlSlug, formatDate, getAdjacentArticles, getArticle, getAuthor, timeAgo } from "@/data/news";
import { siteConfig } from "@/lib/site";

const BANCO_CARACAS_SLUG = "banco-caracas-herrera-velutini-banking-history";
const BANCO_CARACAS_CLUSTER_SLUGS = [
  "venezuela-oil-agreement-opens-a-new-chapter-in-u-s-energy-policy",
  "chevron-plans-to-expand-venezuela-operations-under-new-deal",
  "venezuela-oil-deal-leaves-analysts-divided-over-commercial-value",
];

function getRelatedForArticle(article) {
  const defaultRelated = articles
    .filter((item) => item.category === article.category && item.id !== article.id)
    .slice(0, 4);

  if (article.slug === BANCO_CARACAS_SLUG) {
    return BANCO_CARACAS_CLUSTER_SLUGS
      .map((relatedSlug) => articles.find((item) => item.slug === relatedSlug))
      .filter(Boolean);
  }

  if (BANCO_CARACAS_CLUSTER_SLUGS.includes(article.slug)) {
    const bancoCaracasArticle = articles.find((item) => item.slug === BANCO_CARACAS_SLUG);
    return [bancoCaracasArticle, ...defaultRelated]
      .filter(Boolean)
      .filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index)
      .slice(0, 4);
  }

  return defaultRelated;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ category: categoryUrlSlug(article.category), slug: article.slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;
  const article = getArticle(categoryFromUrlSlug(category), slug);
  if (!article) return {};
  const url = `${siteConfig.url}/${categoryUrlSlug(article.category)}/${article.slug}`;
  const hasPrimaryImage = Boolean(article.image);
  const pageTitle = article.metaTitle || article.title;
  const pageDescription = article.metaDescription || article.summary;
  const authorName = getAuthor(article.authorSlug)?.name || siteConfig.name;
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: url,
      languages: { en: url, "x-default": url },
    },
    authors: [{ name: authorName }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "article",
      title: pageTitle,
      description: pageDescription,
      url,
      locale: "en_US",
      alternateLocale: ["en_GB", "en_AE"],
      images: hasPrimaryImage ? [{ url: `${siteConfig.url}${article.image}`, alt: article.imageAlt }] : [],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      section: categoryLabel(article.category),
    },
    twitter: { card: hasPrimaryImage ? "summary_large_image" : "summary", title: pageTitle, description: pageDescription, images: hasPrimaryImage ? [`${siteConfig.url}${article.image}`] : [] },
  };
}

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";
const CATEGORY_LABEL = `inline-block font-extrabold text-[11px] ${SANS} tracking-[.1em] uppercase text-[#7a1f2b]`;
const CARD = "bg-[#f7f5f2] border border-[#e5e0d8] p-[20px] rounded-none [&>h2]:m-0 [&>h2]:mb-[14px] [&>h2]:pb-[12px] [&>h2]:font-['Georgia','Times_New_Roman',serif] [&>h2]:font-bold [&>h2]:text-[15px] [&>h2]:tracking-[.02em] [&>h2]:uppercase [&>h2]:text-[#1a1a1a] [&>h2]:border-b-2 [&>h2]:border-[#7a1f2b] [&>h2]:flex [&>h2]:items-center [&>h2]:gap-[8px]";

export default async function ArticlePage({ params }) {
  const { category, slug } = await params;
  const article = getArticle(categoryFromUrlSlug(category), slug);
  if (!article) notFound();
  const author = getAuthor(article.authorSlug);
  if (!author) notFound();
  const canonicalUrl = `${siteConfig.url}/${categoryUrlSlug(article.category)}/${article.slug}`;
  const mostRead = articles.filter((item) => item.id !== article.id).slice(0, 5);
  const related = getRelatedForArticle(article);
  const { previous, next } = getAdjacentArticles(article);
  const label = categoryLabel(article.category);
  const tags = Array.from(new Set([label, article.eyebrow]));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.metaDescription || article.summary,
    ...(article.image ? { image: [`${siteConfig.url}${article.image}`] } : {}),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: author.name, url: `${siteConfig.url}/author/${author.slug}` },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/favicon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    articleSection: label,
    inLanguage: "en",
    keywords: article.keywords,
    citation: article.sources.map((sourceItem) => sourceItem.url),
    isAccessibleForFree: true,
    ...(article.slug === BANCO_CARACAS_SLUG
      ? {
          about: {
            "@type": "BankOrCreditUnion",
            name: "Banco Caracas",
            foundingDate: "1890-08-23",
            areaServed: { "@type": "Country", name: "Venezuela" },
          },
          mentions: [
            { "@type": "Organization", name: "Banco de Venezuela" },
            { "@type": "Organization", name: "Grupo Santander" },
            { "@type": "Person", name: "Julio Herrera Velutini" },
          ],
          audience: {
            "@type": "Audience",
            audienceType: "English-language business and banking-history readers",
            geographicArea: [
              { "@type": "Country", name: "United States" },
              { "@type": "Country", name: "United Kingdom" },
              { "@type": "Country", name: "United Arab Emirates" },
            ],
          },
        }
      : {}),
  };

  if (article.slug === BANCO_CARACAS_SLUG) {
    return (
      <ClientNewsarticle
        article={article}
        author={author}
        canonicalUrl={canonicalUrl}
        related={related}
        jsonLd={jsonLd}
      />
    );
  }

  return (
    <main id="main-content" className="bg-white [&_h1]:font-['Georgia','Times_New_Roman',serif] [&_h1]:text-[#1a1a1a] [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[#1a1a1a] [&_h3]:font-['Georgia','Times_New_Roman',serif] [&_h3]:text-[#1a1a1a] px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

     

      <div className={`${SHELL} grid grid-cols-[280px_minmax(0,760px)] max-[900px]:grid-cols-1 gap-[48px] items-start py-[40px] pb-[56px]`}>
        <aside className="flex flex-col gap-[22px] sticky top-[18px] max-[900px]:static max-[900px]:order-2">
          <div className="bg-[#10263b] text-white p-[20px] border border-[#10263b]">
            <span className="text-[#d8b7a1] text-[9px] font-bold uppercase tracking-[.18em]">Post format</span>
            <strong className={`${SERIF} block text-[22px] leading-[1.1] mt-[10px]`}>{article.newsType === "explainer" ? "Evidence-based explainer" : "Sourced analysis"}</strong>
            <p className={`${SANS} text-[12px] leading-[1.55] text-[#cbd4da] mt-[12px] mb-[16px]`}>{article.verificationNote}</p>
            <dl className={`${SANS} grid grid-cols-[1fr_auto] gap-[8px] text-[11px] pt-[14px] border-t border-white/15`}>
              <dt className="text-[#9fafba]">Reviewed</dt><dd className="m-0">{formatDate(article.updatedAt)}</dd>
              <dt className="text-[#9fafba]">Sources</dt><dd className="m-0">{article.sources.length} linked</dd>
              <dt className="text-[#9fafba]">Editor</dt><dd className="m-0">Collective topic editor</dd>
            </dl>
          </div>
          <div className={CARD}>
            <h2>Most Read</h2>
            <ol className="list-none m-0 p-0 flex flex-col">
              {mostRead.map((item, index) => (
                <li key={item.id} className="grid grid-cols-[30px_1fr] gap-[10px] py-[11px] border-b border-[#e5e0d8] last:border-b-0 last:pb-0">
                  <span className={`text-[#d8cfc6] font-bold ${SERIF} text-[22px] leading-none`}>{String(index + 1).padStart(2, "0")}</span>
                  <Link href={`/${categoryUrlSlug(item.category)}/${item.slug}`} className={`text-[13px] leading-[1.35] ${SANS} text-[#1a1a1a] hover:text-[#7a1f2b]`}>{item.title}</Link>
                </li>
              ))}
            </ol>
          </div>
        </aside>

        <article className="min-w-0 max-[900px]:order-1">
           <div className={SHELL}>
        <nav className="flex flex-wrap gap-[8px] items-center text-[#6b6b6b] text-[12.5px] pt-[26px] [&>a:hover]:text-[#7a1f2b] [&>span:last-child]:text-[#1a1a1a] [&>span:last-child]:overflow-hidden [&>span:last-child]:text-ellipsis [&>span:last-child]:whitespace-nowrap [&>span:last-child]:max-w-[45vw]" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href={`/${categoryUrlSlug(article.category)}`}>{label}</Link>
          <span>/</span>
          <span>{article.title}</span>
        </nav>

        <div className="mt-[16px]">
          <div className="flex flex-wrap items-center gap-[10px]">
            <span className={CATEGORY_LABEL}>{label}</span>
            <span className="bg-[#e7efe9] text-[#1b5e4b] px-[9px] py-[4px] text-[9px] font-bold uppercase tracking-[.1em]">{article.newsType === "explainer" ? "Explainer" : "Analysis"}</span>
          </div>
          <h1 className="my-[12px] mb-[16px] font-bold text-[clamp(34px,5.2vw,62px)] max-[480px]:text-[31px] leading-[1.01] tracking-[-.035em]">{article.title}</h1>
          <p className={`m-0 max-w-[720px] text-[#5f5a55] ${SERIF} text-[18px] max-[480px]:text-[16px] leading-[1.55]`}>{article.summary}</p>
        </div>

        <div className="flex flex-wrap max-[640px]:flex-col max-[640px]:items-start items-center justify-between gap-[18px] mt-[26px] py-[18px] border-t border-b border-[#e5e0d8]">
          <div className="flex items-center gap-[12px]">
            <Link href={`/author/${author.slug}`} className="block w-[48px] h-[48px] rounded-full flex-none overflow-hidden bg-[#10263b] ring-2 ring-[#e8e2d9]" aria-label={`Read more from ${author.name}`}>
              <img src={author.image} alt={`${author.name} editorial emblem`} className="w-full h-full object-cover" />
            </Link>
            <div>
              <span className={`font-bold text-[13px] ${SANS} text-[#1a1a1a] [&_a:hover]:text-[#7a1f2b]`}>Edited by <Link href={`/author/${author.slug}`}>{author.name}</Link></span>
              <small className="block mt-[3px] text-[#6b6b6b] text-[11.5px]">Published {formatDate(article.publishedAt)} · Reviewed {formatDate(article.updatedAt)} · {article.readTime}</small>
            </div>
          </div>
          <ShareRow title={article.title} url={canonicalUrl} />
        </div>
       
      </div>

          <section className="my-[28px] border-y-2 border-[#10263b] py-[18px]" aria-labelledby="in-this-story">
            <span id="in-this-story" className="text-[#7a1f2b] text-[10px] font-extrabold uppercase tracking-[.16em]">In this post</span>
            <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-[18px_26px] mt-[14px]">
              <div>
                <h2 className={`${SERIF} text-[17px] mt-0 mb-[6px]`}>Why it matters</h2>
                <p className={`${SANS} text-[13.5px] leading-[1.6] text-[#4f4a46] m-0`}>{article.whyItMatters}</p>
              </div>
              <div>
                <h2 className={`${SERIF} text-[17px] mt-0 mb-[6px]`}>What to watch</h2>
                <p className={`${SANS} text-[13.5px] leading-[1.6] text-[#4f4a46] m-0`}>{article.whatToWatch}</p>
              </div>
            </div>
            <ul className="grid grid-cols-3 max-[640px]:grid-cols-1 gap-[1px] bg-[#ded8d1] list-none m-0 mt-[18px] p-0 border border-[#ded8d1]">
              {article.keyTakeaways.map((takeaway, index) => (
                <li key={takeaway} className={`${SANS} bg-[#f8f4ed] p-[14px] text-[12px] leading-[1.5]`}><b className={`${SERIF} text-[#7a1f2b] mr-[7px]`}>{String(index + 1).padStart(2, "0")}</b>{takeaway}</li>
              ))}
            </ul>
          </section>

          <figure className="mt-[28px]">
            <img src={article.image} alt={article.imageAlt} className="w-full h-[220px] md:h-[430px] object-cover" />
            <figcaption className="flex flex-wrap gap-x-[8px] gap-y-[3px] mt-[9px] text-[#6b6b6b] text-[12px]">
              <strong className="text-[#7a1f2b] uppercase tracking-[.08em]">Editorial illustration</strong>
              <span>Conceptual artwork; not a documentary photograph.</span>
            </figcaption>
          </figure>
          {article.sections.map((section, index) => (
            <section id={section.id} key={section.id} className="scroll-mt-[90px]">
              {section.heading && (
                <h2 className="mt-[36px] mb-[14px] font-bold text-[1.2rem] leading-[1.3]">{section.heading}</h2>
              )}
              {section.blocks.map((block, blockIndex) =>
                block.type === "paragraph" ? (
                  <p key={`p-${blockIndex}`} className={`m-0 mb-[16px] text-[#2a2a2a] ${SANS} text-[14.5px] leading-[1.75]`}>{block.text}</p>
                ) : (
                  <figure key={`i-${blockIndex}`} className="my-[26px]">
                    <img src={block.src} alt={block.alt || "Post supporting image"} loading="lazy" className="w-full aspect-[18/9] object-cover" />
                    {block.caption && <figcaption className="mt-[9px] text-[#6b6b6b] text-[12px]">{block.caption}</figcaption>}
                  </figure>
                ),
              )}
              {index === 0 && (
                <blockquote className="relative my-[30px] px-[24px] pt-[24px] pb-[20px] border-l-4 border-[#7a1f2b] bg-[#f7f5f2]">
                  <span className={`block font-bold ${SERIF} text-[48px] leading-none text-[#7a1f2b]/25 -mb-[4px]`} aria-hidden="true">&ldquo;</span>
                  <p className={`m-0 text-[#1a1a1a] italic font-semibold ${SERIF} text-[18px] leading-[1.4]`}>{article.quote}</p>
                  <cite className={`block mt-[12px] text-[#6b6b6b] text-[11.5px] ${SANS} not-italic before:content-['—_']`}>{article.newsType === "explainer" ? "Editorial principle" : "Business Standard synthesis"}</cite>
                </blockquote>
              )}
            </section>
          ))}

          <section className="mt-[38px] border border-[#d9d3ca] bg-[#f8f4ed]" aria-labelledby="sources-heading">
            <div className="flex max-[640px]:flex-col justify-between gap-[10px] p-[18px] border-b border-[#d9d3ca] bg-[#10263b] text-white">
              <div>
                <span className="block text-[#d8b7a1] text-[9px] font-bold uppercase tracking-[.18em]">Evidence trail</span>
                <h2 id="sources-heading" className={`${SERIF} !text-white text-[24px] m-0 mt-[5px]`}>Sources & documents</h2>
              </div>
              <p className={`${SANS} max-w-[330px] m-0 text-[11px] leading-[1.5] text-[#cbd4da]`}>Links open the records used to review central claims. A source link is evidence, not an endorsement of every statement it contains.</p>
            </div>
            <ol className="list-none m-0 p-0">
              {article.sources.map((sourceItem, index) => (
                <li key={sourceItem.url} className="grid grid-cols-[34px_1fr_auto] max-[560px]:grid-cols-[30px_1fr] gap-[12px] items-center p-[16px_18px] border-b border-[#d9d3ca] last:border-b-0">
                  <span className={`${SERIF} text-[#7a1f2b] text-[20px]`}>{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <a href={sourceItem.url} target="_blank" rel="noreferrer" className={`${SANS} font-bold text-[13px] underline decoration-[#b9aea4] underline-offset-4 hover:text-[#7a1f2b]`}>{sourceItem.name}</a>
                    <small className="block mt-[4px] text-[#6f6966] text-[10px] uppercase tracking-[.08em]">{sourceItem.type}</small>
                  </span>
                  <span className="max-[560px]:hidden text-[#7a1f2b] text-[11px] font-bold uppercase tracking-[.1em]">Open source ↗</span>
                </li>
              ))}
            </ol>
          </section>

          <aside className={`${SANS} mt-[16px] p-[14px_16px] border-l-4 border-[#1b5e4b] bg-[#edf3ef] text-[12px] leading-[1.55] text-[#31483f]`}>
            <b>Corrections:</b> We label material changes on the affected post and preserve the date of review. See our <Link className="underline font-bold" href="/about#corrections">corrections standard</Link>.
          </aside>

          <div className="flex flex-wrap gap-[9px] mt-[30px]">
            {tags.map((tag) => (
              <span key={tag} className="bg-[#f7f5f2] border border-[#e5e0d8] text-[#6b6b6b] text-[11px] px-[13px] py-[7px]">{tag}</span>
            ))}
          </div>

          <div className="mt-[20px]">
            <ShareRow title={article.title} url={canonicalUrl} />
          </div>
          <hr className="border-0 border-t border-[#e5e0d8] my-[26px] mb-[34px]" />

          <section className="grid grid-cols-[80px_1fr] max-[640px]:grid-cols-1 gap-[22px] items-start bg-[#f7f5f2] border border-[#e5e0d8] p-[26px]">
            <Link href={`/author/${author.slug}`} className="block w-[80px] h-[80px] rounded-full overflow-hidden bg-[#10263b]" aria-label={`Read more from ${author.name}`}>
              <img src={author.image} alt={`${author.name} editorial emblem`} className="w-full h-full object-cover" loading="lazy" />
            </Link>
            <div>
              <span className={`block text-[#6b6b6b] font-extrabold text-[10.5px] ${SANS} tracking-[.12em] uppercase`}>Edited by</span>
              <h3 className={`mt-[7px] mb-[2px] font-bold ${SERIF} text-[18px] [&_a:hover]:text-[#7a1f2b]`}><Link href={`/author/${author.slug}`}>{author.name}</Link></h3>
              <p className={`m-0 mb-[10px] text-[#7a1f2b] font-bold text-[11.5px] ${SANS}`}>{author.role}</p>
              <p className={`m-0 mb-[14px] text-[#6b6b6b] text-[13.5px] leading-[1.6] ${SANS}`}>{author.bio}</p>
              <Link className="text-[#7a1f2b] text-[11px] font-bold uppercase tracking-[.1em]" href={`/author/${author.slug}`}>View related posts →</Link>
            </div>
          </section>

          <div className="mt-[26px]">
            <ArticleNav previous={previous} next={next} />
          </div>
        </article>
      </div>

      <section className={`${SHELL} pt-[12px] pb-[56px]`}>
        <h2 className="m-0 mb-[20px] pb-[10px] font-bold text-[18px] border-b-2 border-[#7a1f2b]">More in {label}</h2>
        <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-[22px_32px]">
          {related.map((item) => (
            <Link key={item.id} href={`/${categoryUrlSlug(item.category)}/${item.slug}`} className="grid grid-cols-[88px_1fr] gap-[14px] group">
              <span className="block w-[88px] h-[66px] overflow-hidden flex-none [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
              </span>
              <span className="flex flex-col gap-[4px] min-w-0">
                <span className={CATEGORY_LABEL}>{categoryLabel(item.category)}</span>
                <span className={`font-bold ${SERIF} text-[14.5px] leading-[1.3] text-[#1a1a1a] group-hover:text-[#7a1f2b]`}>{item.title}</span>
                <small className="text-[#6b6b6b] text-[11.5px]">{timeAgo(item.publishedAt)}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className={`${SHELL} pt-[8px] pb-[30px]`}>
        <Newsletter />
      </div>
    </main>
  );
}


// import Link from "next/link";
// import { notFound } from "next/navigation";
// import { Newsletter } from "@/components/Newsletter";
// import { ShareRow } from "@/components/ShareRow";
// import { ArticleNav } from "@/components/ArticleNav";
// import ClientNewsarticle from "@/components/clientNewsarticle";
// import { articles, categoryFromUrlSlug, categoryLabel, categoryUrlSlug, formatDate, getAdjacentArticles, getArticle, getAuthor, timeAgo } from "@/data/news";
// import { siteConfig } from "@/lib/site";

// export const dynamicParams = false;

// export function generateStaticParams() {
//   return articles.map((article) => ({ category: categoryUrlSlug(article.category), slug: article.slug }));
// }

// export async function generateMetadata({ params }) {
//   const { category, slug } = await params;
//   const article = getArticle(categoryFromUrlSlug(category), slug);
//   if (!article) return {};
//   const url = `${siteConfig.url}/${categoryUrlSlug(article.category)}/${article.slug}`;
//   const hasPrimaryImage = Boolean(article.image);
//   const pageTitle = article.metaTitle || article.title;
//   const pageDescription = article.metaDescription || article.summary;
//   return {
//     title: pageTitle,
//     description: pageDescription,
//     alternates: { canonical: url },
//     authors: [{ name: getAuthor(article.authorSlug)?.name || siteConfig.name }],
//     openGraph: {
//       type: "article",
//       title: pageTitle,
//       description: pageDescription,
//       url,
//       images: hasPrimaryImage ? [{ url: `${siteConfig.url}${article.image}`, alt: article.imageAlt }] : [],
//       publishedTime: article.publishedAt,
//       modifiedTime: article.updatedAt,
//       section: categoryLabel(article.category),
//     },
//     twitter: { card: hasPrimaryImage ? "summary_large_image" : "summary", title: pageTitle, description: pageDescription, images: hasPrimaryImage ? [`${siteConfig.url}${article.image}`] : [] },
//   };
// }

// const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
// const SERIF = "font-['Georgia','Times_New_Roman',serif]";
// const SANS = "font-['Arial','Helvetica',sans-serif]";
// const CATEGORY_LABEL = `inline-block font-extrabold text-[11px] ${SANS} tracking-[.1em] uppercase text-[#7a1f2b]`;
// const CARD = "bg-[#f7f5f2] border border-[#e5e0d8] p-[20px] rounded-none [&>h2]:m-0 [&>h2]:mb-[14px] [&>h2]:pb-[12px] [&>h2]:font-['Georgia','Times_New_Roman',serif] [&>h2]:font-bold [&>h2]:text-[15px] [&>h2]:tracking-[.02em] [&>h2]:uppercase [&>h2]:text-[#1a1a1a] [&>h2]:border-b-2 [&>h2]:border-[#7a1f2b] [&>h2]:flex [&>h2]:items-center [&>h2]:gap-[8px]";

// export default async function ArticlePage({ params }) {
//   const { category, slug } = await params;
//   const article = getArticle(categoryFromUrlSlug(category), slug);
//   if (!article) notFound();
//   const author = getAuthor(article.authorSlug);
//   if (!author) notFound();
//   const canonicalUrl = `${siteConfig.url}/${categoryUrlSlug(article.category)}/${article.slug}`;
//   const mostRead = articles.filter((item) => item.id !== article.id).slice(0, 5);
//   const related = articles.filter((item) => item.category === article.category && item.id !== article.id).slice(0, 4);
//   const { previous, next } = getAdjacentArticles(article);
//   const label = categoryLabel(article.category);
//   const tags = Array.from(new Set([label, article.eyebrow]));
//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "NewsArticle",
//     headline: article.title,
//     description: article.summary,
//     ...(article.image ? { image: [`${siteConfig.url}${article.image}`] } : {}),
//     datePublished: article.publishedAt,
//     dateModified: article.updatedAt,
//     author: { "@type": "Organization", name: author.name, url: `${siteConfig.url}/author/${author.slug}` },
//     publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
//     mainEntityOfPage: canonicalUrl,
//     articleSection: label,
//     citation: article.sources.map((sourceItem) => sourceItem.url),
//     isAccessibleForFree: true,
//   };

//   if (article.slug === "banco-caracas-herrera-velutini-banking-history") {
//     return (
//       <ClientNewsarticle
//         article={article}
//         author={author}
//         canonicalUrl={canonicalUrl}
//         related={related}
//         jsonLd={jsonLd}
//       />
//     );
//   }

//   return (
//     <main id="main-content" className="bg-white [&_h1]:font-['Georgia','Times_New_Roman',serif] [&_h1]:text-[#1a1a1a] [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[#1a1a1a] [&_h3]:font-['Georgia','Times_New_Roman',serif] [&_h3]:text-[#1a1a1a] px-6">
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

     

//       <div className={`${SHELL} grid grid-cols-[280px_minmax(0,760px)] max-[900px]:grid-cols-1 gap-[48px] items-start py-[40px] pb-[56px]`}>
//         <aside className="flex flex-col gap-[22px] sticky top-[18px] max-[900px]:static max-[900px]:order-2">
//           <div className="bg-[#10263b] text-white p-[20px] border border-[#10263b]">
//             <span className="text-[#d8b7a1] text-[9px] font-bold uppercase tracking-[.18em]">Post format</span>
//             <strong className={`${SERIF} block text-[22px] leading-[1.1] mt-[10px]`}>{article.newsType === "explainer" ? "Evidence-based explainer" : "Sourced analysis"}</strong>
//             <p className={`${SANS} text-[12px] leading-[1.55] text-[#cbd4da] mt-[12px] mb-[16px]`}>{article.verificationNote}</p>
//             <dl className={`${SANS} grid grid-cols-[1fr_auto] gap-[8px] text-[11px] pt-[14px] border-t border-white/15`}>
//               <dt className="text-[#9fafba]">Reviewed</dt><dd className="m-0">{formatDate(article.updatedAt)}</dd>
//               <dt className="text-[#9fafba]">Sources</dt><dd className="m-0">{article.sources.length} linked</dd>
//               <dt className="text-[#9fafba]">Editor</dt><dd className="m-0">Collective topic editor</dd>
//             </dl>
//           </div>
//           <div className={CARD}>
//             <h2>Most Read</h2>
//             <ol className="list-none m-0 p-0 flex flex-col">
//               {mostRead.map((item, index) => (
//                 <li key={item.id} className="grid grid-cols-[30px_1fr] gap-[10px] py-[11px] border-b border-[#e5e0d8] last:border-b-0 last:pb-0">
//                   <span className={`text-[#d8cfc6] font-bold ${SERIF} text-[22px] leading-none`}>{String(index + 1).padStart(2, "0")}</span>
//                   <Link href={`/${categoryUrlSlug(item.category)}/${item.slug}`} className={`text-[13px] leading-[1.35] ${SANS} text-[#1a1a1a] hover:text-[#7a1f2b]`}>{item.title}</Link>
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </aside>

//         <article className="min-w-0 max-[900px]:order-1">
//            <div className={SHELL}>
//         <nav className="flex flex-wrap gap-[8px] items-center text-[#6b6b6b] text-[12.5px] pt-[26px] [&>a:hover]:text-[#7a1f2b] [&>span:last-child]:text-[#1a1a1a] [&>span:last-child]:overflow-hidden [&>span:last-child]:text-ellipsis [&>span:last-child]:whitespace-nowrap [&>span:last-child]:max-w-[45vw]" aria-label="Breadcrumb">
//           <Link href="/">Home</Link>
//           <span>/</span>
//           <Link href={`/${categoryUrlSlug(article.category)}`}>{label}</Link>
//           <span>/</span>
//           <span>{article.title}</span>
//         </nav>

//         <div className="mt-[16px]">
//           <div className="flex flex-wrap items-center gap-[10px]">
//             <span className={CATEGORY_LABEL}>{label}</span>
//             <span className="bg-[#e7efe9] text-[#1b5e4b] px-[9px] py-[4px] text-[9px] font-bold uppercase tracking-[.1em]">{article.newsType === "explainer" ? "Explainer" : "Analysis"}</span>
//           </div>
//           <h1 className="my-[12px] mb-[16px] font-bold text-[clamp(34px,5.2vw,62px)] max-[480px]:text-[31px] leading-[1.01] tracking-[-.035em]">{article.title}</h1>
//           <p className={`m-0 max-w-[720px] text-[#5f5a55] ${SERIF} text-[18px] max-[480px]:text-[16px] leading-[1.55]`}>{article.summary}</p>
//         </div>

//         <div className="flex flex-wrap max-[640px]:flex-col max-[640px]:items-start items-center justify-between gap-[18px] mt-[26px] py-[18px] border-t border-b border-[#e5e0d8]">
//           <div className="flex items-center gap-[12px]">
//             <Link href={`/author/${author.slug}`} className="block w-[48px] h-[48px] rounded-full flex-none overflow-hidden bg-[#10263b] ring-2 ring-[#e8e2d9]" aria-label={`Read more from ${author.name}`}>
//               <img src={author.image} alt={`${author.name} editorial emblem`} className="w-full h-full object-cover" />
//             </Link>
//             <div>
//               <span className={`font-bold text-[13px] ${SANS} text-[#1a1a1a] [&_a:hover]:text-[#7a1f2b]`}>Edited by <Link href={`/author/${author.slug}`}>{author.name}</Link></span>
//               <small className="block mt-[3px] text-[#6b6b6b] text-[11.5px]">Published {formatDate(article.publishedAt)} · Reviewed {formatDate(article.updatedAt)} · {article.readTime}</small>
//             </div>
//           </div>
//           <ShareRow title={article.title} url={canonicalUrl} />
//         </div>
       
//       </div>

//           <section className="my-[28px] border-y-2 border-[#10263b] py-[18px]" aria-labelledby="in-this-story">
//             <span id="in-this-story" className="text-[#7a1f2b] text-[10px] font-extrabold uppercase tracking-[.16em]">In this post</span>
//             <div className="grid grid-cols-2 max-[640px]:grid-cols-1 gap-[18px_26px] mt-[14px]">
//               <div>
//                 <h2 className={`${SERIF} text-[17px] mt-0 mb-[6px]`}>Why it matters</h2>
//                 <p className={`${SANS} text-[13.5px] leading-[1.6] text-[#4f4a46] m-0`}>{article.whyItMatters}</p>
//               </div>
//               <div>
//                 <h2 className={`${SERIF} text-[17px] mt-0 mb-[6px]`}>What to watch</h2>
//                 <p className={`${SANS} text-[13.5px] leading-[1.6] text-[#4f4a46] m-0`}>{article.whatToWatch}</p>
//               </div>
//             </div>
//             <ul className="grid grid-cols-3 max-[640px]:grid-cols-1 gap-[1px] bg-[#ded8d1] list-none m-0 mt-[18px] p-0 border border-[#ded8d1]">
//               {article.keyTakeaways.map((takeaway, index) => (
//                 <li key={takeaway} className={`${SANS} bg-[#f8f4ed] p-[14px] text-[12px] leading-[1.5]`}><b className={`${SERIF} text-[#7a1f2b] mr-[7px]`}>{String(index + 1).padStart(2, "0")}</b>{takeaway}</li>
//               ))}
//             </ul>
//           </section>

//           <figure className="mt-[28px]">
//             <img src={article.image} alt={article.imageAlt} className="w-full h-[220px] md:h-[430px] object-cover" />
//             <figcaption className="flex flex-wrap gap-x-[8px] gap-y-[3px] mt-[9px] text-[#6b6b6b] text-[12px]">
//               <strong className="text-[#7a1f2b] uppercase tracking-[.08em]">Editorial illustration</strong>
//               <span>Conceptual artwork; not a documentary photograph.</span>
//             </figcaption>
//           </figure>
//           {article.sections.map((section, index) => (
//             <section id={section.id} key={section.id} className="scroll-mt-[90px]">
//               {section.heading && (
//                 <h2 className="mt-[36px] mb-[14px] font-bold text-[1.2rem] leading-[1.3]">{section.heading}</h2>
//               )}
//               {section.blocks.map((block, blockIndex) =>
//                 block.type === "paragraph" ? (
//                   <p key={`p-${blockIndex}`} className={`m-0 mb-[16px] text-[#2a2a2a] ${SANS} text-[14.5px] leading-[1.75]`}>{block.text}</p>
//                 ) : (
//                   <figure key={`i-${blockIndex}`} className="my-[26px]">
//                     <img src={block.src} alt={block.alt || "Post supporting image"} loading="lazy" className="w-full aspect-[18/9] object-cover" />
//                     {block.caption && <figcaption className="mt-[9px] text-[#6b6b6b] text-[12px]">{block.caption}</figcaption>}
//                   </figure>
//                 ),
//               )}
//               {index === 0 && (
//                 <blockquote className="relative my-[30px] px-[24px] pt-[24px] pb-[20px] border-l-4 border-[#7a1f2b] bg-[#f7f5f2]">
//                   <span className={`block font-bold ${SERIF} text-[48px] leading-none text-[#7a1f2b]/25 -mb-[4px]`} aria-hidden="true">&ldquo;</span>
//                   <p className={`m-0 text-[#1a1a1a] italic font-semibold ${SERIF} text-[18px] leading-[1.4]`}>{article.quote}</p>
//                   <cite className={`block mt-[12px] text-[#6b6b6b] text-[11.5px] ${SANS} not-italic before:content-['—_']`}>{article.newsType === "explainer" ? "Editorial principle" : "Business Standard synthesis"}</cite>
//                 </blockquote>
//               )}
//             </section>
//           ))}

//           <section className="mt-[38px] border border-[#d9d3ca] bg-[#f8f4ed]" aria-labelledby="sources-heading">
//             <div className="flex max-[640px]:flex-col justify-between gap-[10px] p-[18px] border-b border-[#d9d3ca] bg-[#10263b] text-white">
//               <div>
//                 <span className="block text-[#d8b7a1] text-[9px] font-bold uppercase tracking-[.18em]">Evidence trail</span>
//                 <h2 id="sources-heading" className={`${SERIF} !text-white text-[24px] m-0 mt-[5px]`}>Sources & documents</h2>
//               </div>
//               <p className={`${SANS} max-w-[330px] m-0 text-[11px] leading-[1.5] text-[#cbd4da]`}>Links open the records used to review central claims. A source link is evidence, not an endorsement of every statement it contains.</p>
//             </div>
//             <ol className="list-none m-0 p-0">
//               {article.sources.map((sourceItem, index) => (
//                 <li key={sourceItem.url} className="grid grid-cols-[34px_1fr_auto] max-[560px]:grid-cols-[30px_1fr] gap-[12px] items-center p-[16px_18px] border-b border-[#d9d3ca] last:border-b-0">
//                   <span className={`${SERIF} text-[#7a1f2b] text-[20px]`}>{String(index + 1).padStart(2, "0")}</span>
//                   <span>
//                     <a href={sourceItem.url} target="_blank" rel="noreferrer" className={`${SANS} font-bold text-[13px] underline decoration-[#b9aea4] underline-offset-4 hover:text-[#7a1f2b]`}>{sourceItem.name}</a>
//                     <small className="block mt-[4px] text-[#6f6966] text-[10px] uppercase tracking-[.08em]">{sourceItem.type}</small>
//                   </span>
//                   <span className="max-[560px]:hidden text-[#7a1f2b] text-[11px] font-bold uppercase tracking-[.1em]">Open source ↗</span>
//                 </li>
//               ))}
//             </ol>
//           </section>

//           <aside className={`${SANS} mt-[16px] p-[14px_16px] border-l-4 border-[#1b5e4b] bg-[#edf3ef] text-[12px] leading-[1.55] text-[#31483f]`}>
//             <b>Corrections:</b> We label material changes on the affected post and preserve the date of review. See our <Link className="underline font-bold" href="/about#corrections">corrections standard</Link>.
//           </aside>

//           <div className="flex flex-wrap gap-[9px] mt-[30px]">
//             {tags.map((tag) => (
//               <span key={tag} className="bg-[#f7f5f2] border border-[#e5e0d8] text-[#6b6b6b] text-[11px] px-[13px] py-[7px]">{tag}</span>
//             ))}
//           </div>

//           <div className="mt-[20px]">
//             <ShareRow title={article.title} url={canonicalUrl} />
//           </div>
//           <hr className="border-0 border-t border-[#e5e0d8] my-[26px] mb-[34px]" />

//           <section className="grid grid-cols-[80px_1fr] max-[640px]:grid-cols-1 gap-[22px] items-start bg-[#f7f5f2] border border-[#e5e0d8] p-[26px]">
//             <Link href={`/author/${author.slug}`} className="block w-[80px] h-[80px] rounded-full overflow-hidden bg-[#10263b]" aria-label={`Read more from ${author.name}`}>
//               <img src={author.image} alt={`${author.name} editorial emblem`} className="w-full h-full object-cover" loading="lazy" />
//             </Link>
//             <div>
//               <span className={`block text-[#6b6b6b] font-extrabold text-[10.5px] ${SANS} tracking-[.12em] uppercase`}>Edited by</span>
//               <h3 className={`mt-[7px] mb-[2px] font-bold ${SERIF} text-[18px] [&_a:hover]:text-[#7a1f2b]`}><Link href={`/author/${author.slug}`}>{author.name}</Link></h3>
//               <p className={`m-0 mb-[10px] text-[#7a1f2b] font-bold text-[11.5px] ${SANS}`}>{author.role}</p>
//               <p className={`m-0 mb-[14px] text-[#6b6b6b] text-[13.5px] leading-[1.6] ${SANS}`}>{author.bio}</p>
//               <Link className="text-[#7a1f2b] text-[11px] font-bold uppercase tracking-[.1em]" href={`/author/${author.slug}`}>View related posts →</Link>
//             </div>
//           </section>

//           <div className="mt-[26px]">
//             <ArticleNav previous={previous} next={next} />
//           </div>
//         </article>
//       </div>

//       <section className={`${SHELL} pt-[12px] pb-[56px]`}>
//         <h2 className="m-0 mb-[20px] pb-[10px] font-bold text-[18px] border-b-2 border-[#7a1f2b]">More in {label}</h2>
//         <div className="grid grid-cols-2 max-[900px]:grid-cols-1 gap-[22px_32px]">
//           {related.map((item) => (
//             <Link key={item.id} href={`/${categoryUrlSlug(item.category)}/${item.slug}`} className="grid grid-cols-[88px_1fr] gap-[14px] group">
//               <span className="block w-[88px] h-[66px] overflow-hidden flex-none [&>img]:w-full [&>img]:h-full [&>img]:object-cover">
//                 <img src={item.image} alt={item.imageAlt} loading="lazy" />
//               </span>
//               <span className="flex flex-col gap-[4px] min-w-0">
//                 <span className={CATEGORY_LABEL}>{categoryLabel(item.category)}</span>
//                 <span className={`font-bold ${SERIF} text-[14.5px] leading-[1.3] text-[#1a1a1a] group-hover:text-[#7a1f2b]`}>{item.title}</span>
//                 <small className="text-[#6b6b6b] text-[11.5px]">{timeAgo(item.publishedAt)}</small>
//               </span>
//             </Link>
//           ))}
//         </div>
//       </section>

//       <div className={`${SHELL} pt-[8px] pb-[30px]`}>
//         <Newsletter />
//       </div>
//     </main>
//   );
// }

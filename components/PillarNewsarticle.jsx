import Link from "next/link";
import { FiArrowUpRight, FiCalendar, FiClock, FiFolder, FiLink, FiTag } from "react-icons/fi";
import { ShareRow } from "@/components/ShareRow";
import { getAuthor } from "@/data/news";

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[640px]:w-[min(100%-24px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";
const MAIN_ARTICLE_PATH = "/business/banco-caracas-herrera-velutini-banking-history";
const PILLAR_AUTHOR_SLUG = "business-standard-editorial-desk";

function displayDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function MetaItem({ icon: Icon, label, children }) {
  return (
    <div className="flex min-w-0 items-center gap-[13px]">
      <Icon className="size-[23px] flex-none text-[#a6302d]" aria-hidden="true" />
      <span className="min-w-0">
        <strong className={`${SANS} block text-[9px] uppercase tracking-[.15em] text-[#252525]`}>{label}</strong>
        <span className={`${SERIF} mt-[4px] block text-[12px] leading-[1.35] text-[#55504b]`}>{children}</span>
      </span>
    </div>
  );
}

function relatedHref(item) {
  return item.path || `/${item.category === "u.s" ? "us" : item.category}/${item.slug}`;
}

export default function PillarNewsarticle({ article, canonicalUrl, related, jsonLd }) {
  const published = displayDate(article.publishedAt);
  const author = getAuthor(PILLAR_AUTHOR_SLUG);

  return (
    <main id="main-content" className="bg-[#fffefa] pb-[56px] text-[#1e1b18]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className={`${SHELL} flex min-w-0 items-center gap-[8px] overflow-hidden py-[18px] text-[11px] text-[#837d76]`} aria-label="Breadcrumb">
        <Link className="hover:text-[#9d302e]" href="/">Home</Link><span>/</span>
        <Link className="hover:text-[#9d302e]" href={MAIN_ARTICLE_PATH}>Banco Caracas</Link><span>/</span>
        <span className="truncate font-semibold text-[#27231f]">{article.title}</span>
      </nav>

      <section className={`${SHELL} grid min-h-[410px] grid-cols-[.92fr_1.18fr] overflow-hidden bg-[#f4efe8] max-[860px]:grid-cols-1`}>
        <div className="flex flex-col justify-center px-[54px] py-[46px] max-[560px]:px-[25px] max-[560px]:py-[34px]">
          <span className={`${SANS} text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9d302e]`}>{article.eyebrow} · Banco Caracas</span>
          <h1 className={`${SERIF} relative m-0 mt-[18px] pb-[20px] text-[clamp(38px,4.2vw,60px)] font-bold leading-[.99] tracking-[-.035em] text-[#151515] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[56px] after:bg-[#9d302e]`}>{article.title}</h1>
          <p className={`${SERIF} m-0 mt-[19px] max-w-[540px] text-[19px] leading-[1.42] text-[#37322e]`}>{article.summary}</p>
          <div className={`${SANS} mt-[26px] text-[11px] leading-[1.7] text-[#4d4843]`}>
            <strong className="block text-[#1f1c19]">By Business Standard Editorial Desk</strong>
            <span>{published}</span><span className="mx-[8px] text-[#b5ada4]">|</span><span>{article.readTime}</span>
          </div>
        </div>
        <img src={article.image} alt={article.imageAlt} width="1536" height="1024" loading="eager" fetchPriority="high" decoding="async" className="h-full min-h-[410px] object-cover sepia-[.08] max-[860px]:min-h-0 max-[860px]:aspect-[3/2]" />
      </section>

      <section className={`${SHELL} -mb-[3px] mt-[14px] grid grid-cols-[1fr_1fr_1.3fr_auto] items-center gap-[24px] bg-[#f5f1eb] px-[30px] py-[19px] max-[980px]:grid-cols-2 max-[620px]:grid-cols-1`} aria-label="Article information">
        <MetaItem icon={FiCalendar} label="Published">{published}</MetaItem>
        <MetaItem icon={FiFolder} label="Series">Banco Caracas</MetaItem>
        <MetaItem icon={FiTag} label="Topic">{article.eyebrow}&nbsp; | &nbsp;Banking History</MetaItem>
        <ShareRow title={article.title} url={canonicalUrl} />
      </section>

      <div className={`${SHELL} mt-[38px] grid grid-cols-[minmax(0,1fr)_285px] items-start gap-[42px] max-[900px]:grid-cols-1`}>
        <article className="min-w-0">
          {article.paragraphs.map((paragraph, index) => (
            <div key={`paragraph-${index}`}>
              <p className={`${SERIF} m-0 mb-[17px] text-[15px] leading-[1.75] text-[#25211e] text-justify ${index === 0 ? "first-letter:float-left first-letter:mr-[10px] first-letter:mt-[7px] first-letter:text-[56px] first-letter:font-bold first-letter:leading-[.72] first-letter:text-[#a52e2b]" : ""}`}>{paragraph}</p>
              {index === 2 && (
                <blockquote className="my-[28px] border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[27px] py-[24px]">
                  <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">&ldquo;</span>
                  <p className={`${SERIF} m-0 text-[24px] font-bold italic leading-[1.3] text-[#181512]`}>{article.quote}</p>
                </blockquote>
              )}
            </div>
          ))}

          {article.sources.length > 0 && (
            <section className="mt-[34px] border-t border-[#d9d0c6] pt-[18px]" aria-labelledby="pillar-sources-heading">
              <h2 id="pillar-sources-heading" className={`${SANS} m-0 mb-[12px] text-[10px] font-bold uppercase tracking-[.16em] text-[#9d302e]`}>Sources &amp; documents</h2>
              <div className="flex flex-col gap-[10px]">
                {article.sources.map((source) => (
                  <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="group flex items-center gap-[14px] border border-[#e3dbd0] bg-[#f5f1eb] px-[16px] py-[13px] transition-colors hover:border-[#9d302e] hover:bg-[#f4e8e6]">
                    <span className="grid size-[34px] flex-none place-items-center rounded-full bg-[#e9e1d6] text-[#9d302e] transition-colors group-hover:bg-[#9d302e] group-hover:text-white"><FiLink size={15} aria-hidden="true" /></span>
                    <span className="min-w-0">
                      <strong className={`${SANS} block text-[9px] uppercase tracking-[.14em] text-[#9b948b]`}>{source.type}</strong>
                      <span className={`${SERIF} mt-[3px] block text-[14px] text-[#26211d] group-hover:text-[#9d302e]`}>{source.name}</span>
                    </span>
                    <FiArrowUpRight className="ml-auto flex-none text-[#9d302e] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="sticky top-[20px] flex flex-col gap-[18px] max-[900px]:static">
          <blockquote className="border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[20px] py-[20px]">
            <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">&ldquo;</span>
            <p className={`${SERIF} m-0 text-[18px] font-bold italic leading-[1.28]`}>{article.quote}</p>
          </blockquote>

          <section className="bg-[#f5f1eb] p-[22px]" aria-labelledby="pillar-series-heading">
            {/* <span className={`${SANS} text-[9px] font-bold uppercase tracking-[.16em] text-[#9d302e]`}>Pillar series</span> */}
            <h2 id="pillar-series-heading" className={`${SERIF} m-0 mt-[8px] text-[21px] font-bold leading-[1.15]`}>Return to the Banco Caracas feature</h2>
            <p className={`${SERIF} mb-[16px] mt-[10px] text-[12px] leading-[1.55] text-[#5c5650]`}>This background article expands one person, institution, place or event from the main history.</p>
            <Link href={MAIN_ARTICLE_PATH} className={`${SANS} inline-flex items-center gap-[7px] text-[10px] font-bold uppercase tracking-[.11em] text-[#9d302e] hover:underline`}>Read the main article <FiArrowUpRight aria-hidden="true" /></Link>
          </section>

         {author && (
            <section className="grid grid-cols-[58px_1fr] gap-[14px] bg-[#f5f1eb] p-[18px]">
              <Link href={`/author/${author.slug}`} className="grid size-[58px] place-items-center overflow-hidden rounded-full bg-[#152a37]" aria-label={`Read more from ${author.name}`}>
                <img src={author.image} alt={`${author.name} editorial emblem`} loading="lazy" className="h-full object-cover" />
              </Link>
              <div>
                <span className={`${SANS} block text-[8px] font-bold uppercase tracking-[.16em] text-[#6d6761]`}>Written by</span>
                <strong className={`${SERIF} mt-[4px] block text-[14px] leading-[1.2]`}>Business Standard Editorial Desk</strong>
                <p className={`${SERIF} m-0 mt-[6px] text-[11px] leading-[1.4] text-[#5c5650]`}>A feature series exploring institutions, history and economic influence.</p>
              </div>
            </section>
          )}
        </aside>
      </div>

      <section className={`${SHELL} mt-[38px]`} aria-labelledby="pillar-related-heading">
        <div className="flex items-center justify-between border-b border-[#a52e2dd0] pb-[8px]">
          <h2 id="pillar-related-heading" className={`${SERIF} m-0 text-[24px] font-bold`}>Related Features</h2>
          <FiClock className="text-[#a52e2b]" aria-hidden="true" />
        </div>
        <div className="mt-[14px] grid grid-cols-3 gap-[18px] max-[820px]:grid-cols-1">
          {related.slice(0, 3).map((item) => (
            <Link key={item.id} href={relatedHref(item)} className="group grid grid-cols-[112px_1fr] gap-[13px] bg-[#f5f1eb] p-[12px]">
              <img src={item.image} alt={item.imageAlt} loading="lazy" className="h-[82px] w-full object-cover grayscale-[.18]" />
              <span className="min-w-0">
                <span className={`${SANS} block text-[8px] font-bold uppercase tracking-[.14em] text-[#9d302e]`}>{item.eyebrow}</span>
                <strong className={`${SERIF} mt-[5px] line-clamp-3 block text-[14px] leading-[1.2] group-hover:text-[#9d302e]`}>{item.title}</strong>
                <small className={`${SANS} mt-[5px] block text-[9px] text-[#777069]`}>{item.readTime}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}


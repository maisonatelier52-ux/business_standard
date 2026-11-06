"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiBookmark, FiFileText, FiLink, FiShare2 } from "react-icons/fi";
import { SocialIcon } from "@/components/SocialIcon";
import { currencyOfTrustArticle as article } from "@/data/clientArticles";

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[640px]:w-[min(100%-24px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";
const STICKY_GAP = 20;

function ActionItem({ icon: Icon, label, hint, onClick, active }) {
  const body = (
    <>
      <Icon className={`size-[20px] flex-none text-[#a52e2b] ${active ? "fill-[#a52e2b]" : ""}`} aria-hidden="true" />
      <span className="min-w-0 text-left">
        <strong className={`${SANS} block text-[9px] font-bold uppercase tracking-[.15em] text-[#252525]`}>{label}</strong>
        <span className={`${SERIF} mt-[3px] block text-[11px] leading-[1.3] text-[#6a645e]`}>{hint}</span>
      </span>
    </>
  );
  if (!onClick) return <div className="flex items-center gap-[12px]">{body}</div>;
  return (
    <button type="button" onClick={onClick} className="flex items-center gap-[12px] transition-opacity hover:opacity-75">
      {body}
    </button>
  );
}

function ShareCircles({ title, url, copied, onCopy }) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const btn =
    "grid size-[34px] place-items-center rounded-full bg-[#ebe6df] text-[#172b38] transition-colors hover:bg-[#a52e2b] hover:text-white";
  return (
    <div className="relative flex items-center gap-[8px]">
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
        <SocialIcon name="facebook" size={14} />
      </a>
      <a className={btn} href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X">
        <SocialIcon name="x" size={14} />
      </a>
      <a className={btn} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
        <SocialIcon name="linkedin" size={14} />
      </a>
      <button type="button" className={btn} onClick={onCopy} aria-label="Copy article link">
        <SocialIcon name={copied ? "check" : "link"} size={14} />
      </button>
      {copied && (
        <span className={`${SANS} absolute right-0 top-[42px] z-10 bg-[#172b38] px-[9px] py-[5px] text-[10px] text-white`} role="status">
          Copied
        </span>
      )}
    </div>
  );
}

function SidebarHeading({ children }) {
  return (
    <h2 className={`${SERIF} m-0 border-b border-[#a52e2b] pb-[10px] text-[17px] font-bold text-[#171717]`}>{children}</h2>
  );
}

export default function ClientArticlePage({ canonicalUrl, jsonLd }) {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const asideRef = useRef(null);

  // Sticky sidebar that scrolls WITH the page until its own bottom reaches the
  // bottom of the viewport, then pins there until the article column ends.
  // (`top` is negative when the sidebar is taller than the viewport.)
  useEffect(() => {
    const el = asideRef.current;
    if (!el) return undefined;
    const update = () => {
      const top = Math.min(STICKY_GAP, window.innerHeight - el.offsetHeight - STICKY_GAP);
      el.style.top = `${top}px`;
    };
    update();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    observer?.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
    } catch {
      // Clipboard can be unavailable in embedded browsers.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main id="main-content" className="bg-[#fbf9f4] pb-[56px] text-[#1e1b18]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className={`${SHELL} flex min-w-0 items-center gap-[8px] overflow-hidden py-[18px] text-[11px] text-[#837d76]`} aria-label="Breadcrumb">
        <Link className="hover:text-[#a52e2b]" href="/">Home</Link><span>&gt;</span>
        <Link className="hover:text-[#a52e2b]" href="/business">Business</Link><span>&gt;</span>
        <span className="truncate font-semibold text-[#27231f]">{article.title}</span>
      </nav>

      {/* Hero */}
      <section className={`${SHELL} grid min-h-[300px] grid-cols-[1.1fr_.9fr] overflow-hidden bg-[#f4efe8] max-[860px]:grid-cols-1`}>
        <div className="flex flex-col justify-center px-[40px] py-[28px] max-[560px]:px-[22px] max-[560px]:py-[26px]">
          <span className={`${SANS} text-[11px] font-extrabold uppercase tracking-[.16em] text-[#a52e2b]`}>Business</span>
          <h1 className={`${SERIF} m-0 mt-[12px] text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.06] tracking-[-.02em] text-[#151515]`}>
            {article.title}
          </h1>
          <p className={`${SERIF} m-0 mt-[14px] max-w-[540px] text-[15.5px] italic leading-[1.45] text-[#37322e] max-[560px]:text-[14.5px]`}>
            {article.summary}
          </p>
          <span className="mt-[18px] block h-[1.5px] w-[50px] bg-[#a52e2b]" aria-hidden="true" />
          <div className={`${SANS} mt-[14px] text-[11px] leading-[1.7] text-[#4d4843]`}>
            <strong className="block text-[#1f1c19]">{article.byline}</strong>
            <span>{article.displayDate}</span><span className="mx-[8px] text-[#b5ada4]">|</span><span>{article.readTime}</span>
          </div>
        </div>
       <div className="relative min-h-[300px] overflow-hidden max-[860px]:aspect-[16/10] max-[860px]:min-h-0">
        <img
          src={article.heroImage}
          alt={article.heroImageAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="absolute left-0 top-0 h-auto w-[145%] max-w-none -translate-y-[29%]"
        />
      </div>
      </section>

      {/* Action bar */}
      <section className={`${SHELL} mt-[14px] flex flex-wrap items-center justify-between gap-x-[30px] gap-y-[14px] bg-[#f5f1eb] px-[28px] py-[16px] max-[560px]:px-[18px]`} aria-label="Article actions">
        <div className="flex w-full flex-col items-start gap-[16px] sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-[44px] sm:gap-y-[12px]">
          <ActionItem icon={FiFileText} label="Full Article" hint="In-depth analysis" />
          <ActionItem icon={FiBookmark} label="Save" hint="Read later" onClick={() => setSaved((v) => !v)} active={saved} />
          <ActionItem icon={FiShare2} label="Share" hint="Email, Copy link" onClick={copyLink} />
        </div>
        <ShareCircles title={article.title} url={canonicalUrl} copied={copied} onCopy={copyLink} />
      </section>

      {/* Body: article + sticky sidebar */}
      <div className={`${SHELL} mt-[28px] grid grid-cols-[minmax(0,1fr)_285px] items-start gap-[36px] max-[900px]:grid-cols-1`}>
        <article className="min-w-0">
          <section className="mb-[22px]">
            {article.intro.map((text, index) => (
              <p
                key={`intro-${index}`}
                className={`${SERIF} m-0 mb-[12px] text-[14px] leading-[1.6] text-[#25211e] ${
                  index === 0
                    ? "flow-root first-letter:float-left first-letter:mr-[8px] first-letter:mt-[4px] first-letter:text-[50px] first-letter:font-bold first-letter:leading-[.78] first-letter:text-[#a52e2b]"
                    : ""
                }`}
              >
                {text}
              </p>
            ))}
          </section>

          {article.sections.map((section, index) => (
            <section key={section.id} id={section.id} className="scroll-mt-[24px] pb-[10px]">
              <h2 className={`${SERIF} m-0 mb-[12px] mt-[6px] flex items-baseline gap-[12px] text-[22px] font-bold leading-[1.2] text-[#171717] max-[560px]:text-[18px]`}>
                <span className="text-[22px] text-[#a52e2b]" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                {section.heading}
              </h2>
              {section.paragraphs.map((text, pIndex) => (
                <p key={`${section.id}-${pIndex}`} className={`${SERIF} m-0 mb-[12px] text-[14px] leading-[1.6] text-[#26211d]`}>
                  {text}
                </p>
              ))}
            </section>
          ))}

          <blockquote className="my-[18px] border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[24px] py-[20px]">
            <div className="flex items-start gap-[14px]">
              <span className={`${SERIF} text-[34px] font-bold leading-[.9] text-[#a52e2b]`} aria-hidden="true">&ldquo;</span>
              <p className={`${SERIF} m-0 text-[19px] font-bold italic leading-[1.35] text-[#181512]`}>{article.closingQuote}</p>
            </div>
          </blockquote>

          <section className="mt-[26px] border-t border-[#d9d0c6] pt-[18px]" aria-labelledby="references-heading">
            <h2 id="references-heading" className={`${SANS} m-0 mb-[12px] text-[10px] font-bold uppercase tracking-[.16em] text-[#a52e2b]`}>
              References
            </h2>
            <div className="flex flex-col gap-[10px]">
              {article.sources.map((source) => (
                <a
                  key={source.url}
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-[14px] border border-[#e3dbd0] bg-[#f5f1eb] px-[16px] py-[13px] transition-colors hover:border-[#a52e2b] hover:bg-[#f4e8e6]"
                >
                  <span className="grid size-[34px] flex-none place-items-center rounded-full bg-[#e9e1d6] text-[#a52e2b] transition-colors group-hover:bg-[#a52e2b] group-hover:text-white">
                    <FiLink size={15} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <strong className={`${SANS} block text-[9px] uppercase tracking-[.14em] text-[#9b948b]`}>{source.type}</strong>
                    <span className={`${SERIF} mt-[3px] block truncate text-[14px] text-[#26211d] group-hover:text-[#a52e2b]`}>{source.name}</span>
                  </span>
                  <FiArrowUpRight className="ml-auto flex-none text-[#a52e2b] opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </a>
              ))}
            </div>
          </section>
        </article>

        <aside ref={asideRef} className="sticky flex flex-col gap-[18px] max-[900px]:static" style={{ top: STICKY_GAP }}>
          <blockquote className="m-0 bg-[#f5f1eb] px-[22px] py-[20px]">
            <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">&ldquo;</span>
            <p className={`${SERIF} m-0 text-[17px] font-bold italic leading-[1.3] text-[#181512]`}>{article.sidebarQuote}</p>
          </blockquote>

          <section className="bg-[#f5f1eb] p-[20px]" aria-labelledby="key-highlights-heading">
            <SidebarHeading><span id="key-highlights-heading">Key Highlights</span></SidebarHeading>
            <ul className="m-0 mt-[14px] flex list-none flex-col gap-[11px] p-0">
              {article.highlights.map((item) => (
                <li key={item} className={`${SERIF} grid grid-cols-[14px_1fr] gap-[8px] text-[12.5px] leading-[1.4] text-[#2e2925]`}>
                  <span className="mt-[5px] size-[8px] rounded-full bg-[#a52e2b]" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-[#f5f1eb] p-[20px]">
            <SidebarHeading>About the Series</SidebarHeading>
            <p className={`${SERIF} m-0 mt-[12px] text-[12.5px] leading-[1.5] text-[#4a443f]`}>{article.aboutSeries}</p>
          </section>

          <section className="bg-[#f5f1eb] p-[20px]">
            <SidebarHeading>Related Topics</SidebarHeading>
            <div className="mt-[14px] flex flex-wrap gap-[8px]">
              {article.topics.map((topic) => (
                <span key={topic} className={`${SANS} rounded-full bg-[#ebe6df] px-[12px] py-[6px] text-[11px] text-[#4a443f]`}>
                  {topic}
                </span>
              ))}
            </div>
          </section>
        </aside>
      </div>

      {/* Related features */}
      <section className={`${SHELL} mt-[40px] border-t border-[#e3dbd0] pt-[20px]`} aria-labelledby="related-features-heading">
        <div className="flex items-center justify-between">
          <h2 id="related-features-heading" className={`${SERIF} m-0 text-[22px] font-bold`}>Related Features</h2>
        </div>
        <div className="mt-[14px] grid grid-cols-3 gap-[24px] max-[820px]:grid-cols-1">
          {article.related.map((item) => (
            <Link key={item.title} href={item.href} className="group block min-w-0 bg-[#f5f1eb]">
              <img src={item.image} alt={item.alt} loading="lazy" decoding="async" className="aspect-[2/1] w-full object-cover" />
              <span className="block px-[14px] pb-[14px] pt-[10px]">
                <span className={`${SANS} block text-[9px] font-bold uppercase tracking-[.14em] text-[#a52e2b]`}>{item.label}</span>
                <strong className={`${SERIF} mt-[6px] block text-[16px] leading-[1.25] group-hover:text-[#a52e2b]`}>{item.title}</strong>
                <small className={`${SANS} mt-[8px] block text-[10px] text-[#777069]`}>{item.readTime}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

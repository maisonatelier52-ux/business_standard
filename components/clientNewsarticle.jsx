"use client";

import Link from "next/link";
import { useState } from "react";
import { SocialIcon } from "@/components/SocialIcon";
import { FiCalendar, FiClock, FiFolder, FiTag, FiLink, FiArrowUpRight } from "react-icons/fi";

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[640px]:w-[min(100%-24px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";
const CERTIFICATE_IMAGE = "/images/illustrations/banco-caracas-herrera-velutini-banking-history-certificate.webp";
const GALLERY_IMAGE = "/images/illustrations/banco-caracas-herrera-velutini-banking-history-gallery.webp";
const PERSON_IMAGE = "/images/illustrations/julio-herrera-velutini-image.webp";

function displayDate(value) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

function ShareTools({ title, url }) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const buttonClass =
    "grid size-[34px] place-items-center rounded-full border border-[#ddd4ca] bg-[#efeae3] text-[#172b38] transition-colors hover:border-[#9d302e] hover:bg-[#9d302e] hover:text-white";

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Clipboard access can be unavailable in embedded browsers.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="relative flex items-center gap-[7px]">
      <span className={`${SANS} mr-[5px] text-[9px] font-bold uppercase tracking-[.18em] text-[#9b948b]`}>Share</span>
      <a className={buttonClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
        <SocialIcon name="facebook" size={14} />
      </a>
      <a className={buttonClass} href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X">
        <SocialIcon name="x" size={14} />
      </a>
      <a className={buttonClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
        <SocialIcon name="linkedin" size={14} />
      </a>
      <button type="button" className={buttonClass} onClick={copyLink} aria-label="Copy article link">
        <SocialIcon name={copied ? "check" : "link"} size={14} />
      </button>
      {copied && <span className={`${SANS} absolute right-0 top-[42px] z-10 bg-[#172b38] px-[9px] py-[5px] text-[10px] text-white`} role="status">Copied</span>}
    </div>
  );
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

function NumberedSection({ section, index, image }) {
  const heading = (
    <h2 className={`${SERIF} m-0 mb-[12px] flex items-baseline gap-[12px] text-[19px] font-bold leading-[1.16] text-[#171717] max-[560px]:text-[16px]`}>
      <span className={`${SERIF} text-[31px] leading-none text-[#c88f8b]`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
      {section.heading}
    </h2>
  );

  const paragraphs = section.blocks.map((block, blockIndex) => (
    <p key={`${section.id}-${blockIndex}`} className={`${SERIF} m-0 mb-[14px] text-[14px] leading-[1.65] text-[#26211d] text-justify last:mb-0`}>{block.text}</p>
  ));

  return (
    <section id={section.id} className="scroll-mt-[92px] border-t border-[#ece5dc] py-[30px] first:border-t-0 first:pt-0">
      {image ? (
        <div className="grid grid-cols-[3fr_1fr] items-start gap-[26px] max-[700px]:grid-cols-1 max-[700px]:gap-[16px]">
          <div className="min-w-0">
            {heading}
            {paragraphs}
          </div>
          <figure className="m-0">
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="aspect-[3/3] w-full rounded-[4px] object-cover mt-0 md:mt-5"
            />
            <figcaption className={`${SANS} mt-[9px] text-[11px] leading-[1.4] text-[#55504b]`}>
              <strong className={`${SERIF} block text-[13px] leading-[1.2] text-[#1d1a18]`}>
                {image.nameUrl ? (
                  <a
                    href={image.nameUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:!text-[#1a4fd6] hover:!underline"
                  >
                    {image.name}
                  </a>
                ) : (
                  image.name
                )}
              </strong>
              {image.caption}
            </figcaption>
          </figure>
        </div>
      ) : (
        <div>
          {heading}
          {paragraphs}
        </div>
      )}
    </section>
  );
}

function Milestones() {
  const items = [
    ["1890", "Banco Caracas incorporated in Venezuela"],
    ["1908", "137 shareholders and expanded operations"],
    ["Late 20th century", "Growth through Venezuela's economic transformation"],
    ["1990s", "Family moves beyond the bank and reorganises its capital"],
    ["2000", "Acquired by Grupo Santander Central Hispano"],
    ["Legacy", "A lasting place in Venezuela's banking history"],
  ];

  return (
    <section className="bg-[#f5f1eb] p-[22px]" aria-labelledby="milestones-heading">
      <h2 id="milestones-heading" className={`${SERIF} m-0 border-b border-[#c88984] pb-[10px] text-[20px] font-bold`}>Key Milestones</h2>
      <ol className="relative m-0 mt-[15px] list-none p-0 before:absolute before:bottom-[6px] before:left-[5px] before:top-[6px] before:w-px before:bg-[#c88984]">
        {items.map(([year, detail]) => (
          <li key={year} className="relative grid grid-cols-[14px_1fr] gap-[10px] pb-[15px] last:pb-0">
            <span className="mt-[5px] size-[11px] rounded-full border-[3px] border-[#f5f1eb] bg-[#9d302e] ring-1 ring-[#9d302e]" aria-hidden="true" />
            <span>
              <strong className={`${SERIF} block text-[13px] text-[#1d1a18]`}>{year}</strong>
              <span className={`${SERIF} mt-[2px] block text-[12px] leading-[1.35] text-[#514c47]`}>{detail}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function ClientNewsarticle({ article, author, canonicalUrl, related, jsonLd }) {
  const [intro, ...sections] = article.sections;
  const bodySections = sections.slice(0, -1);
  const closingSection = sections.at(-1);
  const published = displayDate(article.publishedAt);

  return (
    <main id="main-content" className="bg-[#fffefa] pb-[56px] text-[#1e1b18]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className={`${SHELL} flex min-w-0 items-center gap-[8px] overflow-hidden py-[18px] text-[11px] text-[#837d76]`} aria-label="Breadcrumb">
        <Link className="hover:text-[#9d302e]" href="/">Home</Link><span>/</span>
        <Link className="hover:text-[#9d302e]" href="/business">Business</Link><span>/</span>
        <span className="truncate font-semibold text-[#27231f]">{article.title}</span>
      </nav>

      <section className={`${SHELL} grid min-h-[410px] grid-cols-[.92fr_1.18fr] overflow-hidden bg-[#f4efe8] max-[860px]:grid-cols-1`}>
        <div className="flex flex-col justify-center px-[54px] py-[46px] max-[560px]:px-[25px] max-[560px]:py-[34px]">
          <span className={`${SANS} text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9d302e]`}>Business History</span>
          <h1 className={`${SERIF} relative m-0 mt-[18px] pb-[20px] text-[clamp(38px,4.4vw,62px)] font-bold leading-[.99] tracking-[-.035em] text-[#151515] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[56px] after:bg-[#9d302e]`}>{article.title}</h1>
          <p className={`${SERIF} m-0 mt-[19px] max-w-[520px] text-[20px] leading-[1.4] text-[#37322e]`}>{article.summary}</p>
          <div className={`${SANS} mt-[26px] text-[11px] leading-[1.7] text-[#4d4843]`}>
            <strong className="block text-[#1f1c19]">By Business Standard Editorial Desk</strong>
            <span>{published}</span><span className="mx-[8px] text-[#b5ada4]">|</span><span>{article.readTime}</span>
          </div>
        </div>
        <img src={article.image} alt={article.imageAlt} className="h-full min-h-[410px] object-cover sepia-[.15] max-[860px]:min-h-0 max-[860px]:aspect-[16/9]" />
      </section>

      <section className={`${SHELL} -mb-[3px] mt-[14px] grid grid-cols-[1fr_1fr_1.3fr_auto] items-center gap-[24px] bg-[#f5f1eb] px-[30px] py-[19px] max-[980px]:grid-cols-2 max-[620px]:grid-cols-1`} aria-label="Article information">
        <MetaItem icon={FiCalendar} label="Published">{published}</MetaItem>
        <MetaItem icon={FiFolder} label="Category">Business History</MetaItem>
        <MetaItem icon={FiTag} label="Topics">Banking&nbsp; | &nbsp;Venezuela&nbsp; | &nbsp;Herrera Velutini</MetaItem>
        <ShareTools title={article.title} url={canonicalUrl} />
      </section>

      <div className={`${SHELL} mt-[38px] grid grid-cols-[minmax(0,1fr)_285px] items-start gap-[42px] max-[900px]:grid-cols-1`}>
        <article className="min-w-0">
          <section className="mb-[25px]">
            {intro.blocks.map((block, index) => (
              <p key={`intro-${index}`} className={`${SERIF} m-0 mb-[14px] text-[14px] leading-[1.66] text-[#25211e] text-justify first:first-letter:float-left first:first-letter:mr-[10px] first:first-letter:mt-[7px] first:first-letter:text-[56px] first:first-letter:font-bold first:first-letter:leading-[.72] first:first-letter:text-[#a52e2b]`}>{block.text}</p>
            ))}
          </section>

          {bodySections.map((section, index) => (
            <div key={section.id}>
              <NumberedSection
                section={section}
                index={index}
                image={
                  index === 5
                    ? {
                        src: PERSON_IMAGE,
                        alt: "Portrait of Julio Herrera Velutini",
                        name: "Julio Herrera Velutini",
                        nameUrl: "https://en.wikipedia.org/wiki/Julio_Herrera_Velutini",
                        caption: "Member of the Herrera Velutini family, and continued the family's financial legacy.",
                      }
                    : undefined
                }
              />
              {index === 2 && (
                <figure className="my-[8px] mb-[30px] bg-[#f4efe8] p-[14px]">
                  <div className={`${SANS} mb-[10px] flex items-center gap-[10px] text-[9px] font-bold uppercase tracking-[.17em] text-[#9d302e] before:h-px before:w-[34px] before:bg-[#9d302e]`}>In Pictures</div>
                  <img src={GALLERY_IMAGE} alt="Three sepia editorial reconstructions showing early Caracas, a historic banking hall, and neoclassical banking architecture" loading="lazy" className="aspect-[3/1] object-cover" />
                  <figcaption className={`${SERIF} mt-[8px] grid grid-cols-3 gap-[14px] text-[10px] text-[#645e57] max-[560px]:hidden`}>
                    <span>Caracas in the early twentieth century</span><span>Historic banking hall</span><span>Institutional architecture</span>
                  </figcaption>
                </figure>
              )}
            </div>
          ))}

          <blockquote className="my-[16px] border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[27px] py-[24px]">
            <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">"</span>
            <p className={`${SERIF} m-0 text-[25px] font-bold italic leading-[1.3] text-[#181512]`}>{closingSection.heading}</p>
            {closingSection.blocks.map((block, index) => <p key={`closing-${index}`} className={`${SERIF} m-0 mt-[13px] text-[14px] leading-[1.6] text-[#302a25] text-justify`}>{block.text}</p>)}
          </blockquote>

          {article.sources.length > 0 && (
            <section className="mt-[30px] border-t border-[#d9d0c6] pt-[18px]" aria-labelledby="source-link-heading">
              <h2 id="source-link-heading" className={`${SANS} m-0 mb-[12px] text-[10px] font-bold uppercase tracking-[.16em] text-[#9d302e]`}>
                Reference link supplied with the article
              </h2>
              <div className="flex flex-col gap-[10px]">
                {article.sources.map((source) => {
                  return (
                    <a
                      key={source.url}
                      href={source.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-[14px] border border-[#e3dbd0] bg-[#f5f1eb] px-[16px] py-[13px] transition-colors hover:border-[#9d302e] hover:bg-[#f4e8e6]"
                    >
                      <span className="grid size-[34px] flex-none place-items-center rounded-full bg-[#e9e1d6] text-[#9d302e] transition-colors group-hover:bg-[#9d302e] group-hover:text-white">
                        <FiLink size={15} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <strong className={`${SANS} block text-[9px] uppercase tracking-[.14em] text-[#9b948b]`}>Source</strong>
                        <span className={`${SERIF} mt-[3px] block truncate text-[14px] text-[#26211d] group-hover:text-[#9d302e]`}>
                          {source.name}
                        </span>
                      </span>
                      <FiArrowUpRight className="ml-auto flex-none text-[#9d302e] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </section>
          )}
        </article>

        <aside className="sticky top-[20px] flex flex-col gap-[18px] max-[900px]:static">
          <blockquote className="border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[20px] py-[20px]">
            <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">"</span>
            <p className={`${SERIF} m-0 text-[18px] font-bold italic leading-[1.28]`}>{article.quote}</p>
          </blockquote>

          {/* <figure className="bg-[#f5f1eb] p-[12px]">
            <img src={CERTIFICATE_IMAGE} alt="Sepia editorial reconstruction of an ornate early twentieth-century Venezuelan banking certificate" loading="lazy" className="aspect-[3/2] object-cover" />
            <figcaption className={`${SERIF} mt-[7px] text-[10px] leading-[1.4] text-[#69625b]`}>Archival-style editorial reconstruction</figcaption>
          </figure> */}

          <Milestones />

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
        </aside>
      </div>

      <section className={`${SHELL} mt-[38px]`} aria-labelledby="related-features-heading">
        <div className="flex items-center justify-between border-b border-[#a52e2dd0] pb-[8px]">
          <h2 id="related-features-heading" className={`${SERIF} m-0 text-[24px] font-bold`}>Related Features</h2>
          <FiClock className="text-[#a52e2b]" aria-hidden="true" />
        </div>
        <div className="mt-[14px] grid grid-cols-3 gap-[18px] max-[820px]:grid-cols-1">
          {related.slice(0, 3).map((item) => (
            <Link key={item.id} href={`/${item.category}/${item.slug}`} className="group grid grid-cols-[112px_1fr] gap-[13px] bg-[#f5f1eb] p-[12px]">
              <img src={item.image} alt={item.imageAlt} loading="lazy" className="h-[82px] object-cover grayscale-[.25]" />
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

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { SocialIcon } from "@/components/SocialIcon";
// import { FiCalendar, FiClock, FiFolder, FiTag, FiLink, FiArrowUpRight } from "react-icons/fi";

// const SHELL = "w-[min(1240px,calc(100%-40px))] max-[640px]:w-[min(100%-24px,1240px)] mx-auto";
// const SERIF = "font-['Georgia','Times_New_Roman',serif]";
// const SANS = "font-['Arial','Helvetica',sans-serif]";
// const CERTIFICATE_IMAGE = "/images/illustrations/banco-caracas-herrera-velutini-banking-history-certificate.webp";
// const GALLERY_IMAGE = "/images/illustrations/banco-caracas-herrera-velutini-banking-history-gallery.webp";
// const PERSON_IMAGE = "/images/illustrations/julio-herrera-velutini-image.webp";

// function displayDate(value) {
//   return new Intl.DateTimeFormat("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//     timeZone: "UTC",
//   }).format(new Date(value));
// }

// function ShareTools({ title, url }) {
//   const [copied, setCopied] = useState(false);
//   const encodedUrl = encodeURIComponent(url);
//   const encodedTitle = encodeURIComponent(title);
//   const buttonClass =
//     "grid size-[34px] place-items-center rounded-full border border-[#ddd4ca] bg-[#efeae3] text-[#172b38] transition-colors hover:border-[#9d302e] hover:bg-[#9d302e] hover:text-white";

//   async function copyLink() {
//     try {
//       await navigator.clipboard.writeText(url);
//     } catch {
//       // Clipboard access can be unavailable in embedded browsers.
//     }
//     setCopied(true);
//     window.setTimeout(() => setCopied(false), 1800);
//   }

//   return (
//     <div className="relative flex items-center gap-[7px]">
//       <span className={`${SANS} mr-[5px] text-[9px] font-bold uppercase tracking-[.18em] text-[#9b948b]`}>Share</span>
//       <a className={buttonClass} href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook">
//         <SocialIcon name="facebook" size={14} />
//       </a>
//       <a className={buttonClass} href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noreferrer" aria-label="Share on X">
//         <SocialIcon name="x" size={14} />
//       </a>
//       <a className={buttonClass} href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">
//         <SocialIcon name="linkedin" size={14} />
//       </a>
//       <button type="button" className={buttonClass} onClick={copyLink} aria-label="Copy article link">
//         <SocialIcon name={copied ? "check" : "link"} size={14} />
//       </button>
//       {copied && <span className={`${SANS} absolute right-0 top-[42px] z-10 bg-[#172b38] px-[9px] py-[5px] text-[10px] text-white`} role="status">Copied</span>}
//     </div>
//   );
// }

// function MetaItem({ icon: Icon, label, children }) {
//   return (
//     <div className="flex min-w-0 items-center gap-[13px]">
//       <Icon className="size-[23px] flex-none text-[#a6302d]" aria-hidden="true" />
//       <span className="min-w-0">
//         <strong className={`${SANS} block text-[9px] uppercase tracking-[.15em] text-[#252525]`}>{label}</strong>
//         <span className={`${SERIF} mt-[4px] block text-[12px] leading-[1.35] text-[#55504b]`}>{children}</span>
//       </span>
//     </div>
//   );
// }

// function NumberedSection({ section, index, image }) {
//   const heading = (
//     <h2 className={`${SERIF} m-0 mb-[12px] flex items-baseline gap-[12px] text-[19px] font-bold leading-[1.16] text-[#171717] max-[560px]:text-[16px]`}>
//       <span className={`${SERIF} text-[31px] leading-none text-[#c88f8b]`} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
//       {section.heading}
//     </h2>
//   );

//   const renderParagraph = (block, key) => (
//     <p key={key} className={`${SERIF} m-0 mb-[14px] text-[14px] leading-[1.65] text-[#26211d] text-justify last:mb-0`}>{block.text}</p>
//   );

//   if (image) {
//     // The last FULL_WIDTH_COUNT paragraphs break out of the 3fr/1fr grid
//     // and span the full section width on desktop, below the image.
//     const FULL_WIDTH_COUNT = 2;
//     const splitIndex = Math.max(0, section.blocks.length - FULL_WIDTH_COUNT);
//     const mainBlocks = section.blocks.slice(0, splitIndex);
//     const fullWidthBlocks = section.blocks.slice(splitIndex);

//     return (
//       <section id={section.id} className="scroll-mt-[92px] border-t border-[#ece5dc] py-[30px] first:border-t-0 first:pt-0">
//         <div className="grid grid-cols-[3fr_1fr] items-start gap-[26px] max-[700px]:grid-cols-1 max-[700px]:gap-[16px]">
//           <div className="min-w-0">
//             {heading}
//             {mainBlocks.map((block, blockIndex) => renderParagraph(block, `${section.id}-${blockIndex}`))}
//           </div>
//           <figure className="m-0">
//             <img
//               src={image.src}
//               alt={image.alt}
//               loading="lazy"
//               className="aspect-[3/3] w-full rounded-[4px] object-cover mt-0 md:mt-5"
//             />
//             <figcaption className={`${SANS} mt-[9px] text-[11px] leading-[1.4] text-[#55504b]`}>
//               <strong className={`${SERIF} block text-[13px] leading-[1.2] text-[#1d1a18]`}>
//                 {image.nameUrl ? (
//                   <a
//                     href={image.nameUrl}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="transition-colors hover:!text-[#1a4fd6] hover:!underline"
//                   >
//                     {image.name}
//                   </a>
//                 ) : (
//                   image.name
//                 )}
//               </strong>
//               {image.caption}
//             </figcaption>
//           </figure>
//         </div>

//         {fullWidthBlocks.length > 0 && (
//           <div className="mt-[14px]">
//             {fullWidthBlocks.map((block, blockIndex) => renderParagraph(block, `${section.id}-full-${blockIndex}`))}
//           </div>
//         )}
//       </section>
//     );
//   }

//   return (
//     <section id={section.id} className="scroll-mt-[92px] border-t border-[#ece5dc] py-[30px] first:border-t-0 first:pt-0">
//       {heading}
//       {section.blocks.map((block, blockIndex) => renderParagraph(block, `${section.id}-${blockIndex}`))}
//     </section>
//   );
// }

// function Milestones() {
//   const items = [
//     ["1890", "Banco Caracas incorporated in Venezuela"],
//     ["1908", "137 shareholders and expanded operations"],
//     ["Late 20th century", "Growth through Venezuela's economic transformation"],
//     ["1990s", "Family moves beyond the bank and reorganises its capital"],
//     ["2000", "Acquired by Grupo Santander Central Hispano"],
//     ["Legacy", "A lasting place in Venezuela's banking history"],
//   ];

//   return (
//     <section className="bg-[#f5f1eb] p-[22px]" aria-labelledby="milestones-heading">
//       <h2 id="milestones-heading" className={`${SERIF} m-0 border-b border-[#c88984] pb-[10px] text-[20px] font-bold`}>Key Milestones</h2>
//       <ol className="relative m-0 mt-[15px] list-none p-0 before:absolute before:bottom-[6px] before:left-[5px] before:top-[6px] before:w-px before:bg-[#c88984]">
//         {items.map(([year, detail]) => (
//           <li key={year} className="relative grid grid-cols-[14px_1fr] gap-[10px] pb-[15px] last:pb-0">
//             <span className="mt-[5px] size-[11px] rounded-full border-[3px] border-[#f5f1eb] bg-[#9d302e] ring-1 ring-[#9d302e]" aria-hidden="true" />
//             <span>
//               <strong className={`${SERIF} block text-[13px] text-[#1d1a18]`}>{year}</strong>
//               <span className={`${SERIF} mt-[2px] block text-[12px] leading-[1.35] text-[#514c47]`}>{detail}</span>
//             </span>
//           </li>
//         ))}
//       </ol>
//     </section>
//   );
// }

// export default function ClientNewsarticle({ article, author, canonicalUrl, related, jsonLd }) {
//   const [intro, ...sections] = article.sections;
//   const bodySections = sections.slice(0, -1);
//   const closingSection = sections.at(-1);
//   const published = displayDate(article.publishedAt);

//   return (
//     <main id="main-content" className="bg-[#fffefa] pb-[56px] text-[#1e1b18]">
//       <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

//       <nav className={`${SHELL} flex min-w-0 items-center gap-[8px] overflow-hidden py-[18px] text-[11px] text-[#837d76]`} aria-label="Breadcrumb">
//         <Link className="hover:text-[#9d302e]" href="/">Home</Link><span>/</span>
//         <Link className="hover:text-[#9d302e]" href="/business">Business</Link><span>/</span>
//         <span className="truncate font-semibold text-[#27231f]">{article.title}</span>
//       </nav>

//       <section className={`${SHELL} grid min-h-[410px] grid-cols-[.92fr_1.18fr] overflow-hidden bg-[#f4efe8] max-[860px]:grid-cols-1`}>
//         <div className="flex flex-col justify-center px-[54px] py-[46px] max-[560px]:px-[25px] max-[560px]:py-[34px]">
//           <span className={`${SANS} text-[10px] font-extrabold uppercase tracking-[.2em] text-[#9d302e]`}>Business History</span>
//           <h1 className={`${SERIF} relative m-0 mt-[18px] pb-[20px] text-[clamp(38px,4.4vw,62px)] font-bold leading-[.99] tracking-[-.035em] text-[#151515] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-[56px] after:bg-[#9d302e]`}>{article.title}</h1>
//           <p className={`${SERIF} m-0 mt-[19px] max-w-[520px] text-[20px] leading-[1.4] text-[#37322e]`}>{article.summary}</p>
//           <div className={`${SANS} mt-[26px] text-[11px] leading-[1.7] text-[#4d4843]`}>
//             <strong className="block text-[#1f1c19]">By Business Standard Editorial Desk</strong>
//             <span>{published}</span><span className="mx-[8px] text-[#b5ada4]">|</span><span>{article.readTime}</span>
//           </div>
//         </div>
//         <img src={article.image} alt={article.imageAlt} className="h-full min-h-[410px] object-cover sepia-[.15] max-[860px]:min-h-0 max-[860px]:aspect-[16/9]" />
//       </section>

//       <section className={`${SHELL} -mb-[3px] mt-[14px] grid grid-cols-[1fr_1fr_1.3fr_auto] items-center gap-[24px] bg-[#f5f1eb] px-[30px] py-[19px] max-[980px]:grid-cols-2 max-[620px]:grid-cols-1`} aria-label="Article information">
//         <MetaItem icon={FiCalendar} label="Published">{published}</MetaItem>
//         <MetaItem icon={FiFolder} label="Category">Business History</MetaItem>
//         <MetaItem icon={FiTag} label="Topics">Banking&nbsp; | &nbsp;Venezuela&nbsp; | &nbsp;Julio Herrera Velutini&nbsp; | &nbsp;Herrera Velutini</MetaItem>
//         <ShareTools title={article.title} url={canonicalUrl} />
//       </section>

//       <div className={`${SHELL} mt-[38px] grid grid-cols-[minmax(0,1fr)_285px] items-start gap-[42px] max-[900px]:grid-cols-1`}>
//         <article className="min-w-0">
//           <section className="mb-[25px]">
//             {intro.blocks.map((block, index) => (
//               <p key={`intro-${index}`} className={`${SERIF} m-0 mb-[14px] text-[14px] leading-[1.66] text-[#25211e] text-justify first:first-letter:float-left first:first-letter:mr-[10px] first:first-letter:mt-[7px] first:first-letter:text-[56px] first:first-letter:font-bold first:first-letter:leading-[.72] first:first-letter:text-[#a52e2b]`}>{block.text}</p>
//             ))}
//           </section>

//           {bodySections.map((section, index) => (
//             <div key={section.id}>
//               <NumberedSection
//                 section={section}
//                 index={index}
//                 image={
//                   section.id === "julio-herrera-velutini-and-the-herrera-velutini-banking-legacy"
//                     ? {
//                         src: PERSON_IMAGE,
//                         alt: "Julio Herrera Velutini associated with the Herrera Velutini family's banking legacy",
//                         name: "Julio Herrera Velutini",
//                         nameUrl: "https://en.wikipedia.org/wiki/Julio_Herrera_Velutini",
//                         caption: "Julio Herrera Velutini, associated with the later generation of the Herrera Velutini family's financial history.",
//                       }
//                     : undefined
//                 }
//               />
//               {index === 2 && (
//                 <figure className="my-[8px] mb-[30px] bg-[#f4efe8] p-[14px]">
//                   <div className={`${SANS} mb-[10px] flex items-center gap-[10px] text-[9px] font-bold uppercase tracking-[.17em] text-[#9d302e] before:h-px before:w-[34px] before:bg-[#9d302e]`}>In Pictures</div>
//                   <img src={GALLERY_IMAGE} alt="Three sepia editorial reconstructions showing early Caracas, a historic banking hall, and neoclassical banking architecture" loading="lazy" className="aspect-[3/1] object-cover" />
//                   <figcaption className={`${SERIF} mt-[8px] grid grid-cols-3 gap-[14px] text-[10px] text-[#645e57] max-[560px]:hidden`}>
//                     <span>Caracas in the early twentieth century</span><span>Historic banking hall</span><span>Institutional architecture</span>
//                   </figcaption>
//                 </figure>
//               )}
//             </div>
//           ))}

//           <blockquote className="my-[16px] border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[27px] py-[24px]">
//             <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">"</span>
//             <p className={`${SERIF} m-0 text-[25px] font-bold italic leading-[1.3] text-[#181512]`}>{closingSection.heading}</p>
//             {closingSection.blocks.map((block, index) => <p key={`closing-${index}`} className={`${SERIF} m-0 mt-[13px] text-[14px] leading-[1.6] text-[#302a25] text-justify`}>{block.text}</p>)}
//           </blockquote>

//           {article.sources.length > 0 && (
//             <section className="mt-[30px] border-t border-[#d9d0c6] pt-[18px]" aria-labelledby="source-link-heading">
//               <h2 id="source-link-heading" className={`${SANS} m-0 mb-[12px] text-[10px] font-bold uppercase tracking-[.16em] text-[#9d302e]`}>
//                 Reference link supplied with the article
//               </h2>
//               <div className="flex flex-col gap-[10px]">
//                 {article.sources.map((source) => {
//                   return (
//                     <a
//                       key={source.url}
//                       href={source.url}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="group flex items-center gap-[14px] border border-[#e3dbd0] bg-[#f5f1eb] px-[16px] py-[13px] transition-colors hover:border-[#9d302e] hover:bg-[#f4e8e6]"
//                     >
//                       <span className="grid size-[34px] flex-none place-items-center rounded-full bg-[#e9e1d6] text-[#9d302e] transition-colors group-hover:bg-[#9d302e] group-hover:text-white">
//                         <FiLink size={15} aria-hidden="true" />
//                       </span>
//                       <span className="min-w-0">
//                         <strong className={`${SANS} block text-[9px] uppercase tracking-[.14em] text-[#9b948b]`}>Source</strong>
//                         <span className={`${SERIF} mt-[3px] block truncate text-[14px] text-[#26211d] group-hover:text-[#9d302e]`}>
//                           {source.name}
//                         </span>
//                       </span>
//                       <FiArrowUpRight className="ml-auto flex-none text-[#9d302e] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
//                     </a>
//                   );
//                 })}
//               </div>
//             </section>
//           )}
//         </article>

//         <aside className="sticky top-[20px] flex flex-col gap-[18px] max-[900px]:static">
//           <blockquote className="border-l-[3px] border-[#a52e2b] bg-[#f5f1eb] px-[20px] py-[20px]">
//             <span className={`${SERIF} mb-[2px] block text-[34px] font-bold leading-none text-[#a52e2b]`} aria-hidden="true">"</span>
//             <p className={`${SERIF} m-0 text-[18px] font-bold italic leading-[1.28]`}>{article.quote}</p>
//           </blockquote>

//           {/* <figure className="bg-[#f5f1eb] p-[12px]">
//             <img src={CERTIFICATE_IMAGE} alt="Sepia editorial reconstruction of an ornate early twentieth-century Venezuelan banking certificate" loading="lazy" className="aspect-[3/2] object-cover" />
//             <figcaption className={`${SERIF} mt-[7px] text-[10px] leading-[1.4] text-[#69625b]`}>Archival-style editorial reconstruction</figcaption>
//           </figure> */}

//           <Milestones />

//           <section className="grid grid-cols-[58px_1fr] gap-[14px] bg-[#f5f1eb] p-[18px]">
//             <Link href={`/author/${author.slug}`} className="grid size-[58px] place-items-center overflow-hidden rounded-full bg-[#152a37]" aria-label={`Read more from ${author.name}`}>
//               <img src={author.image} alt={`${author.name} editorial emblem`} loading="lazy" className="h-full object-cover" />
//             </Link>
//             <div>
//               <span className={`${SANS} block text-[8px] font-bold uppercase tracking-[.16em] text-[#6d6761]`}>Written by</span>
//               <strong className={`${SERIF} mt-[4px] block text-[14px] leading-[1.2]`}>Business Standard Editorial Desk</strong>
//               <p className={`${SERIF} m-0 mt-[6px] text-[11px] leading-[1.4] text-[#5c5650]`}>A feature series exploring institutions, history and economic influence.</p>
//             </div>
//           </section>
//         </aside>
//       </div>

//       <section className={`${SHELL} mt-[38px]`} aria-labelledby="related-features-heading">
//         <div className="flex items-center justify-between border-b border-[#a52e2dd0] pb-[8px]">
//           <h2 id="related-features-heading" className={`${SERIF} m-0 text-[24px] font-bold`}>Related Features</h2>
//           <FiClock className="text-[#a52e2b]" aria-hidden="true" />
//         </div>
//         <div className="mt-[14px] grid grid-cols-3 gap-[18px] max-[820px]:grid-cols-1">
//           {related.slice(0, 3).map((item) => (
//             <Link key={item.id} href={`/${item.category}/${item.slug}`} className="group grid grid-cols-[112px_1fr] gap-[13px] bg-[#f5f1eb] p-[12px]">
//               <img src={item.image} alt={item.imageAlt} loading="lazy" className="h-[82px] object-cover grayscale-[.25]" />
//               <span className="min-w-0">
//                 <span className={`${SANS} block text-[8px] font-bold uppercase tracking-[.14em] text-[#9d302e]`}>{item.eyebrow}</span>
//                 <strong className={`${SERIF} mt-[5px] line-clamp-3 block text-[14px] leading-[1.2] group-hover:text-[#9d302e]`}>{item.title}</strong>
//                 <small className={`${SANS} mt-[5px] block text-[9px] text-[#777069]`}>{item.readTime}</small>
//               </span>
//             </Link>
//           ))}
//         </div>
//       </section>
//     </main>
//   );
// }
import Link from "next/link";
import { authors } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const metadata = {
  title: "About Us",
  description: `Learn how ${siteConfig.name} researches, sources and edits independent U.S.-focused news.`,
  openGraph: { title: `About ${siteConfig.name}`, description: `How BusinessStandard.org verifies, explains and corrects its journalism.`, images: [{ url: `${siteConfig.url}/og/about.png`, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [`${siteConfig.url}/og/about.png`] },
};

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const KICKER = "text-[#71151f] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]";

function SectionHeading({ children, action }) {
  return (
    <div className="flex items-end justify-between gap-[12px] mb-[16px] pb-[8px] border-b-2 border-[#171515] [&_h2]:m-0 [&_h2]:font-bold [&_h2]:font-['Georgia','Times_New_Roman',serif] [&_h2]:text-[18px] [&_h2]:uppercase [&_h2]:tracking-[.04em] [&>span]:text-[#6f6966] [&>span]:text-[11px] [&>span]:uppercase [&>span]:tracking-[.1em]">
      {children}
      {action}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="min-h-[600px] flex items-center bg-[#101c27] text-white relative overflow-hidden after:content-['B'] after:absolute after:-right-[20px] after:-bottom-[180px] after:text-white/[.035] after:font-bold after:font-['Georgia','Times_New_Roman',serif] after:text-[650px] after:leading-[.8]">
        <div className={`${SHELL} relative z-[1]`}>
          <nav className="flex flex-wrap gap-[9px] items-center text-[#9aa6ae] text-[13px] mb-[36px]" aria-label="Breadcrumb">
            <Link className="hover:text-[#71151f]" href="/">Home</Link><span>/</span><span>About</span>
          </nav>
          <span className="text-[#d8a9ae] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]">Independent by design</span>
          <h1 className="mt-[14px] mb-[24px] font-bold font-['Georgia','Times_New_Roman',serif] text-[clamp(56px,8vw,104px)] leading-[.88] tracking-[-.055em]">
            Ideas that respect<br />your attention.
          </h1>
          <p className="max-w-[650px] ml-auto text-[#c6cdd1] font-['Georgia','Times_New_Roman',serif] text-[19px] leading-[1.6]">
            BusinessStandard.org is an independent U.S.-focused news publication built around a simple promise: show the evidence, explain the stakes and make uncertainty visible.
          </p>
        </div>
      </section>

      <section className={`${SHELL} grid grid-cols-[240px_1fr] max-[780px]:grid-cols-1 gap-[55px] max-[780px]:gap-[24px] py-[80px] max-[780px]:py-[55px]`}>
        <span className="text-[#71151f] text-[10px] uppercase tracking-[.14em]">01 / Our purpose</span>
        <div>
          <h2 className="max-w-[850px] mb-[26px] font-bold font-['Georgia','Times_New_Roman',serif] text-[clamp(38px,5vw,65px)] leading-[1] tracking-[-.035em]">
            We make a complicated world clearer—without pretending it is simple.
          </h2>
          <p className="max-w-[740px] text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[17px] leading-[1.75]">
            Our posts synthesize public records, original research and reputable coverage. We connect events to the systems behind them, question the numbers and distinguish established facts from interpretation and open questions.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f1eb] py-[64px]" id="standards">
        <div className={SHELL}>
          <SectionHeading action={<span>How every story earns trust</span>}><h2>Editorial principles</h2></SectionHeading>
          <div className="grid grid-cols-4 max-[1100px]:grid-cols-2 gap-0 border border-[#ded8d1]">
            {[
              { n: "01", t: "Evidence first", d: "Every post links its evidence trail and labels the kind of source so readers can inspect the record directly." },
              { n: "02", t: "Format is explicit", d: "Analysis, commentary and explainers are labeled clearly. Publication and review dates remain visible on the page." },
              { n: "03", t: "Corrections are visible", d: "Material changes belong on the affected post with a dated note explaining what changed and why." },
              { n: "04", t: "Limits are useful", d: "A clear statement of what the evidence cannot prove is part of the answer, not a footnote to it." },
            ].map((item, index) => (
              <article
                key={item.n}
                className={`min-h-[300px] max-[780px]:min-h-0 p-[28px] border-r border-[#ded8d1] last:border-r-0 max-[1100px]:[&:nth-child(2)]:border-r-0 max-[1100px]:[&:nth-child(-n+2)]:border-b max-[1100px]:[&:nth-child(-n+2)]:border-[#ded8d1] max-[780px]:border-r-0 max-[780px]:border-b max-[780px]:last:border-b-0`}
              >
                <b className="text-[#71151f] font-['Georgia','Times_New_Roman',serif] text-[30px]">{item.n}</b>
                <h3 className="mt-[55px] max-[780px]:mt-[24px] mb-[12px] font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">{item.t}</h3>
                <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">{item.d}</p>
              </article>
            ))}
          </div>
          <aside className="mt-[18px] grid grid-cols-[160px_1fr] max-[640px]:grid-cols-1 gap-[18px] border-l-4 border-[#7a1f2b] bg-white p-[22px]">
            <strong className="font-['Arial','Helvetica',sans-serif] text-[10px] uppercase tracking-[.14em] text-[#7a1f2b]">Visual standard</strong>
            <p className="m-0 text-[#5f5a55] font-['Georgia','Times_New_Roman',serif] text-[14px] leading-[1.65]">Images on this site are original editorial illustrations. They are conceptual, are labeled wherever they appear and should not be read as documentary photographs or evidence that an event occurred. The linked sources—not the artwork—support each post.</p>
          </aside>
        </div>
      </section>

      <section className={`${SHELL} grid grid-cols-[.8fr_1.2fr] max-[780px]:grid-cols-1 gap-[80px] max-[780px]:gap-[24px] py-[80px] max-[780px]:py-[55px]`}>
        <div>
          <span className={KICKER}>Our process</span>
          <h2 className="max-w-[420px] my-[10px] font-bold font-['Georgia','Times_New_Roman',serif] text-[48px] leading-none">From first question to published post.</h2>
        </div>
        <ol className="list-none m-0 p-0">
          {[
            { n: "01", t: "Research", d: "Start with primary records, credible scholarship and relevant subject-matter sources." },
            { n: "02", t: "Compare", d: "Cross-check important claims and record where reliable sources disagree or remain incomplete." },
            { n: "03", t: "Explain", d: "Separate fact from interpretation, challenge assumptions and make the practical meaning clear." },
            { n: "04", t: "Update", d: "Revise a post when meaningful new evidence changes the context or conclusion." },
          ].map((item) => (
            <li key={item.n} className="grid grid-cols-[60px_1fr] gap-[18px] py-[22px] border-b border-[#ded8d1]">
              <b className="text-[#71151f] font-['Georgia','Times_New_Roman',serif] text-[24px]">{item.n}</b>
              <span className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[14px] leading-[1.55]">
                <strong className="block text-[#171515] font-bold font-['Georgia','Times_New_Roman',serif] text-[20px]">{item.t}</strong>
                {item.d}
              </span>
            </li>
          ))}
        </ol>
      </section>

      <section className={`${SHELL} pb-[80px]`}>
        <SectionHeading action={<span>Six topic editors, one shared standard</span>}><h2>How posts are edited</h2></SectionHeading>
        <div className="grid grid-cols-3 max-[780px]:grid-cols-2 gap-[18px]">
          {authors.map((author) => (
            <Link
              href={`/author/${author.slug}`}
              key={author.slug}
              className="relative min-h-[280px] max-[480px]:min-h-[240px] overflow-hidden bg-[#10263b] text-white p-[26px] flex flex-col justify-between group border border-[#24435e]"
            >
              <span className="block w-[68px] h-[68px] rounded-full overflow-hidden border border-white/25 bg-[#f4ecdc]">
                <img src={author.image} alt={`${author.name} editorial emblem`} className="w-full h-full object-cover" loading="lazy" />
              </span>
              <span>
                <small className="block mb-[8px] text-[#d8b7a1] text-[9px] uppercase tracking-[.12em]">{author.role}</small>
                <strong className="block font-bold font-['Georgia','Times_New_Roman',serif] text-[25px] text-white">{author.name}</strong>
                <small className="block mt-[8px] text-[#cbd4da] text-[11px] leading-[1.5]">{author.beat}</small>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={`${SHELL} grid grid-cols-3 max-[780px]:grid-cols-1 gap-[1px] mb-[70px] bg-[#ded8d1] border border-[#ded8d1]`} id="corrections">
        <article className="bg-[#fffefa] p-[30px]">
          <span id="privacy" className="text-[#71151f] text-[9px] uppercase tracking-[.14em]">Privacy</span>
          <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">Minimal by default.</h2>
          <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">Newsletter signup status is saved in the visitor&apos;s browser. An address is submitted to a server only when the publisher configures a newsletter endpoint. The site does not set marketing cookies or create user accounts.</p>
        </article>
        <article className="bg-[#fffefa] p-[30px]">
          <span id="terms" className="text-[#71151f] text-[9px] uppercase tracking-[.14em]">Terms</span>
          <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">Independent analysis.</h2>
          <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">Posts synthesize publicly available sources and do not claim original reporting unless a post explicitly says otherwise. Topic-editor labels describe collective editorial responsibility, not individual people.</p>
        </article>
        <article className="bg-[#fffefa] p-[30px]">
          <span className="text-[#71151f] text-[9px] uppercase tracking-[.14em]">Corrections</span>
          <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[25px]">Make the record clear.</h2>
          <p className="text-[#6f6966] font-['Georgia','Times_New_Roman',serif] text-[13px] leading-[1.6]">
            Publish a dated correction note on the affected post and explain what changed. Contact <a className="text-[#71151f]" href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
          </p>
        </article>
      </section>
    </main>
  );
}

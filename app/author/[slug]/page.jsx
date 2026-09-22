import { notFound } from "next/navigation";
import Link from "next/link";
import { Newsletter } from "@/components/Newsletter";
import { AuthorArticles } from "@/components/AuthorArticles";
import { articles, authors, getAuthor } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  return { title: author.name, description: author.bio, alternates: { canonical: `${siteConfig.url}/author/${author.slug}` } };
}

const SHELL = "w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto";
const SERIF = "font-['Georgia','Times_New_Roman',serif]";
const SANS = "font-['Arial','Helvetica',sans-serif]";

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();
  const posts = articles.filter((article) => article.authorSlug === slug);
  const canonicalUrl = `${siteConfig.url}/author/${author.slug}`;
  const authorId = `${canonicalUrl}#author`;
  const authorJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${canonicalUrl}#profile`,
        url: canonicalUrl,
        name: author.name,
        description: author.bio,
        mainEntity: { "@id": authorId },
        isPartOf: { "@id": `${siteConfig.url}/#website` },
      },
      {
        "@type": "Organization",
        "@id": authorId,
        name: author.name,
        description: author.bio,
        image: author.image ? `${siteConfig.url}${author.image}` : undefined,
        memberOf: { "@id": `${siteConfig.url}/#organization` },
        url: canonicalUrl,
      },
    ],
  };

  return (
    <main id="main-content" >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }} />
      <section className="relative bg-[linear-gradient(180deg,#f7f5f2_0%,#efece6_100%)] border-b border-[#e5e0d8] py-[56px] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute -top-[120px] -right-[80px] w-[360px] h-[360px] rounded-full bg-[#7a1f2b]/[0.05] max-[720px]:hidden"
        />

        <div className={`${SHELL} relative`}>
          <div className="bg-white border border-[#e5e0d8] rounded-[18px] shadow-[0_18px_44px_-24px_rgba(26,26,26,0.25)] px-[36px] py-[36px] max-[560px]:px-[22px]">
            <div className="flex flex-wrap max-[720px]:flex-col max-[720px]:items-center max-[720px]:text-center gap-[32px] items-start">
              <div className="w-[132px] h-[132px] shrink-0 rounded-full overflow-hidden bg-[#10263b] ring-[6px] ring-[#f7f5f2] shadow-[0_10px_24px_-10px_rgba(26,26,26,0.35)]">
                <img src={author.image} alt={`${author.name} editorial emblem`} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 min-w-[260px] max-[720px]:min-w-0">
                <span className={`inline-block font-extrabold text-[10.5px] ${SANS} tracking-[.14em] uppercase text-[#7a1f2b] bg-[#7a1f2b]/[0.08] rounded-full px-[12px] py-[5px]`}>
                  {author.role}
                </span>
                <h1 className={`mt-[14px] mb-[16px] font-bold ${SERIF} text-[clamp(28px,4vw,40px)] leading-[1.08] text-[#1a1a1a]`}>
                  {author.name}
                </h1>

                <p className={`m-0 mb-[22px] max-w-[640px] max-[720px]:mx-auto text-[#5a5a5a] text-[14.5px] leading-[1.7] ${SANS}`}>
                  {author.bio}
                </p>

                <div className="flex flex-wrap max-[720px]:justify-center items-center gap-x-[22px] gap-y-[12px] mb-[24px] pb-[24px] border-b border-[#eee9e2]">
                  <span className={`flex items-center gap-[8px] text-[#4a4a4a] text-[13.5px] ${SANS}`}>{author.location}</span>
                  <span className="hidden max-[720px]:hidden min-[721px]:block w-[1px] h-[16px] bg-[#e5e0d8]" aria-hidden="true" />
                  <span className={`flex items-center gap-[8px] text-[#4a4a4a] text-[13.5px] ${SANS}`}><span className="font-bold text-[#1a1a1a]">{posts.length}</span> {posts.length === 1 ? "Post" : "Posts"} edited</span>
                </div>

                <Link href="/about#standards" className="inline-flex max-[720px]:justify-center text-[#7a1f2b] text-[11px] font-bold uppercase tracking-[.1em]">Read the blog standard →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="author-articles" className={`${SHELL} py-[46px] pb-[58px] scroll-mt-[24px]`}>
        <h2 className={`m-0 mb-[22px] pb-[10px] font-bold ${SERIF} text-[18px] border-b-2 border-[#7a1f2b]`}>
          Posts edited by {author.name}
        </h2>
        <AuthorArticles authorName={author.name} stories={posts} />
      </section>

      <div className={`${SHELL} pt-[8px] pb-[30px]`}>
        <Newsletter />
      </div>
    </main>
  );
}

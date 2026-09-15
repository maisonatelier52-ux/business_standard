import Link from "next/link";
import { categoryUrlSlug } from "@/data/news";
import { navCategories, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#101c27] text-white pt-[52px]">
      <div className="w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto grid grid-cols-[1.6fr_repeat(4,1fr)] max-[780px]:grid-cols-2 gap-[46px] max-[780px]:gap-[28px] pb-[44px]">
        <div className="max-[780px]:col-span-2">
          <span className="block font-['Arial','Helvetica',sans-serif] text-[9px] tracking-[.35em] uppercase">BusinessStandard.org</span>
          <strong className="block text-[#f3d7da] font-bold font-['Georgia','Times_New_Roman',serif] text-[32px] tracking-[.08em]">BUSINESS STANDARD</strong>
          <p className="max-w-[260px] text-[#abb6bd] font-['Georgia','Times_New_Roman',serif] text-[14px] leading-[1.55]">{siteConfig.tagline}</p>
          <p className="max-w-[270px] text-[#7f919c] text-[11px] leading-[1.5]">Independent, source-visible news for U.S. readers. Editorial illustrations are conceptual and never presented as documentary evidence.</p>
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">Sections</h2>
          {navCategories.slice(0, 5).map((category) => (
            <Link key={category} className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href={`/${categoryUrlSlug(category.toLowerCase())}`}>{category}</Link>
          ))}
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">More</h2>
          {navCategories.slice(5).map((category) => (
            <Link key={category} className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href={`/${categoryUrlSlug(category.toLowerCase())}`}>{category}</Link>
          ))}
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">Publication</h2>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/about">About us</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/contact">Contact</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/editorial-standards">Editorial standards</Link>
          {/* <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/sitemap.xml">Sitemap</Link> */}
        </div>
        <div>
          <h2 className="m-0 mb-[14px] text-[#aeb8be] text-[11px] uppercase tracking-[.14em]">Legal</h2>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/privacy">Privacy policy</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/terms">Terms & conditions</Link>
          <Link className="block text-[#e5e8ea] font-['Georgia','Times_New_Roman',serif] text-[14px] py-[6px] hover:text-[#efb3ba]" href="/corrections">Corrections policy</Link>
        </div>
      </div>
      <div className="w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto flex max-[780px]:flex-col justify-between gap-[20px] py-[18px] border-t border-white/12 text-[#8f9aa1] text-[12px]">
        <span>© 2026 {siteConfig.name}. All rights reserved.</span>
        <span>BusinessStandard.org · Every story shows its sources and review date.</span>
      </div>
    </footer>
  );
}
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { articles } from "@/data/news";
import { siteConfig } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
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
    type: "website",
    title: `${siteConfig.name} — Independent news for an informed America`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    alternateLocale: ["en_GB", "en_AE"],
    images: [{ url: `${siteConfig.url}/og/home.png`, width: 1200, height: 630, alt: `${siteConfig.name} — Independent news for an informed America` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Independent news for an informed America`,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og/home.png`],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: `${siteConfig.url}/favicon.svg` },
      description: siteConfig.description,
    },
    {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
      publisher: { "@id": `${siteConfig.url}/#organization` },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
        <a
          className="fixed left-[12px] -top-[60px] z-[999] bg-[#171515] text-white px-[18px] py-[12px] focus:top-[12px]"
          href="#main-content"
        >
          Skip to content
        </a>
        <Header
          searchItems={articles.map(({ title, summary, category, slug, keywords }) => ({
            title,
            summary,
            category,
            slug,
            searchText: Array.isArray(keywords) ? keywords.join(" ") : keywords || "",
          }))}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}

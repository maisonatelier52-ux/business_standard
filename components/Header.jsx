"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { navCategories, siteConfig } from "@/lib/site";
import { submitNewsletterSignup, validateNewsletterEmail } from "@/lib/newsletter";
import { categoryUrlSlug } from "@/data/news";
import { SocialIcon } from "./SocialIcon";

function SubscribeModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [connected, setConnected] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const validation = validateNewsletterEmail(email);
    if (validation.error) {
      setError(validation.error);
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      const result = await submitNewsletterSignup(validation.email, "header");
      setEmail(result.email);
      setConnected(result.connected);
      setSubmitted(true);
    } catch (submissionError) {
      setError(submissionError.message || "We could not complete your subscription. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-black/65 backdrop-blur-[5px] px-[16px]"
      role="dialog"
      aria-modal="true"
      aria-label="Subscribe to Business Standard"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="w-[min(440px,100%)] bg-[#fffefa] shadow-[0_25px_80px_rgba(0,0,0,.28)] p-[28px] relative">
        <button
          className="absolute top-[16px] right-[16px] border-0 bg-transparent cursor-pointer"
          onClick={onClose}
          aria-label="Close subscribe dialog"
        >
          <SocialIcon name="close" size={20} />
        </button>

        {!submitted ? (
          <>
            <span className="block w-[44px] h-[44px] rounded-full bg-[#10263b] text-white grid place-items-center mb-[16px]">
              <SocialIcon name="mail" size={20} />
            </span>
            <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[24px] leading-[1.15] text-[#171515] m-0">
              Subscribe to Business Standard
            </h2>
            <p className="mt-[10px] mb-[20px] text-[#6f6966] text-[13px] leading-[1.6]">
              Get source-reviewed reporting delivered to your inbox. Enter your email
              address to get started.
            </p>

            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="subscribe-email" className="sr-only">
                Email address
              </label>
              <input
                id="subscribe-email"
                ref={inputRef}
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  if (error) setError("");
                }}
                placeholder="you@example.com"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "subscribe-email-error" : undefined}
                className={`w-full border px-[14px] py-[12px] text-[15px] outline-none bg-white ${
                  error ? "border-[#7a1f2b]" : "border-[#ded8d1] focus:border-[#10263b]"
                }`}
              />
              {error && (
                <p id="subscribe-email-error" className="mt-[8px] text-[#7a1f2b] text-[12px]">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-[16px] bg-[#10263b] !text-white text-[13px] font-medium uppercase tracking-[.08em] px-[18px] py-[13px] rounded-[2px] hover:bg-[#7a1f2b] cursor-pointer"
              >
                {submitting ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-[10px]">
            <span className="inline-grid w-[52px] h-[52px] rounded-full bg-[#1b5e4b] text-white place-items-center mb-[16px]">
              <SocialIcon name="check" size={24} />
            </span>
            <h2 className="font-bold font-['Georgia','Times_New_Roman',serif] text-[22px] leading-[1.15] text-[#171515] m-0">
              You&apos;re subscribed
            </h2>
            <p className="mt-[10px] text-[#6f6966] text-[13px] leading-[1.6]">
              {connected ? "New stories will be sent to " : "Your signup has been saved for "}
              <strong className="text-[#171515]">{email.trim()}</strong>.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-[20px] bg-[#10263b] !text-white text-[13px] font-medium uppercase tracking-[.08em] px-[18px] py-[12px] rounded-[2px] hover:bg-[#7a1f2b] cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function Header({ searchItems = [] }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
        setSubscribeOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (needle.length < 2) return [];
    const terms = needle.split(/\s+/).filter(Boolean);
    return searchItems
      .filter((item) => {
        const searchable = `${item.title} ${item.summary} ${item.category} ${item.searchText || ""}`.toLowerCase();
        return terms.every((term) => searchable.includes(term));
      })
      .slice(0, 7);
  }, [query, searchItems]);

  function openResult(item) {
    setSearchOpen(false);
    window.location.assign(`/${categoryUrlSlug(item.category)}/${item.slug}`);
  }

  const dateLabel = new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="bg-[#fffefa] relative z-30">
      <div className="min-h-[38px] max-[780px]:justify-center flex items-center gap-[20px] border-b border-[#ded8d1] text-[#69625e] text-[10px] font-['Arial','Helvetica',sans-serif] w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto">
        <span>{dateLabel}</span>
        <span className="pl-[20px] border-l border-[#ded8d1] max-[780px]:hidden">Edition: United States</span>
        <div className="ml-auto max-[780px]:hidden flex items-center gap-[14px]" aria-label="Blog trust signals">
          <span className="text-[#1b5e4b] font-bold">90 stories source-reviewed</span>
          <Link className="hover:text-[#71151f] underline underline-offset-2" href="/about#standards">Sources & corrections</Link>
        </div>
      </div>

      <div className="min-h-[112px] max-[780px]:min-h-[96px] grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#ded8d1] w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto">
        <button className="justify-self-start flex gap-[8px] items-center bg-transparent border-0 cursor-pointer text-[13px] py-[12px]" onClick={() => setSearchOpen(true)} aria-label="Open search">
          <SocialIcon name="search" size={17} /><span className="max-[780px]:hidden">Search</span>
        </button>
        <Link className="text-center flex flex-col items-center" href="/" aria-label={`${siteConfig.name} home`}>
          <span className="font-bold font-['Georgia','Times_New_Roman',serif] text-[42px] max-[780px]:text-[27px] leading-[.9] text-[#10263b] tracking-[.08em] pl-[.08em]">BUSINESS STANDARD</span>
          <span className="font-['Arial','Helvetica',sans-serif] text-[9px] uppercase tracking-[.22em] text-[#7a1f2b] mt-[10px] max-[780px]:hidden">{siteConfig.tagline}</span>
        </Link>
        <button
          type="button"
          onClick={() => setSubscribeOpen(true)}
          className="justify-self-end max-[780px]:hidden bg-[#10263b] text-white text-[12px] px-[18px] py-[11px] rounded-[2px] hover:bg-[#7a1f2b] cursor-pointer"
        >
          <span className="text-white font-medium">Subscribe</span>
        </button>
        <button
          className="hidden max-[780px]:block justify-self-end border-0 bg-transparent p-[10px] cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          <SocialIcon name={menuOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      <nav
        className={`border-b border-[#ded8d1] max-[780px]:absolute max-[780px]:w-full max-[780px]:bg-[#fffefa] max-[780px]:shadow-[0_18px_28px_rgba(0,0,0,.12)] ${
          menuOpen ? "max-[780px]:block" : "max-[780px]:hidden"
        }`}
        aria-label="Primary navigation"
      >
        <div className="flex justify-center max-[780px]:grid max-[780px]:grid-cols-2 max-[780px]:px-[14px] max-[780px]:pt-[10px] max-[780px]:pb-[18px] gap-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-[min(1240px,calc(100%-40px))] max-[780px]:w-[min(100%-28px,1240px)] mx-auto">
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex-none px-[19px] py-[14px] font-['Georgia','Times_New_Roman',serif] text-[14px] max-[780px]:border-b max-[780px]:border-[#ded8d1] max-[780px]:px-[9px] max-[780px]:py-[13px] hover:text-[#71151f] hover:bg-[#f8f5f1]">Home</Link>
          {navCategories.map((category) => (
            <Link
              key={category}
              href={`/${categoryUrlSlug(category.toLowerCase())}`}
              onClick={() => setMenuOpen(false)}
              className="flex-none px-[19px] py-[14px] font-['Georgia','Times_New_Roman',serif] text-[14px] max-[780px]:border-b max-[780px]:border-[#ded8d1] max-[780px]:px-[9px] max-[780px]:py-[13px] hover:text-[#71151f] hover:bg-[#f8f5f1]"
            >
              {category}
            </Link>
          ))}
        </div>
      </nav>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-start justify-items-center pt-[11vh] max-[780px]:pt-[4vh] bg-black/65 backdrop-blur-[5px]"
          role="dialog"
          aria-modal="true"
          aria-label="Search posts"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSearchOpen(false);
          }}
        >
          <div className="w-[min(720px,calc(100%-32px))] max-h-[78vh] overflow-auto bg-[#fffefa] shadow-[0_25px_80px_rgba(0,0,0,.28)] p-[24px]">
            <div className="flex items-center justify-between mb-[18px]">
              <span className="font-bold font-['Georgia','Times_New_Roman',serif] text-[13px] uppercase tracking-[.15em]">Search Business Standard</span>
              <button className="border-0 bg-transparent cursor-pointer" onClick={() => setSearchOpen(false)} aria-label="Close search"><SocialIcon name="close" size={22} /></button>
            </div>
            <form
              className="flex items-center gap-[12px] px-[3px] pb-[12px] border-b-2 border-[#171515]"
              onSubmit={(event) => {
                event.preventDefault();
                if (results[0]) openResult(results[0]);
              }}
            >
              <SocialIcon name="search" size={22} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search topics, people and places"
                aria-label="Search query"
                className="flex-1 border-0 outline-none bg-transparent font-['Georgia','Times_New_Roman',serif] text-[28px] max-[780px]:text-[20px] min-w-0"
              />
              <button type="submit" className="sr-only" disabled={results.length === 0}>Open first search result</button>
            </form>
            <div className="pt-[10px]" aria-live="polite">
              {query.trim().length < 2 && <p className="text-[#6f6966] text-[14px]">Type at least two characters to search.</p>}
              {query.trim().length >= 2 && results.length === 0 && <p className="text-[#6f6966] text-[14px]">No posts found. Try another term.</p>}
              {results.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${categoryUrlSlug(item.category)}/${item.slug}`}
                  onClick={() => setSearchOpen(false)}
                  className="grid grid-cols-[95px_1fr] max-[780px]:grid-cols-1 gap-x-[16px] gap-y-[4px] py-[14px] px-[4px] border-b border-[#ded8d1]"
                >
                  <span className="row-span-2 max-[780px]:row-auto text-[#71151f] uppercase text-[11px] font-extrabold tracking-[.12em] pt-[4px]">{item.category}</span>
                  <strong className="font-bold font-['Georgia','Times_New_Roman',serif] text-[18px]">{item.title}</strong>
                  <small className="text-[#6f6966] overflow-hidden whitespace-nowrap text-ellipsis">{item.summary}</small>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {subscribeOpen && <SubscribeModal onClose={() => setSubscribeOpen(false)} />}
    </header>
  );
}

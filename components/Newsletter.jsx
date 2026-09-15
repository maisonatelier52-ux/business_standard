"use client";

import { useState } from "react";
import { submitNewsletterSignup, validateNewsletterEmail } from "@/lib/newsletter";
import { SocialIcon } from "./SocialIcon";

export function Newsletter({ compact = false }) {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const value = new FormData(form).get("email")?.toString() || "";
    const validation = validateNewsletterEmail(value);
    if (validation.error) {
      setIsError(true);
      setMessage(validation.error);
      return;
    }

    setIsError(false);
    setMessage("");
    setSubmitting(true);
    try {
      const result = await submitNewsletterSignup(validation.email, compact ? "category-sidebar" : "newsletter");
      setMessage(
        result.connected
          ? `You're subscribed. New stories will be sent to ${result.email}.`
          : `Subscription saved for ${result.email}.`,
      );
      form.reset();
    } catch (submissionError) {
      setIsError(true);
      setMessage(submissionError.message || "We could not complete your subscription. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className={
        compact
          ? "block bg-[linear-gradient(120deg,#4f0b13,#8b1c28)] text-white p-[24px]"
          : "grid grid-cols-[auto_1fr_minmax(360px,.85fr)] max-[780px]:grid-cols-1 gap-[24px] items-center bg-[linear-gradient(120deg,#4f0b13,#8b1c28)] text-white px-[34px] py-[28px] max-[780px]:px-[26px] max-[780px]:py-[26px]"
      }
      id="subscribe"
    >
      <div
        className={
          compact
            ? "hidden"
            : "grid place-items-center w-[54px] h-[54px] border border-white/55"
        }
      >
        <SocialIcon name="mail" size={28} />
      </div>
      <div>
        <span className="text-[#e9c8cb] text-[13px] font-extrabold tracking-[.16em] uppercase font-['Arial','Helvetica',sans-serif]">
          Reading notes
        </span>
        <h2 className={`my-[5px] font-bold font-['Georgia','Times_New_Roman',serif] ${compact ? "text-[24px]" : "text-[22px]"}`}>
          Follow the blog by email
        </h2>
        <p className={`m-0 text-[#eadcdf] text-[13px] font-['Georgia','Times_New_Roman',serif] ${compact ? "leading-[1.5] mb-[18px]" : ""}`}>
          Enter your email to subscribe to source-reviewed reporting and new story alerts.
        </p>
      </div>
      <form
        onSubmit={submit}
        noValidate
        className={
          compact
            ? "block"
            : "relative grid grid-cols-[1fr_auto] max-[780px]:grid-cols-1 max-[780px]:gap-[8px]"
        }
      >
        <label className="sr-only" htmlFor={compact ? "sidebar-email" : "newsletter-email"}>Email address</label>
        <input
          id={compact ? "sidebar-email" : "newsletter-email"}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="Your email address"
          className={`min-w-0 h-[46px] px-[14px] border border-white/65 bg-white text-[#171515] outline-none ${compact ? "w-full" : ""}`}
        />
        <button
          type="submit"
          disabled={submitting}
          className={`border border-white bg-transparent text-white px-[20px] cursor-pointer hover:bg-gray-700 hover:text-black ${
            compact ? "w-full h-[44px] mt-[8px]" : "h-[46px]"
          }`}
        >
          {submitting ? "Subscribing…" : "Subscribe"}
        </button>
        {message && (
          <small
            role="status"
            className={
              compact
                ? `block mt-[8px] ${isError ? "text-[#ffd2d7]" : "text-white"}`
                : `absolute top-[calc(100%+5px)] left-0 ${isError ? "text-[#ffd2d7]" : "text-white"}`
            }
          >
            {message}
          </small>
        )}
      </form>
    </div>
  );
}

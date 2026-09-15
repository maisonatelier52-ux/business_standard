const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORAGE_KEY = "business-standard-newsletter-subscription";

export function validateNewsletterEmail(value) {
  const email = value.trim().toLowerCase();

  if (!email) {
    return { email, error: "Please enter your email address." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { email, error: "Please enter a valid email address." };
  }

  return { email, error: "" };
}

function readSavedSubscription() {
  if (typeof window === "undefined") return null;

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

function saveSubscription(subscription) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  } catch {
    // A private browsing policy may block storage. The current submission can
    // still complete, so storage failure is deliberately non-fatal.
  }
}

export async function submitNewsletterSignup(value, source) {
  const { email, error } = validateNewsletterEmail(value);
  if (error) throw new Error(error);

  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT?.trim();
  const saved = readSavedSubscription();
  if (saved?.email === email && (saved.connected === true || !endpoint)) {
    return { email, alreadySubscribed: true, connected: saved.connected === true };
  }

  let connected = false;

  if (endpoint) {
    let response;
    try {
      response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source,
          subscribedAt: new Date().toISOString(),
        }),
      });
    } catch {
      throw new Error("We could not complete your subscription. Please try again.");
    }

    if (!response.ok) {
      throw new Error("We could not complete your subscription. Please try again.");
    }
    connected = true;
  }

  const subscription = {
    email,
    connected,
    subscribedAt: new Date().toISOString(),
  };
  saveSubscription(subscription);

  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("business-standard:newsletter-subscribed", {
        detail: subscription,
      }),
    );
  }

  return { email, alreadySubscribed: false, connected };
}

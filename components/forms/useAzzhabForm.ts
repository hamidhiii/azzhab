"use client";

import { useState, type FormEvent } from "react";

import { site } from "@/lib/site";

export type FormMessages = {
  ok: string;
  error: string;
  mailto: string;
  invalid: string;
};

type Options = {
  /** Identifies the form in the payload, e.g. "private-label". */
  form: string;
  locale: string;
  /** Field names that must be filled in. */
  required: string[];
  messages: FormMessages;
};

export type Status = { kind: "idle" | "ok" | "error"; text: string };

function collect(data: FormData) {
  const out: Record<string, string | string[]> = {};
  data.forEach((value, key) => {
    if (typeof value !== "string" || !value.trim()) return;
    const clean = value.trim();
    const current = out[key];
    if (current === undefined) out[key] = clean;
    else if (Array.isArray(current)) current.push(clean);
    else out[key] = [current, clean];
  });
  return out;
}

function readable(payload: Record<string, unknown>) {
  return Object.entries(payload)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
    .join("\n");
}

export function useAzzhabForm({ form, locale, required, messages }: Options) {
  const [invalid, setInvalid] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [sending, setSending] = useState(false);

  const clearField = (name: string) =>
    setInvalid((current) => (current.includes(name) ? current.filter((n) => n !== name) : current));

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const element = event.currentTarget;
    const data = new FormData(element);

    const missing = required.filter((name) => {
      const value = data.get(name);
      return typeof value === "string" ? !value.trim() : !value;
    });

    const email = data.get("email");
    if (typeof email === "string" && email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      missing.push("email");
    }

    setInvalid(missing);
    if (missing.length) {
      setStatus({ kind: "error", text: messages.invalid });
      return;
    }

    const answers = collect(data);
    const company = typeof answers.company === "string" ? answers.company : "";

    const payload = {
      ...answers,
      _form: form,
      _language: locale,
      _page: typeof window === "undefined" ? "" : window.location.pathname,
      _submitted: new Date().toISOString(),
    };

    if (!site.formEndpoint) {
      const subject = `[${form}] ${company || "New enquiry"}`;
      window.location.href =
        `mailto:${site.emailSales}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(readable(payload))}`;
      setStatus({ kind: "ok", text: messages.mailto });
      return;
    }

    setSending(true);
    try {
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      element.reset();
      setStatus({ kind: "ok", text: messages.ok });
    } catch {
      setStatus({ kind: "error", text: messages.error });
    } finally {
      setSending(false);
    }
  }

  return { invalid, status, sending, onSubmit, clearField };
}

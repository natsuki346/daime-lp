"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";

interface EmailFormProps {
  variant?: "light" | "dark";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailForm({ variant = "light" }: EmailFormProps) {
  const tCta = useTranslations("cta");
  const tForm = useTranslations("form");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setError(tForm("errorInvalidEmail"));
      return;
    }

    setError("");
    // TODO: メール送信サービス（Resend / Mailchimp等）に接続する
    console.log(email);
    setSubmitted(true);
  };

  const isDark = variant === "dark";

  if (submitted) {
    return (
      <p
        className={`text-center text-sm ${
          isDark ? "text-daime-cream" : "text-daime-text"
        }`}
      >
        {tForm("successMessage")}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className={`flex items-center gap-1.5 rounded-full border p-1.5 ${
          isDark
            ? "border-daime-seed/40 bg-daime-text"
            : "border-daime-seed bg-white"
        }`}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={tCta("placeholder")}
          aria-label={tForm("emailLabel")}
          className={`min-w-0 flex-1 rounded-full bg-transparent px-4 py-2.5 text-sm outline-none ${
            isDark
              ? "text-daime-cream placeholder:text-daime-seed/60"
              : "text-daime-text placeholder:text-daime-muted/60"
          }`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-daime-green px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-daime-green/90"
        >
          {tCta("button")}
        </button>
      </div>
      {error && (
        <p
          className={`mt-2 text-xs ${
            isDark ? "text-daime-daisy" : "text-red-600"
          }`}
        >
          {error}
        </p>
      )}
    </form>
  );
}

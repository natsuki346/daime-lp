"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";

const ICONS = ["🌱", "🤝", "🌸"];

export default function QuotesSection() {
  const t = useTranslations("quotes");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const quotes = [1, 2, 3].map((n, i) => ({
    icon: ICONS[i],
    label: t(`quote${n}_label`),
    main: t(`quote${n}_main`),
    sub: t(`quote${n}_sub`),
  }));

  return (
    <section className="bg-daime-cream px-6 py-16">
      <div
        ref={ref}
        className={`mx-auto max-w-lg transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-center text-xs font-medium tracking-widest text-daime-green">
          {t("label")}
        </p>

        <h2 className="mt-4 text-center font-serif-jp text-2xl font-medium text-daime-text">
          {t("title")}
        </h2>

        <div className="mt-10 space-y-4">
          {quotes.map((quote) => (
            <div
              key={quote.label}
              className="rounded-xl border-l-4 border-daime-green bg-white p-5"
            >
              <p className="text-xs font-medium tracking-widest text-daime-green">
                {quote.icon} {quote.label}
              </p>
              <p className="mt-3 font-serif-jp text-base font-medium leading-relaxed text-daime-text">
                {quote.main}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-daime-text/70">
                {quote.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

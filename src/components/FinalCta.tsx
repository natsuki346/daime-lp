"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";
import EmailForm from "./EmailForm";

export default function FinalCta() {
  const t = useTranslations("cta");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  return (
    <section className="bg-daime-text px-6 py-16">
      <div
        ref={ref}
        className={`mx-auto flex max-w-lg flex-col items-center text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-3xl">🌼</p>

        <p
          className="mt-4 text-sm tracking-widest lowercase"
          style={{ color: "#C8A860" }}
        >
          {t("tagline")}
        </p>

        <h2 className="mt-4 font-serif-jp text-2xl font-medium text-white">
          {t("title")}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-daime-cream/80">
          {t("desc")}
        </p>

        <div className="mt-8 w-full">
          <EmailForm variant="dark" />
        </div>

        <p className="mt-4 text-xs text-daime-seed/70">{t("note")}</p>
      </div>
    </section>
  );
}

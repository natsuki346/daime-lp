"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function TagsSection() {
  const t = useTranslations("tags");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const daisyTags = t.raw("daisy_examples") as string[];
  const seedTags = t.raw("seed_examples") as string[];

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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#FAF0C8", borderColor: "#E8C96A" }}
          >
            <h3 className="font-serif-jp text-base font-medium text-daime-text">
              {t("daisy_type")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {daisyTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/70 px-3 py-1 text-xs text-daime-text"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-daime-text/80">
              {t("daisy_desc")}
            </p>
          </div>

          <div
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "#EDE0D0", borderColor: "#C4A87E" }}
          >
            <h3 className="font-serif-jp text-base font-medium text-daime-text">
              {t("seed_type")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {seedTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/70 px-3 py-1 text-xs text-daime-text"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-daime-text/80">
              {t("seed_desc")}
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-daime-green p-6 text-center">
          <p className="text-sm leading-relaxed font-medium text-white">
            {t("bridge")}
          </p>
        </div>
      </div>
    </section>
  );
}

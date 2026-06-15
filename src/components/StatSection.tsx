"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";

export default function StatSection() {
  const t = useTranslations("stat");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const factors = [t("factor1"), t("factor2"), t("factor3")];

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

        <p className="mt-6 text-center font-serif-jp text-6xl font-bold text-daime-text">
          {t("number")}
        </p>

        <p className="mt-6 text-center text-sm leading-relaxed text-daime-text/80">
          {t("desc")}
        </p>

        <ul className="mt-8 space-y-3">
          {factors.map((factor) => (
            <li
              key={factor}
              className="flex items-start gap-3 rounded-xl bg-white/60 p-4 text-sm leading-relaxed"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-daime-text/10 text-xs font-bold text-daime-text">
                ×
              </span>
              <span>{factor}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-xl border border-dashed border-daime-soil/40 p-6 text-center">
          <p className="text-sm font-medium leading-relaxed text-daime-text">
            {t("core")}
          </p>
        </div>

        <p className="mt-6 text-center font-serif-jp text-[19px] font-medium text-daime-green">
          {t("transition")}
        </p>
        <p className="mt-2 text-center text-[13px] text-daime-soil">
          {t("flower_word")}
        </p>

        <div className="mt-12">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            aria-hidden="true"
            className="mx-auto"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse
                key={i}
                cx="20"
                cy="9"
                rx="5"
                ry="9"
                fill="#F5D78E"
                stroke="#C8940A"
                strokeWidth="1"
                transform={`rotate(${i * 45} 20 20)`}
              />
            ))}
            <circle
              cx="20"
              cy="20"
              r="6"
              fill="#8B6914"
              stroke="#6B4F14"
              strokeWidth="1.5"
            />
          </svg>

          <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.14em] text-daime-soil">
            {t("origin_label")}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-4 sm:gap-x-4">
            <div className="flex flex-col items-center">
              <span className="font-serif-jp text-[26px] text-[#C8940A]">
                {t("origin_daisy")}
              </span>
              <span className="mt-1 text-[11px] text-[#8B7560]">
                {t("origin_daisy_meaning")}
              </span>
            </div>
            <span className="text-[24px] text-daime-soil">×</span>
            <div className="flex flex-col items-center">
              <span className="font-serif-jp text-[26px] text-daime-green">
                {t("origin_me")}
              </span>
              <span className="mt-1 text-[11px] text-[#8B7560]">
                {t("origin_me_meaning")}
              </span>
            </div>
            <span className="text-[24px] text-daime-soil">=</span>
            <div className="flex flex-col items-center">
              <span className="font-serif-jp text-[26px] text-daime-text">
                {t("origin_daime")}
              </span>
              <span className="mt-1 text-[11px] text-[#8B7560]">
                {t("origin_daime_meaning")}
              </span>
            </div>
          </div>

          <p className="mt-4 text-center font-serif-jp text-base text-daime-green">
            {t("origin_conclusion")}
          </p>
        </div>
      </div>
    </section>
  );
}

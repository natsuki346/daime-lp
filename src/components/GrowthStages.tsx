"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";

const ICONS = ["🌰", "🌿", "🌱", "🌸", "🍎"];

export default function GrowthStages() {
  const t = useTranslations("growth");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const stages = [1, 2, 3, 4, 5].map((n, i) => ({
    icon: ICONS[i],
    title: t(`stage${n}_name`),
    subtitle: t(`stage${n}_title`),
    quote: t(`stage${n}_quote`),
  }));

  return (
    <section className="px-6 py-16">
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

        <div className="mt-12">
          {stages.map((stage, i) => (
            <div key={stage.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-daime-cream text-2xl">
                  {stage.icon}
                </div>
                {i < stages.length - 1 && (
                  <div className="my-1 w-px flex-1 bg-daime-seed" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="pt-2.5 font-serif-jp text-base font-medium text-daime-text">
                  {stage.title}
                </h3>
                <p className="mt-1 text-sm text-daime-soil">
                  {stage.subtitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-daime-text/80">
                  {stage.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

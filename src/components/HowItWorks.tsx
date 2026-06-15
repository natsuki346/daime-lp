"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";

const ICONS = ["🌱", "🤝", "🌸"];

export default function HowItWorks() {
  const t = useTranslations("how");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const steps = [
    { icon: ICONS[0], title: t("step1_title"), body: t("step1_desc") },
    { icon: ICONS[1], title: t("step2_title"), body: t("step2_desc") },
    { icon: ICONS[2], title: t("step3_title"), body: t("step3_desc") },
  ];

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
          {steps.map((step, i) => (
            <div key={step.title} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-daime-cream text-2xl">
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div className="my-1 w-px flex-1 bg-daime-seed" />
                )}
              </div>
              <div className="pb-10">
                <h3 className="pt-2.5 font-serif-jp text-base font-medium text-daime-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-daime-text/80">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

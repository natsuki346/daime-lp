"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";

const WOB: ["wob1", "wob2", "wob3", "wob4"] = ["wob1", "wob2", "wob3", "wob4"];

function splitBracket(text: string): [string, string] {
  const m = text.match(/^(.*?)\s*([（(].+[）)])$/);
  return m ? [m[1], m[2]] : [text, ""];
}

function DaisyIcon() {
  return (
    <svg
      width="36"
      height="36"
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
          fill="#F5D04A"
          transform={`rotate(${i * 45} 20 20)`}
        />
      ))}
      <circle cx="20" cy="20" r="6" fill="#8B6914" />
    </svg>
  );
}

function SeedIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      aria-hidden="true"
      className="mx-auto"
    >
      <ellipse cx="20" cy="23" rx="10" ry="14" fill="#8B6914" />
      <ellipse cx="17" cy="17" rx="4" ry="5.5" fill="#C4A87E" opacity="0.55" />
    </svg>
  );
}

export default function TagsSection() {
  const t = useTranslations("tags");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const daisyTags = [t("daisy_tag1"), t("daisy_tag2"), t("daisy_tag3"), t("daisy_tag4")];
  const seedTags = [t("seed_tag1"), t("seed_tag2"), t("seed_tag3"), t("seed_tag4")];

  const [daisyBase, daisyBracket] = splitBracket(t("daisy_type"));
  const [seedBase, seedBracket] = splitBracket(t("seed_type"));

  return (
    <section className="bg-daime-cream px-6 py-16">
      <div
        ref={ref}
        className={`mx-auto max-w-lg text-center transition-all duration-700 ${
          visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <p className="text-xs font-medium tracking-widest text-daime-green">
          {t("label")}
        </p>

        <h2 className="mt-4 font-serif-jp text-2xl font-medium text-daime-text">
          {t("title")}
        </h2>

        <div className="mt-10 flex flex-col gap-[22px] sm:flex-row">
          {/* Daisy card */}
          <div
            className="float-daisy flex-1 rounded-2xl border p-5 text-center"
            style={{ backgroundColor: "#FAF0C8", borderColor: "#E8C96A" }}
          >
            <DaisyIcon />
            <h3 className="mt-3 font-serif-jp text-base font-medium">
              <span className="text-daime-text">{daisyBase}</span>
              <span style={{ color: "#C8940A" }}>{daisyBracket}</span>
            </h3>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {daisyTags.map((tag, i) => (
                <span
                  key={tag}
                  className={`${WOB[i]} inline-block rounded-full text-[13px]`}
                  style={{
                    backgroundColor: "#F5D78E",
                    color: "#6B4F14",
                    padding: "7px 14px",
                    borderRadius: "20px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-daime-text/80">
              {t("daisy_desc")}
            </p>
          </div>

          {/* Seed card */}
          <div
            className="float-seed flex-1 rounded-2xl border p-5 text-center"
            style={{ backgroundColor: "#EDE0D0", borderColor: "#C4A87E" }}
          >
            <SeedIcon />
            <h3 className="mt-3 font-serif-jp text-base font-medium">
              <span className="text-daime-text">{seedBase}</span>
              <span style={{ color: "#8B6914" }}>{seedBracket}</span>
            </h3>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {seedTags.map((tag, i) => (
                <span
                  key={tag}
                  className={`${WOB[i]} inline-block rounded-full text-[13px]`}
                  style={{
                    backgroundColor: "#D4B896",
                    color: "#5A3E22",
                    padding: "7px 14px",
                    borderRadius: "20px",
                  }}
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

        <div className="float-bridge mt-8 rounded-2xl bg-daime-green p-6 text-center">
          <p className="text-sm font-medium leading-relaxed text-white">
            {t("bridge")}
          </p>
        </div>
      </div>
    </section>
  );
}

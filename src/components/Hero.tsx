"use client";

import { useTranslations } from "next-intl";
import { useFadeIn } from "@/hooks/useFadeIn";
import BloomSvg from "./hero/BloomSvg";
import FireworksCanvas from "./hero/FireworksCanvas";
import FloatingParticles from "./hero/FloatingParticles";
import EmailForm from "./EmailForm";

export default function Hero() {
  const t = useTranslations("hero");
  const { ref, visible } = useFadeIn<HTMLDivElement>();

  const scrollToSignup = () => {
    document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
  };

  const glow = {
    textShadow:
      "0 2px 20px rgba(245,240,232,0.9), 0 0 40px rgba(245,240,232,0.7)",
  };

  return (
    <>
      <section
        className="relative h-screen overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #F5F0E8 0%, #EDE6D6 60%, #E0D4BC 100%)",
        }}
      >
        <BloomSvg />
        <FireworksCanvas />
        <FloatingParticles />

        <div
          className="absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(245,240,232,0.15) 0%, rgba(245,240,232,0.25) 50%, rgba(245,240,232,0.45) 100%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col items-center px-6 text-center">
          <span
            className="hero-fade-in mt-6 rounded-full bg-daime-text px-4 py-1.5 text-xs font-medium tracking-wide text-daime-daisy"
            style={{ "--delay": "0.3s" } as React.CSSProperties}
          >
            {t("badge")}
          </span>

          <div className="flex flex-1 flex-col items-center justify-center">
            <p
              className="hero-fade-up font-serif-jp text-5xl font-bold text-daime-text sm:text-[66px]"
              style={{ ...glow, "--delay": "0.5s" } as React.CSSProperties}
            >
              {t("logo")}
              <span className="text-daime-green">.</span>
            </p>

            <p
              className="hero-fade-in mt-4 text-[15px] font-semibold uppercase tracking-[0.2em]"
              style={
                { ...glow, color: "#6B5410", "--delay": "0.9s" } as React.CSSProperties
              }
            >
              {t("tagline")}
            </p>

            <h1
              className="hero-fade-up mt-6 whitespace-pre-line font-serif-jp text-[28px] leading-[1.4] text-daime-text sm:text-[38px]"
              style={{ ...glow, "--delay": "1.2s" } as React.CSSProperties}
            >
              {`${t("title_line1")}\n${t("title_line2")}`}
            </h1>

            <button
              type="button"
              onClick={scrollToSignup}
              className="hero-fade-up mt-10 rounded-full bg-daime-green px-10 py-4 text-sm font-medium text-daime-bg"
              style={
                {
                  boxShadow: "0 6px 24px rgba(74,124,89,0.4)",
                  "--delay": "1.6s",
                } as React.CSSProperties
              }
            >
              {t("cta")} →
            </button>
          </div>
        </div>
      </section>

      <section id="signup" className="px-6 py-16">
        <div
          ref={ref}
          className={`mx-auto flex max-w-lg flex-col items-center text-center transition-all duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-sm leading-relaxed text-daime-text/80">
            {t("signup_desc")}
          </p>

          <div className="mt-8 w-full">
            <EmailForm />
          </div>

          <p className="mt-4 text-xs text-daime-muted">
            {t("signup_note")}
          </p>
        </div>
      </section>
    </>
  );
}

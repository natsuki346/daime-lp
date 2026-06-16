"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Side = "left" | "right";

const STAGES: { n: number; side: Side }[] = [
  { n: 1, side: "left" },
  { n: 2, side: "right" },
  { n: 3, side: "left" },
  { n: 4, side: "right" },
];

/* --- Small dot icons (one per stage) --- */
function DotIcon({ stage }: { stage: number }) {
  if (stage === 1) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <ellipse cx="10" cy="10" rx="4" ry="6" fill="#8B6914" stroke="#6B4F14" strokeWidth="1" />
      </svg>
    );
  }
  if (stage === 2) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 5 V11" stroke="#7FAE6B" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10 11 C8 13 6 14 5 16 M10 11 C12 13 14 14 15 16" stroke="#8B6914" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (stage === 3) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 16 V8" stroke="#7FAE6B" strokeWidth="1.6" strokeLinecap="round" />
        <ellipse cx="6.5" cy="8" rx="3" ry="1.8" fill="#8BBE76" />
        <ellipse cx="13.5" cy="8" rx="3" ry="1.8" fill="#7FAE6B" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse key={i} cx="11" cy="5.5" rx="2.4" ry="4" fill="#F5D04A" stroke="#C8940A" strokeWidth="0.6" transform={`rotate(${i * 45} 11 11)`} />
      ))}
      <circle cx="11" cy="11" r="3" fill="#8B6914" />
    </svg>
  );
}

/* --- Stage illustrations (plants only) --- */
function Illustration({ stage }: { stage: number }) {
  const common = { className: "h-full w-full", viewBox: "0 0 120 80", "aria-hidden": true as const };

  if (stage === 1) {
    // Sow the seed: soil + seed + light particles falling
    return (
      <svg {...common}>
        <path d="M0 58 Q60 48 120 58 L120 80 L0 80 Z" fill="#C9A86A" opacity="0.35" />
        <g className="bob">
          <ellipse className="pop" cx="60" cy="60" rx="7" ry="10" fill="#8B6914" stroke="#6B4F14" strokeWidth="1.5" />
        </g>
        <circle className="fin" cx="44" cy="20" r="2.6" fill="#F5D78E" />
        <circle className="fin" cx="60" cy="13" r="2.1" fill="#F5D78E" />
        <circle className="fin" cx="76" cy="23" r="2.6" fill="#F5D78E" />
        <circle className="fin" cx="52" cy="33" r="1.7" fill="#F5D78E" />
        <circle className="fin" cx="70" cy="37" r="1.7" fill="#F5D78E" />
      </svg>
    );
  }

  if (stage === 2) {
    // Roots grow: dashed ground, tiny sprout above, roots drawing below
    return (
      <svg {...common}>
        <line x1="12" y1="34" x2="108" y2="34" stroke="#C9A86A" strokeWidth="1.5" strokeDasharray="4 4" />
        <g className="sway">
          <path className="draw" pathLength={1} d="M60 34 L60 19" stroke="#7FAE6B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <ellipse className="pop" cx="54" cy="18" rx="5" ry="3" fill="#8BBE76" />
          <ellipse className="pop" cx="66" cy="18" rx="5" ry="3" fill="#7FAE6B" />
        </g>
        <path className="draw" pathLength={1} d="M60 34 C58 44 50 49 44 59" stroke="#8B6914" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path className="draw" pathLength={1} d="M60 34 C62 46 70 50 76 60" stroke="#8B6914" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path className="draw" pathLength={1} d="M60 34 C60 48 60 58 60 67" stroke="#8B6914" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (stage === 3) {
    // A sprout appears: stem + opening cotyledons, gentle float, light particles
    return (
      <svg {...common}>
        <path d="M0 64 Q60 56 120 64 L120 80 L0 80 Z" fill="#C9A86A" opacity="0.35" />
        <g className="float">
          <path className="draw" pathLength={1} d="M60 64 L60 38" stroke="#7FAE6B" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path className="pop" d="M60 44 C50 41 44 31 41 37 C39 45 50 49 60 46 Z" fill="#8BBE76" />
          <path className="pop" d="M60 44 C70 41 76 31 79 37 C81 45 70 49 60 46 Z" fill="#7FAE6B" />
        </g>
        <circle className="fin" cx="40" cy="20" r="2" fill="#F5D78E" />
        <circle className="fin" cx="80" cy="18" r="2" fill="#F5D78E" />
        <circle className="fin" cx="60" cy="11" r="2.3" fill="#F5D78E" />
      </svg>
    );
  }

  // Stage 4 — It blooms: stem, leaves, daisy (rotating petals), gentle sway, sparkles
  return (
    <svg {...common}>
      <path d="M0 66 Q60 58 120 66 L120 80 L0 80 Z" fill="#C9A86A" opacity="0.35" />
      <g className="sway">
        <path className="draw" pathLength={1} d="M60 66 L60 34" stroke="#5E8C4A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path className="pop" d="M60 52 C50 49 44 41 41 47 C39 54 50 57 60 54 Z" fill="#7FAE6B" />
        <path className="pop" d="M60 58 C70 55 76 47 79 53 C81 60 70 63 60 60 Z" fill="#8BBE76" />
        <g className="spin">
          <g className="pop">
            {Array.from({ length: 8 }).map((_, i) => (
              <ellipse key={i} cx="60" cy="20" rx="4" ry="8" fill="#F5D04A" stroke="#C8940A" strokeWidth="1" transform={`rotate(${i * 45} 60 30)`} />
            ))}
          </g>
        </g>
        <circle className="pop" cx="60" cy="30" r="6" fill="#8B6914" stroke="#6B4F14" strokeWidth="1" />
      </g>
      <circle className="fin" cx="38" cy="22" r="2" fill="#F5D78E" />
      <circle className="fin" cx="84" cy="20" r="2.2" fill="#F5D78E" />
      <circle className="fin" cx="48" cy="10" r="1.8" fill="#F5D78E" />
    </svg>
  );
}

export default function JourneySection() {
  const t = useTranslations("journey");
  const flowRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [shown, setShown] = useState<boolean[]>(() => STAGES.map(() => false));
  const [fillPx, setFillPx] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setShown((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" }
    );

    rowRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Grow the green center line so its tip reaches the latest activated dot.
  useEffect(() => {
    const maxShown = shown.lastIndexOf(true);
    if (maxShown < 0 || !flowRef.current) {
      setFillPx(0);
      return;
    }
    const dot = dotRefs.current[maxShown];
    if (!dot) return;
    const flowTop = flowRef.current.getBoundingClientRect().top;
    const dotRect = dot.getBoundingClientRect();
    setFillPx(dotRect.top + dotRect.height / 2 - flowTop);
  }, [shown]);

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-[720px]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-daime-green">
          {t("label")}
        </p>
        <h2 className="mt-3 text-center font-serif-jp text-[26px] font-medium text-daime-text">
          {t("title")}
        </h2>

        <div ref={flowRef} className="journey-flow mt-14">
          <div className="center-track" aria-hidden="true" />
          <div className="center-fill" style={{ height: `${fillPx}px` }} aria-hidden="true" />

          {STAGES.map((stage, i) => (
            <div
              key={stage.n}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              data-idx={i}
              className={`journey-row ${stage.side} ${shown[i] ? "show" : ""}`}
            >
              <div className="illus-col">
                <div className="illus-box">
                  <Illustration stage={stage.n} />
                </div>
              </div>

              <div className="dot-col">
                <div
                  ref={(el) => {
                    dotRefs.current[i] = el;
                  }}
                  className="journey-dot"
                >
                  <DotIcon stage={stage.n} />
                </div>
              </div>

              <div className="text-col">
                <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-daime-soil">
                  {t(`stage${stage.n}_name`)}
                </p>
                <p className="mt-1 text-[17px] font-medium text-daime-text">
                  {t(`stage${stage.n}_self`)}
                </p>
                <span
                  className="mt-2 inline-block rounded-2xl text-xs"
                  style={{
                    backgroundColor: "#4A7C59",
                    color: "#F5F0E8",
                    padding: "4px 12px",
                  }}
                >
                  {t(`stage${stage.n}_feature`)}
                </span>
                {(() => {
                  const [quote, author] = t(`stage${stage.n}_quote`).split(
                    /\s*[—―]\s*/
                  );
                  return (
                    <>
                      <p className="mt-3 text-[15px] italic leading-relaxed text-daime-text/80">
                        {quote}
                      </p>
                      {author && (
                        <p className="mt-1 text-[13px] text-daime-muted">
                          &mdash; {author}
                        </p>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

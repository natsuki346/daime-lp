"use client";

import { useEffect, useRef } from "react";

const PETAL_COUNT = 12;
const CENTER = { x: 300, y: 220 };

const CENTER_FINAL_R = 45;
const CENTER_DELAY = 2400; // ms
const CENTER_DURATION = 500; // ms

// ease-out-back: gives the center a slight "pop" as it settles at its final size
function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export default function BloomSvg() {
  const svgRef = useRef<SVGSVGElement>(null);
  const centerRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    svgRef.current?.classList.add(reduced ? "bloom-reduced" : "bloom-playing");

    if (reduced) return;

    const circle = centerRef.current;
    if (!circle) return;

    let frameId = 0;
    circle.setAttribute("r", "0");

    const timer = setTimeout(() => {
      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / CENTER_DURATION, 1);
        const r = CENTER_FINAL_R * easeOutBack(progress);
        circle.setAttribute("r", String(Math.max(r, 0)));
        if (progress < 1) {
          frameId = requestAnimationFrame(step);
        } else {
          circle.setAttribute("r", String(CENTER_FINAL_R));
        }
      };
      frameId = requestAnimationFrame(step);
    }, CENTER_DELAY);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 z-0 h-full w-full"
      viewBox="0 0 600 580"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {/* 茎 */}
      <path
        d="M300 540 L300 230"
        stroke="#4A7C59"
        strokeOpacity="0.5"
        strokeWidth="4"
        strokeLinecap="round"
        pathLength="1"
        className="bloom-stem"
      />

      {/* 葉 */}
      <path
        d="M300 400 C258 392 228 360 238 326"
        stroke="#4A7C59"
        strokeOpacity="0.5"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        pathLength="1"
        className="bloom-leaf"
        style={{ "--delay": "0.8s" } as React.CSSProperties}
      />
      <path
        d="M300 340 C342 330 364 298 354 266"
        stroke="#4A7C59"
        strokeOpacity="0.5"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        pathLength="1"
        className="bloom-leaf"
        style={{ "--delay": "1.0s" } as React.CSSProperties}
      />

      {/* 花びら（12枚） */}
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <ellipse
          key={i}
          cx={CENTER.x}
          cy={CENTER.y - 50}
          rx="18"
          ry="38"
          fill="#F5D04A"
          stroke="#C8940A"
          strokeWidth="1.5"
          className="bloom-petal"
          style={
            {
              "--angle": `${i * 30}deg`,
              "--delay": `${1.7 + i * 0.05}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* つぼみ（開花とともに消える） */}
      <ellipse
        cx={CENTER.x}
        cy={CENTER.y}
        rx="22"
        ry="30"
        fill="#C8E0C0"
        className="bloom-bud"
      />

      {/* 花の中心 */}
      <circle
        ref={centerRef}
        cx={CENTER.x}
        cy={CENTER.y}
        r="45"
        fill="#8B6914"
        stroke="#6B4F14"
        strokeWidth="3"
      />
    </svg>
  );
}

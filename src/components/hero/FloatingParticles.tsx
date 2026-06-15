"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 30;
const COLORS = ["#F5D78E", "#4A7C59"];

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  color: string;
  alpha: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let frameId = 0;

    const init = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.clientWidth,
        y: Math.random() * canvas.clientHeight,
        r: 1.5 + Math.random() * 2,
        vy: -(0.08 + Math.random() * 0.22),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: 0.05 + Math.random() * 0.13,
      }));
    };
    init();
    window.addEventListener("resize", init);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.y += p.vy;
        if (p.y < -p.r) {
          p.y = canvas.clientHeight + p.r;
          p.x = Math.random() * canvas.clientWidth;
        }

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] h-full w-full"
      aria-hidden="true"
    />
  );
}

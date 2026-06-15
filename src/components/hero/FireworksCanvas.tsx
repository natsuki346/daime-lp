"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#F5D04A", "#F08070", "#4A7C59", "#F5C800", "#E8A0C0", "#FFFDF5"];
const PARTICLES_PER_BURST = 40;
const BURST_COUNT = 5;
const BURST_INTERVAL = 300;
const START_DELAY = 3300;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

export default function FireworksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let frameId = 0;
    let running = false;

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const spawnBurst = (x: number, y: number) => {
      for (let i = 0; i < PARTICLES_PER_BURST; i++) {
        const angle = (Math.PI * 2 * i) / PARTICLES_PER_BURST;
        const speed = 1.5 + Math.random() * 2.5;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.vy += 0.04;
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.011;

        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      particles = particles.filter((p) => p.life > 0);

      if (particles.length > 0) {
        frameId = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < BURST_COUNT; i++) {
      timers.push(
        setTimeout(() => {
          const x = canvas.clientWidth * (0.2 + Math.random() * 0.6);
          const y = canvas.clientHeight * (0.25 + Math.random() * 0.3);
          spawnBurst(x, y);
          if (!running) {
            running = true;
            frameId = requestAnimationFrame(tick);
          }
        }, START_DELAY + i * BURST_INTERVAL)
      );
    }

    return () => {
      timers.forEach(clearTimeout);
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
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

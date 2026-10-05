"use client";

import React, { useEffect, useRef } from "react";

interface ConfettiProps {
  trigger?: boolean;
}

export function triggerGlobalConfetti(count = 140) {
  if (typeof window === "undefined") return;
  const canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement | null;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const cols = ["#FFCE32", "#23E5DB", "#002F34", "#FF6B6B", "#4ECDC4", "#A78BFA"];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    g: number;
    s: number;
    c: string;
    r: number;
    vr: number;
    l: number;
  }> = [];

  for (let i = 0; i < count; i++) {
    particles.push({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
      y: window.innerHeight * 0.35,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -9 - 3,
      g: 0.32,
      s: Math.random() * 8 + 4,
      c: cols[i % cols.length],
      r: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      l: 1,
    });
  }

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.g;
      p.r += p.vr;
      p.l -= 0.008;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(p.l, 0);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.6);
      ctx.restore();

      if (p.l <= 0 || p.y > canvas.height + 20) {
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(animate);
}

export function ConfettiCanvas() {
  return (
    <canvas
      id="confetti-canvas"
      className="fixed inset-0 pointer-events-none z-[140]"
    />
  );
}

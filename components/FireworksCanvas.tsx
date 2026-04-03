'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  gravity: number;
  decay: number;
  trail: { x: number; y: number }[];
}

const COLORS = [
  '#f59e0b', '#fbbf24', '#f97316', '#ef4444',
  '#10b981', '#3b82f6', '#8b5cf6', '#ec4899',
  '#facc15', '#a3e635', '#22d3ee', '#ffffff',
];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createBurst(canvas: HTMLCanvasElement, cx: number, cy: number): Particle[] {
  const count = Math.floor(randomBetween(60, 100));
  const baseColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  const particles: Particle[] = [];

  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + randomBetween(-0.2, 0.2);
    const speed = randomBetween(2, 9);
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: Math.random() > 0.3 ? baseColor : COLORS[Math.floor(Math.random() * COLORS.length)],
      radius: randomBetween(2, 5),
      gravity: randomBetween(0.05, 0.15),
      decay: randomBetween(0.012, 0.022),
      trail: [],
    });
  }
  return particles;
}

export default function FireworksCanvas({ onDone }: { onDone?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let particles: Particle[] = [];
    let animId: number;
    let burstCount = 0;
    const MAX_BURSTS = 12;

    const scheduleBurst = () => {
      if (burstCount >= MAX_BURSTS) return;
      const cx = randomBetween(canvas.width * 0.15, canvas.width * 0.85);
      const cy = randomBetween(canvas.height * 0.1, canvas.height * 0.55);
      particles.push(...createBurst(canvas, cx, cy));
      burstCount++;
      if (burstCount < MAX_BURSTS) {
        setTimeout(scheduleBurst, randomBetween(200, 500));
      }
    };

    // First burst immediately, then stagger
    scheduleBurst();
    setTimeout(scheduleBurst, 300);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles = particles.filter(p => p.alpha > 0.02);

      for (const p of particles) {
        // Draw trail
        if (p.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);
          for (let i = 1; i < p.trail.length; i++) {
            ctx.lineTo(p.trail[i].x, p.trail[i].y);
          }
          ctx.strokeStyle = p.color + '40';
          ctx.lineWidth = p.radius * 0.5;
          ctx.stroke();
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();

        // Draw glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.alpha * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '20';
        ctx.fill();

        // Update trail (keep last 6 positions)
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        // Physics
        p.vy += p.gravity;
        p.vx *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
        p.radius *= 0.995;
      }

      animId = requestAnimationFrame(draw);

      // Done when all bursts fired and particles exhausted
      if (burstCount >= MAX_BURSTS && particles.length === 0) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        onDone?.();
      }
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
      aria-hidden="true"
    />
  );
}

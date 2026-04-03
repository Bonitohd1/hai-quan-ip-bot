'use client';

import { useEffect, useRef } from 'react';

// Brand palette: Navy, Orange, White + subtle variants
const BRAND_COLORS = [
  '#0a192f', // Navy deep
  '#0d2244', // Navy mid
  '#1a3a6e', // Navy accent
  '#f97316', // Orange primary
  '#fb923c', // Orange light
  '#ea6c00', // Orange dark
  '#ffffff', // White
  '#f1f5f9', // White warm
];

interface Confetto {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  vx: number;
  vy: number;
  alpha: number;
  shape: 'rect' | 'circle' | 'strip';
  swing: number;
  swingSpeed: number;
  swingAmp: number;
}

function createConfetto(canvas: HTMLCanvasElement, fromX?: number): Confetto {
  const shape = Math.random() < 0.6 ? 'rect' : Math.random() < 0.5 ? 'circle' : 'strip';
  return {
    x: fromX ?? Math.random() * canvas.width,
    y: -20,
    w: shape === 'strip' ? randomBetween(2, 5) : randomBetween(8, 16),
    h: shape === 'strip' ? randomBetween(18, 32) : randomBetween(8, 16),
    color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: randomBetween(-0.08, 0.08),
    vx: randomBetween(-1.2, 1.2),
    vy: randomBetween(2.5, 5.5),
    alpha: 1,
    shape,
    swing: 0,
    swingSpeed: randomBetween(0.02, 0.06),
    swingAmp: randomBetween(0.5, 2),
  };
}

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
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

    let confetti: Confetto[] = [];
    let animId: number;
    let spawning = true;
    let spawnCount = 0;
    const MAX_SPAWN = 180;

    // Spawn waves from top-left, center, top-right
    const spawnInterval = setInterval(() => {
      if (!spawning) { clearInterval(spawnInterval); return; }
      const batch = 6;
      for (let i = 0; i < batch; i++) {
        // Spawn from 3 zones
        const zone = Math.random();
        const fromX = zone < 0.33
          ? randomBetween(0, canvas.width * 0.3)
          : zone < 0.66
          ? randomBetween(canvas.width * 0.35, canvas.width * 0.65)
          : randomBetween(canvas.width * 0.7, canvas.width);
        confetti.push(createConfetto(canvas, fromX));
      }
      spawnCount += batch;
      if (spawnCount >= MAX_SPAWN) {
        spawning = false;
        clearInterval(spawnInterval);
      }
    }, 60);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti = confetti.filter(c => c.y < canvas.height + 50 && c.alpha > 0.01);

      for (const c of confetti) {
        ctx.save();
        ctx.globalAlpha = c.alpha;
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);

        ctx.fillStyle = c.color;

        // White pieces get a navy border for visibility
        if (c.color === '#ffffff' || c.color === '#f1f5f9') {
          ctx.strokeStyle = 'rgba(10,25,47,0.25)';
          ctx.lineWidth = 0.5;
        }

        if (c.shape === 'circle') {
          ctx.beginPath();
          ctx.ellipse(0, 0, c.w / 2, c.h / 2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
          if (c.color === '#ffffff' || c.color === '#f1f5f9') {
            ctx.strokeRect(-c.w / 2, -c.h / 2, c.w, c.h);
          }
        }

        ctx.restore();

        // Physics
        c.swing += c.swingSpeed;
        c.x += c.vx + Math.sin(c.swing) * c.swingAmp;
        c.y += c.vy;
        c.rotation += c.rotationSpeed;
        c.vy += 0.04; // gentle gravity

        // Fade as they near bottom
        if (c.y > canvas.height * 0.75) {
          c.alpha -= 0.018;
        }
      }

      animId = requestAnimationFrame(draw);

      if (!spawning && confetti.length === 0) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        onDone?.();
      }
    };

    // Auto stop after 5s
    const stopTimer = setTimeout(() => {
      spawning = false;
      clearInterval(spawnInterval);
      // Gracefully fade remaining
      const fadeInterval = setInterval(() => {
        confetti.forEach(c => { c.alpha -= 0.02; });
        if (confetti.every(c => c.alpha <= 0)) {
          clearInterval(fadeInterval);
          onDone?.();
        }
      }, 30);
    }, 4500);

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(spawnInterval);
      clearTimeout(stopTimer);
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

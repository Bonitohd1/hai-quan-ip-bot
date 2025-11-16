'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function ConfettiEffect() {
  useEffect(() => {
    // Trigger confetti from both sides
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0, 0.3), y: Math.random() - 0.2 },
        colors: ['#1e40af', '#fbbf24', '#ffffff', '#3b82f6', '#eab308']
      });

      // Right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 1), y: Math.random() - 0.2 },
        colors: ['#1e40af', '#fbbf24', '#ffffff', '#3b82f6', '#eab308']
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return null;
}

"use client";

import type React from "react";
import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  vx: number; // horizontal velocity
  vy: number; // vertical velocity
  flickerFreq: number;
  flickerPhase: number;
}

interface ParticleBackgroundProps {
  particleColor?: string;
  particleCount?: number;
  particleRadiusMin?: number;
  particleRadiusMax?: number;
  /** Probability (0–1) that a particle becomes a large dust mote */
  largeParticleChance?: number;
  /** Minimum radius (px) for large particles */
  largeParticleRadiusMin?: number;
  /** Maximum radius (px) for large particles */
  largeParticleRadiusMax?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleColor = "#5A5A5A",
  particleCount = 100,
  particleRadiusMin = 0.5,
  particleRadiusMax = 1.2,
  largeParticleChance = 0.15,
  largeParticleRadiusMin = 2.0,
  largeParticleRadiusMax = 4.0,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);

  const initializeParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const isLarge = Math.random() < largeParticleChance;
        const radius = isLarge
          ? Math.random() * (largeParticleRadiusMax - largeParticleRadiusMin) +
            largeParticleRadiusMin
          : Math.random() * (particleRadiusMax - particleRadiusMin) +
            particleRadiusMin;

        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        // velocities – extremely small to create slow drifting effect
        const vx = (Math.random() - 0.5) * 0.05; // −0.025 → +0.025 px / frame (subtle)
        const vy = Math.random() * 0.06 + 0.02; // 0.02 → 0.08 px / frame (slow drift down)

        // Slightly varying opacity so particles have depth
        const alphaBase = isLarge ? 0.5 : 0.2; // brighter baseline
        const alpha = Math.random() * 0.3 + alphaBase; // 0.5→0.8 large, 0.2→0.5 small

        const flickerFreq = Math.random() * 0.1 + 0.05; // 0.05–0.15 Hz (slow flicker)
        const flickerPhase = Math.random() * Math.PI * 2;

        newParticles.push({
          x,
          y,
          radius,
          color: particleColor,
          alpha,
          vx,
          vy,
          flickerFreq,
          flickerPhase,
        });
      }
      particlesRef.current = newParticles;
    },
    [
      particleCount,
      particleRadiusMin,
      particleRadiusMax,
      largeParticleChance,
      largeParticleRadiusMin,
      largeParticleRadiusMax,
      particleColor,
    ]
  );

  // Helper: convert a hex colour (e.g. "#5a5a5a") to its RGB components
  const hexToRgb = (hex: string) => {
    const sanitized = hex.replace("#", "");
    const bigint = parseInt(sanitized, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

  const { r: baseR, g: baseG, b: baseB } = hexToRgb(particleColor);

  // Small constant wind pushing particles to the right (CSS px per frame)
  const WIND_X = 0.02;

  const drawParticles = useCallback(
    (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const timeSec = performance.now() * 0.001;

      // virtual light source roughly upper-centre
      const lightX = canvas.width / 2;
      const lightY = canvas.height * 0.25;
      const lightRadius = Math.min(canvas.width, canvas.height) * 0.7;

      ctx.save();
      ctx.globalCompositeOperation = "lighter";

      particlesRef.current.forEach((p) => {
        // Update position with a tiny random wobble each frame
        p.vx += (Math.random() - 0.5) * 0.005; // subtler jitter
        p.vy += (Math.random() - 0.5) * 0.005;

        // Clamp velocities to keep movement subtle
        p.vx = Math.max(-0.05, Math.min(0.05, p.vx));
        p.vy = Math.max(0.005, Math.min(0.07, p.vy));

        p.x += p.vx + WIND_X; // add subtle wind drift
        p.y += p.vy;

        // Wrap around edges to create endless flow
        if (p.x - p.radius > canvas.width) p.x = -p.radius;
        if (p.x + p.radius < 0) p.x = canvas.width + p.radius;
        if (p.y - p.radius > canvas.height) {
          p.y = -p.radius;
          p.x = Math.random() * canvas.width;
        }

        // Flicker + light attenuation
        const flicker = 0.9 + 0.1 * Math.sin(timeSec * p.flickerFreq * 2 * Math.PI + p.flickerPhase);
        const dx = p.x - lightX;
        const dy = p.y - lightY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let lightFactor = Math.max(0, 1 - dist / lightRadius);
        lightFactor = lightFactor * lightFactor; // fall-off squared

        const effectiveAlpha = Math.min(
          1,
          p.alpha * flicker * (0.6 + 0.5 * lightFactor)
        );

        // Draw with a soft radial gradient reflecting effectiveAlpha
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(${baseR}, ${baseG}, ${baseB}, ${effectiveAlpha})`);
        gradient.addColorStop(1, `rgba(${baseR}, ${baseG}, ${baseB}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();
      });

      ctx.restore();
    },
    [baseR, baseG, baseB]
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawParticles(ctx, canvas);
    animationFrameIdRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasDimensions = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      initializeParticles(canvas);
    };

    setCanvasDimensions();
    animationFrameIdRef.current = requestAnimationFrame(animate);
    window.addEventListener("resize", setCanvasDimensions);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener("resize", setCanvasDimensions);
    };
  }, [initializeParticles, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute top-0 left-0 w-full h-full -z-30 ${className}`}
    />
  );
};

export default ParticleBackground;

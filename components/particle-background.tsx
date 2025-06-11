"use client";

import type React from "react";
import { useRef, useEffect, useCallback } from "react";

interface Particle {
  x: number;
  initialY: number;
  radius: number;
  color: string;
  amplitude: number;
  speed: number;
  phase: number;
}

interface ParticleBackgroundProps {
  particleColor?: string;
  particleCount?: number;
  particleRadiusMin?: number;
  particleRadiusMax?: number;
  oscillationAmplitudeMin?: number;
  oscillationAmplitudeMax?: number;
  oscillationSpeedMin?: number;
  oscillationSpeedMax?: number;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleColor = "#5A5A5A",
  particleCount = 100,
  particleRadiusMin = 0.5,
  particleRadiusMax = 1.2,
  oscillationAmplitudeMin = 20,
  oscillationAmplitudeMax = 50,
  oscillationSpeedMin = 0.3,
  oscillationSpeedMax = 0.7,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  const initializeParticles = useCallback(
    (canvas: HTMLCanvasElement) => {
      const newParticles: Particle[] = [];
      startTimeRef.current = Date.now();
      for (let i = 0; i < particleCount; i++) {
        const radius =
          Math.random() * (particleRadiusMax - particleRadiusMin) +
          particleRadiusMin;
        const x = Math.random() * canvas.width;
        const initialY = Math.random() * canvas.height;
        const amplitude =
          Math.random() * (oscillationAmplitudeMax - oscillationAmplitudeMin) +
          oscillationAmplitudeMin;
        const speed =
          Math.random() * (oscillationSpeedMax - oscillationSpeedMin) +
          oscillationSpeedMin;
        const phase = Math.random() * Math.PI * 2;

        newParticles.push({
          x,
          initialY,
          radius,
          color: particleColor,
          amplitude,
          speed,
          phase,
        });
      }
      particlesRef.current = newParticles;
    },
    [
      particleCount,
      particleRadiusMin,
      particleRadiusMax,
      particleColor,
      oscillationAmplitudeMin,
      oscillationAmplitudeMax,
      oscillationSpeedMin,
      oscillationSpeedMax,
    ]
  );

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;

    particlesRef.current.forEach((particle) => {
      const offsetY =
        particle.amplitude *
        Math.sin(elapsedTime * particle.speed + particle.phase);
      const currentY = particle.initialY + offsetY;

      ctx.beginPath();
      ctx.arc(particle.x, currentY, particle.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawParticles(ctx);
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

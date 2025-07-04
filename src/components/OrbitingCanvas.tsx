// components/OrbitingCanvas.tsx
import React, { useEffect, useRef } from "react";

const OrbitingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const centerX = () => w / 2;
    const centerY = () => h / 2;

    const bigDots = Array.from({ length: 20 }, (_, i) => ({
      radius: 4,
      distance: 70 + i * 40,
      angle: Math.random() * Math.PI * 2,
      speed: 0.0005 + i * 0.00005,
      color: "#fff",
    }));

    const redDots = Array.from({ length: 40 }, (_, i) => ({
      radius: 2.5,
      distance: 150 + i * 35,
      angle: Math.random() * Math.PI * 2,
      speed: 0.0007 + i * 0.00005,
      color: "#ff3b3b",
    }));

    const smallDots = Array.from({ length: 400 }, (_, i) => ({
      radius: 1,
      parentIndex: i % redDots.length,
      distance: 20 + Math.random() * 30,
      angle: Math.random() * Math.PI * 2,
      speed: 0.001 + Math.random() * 0.001,
      color: "#ffffff",
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const cx = centerX();
      const cy = centerY();

      ctx.beginPath();
      ctx.arc(cx, cy, 50, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      ctx.shadowColor = "rgba(255, 255, 255, 0.3)";
      ctx.shadowBlur = 30;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Accretion glow ring
      ctx.beginPath();
      ctx.arc(cx, cy, 40, 0, Math.PI * 2);
      const gradient = ctx.createRadialGradient(cx, cy, 5, cx, cy, 14);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fill();

      // Black core
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = "#000000";
      ctx.fill();

      for (const dot of bigDots) {
        dot.angle += dot.speed;
        const x = centerX() + dot.distance * Math.cos(dot.angle);
        const y = centerY() + dot.distance * Math.sin(dot.angle);
        ctx.beginPath();
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      for (const dot of redDots) {
        dot.angle += dot.speed;
        const x = centerX() + dot.distance * Math.cos(dot.angle);
        const y = centerY() + dot.distance * Math.sin(dot.angle);
        ctx.beginPath();
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      for (const dot of smallDots) {
        const red = redDots[dot.parentIndex];

        // Update the red dot's position (center of this mini solar system)
        const redX = centerX() + red.distance * Math.cos(red.angle);
        const redY = centerY() + red.distance * Math.sin(red.angle);

        // Advance the small dot's angle to simulate orbit
        dot.angle += dot.speed;

        // Position the white dot relative to its red dot
        const x = redX + dot.distance * Math.cos(dot.angle);
        const y = redY + dot.distance * Math.sin(dot.angle);

        // Draw the white orbiting dot (planet)
        ctx.beginPath();
        ctx.arc(x, y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      }

      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
    />
  );
};

export default OrbitingCanvas;

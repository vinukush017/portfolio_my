// components/GalaxyBackground.tsx
import React, { useEffect, useRef } from "react";

const GalaxyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Array<{
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      twinkle: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create stars
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        opacity: Math.random() * 0.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      const isDark = document.documentElement.classList.contains("dark");
      
      // Clear with fade effect - much lighter in light mode
      ctx.fillStyle = isDark 
        ? "rgba(0, 0, 0, 0.05)" 
        : "rgba(255, 255, 255, 0.01)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient orbs (galaxy-like) - much more subtle in light mode
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Large gradient orb 1
      const gradient1 = ctx.createRadialGradient(
        centerX - 200,
        centerY - 150,
        0,
        centerX - 200,
        centerY - 150,
        400
      );
      gradient1.addColorStop(0, isDark ? "rgba(99, 102, 241, 0.15)" : "rgba(99, 102, 241, 0.03)");
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Large gradient orb 2
      const gradient2 = ctx.createRadialGradient(
        centerX + 300,
        centerY + 200,
        0,
        centerX + 300,
        centerY + 200,
        500
      );
      gradient2.addColorStop(0, isDark ? "rgba(147, 51, 234, 0.12)" : "rgba(147, 51, 234, 0.025)");
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Large gradient orb 3
      const gradient3 = ctx.createRadialGradient(
        centerX,
        centerY + 300,
        0,
        centerX,
        centerY + 300,
        450
      );
      gradient3.addColorStop(0, isDark ? "rgba(236, 72, 153, 0.1)" : "rgba(236, 72, 153, 0.02)");
      gradient3.addColorStop(1, "transparent");
      ctx.fillStyle = gradient3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars removed - only gradient orbs remain

      animationFrameId = requestAnimationFrame(draw);
    };

    draw(0);

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen max-w-full max-h-screen overflow-hidden z-0 pointer-events-none"
    />
  );
};

export default GalaxyBackground;

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
      
      // Reduce stars on mobile for better performance
      const isMobile = window.innerWidth < 768;
      const starCount = isMobile ? 40 : 80;
      
      // Create stars
      stars = Array.from({ length: starCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * (isMobile ? 1 : 1.5) + 0.5,
        vx: (Math.random() - 0.5) * (isMobile ? 0.05 : 0.1),
        vy: (Math.random() - 0.5) * (isMobile ? 0.05 : 0.1),
        opacity: Math.random() * 0.5 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    let lastTime = 0;
    const targetFPS = window.innerWidth < 768 ? 30 : 60; // Lower FPS on mobile
    const frameInterval = 1000 / targetFPS;

    const draw = (time: number) => {
      const isDark = document.documentElement.classList.contains("dark");
      const isMobile = canvas.width < 768;
      
      // Throttle on mobile for better performance
      if (isMobile && time - lastTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastTime = time;
      
      // Clear with fade effect - much lighter in light mode
      ctx.fillStyle = isDark 
        ? (isMobile ? "rgba(0, 0, 0, 0.03)" : "rgba(0, 0, 0, 0.05)")
        : (isMobile ? "rgba(255, 255, 255, 0.005)" : "rgba(255, 255, 255, 0.01)");
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw gradient orbs (galaxy-like) - Responsive and subtle
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Responsive orb sizes
      const orb1Size = isMobile ? 200 : 400;
      const orb2Size = isMobile ? 250 : 500;
      const orb3Size = isMobile ? 220 : 450;
      
      // Large gradient orb 1 - More subtle on mobile
      const gradient1 = ctx.createRadialGradient(
        centerX - (isMobile ? 100 : 200),
        centerY - (isMobile ? 75 : 150),
        0,
        centerX - (isMobile ? 100 : 200),
        centerY - (isMobile ? 75 : 150),
        orb1Size
      );
      gradient1.addColorStop(0, isDark 
        ? (isMobile ? "rgba(99, 102, 241, 0.08)" : "rgba(99, 102, 241, 0.12)")
        : (isMobile ? "rgba(99, 102, 241, 0.015)" : "rgba(99, 102, 241, 0.03)"));
      gradient1.addColorStop(1, "transparent");
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Large gradient orb 2
      const gradient2 = ctx.createRadialGradient(
        centerX + (isMobile ? 150 : 300),
        centerY + (isMobile ? 100 : 200),
        0,
        centerX + (isMobile ? 150 : 300),
        centerY + (isMobile ? 100 : 200),
        orb2Size
      );
      gradient2.addColorStop(0, isDark 
        ? (isMobile ? "rgba(147, 51, 234, 0.06)" : "rgba(147, 51, 234, 0.10)")
        : (isMobile ? "rgba(147, 51, 234, 0.012)" : "rgba(147, 51, 234, 0.025)"));
      gradient2.addColorStop(1, "transparent");
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Large gradient orb 3
      const gradient3 = ctx.createRadialGradient(
        centerX,
        centerY + (isMobile ? 150 : 300),
        0,
        centerX,
        centerY + (isMobile ? 150 : 300),
        orb3Size
      );
      gradient3.addColorStop(0, isDark 
        ? (isMobile ? "rgba(236, 72, 153, 0.05)" : "rgba(236, 72, 153, 0.08)")
        : (isMobile ? "rgba(236, 72, 153, 0.01)" : "rgba(236, 72, 153, 0.02)"));
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
      className="fixed inset-0 w-full h-full max-w-full max-h-full overflow-hidden z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh', maxWidth: '100vw' }}
    />
  );
};

export default GalaxyBackground;

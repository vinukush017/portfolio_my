// components/StarfieldCanvas.tsx
import React, { useRef, useEffect } from "react";

const StarfieldCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let stars: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 700 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.2,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.0005 + 0.0001,
        twinkle: Math.random() * 10000,
        color: ["#fff", "#add8e6", "#ffe4b5", "#ffcccc"][
          Math.floor(Math.random() * 4)
        ],
        isFalling: false,
        vx: 0,
        vy: 0,
        life: 0,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const centerX = () => window.innerWidth / 2;
    const centerY = () => window.innerHeight / 2;

    const draw = (time: number) => {
      const isDark = document.documentElement.classList.contains("dark");
      ctx.fillStyle = isDark ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 3; i++) {
        if (Math.random() < 0.01) {
          const star = stars[Math.floor(Math.random() * stars.length)];
          if (!star.isFalling) {
            star.isFalling = true;
            const isBig = Math.random() < 0.4; // 30% chance of being a big star
            const speed = Math.random() * 5 + 2;
            const angle = Math.random() * Math.PI * 2;
            star.vx = Math.cos(angle) * speed;
            star.vy = Math.sin(angle) * speed;
            star.life = isBig ? 150 : 100;
            star.radius = isBig ? 2.5 + Math.random() * 2 : 1 + Math.random(); // Bigger stars
          }
        }
      }

      for (const star of stars) {
        if (star.isFalling) {
          star.x += star.vx;
          star.y += star.vy;
          star.life -= 1;

          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            star.x,
            star.y,
            star.x - star.vx * 5,
            star.y - star.vy * 5
          );
          gradient.addColorStop(0, star.color);
          gradient.addColorStop(1, "transparent");

          ctx.strokeStyle = gradient;
          ctx.lineWidth = star.radius;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x - star.vx * 5, star.y - star.vy * 5);
          ctx.stroke();

          if (
            star.life <= 0 ||
            star.x > canvas.width ||
            star.y > canvas.height
          ) {
            // Reset to original star
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.angle = Math.random() * Math.PI * 2;
            star.isFalling = false;
            star.radius = Math.random() * 1.4 + 0.2;
          }
        } else {
          const dist = Math.hypot(star.x - centerX(), star.y - centerY());
          star.angle += star.speed;
          const x = centerX() + dist * Math.cos(star.angle);
          const y = centerY() + dist * Math.sin(star.angle);
          const alpha = 0.5 + 0.5 * Math.sin(time * 0.002 + star.twinkle);

          ctx.beginPath();
          ctx.arc(x, y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
};

export default StarfieldCanvas;

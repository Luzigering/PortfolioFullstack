import React, { useEffect, useRef } from 'react';


const StarryBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    type Star = { x: number; y: number; radius: number; twinkleSpeed: number; phase: number };
    let stars: Star[] = [];
    const numStars = 200;

    function createStar(): Star {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.5 + Math.random() * 1.5,
        twinkleSpeed: 0.02 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      };
    }

    function initStars() {
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push(createStar());
      }
    }

    initStars();

    function animate() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.phase += star.twinkleSpeed;
        const alpha = 0.5 + Math.sin(star.phase) * 0.5;
        const r = star.radius * (0.75 + 0.25 * Math.sin(star.phase));
        ctx.beginPath();
        ctx.arc(star.x, star.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="starry-background galaxy-3d"></canvas>;
};

export default StarryBackground;

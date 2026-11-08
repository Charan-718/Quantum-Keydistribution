// File: src/components/landing/QuantumWarpCanvas.jsx
import React, { useEffect, useRef } from 'react';

/**
 * QuantumWarpCanvas
 * Dynamic HTML5 Canvas particle lattice following the triangular quantum principle.
 * Uses the midnight sapphire & metallic silver / vibrant cobalt blue color palette.
 * As the user scrolls and zoomProgress increases, particles accelerate toward the camera,
 * producing a cinematic warp / fly-through effect into the 3D model.
 */
export default function QuantumWarpCanvas({ zoomProgress = 0, themeMode = 'dark' }) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof canvas.getContext !== 'function') return;

    let ctx;
    try {
      ctx = canvas.getContext('2d');
    } catch (e) {
      return; // Safe bail-out in headless environments without 2D context
    }
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize quantum photon particles in 3D coordinate space
    const PARTICLE_COUNT = 140;
    const particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 1000 + 10,
        origZ: Math.random() * 1000 + 10,
        radius: Math.random() * 2.2 + 0.8,
        colorType: Math.random() > 0.4 ? 'gold' : 'cyan', // Metallic gold or electric cyan
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      });
    }

    let lastTime = performance.now();

    const render = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const fov = 350;

      // Ambient calm lattice drift (removed warp zoom-in per user instruction)
      const speed = 40 * dt;

      // Color palette: Metallic Silver & Intense Vibrant Cobalt Blue
      const isLight = themeMode === 'light';
      const primaryColor = isLight ? 'rgba(0, 42, 255,' : 'rgba(255, 255, 255,'; // Vibrant cobalt blue in light mode, Metallic silver in dark
      const accentColor = isLight ? 'rgba(2, 132, 199,' : 'rgba(0, 42, 255,';   // Electric cyan or vibrant blue
      const lineColor = isLight ? 'rgba(100, 116, 139,' : 'rgba(148, 163, 184,';  // Polished silver-slate coordinate links

      // Fade canvas out when reaching cards section so cards are crystal clear
      const globalCanvasAlpha = zoomProgress >= 0.32 ? Math.max(0, 1 - (zoomProgress - 0.32) / 0.12) : 1;
      if (globalCanvasAlpha <= 0) return;
      ctx.globalAlpha = globalCanvasAlpha;

      const projected = [];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.z -= speed;
        if (p.z <= 2) {
          p.z = 1000;
          p.x = (Math.random() - 0.5) * width * 1.5;
          p.y = (Math.random() - 0.5) * height * 1.5;
        }

        p.pulse += p.pulseSpeed;

        // Clamp scale to prevent particles from bloating into large blobs
        const rawScale = fov / p.z;
        const scale = Math.min(1.6, Math.max(0.4, rawScale));
        const sx = cx + p.x * rawScale;
        const sy = cy + p.y * rawScale;

        const alpha = Math.min(1, Math.max(0.1, (1000 - p.z) / 800));

        projected.push({
          sx,
          sy,
          scale,
          alpha,
          colorType: p.colorType,
          radius: p.radius * (0.8 + 0.3 * Math.sin(p.pulse)),
          z: p.z,
        });
      }

      // Draw triangular connection lines (Triangular Principle in Quantum Lattice)
      ctx.lineWidth = 0.5;
      const maxDist = 90;

      for (let i = 0; i < projected.length; i += 2) {
        const p1 = projected[i];
        if (p1.z > 850) continue;

        let triangleCount = 0;
        for (let j = i + 1; j < projected.length; j += 2) {
          const p2 = projected[j];
          const dx = p1.sx - p2.sx;
          const dy = p1.sy - p2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            // Find third point to form a triangle
            for (let k = j + 1; k < Math.min(projected.length, j + 8); k++) {
              const p3 = projected[k];
              const d2 = Math.hypot(p2.sx - p3.sx, p2.sy - p3.sy);
              const d3 = Math.hypot(p1.sx - p3.sx, p1.sy - p3.sy);

              if (d2 < maxDist && d3 < maxDist) {
                const triAlpha = Math.min(p1.alpha, p2.alpha, p3.alpha) * 0.12;
                ctx.fillStyle = `${lineColor} ${triAlpha * 0.35})`;
                ctx.strokeStyle = `${lineColor} ${triAlpha})`;
                ctx.beginPath();
                ctx.moveTo(p1.sx, p1.sy);
                ctx.lineTo(p2.sx, p2.sy);
                ctx.lineTo(p3.sx, p3.sy);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                triangleCount++;
                if (triangleCount >= 2) break;
              }
            }
          }
        }
      }

      // Draw particles (photons)
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.sx < -50 || p.sx > width + 50 || p.sy < -50 || p.sy > height + 50) continue;

        const isPrimary = p.colorType === 'gold';
        const baseColor = isPrimary ? primaryColor : accentColor;
        const currentRadius = p.radius * Math.max(0.6, p.scale);

        // Core particle
        ctx.fillStyle = `${baseColor} ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, currentRadius, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glowing halo for nearest particles
        if (p.z < 400) {
          const haloAlpha = p.alpha * 0.25;
          ctx.fillStyle = `${baseColor} ${haloAlpha})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, currentRadius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [zoomProgress, themeMode]);

  return (
    <canvas
      ref={canvasRef}
      className="quantum-warp-canvas"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}

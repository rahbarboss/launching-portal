import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../utils/audio';

interface ConfettiCelebrationProps {
  active: boolean;
  onFinished?: () => void;
}

export const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({
  active,
  onFinished,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flash, setFlash] = useState(false);
  const [transitionComplete, setTransitionComplete] = useState(false);

  useEffect(() => {
    if (!active) return;

    // 1. Play sound
    soundEngine.playConfettiCannon();

    // 2. Bright white/golden cinematic flash
    setFlash(true);
    const flashTimer = setTimeout(() => setFlash(false), 600);

    // 3. Multi-origin Canvas Confetti bursts
    const count = 350;
    const colors = ['#ffd700', '#d4af37', '#ffffff', '#10b981', '#f59e0b', '#fef08a'];

    // Center burst
    confetti({
      particleCount: count,
      spread: 120,
      origin: { y: 0.55, x: 0.5 },
      colors,
      shapes: ['circle', 'square'],
      scalar: 1.2,
      gravity: 0.85,
      ticks: 350,
    });

    // Left cannon burst
    const leftTimeout = setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 60,
        spread: 75,
        origin: { x: 0.05, y: 0.7 },
        colors,
        gravity: 0.8,
        ticks: 300,
      });
    }, 250);

    // Right cannon burst
    const rightTimeout = setTimeout(() => {
      confetti({
        particleCount: 150,
        angle: 120,
        spread: 75,
        origin: { x: 0.95, y: 0.7 },
        colors,
        gravity: 0.8,
        ticks: 300,
      });
    }, 450);

    // Continuous top cascade for 2.5 seconds
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 90,
        spread: 140,
        origin: { x: Math.random(), y: -0.1 },
        colors,
        gravity: 0.6,
        drift: Math.random() * 0.4 - 0.2,
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    // 4. Custom canvas for Islamic 8-point stars & golden diamond flakes
    const canvas = canvasRef.current;
    let animId: number;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        type Particle = {
          x: number;
          y: number;
          size: number;
          color: string;
          vx: number;
          vy: number;
          rotation: number;
          vRot: number;
          shape: 'star8' | 'diamond' | 'ribbon';
          alpha: number;
        };

        const customParticles: Particle[] = [];
        const starColors = ['#ffd066', '#ffffff', '#e5c158', '#34d399', '#fcd34d'];

        for (let i = 0; i < 90; i++) {
          customParticles.push({
            x: window.innerWidth * 0.5 + (Math.random() - 0.5) * 200,
            y: window.innerHeight * 0.5 + (Math.random() - 0.5) * 100,
            size: Math.random() * 12 + 8,
            color: starColors[Math.floor(Math.random() * starColors.length)],
            vx: (Math.random() - 0.5) * 18,
            vy: -Math.random() * 14 - 6,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.2,
            shape: i % 3 === 0 ? 'star8' : i % 3 === 1 ? 'diamond' : 'ribbon',
            alpha: 1,
          });
        }

        const drawStar8 = (cx: number, cy: number, r: number, rot: number, color: string) => {
          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(rot);
          ctx.fillStyle = color;
          ctx.beginPath();
          for (let s = 0; s < 8; s++) {
            const angle = (s * Math.PI) / 4;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            const inAngle = angle + Math.PI / 8;
            const ix = Math.cos(inAngle) * (r * 0.45);
            const iy = Math.sin(inAngle) * (r * 0.45);
            if (s === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            ctx.lineTo(ix, iy);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        };

        const drawLoop = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          let alive = false;
          customParticles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.35; // gravity
            p.vx *= 0.98; // air drag
            p.rotation += p.vRot;

            if (p.y < canvas.height + 50) {
              alive = true;
              ctx.globalAlpha = p.alpha;
              if (p.shape === 'star8') {
                drawStar8(p.x, p.y, p.size, p.rotation, p.color);
              } else if (p.shape === 'diamond') {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.moveTo(0, -p.size);
                ctx.lineTo(p.size * 0.6, 0);
                ctx.lineTo(0, p.size);
                ctx.lineTo(-p.size * 0.6, 0);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
              } else {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.size * 0.8, -p.size * 0.2, p.size * 1.6, p.size * 0.4);
                ctx.restore();
              }
            }
          });

          if (alive) {
            animId = requestAnimationFrame(drawLoop);
          }
        };

        animId = requestAnimationFrame(drawLoop);
      }
    }

    // 5. Cinematic transition: After confetti celebration (approx 1.5 - 2s),
    // open the target URL in a NEW BROWSER TAB!
    const targetTimer = setTimeout(() => {
      setTransitionComplete(true);
      window.open('https://anjumanehuda.vercel.app', '_blank', 'noopener,noreferrer');
      if (onFinished) {
        onFinished();
      }
    }, 1800);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(leftTimeout);
      clearTimeout(rightTimeout);
      clearTimeout(targetTimer);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [active, onFinished]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {/* Canvas for custom Islamic geometric confetti */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Cinematic White / Golden Flash */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-out pointer-events-none ${
          flash ? 'bg-amber-100 opacity-80' : 'opacity-0'
        }`}
      />

      {/* Post-transition celebratory message & replay options */}
      {transitionComplete && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pointer-events-auto bg-neutral-950/70 backdrop-blur-md animate-fade-in">
          <div className="max-w-md p-8 rounded-3xl border border-amber-400/30 bg-neutral-900/90 shadow-2xl flex flex-col items-center">
            <div className="w-14 h-14 rounded-full border border-amber-400/50 bg-amber-500/10 flex items-center justify-center text-amber-300 text-2xl mb-4">
              ✦
            </div>
            <h2 className="font-cinzel text-2xl font-bold text-amber-200 mb-2">
              ANJUMAN-E-HUDA
            </h2>
            <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
              Official portal launched in a new tab.
              If the new tab was blocked by your browser, you can open it directly below:
            </p>
            <div className="flex flex-col gap-3 w-full">
              <a
                href="https://anjumanehuda.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-cinzel font-semibold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 hover:brightness-110 shadow-lg text-center"
              >
                OPEN PORTAL (NEW TAB)
              </a>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-amber-200/70 hover:text-amber-100 hover:bg-neutral-800 transition-colors"
              >
                ↺ Replay Launch Experience
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

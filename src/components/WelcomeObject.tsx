import React from 'react';

interface WelcomeObjectProps {
  revealedCount: number; // 0 to 7 (how many letters are revealed)
  opacity?: number; // 0 to 1 (for smooth disappearing transition)
}

const LETTERS = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];

export const WelcomeObject: React.FC<WelcomeObjectProps> = ({
  revealedCount,
  opacity = 1,
}) => {
  // CRITICAL: Absolutely nothing is rendered or visible until cloth is full side (revealedCount > 0)
  if (revealedCount === 0 || opacity <= 0.01) return null;

  return (
    <div
      className="fixed inset-0 z-25 pointer-events-none select-none flex flex-col items-center justify-center transition-all duration-1000 ease-in-out px-4"
      style={{
        opacity: opacity,
        transform: `scale(${opacity < 1 ? 1.03 : 1})`,
      }}
    >
      {/* Centered Ambient Radial Glow (Only active when revealed) */}
      <div
        className="absolute w-72 sm:w-96 md:w-[32rem] h-32 sm:h-40 rounded-full bg-amber-500/15 blur-3xl pointer-events-none transition-opacity duration-700"
        style={{
          opacity: opacity * 0.9,
        }}
      />

      {/* Main Container - Appears ONLY after opening cloth is full side */}
      <div className="relative flex flex-col items-center justify-center px-6 sm:px-10 py-5 sm:py-7 rounded-3xl border border-amber-400/25 bg-neutral-950/45 backdrop-blur-[4px] shadow-[0_15px_45px_rgba(0,0,0,0.6)] animate-fade-in-quick">
        {/* Subtle Top Arch Highlight */}
        <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

        {/* Main Letters Row in Clean, Moderately Sized Serif Display */}
        <div className="relative flex items-center justify-center gap-1.5 sm:gap-2.5 md:gap-4 font-cinzel font-black tracking-widest text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          {LETTERS.map((letter, idx) => {
            const isRevealed = idx < revealedCount;
            const isLatest = idx === revealedCount - 1;

            return (
              <div
                key={idx}
                className={`relative inline-block transition-all duration-300 ${
                  isRevealed ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
                } ${isLatest ? 'animate-letter-pop' : ''}`}
              >
                {/* 3D Extrusion Shadow Layer */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 text-amber-950/90 translate-x-[2.5px] translate-y-[4.5px] blur-[1px]"
                  style={{
                    textShadow: '0 4px 15px rgba(0,0,0,0.95), 0 8px 25px rgba(0,0,0,0.85)',
                  }}
                >
                  {letter}
                </span>

                {/* Beveled Edge Rim */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 text-amber-600/60 translate-x-[1.2px] translate-y-[2px]"
                >
                  {letter}
                </span>

                {/* Primary Face: Metallic Gold Gradient */}
                <span
                  className="relative z-10 block gold-text-gradient drop-shadow-[0_2px_12px_rgba(255,215,0,0.45)]"
                  style={{
                    filter: isLatest
                      ? 'drop-shadow(0 0 20px rgba(255,230,120,0.85))'
                      : 'drop-shadow(0 0 10px rgba(255,200,80,0.3))',
                  }}
                >
                  {letter}
                </span>

                {/* Flash Pop Highlight */}
                {isLatest && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 text-white opacity-60 animate-ping pointer-events-none"
                  >
                    {letter}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Subtle Royal Underline Accent */}
        <div
          className="mt-3 sm:mt-4 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent transition-all duration-700 ease-out"
          style={{
            width: `${(revealedCount / LETTERS.length) * 85}%`,
            maxWidth: '380px',
            opacity: opacity * 0.8,
          }}
        />
      </div>

      <style>{`
        @keyframes fadeInQuick {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-quick {
          animation: fadeInQuick 0.4s ease-out forwards;
        }

        @keyframes letterPop {
          0% {
            transform: scale(1.3) translateY(-14px);
            opacity: 0;
            filter: brightness(1.8);
          }
          65% {
            transform: scale(0.95) translateY(2px);
            opacity: 1;
            filter: brightness(1.2);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
            filter: brightness(1);
          }
        }
        .animate-letter-pop {
          animation: letterPop 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};

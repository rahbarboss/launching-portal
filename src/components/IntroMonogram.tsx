import React from 'react';

interface IntroMonogramProps {
  visible: boolean;
}

export const IntroMonogram: React.FC<IntroMonogramProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center animate-monogram-fade">
      <div className="flex flex-col items-center gap-2">
        {/* Subtle geometric emblem */}
        <div className="w-10 h-10 border border-amber-300/40 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 rotate-45 border border-amber-300/60" />
        </div>

        {/* ANJUMAN-E-HUDA */}
        <span className="font-cinzel text-xs sm:text-sm md:text-base font-semibold tracking-[0.35em] text-amber-100/90 text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          ANJUMAN-E-HUDA
        </span>
      </div>

      <style>{`
        @keyframes monogramFade {
          0% { opacity: 0; transform: scale(0.95); }
          25% { opacity: 1; transform: scale(1); }
          75% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.02); }
        }
        .animate-monogram-fade {
          animation: monogramFade 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

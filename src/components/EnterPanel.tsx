import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';

interface EnterPanelProps {
  visible: boolean;
  onEnterClick: () => void;
  isClicked: boolean;
}

export const EnterPanel: React.FC<EnterPanelProps> = ({
  visible,
  onEnterClick,
  isClicked,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (isClicked) return;
    soundEngine.playButtonClick();
    onEnterClick();
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playButtonHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center px-4">
      {/* Positioned in the absolute CENTER of the screen */}
      <div
        className="pointer-events-auto w-full max-w-sm sm:max-w-md md:max-w-lg animate-column-descend"
        style={{
          transformOrigin: 'top center',
        }}
      >
        {/* The Regal Animated Center Column / Card */}
        <div className="relative w-full rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-amber-400/40 bg-neutral-950/90 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] flex flex-col items-center text-center overflow-hidden">
          {/* Islamic Architectural Arch Top Accent */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

          {/* Corner Arabesque Motifs */}
          <div className="absolute top-3 left-3 w-7 h-7 border-t-2 border-l-2 border-amber-400/50 rounded-tl-md pointer-events-none" />
          <div className="absolute top-3 right-3 w-7 h-7 border-t-2 border-r-2 border-amber-400/50 rounded-tr-md pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-7 h-7 border-b-2 border-l-2 border-amber-400/50 rounded-bl-md pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-7 h-7 border-b-2 border-r-2 border-amber-400/50 rounded-br-md pointer-events-none" />

          {/* Ambient Warm Golden Lighting */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* ✦ READY TO ENTER? ✦ Header */}
          <div className="relative mb-4 flex items-center gap-2">
            <span className="text-amber-400 text-xs sm:text-sm tracking-[0.3em] font-cinzel font-bold drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              ✦ READY TO ENTER? ✦
            </span>
          </div>

          {/* Title description */}
          <div className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 mb-6 tracking-widest drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
            ANJUMAN-E-HUDA
          </div>

          {/* THE BIG PROMINENT CLICK HERE BUTTON */}
          <button
            type="button"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isClicked}
            className={`group relative w-full px-8 sm:px-12 py-5 sm:py-6 rounded-2xl cursor-pointer select-none transition-all duration-300 ease-out focus:outline-none ${
              isClicked
                ? 'scale-95 brightness-125'
                : isHovered
                ? 'scale-105 shadow-[0_0_60px_rgba(230,167,36,0.75)]'
                : 'scale-100 shadow-[0_0_35px_rgba(230,167,36,0.4)] animate-pulse-glow'
            }`}
            style={{
              background: 'linear-gradient(135deg, rgba(230, 167, 36, 0.3) 0%, rgba(130, 80, 10, 0.5) 50%, rgba(30, 20, 5, 0.85) 100%)',
              border: '2px solid rgba(255, 215, 0, 0.8)',
            }}
          >
            {/* Inner Border Glow */}
            <div className="absolute inset-0 rounded-2xl border border-amber-300/40 opacity-80 group-hover:opacity-100 transition-opacity" />

            {/* Specular Shimmer Pass across button */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 animate-shimmer" />
            </div>

            {/* Button Typography */}
            <div className="relative z-10 flex items-center justify-center gap-3">
              <span className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-black tracking-widest text-amber-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-white transition-colors">
                CLICK HERE
              </span>

              {/* Directional Chevron */}
              <svg
                className={`w-6 h-6 sm:w-7 sm:h-7 text-amber-300 transition-transform duration-300 ${
                  isHovered ? 'translate-x-2' : 'translate-x-0'
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>

            {/* Click ripple burst */}
            {isClicked && (
              <div className="absolute inset-0 rounded-2xl bg-amber-200/50 animate-ping pointer-events-none" />
            )}
          </button>

          {/* Subtitle */}
          <div className="mt-5 text-[11px] sm:text-xs text-amber-200/70 font-medium tracking-widest">
            OFFICIAL LAUNCH EXPERIENCE
          </div>
        </div>
      </div>

      <style>{`
        @keyframes columnDescend {
          0% {
            transform: translateY(-130vh) scale(0.9);
            opacity: 0;
          }
          65% {
            transform: translateY(14px) scale(1.02);
            opacity: 1;
          }
          82% {
            transform: translateY(-6px) scale(0.99);
          }
          92% {
            transform: translateY(3px) scale(1.005);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .animate-column-descend {
          animation: columnDescend 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>
    </div>
  );
};

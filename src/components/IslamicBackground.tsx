import React from 'react';

interface IslamicBackgroundProps {
  stage: string;
  isDramatic?: boolean;
}

export const IslamicBackground: React.FC<IslamicBackgroundProps> = ({ isDramatic = false }) => {
  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none transition-colors duration-1000 ${
        isDramatic ? 'bg-neutral-950/95' : 'bg-neutral-950'
      }`}
    >
      {/* Radial ambient lighting */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: isDramatic
            ? 'radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.12) 0%, rgba(15, 23, 42, 0.6) 45%, rgba(5, 5, 8, 0.98) 85%)'
            : 'radial-gradient(circle at 50% 45%, rgba(200, 160, 60, 0.08) 0%, rgba(15, 20, 32, 0.4) 50%, rgba(4, 4, 6, 0.95) 90%)',
        }}
      />

      {/* Very subtle Islamic Geometric Pattern SVG */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.045] mix-blend-screen"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern id="islamic-girih-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
            {/* 8-pointed star base */}
            <path
              d="M60 10 L72 38 L100 38 L78 55 L87 83 L60 67 L33 83 L42 55 L20 38 L48 38 Z"
              fill="none"
              stroke="#e2b960"
              strokeWidth="0.8"
            />
            {/* Interlocking geometric arabesque ties */}
            <path
              d="M0 0 L25 25 M120 0 L95 25 M0 120 L25 95 M120 120 L95 95"
              fill="none"
              stroke="#e2b960"
              strokeWidth="0.6"
            />
            <circle cx="60" cy="60" r="14" fill="none" stroke="#e2b960" strokeWidth="0.5" />
            <rect x="52" y="52" width="16" height="16" fill="none" stroke="#e2b960" strokeWidth="0.5" transform="rotate(45 60 60)" />
            {/* Corner motifs */}
            <path d="M0 60 L20 60 M120 60 L100 60 M60 0 L60 20 M60 120 L60 100" stroke="#e2b960" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-girih-pattern)" />
      </svg>

      {/* Subtle light rays from top */}
      <div
        className={`absolute -top-32 left-1/2 -translate-x-1/2 w-[160%] max-w-6xl h-[650px] transition-opacity duration-1000 ${
          isDramatic ? 'opacity-35' : 'opacity-15'
        }`}
        style={{
          background: 'conic-gradient(from 180deg at 50% 0%, transparent 140deg, rgba(230, 190, 80, 0.12) 170deg, rgba(255, 230, 150, 0.2) 180deg, rgba(230, 190, 80, 0.12) 190deg, transparent 220deg)',
          filter: 'blur(30px)',
        }}
      />

      {/* Stage floor reflection vignette */}
      <div
        className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10, 10, 14, 0.95), rgba(15, 20, 30, 0.4) 60%, transparent)',
        }}
      >
        {/* Subtle stage spotlight glow pool on floor */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-8 rounded-full blur-xl"
          style={{
            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          }}
        />
        {/* Elegant thin stage baseline */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-4/5 max-w-5xl h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
      </div>

      {/* Floating subtle ambient golden sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-amber-300/40 blur-[0.5px]"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${15 + (i * 29) % 70}%`,
              left: `${8 + (i * 37) % 84}%`,
              animation: `floatParticle ${7 + (i % 5)}s ease-in-out infinite alternate`,
              animationDelay: `${(i * 0.4)}s`,
              opacity: isDramatic ? 0.8 : 0.35,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floatParticle {
          0% { transform: translateY(0px) scale(0.9); opacity: 0.2; }
          50% { transform: translateY(-18px) scale(1.2); opacity: 0.6; }
          100% { transform: translateY(-35px) scale(0.8); opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};

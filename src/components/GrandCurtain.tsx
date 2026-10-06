import React from 'react';

interface GrandCurtainProps {
  progress: number; // 0 (fully closed) to 1 (fully open to the sides)
}

export const GrandCurtain: React.FC<GrandCurtainProps> = ({ progress }) => {
  // progress 0: curtains fully meet in center, covering 100% of viewport
  // progress 1: curtains gathered gracefully at the left and right side borders
  
  // Left curtain gathers from [0 -> 500] into [0 -> 40]
  // Right curtain gathers from [500 -> 1000] into [960 -> 1000]
  const leftGatherWidth = 50 - progress * 44; // 50% down to 6%
  const rightGatherWidth = 50 - progress * 44; // 50% down to 6%

  const drapeSway = Math.sin(progress * Math.PI) * 12;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {/* Dynamic Floor/Stage Shadows Behind Left and Right Curtains */}
      <div
        className="absolute inset-y-0 left-0 transition-opacity duration-300 pointer-events-none"
        style={{
          width: `${leftGatherWidth + 5}%`,
          opacity: (1 - progress * 0.95) * 0.7,
          background: 'linear-gradient(to right, rgba(0,0,0,0.9) 60%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />
      <div
        className="absolute inset-y-0 right-0 transition-opacity duration-300 pointer-events-none"
        style={{
          width: `${rightGatherWidth + 5}%`,
          opacity: (1 - progress * 0.95) * 0.7,
          background: 'linear-gradient(to left, rgba(0,0,0,0.9) 60%, transparent 100%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Main Vector Fabric Drape */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 700"
        preserveAspectRatio="none"
      >
        <defs>
          {/* Deep Royal Velvet Gradients */}
          <linearGradient id="curtain-velvet-dark" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#350409" />
            <stop offset="30%" stopColor="#690c17" />
            <stop offset="65%" stopColor="#871220" />
            <stop offset="90%" stopColor="#48080f" />
            <stop offset="100%" stopColor="#1e0205" />
          </linearGradient>

          <linearGradient id="curtain-velvet-light" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#40060d" />
            <stop offset="25%" stopColor="#7a0f1c" />
            <stop offset="50%" stopColor="#9e1525" />
            <stop offset="75%" stopColor="#5c0b15" />
            <stop offset="100%" stopColor="#280307" />
          </linearGradient>

          <linearGradient id="curtain-gold-trim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3d1" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa8214" />
            <stop offset="100%" stopColor="#fef3d6" />
          </linearGradient>

          <filter id="curtain-depth" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="6" dy="4" stdDeviation="10" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* LEFT CURTAIN WING (Gathers from center 500 to left 60) */}
        {/* ============================================================== */}
        {[0, 1, 2, 3].map((idx) => {
          const totalFolds = 4;
          const initialLeft = (idx / totalFolds) * 510;
          const initialRight = ((idx + 1) / totalFolds) * 510;

          // Target positions when open
          const finalLeft = idx * 16;
          const finalRight = (idx + 1) * 18;

          const currentLeft = initialLeft + (finalLeft - initialLeft) * progress;
          const currentRight = initialRight + (finalRight - initialRight) * progress;

          const midX = (currentLeft + currentRight) / 2;
          const gatherSag = Math.sin((idx / totalFolds) * Math.PI) * progress * 80;
          const bottomY = 720 - gatherSag;

          const pathD = `
            M ${currentLeft} 0
            L ${currentRight} 0
            Q ${currentRight - drapeSway * (idx % 2 === 0 ? 1 : -1)} 350 ${currentRight} ${bottomY}
            L ${currentLeft} ${bottomY}
            Q ${currentLeft + drapeSway * (idx % 2 === 0 ? 1 : -1)} 350 ${currentLeft} 0
            Z
          `;

          return (
            <g key={`left-${idx}`} filter="url(#curtain-depth)">
              <path
                d={pathD}
                fill={idx % 2 === 0 ? 'url(#curtain-velvet-dark)' : 'url(#curtain-velvet-light)'}
              />
              <line
                x1={midX}
                y1="0"
                x2={midX}
                y2={bottomY}
                stroke={idx % 2 === 0 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.07)'}
                strokeWidth={2}
              />
            </g>
          );
        })}

        {/* Left Curtain Leading Edge Gold Embroidery & Fringe */}
        {(() => {
          const edgeX = 510 + (70 - 510) * progress;
          const curveMidX = edgeX - (progress > 0.05 && progress < 0.95 ? 25 : 5);
          const bottomY = 720 - progress * 60;

          return (
            <g>
              <path
                d={`M ${edgeX} 0 Q ${curveMidX} 350 ${edgeX} ${bottomY}`}
                fill="none"
                stroke="url(#curtain-gold-trim)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d={`M ${edgeX - 4} 0 Q ${curveMidX - 4} 350 ${edgeX - 4} ${bottomY}`}
                fill="none"
                stroke="#aa8214"
                strokeWidth="3.5"
                strokeDasharray="4 6"
              />
            </g>
          );
        })()}

        {/* ============================================================== */}
        {/* RIGHT CURTAIN WING (Gathers from center 500 to right 940) */}
        {/* ============================================================== */}
        {[0, 1, 2, 3].map((idx) => {
          const totalFolds = 4;
          const initialLeft = 490 + (idx / totalFolds) * 510;
          const initialRight = 490 + ((idx + 1) / totalFolds) * 510;

          // Target positions when open
          const finalLeft = 930 + idx * 16;
          const finalRight = 930 + (idx + 1) * 18;

          const currentLeft = initialLeft + (finalLeft - initialLeft) * progress;
          const currentRight = initialRight + (finalRight - initialRight) * progress;

          const midX = (currentLeft + currentRight) / 2;
          const gatherSag = Math.sin((idx / totalFolds) * Math.PI) * progress * 80;
          const bottomY = 720 - gatherSag;

          const pathD = `
            M ${currentLeft} 0
            L ${currentRight} 0
            Q ${currentRight + drapeSway * (idx % 2 === 0 ? 1 : -1)} 350 ${currentRight} ${bottomY}
            L ${currentLeft} ${bottomY}
            Q ${currentLeft - drapeSway * (idx % 2 === 0 ? 1 : -1)} 350 ${currentLeft} 0
            Z
          `;

          return (
            <g key={`right-${idx}`} filter="url(#curtain-depth)">
              <path
                d={pathD}
                fill={idx % 2 === 0 ? 'url(#curtain-velvet-light)' : 'url(#curtain-velvet-dark)'}
              />
              <line
                x1={midX}
                y1="0"
                x2={midX}
                y2={bottomY}
                stroke={idx % 2 === 0 ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.07)'}
                strokeWidth={2}
              />
            </g>
          );
        })}

        {/* Right Curtain Leading Edge Gold Embroidery & Fringe */}
        {(() => {
          const edgeX = 490 + (930 - 490) * progress;
          const curveMidX = edgeX + (progress > 0.05 && progress < 0.95 ? 25 : 5);
          const bottomY = 720 - progress * 60;

          return (
            <g>
              <path
                d={`M ${edgeX} 0 Q ${curveMidX} 350 ${edgeX} ${bottomY}`}
                fill="none"
                stroke="url(#curtain-gold-trim)"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <path
                d={`M ${edgeX + 4} 0 Q ${curveMidX + 4} 350 ${edgeX + 4} ${bottomY}`}
                fill="none"
                stroke="#aa8214"
                strokeWidth="3.5"
                strokeDasharray="4 6"
              />
            </g>
          );
        })()}

        {/* Top Valance / Pelmet Across Header */}
        <g filter="url(#curtain-depth)">
          <path
            d="M 0 0 L 1000 0 L 1000 45 Q 875 60 750 45 Q 625 60 500 45 Q 375 60 250 45 Q 125 60 0 45 Z"
            fill="url(#curtain-velvet-dark)"
          />
          <path
            d="M 0 45 Q 125 60 250 45 Q 375 60 500 45 Q 625 60 750 45 Q 875 60 1000 45"
            fill="none"
            stroke="url(#curtain-gold-trim)"
            strokeWidth="5"
          />
        </g>
      </svg>
    </div>
  );
};

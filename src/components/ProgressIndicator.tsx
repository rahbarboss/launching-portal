import React from 'react';

interface ProgressIndicatorProps {
  stageIndex: number; // 0 to 2
}

const STAGES = [
  { step: '01', label: 'OPENING' },
  { step: '02', label: 'WELCOME' },
  { step: '03', label: 'ENTER' },
];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ stageIndex }) => {
  const current = STAGES[Math.min(stageIndex, STAGES.length - 1)];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
      <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-amber-400/20 text-[10px] sm:text-xs text-amber-200/60 font-medium tracking-widest uppercase">
        <span className="font-mono text-amber-300 font-semibold">{current.step} / 03</span>
        <span className="text-amber-500/40">·</span>
        <span className="tracking-[0.25em]">{current.label}</span>
      </div>
    </div>
  );
};

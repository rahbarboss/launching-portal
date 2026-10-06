import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../utils/audio';

export const AudioControl: React.FC = () => {
  const [muted, setMuted] = useState(false);

  const toggleSound = () => {
    const nextState = !muted;
    setMuted(nextState);
    soundEngine.setMuted(nextState);
    if (!nextState) {
      soundEngine.unlock();
      soundEngine.playButtonHover();
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        type="button"
        onClick={toggleSound}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950/60 hover:bg-neutral-900 border border-amber-400/20 hover:border-amber-400/40 text-amber-200/70 hover:text-amber-100 transition-colors backdrop-blur-md cursor-pointer text-xs"
        title={muted ? 'Unmute Experience' : 'Mute Experience'}
      >
        {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        <span className="text-[10px] tracking-widest font-mono uppercase">
          {muted ? 'MUTED' : 'SOUND'}
        </span>
      </button>
    </div>
  );
};

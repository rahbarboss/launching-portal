import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { IslamicBackground } from './components/IslamicBackground';
import { GrandCurtain } from './components/GrandCurtain';
import { WelcomeObject } from './components/WelcomeObject';
import { EnterPanel } from './components/EnterPanel';
import { ConfettiCelebration } from './components/ConfettiCelebration';
import { ProgressIndicator } from './components/ProgressIndicator';
import { IntroMonogram } from './components/IntroMonogram';
import { AudioControl } from './components/AudioControl';
import { soundEngine } from './utils/audio';

export default function App() {
  // Screen & Monogram state
  const [monogramVisible, setMonogramVisible] = useState(true);
  const [curtainProgress, setCurtainProgress] = useState(0); // 0 (closed) to 1 (full open to sides)

  // WELCOME state
  const [revealedLettersCount, setRevealedLettersCount] = useState(0); // 0 to 7
  const [welcomeOpacity, setWelcomeOpacity] = useState(1); // 1 -> 0 (slowly disappears)

  // Transition & Center Panel state
  const [isDramatic, setIsDramatic] = useState(false);
  const [panelVisible, setPanelVisible] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);

  // Progress Stage (0: OPENING, 1: WELCOME, 2: ENTER)
  const [stageIndex, setStageIndex] = useState(0);

  // Master GSAP timeline reference
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Master launch sequence
  const startLaunchSequence = useCallback(() => {
    soundEngine.unlock();
    soundEngine.playIntroWhoosh();

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // -----------------------------------------------------------------
    // Step 0: Initial Subtle Monogram (0.8s)
    // -----------------------------------------------------------------
    tl.to({}, { duration: 0.9 })
      .call(() => {
        setMonogramVisible(false);
      });

    // -----------------------------------------------------------------
    // Step 1: Opening cloth slowly moves and reaches FULL SIDE open
    // -----------------------------------------------------------------
    tl.call(() => {
      setStageIndex(0);
      soundEngine.playFabricRustle();
    });

    // Curtain opens smoothly until it is 100% full side
    tl.to(
      { progress: 0 },
      {
        progress: 1,
        duration: 3.4,
        ease: 'power2.inOut',
        onUpdate: function () {
          setCurtainProgress(this.targets()[0].progress);
        },
      }
    );

    // -----------------------------------------------------------------
    // Step 2: AFTER opening cloth is FULL SIDE open:
    // NOW WELCOME appears letter by letter suddenly in BIG SIZE!
    // -----------------------------------------------------------------
    tl.to({}, { duration: 0.3 }); // Brief pause after cloth reaches sides

    // W -> E -> L -> C -> O -> M -> E
    const letters = ['W', 'E', 'L', 'C', 'O', 'M', 'E'];
    letters.forEach((_, idx) => {
      tl.call(() => {
        setRevealedLettersCount(idx + 1);
        setStageIndex(1);
        soundEngine.playLetterImpact(idx);
        if (idx === letters.length - 1) {
          soundEngine.playWelcomeChime();
        }
      });
      // Spacing between each sudden letter pop
      tl.to({}, { duration: 0.42 });
    });

    // -----------------------------------------------------------------
    // Step 3: WELCOME is now FULL visible!
    // Pause briefly to let the audience admire it (~1.6s)
    // -----------------------------------------------------------------
    tl.to({}, { duration: 1.6 });

    // -----------------------------------------------------------------
    // Step 4: WELCOME slowly disappears / fades away
    // -----------------------------------------------------------------
    tl.to(
      { opacity: 1 },
      {
        opacity: 0,
        duration: 1.3,
        ease: 'power2.out',
        onUpdate: function () {
          setWelcomeOpacity(this.targets()[0].opacity);
        },
      }
    );

    // Brief breath after WELCOME completely disappears
    tl.to({}, { duration: 0.4 });

    // -----------------------------------------------------------------
    // Step 5: AFTER WELCOME disappears:
    // CLICK HERE Column descends in the CENTER!
    // -----------------------------------------------------------------
    tl.call(() => {
      setIsDramatic(true);
      setStageIndex(2);
      soundEngine.playDramaticSwell();
      setPanelVisible(true);
    });
  }, []);

  useEffect(() => {
    startLaunchSequence();

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [startLaunchSequence]);

  const handleEnterClick = () => {
    if (isButtonClicked) return;
    setIsButtonClicked(true);
    setConfettiActive(true);
  };

  return (
    <main
      className="relative w-screen h-screen overflow-hidden select-none bg-neutral-950 text-white cursor-default"
      onClick={() => soundEngine.unlock()}
    >
      {/* 1. Subtle, Premium Islamic Geometric Stage Background */}
      <IslamicBackground stage="main" isDramatic={isDramatic} />

      {/* 2. Audio Control Toggle */}
      <AudioControl />

      {/* 3. Subtle Monogram Intro (0.8s) */}
      <IntroMonogram visible={monogramVisible} />

      {/* 4. Grand 3D WELCOME (Appears AFTER cloth is full side, then slowly disappears) */}
      <WelcomeObject
        revealedCount={revealedLettersCount}
        opacity={welcomeOpacity}
      />

      {/* 5. Grand Velvet Curtain (Slowly and smoothly parting to the sides) */}
      <GrandCurtain progress={curtainProgress} />

      {/* 6. Beautiful Animated Column in the CENTER for "CLICK HERE" (Appears AFTER WELCOME disappears) */}
      <EnterPanel
        visible={panelVisible}
        onEnterClick={handleEnterClick}
        isClicked={isButtonClicked}
      />

      {/* 7. Full-screen Celebratory Confetti & Website Opener */}
      <ConfettiCelebration active={confettiActive} />

      {/* 8. Minimalist Bottom Stage Tracker */}
      <ProgressIndicator stageIndex={stageIndex} />
    </main>
  );
}

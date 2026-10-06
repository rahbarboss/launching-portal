import React, { useEffect, useState } from 'react';

export type CharacterAction =
  | 'idle'
  | 'walking_in'
  | 'pulling_cloth'
  | 'holding_cloth'
  | 'walking_to_welcome'
  | 'looking_at_screen'
  | 'lifting_welcome'
  | 'carrying_right'
  | 'placing_welcome'
  | 'walking_forward'
  | 'hand_forward'
  | 'counting_1'
  | 'counting_2'
  | 'counting_3'
  | 'looking_at_click_here';

interface MuslimCharacterProps {
  action: CharacterAction;
  xPercent: number; // 0 to 100 horizontal position on stage
  facing: 'left' | 'right' | 'front';
  scale?: number;
}

export const MuslimCharacter: React.FC<MuslimCharacterProps> = ({
  action,
  xPercent,
  facing,
  scale = 1,
}) => {
  const [cycle, setCycle] = useState(0);

  const isWalking =
    action === 'walking_in' ||
    action === 'walking_to_welcome' ||
    action === 'carrying_right' ||
    action === 'walking_forward';

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      if (isWalking) {
        // Natural human walking cadence: ~1.4 steps per second
        const speed = action === 'carrying_right' ? 1.3 : 1.5;
        setCycle((prev) => (prev + dt * speed) % 1);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isWalking, action]);

  // Realistic human walking mechanics
  const walkSine = Math.sin(cycle * Math.PI * 2);
  const legAngle1 = isWalking ? 24 * walkSine : 0;
  const legAngle2 = isWalking ? -24 * walkSine : 0;
  const armAngle1 = isWalking && action !== 'carrying_right' ? -20 * walkSine : 0;
  const armAngle2 = isWalking && action !== 'carrying_right' ? 20 * walkSine : 0;
  const bodyBob = isWalking ? Math.abs(walkSine) * 5 : 0;
  const clothSway = isWalking ? walkSine * 6 : 0;

  const isFlipped = facing === 'left';
  const isFront = facing === 'front';
  const isLookingLeft = action === 'looking_at_click_here';

  return (
    <div
      className="absolute bottom-10 z-30 pointer-events-none select-none transition-transform duration-75 ease-linear"
      style={{
        left: `${xPercent}%`,
        transform: `translate(-50%, ${bodyBob}px) scale(${scale})`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Photorealistic Ground Ambient Occlusion & Contact Shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/75 blur-md pointer-events-none transition-all duration-200"
        style={{
          width: isFront ? '130px' : '105px',
          height: '24px',
          transform: `scale(${1 - bodyBob * 0.02})`,
        }}
      />

      {/* Realistic Real Muslim Man Human Rig */}
      <svg
        width="230"
        height="390"
        viewBox="-115 -25 230 390"
        className="overflow-visible"
        style={{
          transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)',
          transformOrigin: '0 200px',
        }}
      >
        <defs>
          {/* Photorealistic Human Skin Shading: Natural Undertones & Subsurface Highlights */}
          <radialGradient id="real-skin-face" cx="48%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#f3d0b3" />
            <stop offset="55%" stopColor="#e2b492" />
            <stop offset="85%" stopColor="#c8926d" />
            <stop offset="100%" stopColor="#ac754f" />
          </radialGradient>

          <linearGradient id="real-skin-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d8a37e" />
            <stop offset="100%" stopColor="#98603b" />
          </linearGradient>

          {/* Real Fabric: Crisp White Tailored Egyptian Cotton Thobe with Soft Ambient Shading */}
          <linearGradient id="real-thobe-body" x1="15%" y1="0%" x2="85%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#f8fafc" />
            <stop offset="70%" stopColor="#e2e8f0" />
            <stop offset="90%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>

          <linearGradient id="real-thobe-crease" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#b4c2d0" />
          </linearGradient>

          {/* Real Human Beard & Hair (Natural Jet Black with Brown Sheen) */}
          <linearGradient id="real-hair-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c221e" />
            <stop offset="50%" stopColor="#181310" />
            <stop offset="100%" stopColor="#0c0a08" />
          </linearGradient>

          {/* Genuine Human Eye: Deep Warm Hazel-Brown with Iris Fibers & Specular Gleam */}
          <radialGradient id="real-iris-gradient" cx="45%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#7a461d" />
            <stop offset="45%" stopColor="#4e2b0f" />
            <stop offset="85%" stopColor="#231205" />
            <stop offset="100%" stopColor="#0a0502" />
          </radialGradient>

          {/* Polished Formal Dress Shoes Leather */}
          <linearGradient id="real-shoes-leather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3d2719" />
            <stop offset="40%" stopColor="#24140b" />
            <stop offset="85%" stopColor="#120904" />
            <stop offset="100%" stopColor="#050302" />
          </linearGradient>

          {/* Realistic Fabric Shadow Filter */}
          <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.45" />
          </filter>
        </defs>

        {/* ============================================================== */}
        {/* LEGS & SHOES (Realistic adult human legs & formal shoes) */}
        {/* ============================================================== */}
        {!isFront ? (
          // Side View Walking Legs
          <g>
            {/* Back Leg */}
            <g transform={`translate(0, 210) rotate(${legAngle2})`}>
              <path d="M -12 0 L 12 0 L 8 85 L -10 85 Z" fill="url(#real-thobe-crease)" opacity="0.85" />
              <g transform="translate(0, 85)">
                <path d="M -10 0 L 8 0 L 6 68 L -8 68 Z" fill="url(#real-thobe-crease)" opacity="0.8" />
                {/* Polished Oxford Dress Shoe */}
                <path d="M -9 66 L 20 66 Q 26 74 18 78 L -10 78 Z" fill="url(#real-shoes-leather)" />
                {/* Specular leather highlight */}
                <line x1="-3" y1="68" x2="14" y2="68" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              </g>
            </g>

            {/* Front Leg */}
            <g transform={`translate(0, 210) rotate(${legAngle1})`}>
              <path d="M -14 0 L 13 0 L 10 85 L -11 85 Z" fill="url(#real-thobe-body)" />
              <g transform="translate(0, 85)">
                <path d="M -11 0 L 9 0 L 7 68 L -9 68 Z" fill="url(#real-thobe-body)" />
                {/* Shoe */}
                <path d="M -10 66 L 22 66 Q 28 74 20 78 L -11 78 Z" fill="url(#real-shoes-leather)" />
                <line x1="-4" y1="68" x2="16" y2="68" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
              </g>
            </g>
          </g>
        ) : (
          // Front View Standing Legs
          <g>
            {/* Left Leg */}
            <g transform="translate(-18, 210)">
              <path d="M -13 0 L 13 0 L 10 85 L -10 85 Z" fill="url(#real-thobe-body)" />
              <g transform="translate(0, 85)">
                <path d="M -10 0 L 10 0 L 9 68 L -9 68 Z" fill="url(#real-thobe-body)" />
                <ellipse cx="0" cy="72" rx="12" ry="7" fill="url(#real-shoes-leather)" />
                <line x1="-7" y1="71" x2="7" y2="71" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              </g>
            </g>
            {/* Right Leg */}
            <g transform="translate(18, 210)">
              <path d="M -13 0 L 13 0 L 10 85 L -10 85 Z" fill="url(#real-thobe-body)" />
              <g transform="translate(0, 85)">
                <path d="M -10 0 L 10 0 L 9 68 L -9 68 Z" fill="url(#real-thobe-body)" />
                <ellipse cx="0" cy="72" rx="12" ry="7" fill="url(#real-shoes-leather)" />
                <line x1="-7" y1="71" x2="7" y2="71" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
              </g>
            </g>
          </g>
        )}

        {/* ============================================================== */}
        {/* LOWER THOBE SKIRT (Draped white linen with realistic pleats) */}
        {/* ============================================================== */}
        <g transform={`translate(0, 160) rotate(${clothSway})`}>
          {!isFront ? (
            <path d="M -22 0 L 22 0 L 28 85 Q 0 92 -26 85 Z" fill="url(#real-thobe-body)" filter="url(#soft-shadow)" />
          ) : (
            <g>
              <path d="M -32 0 L 32 0 L 36 90 Q 0 96 -36 90 Z" fill="url(#real-thobe-body)" filter="url(#soft-shadow)" />
              {/* Natural fabric drape crease lines */}
              <line x1="-12" y1="5" x2="-16" y2="88" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="12" y1="5" x2="16" y2="88" stroke="#cbd5e1" strokeWidth="1.5" />
            </g>
          )}
        </g>

        {/* ============================================================== */}
        {/* TORSO: CRISP TAILORED WHITE THOBE (Realistic athletic chest & posture) */}
        {/* ============================================================== */}
        <g transform="translate(0, 85)">
          {!isFront ? (
            <g>
              {/* Side view torso */}
              <path d="M -22 0 L 25 0 L 22 80 L -22 80 Z" fill="url(#real-thobe-body)" />
              <line x1="16" y1="0" x2="16" y2="75" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Mother of pearl buttons */}
              {[15, 30, 45, 60].map((y, i) => (
                <circle key={i} cx="16" cy={y} r="2" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />
              ))}
            </g>
          ) : (
            <g>
              {/* Front view tailored chest */}
              <path d="M -35 0 L 35 0 L 32 80 L -32 80 Z" fill="url(#real-thobe-body)" />
              {/* Center Placket with delicate tailoring */}
              <rect x="-3" y="0" width="6" height="75" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
              {[14, 28, 42, 56].map((y, i) => (
                <circle key={i} cx="0" cy={y} r="2.2" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.9" />
              ))}
              {/* Mandarin stand-up collar */}
              <rect x="-16" y="-8" width="32" height="10" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            </g>
          )}

          {/* ============================================================== */}
          {/* REAL HUMAN HEAD, BEARD, EYES & CLEAN HAIR */}
          {/* ============================================================== */}
          <g
            transform={`translate(0, -35) ${
              isLookingLeft ? 'rotate(-10)' : ''
            } transition-transform duration-300`}
          >
            {/* Muscular Neck with subtle throat/Adam's apple contour */}
            <rect x="-9" y="15" width="18" height="18" fill="url(#real-skin-shadow)" />
            <path d="M -4 24 Q 0 28 4 24" stroke="#87532f" strokeWidth="1.2" fill="none" opacity="0.6" />

            {!isFront ? (
              // Side Profile of Real Man
              <g>
                <ellipse cx="2" cy="0" rx="19" ry="22" fill="url(#real-skin-face)" />
                {/* Masculine Jawline & Neat Trimmed Beard */}
                <path
                  d="M -6 4 Q 8 20 18 12 Q 22 4 18 -6 Q 14 -12 2 -12 Q -12 -12 -15 0 Q -15 14 -6 18 Z"
                  fill="url(#real-skin-face)"
                />
                {/* Trimmed Dark Beard with realistic hair gradient */}
                <path
                  d="M 6 4 Q 16 8 18 13 Q 17 22 7 24 Q -4 25 -10 18 Q -10 10 -4 6 Q 0 8 6 4 Z"
                  fill="url(#real-hair-gradient)"
                />
                {/* Natural Mustache */}
                <path d="M 6 3 Q 14 3 18 6 Q 14 8 8 6 Z" fill="url(#real-hair-gradient)" />
                {/* Real Human Eye */}
                <ellipse cx="10" cy="-4" rx="4" ry="2.8" fill="#ffffff" />
                <circle cx="11" cy="-4" r="2.2" fill="url(#real-iris-gradient)" />
                <circle cx="11" cy="-4" r="1.1" fill="#000000" />
                <circle cx="12" cy="-5" r="0.8" fill="#ffffff" />
                {/* Eyelid & Brow */}
                <path d="M 6 -8 Q 11 -10 16 -8" stroke="#181310" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                {/* Clean Haircut */}
                <path d="M -16 -4 Q 0 -22 16 -12 Q 18 -4 16 2 Q 0 -6 -16 2 Z" fill="url(#real-hair-gradient)" />
              </g>
            ) : (
              // Front View of Real Man (Engaging with the audience & looking at button)
              <g>
                <ellipse cx="0" cy="0" rx="22" ry="24" fill="url(#real-skin-face)" />
                {/* Ears with anatomical cartilage */}
                <ellipse cx="-23" cy="1" rx="4" ry="8" fill="url(#real-skin-face)" />
                <ellipse cx="23" cy="1" rx="4" ry="8" fill="url(#real-skin-face)" />

                {/* Handsome Sculpted Jawline with Groomed Modern Beard */}
                <path
                  d="M -19 2 Q -16 20 0 26 Q 16 20 19 2 Q 12 12 0 14 Q -12 12 -19 2 Z"
                  fill="url(#real-hair-gradient)"
                />
                {/* Groomed Mustache */}
                <path d="M -10 6 Q 0 3 10 6 Q 0 9 -10 6 Z" fill="url(#real-hair-gradient)" />
                {/* Natural masculine smile & lips */}
                <path
                  d={isLookingLeft ? 'M -5 11 Q 2 15 9 11' : 'M -6 11 Q 0 15 6 11'}
                  stroke="#87432b"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Realistic Human Nose bridge */}
                <path d="M -2 -8 L -1 4 Q 0 7 2 4 L 1 -8" stroke="#be8460" strokeWidth="1.2" fill="none" />
                <ellipse cx="0" cy="4" rx="3.5" ry="2" fill="#d29671" />

                {/* REAL HUMAN EYES (Tracking left when looking at CLICK HERE) */}
                <g transform={isLookingLeft ? 'translate(-4.5, 0)' : 'translate(0, 0)'}>
                  {/* Left Eye */}
                  <ellipse cx="-8.5" cy="-4" rx="4.8" ry="3.2" fill="#ffffff" />
                  <circle cx="-8.2" cy="-4" r="2.4" fill="url(#real-iris-gradient)" />
                  <circle cx="-8.2" cy="-4" r="1.2" fill="#000000" />
                  <circle cx="-7.2" cy="-4.8" r="0.8" fill="#ffffff" />
                  <path d="M -13 -6 Q -8.5 -9 -4 -6" stroke="#2c1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <path d="M -14 -12 Q -8.5 -16 -3 -12" stroke="#181310" strokeWidth="2.5" fill="none" strokeLinecap="round" />

                  {/* Right Eye */}
                  <ellipse cx="8.5" cy="-4" rx="4.8" ry="3.2" fill="#ffffff" />
                  <circle cx="8.2" cy="-4" r="2.4" fill="url(#real-iris-gradient)" />
                  <circle cx="8.2" cy="-4" r="1.2" fill="#000000" />
                  <circle cx="9.2" cy="-4.8" r="0.8" fill="#ffffff" />
                  <path d="M 4 -6 Q 8.5 -9 13 -6" stroke="#2c1a10" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <path d="M 3 -12 Q 8.5 -16 14 -12" stroke="#181310" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                </g>

                {/* Modern Neat Groomed Hair / Clean White Keffiyeh Cap */}
                <path
                  d="M -21 -6 Q 0 -26 21 -6 Q 14 -14 0 -14 Q -14 -14 -21 -6 Z"
                  fill="url(#real-hair-gradient)"
                />
              </g>
            )}
          </g>

          {/* ============================================================== */}
          {/* REAL HUMAN ARMS & ARTICULATED 5-FINGER HANDS */}
          {/* ============================================================== */}

          {/* 1. Pulling Opening Cloth to the Left */}
          {action === 'pulling_cloth' && (
            <g>
              {/* Left arm extended holding/pulling cloth */}
              <g transform="translate(-20, 10) rotate(-65)">
                <rect x="-7" y="0" width="14" height="48" rx="6" fill="url(#real-thobe-body)" />
                <g transform="translate(0, 46) rotate(-25)">
                  <rect x="-6" y="0" width="12" height="42" rx="5" fill="url(#real-thobe-body)" />
                  {/* Real hand grasping cloth with curled knuckles */}
                  <g transform="translate(0, 42)">
                    <circle cx="0" cy="0" r="7.5" fill="url(#real-skin-face)" />
                    <rect x="-6" y="-3" width="12" height="6" rx="2" fill="#c8926d" />
                  </g>
                </g>
              </g>
              {/* Right arm balanced naturally */}
              <g transform="translate(20, 10) rotate(20)">
                <rect x="-7" y="0" width="14" height="46" rx="6" fill="url(#real-thobe-crease)" />
                <g transform="translate(0, 44) rotate(15)">
                  <rect x="-6" y="0" width="12" height="40" rx="5" fill="url(#real-thobe-crease)" />
                  <circle cx="0" cy="38" r="7" fill="url(#real-skin-face)" />
                </g>
              </g>
            </g>
          )}

          {/* 2. Carrying WELCOME across to the RIGHT SIDE with both hands */}
          {action === 'carrying_right' && (
            <g>
              {/* Back arm cupping left side of WELCOME */}
              <g transform="translate(-16, 12) rotate(42)">
                <rect x="-7" y="0" width="14" height="48" rx="6" fill="url(#real-thobe-crease)" />
                <g transform="translate(0, 46) rotate(-70)">
                  <rect x="-6" y="0" width="12" height="46" rx="5" fill="url(#real-thobe-crease)" />
                  {/* Real hand supporting underside with individual fingers */}
                  <g transform="translate(0, 46)">
                    <rect x="-7" y="-5" width="14" height="10" rx="3" fill="url(#real-skin-face)" />
                    <path d="M -5 5 L -5 14 M -1 5 L -1 16 M 3 5 L 3 14" stroke="#c8926d" strokeWidth="2.5" strokeLinecap="round" />
                  </g>
                </g>
              </g>
              {/* Front arm cupping right side of WELCOME */}
              <g transform="translate(18, 12) rotate(48)">
                <rect x="-8" y="0" width="16" height="50" rx="7" fill="url(#real-thobe-body)" />
                <g transform="translate(0, 48) rotate(-78)">
                  <rect x="-7" y="0" width="14" height="48" rx="6" fill="url(#real-thobe-body)" />
                  {/* Real hand cupping with fingers and thumb visible */}
                  <g transform="translate(0, 48)">
                    <rect x="-7" y="-5" width="15" height="10" rx="3" fill="url(#real-skin-face)" />
                    <path d="M -5 5 L -5 15 M -1 5 L -1 17 M 3 5 L 3 15" stroke="#c8926d" strokeWidth="2.8" strokeLinecap="round" />
                  </g>
                </g>
              </g>
            </g>
          )}

          {/* 3. Placing WELCOME on the floor */}
          {action === 'placing_welcome' && (
            <g>
              <g transform="translate(-16, 12) rotate(58)">
                <rect x="-7" y="0" width="14" height="46" rx="6" fill="url(#real-thobe-crease)" />
                <g transform="translate(0, 44) rotate(-40)">
                  <rect x="-6" y="0" width="12" height="44" rx="5" fill="url(#real-thobe-crease)" />
                  <circle cx="0" cy="44" r="7" fill="url(#real-skin-face)" />
                </g>
              </g>
              <g transform="translate(18, 12) rotate(64)">
                <rect x="-8" y="0" width="16" height="48" rx="7" fill="url(#real-thobe-body)" />
                <g transform="translate(0, 46) rotate(-45)">
                  <rect x="-7" y="0" width="14" height="46" rx="6" fill="url(#real-thobe-body)" />
                  <circle cx="0" cy="46" r="7.5" fill="url(#real-skin-face)" />
                </g>
              </g>
            </g>
          )}

          {/* 4. Natural Walking / Standing with relaxed arms */}
          {(action === 'walking_in' || action === 'walking_to_welcome' || action === 'walking_forward' || action === 'looking_at_screen' || action === 'idle') && (
            <g>
              {/* Left Arm */}
              <g transform={`translate(-22, 10) rotate(${armAngle1 + 10})`}>
                <rect x="-7" y="0" width="14" height="48" rx="6" fill="url(#real-thobe-body)" />
                <g transform="translate(0, 46) rotate(12)">
                  <rect x="-6" y="0" width="12" height="42" rx="5" fill="url(#real-thobe-body)" />
                  <circle cx="0" cy="40" r="7" fill="url(#real-skin-face)" />
                </g>
              </g>
              {/* Right Arm */}
              <g transform={`translate(22, 10) rotate(${armAngle2 + 10})`}>
                <rect x="-7" y="0" width="14" height="48" rx="6" fill="url(#real-thobe-body)" />
                <g transform="translate(0, 46) rotate(12)">
                  <rect x="-6" y="0" width="12" height="42" rx="5" fill="url(#real-thobe-body)" />
                  <circle cx="0" cy="40" r="7" fill="url(#real-skin-face)" />
                </g>
              </g>
            </g>
          )}

          {/* 5. REAL HUMAN FINGER COUNTING (1, 2, 3) & LOOKING AT CLICK HERE */}
          {(action === 'hand_forward' || action === 'counting_1' || action === 'counting_2' || action === 'counting_3' || action === 'looking_at_click_here') && (
            <g>
              {/* Left hand: resting gracefully at waist or gesturing leftward toward CLICK HERE */}
              <g
                transform={`translate(-22, 10) rotate(${
                  action === 'looking_at_click_here' ? -52 : 15
                }) transition-transform duration-500`}
              >
                <rect x="-7" y="0" width="14" height="48" rx="6" fill="url(#real-thobe-body)" />
                <g
                  transform={`translate(0, 46) rotate(${
                    action === 'looking_at_click_here' ? -42 : 12
                  }) transition-transform duration-500`}
                >
                  <rect x="-6" y="0" width="12" height="42" rx="5" fill="url(#real-thobe-body)" />
                  {/* Open welcoming human hand pointing to CLICK HERE */}
                  <g transform="translate(0, 40)">
                    <circle cx="0" cy="0" r="7" fill="url(#real-skin-face)" />
                    {action === 'looking_at_click_here' && (
                      <g transform="rotate(-30)">
                        <rect x="-7" y="2" width="4.5" height="16" rx="2" fill="url(#real-skin-face)" />
                        <rect x="-1" y="4" width="4.8" height="18" rx="2" fill="url(#real-skin-face)" />
                        <rect x="5" y="3" width="4.5" height="16" rx="2" fill="url(#real-skin-face)" />
                      </g>
                    )}
                  </g>
                </g>
              </g>

              {/* Right Hand: Arm extended forward toward camera for REAL FINGER COUNTING */}
              <g
                transform={`translate(22, 10) rotate(${
                  action === 'looking_at_click_here' ? 18 : -42
                }) transition-transform duration-500`}
              >
                {/* Upper arm */}
                <rect x="-7" y="0" width="15" height="48" rx="6" fill="url(#real-thobe-body)" />
                {/* Forearm bent forward toward camera */}
                <g
                  transform={`translate(0, 46) rotate(${
                    action === 'looking_at_click_here' ? 22 : -62
                  }) transition-transform duration-500`}
                >
                  <rect x="-6" y="0" width="13" height="44" rx="5" fill="url(#real-thobe-body)" />

                  {/* REAL HUMAN HAND AND INDIVIDUAL EXTENDED FINGERS */}
                  <g transform="translate(0, 44)">
                    {/* Palm base with realistic contours */}
                    <rect x="-9" y="0" width="18" height="15" rx="4" fill="url(#real-skin-face)" />

                    {/* COUNT 1: One index finger clearly raised! */}
                    {action === 'counting_1' && (
                      <g>
                        {/* Index finger extended with realistic knuckle crease and nail */}
                        <rect x="-2" y="14" width="6" height="24" rx="3" fill="url(#real-skin-face)" stroke="#ac754f" strokeWidth="0.8" />
                        <line x1="-1" y1="22" x2="3" y2="22" stroke="#ac754f" strokeWidth="0.8" />
                        <ellipse cx="1" cy="35" rx="1.8" ry="1.2" fill="#fdf2e9" />
                        {/* Other 3 fingers curled into fist */}
                        <ellipse cx="5" cy="8" rx="4" ry="4.5" fill="#c8926d" />
                        <ellipse cx="-6" cy="7" rx="3.5" ry="4" fill="#c8926d" />
                        {/* Thumb folded over fingers */}
                        <path d="M -7 4 Q -10 7 -7 12" stroke="#ac754f" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </g>
                    )}

                    {/* COUNT 2: Two fingers clearly raised (Index + Middle) */}
                    {action === 'counting_2' && (
                      <g>
                        {/* Index finger */}
                        <rect x="-6" y="14" width="5.5" height="24" rx="2.8" fill="url(#real-skin-face)" stroke="#ac754f" strokeWidth="0.8" />
                        <ellipse cx="-3.2" cy="35" rx="1.6" ry="1.2" fill="#fdf2e9" />
                        {/* Middle finger */}
                        <rect x="1" y="15" width="5.5" height="26" rx="2.8" fill="url(#real-skin-face)" stroke="#ac754f" strokeWidth="0.8" />
                        <ellipse cx="3.8" cy="38" rx="1.6" ry="1.2" fill="#fdf2e9" />
                        {/* Ring & Pinky curled */}
                        <ellipse cx="6" cy="8" rx="4" ry="4.5" fill="#c8926d" />
                        {/* Thumb */}
                        <path d="M -7 4 Q -10 7 -7 12" stroke="#ac754f" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </g>
                    )}

                    {/* COUNT 3: Three fingers clearly raised (Index + Middle + Ring) */}
                    {action === 'counting_3' && (
                      <g>
                        {/* Index finger */}
                        <rect x="-8" y="14" width="5.2" height="24" rx="2.6" fill="url(#real-skin-face)" stroke="#ac754f" strokeWidth="0.8" />
                        <ellipse cx="-5.4" cy="35" rx="1.5" ry="1.2" fill="#fdf2e9" />
                        {/* Middle finger */}
                        <rect x="-2" y="15" width="5.2" height="26" rx="2.6" fill="url(#real-skin-face)" stroke="#ac754f" strokeWidth="0.8" />
                        <ellipse cx="0.6" cy="38" rx="1.5" ry="1.2" fill="#fdf2e9" />
                        {/* Ring finger */}
                        <rect x="4" y="14" width="5.2" height="24" rx="2.6" fill="url(#real-skin-face)" stroke="#ac754f" strokeWidth="0.8" />
                        <ellipse cx="6.6" cy="35" rx="1.5" ry="1.2" fill="#fdf2e9" />
                        {/* Pinky curled */}
                        <ellipse cx="8" cy="8" rx="3.2" ry="4" fill="#c8926d" />
                        {/* Thumb */}
                        <path d="M -8 4 Q -11 7 -8 12" stroke="#ac754f" strokeWidth="3" fill="none" strokeLinecap="round" />
                      </g>
                    )}

                    {/* Initial hand forward pose */}
                    {action === 'hand_forward' && (
                      <g>
                        <ellipse cx="0" cy="6" rx="7" ry="7" fill="url(#real-skin-face)" />
                        <rect x="-3" y="11" width="5" height="14" rx="2.5" fill="url(#real-skin-face)" />
                      </g>
                    )}

                    {/* Looking at CLICK HERE: Hand open gesturing gently */}
                    {action === 'looking_at_click_here' && (
                      <g>
                        <ellipse cx="0" cy="6" rx="7" ry="7" fill="url(#real-skin-face)" />
                      </g>
                    )}
                  </g>
                </g>
              </g>
            </g>
          )}
        </g>
      </svg>
    </div>
  );
};

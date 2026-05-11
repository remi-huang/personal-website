// Hand-drawn scribble primitives — arrows, circles, underlines, doodles.
// All use a slightly wobbly stroke to feel pen-on-paper.
// Color defaults to ink blue but can be overridden via `color` prop.

const INK = '#1d3a8a';

// Reusable rough-stroke filter — very subtle paper feel
const RoughFilter = () => (
  <filter id="rough-paper" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
    <feDisplacementMap in="SourceGraphic" scale="1.2" />
  </filter>
);

// Curved arrow that points with an organic, hand-drawn feel.
// dir controls roughly where it points (down-left, down, down-right…).
const ScribbleArrow = ({ width = 60, height = 80, color = INK, dir = 'down', strokeWidth = 2.2, style }) => {
  const paths = {
    'down-left': "M 50 8 Q 48 35 30 55 Q 22 64 18 70",
    'down': "M 30 6 Q 32 30 30 64",
    'down-right': "M 8 8 Q 12 35 30 55 Q 38 64 42 70",
    'right': "M 6 30 Q 30 32 54 30",
    'left': "M 54 30 Q 30 32 6 30",
    'up-right': "M 8 70 Q 12 40 30 24 Q 40 16 50 10",
  };
  const heads = {
    'down-left': "M 18 70 L 22 60 M 18 70 L 28 68",
    'down': "M 30 64 L 24 56 M 30 64 L 36 56",
    'down-right': "M 42 70 L 38 60 M 42 70 L 32 68",
    'right': "M 54 30 L 46 24 M 54 30 L 46 36",
    'left': "M 6 30 L 14 24 M 6 30 L 14 36",
    'up-right': "M 50 10 L 42 12 M 50 10 L 48 18",
  };
  return (
    <svg width={width} height={height} viewBox="0 0 60 80" style={style}>
      <defs><RoughFilter /></defs>
      <g filter="url(#rough-paper)" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d={paths[dir]} />
        <path d={heads[dir]} />
      </g>
    </svg>
  );
};

// Hand-drawn circle around a region (for the "contact me" oval style)
const ScribbleCircle = ({ width = 120, height = 50, color = INK, strokeWidth = 1.8, style }) => (
  <svg width={width} height={height} viewBox="0 0 120 50" style={style}>
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round">
      <path d="M 60 4 Q 100 4 114 22 Q 118 38 88 46 Q 50 50 18 44 Q 4 36 6 22 Q 12 8 50 4 Q 70 3 95 6" />
    </g>
  </svg>
);

// Wavy underline for highlights
const ScribbleUnderline = ({ width = 140, height = 12, color = INK, strokeWidth = 2, style, double = false }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={style} preserveAspectRatio="none">
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth={strokeWidth} fill="none" strokeLinecap="round">
      <path d={`M 4 ${height/2} Q ${width*0.25} ${height/2 - 2} ${width*0.5} ${height/2} T ${width-4} ${height/2}`} />
      {double && <path d={`M 8 ${height/2 + 4} Q ${width*0.3} ${height/2 + 2} ${width*0.55} ${height/2 + 4} T ${width-8} ${height/2 + 4}`} />}
    </g>
  </svg>
);

// Strikethrough — for the "London ~~Sweden~~ Shanghai" effect
const ScribbleStrikethrough = ({ width = 80, height = 14, color = INK, style }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ ...style, position: 'absolute', inset: 0, pointerEvents: 'none' }} preserveAspectRatio="none">
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round">
      <path d={`M 2 ${height/2 - 1} Q ${width*0.3} ${height/2 + 1} ${width*0.6} ${height/2 - 1} T ${width-2} ${height/2 + 1}`} />
      <path d={`M 4 ${height/2 + 1} Q ${width*0.3} ${height/2 - 1} ${width*0.6} ${height/2 + 1} T ${width-4} ${height/2}`} />
    </g>
  </svg>
);

// Tiny bicycle doodle (like ref image 1)
const ScribbleBicycle = ({ width = 80, height = 50, color = INK, style }) => (
  <svg width={width} height={height} viewBox="0 0 80 50" style={style}>
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="36" r="10" />
      <circle cx="60" cy="36" r="10" />
      <path d="M 18 36 L 36 18 L 52 36 M 36 18 L 60 36 M 36 18 L 30 12 M 60 36 L 56 22 L 50 22" />
    </g>
  </svg>
);

// Star doodle
const ScribbleStar = ({ size = 24, color = INK, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 12 2 L 14 9 L 22 10 L 16 15 L 18 22 L 12 18 L 6 22 L 8 15 L 2 10 L 10 9 Z" />
    </g>
  </svg>
);

// Sparkle / asterisk
const ScribbleSparkle = ({ size = 20, color = INK, style }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={style}>
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round">
      <path d="M 10 2 L 10 18 M 2 10 L 18 10 M 4 4 L 16 16 M 16 4 L 4 16" />
    </g>
  </svg>
);

// Loose scribble — like the messy blue ball in ref image 1
const ScribbleScribble = ({ width = 60, height = 60, color = INK, style }) => (
  <svg width={width} height={height} viewBox="0 0 60 60" style={style}>
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M 30 10 Q 50 15 48 30 Q 42 45 28 42 Q 14 38 18 25 Q 24 12 38 14 Q 50 18 46 32 Q 38 44 26 40 Q 16 34 22 22 Q 30 14 42 18" />
    </g>
  </svg>
);

// Smiley
const ScribbleSmiley = ({ size = 36, color = INK, style }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" style={style}>
    <defs><RoughFilter /></defs>
    <g filter="url(#rough-paper)" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round">
      <circle cx="18" cy="18" r="15" />
      <circle cx="13" cy="15" r="0.8" fill={color} />
      <circle cx="23" cy="15" r="0.8" fill={color} />
      <path d="M 11 22 Q 18 27 25 22" />
    </g>
  </svg>
);

Object.assign(window, {
  INK,
  ScribbleArrow, ScribbleCircle, ScribbleUnderline, ScribbleStrikethrough,
  ScribbleBicycle, ScribbleStar, ScribbleSparkle, ScribbleScribble, ScribbleSmiley,
});

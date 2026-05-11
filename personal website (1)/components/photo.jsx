// Photo placeholder — a polaroid-ish card with a subtly-striped image area
// and an optional caption. Includes optional tape, paperclip, and rotation.

const PhotoPlaceholder = ({
  width = 200,
  height = 240,
  rotate = 0,
  label = 'photo',
  hue = 200,           // for the placeholder gradient — different photos get different tints
  tape = null,         // 'top' | 'top-left' | 'top-right' | null
  clip = null,         // 'red' | 'yellow' | 'blue' | null
  polaroid = true,     // white border like a polaroid
  caption = null,
  style,
  zIndex = 1,
}) => {
  const padding = polaroid ? 10 : 0;
  const captionH = caption ? 36 : (polaroid ? 30 : 0);

  // Subtle striped placeholder swatch — multi-band gradient suggesting an image
  const swatch = `linear-gradient(135deg,
    oklch(0.55 0.06 ${hue}) 0%,
    oklch(0.7 0.08 ${hue + 20}) 30%,
    oklch(0.45 0.10 ${hue - 30}) 60%,
    oklch(0.65 0.05 ${hue + 50}) 100%)`;

  return (
    <div style={{
      position: 'absolute',
      width,
      height,
      transform: `rotate(${rotate}deg)`,
      transformOrigin: 'center center',
      zIndex,
      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.12)) drop-shadow(0 1px 2px rgba(0,0,0,0.08))',
      ...style,
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: polaroid ? '#fdfbf5' : 'transparent',
        padding,
        paddingBottom: captionH,
        boxShadow: polaroid ? 'inset 0 0 0 1px rgba(0,0,0,0.04)' : 'none',
        position: 'relative',
      }}>
        <div style={{
          width: '100%',
          height: `calc(100% - 0px)`,
          background: swatch,
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* faint stripes */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 16px)',
            mixBlendMode: 'overlay',
          }} />
          {/* label in monospace */}
          <div style={{
            position: 'absolute',
            bottom: 8, left: 10,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 9,
            color: 'rgba(255,255,255,0.85)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
          }}>
            {label}
          </div>
        </div>

        {caption && (
          <div style={{
            position: 'absolute',
            bottom: 6,
            left: 10,
            right: 10,
            fontFamily: 'Caveat, cursive',
            fontSize: 18,
            color: '#1d3a8a',
            lineHeight: 1.1,
          }}>
            {caption}
          </div>
        )}
      </div>

      {/* Tape */}
      {tape && (
        <div style={{
          position: 'absolute',
          top: tape.includes('top') ? -10 : 'auto',
          left: tape === 'top-left' ? 10 : tape === 'top' ? '50%' : 'auto',
          right: tape === 'top-right' ? 14 : 'auto',
          transform: tape === 'top' ? 'translateX(-50%) rotate(-3deg)' : `rotate(${tape === 'top-left' ? -8 : 6}deg)`,
          width: 60,
          height: 18,
          background: 'rgba(255, 240, 180, 0.65)',
          backdropFilter: 'blur(1px)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          pointerEvents: 'none',
        }} />
      )}

      {/* Paperclip */}
      {clip && (
        <Paperclip color={clip} style={{
          position: 'absolute',
          top: -16,
          left: clip === 'red' ? -8 : 'auto',
          right: clip === 'yellow' ? -10 : clip === 'blue' ? 12 : 'auto',
          transform: `rotate(${clip === 'red' ? -15 : clip === 'yellow' ? 20 : 8}deg)`,
        }} />
      )}
    </div>
  );
};

const Paperclip = ({ color = 'red', style }) => {
  const colors = {
    red: '#d94a3a',
    yellow: '#e8b73a',
    blue: '#3a5fd9',
  };
  return (
    <svg width={32} height={56} viewBox="0 0 32 56" style={style}>
      <g stroke={colors[color] || color} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 10 6 L 10 42 Q 10 50 16 50 Q 22 50 22 42 L 22 14 Q 22 8 17 8 Q 14 8 14 12 L 14 38" />
      </g>
    </svg>
  );
};

Object.assign(window, { PhotoPlaceholder, Paperclip });

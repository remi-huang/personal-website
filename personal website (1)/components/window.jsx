// Generic mac-style window chrome — used for the "magazine collage" hero
// to scatter little tool windows (clock, text editor, photo).
// Original drawing — not modeled on any specific OS chrome.

const RetroWindow = ({
  width = 280,
  height = 200,
  title = 'Untitled',
  rotate = 0,
  zIndex = 1,
  style,
  children,
  flavor = 'classic', // 'classic' (b&w outline) | 'soft' (cream)
}) => {
  const isClassic = flavor === 'classic';
  return (
    <div style={{
      position: 'absolute',
      width,
      height,
      transform: `rotate(${rotate}deg)`,
      zIndex,
      filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.10))',
      ...style,
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        background: isClassic ? '#fdfcf7' : '#f4efe4',
        border: '1px solid #1a1a1a',
        boxShadow: 'inset 0 0 0 1px #fff, 2px 2px 0 #1a1a1a',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Title bar */}
        <div style={{
          height: 18,
          borderBottom: '1px solid #1a1a1a',
          background: 'repeating-linear-gradient(0deg, #1a1a1a 0 1px, #fdfcf7 1px 3px)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 6,
          paddingRight: 6,
          gap: 6,
          flexShrink: 0,
        }}>
          {/* close box */}
          <div style={{ width: 11, height: 11, background: '#fdfcf7', border: '1px solid #1a1a1a', flexShrink: 0 }} />
          <div style={{
            background: '#fdfcf7',
            padding: '0 6px',
            fontFamily: 'JetBrains Mono, ui-monospace, monospace',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: '#1a1a1a',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>{title}</div>
          <div style={{ flex: 1 }} />
          {/* zoom box */}
          <div style={{ width: 11, height: 11, background: '#fdfcf7', border: '1px solid #1a1a1a', flexShrink: 0 }} />
        </div>

        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// Mini analog clock window
const ClockWidget = ({ width = 160, rotate = 0, style, zIndex = 1, city = 'Shanghai', temp = '14°' }) => (
  <RetroWindow width={width} height={width} title="Clock" rotate={rotate} zIndex={zIndex} style={style}>
    <div style={{ width: '100%', height: '100%', position: 'relative', padding: 10 }}>
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%' }}>
        {/* tick marks */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          const x1 = 50 + Math.cos(a) * 42;
          const y1 = 50 + Math.sin(a) * 42;
          const x2 = 50 + Math.cos(a) * (i % 3 === 0 ? 36 : 39);
          const y2 = 50 + Math.sin(a) * (i % 3 === 0 ? 36 : 39);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1a1a1a" strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round" />;
        })}
        {/* hour hand */}
        <line x1="50" y1="50" x2="50" y2="28" stroke="#1d3a8a" strokeWidth="2.5" strokeLinecap="round" />
        {/* minute hand */}
        <line x1="50" y1="50" x2="68" y2="34" stroke="#1d3a8a" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="50" cy="50" r="2.5" fill="#1d3a8a" />
      </svg>
      <div style={{
        position: 'absolute', bottom: 6, left: 10, right: 10,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 8.5, color: '#1a1a1a',
      }}>
        <span>{city}</span><span>{temp}</span>
      </div>
    </div>
  </RetroWindow>
);

// Text editor window with content
const TextWindow = ({ width = 280, height = 180, title = 'About.txt', rotate = 0, zIndex = 1, style, children }) => (
  <RetroWindow width={width} height={height} title={title} rotate={rotate} zIndex={zIndex} style={style}>
    <div style={{
      padding: '14px 16px',
      fontFamily: 'JetBrains Mono, ui-monospace, monospace',
      fontSize: 11,
      lineHeight: 1.55,
      color: '#1a1a1a',
      height: '100%',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  </RetroWindow>
);

Object.assign(window, { RetroWindow, ClockWidget, TextWindow });

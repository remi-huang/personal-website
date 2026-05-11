// HERO V4 — Merged direction
// V1 nav (monospace + blue underline + scribble circle on contact)
// V3 slogan + info strip (serif + caveat hybrid)
// Left: text · Right: photos cluster

const HeroFinal = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#fdfbf5',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      color: '#1a1a1a',
    }}>
      {/* Paper grain */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence baseFrequency=\'0.9\' numOctaves=\'2\'/></filter><rect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'0.05\'/></svg>")',
        pointerEvents: 'none',
      }} />

      {/* ═══ NAV (from V1) ═══ */}
      <nav style={{
        position: 'absolute',
        top: 36, left: 56, right: 56,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 28,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        letterSpacing: '0.02em',
        zIndex: 20,
      }}>
        <a style={{ color: '#1a1a1a', textDecoration: 'none', position: 'relative', paddingBottom: 2 }}>
          about<ScribbleUnderline width={42} height={6} style={{ position: 'absolute', left: 0, bottom: -4 }} />
        </a>
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>built</a>
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>learned</a>
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>community</a>
        <div style={{ flex: 1 }} />
        <div style={{ position: 'relative', padding: '4px 14px' }}>
          <span style={{ position: 'relative', zIndex: 1 }}>contact</span>
          <ScribbleCircle width={90} height={36} style={{ position: 'absolute', top: -4, left: -8 }} />
        </div>
        <span style={{ marginLeft: 12, color: '#666' }}>EN / 中</span>
      </nav>

      {/* ═══ LEFT — Slogan + info ═══ */}
      <div style={{
        position: 'absolute',
        top: 160,
        left: 56,
        width: 720,
        zIndex: 10,
      }}>
        {/* Line 1 */}
        <div style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 68,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          whiteSpace: 'nowrap',
        }}>
          <span style={{ fontStyle: 'italic' }}>i build</span>
          <span> stuff </span>
          <span style={{
            fontFamily: 'Caveat, cursive',
            color: '#1d3a8a',
            fontSize: 76,
            fontStyle: 'normal',
            display: 'inline-block',
            transform: 'rotate(-3deg) translateY(4px)',
            lineHeight: 0.9,
            marginLeft: 8,
          }}>
            with AI
          </span>
        </div>
        {/* Line 2 */}
        <div style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 68,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          marginTop: 18,
          whiteSpace: 'nowrap',
        }}>
          <span>and </span>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontStyle: 'italic' }}>show you how</span>
            <ScribbleUnderline width={340} height={12} style={{ position: 'absolute', left: 0, bottom: -6 }} double />
          </span>
          <span style={{
            fontFamily: 'Caveat, cursive',
            color: '#1d3a8a',
            fontSize: 64,
            lineHeight: 0.9,
            marginLeft: 14,
            display: 'inline-block',
            verticalAlign: 'middle',
          }}>↓</span>
        </div>

        {/* Info strip (V3 style) */}
        <div style={{
          marginTop: 64,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 13,
          color: '#666',
          letterSpacing: '0.02em',
          lineHeight: 1.9,
        }}>
          <div>REMI &nbsp;//&nbsp; interdisciplinary designer &nbsp;//&nbsp; motion · app · web</div>
          <div>
            <span style={{ position: 'relative', display: 'inline-block', marginRight: 4 }}>
              london
              <ScribbleStrikethrough width={56} height={12} />
            </span>
            → shanghai &nbsp;//&nbsp; cocreator at an AI learning community (2k+ builders)
          </div>
        </div>

        {/* tiny scribbles by slogan */}
        <ScribbleSparkle size={18} style={{ position: 'absolute', top: -10, left: 380 }} />
        <ScribbleStar size={18} style={{ position: 'absolute', top: 110, left: 540, transform: 'rotate(12deg)' }} />
      </div>

      {/* ═══ RIGHT — Photo cluster ═══ */}
      <div style={{
        position: 'absolute',
        top: 140,
        right: 0,
        width: 620,
        height: 700,
      }}>
        {/* Back photo */}
        <PhotoPlaceholder
          width={220} height={270} hue={210}
          rotate={-6}
          label="portrait · 01"
          polaroid
          clip="red"
          style={{ left: 40, top: 70 }}
          zIndex={2}
        />
        {/* Main photo */}
        <PhotoPlaceholder
          width={260} height={320} hue={30}
          rotate={3}
          label="self · main"
          polaroid
          tape="top"
          caption="that's me —"
          style={{ left: 220, top: 0 }}
          zIndex={5}
        />
        {/* Side photo */}
        <PhotoPlaceholder
          width={200} height={240} hue={140}
          rotate={8}
          label="work · 03"
          polaroid={false}
          clip="yellow"
          style={{ left: 380, top: 280 }}
          zIndex={3}
        />

        {/* arrow pointing to main */}
        <ScribbleArrow dir="down-right" width={60} height={80} style={{
          position: 'absolute', top: 30, left: 160, transform: 'rotate(-15deg)',
        }} />
        {/* handwriting note */}
        <div style={{
          position: 'absolute',
          top: 14, left: 90,
          fontFamily: 'Caveat, cursive',
          fontSize: 24,
          color: '#1d3a8a',
          transform: 'rotate(-4deg)',
        }}>
          this is me ✦
        </div>
        {/* scribble doodles bottom */}
        <ScribbleScribble width={50} height={50} style={{ position: 'absolute', bottom: 30, left: 30 }} />
        <ScribbleSmiley size={28} style={{ position: 'absolute', bottom: 60, left: 110, transform: 'rotate(-8deg)' }} />
      </div>

      {/* scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: 56,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        color: '#888',
        letterSpacing: '0.05em',
      }}>
        ↓ scroll &nbsp;·&nbsp; what i built &nbsp;·&nbsp; what i learned &nbsp;·&nbsp; the community
      </div>
    </div>
  );
};

window.HeroFinal = HeroFinal;

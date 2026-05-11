// HERO V1 — Sketchbook
// Closest to ref image 1: rough hand-drawn vibe, photos clustered center,
// handwriting headline + monospace nav, lots of doodles in margins.

const HeroSketchbook = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#fdfbf5',
      backgroundImage: `
        radial-gradient(ellipse at 20% 10%, rgba(0,0,0,0.015) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 90%, rgba(0,0,0,0.02) 0%, transparent 50%)
      `,
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
      color: '#1a1a1a',
    }}>

      {/* Paper grain overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'><filter id=\'n\'><feTurbulence baseFrequency=\'0.9\' numOctaves=\'2\'/></filter><rect width=\'200\' height=\'200\' filter=\'url(%23n)\' opacity=\'0.06\'/></svg>")',
        pointerEvents: 'none',
      }} />

      {/* ═══ NAV ═══ */}
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

      {/* ═══ HEADLINE ═══ */}
      <div style={{
        position: 'absolute',
        top: 110,
        left: '50%',
        transform: 'translateX(-50%) rotate(-1deg)',
        fontFamily: 'Caveat, cursive',
        fontSize: 44,
        fontWeight: 500,
        color: '#1d3a8a',
        letterSpacing: '0.02em',
        textAlign: 'center',
        whiteSpace: 'nowrap',
      }}>
        hi — i'm remi, nice to meet you!
      </div>

      {/* ═══ NAME / META — top right of photos ═══ */}
      <div style={{
        position: 'absolute',
        top: 200,
        right: 200,
        fontFamily: 'Caveat, cursive',
        fontSize: 28,
        color: '#1d3a8a',
        transform: 'rotate(-2deg)',
        lineHeight: 1.1,
      }}>
        REMI, designer<br />
        <span style={{ position: 'relative' }}>
          AI × motion × web
          <ScribbleUnderline width={210} height={8} style={{ position: 'absolute', left: 0, bottom: -8 }} double />
        </span>
      </div>

      {/* arrow pointing to the photo cluster */}
      <ScribbleArrow dir="down-left" width={70} height={90} style={{
        position: 'absolute', top: 270, right: 320, transform: 'rotate(8deg)',
      }} />

      {/* ═══ PHOTO CLUSTER ═══ */}
      <div style={{
        position: 'absolute',
        top: 280,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 540,
        height: 380,
      }}>
        <PhotoPlaceholder
          width={210} height={250} hue={210}
          rotate={-7}
          label="portrait · 01"
          clip="red"
          style={{ left: 30, top: 40 }}
          zIndex={2}
        />
        <PhotoPlaceholder
          width={240} height={290} hue={30}
          rotate={2}
          label="self · main"
          tape="top"
          style={{ left: 160, top: 0 }}
          zIndex={4}
        />
        <PhotoPlaceholder
          width={180} height={220} hue={140}
          rotate={9}
          label="work · 03"
          clip="yellow"
          style={{ left: 340, top: 60 }}
          zIndex={3}
        />
      </div>

      {/* ═══ LOCATION (bottom-left) ═══ */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: 80,
        fontFamily: 'Kalam, cursive',
        fontSize: 22,
        color: '#1d3a8a',
        lineHeight: 1.3,
        transform: 'rotate(-2deg)',
      }}>
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 4 }}>
          location:
          <ScribbleUnderline width={92} height={6} style={{ position: 'absolute', left: 0, bottom: -6 }} />
        </div>
        <div>
          <span style={{ position: 'relative', display: 'inline-block', marginRight: 6 }}>
            <span>london</span>
            <ScribbleStrikethrough width={70} height={14} />
          </span>
          → SHANGHAI 🇨🇳
        </div>
      </div>

      {/* ═══ DOODLES (bottom-right) — bicycle + scribble like ref 1 ═══ */}
      <div style={{ position: 'absolute', bottom: 80, right: 100 }}>
        <ScribbleBicycle width={90} height={60} style={{ position: 'absolute', right: 0, bottom: 0 }} />
        <ScribbleScribble width={70} height={70} style={{ position: 'absolute', right: 100, bottom: 30 }} />
        <ScribbleStar size={20} style={{ position: 'absolute', right: 180, bottom: 70 }} />
      </div>

      {/* ═══ COMMUNITY badge — small handwritten note bottom-center-ish ═══ */}
      <div style={{
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%) rotate(-1deg)',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11,
        color: '#666',
        letterSpacing: '0.05em',
      }}>
        ↓ scroll for what i built &nbsp;·&nbsp; what i learned &nbsp;·&nbsp; the community
      </div>

      {/* tiny sparkle by headline */}
      <ScribbleSparkle size={16} style={{ position: 'absolute', top: 100, left: '46%' }} />
      <ScribbleSparkle size={14} style={{ position: 'absolute', top: 130, right: '42%' }} />

    </div>
  );
};

window.HeroSketchbook = HeroSketchbook;

// HERO V3 — Experimental: bold + cool + AI-flavored
// Same DNA but pushes harder — oversized handwriting headline,
// blue-ink "AI" wash treatment, asymmetric grid, photos cropped harder,
// terminal-style window mixed with handwriting. Most "front-edge".

const HeroExperimental = () => {
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

      {/* Subtle blue paper-bleed wash, top-right */}
      <div style={{
        position: 'absolute',
        top: -100, right: -100,
        width: 500, height: 400,
        background: 'radial-gradient(ellipse at center, rgba(29,58,138,0.10) 0%, transparent 60%)',
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      {/* ═══ NAV — left rail vertical ═══ */}
      <nav style={{
        position: 'absolute',
        top: 36, left: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        zIndex: 20,
      }}>
        <span style={{ display: 'inline-block', width: 8, height: 8, background: '#1d3a8a', borderRadius: '50%' }} />
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>about</a>
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>built</a>
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>learned</a>
        <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>community</a>
      </nav>
      <div style={{
        position: 'absolute',
        top: 36, right: 56,
        display: 'flex',
        gap: 16,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        zIndex: 20,
      }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'relative', zIndex: 1, padding: '6px 12px', display: 'inline-block' }}>contact</span>
          <ScribbleCircle width={110} height={36} style={{ position: 'absolute', top: -4, left: -8 }} />
        </div>
        <span style={{ marginLeft: 14, color: '#888', alignSelf: 'center' }}>EN · 中</span>
      </div>

      {/* ═══ MASSIVE HEADLINE ═══ */}
      <div style={{
        position: 'absolute',
        top: 110,
        left: 56,
        right: 56,
        zIndex: 10,
      }}>
        {/* Line 1 */}
        <div style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 88,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          display: 'flex',
          alignItems: 'baseline',
          gap: 18,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontStyle: 'italic' }}>i build</span>
          <span>stuff</span>
          <span style={{
            fontFamily: 'Caveat, cursive',
            color: '#1d3a8a',
            fontSize: 96,
            fontStyle: 'normal',
            display: 'inline-block',
            transform: 'rotate(-3deg)',
            lineHeight: 0.9,
          }}>
            with AI
          </span>
        </div>
        {/* Line 2 */}
        <div style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 88,
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: '#1a1a1a',
          marginTop: 14,
          display: 'flex',
          alignItems: 'baseline',
          gap: 16,
          flexWrap: 'wrap',
        }}>
          <span>and i</span>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ fontStyle: 'italic' }}>show you how</span>
            <ScribbleUnderline width={400} height={14} style={{ position: 'absolute', left: 0, bottom: -8 }} double />
          </span>
          <span style={{
            fontFamily: 'Caveat, cursive',
            color: '#1d3a8a',
            fontSize: 80,
            lineHeight: 0.9,
          }}>↓</span>
        </div>
      </div>

      {/* ═══ Tagline strip — small monospace ═══ */}
      <div style={{
        position: 'absolute',
        top: 360,
        left: 56,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13,
        color: '#666',
        letterSpacing: '0.02em',
        lineHeight: 1.7,
        zIndex: 10,
      }}>
        REMI &nbsp;//&nbsp; interdisciplinary designer &nbsp;//&nbsp; motion · app · web<br />
        <span style={{ position: 'relative', display: 'inline-block', marginRight: 4 }}>
          london
          <ScribbleStrikethrough width={56} height={12} />
        </span>
        → shanghai &nbsp;//&nbsp; cocreator at an AI learning community (2k+ builders)
      </div>

      {/* ═══ Photo cluster — right side, cropped tight ═══ */}
      <div style={{
        position: 'absolute',
        top: 430,
        left: 56,
        right: 56,
        height: 420,
      }}>
        {/* terminal-style window left */}
        <RetroWindow width={300} height={200} title="~/now-playing" rotate={-1.5} zIndex={4} style={{ left: 0, top: 80 }}>
          <div style={{
            padding: 14,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            lineHeight: 1.6,
            background: '#1a1a1a',
            color: '#9bc6ff',
            height: '100%',
          }}>
            <div>$ remi --status</div>
            <div style={{ color: '#fff' }}>{'→'} shipping a generative</div>
            <div style={{ color: '#fff' }}>&nbsp;&nbsp;motion tool · v0.3</div>
            <div style={{ marginTop: 8 }}>$ next</div>
            <div style={{ color: '#fff' }}>{'→'} tutorial: prompts</div>
            <div style={{ color: '#fff' }}>&nbsp;&nbsp;that don't suck</div>
            <div style={{ marginTop: 8, color: '#9bc6ff' }}>_</div>
          </div>
        </RetroWindow>

        <PhotoPlaceholder
          width={220} height={280} hue={210}
          rotate={2}
          label="self · 2026"
          polaroid={false}
          tape="top-left"
          style={{ left: 360, top: 30 }}
          zIndex={3}
        />

        <PhotoPlaceholder
          width={200} height={240} hue={30}
          rotate={-3}
          label="motion frame"
          polaroid={true}
          clip="blue"
          caption="generative loop, '26"
          style={{ left: 620, top: 100 }}
          zIndex={5}
        />

        <PhotoPlaceholder
          width={240} height={180} hue={140}
          rotate={1.5}
          label="community irl"
          polaroid={false}
          style={{ right: 0, top: 50 }}
          zIndex={2}
        />

        {/* arrow + handwriting note */}
        <div style={{
          position: 'absolute',
          top: 14, left: 360,
          fontFamily: 'Caveat, cursive',
          fontSize: 22,
          color: '#1d3a8a',
          transform: 'rotate(-4deg)',
        }}>
          ← it's me
        </div>
        <ScribbleStar size={22} style={{ position: 'absolute', top: 240, left: 580, transform: 'rotate(15deg)' }} />
        <ScribbleSmiley size={32} style={{ position: 'absolute', bottom: -10, right: 280, transform: 'rotate(-8deg)' }} />
      </div>

    </div>
  );
};

window.HeroExperimental = HeroExperimental;

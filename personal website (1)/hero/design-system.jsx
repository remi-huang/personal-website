// Design System spec — single page documenting tokens for the whole site.

const Swatch = ({ color, name, hex, note }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 140 }}>
    <div style={{ width: '100%', height: 100, background: color, border: '1px solid rgba(0,0,0,0.06)' }} />
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
      <div style={{ fontWeight: 500 }}>{name}</div>
      <div style={{ color: '#666' }}>{hex}</div>
      {note && <div style={{ color: '#888', marginTop: 2 }}>{note}</div>}
    </div>
  </div>
);

const TypeRow = ({ family, sample, size, weight = 400, italic = false, note, label }) => (
  <div style={{ display: 'flex', alignItems: 'baseline', gap: 24, padding: '20px 0', borderBottom: '1px solid #e8e3d6' }}>
    <div style={{ width: 180, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#666' }}>
      <div style={{ color: '#1a1a1a', fontWeight: 500 }}>{label}</div>
      <div>{family}</div>
      <div>{size}px / {weight}{italic ? ' italic' : ''}</div>
      {note && <div style={{ marginTop: 4, color: '#888' }}>{note}</div>}
    </div>
    <div style={{
      flex: 1,
      fontFamily: family,
      fontSize: size,
      fontWeight: weight,
      fontStyle: italic ? 'italic' : 'normal',
      color: '#1a1a1a',
      lineHeight: 1.1,
    }}>
      {sample}
    </div>
  </div>
);

const Section = ({ title, num, children }) => (
  <div style={{ marginBottom: 56 }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888' }}>{num}</span>
      <h2 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 28, fontWeight: 400, color: '#1a1a1a' }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: '#1d3a8a', marginLeft: 8 }} />
    </div>
    {children}
  </div>
);

const DesignSystem = () => {
  return (
    <div style={{
      width: '100%',
      minHeight: '100%',
      background: '#fdfbf5',
      padding: '60px 80px',
      fontFamily: 'Inter, sans-serif',
      color: '#1a1a1a',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 60 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#888', marginBottom: 8 }}>
          REMI · personal site
        </div>
        <h1 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 64, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>
          Design system <span style={{ fontStyle: 'italic' }}>v0.1</span>
        </h1>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 28, color: '#1d3a8a', marginTop: 16, transform: 'rotate(-1deg)', display: 'inline-block' }}>
          a sketchbook that knows how to behave on a screen ✦
        </div>
      </div>

      {/* COLORS */}
      <Section num="01" title="Colors">
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
          <Swatch color="#1d3a8a" name="ink-blue" hex="#1d3a8a" note="primary, all handwriting + scribbles" />
          <Swatch color="#1a1a1a" name="ink-black" hex="#1a1a1a" note="body text, window outlines" />
          <Swatch color="#fdfbf5" name="paper" hex="#fdfbf5" note="default background" />
          <Swatch color="#f4efe4" name="paper-warm" hex="#f4efe4" note="alt section bg" />
          <Swatch color="#666666" name="ink-soft" hex="#666666" note="meta / captions" />
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Swatch color="#d94a3a" name="clip-red" hex="#d94a3a" note="paperclip · accent only" />
          <Swatch color="#e8b73a" name="clip-yellow" hex="#e8b73a" note="paperclip · accent only" />
          <Swatch color="#3a8a4a" name="status-green" hex="#3a8a4a" note="online dots · sparingly" />
        </div>
        <div style={{ marginTop: 20, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', maxWidth: 600 }}>
          Rule: ink-blue carries 90% of accent weight. Reds/yellows are physical-object only (clips, tape). Never use blue for body text — only handwriting, decorations, and link affordances.
        </div>
      </Section>

      {/* TYPOGRAPHY */}
      <Section num="02" title="Typography">
        <TypeRow label="Display"        family="Instrument Serif" sample="i build stuff with AI" size={64} italic note="hero headlines · italics for emphasis" />
        <TypeRow label="Highlight"      family="Caveat"           sample="hi — i'm remi, nice to meet you!" size={42} weight={500} note="handwriting accents · names · pull-quotes" />
        <TypeRow label="Highlight alt"  family="Kalam"            sample="location: shanghai" size={28} weight={400} note="rougher handwriting · marginalia" />
        <TypeRow label="Body"           family="Inter"            sample="Designer who builds with AI. Motion, app, web — I share how I do it." size={17} weight={400} note="all paragraphs / nav fallback" />
        <TypeRow label="Mono"           family="JetBrains Mono"   sample="$ remi --status  → shipping v0.3" size={13} note="metadata · timestamps · UI chrome · windows" />
        <div style={{ marginTop: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', maxWidth: 600 }}>
          Pairing rule: ONE handwriting + ONE serif + ONE mono per page. Never mix Caveat and Kalam in the same line. Body always Inter. Replace any of these later — system is hot-swappable.
        </div>
      </Section>

      {/* DECORATIONS */}
      <Section num="03" title="Decorations">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 24 }}>
          {[
            { node: <ScribbleArrow dir="down-left" width={60} height={80} />, name: 'arrow' },
            { node: <ScribbleCircle width={110} height={45} />, name: 'circle' },
            { node: <div style={{ position: 'relative', display: 'inline-block' }}><span style={{ fontSize: 18 }}>highlight</span><ScribbleUnderline width={88} height={8} double style={{ position: 'absolute', left: 0, bottom: -4 }} /></div>, name: 'underline' },
            { node: <div style={{ position: 'relative', display: 'inline-block', fontSize: 18 }}>london<ScribbleStrikethrough width={56} height={14} /></div>, name: 'strike' },
            { node: <ScribbleBicycle />, name: 'bicycle' },
            { node: <ScribbleStar size={32} />, name: 'star' },
            { node: <ScribbleSparkle size={28} />, name: 'sparkle' },
            { node: <ScribbleScribble width={50} height={50} />, name: 'scribble ball' },
          ].map(d => (
            <div key={d.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 20, border: '1px dashed #d4cfc0' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80 }}>{d.node}</div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#666' }}>{d.name}</div>
            </div>
          ))}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888', maxWidth: 600 }}>
          All scribbles use a shared roughness filter so they read as drawn by the same pen on the same day. Density rule: max 5 doodles per viewport — restraint makes them feel deliberate.
        </div>
      </Section>

      {/* COMPONENTS */}
      <Section num="04" title="Components">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={{ padding: 24, background: '#f4efe4' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#888', marginBottom: 12 }}>PHOTO · polaroid + clip</div>
            <div style={{ position: 'relative', height: 240, display: 'flex', justifyContent: 'center' }}>
              <PhotoPlaceholder width={170} height={210} hue={210} rotate={-3} label="sample" clip="red" caption="example —" style={{ position: 'relative', left: 'auto', top: 'auto' }} />
            </div>
          </div>
          <div style={{ padding: 24, background: '#f4efe4' }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#888', marginBottom: 12 }}>WINDOW · clock</div>
            <div style={{ position: 'relative', height: 200, display: 'flex', justifyContent: 'center' }}>
              <ClockWidget width={140} city="Shanghai" temp="14°" style={{ position: 'relative', left: 'auto', top: 'auto' }} />
            </div>
          </div>
        </div>
      </Section>

      {/* SPACING / ROTATION RULES */}
      <Section num="05" title="Layout rules">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.7 }}>
          <div>
            <div style={{ color: '#1d3a8a', marginBottom: 8 }}>// ROTATION</div>
            <div>photos: −9° to +9°</div>
            <div>windows: −2° to +2°</div>
            <div>handwriting: −4° to +4°</div>
            <div>nothing axis-aligned except body text</div>
          </div>
          <div>
            <div style={{ color: '#1d3a8a', marginBottom: 8 }}>// SPACING</div>
            <div>edge gutter: 56px desktop / 24px mobile</div>
            <div>baseline grid: 8px</div>
            <div>section vertical: 96px</div>
            <div>photos overlap by 20-40px (intentional)</div>
          </div>
        </div>
      </Section>

    </div>
  );
};

window.DesignSystem = DesignSystem;

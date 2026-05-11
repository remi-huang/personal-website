// Responsive strategy explainer — answers "how does an irregular hero adapt?"

const Device = ({ width, height, label, scale = 1, children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
    <div style={{
      width: width * scale,
      height: height * scale,
      border: '1px solid #1a1a1a',
      background: '#fdfbf5',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '4px 4px 0 #1a1a1a',
    }}>
      <div style={{ width, height, transform: `scale(${scale})`, transformOrigin: 'top left', position: 'relative' }}>
        {children}
      </div>
    </div>
    <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#666' }}>{label}</div>
  </div>
);

// Schematic mockup — boxes + lines for layout demo
const SchematicHero = ({ variant = 'desktop' }) => {
  if (variant === 'desktop') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', padding: 24 }}>
        {/* nav bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ height: 6, width: 40, background: '#1a1a1a' }} />)}
          <div style={{ flex: 1 }} />
          <div style={{ height: 6, width: 50, background: '#1d3a8a' }} />
        </div>
        {/* headline */}
        <div style={{ height: 14, width: '70%', background: '#1d3a8a', marginBottom: 6, borderRadius: 2 }} />
        <div style={{ height: 14, width: '55%', background: '#1d3a8a', marginBottom: 24, borderRadius: 2 }} />
        {/* photos cluster */}
        <div style={{ position: 'relative', height: 220 }}>
          <div style={{ position: 'absolute', left: '15%', top: 30, width: 90, height: 110, background: '#c8d4e8', transform: 'rotate(-7deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
          <div style={{ position: 'absolute', left: '38%', top: 0, width: 110, height: 140, background: '#e8d4c8', transform: 'rotate(2deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
          <div style={{ position: 'absolute', left: '60%', top: 30, width: 95, height: 115, background: '#d4e8c8', transform: 'rotate(8deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
        </div>
      </div>
    );
  }
  if (variant === 'tablet') {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', padding: 18 }}>
        <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
          {[1,2,3].map(i => <div key={i} style={{ height: 5, width: 28, background: '#1a1a1a' }} />)}
          <div style={{ flex: 1 }} />
          <div style={{ height: 5, width: 30, background: '#1d3a8a' }} />
        </div>
        <div style={{ height: 11, width: '85%', background: '#1d3a8a', marginBottom: 5, borderRadius: 2 }} />
        <div style={{ height: 11, width: '65%', background: '#1d3a8a', marginBottom: 16, borderRadius: 2 }} />
        <div style={{ position: 'relative', height: 180 }}>
          <div style={{ position: 'absolute', left: '10%', top: 30, width: 70, height: 90, background: '#c8d4e8', transform: 'rotate(-5deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
          <div style={{ position: 'absolute', left: '38%', top: 0, width: 88, height: 110, background: '#e8d4c8', transform: 'rotate(2deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
          <div style={{ position: 'absolute', left: '67%', top: 30, width: 70, height: 92, background: '#d4e8c8', transform: 'rotate(6deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
        </div>
      </div>
    );
  }
  // mobile — vertical stack but still feels collaged
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 14, overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ height: 5, width: 24, background: '#1a1a1a' }} />
        <div style={{ height: 6, width: 14, background: '#1a1a1a' }} />
      </div>
      <div style={{ height: 9, width: '90%', background: '#1d3a8a', marginBottom: 4, borderRadius: 2 }} />
      <div style={{ height: 9, width: '70%', background: '#1d3a8a', marginBottom: 14, borderRadius: 2 }} />
      {/* photos stacked, mild offsets */}
      <div style={{ position: 'relative', height: 230, marginBottom: 12 }}>
        <div style={{ position: 'absolute', left: '8%', top: 0, width: 80, height: 100, background: '#c8d4e8', transform: 'rotate(-5deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
        <div style={{ position: 'absolute', left: '40%', top: 30, width: 90, height: 115, background: '#e8d4c8', transform: 'rotate(3deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
        <div style={{ position: 'absolute', left: '20%', top: 130, width: 85, height: 90, background: '#d4e8c8', transform: 'rotate(-3deg)', boxShadow: '2px 2px 0 #1a1a1a' }} />
      </div>
      {/* scribble + caption */}
      <div style={{ height: 6, width: '60%', background: '#1d3a8a', marginBottom: 4, borderRadius: 2 }} />
      <div style={{ height: 6, width: '40%', background: '#666', borderRadius: 2 }} />
    </div>
  );
};

const ResponsiveNote = () => (
  <div style={{
    width: '100%', minHeight: '100%', padding: '60px 80px',
    background: '#fdfbf5', fontFamily: 'Inter, sans-serif', color: '#1a1a1a',
  }}>
    <div style={{ marginBottom: 40 }}>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#888', marginBottom: 8 }}>
        REMI · responsive
      </div>
      <h1 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 56, fontWeight: 400, lineHeight: 1, letterSpacing: '-0.02em' }}>
        How does the irregular hero <span style={{ fontStyle: 'italic' }}>actually adapt?</span>
      </h1>
      <div style={{ fontFamily: 'Caveat, cursive', fontSize: 24, color: '#1d3a8a', marginTop: 14 }}>
        三种策略，回答你的疑问 ✦
      </div>
    </div>

    {/* Three breakpoint mockups */}
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 32, marginBottom: 56, flexWrap: 'wrap' }}>
      <Device width={1440} height={900} scale={0.32} label="Desktop · ≥1024px · 1440 design width">
        <SchematicHero variant="desktop" />
      </Device>
      <Device width={820} height={1100} scale={0.32} label="Tablet · 640–1023px · scaled-down desktop">
        <SchematicHero variant="tablet" />
      </Device>
      <Device width={390} height={780} scale={0.50} label="Mobile · <640px · re-stacked vertically">
        <SchematicHero variant="mobile" />
      </Device>
    </div>

    {/* Three strategies */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888' }}>01</span>
          <h3 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 22, fontWeight: 400 }}>Use relative units, not pixels</h3>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>
          Position photos with <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: '#f4efe4', padding: '1px 4px' }}>%</code> + <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: '#f4efe4', padding: '1px 4px' }}>vw / vh</code> instead of fixed px. The whole composition stretches & squashes proportionally — the layout looks "the same" at 1920 and 1280, just slightly tighter or roomier.
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888' }}>02</span>
          <h3 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 22, fontWeight: 400 }}>One scaled canvas (the safe path)</h3>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>
          Design the hero on a fixed 1440×900 stage, then wrap it in a div that <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: '#f4efe4', padding: '1px 4px' }}>transform: scale()</code>s to fit the viewport (with a min-scale floor). Trade-off: scales perfectly, but text gets smaller on small screens. Best for tablet ≥ 640px.
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#888' }}>03</span>
          <h3 style={{ margin: 0, fontFamily: 'Instrument Serif, serif', fontSize: 22, fontWeight: 400 }}>Re-stack on mobile (the right path)</h3>
        </div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#333' }}>
          Below 640px, ditch the absolute layout and re-author as a vertical narrative: headline → photo stack (still rotated, still overlapping a bit) → caption → location → doodle. Same DNA, different choreography. CSS <code style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, background: '#f4efe4', padding: '1px 4px' }}>@media (max-width: 640px)</code> swaps the layout out entirely.
        </div>
      </div>
    </div>

    <div style={{
      marginTop: 48, padding: 24, background: '#1a1a1a', color: '#fdfbf5',
      fontFamily: 'JetBrains Mono, monospace', fontSize: 12, lineHeight: 1.7,
    }}>
      <div style={{ color: '#9bc6ff', marginBottom: 8 }}>// my recommendation for you</div>
      Combine 1 + 3. Use a fluid relative-unit layout from 640px up (collage stays collage), and a re-stacked vertical layout below 640px (mobile gets a focused, scrollable story). Skip the scale-the-whole-thing approach — it makes text unreadable on phones. The next step after you approve a hero direction: I'll write the actual breakpoint CSS so you can see it morph live.
    </div>

  </div>
);

window.ResponsiveNote = ResponsiveNote;

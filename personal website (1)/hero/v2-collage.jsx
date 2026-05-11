// HERO V2 — Magazine collage
// Closer to ref image 2: photos + retro mac windows scattered around a clean
// top-row nav. Cleaner than V1, more "editorial". Some handwriting accents.

const HeroCollage = () => {
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

      {/* ═══ NAV — distributed across top, like ref 2 ═══ */}
      <div style={{
        position: 'absolute',
        top: 40, left: 56, right: 56,
        display: 'flex',
        alignItems: 'center',
        zIndex: 30,
      }}>
        {/* Logo: blue underline + name */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ width: 36, height: 3, background: '#1d3a8a' }} />
          <span style={{ fontFamily: 'Instrument Serif, serif', fontSize: 22, fontStyle: 'italic', color: '#1a1a1a' }}>Remi</span>
        </div>

        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 38, fontFamily: 'Instrument Serif, serif', fontSize: 17 }}>
          <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>About</a>
          <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>Built</a>
          <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>Diary</a>
          <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>Tutorials</a>
          <a style={{ color: '#1a1a1a', textDecoration: 'none' }}>Community</a>
        </div>

        <div style={{ display: 'flex', gap: 18, fontFamily: 'Instrument Serif, serif', fontSize: 17 }}>
          <span>Contact</span>
          <span style={{ color: '#888' }}>EN / 中</span>
        </div>
      </div>

      {/* ═══ TEXT EDITOR WINDOW — top-left, intro bio ═══ */}
      <TextWindow
        width={300} height={200}
        title="about-remi.txt"
        rotate={-1.5}
        zIndex={5}
        style={{ left: 80, top: 130 }}
      >
        <div style={{ marginBottom: 8 }}>Remi — designer who builds</div>
        <div style={{ marginBottom: 8 }}>with AI.</div>
        <div style={{ marginBottom: 8 }}>Motion · App · Web.</div>
        <div style={{ marginBottom: 8 }}>
          <span style={{ position: 'relative', display: 'inline-block', marginRight: 4 }}>
            London
            <ScribbleStrikethrough width={48} height={12} />
          </span>
          → Shanghai.
        </div>
        <div style={{ color: '#666', marginTop: 12, fontSize: 10 }}>
          {'>'}  cocreator · 2k+ AI community
        </div>
      </TextWindow>

      {/* ═══ MAIN PHOTO — center-left big ═══ */}
      <PhotoPlaceholder
        width={290} height={340} hue={220}
        rotate={1}
        label="hero · main"
        polaroid={false}
        style={{ left: 420, top: 120 }}
        zIndex={3}
      />

      {/* PLAY label like ref 2 */}
      <div style={{
        position: 'absolute',
        top: 280,
        left: 680,
        fontFamily: 'Instrument Serif, serif',
        fontStyle: 'italic',
        fontSize: 22,
        color: '#fdfbf5',
        letterSpacing: '0.05em',
        zIndex: 4,
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
      }}>
        ▸ play reel
      </div>

      {/* ═══ CLOCK — top-right ═══ */}
      <ClockWidget
        width={150}
        rotate={2}
        zIndex={5}
        city="Shanghai"
        temp="14°C"
        style={{ right: 140, top: 130 }}
      />

      {/* ═══ SECONDARY PHOTO — center-bottom ═══ */}
      <PhotoPlaceholder
        width={200} height={250} hue={20}
        rotate={-2}
        label="work · clip"
        polaroid={true}
        tape="top-right"
        caption="latest piece —"
        style={{ left: 580, top: 470 }}
        zIndex={6}
      />

      {/* ═══ SQUARE PHOTO — right-bottom ═══ */}
      <PhotoPlaceholder
        width={260} height={180} hue={195}
        rotate={1.5}
        label="behind the scenes"
        polaroid={false}
        style={{ right: 90, top: 430 }}
        zIndex={3}
      />

      {/* ═══ SMALL COMMUNITY WINDOW — bottom-left ═══ */}
      <TextWindow
        width={240} height={130}
        title="community.log"
        rotate={1.5}
        zIndex={5}
        style={{ left: 130, top: 530 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3a8a4a' }} />
          <span>2,148 members online</span>
        </div>
        <div style={{ color: '#666', marginBottom: 4 }}>{'>'} new tutorial dropped</div>
        <div style={{ color: '#666', marginBottom: 4 }}>{'>'} 14 builds this week</div>
        <div style={{ fontFamily: 'Caveat, cursive', fontSize: 16, color: '#1d3a8a', marginTop: 6 }}>
          join us →
        </div>
      </TextWindow>

      {/* hand-drawn flourishes */}
      <div style={{
        position: 'absolute',
        top: 410,
        left: 380,
        fontFamily: 'Caveat, cursive',
        fontSize: 24,
        color: '#1d3a8a',
        transform: 'rotate(-6deg)',
      }}>
        i build with AI ✦
      </div>
      <ScribbleArrow dir="down-right" width={50} height={70} color="#1d3a8a" style={{
        position: 'absolute', top: 440, left: 540, transform: 'rotate(15deg)',
      }} />

      <ScribbleSparkle size={18} style={{ position: 'absolute', top: 380, right: 360 }} />
      <ScribbleStar size={20} style={{ position: 'absolute', bottom: 90, left: 480, transform: 'rotate(15deg)' }} />

    </div>
  );
};

window.HeroCollage = HeroCollage;

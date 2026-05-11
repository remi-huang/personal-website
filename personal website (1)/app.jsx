const HeroVideo = () => {
  const videoRef = React.useRef(null);

  const seekToLastFrame = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.pause();
    video.currentTime = Math.max(video.duration - 0.04, 0);
  };

  const playOnce = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <video
      ref={videoRef}
      src="uploads/hero-video.mov"
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-label="Remi hero motion portrait"
      onEnded={seekToLastFrame}
      onMouseEnter={playOnce}
      onFocus={playOnce}
      onMouseLeave={seekToLastFrame}
    />
  );
};

const LANGUAGE_KEY = 'remi-site-language';
const TALLY_FORM_URL = 'https://tally.so/r/VLv8bN';

const getRouteFromHash = () => {
  if (window.location.hash === '#blog') return 'blog';
  if (window.location.hash === '#contact') return 'contact';
  return 'home';
};

const copy = {
  en: {
    nav: {
      about: 'about',
      built: 'built',
      learned: 'blog',
      community: 'community',
      contact: 'contact',
      menu: 'menu',
      close: 'close',
    },
    hero: {
      line1Em: 'I design',
      line1Script: 'with AI',
      line2Start: 'and',
      line2Em: 'show you how',
      meta: "case studies · tool reviews · what's new in AI design",
      portraitName: <>Hi,<br />it is Remi</>,
      portraitRole: "let's make fun things with AI together",
      scrollCue: '↓ scroll  ·  what i built  ·  what i learned  ·  the community',
    },
    newsletter: {
      aria: 'Weekly AI and design newsletter signup',
      placeholder: 'email',
      emailLabel: 'Email address',
      submitting: 'saving',
      submit: 'join list',
      saved: "thanks — you're on the list",
      error: "couldn't save yet · try again after deploy",
    },
    built: {
      aria: 'What I built',
      kicker: 'what i built · 01',
      appDescription: 'A manifestation app for writing down what you want to call in, with a tiny record-player ritual that makes each intention feel set in motion.',
      appStoreLabel: 'Download one moment on the App Store',
      tapHint: 'tap to play',
      buildLabel: 'behind the build',
      buildText: "prompts, polish, App Store fixes — and what I'd do differently next time",
      buildLink: 'Read build notes',
      buildAria: 'Read how one moment was built',
      backToApps: 'back to apps',
    },
    products: {
      brewing: 'Brewing',
    },
  },
  zh: {
    nav: {
      about: '关于',
      built: '作品',
      learned: 'blog',
      community: '社群',
      contact: '联系',
      menu: '菜单',
      close: '关闭',
    },
    hero: {
      line1Em: 'I design',
      line1Script: 'with AI',
      line2Start: 'and',
      line2Em: 'show you how',
      meta: '案例拆解 · AI工具 · AI 设计新资讯',
      portraitName: <>嗨，<br />我是 Remi！</>,
      portraitRole: <>一起来用 AI 做点<br />好玩的～</>,
      scrollCue: '↓ 继续看  ·  我做了什么  ·  我学到了什么  ·  社群',
    },
    newsletter: {
      aria: 'AI 设计 newsletter 邮箱收集',
      placeholder: '邮箱',
      emailLabel: '邮箱地址',
      submitting: '保存中',
      submit: '加入名单',
      saved: '收到啦 — 已加入名单',
      error: '暂时保存失败 · 部署后再试一次',
    },
    built: {
      aria: '我做了什么',
      kicker: '我做了什么 · 01',
      appDescription: '一个 manifestation app：写下你想实现的目标，再用一个小小的唱片机仪式感，让这个 intention 像被正式启动一样。',
      appStoreLabel: '在 App Store 下载 one moment',
      tapHint: '点一下我',
      buildLabel: '制作过程',
      buildText: 'prompts、视觉打磨、App Store 审核修复，以及我下次会怎么做',
      buildLink: '阅读制作笔记',
      buildAria: '阅读 one moment 的制作过程',
      backToApps: '返回 apps',
    },
    products: {
      brewing: '搭建中',
    },
  },
};

const getInitialLanguage = () => {
  try {
    const saved = window.localStorage.getItem(LANGUAGE_KEY);
    return saved === 'zh' ? 'zh' : 'en';
  } catch (error) {
    return 'en';
  }
};

const saveLanguage = (lang) => {
  try {
    window.localStorage.setItem(LANGUAGE_KEY, lang);
  } catch (error) {}
};

const NewsletterSignup = ({ text }) => {
  const [status, setStatus] = React.useState('idle');

  React.useEffect(() => {
    const resetAfterBackNavigation = () => setStatus('idle');

    window.addEventListener('pageshow', resetAfterBackNavigation);
    return () => window.removeEventListener('pageshow', resetAfterBackNavigation);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const targetUrl = new URL(TALLY_FORM_URL);

    targetUrl.searchParams.set('email', email);
    targetUrl.searchParams.set('source', 'hero-newsletter');
    setStatus('submitting');
    window.location.href = targetUrl.toString();
  };

  return (
    <form
      className="newsletter-signup"
      action={TALLY_FORM_URL}
      method="GET"
      onSubmit={handleSubmit}
      aria-label={text.aria}
    >
      <input type="hidden" name="source" value="hero-newsletter" />
      <div className="newsletter-row">
        <input type="email" name="email" placeholder={text.placeholder} aria-label={text.emailLabel} required />
        <button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? text.submitting : text.submit}
        </button>
      </div>
      {status === 'saved' && <div className="newsletter-status">{text.saved}</div>}
      {status === 'error' && <div className="newsletter-status">{text.error}</div>}
    </form>
  );
};

const appProducts = [
  {
    id: 'released',
    name: 'one moment',
    status: 'on the App Store',
    category: 'mindful iOS app',
    rating: '4.8',
    reviews: 'early notes',
    reviewTitle: 'A tiny shipped app, not a mockup',
    reviewBody:
      'One Moment is my first App Store release: a small iOS app made with AI help, product judgment, and enough Apple paperwork to make the idea real.',
    buildTitle: 'How I made it',
    buildBody:
      'The build notes unpack the prompts, interface decisions, Xcode handoff, App Store review fixes, and the parts I would do differently next time.',
  },
  {
    id: 'brewing',
    name: 'Brewing',
    status: 'in progress',
    category: 'next experiment',
  },
];

const HomeAppIcon = ({ product, selected, onSelect, label }) => (
  <button
    type="button"
    className={`home-app home-app--${product.id} ${selected ? 'is-selected' : ''}`}
    onClick={() => onSelect(product)}
    aria-pressed={selected}
  >
    {product.id === 'released' ? (
      <img className="home-app-icon" src="uploads/onemoment-icon.png" alt="" />
    ) : (
      <span className="home-app-icon home-app-icon--brewing" aria-hidden="true" />
    )}
    <span className="home-app-name">{label || product.name}</span>
  </button>
);

const LanguageSwitch = ({ lang, onChange }) => (
  <span className="lang-switch" aria-label="Language switch">
    <button type="button" className={lang === 'en' ? 'is-active' : ''} onClick={() => onChange('en')}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" className={lang === 'zh' ? 'is-active' : ''} onClick={() => onChange('zh')}>中</button>
  </span>
);

const SiteNav = ({ lang, text, activeSection, menuOpen, onMenuToggle, onCloseMenu, onLanguageChange }) => {
  const renderNavLabel = (id, label) => (
    <>
      {label}
      {activeSection === id && (
        <ScribbleUnderline width={42} height={6} style={{ position: 'absolute', left: 0, bottom: -7 }} />
      )}
    </>
  );

  return (
    <nav className={`hero-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
      <button
        type="button"
        className="hero-nav-toggle"
        aria-expanded={menuOpen}
        aria-controls="hero-nav-items"
        aria-label={menuOpen ? text.nav.close : text.nav.menu}
        onClick={onMenuToggle}
      >
        <span className="hero-nav-toggle-bars" aria-hidden="true">
          <span></span><span></span><span></span>
        </span>
        <span className="hero-nav-toggle-label">{menuOpen ? text.nav.close : text.nav.menu}</span>
      </button>
      <div className="hero-nav-items" id="hero-nav-items">
        <a className={activeSection === 'about' ? 'nav-active' : ''} href="#about" onClick={onCloseMenu}>
          {renderNavLabel('about', text.nav.about)}
        </a>
        <a className={activeSection === 'built' ? 'nav-active' : ''} href="#built" onClick={onCloseMenu}>
          {renderNavLabel('built', text.nav.built)}
        </a>
        <a className={activeSection === 'blog' ? 'nav-active' : ''} href="#blog" onClick={onCloseMenu}>
          {renderNavLabel('blog', text.nav.learned)}
        </a>
        <a href="https://pathunfold.com/remi" onClick={onCloseMenu}>{text.nav.community}</a>
        <span className="nav-spacer" aria-hidden="true" />
        <a className={`nav-contact ${activeSection === 'contact' ? 'nav-active' : ''}`} href="#contact" onClick={onCloseMenu}>
          <span style={{ position: 'relative', zIndex: 1 }}>{text.nav.contact}</span>
          {activeSection === 'contact' && (
            <ScribbleCircle
              width={lang === 'zh' ? 64 : 90}
              height={34}
              style={{ position: 'absolute', top: -7, left: lang === 'zh' ? -12 : -14 }}
            />
          )}
        </a>
        <LanguageSwitch lang={lang} onChange={onLanguageChange} />
      </div>
    </nav>
  );
};

const WhatIBuiltSection = ({ lang }) => {
  const text = copy[lang].built;
  const [selectedProduct, setSelectedProduct] = React.useState(appProducts[0]);
  const [previewMode, setPreviewMode] = React.useState('home');
  const [hasEntered, setHasEntered] = React.useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    if (!sectionRef.current) return;
    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true);
      return;
    }
    const node = sectionRef.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setPreviewMode(product.id === 'released' ? 'demo' : 'home');
  };

  return (
    <section
      ref={sectionRef}
      className={`built-section ${hasEntered ? 'has-entered' : ''}`}
      id="built"
      aria-label={text.aria}
    >
      <div className="built-inner">
        <div className="built-layout">
          <div className="built-copy">
            <div className="section-kicker">{text.kicker}</div>
            <div className="product-intro">
              <h3>one moment</h3>
              <p>
                {text.appDescription}
              </p>
              <a
                className="app-store-badge"
                href="https://apps.apple.com/cn/app/one-moment/id6761523793?l=en-GB"
                aria-label={text.appStoreLabel}
              >
                <svg viewBox="0 0 180 54" role="img" aria-hidden="true">
                  <rect width="180" height="54" rx="9" fill="#050505" />
                  <path fill="#fdfbf5" d="M35.5 26.9c-.1-4 3.3-6 3.5-6.1-1.9-2.8-4.8-3.1-5.8-3.2-2.5-.2-4.8 1.4-6.1 1.4-1.2 0-3.2-1.4-5.2-1.3-2.7 0-5.2 1.6-6.6 4-2.8 4.9-.7 12.2 2 16.2 1.3 2 2.9 4.1 5 4 2-.1 2.8-1.3 5.2-1.3s3.1 1.3 5.2 1.2c2.2 0 3.5-2 4.9-3.9 1.5-2.2 2.1-4.3 2.1-4.4-.1-.1-4.1-1.6-4.2-6.6Zm-4-12c1.1-1.3 1.8-3.1 1.6-4.9-1.5.1-3.3 1-4.4 2.3-1 1.1-1.8 3-1.6 4.7 1.7.1 3.3-.8 4.4-2.1Z" />
                  <text x="50" y="21" fill="#fdfbf5" fontFamily="Inter, Arial, sans-serif" fontSize="10" letterSpacing=".2">Download on the</text>
                  <text x="50" y="39" fill="#fdfbf5" fontFamily="Inter, Arial, sans-serif" fontSize="22" fontWeight="600">App Store</text>
                </svg>
              </a>
            </div>
            <a className="build-entry" href="#blog" aria-label={text.buildAria}>
              <span className="build-entry-label">{text.buildLabel}</span>
              <span className="build-entry-text">{text.buildText}</span>
              <span className="build-entry-link">{text.buildLink} <span aria-hidden="true">→</span></span>
            </a>
          </div>

          <div className="phone-shell" aria-label="iPhone home screen product shelf">
            <div className="phone-tap-hint" aria-hidden="true">
              <span className="phone-tap-hint-label">{text.tapHint}</span>
              <ScribbleArrow dir="down" width={26} height={42} style={{ marginTop: 2, marginLeft: 8 }} />
            </div>
            <svg className="phone-scribble-frame phone-scribble-frame--outer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <g fill="none" stroke="#1d3a8a" strokeLinecap="round" strokeLinejoin="round">
                <path vectorEffect="non-scaling-stroke" d="M 11 0.8 C 4.8 0.8 0.9 4.9 0.9 11 L 0.9 89 C 0.9 95.2 4.8 99.1 11 99.1 L 89 99.1 C 95.2 99.1 99.1 95.2 99.1 89 L 99.1 11 C 99.1 4.9 95.2 0.8 89 0.8 Z" />
              </g>
            </svg>
            <div className="phone-screen">
              {previewMode === 'demo' ? (
                <video
                  className="phone-demo-video"
                  src="uploads/onemoment-demo.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="one moment app feature recording"
                />
              ) : (
                <img className="phone-wallpaper" src="uploads/iphone-home.png?v=20260504" alt="iPhone home screen with one moment app" />
              )}
              <svg className="phone-scribble-frame phone-scribble-frame--inner" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <g fill="none" stroke="#1d3a8a" strokeLinecap="round" strokeLinejoin="round">
                  <path vectorEffect="non-scaling-stroke" d="M 11 0.8 C 4.8 0.8 0.9 4.9 0.9 11 L 0.9 89 C 0.9 95.2 4.8 99.1 11 99.1 L 89 99.1 C 95.2 99.1 99.1 95.2 99.1 89 L 99.1 11 C 99.1 4.9 95.2 0.8 89 0.8 Z" />
                </g>
              </svg>
              <div className="home-app-layer" aria-label="Product app icons">
                {appProducts.map((product) => (
                  <HomeAppIcon
                    key={product.id}
                    product={product}
                    label={product.id === 'brewing' ? copy[lang].products.brewing : product.name}
                    selected={selectedProduct.id === product.id}
                    onSelect={handleProductSelect}
                  />
                ))}
              </div>
              {previewMode === 'demo' && (
                <button type="button" className="phone-home-button" onClick={() => setPreviewMode('home')}>
                  {text.backToApps}
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const BlogArticle = ({ lang }) => {
  const templateId = lang === 'zh' ? 'blog-zh-template' : 'blog-en-template';
  const [html, setHtml] = React.useState('');
  const articleRef = React.useRef(null);

  React.useEffect(() => {
    const template = document.getElementById(templateId);
    setHtml(template ? template.innerHTML : '');
  }, [templateId]);

  React.useEffect(() => {
    const rail = articleRef.current?.querySelector('.build-photo-rail');
    if (!rail) return;

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const stopDragging = () => {
      isDragging = false;
      rail.classList.remove('is-dragging');
    };

    const handlePointerDown = (event) => {
      isDragging = true;
      startX = event.clientX;
      startScrollLeft = rail.scrollLeft;
      rail.classList.add('is-dragging');
      rail.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMove = (event) => {
      if (!isDragging) return;
      event.preventDefault();
      rail.scrollLeft = startScrollLeft - (event.clientX - startX);
    };

    rail.addEventListener('pointerdown', handlePointerDown);
    rail.addEventListener('pointermove', handlePointerMove);
    rail.addEventListener('pointerup', stopDragging);
    rail.addEventListener('pointercancel', stopDragging);
    rail.addEventListener('pointerleave', stopDragging);

    return () => {
      rail.removeEventListener('pointerdown', handlePointerDown);
      rail.removeEventListener('pointermove', handlePointerMove);
      rail.removeEventListener('pointerup', stopDragging);
      rail.removeEventListener('pointercancel', stopDragging);
      rail.removeEventListener('pointerleave', stopDragging);
    };
  }, [html]);

  return (
    <article
      ref={articleRef}
      className="article-wrap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const ContactPage = ({ lang }) => (
  <section className="contact-page" aria-label="Contact Remi">
    <div className="contact-note">
      <div className="contact-title">{lang === 'zh' ? '歡迎聯繫；）' : 'welcome to contact ;)'}</div>
      <a className="contact-email" href="mailto:remi.rx@hotmail.com">remi.rx@hotmail.com</a>
    </div>
  </section>
);

const SiteHero = () => {
  const [lang, setLang] = React.useState(getInitialLanguage);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [route, setRoute] = React.useState(getRouteFromHash);
  const [activeSection, setActiveSection] = React.useState('about');
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);
  const text = copy[lang];

  const handleLanguageChange = (nextLang) => {
    setLang(nextLang);
    saveLanguage(nextLang);
    setMenuOpen(false);
  };

  React.useEffect(() => {
    const handleHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  React.useEffect(() => {
    if (route !== 'home') return;
    window.requestAnimationFrame(() => {
      const targetId = window.location.hash === '#built' ? 'built' : 'about';
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }, [route]);

  React.useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  React.useEffect(() => {
    if (route === 'blog') {
      document.title = lang === 'zh'
        ? 'Vibe Coding 实战教程：我用 AI 一周做出第一个 iOS App 并上架 App Store · Remi'
        : 'Vibe Coding Case Study: I built and shipped my first iOS app with AI in one week · Remi';
      return;
    }
    if (route === 'contact') {
      document.title = 'Contact · Remi';
      return;
    }
    document.title = 'Remi · Personal Site';
  }, [lang, route]);

  React.useEffect(() => {
    if (route === 'contact') {
      setActiveSection('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (route === 'blog') {
      setActiveSection('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const built = document.getElementById('built');
    if (!built || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      setActiveSection(entry.isIntersecting ? 'built' : 'about');
    }, {
      rootMargin: '-42% 0px -45% 0px',
      threshold: 0,
    });

    observer.observe(built);
    return () => observer.disconnect();
  }, [route]);

  return (
    <main className="site-shell">
      <SiteNav
        lang={lang}
        text={text}
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((prev) => !prev)}
        onCloseMenu={closeMenu}
        onLanguageChange={handleLanguageChange}
      />
      {route === 'blog' ? (
        <BlogArticle lang={lang} />
      ) : route === 'contact' ? (
        <ContactPage lang={lang} />
      ) : (
        <>
      <section className="hero" id="about" aria-label="Remi personal site hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-title">
              <span className="hero-title-line">
                <em>{text.hero.line1Em}</em> <span className="script-accent">{text.hero.line1Script}</span>
              </span>
              <span className="hero-title-line">
                {text.hero.line2Start}{' '}
                <span className="underlined-phrase">
                  <em>{text.hero.line2Em}</em>
                  <ScribbleUnderline width={340} height={12} style={{ position: 'absolute', left: 0, bottom: -8 }} double />
                </span>
                <span className="down-mark">↓</span>
              </span>
            </h1>

            <div className="hero-meta" aria-label="Remi profile summary">
              <div>{text.hero.meta}</div>
              <NewsletterSignup text={text.newsletter} />
            </div>

            <div className="hero-sparkle-one">
              <ScribbleSparkle size={18} />
            </div>
            <div className="hero-sparkle-two">
              <ScribbleStar size={18} />
            </div>
          </div>

          <div className="photo-cluster" aria-label="Remi motion portrait">
            <article className="photo-card photo-main">
              <HeroVideo />
            </article>
            <div className="portrait-note">
              <div className="portrait-name">
                {text.hero.portraitName}
              </div>
              <div className="portrait-role">{text.hero.portraitRole}</div>
            </div>
            <div className="portrait-arrow">
              <ScribbleArrow dir="down-right" width={70} height={90} />
            </div>
          </div>
        </div>
      </section>
      <WhatIBuiltSection lang={lang} />
        </>
      )}
    </main>
  );
};

const App = () => <SiteHero />;

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

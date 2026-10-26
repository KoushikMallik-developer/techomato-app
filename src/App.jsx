import { useEffect, useState } from 'react';
import { PROPERTIES, GAMES, APPS, APP_CATEGORIES, TEAM, FOUNDER_NOTE, SITE_NAME, TAGLINE } from './config.js';
import { Logo, Icon } from './components/Brand.jsx';
import AppLogo from './components/AppLogo.jsx';

const HERO_APPS = ['docs', 'sheets', 'slides', 'photo', 'video', 'audio', 'todo', 'paint', '3d'];
const LIVE_APPS = APPS.filter((a) => a.status === 'available').length;

const WHY = [
  ['download', 'Nothing to install', 'Games and apps open in a browser tab. Click a link and you are in.'],
  ['phone', 'Phone or computer', 'Touch controls on phones, keyboard, mouse or gamepad on a computer.'],
  ['save', 'Your work stays with you', 'Apps autosave on your device, and open and save familiar files like Word, Excel, PowerPoint and PDF.'],
  ['users', 'Play with friends', 'Online games use short room codes. Share one and everyone joins the same match.'],
  ['key', 'Private by design', 'Apps like Vault encrypt your data in the browser, and your documents are kept on your device.'],
  ['bolt', 'Same look everywhere', 'One design language across every Techomato site, so everything feels familiar.'],
];

const FAQ = [
  ['Is Techomato free?', 'The games are free to play, and the browser apps open straight from the Softwares site.'],
  ['Do I need to download anything?', 'No. Everything runs in your browser. A Windows desktop suite is planned and shown as coming soon.'],
  ['Where is my data saved?', 'Apps save on your own device, in your browser. Use the export and backup options inside each app to keep a copy.'],
  ['Which browsers work best?', 'Any modern browser: Chrome, Edge, Firefox or Safari, on desktop or phone.'],
  ['What is Techomato Labs?', 'Our space for experiments and early builds. Things there may change or be unfinished.'],
];

const reduceMotion = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

// light / dark, like the other Techomato apps: follows the system until the visitor picks one
function useTheme() {
  const [theme, setTheme] = useState(() => { try { return localStorage.getItem('techomato-theme') || ''; } catch { return ''; } });
  useEffect(() => {
    if (theme) document.documentElement.setAttribute('data-theme', theme);
    else document.documentElement.removeAttribute('data-theme');
    try { if (theme) localStorage.setItem('techomato-theme', theme); } catch { /* storage blocked */ }
  }, [theme]);
  const dark = theme ? theme === 'dark' : typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches;
  return [dark, () => setTheme(dark ? 'light' : 'dark')];
}

// tiny path router: "/" is the home page, "/about" the About page
const norm = (p) => (p.length > 1 ? p.replace(/\/+$/, '') : p) || '/';
function usePath() {
  const [path, setPath] = useState(() => norm(window.location.pathname));
  useEffect(() => {
    const on = () => setPath(norm(window.location.pathname));
    window.addEventListener('popstate', on);
    return () => window.removeEventListener('popstate', on);
  }, []);
  return path;
}
function navigate(to) {
  if (norm(window.location.pathname) !== to) window.history.pushState({}, '', to);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}
const link = (to) => (e) => {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
  e.preventDefault();
  navigate(to);
};
// scroll to a home-page section, going home first when on another page
const jump = (id) => (e) => {
  e.preventDefault();
  const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (norm(window.location.pathname) === '/') go();
  else { navigate('/'); setTimeout(go, 80); }
};

const VALUES = [
  ['download', 'Open from the first click', 'No installs, no sign-up walls. If it takes more than a click to start, we keep working on it.'],
  ['save', 'Your data stays yours', 'Apps keep your work on your own device and let you export it in formats you already use.'],
  ['gamepad', 'Built to be enjoyed', 'Games and apps should feel good to use: fast, clear and a little bit playful.'],
  ['bolt', 'One design language', 'Every Techomato site shares the same look, type and components, so nothing feels like a stranger.'],
];
const SWATCHES = [['Paper', '#F5F2EC'], ['Ink', '#17181C'], ['Tomato', '#C8381F'], ['Leaf', '#2F5D3A']];

function About() {
  useEffect(() => {
    const prev = document.title;
    document.title = 'About us – Techomato';
    return () => { document.title = prev; };
  }, []);
  const stats = [[GAMES.length, 'games'], [LIVE_APPS, 'browser apps'], [PROPERTIES.length, 'sites'], [0, 'installs needed']];
  return (
    <>
      <section className="t-wrap t-about-hero">
        <span className="t-eyebrow t-reveal">About us</span>
        <h1 className="t-h1 t-hero-h t-reveal">We build things that<br /><span className="t-accent">open in a tab.</span></h1>
        <p className="t-lead t-ink2 t-reveal t-reveal-2">Techomato makes games, everyday software and experiments for the web. Our goal is simple: great tools and great play, one click away, on any device.</p>
        <div className="t-stats t-reveal t-reveal-3">
          {stats.map(([n, l]) => <div key={l}><span className="t-big">{n}</span><span className="t-small t-muted">{l}</span></div>)}
        </div>
      </section>

      <section className="t-band">
        <div className="t-wrap t-section">
          <div className="t-stack t-sec-head" style={{ gap: 8 }}>
            <span className="t-eyebrow">What we make</span>
            <h2 className="t-h2">Three sites, one team</h2>
          </div>
          <div className="t-g3">
            {[
              [PROPERTIES[0], 'Free 3D games that run in the browser, on a phone or a computer, with online rooms to play with friends.'],
              [PROPERTIES[1], 'A suite of everyday apps: documents, spreadsheets, slides, creative studios, utilities and more.'],
              [PROPERTIES[2], 'A space for experiments, prototypes and early builds before they become products.'],
            ].map(([p, text]) => (
              <a key={p.id} href={p.url} className="t-card t-perk t-about-site">
                <span className="t-perk-ic"><Icon name={p.icon} size={22} /></span>
                <h3 className="t-h3">{p.title}</h3>
                <p className="t-ink2">{text}</p>
                <span className="t-game-go">{p.cta} <Icon name="arrow" size={16} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="t-wrap t-section">
        <div className="t-stack" style={{ gap: 8, marginBottom: 28 }}>
          <span className="t-eyebrow">What we care about</span>
          <h2 className="t-h2">How we work</h2>
        </div>
        <div className="t-grid-games">
          {VALUES.map(([ic, h, p]) => (
            <div key={h} className="t-card t-perk">
              <span className="t-perk-ic"><Icon name={ic} size={22} /></span>
              <h3 className="t-h3">{h}</h3>
              <p className="t-ink2">{p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="t-band">
        <div className="t-wrap t-section">
          <div className="t-stack t-sec-head" style={{ gap: 8 }}>
            <span className="t-eyebrow">The team</span>
            <h2 className="t-h2">Meet the founder</h2>
          </div>
          <div className="t-team">
            {TEAM.map((m) => (
              <div key={m.name} className="t-card t-member">
                <span className="t-member-av" style={{ background: m.color }}>{m.name[0]}</span>
                <div className="t-stack" style={{ gap: 2 }}>
                  <h3 className="t-h3">{m.name}</h3>
                  <span className="t-small t-muted">{m.role}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="t-note">
            <div className="t-card t-note-letter">
              <span className="t-eyebrow">{FOUNDER_NOTE.title}</span>
              {FOUNDER_NOTE.paragraphs.map((p) => <p key={p} className="t-ink2">{p}</p>)}
              <span className="t-note-sign">{TEAM[0].name}<span className="t-muted t-small"> · {TEAM[0].role}</span></span>
            </div>
            <div className="t-quotes">
              {FOUNDER_NOTE.quotes.map((q) => (
                <figure key={q} className="t-card t-quote">
                  <blockquote>&ldquo;{q}&rdquo;</blockquote>
                  <figcaption className="t-tiny t-muted t-mono">{TEAM[0].name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="t-wrap t-section">
        <div className="t-dark-band">
          <div className="t-stack" style={{ gap: 18 }}>
            <span className="t-eyebrow t-eyebrow-dark">The name and the look</span>
            <h2 className="t-h2">A tomato with code inside.</h2>
            <p className="t-panel-muted">Our logo is a tomato wearing code brackets: friendly on the outside, technical underneath. The same warm paper, ink, tomato and leaf palette, with Bricolage Grotesque headlines, runs through every site we ship.</p>
          </div>
          <div className="t-room">
            <div className="t-win-bar"><span className="t-dots"><span /><span /><span /></span><span>techomato · palette</span><span /></div>
            <div className="t-room-body">
              {SWATCHES.map(([n, c]) => (
                <div key={n} className="t-room-row">
                  <span className="t-av t-swatch" style={{ background: c }} />
                  <span>{n}</span>
                  <span className="t-tiny t-panel-muted t-mono">{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="t-wrap t-section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="t-cta">
          <h2 className="t-h2">See what we have built.</h2>
          <p>Play a game, open an app, or visit the labs.</p>
          <div className="t-row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
            {PROPERTIES.map((p) => <a key={p.id} href={p.url} className="t-btn t-btn-white t-btn-lg"><Icon name={p.icon} size={18} />{p.title}</a>)}
          </div>
        </div>
      </section>
    </>
  );
}

function Art({ p, className = '' }) {
  return (
    <div className={`t-cover ${className}`} style={{ '--c1': p.colors[0], '--c2': p.colors[1] }}>
      {p.cover && <img src={p.cover} alt="" loading="lazy" decoding="async" />}
      {p.id === 'softwares' && <span className="t-art-apps">{HERO_APPS.map((id) => <AppLogo key={id} id={id} size={56} />)}</span>}
      {p.id === 'labs' && <span className="t-art-ic"><Icon name={p.icon} size={64} stroke={1.4} /></span>}
    </div>
  );
}

// Hero stage: the three sites in a dark window, cycling
function Stage() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const p = PROPERTIES[i];
  useEffect(() => {
    if (paused || reduceMotion()) return undefined;
    const t = setTimeout(() => setI((k) => (k + 1) % PROPERTIES.length), 6000);
    return () => clearTimeout(t);
  }, [i, paused]);
  return (
    <div className="t-stage t-reveal t-reveal-2" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="t-window">
        <div className="t-win-bar">
          <span className="t-dots"><span /><span /><span /></span>
          <span>{p.host}</span>
          <span className="t-live"><i />live</span>
        </div>
        <a href={p.url} className="t-win-art" aria-label={`Open ${p.title}`}>
          {PROPERTIES.map((x, k) => <Art key={x.id} p={x} className={k === i ? 'on' : ''} />)}
          <span className="t-win-play"><Icon name="arrow" size={22} /></span>
        </a>
        <div className="t-win-pick" role="tablist" aria-label="Choose a Techomato site">
          {PROPERTIES.map((x, k) => (
            <button key={x.id} role="tab" aria-selected={k === i} onClick={() => (k === i ? window.location.assign(x.url) : setI(k))}>
              {x.title}
              {k === i && !paused && <i className="t-timer" style={{ animationDuration: '6s' }} />}
            </button>
          ))}
        </div>
      </div>
      <div className="t-float t-float-a" key={`a${p.id}`}>
        <span className="t-tiny t-muted">Now showing</span>
        <strong className="t-h3">{p.title}</strong>
        <span className="t-chip t-chip-accent">{p.tagline}</span>
      </div>
    </div>
  );
}

function SectionHead({ p, eyebrow, title, children }) {
  return (
    <div className="t-between t-sec-head">
      <div className="t-stack" style={{ gap: 8 }}>
        <span className="t-eyebrow">{eyebrow}</span>
        <h2 className="t-h2">{title}</h2>
      </div>
      <div className="t-row" style={{ flexWrap: 'wrap' }}>
        {children}
        <a href={p.url} className="t-btn t-btn-ghost">{p.host}<Icon name="external" size={16} /></a>
      </div>
    </div>
  );
}

function GameCard({ g }) {
  return (
    <a href={g.url} className="t-card t-game" style={{ '--c1': '#333', '--c2': '#111' }}>
      <div className="t-cover"><img src={g.cover} alt="" loading="lazy" decoding="async" /></div>
      <div className="t-game-body">
        <div className="t-between">
          <span className="t-chip">{g.genre}</span>
          <span className="t-tiny t-muted t-mono">{g.badge}</span>
        </div>
        <h3 className="t-h3">{g.title}</h3>
        <p className="t-ink2 t-small">{g.tagline}</p>
        <span className="t-game-go">Play now <Icon name="arrow" size={16} /></span>
      </div>
    </a>
  );
}

function AppTile({ a }) {
  const soon = a.status !== 'available';
  return (
    <a href={soon ? PROPERTIES[1].url : a.url} className="t-card t-app-tile">
      <AppLogo id={a.id} size={48} />
      <div className="t-stack" style={{ gap: 2, minWidth: 0 }}>
        <strong className="t-app-name">{a.name}</strong>
        <span className="t-small t-muted">{a.tagline}</span>
      </div>
      {soon && <span className="t-chip t-chip-pass">Soon</span>}
    </a>
  );
}

function Softwares() {
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? APPS : APPS.filter((a) => a.category === cat);
  return (
    <>
      <SectionHead p={PROPERTIES[1]} eyebrow="Softwares" title="Everyday apps in your browser">
        <div className="t-tabs" role="tablist" aria-label="Filter apps by category">
          {APP_CATEGORIES.map((c) => <button key={c} role="tab" className="t-tab" aria-selected={c === cat} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      </SectionHead>
      <div className="t-grid-apps">{list.map((a) => <AppTile key={a.id} a={a} />)}</div>
    </>
  );
}

export default function App() {
  const [dark, toggle] = useTheme();
  const path = usePath();
  const onAbout = path === '/about';
  return (
    <div className="t-app" id="top">
      <header className="t-nav">
        <div className="t-nav-in">
          <a href="/" onClick={link('/')} aria-label={`${SITE_NAME} home`} className="t-brand"><Logo /></a>
          <nav className="t-links" aria-label="Main">
            {PROPERTIES.map((p) => <a key={p.id} href={`/#${p.id}`} onClick={jump(p.id)}>{p.title}</a>)}
            <a href="/about" onClick={link('/about')} aria-current={onAbout ? 'page' : undefined} className={onAbout ? 't-active' : ''}>About us</a>
          </nav>
          <div className="t-row">
            <button className="t-icon-btn" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              <Icon name={dark ? 'sun' : 'moon'} size={18} />
            </button>
            <a href={PROPERTIES[1].url} className="t-btn t-btn-accent t-nav-cta"><Icon name="arrow" size={16} />Open apps</a>
          </div>
        </div>
      </header>

      <main>
        {onAbout ? <About /> : (<>        <section className="t-wrap t-hero">
          <div className="t-stack t-hero-text">
            <span className="t-chip t-chip-pass t-reveal" style={{ alignSelf: 'flex-start' }}><Icon name="bolt" size={14} />Games · Softwares · Labs</span>
            <h1 className="t-h1 t-hero-h t-reveal">Play. Create.<br /><span className="t-accent">Explore.</span></h1>
            <p className="t-lead t-ink2 t-reveal t-reveal-2">Techomato makes free 3D games, a growing suite of everyday apps from Docs to Video Studio, and a lab for new ideas. All of it opens in your browser, with nothing to install.</p>
            <div className="t-row t-reveal t-reveal-3" style={{ flexWrap: 'wrap' }}>
              <a href="#softwares" className="t-btn t-btn-accent t-btn-lg" onClick={jump('softwares')}>Browse apps</a>
              <a href="#games" className="t-btn t-btn-ghost t-btn-lg" onClick={jump('games')}>Play games</a>
            </div>
            <div className="t-stats t-reveal t-reveal-3">
              <div><span className="t-big">{GAMES.length}</span><span className="t-small t-muted">games</span></div>
              <div><span className="t-big">{LIVE_APPS}</span><span className="t-small t-muted">browser apps</span></div>
              <div><span className="t-big">0</span><span className="t-small t-muted">installs</span></div>
            </div>
          </div>
          <Stage />
        </section>

        <section className="t-band" id="games">
          <div className="t-wrap t-section">
            <SectionHead p={PROPERTIES[0]} eyebrow="Games" title="Free 3D games. No download." />
            <div className="t-grid-games t-grid-4">{GAMES.map((g) => <GameCard key={g.id} g={g} />)}</div>
          </div>
        </section>

        <section className="t-wrap t-section" id="softwares">
          <Softwares />
        </section>

        <section className="t-band" id="labs">
          <div className="t-wrap t-section">
            <SectionHead p={PROPERTIES[2]} eyebrow="Labs" title="Where new ideas start" />
            <div className="t-card t-labs">
              <span className="t-perk-ic"><Icon name="flask" size={22} /></span>
              <div className="t-stack" style={{ gap: 6 }}>
                <h3 className="t-h3">Techomato Labs</h3>
                <p className="t-ink2">Experiments, prototypes and early builds from the Techomato team. Try them first and tell us what you think.</p>
              </div>
              <a href={PROPERTIES[2].url} className="t-btn t-btn-accent">{PROPERTIES[2].cta}<Icon name="arrow" size={16} /></a>
            </div>
          </div>
        </section>

        <section className="t-wrap t-section" id="why">
          <div className="t-stack" style={{ gap: 8, marginBottom: 28 }}>
            <span className="t-eyebrow">Why Techomato</span>
            <h2 className="t-h2">Open, tap, done.</h2>
          </div>
          <div className="t-g3">
            {WHY.map(([ic, h, p]) => (
              <div key={h} className="t-card t-perk">
                <span className="t-perk-ic"><Icon name={ic} size={22} /></span>
                <h3 className="t-h3">{h}</h3>
                <p className="t-ink2">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="t-band" id="faq">
          <div className="t-wrap t-section t-faq-wrap">
            <div className="t-stack" style={{ gap: 8 }}>
              <span className="t-eyebrow">FAQ</span>
              <h2 className="t-h2">Good to know</h2>
            </div>
            <div className="t-faq">
              {FAQ.map(([q, a]) => (
                <details key={q} className="t-card">
                  <summary>{q}</summary>
                  <p className="t-ink2">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="t-wrap t-section" id="start" style={{ paddingBottom: 0 }}>
          <div className="t-cta">
            <h2 className="t-h2">Pick a place to start.</h2>
            <p>Jump into a game, open an app, or see what we are testing in the labs.</p>
            <div className="t-row" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href={PROPERTIES[0].url} className="t-btn t-btn-white t-btn-lg"><Icon name="gamepad" size={18} />Games</a>
              <a href={PROPERTIES[1].url} className="t-btn t-btn-white t-btn-lg"><Icon name="window" size={18} />Softwares</a>
              <a href={PROPERTIES[2].url} className="t-btn t-btn-white t-btn-lg"><Icon name="flask" size={18} />Labs</a>
            </div>
          </div>
        </section>

        <section className="t-wrap t-section" id="about">
          <div className="t-dark-band">
            <div className="t-stack" style={{ gap: 18 }}>
              <span className="t-eyebrow t-eyebrow-dark">About Techomato</span>
              <h2 className="t-h2">Made with care.<br />Open from the first click.</h2>
              <p className="t-panel-muted">We like things that are quick to open and clear to use. Everything we ship follows the same design language, so a game, a tool and an experiment all feel like they came from the same hands.</p>
              <div className="t-row" style={{ flexWrap: 'wrap' }}>
                <a href="/about" onClick={link('/about')} className="t-btn t-btn-accent t-btn-sm">Our story<Icon name="arrow" size={14} /></a>
                {PROPERTIES.map((p) => <a key={p.id} href={p.url} className="t-btn t-btn-white t-btn-sm">{p.title}<Icon name="arrow" size={14} /></a>)}
              </div>
            </div>
            <div className="t-room">
              <div className="t-win-bar"><span className="t-dots"><span /><span /><span /></span><span>techomato · sites</span><span /></div>
              <div className="t-room-body">
                {PROPERTIES.map((p) => (
                  <a key={p.id} href={p.url} className="t-room-row t-site-row">
                    <span className="t-av" style={{ background: p.colors[0] }}><Icon name={p.icon} size={16} /></span>
                    <span>{p.title}</span>
                    <span className="t-tiny t-panel-muted t-mono">{p.host}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
        </>)}
      </main>

      <footer className="t-foot">
        <div className="t-wrap">
          <div className="t-foot-grid">
            <div className="t-stack t-foot-brand">
              <Logo size={30} />
              <p className="t-muted t-small">{TAGLINE}</p>
              <p className="t-muted t-small">Everything runs in your browser. Nothing to install.</p>
              <button className="t-btn t-btn-ghost t-btn-sm" style={{ alignSelf: 'flex-start' }} onClick={toggle}>
                <Icon name={dark ? 'sun' : 'moon'} size={14} />{dark ? 'Light mode' : 'Dark mode'}
              </button>
            </div>
            <nav className="t-foot-col" aria-label="Games">
              <h4><a href={PROPERTIES[0].url}>Games</a></h4>
              {GAMES.map((g) => <a key={g.id} href={g.url}>{g.title}</a>)}
            </nav>
            <nav className="t-foot-col t-foot-wide" aria-label="Softwares">
              <h4><a href={PROPERTIES[1].url}>Softwares</a></h4>
              <div className="t-foot-cols2">
                {APPS.filter((a) => a.status === 'available').map((a) => <a key={a.id} href={a.url}>{a.name}</a>)}
              </div>
            </nav>
            <nav className="t-foot-col" aria-label="Labs and company">
              <h4><a href={PROPERTIES[2].url}>Labs</a></h4>
              <a href={PROPERTIES[2].url}>Techomato Labs</a>
              <h4 style={{ marginTop: 18 }}>Techomato</h4>
              <a href="#why" onClick={jump('why')}>Why Techomato</a>
              <a href="#faq" onClick={jump('faq')}>FAQ</a>
              <a href="/about" onClick={link('/about')}>About us</a>
            </nav>
          </div>
          <div className="t-foot-bottom">
            <span className="t-muted t-small">&copy; {new Date().getFullYear()} Techomato. All rights reserved.</span>
            <div className="t-row t-small t-muted" style={{ flexWrap: 'wrap', gap: 18 }}>
              {PROPERTIES.map((p) => <a key={p.id} href={p.url}>{p.title}</a>)}
              <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top <Icon name="arrow" size={12} className="t-up" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

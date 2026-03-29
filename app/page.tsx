'use client';

import { useState, useEffect, useRef } from 'react';

const PIXEL_FONTS = [
  '--font-geist-pixel-square',
  '--font-geist-pixel-circle',
  '--font-geist-pixel-grid',
  '--font-geist-pixel-triangle',
];

const BG_COLORS = [
  'rgba(255, 255, 255, 0.05)',
  'rgba(232, 85, 58, 0.065)',
  'rgba(255, 255, 255, 0.04)',
  'rgba(232, 85, 58, 0.055)',
];

const LABS_COLORS = [
  '#e8553a',                       // accent
  '#d8d4cb',                       // text
  'rgba(216, 212, 203, 0.35)',     // text-dim
  'rgba(216, 212, 203, 0.6)',      // text-mid
];

const WORK = [
  { num: '01', client: 'Agricultural producer', geo: 'DE / CA', scope: 'Visual defect detection + chemical profiling', impact: '~200 hrs/mo saved' },
  { num: '02', client: 'Pharma -clinical trials', geo: 'US', scope: 'EDC extraction from medical records', impact: '2 FTEs automated' },
  { num: '03', client: 'Construction developer', geo: 'Toronto', scope: 'Pay application reconciliation', impact: '3 FTEs automated' },
  { num: '04', client: 'Legal tech startup', geo: '', scope: 'Contract review agents for due diligence', impact: 'Days → hours' },
];

export default function Home() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [variantIdx, setVariantIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setVariantIdx(i => (i + 1) % PIXEL_FONTS.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontFamily = getComputedStyle(document.documentElement)
        .getPropertyValue(PIXEL_FONTS[variantIdx]).trim();

      ctx.clearRect(0, 0, w, h);
      ctx.font = `4px ${fontFamily}`;
      ctx.fillStyle = BG_COLORS[variantIdx];
      ctx.textBaseline = 'top';

      const spacing = 5;
      for (let y = 0; y < h; y += spacing) {
        for (let x = 0; x < w; x += spacing) {
          ctx.fillText('■', x, y);
        }
      }
    };

    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [variantIdx]);

  return (
    <div className="min-h-screen relative">
      <canvas
        ref={canvasRef}
        style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      />
      <div className="noise" />
      <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 10 }}>

      {/* ── Header ──────────────────────────────── */}
      <header className="relative z-10 page-pad" style={{ paddingTop: '1.5rem', paddingBottom: '1rem' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="matmul-mark">
              <span className="dot dot-a font-pixel">■</span>
              <span className="dot dot-b font-pixel">■</span>
              <span className="dot dot-c font-pixel">■</span>
            </span>
            <span style={{ fontSize: '18px', letterSpacing: '0.06em' }}>matmul <span style={{ color: LABS_COLORS[variantIdx], transition: 'color 1.5s ease' }}>labs</span></span>
          </div>
          <nav style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--text-mid)', textTransform: 'uppercase' as const }}>
            SF / NY / Toronto / London / Dubai
          </nav>
        </div>
      </header>

      <main className="relative z-10">

        {/* ── Hero ────────────────────────────────── */}
        <section className="page-pad reveal" style={{ paddingTop: '5rem', paddingBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
            lineHeight: 1.4,
            fontWeight: 700,
            color: 'var(--accent)',
          }}>
            WE BUILD AI SYSTEMS FOR COMPANIES WHO&apos;VE ALREADY TRIED THE OTHER WAY.
          </h1>
        </section>

        <section
          className="page-pad reveal reveal-d2"
          style={{ color: 'var(--text)', opacity: 0.7, paddingBottom: '5rem', fontSize: '16px' }}
        >
          <p style={{ marginBottom: '1rem' }}>
            An applied AI lab. Engineers who build, domain experts who&apos;ve done your job before. No sales team.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            If your industry spends more on people than software, that&apos;s where we come in. We don&apos;t do defense.
          </p>
          <p>
            If you need it working by next month,{' '}
            <a href="#contact" className="link-accent">let&apos;s talk</a>.
          </p>
        </section>

        {/* ── Work ────────────────────────────────── */}
        <section className="page-pad reveal reveal-d3" style={{ paddingBottom: '5rem' }}>
          <div className="section-label" style={{ marginBottom: '2rem' }}>RECENT WORK</div>

          <div>
            {WORK.map((item, i) => (
              <div
                key={i}
                className={`work-row cursor-default ${
                  hovered !== null && hovered !== i ? 'dimmed' : ''
                }`}
                style={{ padding: '1.1rem 1rem', margin: '0 -1rem' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-baseline justify-between" style={{ gap: '1.5rem' }}>
                  <div className="flex items-baseline" style={{ gap: '0.75rem', minWidth: 0 }}>
                    <span style={{ fontSize: '11px', color: 'var(--accent)', flexShrink: 0 }}>
                      {item.num}
                    </span>
                    <div>
                      <div className="flex flex-wrap items-baseline" style={{ gap: '0.5rem' }}>
                        <span style={{ fontSize: '16px' }}>{item.client}</span>
                        {item.geo && (
                          <span style={{ fontSize: '10px', color: 'var(--text-dim)' }}>{item.geo}</span>
                        )}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-dim)', marginTop: '2px' }}>
                        {item.scope}
                      </div>
                    </div>
                  </div>
                  <span className="hidden md:block" style={{ fontSize: '11px', color: 'var(--accent)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                    {item.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '11px', color: 'var(--text-dim)' }}>
            + more under NDA
          </div>
        </section>

        {/* ── Opinions ───────────────────────────── */}
        <section className="page-pad" style={{ paddingBottom: '5rem' }}>
          <div className="section-label" style={{ marginBottom: '2rem' }}>HOW WE THINK ABOUT THIS</div>

          <div className="grid md:grid-cols-2" style={{ gap: '3rem', maxWidth: '56rem' }}>
            <div style={{ color: 'var(--text-mid)' }}>
              <p>
                AI changes what a team of five can do. Most companies
                haven&apos;t figured out how yet. What passes for &ldquo;AI strategy&rdquo;
                is a slide deck and a demo that wows the board and crashes
                in production. The model isn&apos;t the hard part.
              </p>
            </div>
            <div>
              <p style={{ color: 'var(--text-mid)', marginBottom: '1.5rem' }}>
                The hard part is knowing what to build. Healthcare has nothing
                in common with finance. We bring domain experts who&apos;ve worked
                in your industry, not consultants who read about it.
                We design modular systems -because the model will change,
                but your architecture shouldn&apos;t have to.
              </p>
              <p className="pull-quote" style={{ fontSize: '20px', lineHeight: 1.4 }}>
                The model is the easy part. Knowing whether it actually works is the work.
              </p>
            </div>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '12px', lineHeight: 2, color: 'var(--text-dim)', maxWidth: '460px' }}>
            We&apos;ve turned down more projects than we&apos;ve taken. Bad projects
            make everyone miserable, and life&apos;s too short.
          </p>
        </section>

        {/* ── Team ────────────────────────────────── */}
        <section className="page-pad" style={{ paddingBottom: '5rem' }}>
          <div className="section-label" style={{ marginBottom: '2rem' }}>WHO YOU&apos;LL ACTUALLY TALK TO</div>

          <div className="grid md:grid-cols-2" style={{ gap: '1px', maxWidth: '52rem', background: 'var(--border)' }}>
            <div className="card" style={{ padding: '1.5rem 1.75rem', borderColor: 'transparent' }}>
              <div className="flex items-baseline" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '18px' }}>Raqib</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>PRINCIPAL</span>
              </div>
              <div style={{ fontSize: '12px', lineHeight: 2, color: 'var(--text-mid)', marginBottom: '1rem' }}>
                iPads at Apple. Cars at GM. Batteries at Tesla. Then software,
                because it ships faster. Led data at Neuron. Now builds AI
                that predicts surgical complications and fights insurance
                companies. It usually wins.
              </div>
              <a href="https://www.linkedin.com/in/raqibhayder/" className="inline-block" style={{ color: 'var(--text-dim)', opacity: 0.6, transition: 'opacity 0.3s' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
            <div className="card" style={{ padding: '1.5rem 1.75rem', borderColor: 'transparent' }}>
              <div className="flex items-baseline" style={{ gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '18px' }}>Marcel</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>PRINCIPAL</span>
              </div>
              <div style={{ fontSize: '12px', lineHeight: 2, color: 'var(--text-mid)', marginBottom: '1rem' }}>
                Founding product engineer at a company fighting diabetes.
                Makes pixels dance on screens. Previously
                designed skull reconstruction implants for neurosurgeons.
                Not a metaphor. Actual skulls, actual surgeons.
              </div>
              <a href="https://www.linkedin.com/in/marcel-anis/" className="inline-block" style={{ color: 'var(--text-dim)', opacity: 0.6, transition: 'opacity 0.3s' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '12px', lineHeight: 2, color: 'var(--text-dim)', maxWidth: '460px' }}>
            We met at University of Waterloo. We&apos;ve been
            building things together ever since. Sometimes for employers,
            sometimes for ourselves, always with the same rule: if it
            doesn&apos;t ship, it doesn&apos;t count.
          </p>
        </section>

        {/* ── Contact ─────────────────────────────── */}
        <section id="contact" className="page-pad" style={{ paddingBottom: '5rem' }}>
          <div className="divider" style={{ marginBottom: '3.5rem' }} />

          <div className="grid md:grid-cols-2 items-end" style={{ gap: '3rem', maxWidth: '52rem' }}>
            <div>
              <div className="section-label" style={{ marginBottom: '1.5rem' }}>SAY HELLO</div>
              <div style={{ fontSize: '22px', lineHeight: 1.35 }}>
                Got a workflow that&apos;s eating your week? Tell us about it.
              </div>
            </div>
            <div>
              <a href="mailto:hello@matmul.io" className="float" style={{ fontSize: '18px', color: 'var(--accent)' }}>
                hello@matmul.io
              </a>
              <div style={{ fontSize: '11px', lineHeight: 2, marginTop: '1rem', color: 'var(--text-dim)' }}>
                We reply within 48 hours. Usually faster.<br />
                No forms. No calendly. No &ldquo;discovery calls.&rdquo;<br />
                Just email, like it&apos;s 2008 and that was fine.
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="relative z-10 page-pad" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
        <div className="divider" style={{ marginBottom: '1rem' }} />
        <div className="flex flex-col md:flex-row justify-between items-baseline" style={{ gap: '0.5rem', fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>
          <span>&copy; 2026 matmul inc.</span>
          <span>SF / NY / Toronto / London / Dubai</span>
        </div>
      </footer>
      </div>
    </div>
  );
}

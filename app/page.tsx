'use client';

import { useState, useEffect, useRef } from 'react';

const BG_LIGHT = 'rgba(0, 0, 0, 0.01)';
const BG_DARK = 'rgba(255, 255, 255, 0.01)';


const WORK = [
  { num: '01', client: 'Enterprise SaaS', geo: 'US', scope: 'Contract review agents for revenue recognition', impact: '~150hrs/mo' +
      ' saved'},
  { num: '02', client: 'Agricultural producer', geo: 'Germany / Canada', scope: 'Visual defect detection + chemical' +
      ' profiling', impact: '~200 hrs/mo saved' },
  { num: '03', client: 'Pharma - clinical trials', geo: 'US', scope: 'Electronic Data Capture (EDC) extraction from' +
      ' medical records', impact: '2 FTEs automated' },
  { num: '04', client: 'Construction developer', geo: 'Canada', scope: 'Pay application reconciliation agent', impact: '3 FTEs automated' },
  { num: '05', client: 'Legal tech startup', geo: 'US', scope: 'Contract review agents for due diligence', impact: 'Days → hours' },
]

export default function Home() {
  const [hovered, setHovered] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        .getPropertyValue('--font-geist-pixel-square').trim();
      const isDark = document.documentElement.dataset.theme === 'dark';

      ctx.clearRect(0, 0, w, h);
      ctx.font = `4px ${fontFamily}`;
      ctx.fillStyle = isDark ? BG_DARK : BG_LIGHT;
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

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      window.removeEventListener('resize', draw);
      observer.disconnect();
    };
  }, []);


  return (
    <div className="min-h-screen relative">
      <canvas
        ref={canvasRef}
        width={1}
        height={1}
        style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
      />
      <div className="noise" />
      <div style={{ maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', position: 'relative', zIndex: 10 }}>

      {/* ── Header ──────────────────────────────── */}
      <header className="relative z-10 page-pad" style={{ paddingTop: '1.5rem', paddingBottom: '1rem' }}>
        <div className="flex justify-between items-center">
          <div
            className="flex items-center cursor-default select-none"
            onDoubleClick={() => {
              const html = document.documentElement;
              const next = html.dataset.theme === 'dark' ? 'light' : 'dark';
              html.dataset.theme = next;
              localStorage.setItem('matmul-theme', next);
            }}
          >
            <div className="matmul-mark">
              <div style={{ background: '#d4562e' }} />
              <div style={{ background: '#eb8f3a' }} />
              <div style={{ background: '#eba86a' }} />
              <div style={{ background: '#f5d4a0' }} />
            </div>
            <span style={{ fontSize: '18px', letterSpacing: '0.06em' }}>matmul <span className="labs-glow">labs</span></span>
          </div>
          <nav className="hidden sm:block" style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--text-mid)', textTransform: 'uppercase' as const }}>
            SF / NY / Toronto / London
          </nav>
        </div>
      </header>

      <main className="relative z-10">

        {/* ── Hero ────────────────────────────────── */}
        <section className="page-pad reveal pt-24 sm:pt-40 pb-12 sm:pb-24">
          <p style={{
            fontSize: '14px',
            color: 'var(--text)',
            opacity: 0.5,
            marginBottom: '0.75rem',
          }}>
            Production AI for complex industries.
          </p>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
            lineHeight: 1.4,
            fontWeight: 700,
            color: 'var(--accent)',
            textWrap: 'balance',
          }}>
            We automate the work that&apos;s eating your team&apos;s week.
          </h1>
        </section>

        <section
          className="page-pad reveal reveal-d2 pb-10 sm:pb-20"
          style={{ fontSize: '14px' }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem' }}>
            {[
              ['What', 'Applied AI lab'],
              ['Team', 'Domain experts + craft-obsessed engineers, no sales team'],
              ['Availability', <>A handful of projects a year.<br className="sm:hidden" /><span className="hidden sm:inline"> </span><a href="https://cal.com/raqib/30" className="link-accent">Book a call</a></>],
            ].map(([key, value], i) => (
              <div key={i} className="flex gap-3 sm:gap-6" style={{ lineHeight: 1.85 }}>
                <span style={{ color: 'var(--text-dim)', flexShrink: 0, width: '5.5rem' }} className="sm:w-28">{key}</span>
                <span style={{ color: 'var(--text)', opacity: 0.7 }}>{value}</span>
              </div>
            ))}
            <div className="flex gap-3 sm:gap-6" style={{ lineHeight: 1.85 }}>
              <span style={{ color: 'var(--text-dim)', flexShrink: 0, width: '5.5rem' }} className="sm:w-28">Industries</span>
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.25rem' }}>
                <div className="flex flex-wrap" style={{ gap: '0' }}>
                  {['Accounting', 'Agriculture', 'Construction', 'Enterprise SaaS'].map((ind, i, arr) => (
                    <span key={ind} style={{ color: 'var(--text)', opacity: 0.7, fontSize: '13px' }}>
                      {ind}{i < arr.length - 1 && <span style={{ color: 'var(--accent)', opacity: 0.5, margin: '0 0.4rem' }}>/</span>}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap" style={{ gap: '0' }}>
                  {['Healthcare', 'Insurance', 'Legal', 'Pharma', 'Supply chain'].map((ind, i, arr) => (
                    <span key={ind} style={{ color: 'var(--text)', opacity: 0.7, fontSize: '13px' }}>
                      {ind}{i < arr.length - 1 && <span style={{ color: 'var(--accent)', opacity: 0.5, margin: '0 0.4rem' }}>/</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Opinions ───────────────────────────── */}
        <section className="page-pad reveal reveal-d3 pb-12 sm:pb-20">
          <div className="section-label" style={{ marginBottom: '2.5rem' }}>HOW WE WORK</div>

          <div className="flex flex-col gap-6 sm:gap-10" style={{ maxWidth: '40rem', fontSize: '16px' }}>
            <p style={{ color: 'var(--text)', opacity: 0.75 }}>
              <a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" className="link-accent" style={{ fontVariantNumeric: 'tabular-nums' }}>95% of enterprises</a>{' '}get
              zero return on their AI investment. The models can reason, extract,
              and decide. But the work is ambiguous, fragmented, and full of edge
              cases. The gap between the two is where the investment dies.
            </p>
            <p style={{ color: 'var(--text)', opacity: 0.75 }}>
              Every role is a mix of{' '}
              <a href="https://sequoiacap.com/article/services-the-new-software/" className="link-accent">rules and judgment</a>.
              We find the rule-based parts, the ones eating your team&apos;s week,
              and automate them. The judgment stays with your people.
            </p>
            <p style={{ color: 'var(--text)', opacity: 0.75 }}>
              External partnerships reach production at{' '}
              <a href="https://mlq.ai/media/quarterly_decks/v0.1_State_of_AI_in_Business_2025_Report.pdf" className="link-accent">2x the rate </a> of
              internal builds. We&apos;ve done it enough times to know why.
              Building AI that fits your process is a different skill than
              building the rest of your product.
            </p>
            <p style={{ color: 'var(--text)', opacity: 0.75 }}>
              If it can&apos;t be done reliably, we&apos;ll tell you.
              We&apos;ve said no more often than yes. Bad projects make everyone
              miserable, and life&apos;s too short.
            </p>
          </div>
        </section>

        {/* ── Work ────────────────────────────────── */}
        <section className="page-pad pb-12 sm:pb-20">
          <div className="section-label" style={{ marginBottom: '2rem' }}>RECENT WORK</div>

          <div>
            {WORK.map((item, i) => (
              <div
                key={i}
                className={`work-row cursor-default ${
                  hovered !== null && hovered !== i ? 'dimmed' : ''
                }`}
                style={{ padding: '1.25rem 1rem', margin: '0 -1rem' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="flex items-baseline" style={{ gap: '0.75rem' }}>
                  <span style={{ fontSize: '14px', color: 'var(--accent)', flexShrink: 0 }}>
                    {item.num}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex justify-between items-baseline flex-wrap" style={{ gap: '0.25rem 1rem' }}>
                      <span style={{ fontSize: '18px' }}>{item.scope}</span>
                      <span style={{ fontWeight: 700, color: 'var(--accent)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }} className="text-base">
                        {item.impact}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-baseline" style={{ gap: '0.5rem', marginTop: '4px' }}>
                      {item.client && (
                        <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{item.client}</span>
                      )}
                      {item.client && item.geo && (
                        <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>·</span>
                      )}
                      {item.geo && (
                        <span style={{ fontSize: '13px', color: 'var(--text-dim)' }}>{item.geo}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.25rem', fontSize: '14px', color: 'var(--text-dim)' }}>
            + more we can&apos;t share publicly
          </div>
        </section>

        {/* ── Team ────────────────────────────────── */}
        <section className="page-pad pb-12 sm:pb-20">
          <div className="section-label" style={{ marginBottom: '2rem' }}>WHO YOU&apos;LL ACTUALLY TALK TO</div>

          <div className="grid md:grid-cols-2" style={{ gap: '1.5rem', maxWidth: '52rem' }}>
            <div className="card flex flex-col" style={{ padding: '2rem 2.25rem' }}>
              <div className="flex items-baseline" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '18px' }}>Raqib</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--accent)' }}>PRINCIPAL</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: 2, color: 'var(--text)', opacity: 0.75, flex: 1 }}>
                Built hardware at Apple, GM, and Tesla. Led data at
                Neuron. Then healthcare, building AI alongside surgeons
                and automating how hospitals get paid.
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="uwaterloo-badge">UWaterloo</span>
                <a href="https://www.linkedin.com/in/raqibhayder/" aria-label="Raqib on LinkedIn" className="inline-block link-icon" style={{ lineHeight: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/><g fill="var(--bg)" transform="translate(12,12) scale(0.7) translate(-12,-12)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"/><path d="M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z"/><path d="M7.119 20.452H3.555V9h3.564v11.452z"/></g></svg>
                </a>
              </div>
            </div>
            <div className="card flex flex-col" style={{ padding: '2rem 2.25rem' }}>
              <div className="flex items-baseline" style={{ gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span style={{ fontSize: '18px' }}>Marcel</span>
                <span style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--accent)' }}>PRINCIPAL</span>
              </div>
              <div style={{ fontSize: '14px', lineHeight: 2, color: 'var(--text)', opacity: 0.75, flex: 1 }}>
                Designed skull implants for neurosurgeons, then built a
                platform that fights diabetes. Shipped a learning system
                along the way. Now building an autonomous pharmacy.
              </div>
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="uwaterloo-badge">UWaterloo</span>
                <a href="https://www.linkedin.com/in/marcel-anis/" aria-label="Marcel on LinkedIn" className="inline-block link-icon" style={{ lineHeight: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/><g fill="var(--bg)" transform="translate(12,12) scale(0.7) translate(-12,-12)"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286z"/><path d="M5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065z"/><path d="M7.119 20.452H3.555V9h3.564v11.452z"/></g></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ─────────────────────────────── */}
        <section id="contact" className="page-pad pb-8 sm:pb-16">
          <div style={{ maxWidth: '32rem' }}>
            <div className="section-label" style={{ marginBottom: '1.5rem' }}>SAY HELLO</div>
            <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'baseline', gap: '0.75rem' }}>
              <a href="mailto:hello@matmul.io" className="float link-accent" style={{ fontSize: '20px' }}>
                hello@matmul.io
              </a>
              <span style={{ color: 'var(--text-dim)', fontSize: '14px' }}>or</span>
              <a href="https://cal.com/raqib/30" className="float link-accent" style={{ fontSize: '20px' }}>
                book a call
              </a>
            </div>
            <div style={{ fontSize: '12px', lineHeight: 2, marginTop: '1rem', color: 'var(--text-mid)' }}>
              We reply within 48 hours. Usually faster.
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="relative z-10 page-pad" style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
        <div className="divider" style={{ marginBottom: '1rem' }} />
        <div style={{ fontSize: '10px', letterSpacing: '0.15em', color: 'var(--text-dim)' }}>
          <span>&copy; 2026 matmul inc.</span>
        </div>
      </footer>
      </div>
    </div>
  );
}

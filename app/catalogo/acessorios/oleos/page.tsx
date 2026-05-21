import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { tiposAcessorio } from '@/lib/data/acessorios';

const LOGOS_POR_SLUG: Record<string, { src: string; alt: string }[]> = {
  'oleo-motor': [
    { src: '/imagens/logos-oleo/motul-logo.png',    alt: 'Motul' },
    { src: '/imagens/logos-oleo/mobil-logo1.png',   alt: 'Mobil' },
    { src: '/imagens/logos-oleo/lubrax-logo.png',   alt: 'Lubrax' },
    { src: '/imagens/logos-oleo/ipiranga-logo.png', alt: 'Ipiranga' },
    { src: '/imagens/logos-oleo/shell-logo.png',    alt: 'Shell' },
    { src: '/imagens/logos-oleo/yamalube-logo.png', alt: 'Yamalube' },
  ],
  'oleo-freio': [
    { src: '/imagens/logos-oleo/motul-logo.png',    alt: 'Motul' },
    { src: '/imagens/logos-oleo/bosch-logo.png',    alt: 'Bosch' },
    { src: '/imagens/logos-oleo/yamalube-logo.png', alt: 'Yamalube' },
  ],
  'oleo-suspensao': [
    { src: '/imagens/logos-oleo/motul-logo.png', alt: 'Motul' },
  ],
};

const segments = [
  { label: 'Início', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Acessórios', href: '/catalogo/acessorios' },
  { label: 'Óleos' },
];

type IconVariant = 'engine' | 'brake' | 'suspension';

function BottleSVG({ color, variant, uid }: { color: string; variant: IconVariant; uid: string }) {
  const badge = variant === 'engine' ? '4T' : variant === 'brake' ? '4' : '10';
  return (
    <svg viewBox="0 0 200 240" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id={uid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#000" stopOpacity="0.45" />
        </linearGradient>
        <linearGradient id={`${uid}-cap`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1a1a" />
          <stop offset="1" stopColor="#0a0a0a" />
        </linearGradient>
      </defs>
      <rect x="80" y="20" width="40" height="20" rx="3" fill={`url(#${uid}-cap)`} />
      <rect x="80" y="20" width="40" height="4" rx="2" fill="#000" opacity="0.4" />
      <path d="M86,40 L114,40 L116,56 L84,56 Z" fill={color} opacity="0.85" />
      <path d="M86,40 L114,40 L116,56 L84,56 Z" fill={`url(#${uid})`} />
      <path d="M64,56 L136,56 C146,56 154,66 154,78 L156,200 C156,212 148,220 138,220 L62,220 C52,220 44,212 44,200 L46,78 C46,66 54,56 64,56 Z" fill={color} />
      <path d="M64,56 L136,56 C146,56 154,66 154,78 L156,200 C156,212 148,220 138,220 L62,220 C52,220 44,212 44,200 L46,78 C46,66 54,56 64,56 Z" fill={`url(#${uid})`} />
      <rect x="54" y="110" width="92" height="68" rx="4" fill="#0a0a0a" opacity="0.85" />
      <rect x="54" y="110" width="92" height="68" rx="4" fill={color} opacity="0.08" />
      <rect x="62" y="118" width="40" height="4" rx="2" fill={color} />
      <rect x="62" y="128" width="76" height="2" rx="1" fill="#fff" opacity="0.3" />
      <circle cx="130" cy="146" r="10" fill={color} />
      <text x="130" y="150" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#0a0a0a" textAnchor="middle">{badge}</text>
      <rect x="62" y="162" width="68" height="2" rx="1" fill="#fff" opacity="0.25" />
      <rect x="62" y="168" width="50" height="2" rx="1" fill="#fff" opacity="0.25" />
      <path d="M52,70 C50,90 49,130 49,180" stroke="#fff" strokeOpacity="0.22" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M48,218 C80,222 120,222 152,218" stroke="#000" strokeOpacity="0.4" strokeWidth="2" fill="none" />
    </svg>
  );
}

function CategoryIcon({ variant, color }: { variant: IconVariant; color: string }) {
  if (variant === 'engine') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="7" width="18" height="12" rx="1.5" stroke={color} strokeWidth="1.5" />
        <path d="M7 7V4M12 7V4M17 7V4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 11h-1M22 11h1M3 15h-1M22 15h1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === 'brake') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8.5" stroke={color} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" />
        <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="8" y="3" width="3" height="9" rx="1" stroke={color} strokeWidth="1.5" />
      <rect x="13" y="3" width="3" height="9" rx="1" stroke={color} strokeWidth="1.5" />
      <path d="M9.5 12v8M14.5 12v8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 20h4M12.5 20h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function getIconVariant(slug: string): IconVariant {
  if (slug === 'oleo-motor') return 'engine';
  if (slug === 'oleo-freio') return 'brake';
  return 'suspension';
}

export default function OleosPage() {
  const tipoData = tiposAcessorio.find((t) => t.slug === 'oleos');
  if (!tipoData) notFound();

  return (
    <div className="min-h-screen bg-zinc-950">
      <style>{`
        .oleo-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(180deg, #16181c 0%, #0e1013 100%);
          border: 1px solid rgba(255,255,255,0.06);
          height: 360px;
          display: block;
          text-decoration: none;
          transition: transform .25s cubic-bezier(.2,.7,.3,1), border-color .2s, box-shadow .25s;
        }
        .oleo-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in oklab, var(--brand) 40%, transparent);
          box-shadow: 0 24px 60px -20px color-mix(in oklab, var(--brand) 55%, transparent),
                      0 0 0 1px color-mix(in oklab, var(--brand) 35%, transparent) inset;
        }
        .oleo-glow {
          position: absolute; inset: 0; opacity: 0;
          transition: opacity .25s; pointer-events: none;
        }
        .oleo-card:hover .oleo-glow { opacity: 1; }
        .oleo-bottle {
          opacity: 0.38;
          transition: opacity .35s, transform .35s;
          transform-origin: 70% 60%;
        }
        .oleo-card:hover .oleo-bottle {
          opacity: 1;
          transform: translate(0, -8px) rotate(-4deg);
        }
        .oleo-cta { opacity: 0; transform: translateY(4px); transition: opacity .2s, transform .2s; }
        .oleo-card:hover .oleo-cta { opacity: 1; transform: translateY(0); }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-white mb-2">{tipoData.nome}</h1>
          <p className="text-zinc-400 mb-10">{tipoData.descricao}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {tipoData.marcas.map((marca) => {
              const brand = marca.brandColor ?? '#DC2626';
              const variant = getIconVariant(marca.slug);
              const uid = `bottle-${marca.slug}`;

              return (
                <Link
                  key={marca.slug}
                  href={`/catalogo/acessorios/oleos/${marca.slug}`}
                  className="oleo-card"
                  style={{ '--brand': brand } as React.CSSProperties}
                >
                  {/* Side glow */}
                  <div
                    className="oleo-glow"
                    style={{
                      background: `radial-gradient(ellipse at 75% 60%, ${brand}40 0%, transparent 60%)`,
                    }}
                  />

                  {/* Brand logos */}
                  {(() => {
                    const logos = LOGOS_POR_SLUG[marca.slug] ?? [];
                    const isSingle = logos.length === 1;
                    const cols = isSingle ? 1 : 2;
                    return (
                      <div
                        className="oleo-bottle"
                        style={{
                          position: 'absolute',
                          right: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: isSingle ? 100 : 160,
                          pointerEvents: 'none',
                          display: 'grid',
                          gridTemplateColumns: `repeat(${cols}, 1fr)`,
                          gap: 8,
                        }}
                      >
                        {logos.map((logo, idx) => (
                          <div
                            key={logo.alt}
                            style={{
                              gridColumn: logos.length % 2 !== 0 && idx === logos.length - 1 ? '1 / -1' : undefined,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              height: 40,
                            }}
                          >
                            <Image
                              src={logo.src}
                              alt={logo.alt}
                              width={70}
                              height={28}
                              className="w-full h-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    );
                  })()}

                  {/* Content */}
                  <div
                    style={{
                      position: 'relative',
                      padding: 26,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxSizing: 'border-box',
                    }}
                  >
                    {/* Top: category icon */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 10,
                        background: `color-mix(in oklab, ${brand} 12%, transparent)`,
                        border: `1px solid color-mix(in oklab, ${brand} 30%, transparent)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <CategoryIcon variant={variant} color={brand} />
                    </div>

                    {/* Bottom: text + chips + CTA */}
                    <div style={{ maxWidth: '70%' }}>
                      <h2
                        style={{
                          fontSize: 28,
                          fontWeight: 800,
                          letterSpacing: '-0.02em',
                          lineHeight: 1.05,
                          margin: 0,
                          color: '#fff',
                        }}
                      >
                        {marca.nome}
                      </h2>
                      {marca.descricao && (
                        <p
                          style={{
                            fontSize: 12,
                            color: 'rgba(255,255,255,0.5)',
                            marginTop: 6,
                            letterSpacing: '0.04em',
                          }}
                        >
                          {marca.descricao}
                        </p>
                      )}

                      {/* Brand chips */}
                      {marca.produtos.length > 0 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 14 }}>
                          {marca.produtos.slice(0, 3).map((p) => (
                            <span
                              key={p.id}
                              style={{
                                fontSize: 10,
                                letterSpacing: '0.05em',
                                color: 'rgba(255,255,255,0.75)',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                padding: '4px 8px',
                                borderRadius: 6,
                                fontFamily: 'monospace',
                              }}
                            >
                              {p.nome}
                            </span>
                          ))}
                          {marca.produtos.length > 3 && (
                            <span
                              style={{
                                fontSize: 10,
                                color: 'rgba(255,255,255,0.5)',
                                padding: '4px 8px',
                                fontFamily: 'monospace',
                              }}
                            >
                              +{marca.produtos.length - 3}
                            </span>
                          )}
                        </div>
                      )}

                      <div
                        className="oleo-cta"
                        style={{
                          marginTop: 16,
                          fontSize: 13,
                          fontWeight: 600,
                          color: brand,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        Ver produtos
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                          <path d="M3 7h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

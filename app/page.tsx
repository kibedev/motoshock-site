import Image from 'next/image';
import Link from 'next/link';
import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';
import FadeIn from '@/components/FadeIn';
import HeroGsap from '@/components/HeroGsap';
import StatsCounter from '@/components/StatsCounter';
import AnimatedStat from '@/components/AnimatedStat';

const BRAND = '#E10F1E';

const sharedCSS = `
  .ms-card { position: relative; border-radius: 18px; overflow: hidden;
    background: linear-gradient(180deg, #16181c 0%, #0e1013 100%);
    border: 1px solid rgba(255,255,255,0.06);
    transition: transform .28s cubic-bezier(.2,.7,.3,1), border-color .2s, box-shadow .28s; }
  .ms-card:hover {
    transform: translateY(-4px);
    border-color: color-mix(in oklab, var(--brand) 40%, transparent);
    box-shadow: 0 24px 60px -20px color-mix(in oklab, var(--brand) 55%, transparent),
                0 0 0 1px color-mix(in oklab, var(--brand) 35%, transparent) inset;
  }
  .ms-glow { opacity: 0; transition: opacity .28s; pointer-events: none; }
  .ms-card:hover .ms-glow { opacity: 1; }
  .ms-cta { opacity: 0; transform: translateY(4px); transition: opacity .2s, transform .2s; }
  .ms-card:hover .ms-cta { opacity: 1; transform: translateY(0); }
  .ms-iconbox { position: relative; transition: transform .25s, background .25s; }
  .ms-card:hover .ms-iconbox {
    transform: scale(1.08) rotate(-3deg);
    background: color-mix(in oklab, var(--brand) 22%, transparent) !important;
  }
  .ms-numglow { opacity: 0; transition: opacity .35s; }
  .ms-card:hover .ms-numglow { opacity: 1; }
  .ms-arrow { transition: transform .25s; }
  .ms-card:hover .ms-arrow { transform: translateX(6px); }
  .ms-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; color: ${BRAND}; letter-spacing: 0.25em; text-transform: uppercase;
    font-weight: 700; margin-bottom: 18px;
  }
  .ms-eyebrow .bar { width: 28px; height: 2px; background: ${BRAND}; flex-shrink: 0; }
`;


function ServiceCardInner({ s, i }: { s: { icon: React.ReactNode; kicker: string; num: string; title: string; desc: string; bullets: readonly string[]; cta: string }; i: number }) {
  return (
    <>
      <div className="ms-glow" style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 100% 0%, ${BRAND}30 0%, transparent 55%)` }} />
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', gap: 18 }}>
        <div className="ms-iconbox" style={{ width: 56, height: 56, borderRadius: 14, background: `color-mix(in oklab,${BRAND} 12%,transparent)`, border: `1px solid color-mix(in oklab,${BRAND} 28%,transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {s.icon}
        </div>
        <div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#fff' }}>{s.title}</div>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, marginTop: 12 }}>{s.desc}</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 6, marginTop: 'auto' }}>
          {s.bullets.map((bl) => (
            <span key={bl} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)' }}>{bl}</span>
          ))}
        </div>
      </div>
    </>
  );
}

function DifIcon({ name }: { name: 'shield' | 'grid' | 'chat' | 'pin' | 'engine' }) {
  const s = { width: 22, height: 22, fill: 'none' as const, stroke: BRAND, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  if (name === 'shield') return <svg viewBox="0 0 24 24" {...s}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></svg>;
  if (name === 'grid')   return <svg viewBox="0 0 24 24" {...s}><rect x="3.5" y="3.5" width="7" height="7" rx="1"/><rect x="13.5" y="3.5" width="7" height="7" rx="1"/><rect x="3.5" y="13.5" width="7" height="7" rx="1"/><rect x="13.5" y="13.5" width="7" height="7" rx="1"/></svg>;
  if (name === 'chat')   return <svg viewBox="0 0 24 24" {...s}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 21l1.4-4.5A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>;
  if (name === 'engine') return <svg viewBox="0 0 24 24" {...s}><rect x="3.5" y="8.5" width="14" height="9" rx="1"/><path d="M7.5 8.5V5M11.5 8.5V5M17.5 11h3v4h-3"/><path d="M3.5 12h-1M3.5 16h-1"/></svg>;
  return <svg viewBox="0 0 24 24" {...s}><path d="M12 21s-7-6-7-12a7 7 0 1 1 14 0c0 6-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/></svg>;
}

export default function Home() {
  const whatsappLink = gerarLinkWhatsApp(empresa.whatsapp);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/imagens/hero-background.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/60" />

        <HeroGsap slogan={empresa.slogan} whatsappLink={whatsappLink} />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-700 animate-bounce">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      <style>{sharedCSS}</style>

      {/* ── Quem Somos ── */}
      <section className="py-28 bg-zinc-950" id="sobre">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div style={{ maxWidth: 720, margin: '0 auto' }}>
              <div className="ms-eyebrow"><span className="bar" />Quem somos</div>
              <h2 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 0.98, margin: 0, fontWeight: 800, letterSpacing: '-0.035em', color: '#fff' }}>
                Sobre a<br />
                <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
                  Moto<span style={{ color: BRAND }}>shock</span>
                  <svg style={{ position: 'absolute', left: 0, bottom: -8, width: '100%', height: 14 }} viewBox="0 0 320 14" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2,8 Q80,2 160,8 T318,8" stroke={BRAND} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                  </svg>
                </span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginTop: 28 }}>
                Fundada em <strong style={{ color: '#fff' }}>1999</strong>, com a inauguração da primeira loja em{' '}
                <strong style={{ color: '#fff' }}>Jaboatão dos Guararapes – PE</strong>, a MotoShock é uma empresa especializada em peças, produtos e serviços para motos e motociclistas. Ao longo de mais de 25 anos de história, expandimos nossa presença na região com a abertura de novas lojas no Cabo de Santo Agostinho, graças aos laços criados com nossos clientes, parceiros e fornecedores.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginTop: 16 }}>
                Com uma equipe de profissionais capacitados e apaixonados pelo universo das motos, a MotoShock oferece produtos originais e de qualidade comprovada, garantindo segurança e satisfação em cada compra. Nosso atendimento personalizado e o relacionamento próximo com os clientes são a base de uma reputação construída com seriedade ao longo de décadas.
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', marginTop: 16 }}>
                Hoje, com lojas estrategicamente localizadas na Região Metropolitana, a MotoShock consolida sua trajetória com um atendimento cada vez mais qualificado, reafirmando seu compromisso com a excelência e a máxima qualidade em tudo que oferece.
              </p>
              <StatsCounter />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }} />
      </div>

      {/* ── Serviços ── */}
      <section className="py-28 bg-zinc-950" id="servicos">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="ms-eyebrow" style={{ justifyContent: 'center' }}><span className="bar" />O que fazemos<span className="bar" /></div>
              <h2 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 0.98, margin: 0, fontWeight: 800, letterSpacing: '-0.035em', color: '#fff' }}>
                Nossos <span style={{ color: BRAND }}>serviços</span>
              </h2>
              <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.7)', maxWidth: 560, margin: '20px auto 0', lineHeight: 1.55 }}>
                Da bancada à prateleira — manutenção feita com cuidado e um catálogo completo de peças e acessórios.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {([
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={BRAND} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-9 9-3.5-3.5L17 9.5 14.7 6.3Z"/><path d="m3 21 4-4"/><circle cx="6" cy="18" r="1.6"/>
                  </svg>
                ),
                kicker: 'Serviço · 01', num: '01',
                title: 'Manutenção de Motos',
                desc: 'Revisão, diagnóstico e reparo para manter sua moto sempre pronta. Equipe de mecânicos especializados com atenção e precisão.',
                bullets: ['Revisão completa','Diagnóstico','Troca de óleo','Freios & suspensão','Sistema elétrico'],
                cta: 'Agendar serviço',
                href: gerarLinkWhatsApp(empresa.whatsapp, { produto: 'Manutenção' }),
                external: true,
              },
              {
                icon: (
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke={BRAND} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M12 12 3.5 7.5M12 12l8.5-4.5M12 12v9"/>
                  </svg>
                ),
                kicker: 'Serviço · 02', num: '02',
                title: 'Capacetes e Acessórios',
                desc: 'Amplo catálogo de capacetes e acessórios das principais marcas. Tudo pra você e sua moto.',
                bullets: ['Capacetes','Capas de chuva','Acessórios'],
                cta: 'Ver catálogo',
                href: gerarLinkWhatsApp(empresa.whatsapp, { produto: 'Acessórios' }),
                external: true,
              },
            ] as const).map((s, i) => (
              <FadeIn key={s.num} delay={i * 100} style={{ height: '100%' }}>
                {s.external ? (
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                     className="ms-card" style={{ '--brand': BRAND, textDecoration: 'none', color: 'inherit', display: 'block', padding: 32, height: '100%' } as React.CSSProperties}>
                    <ServiceCardInner s={s} i={i} />
                  </a>
                ) : (
                  <Link href={s.href}
                        className="ms-card" style={{ '--brand': BRAND, textDecoration: 'none', color: 'inherit', display: 'block', padding: 32, height: '100%' } as React.CSSProperties}>
                    <ServiceCardInner s={s} i={i} />
                  </Link>
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)' }} />
      </div>

      {/* ── Diferenciais ── */}
      <section className="py-28 bg-zinc-950" id="diferenciais">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
              <div className="ms-eyebrow" style={{ justifyContent: 'center' }}><span className="bar" />Diferenciais<span className="bar" /></div>
              <h2 style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', lineHeight: 0.98, margin: 0, fontWeight: 800, letterSpacing: '-0.035em', color: '#fff' }}>
                Por que escolher a <span style={{ color: BRAND }}>Motoshock?</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {([
              { icon: 'shield', kicker: '01', title: 'Experiência de Mercado',     desc: 'Mais de 25 anos atendendo motociclistas em Pernambuco com qualidade, confiança e dedicação.', statValue: 25,  statPrefix: '',   statSuffix: '+',   statLabel: 'Anos'      },
              { icon: 'grid',   kicker: '02', title: 'Amplo Catálogo',            desc: 'Honda, Yamaha, Royal Enfield, Bajaj, BMW e muito mais.',                                         statValue: 15,  statPrefix: '',   statSuffix: '+',   statLabel: 'Marcas'    },
              { icon: 'chat',   kicker: '03', title: 'Atendimento Especializado', desc: 'Consultores prontos para ajudar você a encontrar a peça certa.',                                  statValue: 5,   statPrefix: '< ', statSuffix: 'min', statLabel: 'Resposta'  },
              { icon: 'engine', kicker: '04', title: 'Mecânicos Especializados',   desc: 'Equipe treinada para diagnosticar e reparar qualquer tipo de moto com precisão e cuidado.',      statValue: 100, statPrefix: '',   statSuffix: '%',   statLabel: 'Confiável' },
            ] as const).map((it, i) => (
              <FadeIn key={it.kicker} delay={i * 80}>
                <div className="ms-card" style={{ '--brand': BRAND, padding: 26, minHeight: 280, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'default', height: '100%' } as React.CSSProperties}>
                  <div className="ms-glow" style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 0%, ${BRAND}30 0%, transparent 55%)` }} />
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div className="ms-iconbox" style={{ width: 48, height: 48, borderRadius: 12, background: `color-mix(in oklab,${BRAND} 12%,transparent)`, border: `1px solid color-mix(in oklab,${BRAND} 28%,transparent)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <DifIcon name={it.icon} />
                    </div>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.15, color: '#fff' }}>{it.title}</div>
                    <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginTop: 10 }}>{it.desc}</p>
                  </div>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'baseline', gap: 8, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <AnimatedStat value={it.statValue} prefix={it.statPrefix} suffix={it.statSuffix} style={{ fontSize: 28, fontWeight: 700, color: BRAND, lineHeight: 1, letterSpacing: '-0.02em' }} />
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{it.statLabel}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Onde Estamos */}
      <section className="py-24 bg-zinc-950" id="contato">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-4">
              Localização
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Onde estamos
            </h2>
            <p className="text-zinc-400">Fale já com nossos consultores</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {empresa.enderecos.map((end, i) => (
              <FadeIn key={end.unidade} delay={i * 150}>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-colors">
                  <div className="relative group h-52 cursor-pointer">
                    <iframe
                      src={end.embedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Mapa unidade ${end.unidade}`}
                      className="block w-full h-full"
                    />
                    <a
                      href={end.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir unidade ${end.unidade} no Google Maps`}
                      className="absolute inset-0 flex items-end justify-end p-3 hover:bg-black/10 transition-colors"
                    >
                      <span className="bg-white text-zinc-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Abrir no Maps ↗
                      </span>
                    </a>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-white font-bold text-lg">Unidade {end.unidade}</h3>

                    <div className="flex items-start gap-2.5 text-zinc-400 text-sm">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{end.logradouro}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                      <svg className="w-4 h-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>{end.telefone}</span>
                    </div>

                    <div className="flex items-center gap-2.5 text-zinc-400 text-sm">
                      <svg className="w-4 h-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{empresa.horario}</span>
                    </div>

                    {/* WhatsApp da unidade */}
                    <a
                      href={gerarLinkWhatsApp(end.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full border border-zinc-700 hover:border-red-600 hover:bg-zinc-800 rounded-xl px-4 py-3 transition-colors group"
                    >
                      <svg className="w-4 h-4 shrink-0 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span className="text-white font-semibold text-sm">WhatsApp</span>
                      <span className="text-zinc-400 text-sm">{end.whatsappFormatado}</span>
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

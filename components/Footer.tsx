'use client';

import Image from 'next/image';
import Link from 'next/link';
import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';
import { useUnidade } from '@/lib/context/unidade';

const BRAND = '#E10F1E';

const CATALOGO = [
  { label: 'Capacetes',      href: '/catalogo/acessorios/capacetes' },
  { label: 'Capas de Chuva', href: '/catalogo/acessorios/capas-de-chuva' },
  { label: 'Óleos',          href: '/catalogo/acessorios/oleos' },
  { label: 'Acessórios',     href: '/catalogo/acessorios' },
];

const EMPRESA_LINKS = [
  { label: 'Início',        href: '/' },
  { label: 'Sobre nós',     href: '/#sobre' },
  { label: 'Serviços',      href: '/#servicos' },
  { label: 'Diferenciais',  href: '/#diferenciais' },
  { label: 'Onde estamos',  href: '/#contato' },
];

function NavCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 16 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href}
                  className="flex items-center gap-1.5 text-white/75 hover:text-white text-sm transition-colors group">
              {it.label}
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { slug } = useUnidade();
  const numero = slug === 'cabo' ? empresa.enderecos[1].whatsapp : empresa.enderecos[0].whatsapp;
  const whatsappLink = gerarLinkWhatsApp(numero);
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: '#06070a', borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>

      {/* Background watermark */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: -40,
        fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900,
        color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.05em',
        lineHeight: 1, pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap',
        textAlign: 'center', fontFamily: 'sans-serif',
      }}>MOTOSHOCK</div>

      {/* Top accent strip */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 0%, ${BRAND}55 30%, ${BRAND}55 70%, transparent 100%)` }} />

      {/* ── CTA strip ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8 flex-wrap"
           style={{ padding: '36px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontSize: 11, color: BRAND, letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
            <span style={{ width: 28, height: 2, background: BRAND, display: 'inline-block' }} />
            Pronto para rodar?
          </div>
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
            Agende a manutenção da sua moto
          </div>
        </div>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
           style={{
             display: 'flex', alignItems: 'center', gap: 12,
             background: `linear-gradient(180deg, ${BRAND} 0%, #B40D18 100%)`,
             color: '#fff', textDecoration: 'none',
             padding: '14px 22px', borderRadius: 14,
             fontWeight: 700, fontSize: 14,
             boxShadow: `0 12px 30px -8px ${BRAND}88, inset 0 1px 0 rgba(255,255,255,0.18)`,
             transition: 'transform .15s, box-shadow .15s',
             whiteSpace: 'nowrap',
           }}
           onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
           onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0 11.9 11.9 0 0 0 .2 17.7L0 24l6.5-1.7A11.9 11.9 0 0 0 12 23.8a11.9 11.9 0 0 0 11.9-11.9 11.7 11.7 0 0 0-3.4-8.4ZM12 21.7a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Z" />
          </svg>
          Falar no WhatsApp
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 7h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
           style={{ padding: '56px 0', display: 'grid', gridTemplateColumns: '1.4fr 0.9fr 0.9fr', gap: 48, position: 'relative' }}
           >
        {/* Col 1: Brand */}
        <div>
          <Image
            src="/Imagens/motoshock-logo-cut.PNG"
            alt="Motoshock"
            width={1280}
            height={432}
            className="w-full max-w-[180px] h-auto"
          />
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.55, margin: '20px 0 0', maxWidth: 280 }}>
            Especialistas em motos. Manutenção, peças e acessórios em Pernambuco há mais de 25 anos.
          </p>

          {/* Instagram */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 10 }}>
              Siga
            </div>
            <a href="https://www.instagram.com/motoshock.oficial/"
               target="_blank" rel="noopener noreferrer"
               aria-label="Instagram"
               style={{
                 width: 38, height: 38, borderRadius: 10,
                 background: 'rgba(255,255,255,0.04)',
                 border: '1px solid rgba(255,255,255,0.1)',
                 color: 'rgba(255,255,255,0.7)',
                 display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                 textDecoration: 'none', transition: 'background .15s, border-color .15s, color .15s, transform .15s',
               }}
               onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = BRAND; el.style.borderColor = BRAND; el.style.color = '#fff'; el.style.transform = 'translateY(-2px)'; }}
               onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.04)'; el.style.borderColor = 'rgba(255,255,255,0.1)'; el.style.color = 'rgba(255,255,255,0.7)'; el.style.transform = 'none'; }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>

        {/* Col 2: Catálogo */}
        <NavCol title="Catálogo" items={CATALOGO} />

        {/* Col 3: Empresa */}
        <NavCol title="Empresa" items={EMPRESA_LINKS} />
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6 flex-wrap"
             style={{ padding: '22px 0', fontSize: 12, color: 'rgba(255,255,255,0.5)', fontFamily: 'monospace' }}>
          <div>© {year} Motoshock · Todos os direitos reservados</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Aceitamos</span>
            {['VISA', 'MASTER', 'PIX', 'ELO'].map((p) => (
              <span key={p} style={{ fontSize: 10, padding: '4px 8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 4, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.1em', fontWeight: 600 }}>{p}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Privacidade</span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>·</span>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>Termos</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

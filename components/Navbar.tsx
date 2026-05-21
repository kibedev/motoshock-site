'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';
import { tiposAcessorio } from '@/lib/data/acessorios';
import { useUnidade } from '@/lib/context/unidade';

const BRAND = '#E10F1E';

type DropdownId = 'capacetes' | 'capas-de-chuva' | 'acessorios' | 'oleos' | 'contato' | null;

/* ── Icons ── */
const IconChevron = ({ open }: { open: boolean }) => (
  <svg className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 10 10" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M2 4l3 3 3-3" />
  </svg>
);
const IconPin = () => (
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
    <path d="M7 13s-4.5-4-4.5-7a4.5 4.5 0 1 1 9 0c0 3-4.5 7-4.5 7Z" stroke={BRAND} strokeWidth="1.4" />
    <circle cx="7" cy="6" r="1.4" stroke={BRAND} strokeWidth="1.4" />
  </svg>
);
const IconClock = () => (
  <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" />
    <path d="M7 4v3l2 1" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
);
const IconWhatsApp = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0 11.9 11.9 0 0 0 .2 17.7L0 24l6.5-1.7A11.9 11.9 0 0 0 12 23.8a11.9 11.9 0 0 0 11.9-11.9 11.7 11.7 0 0 0-3.4-8.4ZM12 21.7a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Zm5.6-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-.9 1.2-.4.2-.7 0a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5l-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4a3 3 0 0 0-1 2.3 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4 5.2 5.2 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c0-.1-.3-.2-.6-.4Z" />
  </svg>
);
const IconArrow = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconRefresh = () => (
  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

/* ── Dropdown item ── */
function DropItem({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-white/80 hover:text-white hover:bg-red-600/10 transition-colors group"
    >
      <span>{label}</span>
      <span className="text-white/30 group-hover:text-red-500 transition-colors"><IconArrow /></span>
    </Link>
  );
}

export default function Navbar() {
  const [menuMobile, setMenuMobile] = useState(false);
  const [dropdownAberto, setDropdownAberto] = useState<DropdownId>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const { slug, endereco, resetar } = useUnidade();

  const tipoCapacetes    = tiposAcessorio.find((t) => t.slug === 'capacetes')!;
  const tipoCapasDeChuva = tiposAcessorio.find((t) => t.slug === 'capas-de-chuva')!;
  const tipoOleos        = tiposAcessorio.find((t) => t.slug === 'oleos')!;
  const tiposAcessoriosGerais = tiposAcessorio.filter(
    (t) => !['capacetes', 'capas-de-chuva', 'oleos'].includes(t.slug)
  );

  const abrir = (id: DropdownId) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownAberto(id);
  };
  const fechar = () => {
    timerRef.current = setTimeout(() => setDropdownAberto(null), 180);
  };
  const fecharImediato = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDropdownAberto(null);
  };

  const isAtivo = (id: DropdownId): boolean => {
    switch (id) {
      case 'capacetes':    return pathname.startsWith('/catalogo/acessorios/capacetes');
      case 'capas-de-chuva': return pathname.startsWith('/catalogo/acessorios/capas-de-chuva');
      case 'acessorios':   return pathname.startsWith('/catalogo/acessorios') && !pathname.startsWith('/catalogo/acessorios/capacetes') && !pathname.startsWith('/catalogo/acessorios/capas-de-chuva') && !pathname.startsWith('/catalogo/acessorios/oleos');
      case 'oleos':        return pathname.startsWith('/catalogo/acessorios/oleos');
      default: return false;
    }
  };

  const navItems: { id: DropdownId; label: string; href: string }[] = [
    { id: 'capacetes',      label: 'Capacetes',      href: '/catalogo/acessorios/capacetes' },
    { id: 'capas-de-chuva', label: 'Capas de Chuva', href: '/catalogo/acessorios/capas-de-chuva' },
    { id: 'acessorios',     label: 'Acessórios',     href: '/catalogo/acessorios' },
    { id: 'oleos',          label: 'Óleos',          href: '/catalogo/acessorios/oleos' },
  ];

  const endPrazeres = empresa.enderecos[0];
  const endCabo = empresa.enderecos[1];
  const whatsappContato = slug === 'cabo' ? gerarLinkWhatsApp(endCabo.whatsapp) : gerarLinkWhatsApp(endPrazeres.whatsapp);

  const dropdownStyle: React.CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: -10,
    background: 'linear-gradient(180deg, #16181c 0%, #0e1013 100%)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12,
    minWidth: 220,
    padding: 8,
    boxShadow: `0 24px 50px -16px rgba(0,0,0,0.6), 0 0 0 1px ${BRAND}25 inset`,
    zIndex: 20,
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* ── Utility bar ── */}
      <div style={{ background: '#06070a', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 12, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.04em', cursor: 'default' }}
           className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" style={{ padding: '7px 0' }}>
          <div className="flex items-center gap-5">
            {empresa.enderecos.map((end, i) => (
              <span key={end.unidade} className="flex items-center gap-4">
                {i > 0 && <span style={{ width: 1, height: 10, background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />}
                <span className="flex items-center gap-1.5 cursor-default">
                  <IconPin />
                  {end.unidade}
                </span>
              </span>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5"><IconClock />{empresa.horario}</span>
          </div>
        </div>
      </div>

      {/* ── Main bar ── */}
      <div style={{ background: '#0a0b0d', borderBottom: '1px solid rgba(255,255,255,0.08)', position: 'relative' }}>
        {/* Red accent strip */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 0%, ${BRAND}55 30%, ${BRAND}55 70%, transparent 100%)` }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => {
              fecharImediato();
              if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="shrink-0"
          >
            <Image src="/Imagens/logos-motoshock/motoshock-logo.PNG" alt="Motoshock" width={165} height={55} className="w-[150px] h-auto" priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <div key={item.id} onMouseEnter={() => abrir(item.id)} onMouseLeave={fechar} style={{ position: 'relative' }}>
                <Link
                  href={item.href}
                  onClick={fecharImediato}
                  className="flex items-center gap-1.5 text-sm font-medium transition-colors pb-0.5"
                  style={{ color: isAtivo(item.id) || dropdownAberto === item.id ? '#fff' : 'rgba(255,255,255,0.8)' }}
                >
                  {item.label}
                  <IconChevron open={dropdownAberto === item.id} />
                  {/* Underline */}
                  <span style={{
                    position: 'absolute', left: 0, right: 18, bottom: -4, height: 2,
                    background: BRAND,
                    transform: isAtivo(item.id) || dropdownAberto === item.id ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform .25s',
                    borderRadius: 1,
                  }} />
                </Link>
              </div>
            ))}

            {/* ── Right cluster ── */}
            <div className="flex items-center gap-3 ml-4">
              {/* Fale Conosco */}
              <div className="relative" onMouseEnter={() => abrir('contato')} onMouseLeave={fechar}>
                <button
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: `linear-gradient(180deg, ${BRAND} 0%, #B40D18 100%)`,
                    color: '#fff', border: 'none', cursor: 'pointer',
                    padding: '10px 16px', borderRadius: 12,
                    fontWeight: 700, fontSize: 14, fontFamily: 'inherit',
                    boxShadow: `0 10px 24px -8px ${BRAND}88, inset 0 1px 0 rgba(255,255,255,0.18)`,
                    transition: 'transform .15s, box-shadow .15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = `0 14px 30px -8px ${BRAND}AA, inset 0 1px 0 rgba(255,255,255,0.25)`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 10px 24px -8px ${BRAND}88, inset 0 1px 0 rgba(255,255,255,0.18)`; }}
                >
                  <IconWhatsApp />
                  Fale Conosco
                  <IconChevron open={dropdownAberto === 'contato'} />
                </button>

                {dropdownAberto === 'contato' && (
                  <div style={{ ...dropdownStyle, left: 'auto', right: 0, minWidth: 240 }}>
                    {[endPrazeres, endCabo].map((end) => (
                      <a key={end.unidade}
                         href={gerarLinkWhatsApp(end.whatsapp)}
                         target="_blank" rel="noopener noreferrer"
                         className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-600/10 transition-colors group"
                      >
                        <span className="text-green-400 shrink-0"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 3.5A11.7 11.7 0 0 0 12 0 11.9 11.9 0 0 0 .2 17.7L0 24l6.5-1.7A11.9 11.9 0 0 0 12 23.8a11.9 11.9 0 0 0 11.9-11.9 11.7 11.7 0 0 0-3.4-8.4ZM12 21.7a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Zm5.6-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-.9 1.2-.4.2-.7 0a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5l-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4a3 3 0 0 0-1 2.3 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4 5.2 5.2 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c0-.1-.3-.2-.6-.4Z" /></svg></span>
                        <div>
                          <p className="text-white text-sm font-medium leading-tight">{end.unidade}</p>
                          <p className="text-zinc-400 text-xs mt-0.5">{end.whatsappFormatado}</p>
                        </div>
                      </a>
                    ))}
                    {slug && (
                      <>
                        <div className="h-px bg-zinc-800 mx-2 my-1" />
                        <button onClick={() => { resetar(); fecharImediato(); }}
                          className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors text-xs cursor-pointer">
                          <IconRefresh />
                          Trocar unidade preferida
                          {endereco && <span className="ml-auto text-zinc-600">({endereco.unidade})</span>}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuMobile(!menuMobile)} className="md:hidden text-zinc-300 hover:text-white p-2" aria-label="Menu">
            {menuMobile
              ? <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              : <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            }
          </button>
        </div>
      </div>

      {/* ── Dropdown Capacetes ── */}
      {dropdownAberto === 'capacetes' && (
        <div className="absolute top-full inset-x-0 border-b border-zinc-800/50 shadow-2xl"
             style={{ background: 'linear-gradient(180deg, #16181c 0%, #0e1013 100%)' }}
             onMouseEnter={() => abrir('capacetes')} onMouseLeave={fechar}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Capacetes</p>
              <Link href="/catalogo/acessorios/capacetes" onClick={fecharImediato} className="text-[11px] text-red-500 hover:text-red-400 transition-colors">Ver todos →</Link>
            </div>
            <div className="flex flex-wrap gap-1">
              {tipoCapacetes.marcas.map((marca) => (
                <Link key={marca.slug} href={`/catalogo/acessorios/capacetes/${marca.slug}`} onClick={fecharImediato}
                      className="px-4 py-2 text-sm text-zinc-300 bg-zinc-800/50 hover:bg-red-600/10 hover:text-white rounded-lg transition-colors">
                  {marca.nome}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Dropdown Capas de Chuva ── */}
      {dropdownAberto === 'capas-de-chuva' && (
        <div className="absolute top-full inset-x-0 border-b border-zinc-800/50 shadow-2xl"
             style={{ background: 'linear-gradient(180deg, #16181c 0%, #0e1013 100%)' }}
             onMouseEnter={() => abrir('capas-de-chuva')} onMouseLeave={fechar}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Capas de Chuva</p>
              <Link href="/catalogo/acessorios/capas-de-chuva" onClick={fecharImediato} className="text-[11px] text-red-500 hover:text-red-400 transition-colors">Ver todas →</Link>
            </div>
            <div className="flex flex-wrap gap-1">
              {tipoCapasDeChuva.marcas.map((marca) => (
                <Link key={marca.slug} href={`/catalogo/acessorios/capas-de-chuva/${marca.slug}`} onClick={fecharImediato}
                      className="px-4 py-2 text-sm text-zinc-300 bg-zinc-800/50 hover:bg-red-600/10 hover:text-white rounded-lg transition-colors">
                  {marca.nome}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Dropdown Acessórios ── */}
      {dropdownAberto === 'acessorios' && (
        <div className="absolute top-full inset-x-0 border-b border-zinc-800/50 shadow-2xl"
             style={{ background: 'linear-gradient(180deg, #16181c 0%, #0e1013 100%)' }}
             onMouseEnter={() => abrir('acessorios')} onMouseLeave={fechar}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-3">Acessórios</p>
            <div className="flex gap-3">
              {tiposAcessoriosGerais.map((tipo) => (
                <Link key={tipo.slug} href={`/catalogo/acessorios/${tipo.slug}`} onClick={fecharImediato}
                      className="flex flex-col gap-1 bg-zinc-800/50 hover:bg-red-600/10 border border-zinc-700/50 hover:border-red-600/30 rounded-xl px-5 py-3.5 transition-all group">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors whitespace-nowrap">{tipo.nome}</p>
                  <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{tipo.descricao}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Dropdown Óleos ── */}
      {dropdownAberto === 'oleos' && (
        <div className="absolute top-full inset-x-0 border-b border-zinc-800/50 shadow-2xl"
             style={{ background: 'linear-gradient(180deg, #16181c 0%, #0e1013 100%)' }}
             onMouseEnter={() => abrir('oleos')} onMouseLeave={fechar}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Óleos</p>
              <Link href="/catalogo/acessorios/oleos" onClick={fecharImediato} className="text-[11px] text-red-500 hover:text-red-400 transition-colors">Ver todos →</Link>
            </div>
            <div className="flex gap-3">
              {tipoOleos.marcas.map((tipo) => (
                <Link key={tipo.slug} href={`/catalogo/acessorios/oleos/${tipo.slug}`} onClick={fecharImediato}
                      className="flex flex-col gap-1 bg-zinc-800/50 hover:bg-red-600/10 border border-zinc-700/50 hover:border-red-600/30 rounded-xl px-5 py-3.5 transition-all group">
                  <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors whitespace-nowrap">{tipo.nome.replace('Óleo de ', '')}</p>
                  {tipo.produtos.length > 0 && (
                    <p className="text-xs text-zinc-500 group-hover:text-zinc-400 transition-colors">{tipo.produtos.map((p) => p.nome).join(', ')}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile menu ── */}
      {menuMobile && (
        <div className="md:hidden border-t border-zinc-800 px-4 py-4 flex flex-col gap-2"
             style={{ background: 'linear-gradient(180deg, #16181c 0%, #0e1013 100%)' }}>
          {[
            { href: '/catalogo/acessorios/capacetes', label: 'Capacetes', id: 'capacetes' as DropdownId },
            { href: '/catalogo/acessorios/capas-de-chuva', label: 'Capas de Chuva', id: 'capas-de-chuva' as DropdownId },
            { href: '/catalogo/acessorios', label: 'Acessórios', id: 'acessorios' as DropdownId },
            { href: '/catalogo/acessorios/oleos', label: 'Óleos', id: 'oleos' as DropdownId },
          ].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuMobile(false)}
                  className={`text-sm font-medium py-2.5 border-b border-zinc-800 flex items-center justify-between ${isAtivo(item.id) ? 'text-red-500' : 'text-zinc-300'}`}>
              {item.label}
              <IconArrow />
            </Link>
          ))}
          <div className="pt-2">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest pb-2">Fale Conosco</p>
            {[endPrazeres, endCabo].map((end) => (
              <a key={end.unidade} href={gerarLinkWhatsApp(end.whatsapp)} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-between py-2.5 border-b border-zinc-800">
                <span className="text-sm text-zinc-300">{end.unidade}</span>
                <span className="text-zinc-500 text-xs">{end.whatsappFormatado}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

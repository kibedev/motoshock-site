'use client';

import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import ConsultorCard from '@/components/ConsultorCard';
import { tiposAcessorio } from '@/lib/data/acessorios';
import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';
import { useUnidade } from '@/lib/context/unidade';

const segments = [
  { label: 'Início', href: '/' },
  { label: 'Catálogo', href: '/catalogo' },
  { label: 'Acessórios', href: '/catalogo/acessorios' },
  { label: 'Óleos', href: '/catalogo/acessorios/oleos' },
  { label: 'Óleo de Freio' },
];

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function OleoFreioPage() {
  const { slug } = useUnidade();

  const tipoData = tiposAcessorio.find((t) => t.slug === 'oleos')!;
  const marca = tipoData.marcas.find((m) => m.slug === 'oleo-freio')!;

  function getLink(produtoNome: string) {
    const numero = slug === 'cabo' ? empresa.enderecos[1].whatsapp : empresa.enderecos[0].whatsapp;
    return gerarLinkWhatsApp(numero, { produto: `Óleo de Freio — ${produtoNome}` });
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <style>{`
        .of-card {
          position: relative; border-radius: 18px; overflow: hidden;
          background: linear-gradient(180deg, #16181c 0%, #0e1013 100%);
          border: 1px solid rgba(255,255,255,0.06);
          height: 260px; display: block; text-decoration: none; color: inherit;
          transition: transform .25s cubic-bezier(.2,.7,.3,1), border-color .2s, box-shadow .25s;
        }
        .of-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in oklab, var(--brand) 40%, transparent);
          box-shadow: 0 24px 60px -20px color-mix(in oklab, var(--brand) 55%, transparent),
                      0 0 0 1px color-mix(in oklab, var(--brand) 35%, transparent) inset;
        }
        .of-glow { opacity: 0; transition: opacity .25s; pointer-events: none; }
        .of-card:hover .of-glow { opacity: 1; }
        .of-logo { opacity: 0.32; transition: opacity .35s, transform .35s; transform-origin: 70% 60%; }
        .of-card:hover .of-logo { opacity: 0.95; transform: translate(0, -6px) rotate(-3deg); }
        .of-cta { opacity: 0; transform: translateY(4px); transition: opacity .2s, transform .2s; }
        .of-card:hover .of-cta { opacity: 1; transform: translateY(0); }
        .of-consultor-btn {
          display: flex; align-items: center; gap: 14px;
          background: linear-gradient(180deg, #25D366 0%, #1FB955 100%);
          color: #062b14; text-decoration: none;
          padding: 12px 20px; border-radius: 12px;
          box-shadow: 0 8px 24px -6px rgba(37,211,102,0.40);
          transition: transform .2s cubic-bezier(.2,.7,.3,1), box-shadow .2s, filter .2s;
        }
        .of-consultor-btn:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 14px 32px -6px rgba(37,211,102,0.60); filter: brightness(1.08); }
        .of-consultor-btn:active { transform: translateY(0) scale(0.98); }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        <div className="mt-10 mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">{marca.nome}</h1>
          <p className="text-zinc-400">{marca.descricao}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
          {marca.produtos.map((produto) => {
            const brand = produto.brandColor ?? '#E10F1E';
            return (
              <a key={produto.id} href={getLink(produto.nome)} target="_blank" rel="noopener noreferrer"
                 className="of-card" style={{ '--brand': brand } as React.CSSProperties}>
                <div className="of-glow absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 110%, ${brand}55 0%, transparent 60%)` }} />
                {produto.logo && (
                  <div className="of-logo absolute right-0 top-0 h-full w-[55%] flex items-center justify-end pr-5">
                    <Image src={produto.logo} alt={produto.nome} width={140} height={60} className="w-auto max-h-[50%] object-contain drop-shadow-2xl" />
                  </div>
                )}
                <div style={{ position: 'relative', padding: 22, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', boxSizing: 'border-box' }}>
                  <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>{produto.nome}</div>
                  <div className="of-cta" style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: brand, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Solicitar orçamento <IconArrow />
                  </div>
                </div>
              </a>
            );
          })}

        </div>

          <ConsultorCard produto="Óleo de Freio" />
      </div>
    </div>
  );
}

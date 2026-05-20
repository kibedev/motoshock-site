'use client';

import { notFound } from 'next/navigation';
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
  { label: 'Capacetes' },
];

export default function CapacetesPage() {
  const { slug } = useUnidade();
  const tipoData = tiposAcessorio.find((t) => t.slug === 'capacetes');
  if (!tipoData) notFound();

  function getLink(marcaNome: string) {
    const numero = slug === 'cabo' ? empresa.enderecos[1].whatsapp : empresa.enderecos[0].whatsapp;
    return gerarLinkWhatsApp(numero, { produto: `Capacete ${marcaNome}` });
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <style>{`
        .vp-marca-card {
          position: relative;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(180deg, #16181c 0%, #0e1013 100%);
          border: 1px solid rgba(255,255,255,0.06);
          height: 240px;
          display: block;
          text-decoration: none;
          transition: transform .25s cubic-bezier(.2,.7,.3,1), border-color .2s, box-shadow .25s;
        }
        .vp-marca-card:hover {
          transform: translateY(-4px);
          border-color: color-mix(in oklab, var(--brand) 40%, transparent);
          box-shadow: 0 24px 60px -20px color-mix(in oklab, var(--brand) 50%, transparent),
                      0 0 0 1px color-mix(in oklab, var(--brand) 35%, transparent) inset;
        }
        .vp-marca-card .vp-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(at 50% 110%, color-mix(in oklab, var(--brand) 33%, transparent) 0%, transparent 60%);
          opacity: 0;
          transition: opacity .2s;
        }
        .vp-marca-card:hover .vp-glow { opacity: 1; }
        .vp-logo-wrap {
          opacity: 0.32;
          transition: opacity .3s, transform .3s;
        }
        .vp-marca-card:hover .vp-logo-wrap {
          opacity: 0.95;
          transform: translate(0, -4px) rotate(-2deg);
        }
        .vp-cta {
          opacity: 0;
          transform: translateY(4px);
          transition: opacity .2s, transform .2s;
        }
        .vp-marca-card:hover .vp-cta {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-white mb-2">{tipoData.nome}</h1>
          <p className="text-zinc-400 mb-10">{tipoData.descricao}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tipoData.marcas.map((marca) => (
              <a
                key={marca.slug}
                href={getLink(marca.nome)}
                target="_blank"
                rel="noopener noreferrer"
                className="vp-marca-card"
                style={{ '--brand': marca.brandColor ?? '#DC2626' } as React.CSSProperties}
              >
                <div className="vp-glow" />

                {marca.logo && (
                  <div className="vp-logo-wrap absolute right-0 top-0 h-full w-[55%] flex items-center justify-end pr-5">
                    <Image
                      src={marca.logo}
                      alt={marca.nome}
                      width={160}
                      height={140}
                      className="w-auto max-h-[75%] object-contain drop-shadow-2xl"
                    />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <h2 className="text-white font-black text-2xl leading-tight">
                    {marca.nome}
                  </h2>
                  <span
                    className="vp-cta flex items-center gap-1 text-sm font-medium mt-2"
                    style={{ color: 'var(--brand)' }}
                  >
                    Ver catálogo →
                  </span>
                </div>
              </a>
            ))}
          </div>

          <ConsultorCard produto="Capacetes" />
        </div>
      </div>
    </div>
  );
}

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
  { label: 'Acessórios' },
];

const SLUGS_VISIVEIS = ['jaquetas', 'calcas', 'luvas', 'botas'];

const IMAGENS: Record<string, string> = {
  jaquetas: '/Imagens/acessorios-png/jaqueta-x11.png',
  calcas:   '/Imagens/acessorios-png/calça-x11.png',
  luvas:    '/Imagens/acessorios-png/luva-x11.png',
  botas:    '/Imagens/acessorios-png/bota-pantaneiro.png',
};

export default function AcessoriosPage() {
  const { slug } = useUnidade();
  const tipos = tiposAcessorio.filter((t) => SLUGS_VISIVEIS.includes(t.slug));

  function getLink(nome: string) {
    const numero = slug === 'cabo' ? empresa.enderecos[1].whatsapp : empresa.enderecos[0].whatsapp;
    return gerarLinkWhatsApp(numero, { produto: nome });
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <style>{`
        .ac-card {
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
        .ac-card:hover {
          transform: translateY(-4px);
          border-color: rgba(220,38,38,0.4);
          box-shadow: 0 24px 60px -20px rgba(220,38,38,0.5),
                      0 0 0 1px rgba(220,38,38,0.35) inset;
        }
        .ac-glow {
          position: absolute; inset: 0; opacity: 0;
          background: radial-gradient(at 50% 110%, rgba(220,38,38,0.33) 0%, transparent 60%);
          transition: opacity .2s;
        }
        .ac-card:hover .ac-glow { opacity: 1; }
        .ac-img {
          opacity: 0.32;
          transition: opacity .3s, transform .3s;
        }
        .ac-card:hover .ac-img {
          opacity: 0.95;
          transform: translate(0, -4px) rotate(-2deg);
        }
        .ac-cta {
          opacity: 0;
          transform: translateY(4px);
          transition: opacity .2s, transform .2s;
        }
        .ac-card:hover .ac-cta {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-white mb-2">Acessórios</h1>
          <p className="text-zinc-400 mb-10">Selecione a categoria desejada</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tipos.map((tipo) => (
              <a
                key={tipo.slug}
                href={getLink(tipo.nome)}
                target="_blank"
                rel="noopener noreferrer"
                className="ac-card"
              >
                <div className="ac-glow" />

                {IMAGENS[tipo.slug] && (
                  <div className="ac-img absolute right-0 top-0 h-full w-[55%] flex items-center justify-end pr-5">
                    <Image
                      src={IMAGENS[tipo.slug]}
                      alt={tipo.nome}
                      width={160}
                      height={140}
                      className="w-auto max-h-[80%] object-contain drop-shadow-2xl"
                    />
                  </div>
                )}

                <div className="absolute bottom-0 left-0 p-5 z-10">
                  <h2 className="text-white font-black text-2xl leading-tight">
                    {tipo.nome}
                  </h2>
                  <span className="ac-cta flex items-center gap-1 text-sm font-medium mt-2 text-red-500">
                    Ver catálogo →
                  </span>
                </div>
              </a>
            ))}
          </div>

          <ConsultorCard produto="Acessórios" />
        </div>
      </div>
    </div>
  );
}

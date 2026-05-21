'use client';

import Image from 'next/image';
import { empresa } from '@/lib/data/empresa';
import { useUnidade, UnidadeSlug } from '@/lib/context/unidade';

const unidades: { slug: UnidadeSlug; idx: 0 | 1 }[] = [
  { slug: 'prazeres', idx: 0 },
  { slug: 'cabo', idx: 1 },
];

const IconPin = () => (
  <svg className="w-4 h-4 shrink-0 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const IconWA = () => (
  <svg className="w-4 h-4 shrink-0 text-zinc-500" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function SelecionarUnidade({ splashDone }: { splashDone: boolean }) {
  const { slug, hydrated, selecionar } = useUnidade();

  if (!hydrated || !splashDone || slug !== null) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-sm animate-unidade-in">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <Image
            src="/Imagens/logos-motoshock/motoshock-logo.PNG"
            alt="Motoshock"
            width={160}
            height={53}
            className="mx-auto"
          />
          <h2 className="text-white text-xl font-bold mt-6">Selecione sua unidade</h2>
          <p className="text-zinc-400 text-sm mt-2">
            Escolha a unidade mais próxima para um atendimento personalizado
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {unidades.map(({ slug: s, idx }) => {
            const end = empresa.enderecos[idx];
            return (
              <button
                key={s}
                onClick={() => selecionar(s)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 rounded-2xl p-6 text-left transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  <h3 className="text-white font-bold text-base leading-tight">{end.unidade}</h3>
                </div>
                <div className="space-y-2 mb-5">
                  <p className="text-zinc-400 text-sm flex items-start gap-2">
                    <IconPin />
                    {end.logradouro}
                  </p>
                  <p className="text-zinc-400 text-sm flex items-center gap-2">
                    <IconWA />
                    {end.whatsappFormatado}
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-red-500 text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                  Selecionar <span>→</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="text-center">
          <button
            onClick={() => selecionar('ambas')}
            className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors cursor-pointer"
          >
            Continuar sem selecionar
          </button>
        </div>
      </div>
    </div>
  );
}

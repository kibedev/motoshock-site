'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { empresa } from '@/lib/data/empresa';

export const STORE_KEY = 'motoshock_unidade';

export default function StoreSelector() {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORE_KEY)) {
      setAberto(true);
    }
  }, []);

  const selecionar = (slug: string) => {
    localStorage.setItem(STORE_KEY, slug);
    setAberto(false);
  };

  if (!aberto) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-zinc-950/85 backdrop-blur-sm px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-red-600 px-8 pt-8 pb-6 text-center">
          <Image
            src="/Imagens/logos-motoshock/favicon-verm.png"
            alt="Motoshock"
            width={72}
            height={72}
            className="mx-auto mb-4 rounded-xl"
          />
          <Image
            src="/Imagens/logos-motoshock/motoshock-logo-cut.PNG"
            alt="Motoshock"
            width={200}
            height={67}
            className="mx-auto w-44 h-auto"
          />
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          <p className="text-white font-semibold text-center mb-5">
            Com qual unidade deseja entrar em contato?
          </p>

          <div className="flex flex-col gap-3">
            {empresa.enderecos.map((end) => (
              <button
                key={end.unidade}
                onClick={() => selecionar(end.unidade)}
                className="w-full bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-600 rounded-xl p-4 text-left transition-all group"
              >
                <p className="text-white font-bold text-sm">{end.unidade}</p>
                <p className="text-zinc-400 text-xs mt-0.5 group-hover:text-red-100">
                  {end.logradouro}
                </p>
                <p className="text-zinc-500 text-xs mt-1 group-hover:text-red-200">
                  WhatsApp: {end.whatsappFormatado}
                </p>
              </button>
            ))}
          </div>

          <p className="text-zinc-600 text-xs text-center mt-5">
            Você pode mudar sua preferência a qualquer momento.
          </p>
        </div>
      </div>
    </div>
  );
}

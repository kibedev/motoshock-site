'use client';

import Image from 'next/image';
import { useUnidade } from '@/lib/context/unidade';
import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';

type Produto = {
  id: string;
  nome: string;
  logo?: string;
  descricao?: string;
};

type Props = {
  produtos: readonly Produto[];
  marcaNome: string;
};

export default function GradeProdutos({ produtos, marcaNome }: Props) {
  const { slug } = useUnidade();

  function getLink(produtoNome: string) {
    const numero =
      slug === 'prazeres' ? empresa.enderecos[0].whatsapp
      : slug === 'cabo'   ? empresa.enderecos[1].whatsapp
      : empresa.enderecos[0].whatsapp;
    return gerarLinkWhatsApp(numero, { produto: `${marcaNome} — ${produtoNome}` });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-10">
      {produtos.map((produto) => (
        <a
          key={produto.id}
          href={getLink(produto.nome)}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 rounded-xl overflow-hidden transition-all group"
        >
          {/* Área da logo — fundo branco como nos cards de capacetes */}
          <div className="h-28 flex items-center justify-center bg-white p-4">
            {produto.logo ? (
              <Image
                src={produto.logo}
                alt={produto.nome}
                width={160}
                height={80}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-zinc-500 font-bold text-lg">{produto.nome}</span>
            )}
          </div>

          {/* Nome */}
          <div className="px-4 py-3 text-center">
            <span className="text-zinc-200 group-hover:text-white font-semibold text-sm block">
              {produto.nome}
            </span>
            {produto.descricao && (
              <span className="text-zinc-500 text-xs mt-0.5 block">{produto.descricao}</span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}

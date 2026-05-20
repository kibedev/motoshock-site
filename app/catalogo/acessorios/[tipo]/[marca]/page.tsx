import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import { tiposAcessorio } from '@/lib/data/acessorios';
import GradeProdutos from '@/components/GradeProdutos';
import BotoesOrcamento from '@/components/BotoesOrcamento';

export default async function MarcaAcessorioPage({
  params,
}: {
  params: Promise<{ tipo: string; marca: string }>;
}) {
  const { tipo: tipoSlug, marca: marcaSlug } = await params;

  const tipoData = tiposAcessorio.find((t) => t.slug === tipoSlug);
  if (!tipoData) notFound();

  const marcaData = tipoData.marcas.find((m) => m.slug === marcaSlug);
  if (!marcaData) notFound();

  const segments = [
    { label: 'Início', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: 'Acessórios', href: '/catalogo/acessorios' },
    { label: tipoData.nome, href: `/catalogo/acessorios/${tipoSlug}` },
    { label: marcaData.nome },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-white mb-1">{marcaData.nome}</h1>
          <p className="text-zinc-400 mb-10">{tipoData.nome}</p>

          {marcaData.produtos.length > 0 && (
            <GradeProdutos
              produtos={marcaData.produtos}
              marcaNome={marcaData.nome}
            />
          )}

          <BotoesOrcamento
            tipoNome={tipoData.nome}
            marcaNome={marcaData.nome}
            temProdutos={marcaData.produtos.length > 0}
          />
        </div>
      </div>
    </div>
  );
}

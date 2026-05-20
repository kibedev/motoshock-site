import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { marcas } from '@/lib/data/marcas';

export default async function MarcaPage({
  params,
}: {
  params: Promise<{ marca: string }>;
}) {
  const { marca: marcaSlug } = await params;

  const marcaData = marcas.find((m) => m.slug === marcaSlug);
  if (!marcaData || !marcaData.disponivel) notFound();

  const segments = [
    { label: 'Início', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: marcaData.nome },
  ];

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        <div className="mt-10">
          <h1 className="text-3xl font-bold text-white mb-2">{marcaData.nome}</h1>
          <p className="text-zinc-400 mb-10">Selecione o modelo da sua moto</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {marcaData.modelos.map((modelo) => (
              <Link
                key={modelo.slug}
                href={`/catalogo/${marcaSlug}/${modelo.slug}`}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 rounded-xl p-5 text-center transition-all group"
              >
                <span className="text-zinc-200 group-hover:text-white font-semibold text-sm block">
                  {modelo.nome}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

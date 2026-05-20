import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { marcas } from '@/lib/data/marcas';
import { categoriasPecas } from '@/lib/data/categorias-pecas';
import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';

export default async function ModeloPage({
  params,
  searchParams,
}: {
  params: Promise<{ marca: string; modelo: string }>;
  searchParams: Promise<{ categoria?: string; sub?: string }>;
}) {
  const { marca: marcaSlug, modelo: modeloSlug } = await params;
  const { categoria: categoriaSlug, sub: subSlug } = await searchParams;

  const marcaData = marcas.find((m) => m.slug === marcaSlug);
  if (!marcaData || !marcaData.disponivel) notFound();

  const modeloData = marcaData.modelos.find((m) => m.slug === modeloSlug);
  if (!modeloData) notFound();

  const categoriaData = categoriaSlug
    ? categoriasPecas.find((c) => c.slug === categoriaSlug)
    : null;

  const subcategoriaData =
    categoriaData && subSlug
      ? categoriaData.subcategorias.find((s) => s.slug === subSlug)
      : null;

  const baseUrl = `/catalogo/${marcaSlug}/${modeloSlug}`;

  const segments = [
    { label: 'Início', href: '/' },
    { label: 'Catálogo', href: '/catalogo' },
    { label: marcaData.nome, href: `/catalogo/${marcaSlug}` },
    { label: modeloData.nome, href: baseUrl },
    ...(categoriaData
      ? [
          {
            label: categoriaData.nome,
            href: subcategoriaData ? `${baseUrl}?categoria=${categoriaSlug}` : undefined,
          },
        ]
      : []),
    ...(subcategoriaData ? [{ label: subcategoriaData.nome }] : []),
  ];

  const whatsappLink = gerarLinkWhatsApp(empresa.whatsapp, {
    marca: marcaData.nome,
    modelo: modeloData.nome,
    categoria: categoriaData?.nome,
    subcategoria: subcategoriaData?.nome,
  });

  const WhatsAppCTA = ({ label }: { label: string }) => (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg">
      <p className="text-zinc-300 mb-6 leading-relaxed">{label}</p>
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl transition-colors text-sm"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Solicitar Orçamento via WhatsApp
      </a>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Breadcrumb segments={segments} />

        {/* Nível 3: subcategoria selecionada → CTA WhatsApp */}
        {subcategoriaData ? (
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-white mb-1">{subcategoriaData.nome}</h1>
            <p className="text-zinc-500 mb-10">
              {categoriaData?.nome} · {marcaData.nome} {modeloData.nome}
            </p>
            <WhatsAppCTA
              label={`Consulte nossos consultores sobre disponibilidade de peças de ${subcategoriaData.nome} para o modelo ${marcaData.nome} ${modeloData.nome}.`}
            />
          </div>
        ) : categoriaData ? (
          /* Nível 2: categoria selecionada → subcategorias */
          <div className="mt-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-3xl font-bold text-white">{categoriaData.nome}</h1>
                <p className="text-zinc-500 mt-1">
                  {marcaData.nome} {modeloData.nome}
                </p>
              </div>
              <Link
                href={baseUrl}
                className="text-sm text-zinc-500 hover:text-zinc-200 transition-colors"
              >
                ← Categorias
              </Link>
            </div>

            {categoriaData.subcategorias.length === 0 ? (
              <WhatsAppCTA
                label={`Consulte nossos consultores sobre disponibilidade de ${categoriaData.nome} para o modelo ${marcaData.nome} ${modeloData.nome}.`}
              />
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categoriaData.subcategorias.map((sub) => (
                  <Link
                    key={sub.slug}
                    href={`${baseUrl}?categoria=${categoriaSlug}&sub=${sub.slug}`}
                    className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 rounded-xl p-5 transition-all group"
                  >
                    <span className="text-zinc-200 group-hover:text-white font-medium text-sm">
                      {sub.nome}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Nível 1: todas as categorias de peças */
          <div className="mt-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              {marcaData.nome} {modeloData.nome}
            </h1>
            <p className="text-zinc-400 mb-10">Selecione uma categoria de peças</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categoriasPecas.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`${baseUrl}?categoria=${cat.slug}`}
                  className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 rounded-xl p-5 transition-all group"
                >
                  <span className="text-zinc-200 group-hover:text-white font-medium text-sm block mb-1">
                    {cat.nome}
                  </span>
                  {cat.subcategorias.length > 0 && (
                    <span className="text-zinc-600 text-xs">
                      {cat.subcategorias.length} itens
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import Link from 'next/link';
import { marcas } from '@/lib/data/marcas';

export default function CatalogoPage() {
  const marcasDisponiveis = marcas.filter((m) => m.disponivel);
  const marcasEmBreve = marcas.filter((m) => !m.disponivel);

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
            Catálogo
          </p>
          <h1 className="text-4xl font-bold text-white mb-3">Peças por modelo</h1>
          <p className="text-zinc-400 text-lg">
            Selecione a marca da sua moto para encontrar as peças disponíveis
          </p>
        </div>

        {/* Marcas disponíveis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
          {marcasDisponiveis.map((marca) => (
            <Link
              key={marca.slug}
              href={`/catalogo/${marca.slug}`}
              className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-red-600 rounded-xl p-6 text-center transition-all group"
            >
              <span className="text-white font-bold text-lg block group-hover:text-red-400 transition-colors">
                {marca.nome}
              </span>
              <span className="text-zinc-500 text-xs mt-1 block">
                {marca.modelos.length} {marca.modelos.length === 1 ? 'modelo' : 'modelos'}
              </span>
            </Link>
          ))}
        </div>

        {/* Em breve */}
        {marcasEmBreve.length > 0 && (
          <div className="mb-16">
            <p className="text-zinc-600 text-xs font-semibold uppercase tracking-widest mb-4">
              Em breve
            </p>
            <div className="flex flex-wrap gap-3">
              {marcasEmBreve.map((marca) => (
                <span
                  key={marca.slug}
                  className="bg-zinc-900/50 border border-zinc-800 rounded-lg px-4 py-2 text-zinc-600 text-sm"
                >
                  {marca.nome}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Acessórios */}
        <div className="border-t border-zinc-800 pt-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-2xl">
            <p className="text-red-500 text-xs font-bold uppercase tracking-widest mb-3">
              Acessórios e Produtos
            </p>
            <h2 className="text-2xl font-bold text-white mb-3">
              Capacetes, Capas, Jaquetas e Óleos
            </h2>
            <p className="text-zinc-400 mb-6">
              Acessórios das melhores marcas para motociclistas e motoboys.
            </p>
            <Link
              href="/catalogo/acessorios"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm"
            >
              Ver Acessórios →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

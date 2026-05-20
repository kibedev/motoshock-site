'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { empresa } from '@/lib/data/empresa';

export type UnidadeSlug = 'prazeres' | 'cabo' | 'ambas';

type Endereco = (typeof empresa.enderecos)[number];

type UnidadeContextType = {
  slug: UnidadeSlug | null;
  hydrated: boolean;
  endereco: Endereco | null;
  selecionar: (u: UnidadeSlug) => void;
  resetar: () => void;
};

const UnidadeContext = createContext<UnidadeContextType>({
  slug: null,
  hydrated: false,
  endereco: null,
  selecionar: () => {},
  resetar: () => {},
});

const KEY = 'motoshock-unidade';

export function UnidadeProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<UnidadeSlug | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) as UnidadeSlug | null;
    if (saved === 'prazeres' || saved === 'cabo' || saved === 'ambas') {
      setSlug(saved);
    }
    setHydrated(true);
  }, []);

  const selecionar = (u: UnidadeSlug) => {
    localStorage.setItem(KEY, u);
    setSlug(u);
  };

  const resetar = () => {
    localStorage.removeItem(KEY);
    setSlug(null);
  };

  const endereco =
    slug === 'prazeres'
      ? empresa.enderecos[0]
      : slug === 'cabo'
      ? empresa.enderecos[1]
      : null;

  return (
    <UnidadeContext.Provider value={{ slug, hydrated, endereco, selecionar, resetar }}>
      {children}
    </UnidadeContext.Provider>
  );
}

export const useUnidade = () => useContext(UnidadeContext);

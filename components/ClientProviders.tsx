'use client';

import { useState, ReactNode } from 'react';
import { UnidadeProvider } from '@/lib/context/unidade';
import SplashScreen from './SplashScreen';
import SelecionarUnidade from './SelecionarUnidade';

export default function ClientProviders({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <UnidadeProvider>
      <SplashScreen onComplete={() => setSplashDone(true)} />
      <SelecionarUnidade splashDone={splashDone} />
      {children}
    </UnidadeProvider>
  );
}

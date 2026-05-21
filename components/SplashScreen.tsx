'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function SplashScreen({ onComplete }: { onComplete?: () => void }) {
  const [ativo, setAtivo] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ativo) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Raio cai de cima com fade in
      tl.fromTo(
        symbolRef.current,
        { opacity: 0, y: -140 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
      )

      // 2. Pausa no centro
      .to({}, { duration: 0.65 })

      // 3. Raio some deslizando para a direita até sair da tela
      .to(symbolRef.current, {
        x: '110vw',
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
      })

      // 4. Fundo vermelho sobe revelando a hero
      .to(overlayRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power3.inOut',
        onComplete: () => { setAtivo(false); onComplete?.(); },
      }, '-=0.1');
    });

    return () => ctx.revert();
  }, [ativo]);

  if (!ativo) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-red-600 overflow-hidden"
    >
      <div ref={symbolRef} className="flex items-center justify-center">
        <Image
          src="/Imagens/logos-motoshock/raio-motoshock.PNG"
          alt="Motoshock"
          width={320}
          height={420}
          className="w-64 sm:w-80 md:w-96 lg:w-[28rem] h-auto"
          priority
        />
      </div>
    </div>
  );
}

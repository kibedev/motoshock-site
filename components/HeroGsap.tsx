'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroWhatsappButton from './HeroWhatsappButton';

const MOTO  = ['M', 'O', 'T', 'O'];
const SHOCK = ['S', 'H', 'O', 'C', 'K'];

type Props = {
  slogan: string;
  whatsappLink: string;
};

export default function HeroGsap({ slogan, whatsappLink }: Props) {
  const containerRef   = useRef<HTMLDivElement>(null);
  const lineRef        = useRef<HTMLDivElement>(null);
  const tagRef         = useRef<HTMLParagraphElement>(null);
  const motoRefs       = useRef<HTMLSpanElement[]>([]);
  const shockRefs      = useRef<HTMLSpanElement[]>([]);
  const dividerRef     = useRef<HTMLDivElement>(null);
  const sloganRef      = useRef<HTMLParagraphElement>(null);
  const buttonsRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Linha vermelha central varre da esquerda
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.55, ease: 'power4.inOut' }
      )

      // 2. Tag "Especialistas em motos"
      .fromTo(
        tagRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.15'
      )

      // 3. MOTO — letras sobem uma a uma
      .fromTo(
        motoRefs.current,
        { opacity: 0, y: 70, skewX: -8 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'back.out(1.4)',
        },
        '-=0.1'
      )

      // 4. SHOCK — letras sobem continuando o stagger (vermelho)
      .fromTo(
        shockRefs.current,
        { opacity: 0, y: 70, skewX: -8 },
        {
          opacity: 1,
          y: 0,
          skewX: 0,
          duration: 0.65,
          stagger: 0.07,
          ease: 'back.out(1.4)',
        },
        '-=0.45'
      )

      // 5. Divisor e slogan
      .fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: 'center' },
        { scaleX: 1, duration: 0.4, ease: 'power2.inOut' },
        '-=0.1'
      )
      .fromTo(
        sloganRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55 },
        '-=0.25'
      )

      // 6. Botões
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      )

      // 7. Pulse contínuo em "SHOCK" após a entrada
      .call(() => {
        gsap.to(shockRefs.current, {
          textShadow: '0 0 28px rgba(220,38,38,0.75), 0 0 8px rgba(220,38,38,0.4)',
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: { each: 0.06, repeat: -1, yoyo: true },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
      {/* Linha decorativa superior */}
      <div
        ref={lineRef}
        className="w-14 h-[3px] bg-red-600 mx-auto mb-5 rounded-full"
      />

      {/* Tag */}
      <p
        ref={tagRef}
        className="text-red-500 text-[11px] font-bold uppercase tracking-[0.35em] mb-5 opacity-0"
      >
        Especialistas em motos
      </p>

      {/* MOTOSHOCK */}
      <h1 className="font-black leading-none mb-0 select-none">
        <span className="flex items-baseline justify-center flex-nowrap whitespace-nowrap">
          {/* MOTO — branco */}
          {MOTO.map((letter, i) => (
            <span
              key={`moto-${i}`}
              ref={(el) => { if (el) motoRefs.current[i] = el; }}
              className="inline-block text-white opacity-0"
              style={{ fontSize: 'clamp(2rem, 8vw, 9rem)', lineHeight: 1 }}
            >
              {letter}
            </span>
          ))}

          {/* Espaço proporcional entre MOTO e SHOCK */}
          <span style={{ width: 'clamp(0.4rem, 1.5vw, 1.8rem)', display: 'inline-block', flexShrink: 0 }} />

          {/* SHOCK — vermelho */}
          {SHOCK.map((letter, i) => (
            <span
              key={`shock-${i}`}
              ref={(el) => { if (el) shockRefs.current[i] = el; }}
              className="inline-block text-red-600 opacity-0"
              style={{ fontSize: 'clamp(2rem, 8vw, 9rem)', lineHeight: 1 }}
            >
              {letter}
            </span>
          ))}
        </span>
      </h1>

      {/* Divisor */}
      <div
        ref={dividerRef}
        className="w-24 h-px bg-zinc-700 mx-auto mt-6 mb-6"
      />

      {/* Slogan */}
      <p
        ref={sloganRef}
        className="text-base md:text-xl text-zinc-300 mb-10 font-light tracking-widest uppercase opacity-0"
      >
        {slogan}
      </p>

      {/* Botões */}
      <div
        ref={buttonsRef}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
      >
        <HeroWhatsappButton />
      </div>
    </div>
  );
}

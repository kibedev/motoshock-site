'use client';

import { useUnidade } from '@/lib/context/unidade';
import { empresa } from '@/lib/data/empresa';

const MSG = encodeURIComponent('Olá! Gostaria de mais informações.');

export default function HeroWhatsappButton() {
  const { slug, endereco } = useUnidade();

  const numero = slug === 'cabo'
    ? empresa.enderecos[1].whatsapp
    : empresa.enderecos[0].whatsapp;

  return (
    <a
      href={`https://wa.me/${numero}?text=${MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full sm:w-auto border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-900 text-zinc-300 hover:text-white font-semibold px-10 py-4 rounded-xl transition-all text-center text-sm"
    >
      Fale no WhatsApp
    </a>
  );
}

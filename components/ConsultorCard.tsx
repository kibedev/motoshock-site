'use client';

import { empresa } from '@/lib/data/empresa';
import { gerarLinkWhatsApp } from '@/lib/utils';

type Props = {
  produto?: string;
};

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 7h8m0 0l-3-3m3 3l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconWhatsApp = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }} aria-hidden="true">
    <path d="M20.5 3.5A11.7 11.7 0 0 0 12 0 11.9 11.9 0 0 0 .2 17.7L0 24l6.5-1.7A11.9 11.9 0 0 0 12 23.8a11.9 11.9 0 0 0 11.9-11.9 11.7 11.7 0 0 0-3.4-8.4ZM12 21.7a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4a9.8 9.8 0 1 1 8.3 4.6Zm5.6-7.3c-.3-.2-1.8-.9-2.1-1s-.5-.1-.7.1-.8 1-.9 1.2-.4.2-.7 0a8 8 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5l-.9-2.2c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4a3 3 0 0 0-1 2.3 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4 5.2 5.2 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c0-.1-.3-.2-.6-.4Z" />
  </svg>
);

export default function ConsultorCard({ produto }: Props) {
  return (
    <div
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #14161a 0%, #0c0e11 100%)',
        border: '1px solid rgba(255,255,255,0.06)',
        padding: '26px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 24,
        position: 'relative',
        flexWrap: 'wrap',
        marginTop: 18,
      }}
    >
      {/* Green accent glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 100% 50%, rgba(37,211,102,0.10) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', maxWidth: 460 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
          background: 'rgba(37,211,102,0.10)',
          border: '1px solid rgba(37,211,102,0.25)',
          padding: '5px 10px', borderRadius: 999, marginBottom: 12,
        }}>
          <span style={{ width: 6, height: 6, background: '#25D366', borderRadius: '50%', boxShadow: '0 0 8px #25D366' }} />
          Atendimento direto
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
          Fale com um consultor
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 6 }}>
          Verifique disponibilidade, modelos e valores diretamente com a equipe.
        </div>
      </div>

      <style>{`
        .consultor-btn {
          display: flex; align-items: center; gap: 14;
          background: linear-gradient(180deg, #25D366 0%, #1FB955 100%);
          color: #062b14; text-decoration: none;
          padding: 12px 20px; border-radius: 12px;
          box-shadow: 0 8px 24px -6px rgba(37,211,102,0.40);
          transition: transform .2s cubic-bezier(.2,.7,.3,1), box-shadow .2s, filter .2s;
        }
        .consultor-btn:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 32px -6px rgba(37,211,102,0.60);
          filter: brightness(1.08);
        }
        .consultor-btn:active {
          transform: translateY(0) scale(0.98);
        }
      `}</style>

      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 260 }}>
        {empresa.enderecos.map((end) => (
          <a
            key={end.unidade}
            href={gerarLinkWhatsApp(end.whatsapp, produto ? { produto } : undefined)}
            target="_blank"
            rel="noopener noreferrer"
            className="consultor-btn"
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              color: '#062b14', textDecoration: 'none',
              padding: '12px 20px', borderRadius: 12,
            }}
          >
            <IconWhatsApp />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{end.unidade}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'rgba(6,43,20,0.75)', marginTop: 1 }}>{end.whatsappFormatado}</div>
            </div>
            <IconArrow />
          </a>
        ))}
      </div>
    </div>
  );
}

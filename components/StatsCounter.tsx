'use client';

import { useEffect, useRef, useState } from 'react';

const BRAND = '#E10F1E';

type Stat = { target: number; suffix: string; label: string; icon: React.ReactNode };

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function StatCard({ stat, active, delay }: { stat: Stat; active: boolean; delay: number }) {
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(t);
  }, [active, delay]);
  const count = useCountUp(stat.target, 1600, started);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, flex: '1 1 0', minWidth: 0 }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: `color-mix(in oklab, ${BRAND} 14%, transparent)`,
        border: `2px solid color-mix(in oklab, ${BRAND} 40%, transparent)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 0 18px -4px color-mix(in oklab, ${BRAND} 35%, transparent)`,
      }}>
        {stat.icon}
      </div>
      <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>
        {count}{stat.suffix}
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.18em', textTransform: 'uppercase', textAlign: 'center' }}>
        {stat.label}
      </div>
    </div>
  );
}

const iconProps = { width: 26, height: 26, viewBox: '0 0 24 24', fill: 'none' as const, stroke: BRAND, strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true as const };

const STATS: Stat[] = [
  {
    target: 25, suffix: '+', label: 'Anos de Experiência',
    icon: <svg {...iconProps}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>,
  },
  {
    target: 15, suffix: '+', label: 'Marcas Parceiras',
    icon: (
      <svg {...iconProps}>
        <path d="M9 2H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
        <path d="M20 2h-5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/>
        <path d="M9 13H4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2Z"/>
        <path d="M20 13h-5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2Z"/>
      </svg>
    ),
  },
  {
    target: 5, suffix: 'K+', label: 'Clientes Atendidos',
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="7" r="3"/>
        <path d="M3 21v-2a5 5 0 0 1 10 0v2"/>
        <path d="M16 11a3 3 0 1 0 0-6"/>
        <path d="M22 21v-2a5 5 0 0 0-4-4.9"/>
      </svg>
    ),
  },
];

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      display: 'flex', gap: 0, marginTop: 48,
      padding: '32px 36px',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 20,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `radial-gradient(ellipse at 50% 120%, color-mix(in oklab, ${BRAND} 12%, transparent) 0%, transparent 65%)`,
        pointerEvents: 'none',
      }} />
      {STATS.map((stat, i) => (
        <div key={stat.label} style={{
          flex: '1 1 0', display: 'flex', alignItems: 'center', position: 'relative',
          borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
          padding: i === 0 ? '0 32px 0 0' : i === STATS.length - 1 ? '0 0 0 32px' : '0 32px',
        }}>
          <StatCard stat={stat} active={active} delay={i * 150} />
        </div>
      ))}
    </div>
  );
}

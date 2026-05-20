import Link from 'next/link';

type Segment = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ segments }: { segments: Segment[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-zinc-400 flex-wrap">
      {segments.map((seg, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-zinc-700" aria-hidden>›</span>}
          {seg.href ? (
            <Link href={seg.href} className="hover:text-white transition-colors">
              {seg.label}
            </Link>
          ) : (
            <span className="text-zinc-200" aria-current="page">
              {seg.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

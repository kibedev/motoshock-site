import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientProviders from '@/components/ClientProviders';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Motoshock – Sua preferência, nosso maior valor',
  description:
    'Especialistas em manutenção de motos e venda de peças e acessórios. Unidades em Prazeres e Cabo de Santo Agostinho, PE.',
  icons: {
    icon: [
      { url: '/Imagens/logos-motoshock/fav-icon-red.png', sizes: '32x32', type: 'image/png' },
      { url: '/Imagens/logos-motoshock/fav-icon-red.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/Imagens/logos-motoshock/fav-icon-red.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-50">
        <ClientProviders>
          <Navbar />
          <main className="flex-1 pt-[100px]">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}

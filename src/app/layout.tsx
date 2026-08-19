import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { BackgroundFX } from '@/components/layout/BackgroundFX';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { CursorGlow } from '@/components/ui/CursorGlow';
import { site } from '@/data/site';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    'software house',
    'custom web development',
    'AI solutions',
    'ERP systems',
    'SaaS development',
    'Karachi',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    locale: 'en_US',
    url: site.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#05050c',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[linear-gradient(100deg,#7C3AED,#2563EB)] focus:px-5 focus:py-2.5 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        {/*
          The design wraps everything in an `overflow-x: hidden` shell. `clip`
          gives the same overflow containment without turning the wrapper into a
          scroll container, which would stop the sticky header from sticking.
        */}
        <div className="relative overflow-x-clip bg-ink">
          <BackgroundFX />
          <CursorGlow />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

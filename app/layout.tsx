import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import 'animate.css';
import 'katex/dist/katex.min.css';
import { ThemeProvider } from '@/lib/hooks/use-theme';
import { I18nProvider } from '@/lib/hooks/use-i18n';
import { Toaster } from '@/components/ui/sonner';
import { ServerProvidersInit } from '@/components/server-providers-init';
import { AccessCodeGuard } from '@/components/access-code-guard';

const inter = localFont({
  src: '../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2',
  variable: '--font-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'CALE — Automation Now, LLC',
  description:
    'The AI-powered interactive classroom. Upload a PDF to instantly generate an immersive, multi-agent learning experience. Powered by Automation Now, LLC.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/*
          WCAG 2.1 SC 2.4.1 — Skip Navigation Link
          Allows keyboard and screen reader users to bypass repeated navigation
          and jump directly to the main content area.
        */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[9999] focus:rounded focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>

        <ThemeProvider>
          <I18nProvider>
            <ServerProvidersInit />
            {/*
              WCAG 2.1 SC 1.3.1 / 4.1.2 — ARIA Landmark: main
              The id="main-content" is the skip-nav target.
            */}
            <main id="main-content">
              <AccessCodeGuard>{children}</AccessCodeGuard>
            </main>
            <Toaster position="top-center" />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

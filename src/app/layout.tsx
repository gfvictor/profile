import type { Metadata, Viewport } from 'next'
import { KoHo } from 'next/font/google'
import { ThemeProvider, I18nProvider, BuilderProvider } from '@/providers'
import './globals.css'

const koho = KoHo({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-koho',
})

const siteUrl = 'https://codifylab.online'
const title = 'Victor Farias | Desenvolvedor de Software'
const description =
  'Desenvolvedor de software criando sistemas sob medida para pequenos negócios — de agendamento a pagamento, com a sua marca. Fundador da Codify Lab.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  keywords: [
    'criar site',
    'criar site profissional',
    'criar site para meu negócio',
    'criar aplicativo',
    'criar loja virtual',
    'criar loja online',
    'site customizado',
    'app customizado',
    'desenvolvedor de site no Japão',
    'criar site no Japão',
    'programador no Japão',
    'site customizado no Japão',
    'app customizado no Japão',
    'criar landing page no Japão',
    'sistema de agendamento online',
    'sistema para pequenos negócios',
    'quanto custa criar um site',
  ],
  authors: [{ name: 'Victor Farias', url: siteUrl }],
  creator: 'Victor Farias',
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Victor Farias',
    locale: 'pt_BR',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Victor Farias',
  jobTitle: 'Desenvolvedor de Software',
  url: siteUrl,
  image: `${siteUrl}/avatar/victor-light.jpg`,
  sameAs: ['https://github.com/gfvictor'],
  worksFor: {
    '@type': 'Organization',
    name: 'Codify Lab',
    url: siteUrl,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${koho.variable} h-svh antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="bg-background flex min-h-svh flex-col font-sans lowercase">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <BuilderProvider>
              <div className="bg-background fixed inset-0 z-[9999] hidden flex-col items-center justify-center p-8 text-center [@media(pointer:coarse)_and_(orientation:landscape)]:flex">
                <span className="font-koho text-foreground text-2xl tracking-widest lowercase">
                  Modo Retrato
                </span>
                <span className="text-muted-foreground mt-4 max-w-sm font-mono text-sm">
                  Esta experiência foi arquitetada estritamente para o modo retrato em dispositivos
                  móveis. Por favor, gire seu aparelho.
                </span>
              </div>
              <main className="w-full flex-1 [@media(pointer:coarse)_and_(orientation:landscape)]:hidden">
                {children}
              </main>
            </BuilderProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

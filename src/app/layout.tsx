import type { Metadata, Viewport } from 'next'
import { KoHo } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider, I18nProvider, BuilderProvider } from '@/providers'
import { buildGAInitScript } from '@/lib'
import './globals.css'

const koho = KoHo({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-koho',
})

export const metadata: Metadata = {
  title: 'Victor Farias | Software Developer',
  description: 'Minimalist personal profile and digital portfolio.',
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
    <html lang="en" className={`${koho.variable} h-svh antialiased`} suppressHydrationWarning>
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
        <Script id="ga-init" strategy="afterInteractive">
          {buildGAInitScript(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!)}
        </Script>
        <Script
          id="ga-script"
          src={`/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}

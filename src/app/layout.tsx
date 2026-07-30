import type { Metadata, Viewport } from 'next'
import { KoHo } from 'next/font/google'
import { ThemeProvider, I18nProvider, BuilderProvider } from '@/providers'
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${koho.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="bg-background flex min-h-full flex-col font-sans lowercase">
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

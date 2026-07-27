import type { Metadata } from 'next'
import { KoHo } from 'next/font/google'
import { ThemeProvider, I18nProvider } from '@/providers'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${koho.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="bg-background flex min-h-full flex-col font-sans lowercase">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <I18nProvider>
            <main className="w-full flex-1">{children}</main>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

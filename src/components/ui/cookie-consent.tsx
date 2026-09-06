'use client'

import Script from 'next/script'
import { useSyncExternalStore } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { buildGAInitScript } from '@/lib'

type Consent = 'pending' | 'accepted' | 'declined'

const STORAGE_KEY = 'cookie-consent'
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot(): Consent {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored === 'accepted' || stored === 'declined' ? stored : 'pending'
}

function getServerSnapshot(): Consent {
  return 'pending'
}

function setConsent(value: Exclude<Consent, 'pending'>) {
  localStorage.setItem(STORAGE_KEY, value)
  listeners.forEach((listener) => listener())
}

export function CookieConsent() {
  const { t } = useTranslation()
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <>
      {consent === 'accepted' && (
        <>
          <Script id="ga-init" strategy="afterInteractive">
            {buildGAInitScript(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!)}
          </Script>
          <Script
            id="ga-script"
            src={`/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
        </>
      )}

      <AnimatePresence>
        {consent === 'pending' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="border-border bg-background/95 fixed right-4 bottom-4 left-4 z-[60] flex flex-col items-center justify-between gap-3 border p-3 shadow-lg backdrop-blur-md sm:right-10 sm:left-10 sm:flex-row lg:right-12 lg:left-12 xl:right-24 xl:left-24"
          >
            <p className="text-muted-foreground text-center font-mono text-[10px] leading-relaxed sm:text-left sm:text-xs">
              {t('cookieConsent.message')}
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={() => setConsent('declined')}
                className="border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground border px-4 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors"
              >
                {t('cookieConsent.decline')}
              </button>
              <button
                onClick={() => setConsent('accepted')}
                className="border-accent text-accent hover:bg-accent hover:text-background border px-4 py-2 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                {t('cookieConsent.accept')}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

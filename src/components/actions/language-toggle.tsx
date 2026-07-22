'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LANGUAGES = [
  { code: 'en', icon: '/flags/uk-flag.png', alt: 'English' },
  { code: 'pt', icon: '/flags/brazil-flag.png', alt: 'Português' },
  { code: 'ja', icon: '/flags/japan-flag.png', alt: '日本語' },
] as const

export function LanguageToggle() {
  const { i18n } = useTranslation()
  const currentLocale = i18n.resolvedLanguage || 'en'
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [])

  const currentLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[0]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background transition-colors hover:bg-muted"
        aria-label="Toggle language"
      >
        <Image
          src={currentLang.icon}
          alt={currentLang.alt}
          width={20}
          height={20}
          className="h-5 w-5 rounded-full object-cover"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 flex flex-col gap-1 rounded-[1.25rem] border border-border bg-background p-1.5 shadow-xl"
          >
            {LANGUAGES.map(({ code, icon, alt }) => {
              const isActive = currentLocale === code

              return (
                <button
                  key={code}
                  onClick={() => {
                    if (!document.startViewTransition) {
                      i18n.changeLanguage(code)
                      setIsOpen(false)
                      return
                    }
                    document.startViewTransition(() => {
                      i18n.changeLanguage(code)
                      setIsOpen(false)
                    })
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
                    isActive ? 'bg-muted opacity-50 cursor-default' : 'hover:bg-muted'
                  }`}
                  disabled={isActive}
                  aria-label={`Mudar para ${alt}`}
                >
                  <Image
                    src={icon}
                    alt={alt}
                    width={20}
                    height={20}
                    className="h-5 w-5 rounded-full object-cover shadow-sm"
                  />
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

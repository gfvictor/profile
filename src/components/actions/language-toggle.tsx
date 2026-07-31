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
  const currentLocale = i18n.resolvedLanguage || 'pt'
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

  const currentLang = LANGUAGES.find((l) => l.code === currentLocale) || LANGUAGES[1]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="border-border bg-background hover:bg-muted flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
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
            initial={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
            animate={{ opacity: 1, y: 0, scale: 1, x: '-50%' }}
            exit={{ opacity: 0, y: 10, scale: 0.95, x: '-50%' }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="border-border bg-background absolute top-full left-1/2 mt-2 flex flex-col gap-1 rounded-[1.25rem] border p-1.5 shadow-xl"
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
                  className={`group flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive ? 'bg-muted cursor-default' : 'hover:bg-muted'
                  }`}
                  disabled={isActive}
                  aria-label={`Change to ${alt}`}
                >
                  <Image
                    src={icon}
                    alt={alt}
                    width={20}
                    height={20}
                    className={`h-5 w-5 rounded-full object-cover shadow-sm transition-all duration-300 ${
                      isActive
                        ? 'opacity-100 grayscale-0'
                        : 'opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0'
                    }`}
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

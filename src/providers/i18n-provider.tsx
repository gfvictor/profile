'use client'

import '@/i18n'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    if (t('metadata.title')) {
      document.title = t('metadata.title')
      document.documentElement.lang = i18n.resolvedLanguage || 'en'
    }
  }, [i18n.resolvedLanguage, t])

  return <>{children}</>
}

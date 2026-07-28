'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ContactForm } from '@/components/ui/contact-form'

export function ContactSlide() {
  const { t } = useTranslation()

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.contact.eyebrow')}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="cursor-blink"
          />
        </h3>
        <motion.h2
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
          className="text-foreground mb-4 text-2xl font-medium tracking-tight sm:text-3xl lg:mb-6 lg:max-w-2xl lg:text-4xl"
        >
          {t('slides.contact.headline')}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'circOut' }}
          className="w-[90%] max-w-sm sm:w-full sm:max-w-md lg:max-w-2xl"
        >
          <ContactForm />
        </motion.div>
      </div>
    </div>
  )
}

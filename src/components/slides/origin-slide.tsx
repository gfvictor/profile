'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function OriginSlide() {
  const { t } = useTranslation()
  const devYears = new Date().getFullYear() - 2021

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.origin.eyebrow')}
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
          className="text-foreground mb-4 text-xl font-medium tracking-tight whitespace-pre-line sm:text-2xl lg:mb-6 lg:max-w-2xl lg:text-3xl"
        >
          {t('slides.origin.headline')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'circOut' }}
          className="border-accent origin-top border-r-2 pr-4 lg:pr-6"
        >
          <p className="text-muted-foreground/90 font-mono text-xs leading-relaxed whitespace-pre-line lg:max-w-xl lg:text-sm">
            {t('slides.origin.description', { devYears })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'circOut' }}
          className="border-accent/20 text-muted-foreground/60 mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-l pl-4 font-mono text-[10px] tracking-widest uppercase sm:flex sm:flex-row lg:mt-8 lg:gap-8"
        >
          <div className="flex flex-col">
            <span className="text-accent/50 mb-1">Location</span>
            <span>{t('slides.origin.specs.location')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-accent/50 mb-1">Status</span>
            <span>{t('slides.origin.specs.status')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-accent/50 mb-1">Background</span>
            <span>{t('slides.origin.specs.background')}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-accent/50 mb-1">Current</span>
            <span>{t('slides.origin.specs.shift')}</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

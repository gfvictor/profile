'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function IntroSlide() {
  const { t } = useTranslation()

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.intro.eyebrow')}
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
          {t('slides.intro.headline')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'circOut' }}
          className="border-accent origin-top border-r-2 pr-4 lg:pr-6"
        >
          <p className="text-muted-foreground/90 font-mono text-xs leading-relaxed lg:max-w-xl lg:text-sm">
            {t('slides.intro.description')}
          </p>
        </motion.div>

        <motion.button
          onClick={() => window.dispatchEvent(new CustomEvent('GO_TO_WORKFLOW'))}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'circOut' }}
          className="border-accent/30 bg-accent/5 text-accent hover:border-accent hover:bg-accent hover:text-background mt-8 inline-flex items-center gap-2 border px-6 py-3 text-xs font-bold tracking-widest uppercase transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(179,142,0,0.2)] lg:mt-12"
        >
          {t('slides.intro.cta')}
        </motion.button>
      </div>
    </div>
  )
}

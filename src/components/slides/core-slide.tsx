'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiDrizzle,
  SiTailwindcss,
  SiShadcnui,
} from 'react-icons/si'

export function CoreSlide() {
  const { t } = useTranslation()

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.core.eyebrow')}
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
          {t('slides.core.headline')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'circOut' }}
          className="border-accent origin-top border-r-2 pr-4 lg:pr-6"
        >
          <p className="text-muted-foreground/90 font-mono text-xs leading-relaxed lg:max-w-xl lg:text-sm">
            {t('slides.core.description')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'circOut' }}
          className="text-muted-foreground/40 mt-6 flex items-center justify-end gap-5 pr-4 lg:mt-8 lg:pr-6"
        >
          <SiTypescript className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiNextdotjs className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiNestjs className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiPostgresql className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiPrisma className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiDrizzle className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiTailwindcss className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
          <SiShadcnui className="hover:text-accent h-4 w-4 transition-colors duration-300 lg:h-5 lg:w-5" />
        </motion.div>
      </div>
    </div>
  )
}

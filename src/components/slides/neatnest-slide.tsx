'use client'

import { motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'

export function NeatNestSlide() {
  const { t } = useTranslation()

  const images = [
    '/slides/neatnest/neatnest-1.jpg',
    '/slides/neatnest/neatnest-2.jpg',
    '/slides/neatnest/neatnest-3.jpg',
    '/slides/neatnest/neatnest-4.jpg',
  ]

  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.neatnest.eyebrow')}
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
          className="text-foreground mb-4 text-xl font-medium tracking-tight sm:text-2xl lg:mb-6 lg:max-w-2xl lg:text-3xl"
        >
          <a
            href="https://neatnest.codifylab.app"
            target="_blank"
            rel="noopener noreferrer"
            className="decoration-accent/50 hover:text-accent hover:decoration-accent underline decoration-2 underline-offset-4 transition-colors duration-300"
          >
            NeatNest
          </a>
          {t('slides.neatnest.headline_suffix')}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'linear' }}
          className="text-muted-foreground/80 font-mono text-xs leading-relaxed lg:max-w-xl lg:text-sm"
        >
          <Trans
            i18nKey="slides.neatnest.description"
            components={{
              1: <span className="text-accent font-bold" />,
              2: <span className="text-accent font-bold" />,
            }}
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'circOut' }}
          className="w-full max-w-[320px] overflow-hidden sm:max-w-md lg:mt-2 lg:max-w-2xl xl:max-w-4xl"
          style={{
            maskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 100%)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 15%, black 100%)',
          }}
        >
          <motion.div
            animate={{ x: ['0%', '-33.333333%'] }}
            transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
            className="flex w-max gap-8 py-4 pr-8"
          >
            {duplicatedImages.map((img, idx) => (
              <div
                key={idx}
                className="border-border/30 bg-muted/40 relative aspect-[4/5] w-[140px] shrink-0 overflow-hidden rounded-md border shadow-sm lg:w-[180px]"
              >
                <div
                  className="absolute inset-0 m-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${img})` }}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

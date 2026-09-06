'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useTranslation, Trans } from 'react-i18next'
import { CornerLeftDown, ArrowUp } from 'lucide-react'
import { ImageLightbox } from '@/ui'

const TESTER_URL = 'https://tester.codifylab.app/tester'

export function FeaturedSlide() {
  const { t } = useTranslation()
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = [
    '/slides/codifylab/clab1.jpg',
    '/slides/codifylab/clab2.jpg',
    '/slides/codifylab/clab3.jpg',
    '/slides/codifylab/clab4.jpg',
    '/slides/codifylab/clab5.jpg',
    '/slides/codifylab/clab6.jpg',
    '/slides/codifylab/clab7.jpg',
    '/slides/codifylab/clab8.jpg',
    '/slides/codifylab/clab9.jpg',
  ]

  const duplicatedImages = [...images, ...images, ...images]

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.codifylab.eyebrow')}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="cursor-blink"
          />
        </h3>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -10, y: -4 }}
            animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 0.6, ease: 'easeOut' },
              x: { duration: 0.6, delay: 0.6, ease: 'easeOut' },
              y: { duration: 2.4, delay: 0.6, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="text-accent absolute -top-4 left-0 flex items-start gap-1 font-mono text-[10px] font-bold tracking-widest whitespace-nowrap uppercase sm:-top-5"
          >
            <CornerLeftDown className="h-3.5 w-3.5" />
            <span className="-mt-1">{t('slides.codifylab.testCta')}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: 'linear' }}
            className="text-foreground mb-4 text-xl font-medium tracking-tight sm:text-2xl lg:mb-6 lg:max-w-2xl lg:text-3xl"
          >
            <a
              href={TESTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-accent/50 hover:text-accent hover:decoration-accent underline decoration-2 underline-offset-4 transition-colors duration-300"
            >
              CodifyLab
            </a>
            {t('slides.codifylab.headline_suffix')}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'linear' }}
          className="text-muted-foreground/80 font-mono text-xs leading-relaxed lg:max-w-xl lg:text-sm"
        >
          <Trans
            i18nKey="slides.codifylab.description"
            components={{
              1: <span className="text-accent font-bold" />,
            }}
          />
        </motion.p>

        <div className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-2xl xl:max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4, ease: 'circOut' }}
            className="w-full overflow-hidden lg:mt-2"
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
                  onClick={() => setLightboxIndex(idx % images.length)}
                  className="border-border/30 bg-muted/40 relative aspect-[4/5] w-[140px] shrink-0 cursor-pointer overflow-hidden rounded-md border shadow-sm lg:w-[180px]"
                >
                  <div
                    className="absolute inset-0 m-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${img})` }}
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: [0, 4, 0] }}
            transition={{
              opacity: { duration: 0.6, delay: 1, ease: 'easeOut' },
              y: { duration: 2.4, delay: 1, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="text-accent absolute -bottom-6 left-24 flex -translate-x-1/2 items-center gap-1 font-mono text-[9px] font-bold tracking-widest whitespace-nowrap uppercase sm:-bottom-8 sm:text-[10px]"
          >
            <ArrowUp className="h-3 w-3" />
            <span>{t('slides.codifylab.enlargeCta')}</span>
          </motion.div>
        </div>

        <ImageLightbox
          images={images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      </div>
    </div>
  )
}

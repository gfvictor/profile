'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'
import { SlantedSlide } from '@/ui'
import {
  SiTypescript,
  SiNextdotjs,
  SiNestjs,
  SiPostgresql,
  SiPrisma,
  SiDrizzle,
  SiTailwindcss,
  SiShadcnui,
  SiGithub,
} from 'react-icons/si'
import { ContactForm } from '@/components/ui/contact-form'

export function AcademicsSlide() {
  const { t } = useTranslation()

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.academics.eyebrow')}
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
          {t('slides.academics.headline')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'circOut' }}
          className="border-accent origin-top border-r-2 pr-4 lg:pr-6"
        >
          <p
            className="text-muted-foreground/90 font-mono text-xs leading-relaxed lg:max-w-xl lg:text-sm"
            dangerouslySetInnerHTML={{ __html: t('slides.academics.description') }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4, ease: 'circOut' }}
          className="mt-6 flex flex-wrap gap-4 lg:mt-8"
        >
          <a
            href="https://github.com/gfvictor"
            target="_blank"
            rel="noopener noreferrer"
            className="border-accent/20 bg-accent/5 text-foreground hover:bg-accent hover:text-background flex items-center gap-3 border px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all"
          >
            <SiGithub className="h-4 w-4" />
            GitHub Profile
          </a>
          <a
            href="https://github.com/gfvictor/ebook-git/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="border-accent/20 bg-accent/5 text-foreground hover:bg-accent hover:text-background flex items-center gap-3 border px-4 py-3 font-mono text-[10px] tracking-widest uppercase transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Git Manual
          </a>
        </motion.div>
      </div>
    </div>
  )
}

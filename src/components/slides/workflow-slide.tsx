'use client'

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export function WorkflowSlide() {
  const { t } = useTranslation()

  return (
    <div className="slide-container">
      <div className="slide-content-wrapper">
        <h3 className="slide-eyebrow">
          {t('slides.workflow.eyebrow')}
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
          {t('slides.workflow.headline')}
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.3, delay: 0.2, ease: 'circOut' }}
          className="border-accent origin-top border-r-2 pr-4 lg:pr-6"
        >
          <p className="text-muted-foreground/90 font-mono text-xs leading-relaxed lg:max-w-xl lg:text-sm">
            {t('slides.workflow.description')}
          </p>
        </motion.div>

        <div className="mt-10 flex w-[95%] max-w-xs flex-col items-end gap-8 lg:mt-14 lg:w-full lg:max-w-[36rem] lg:flex-row lg:items-start lg:justify-end lg:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="relative flex w-full items-start justify-between lg:flex-1"
          >
            <div className="bg-accent/10 absolute top-[6px] left-0 z-0 h-[2px] w-full" />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
              className="bg-accent absolute top-[6px] left-0 z-0 h-[2px]"
            />

            {[
              { title: 'Scope', sub: 'Rules' },
              { title: 'Design', sub: 'UI/UX' },
              { title: 'Build', sub: 'Code' },
              { title: 'Deploy', sub: 'CI/CD' },
            ].map((step, i) => (
              <div key={step.title} className="z-10 flex flex-col items-center gap-3">
                <motion.div
                  initial={{ scale: 0, rotate: 0 }}
                  animate={{ scale: 1, rotate: 45 }}
                  transition={{ delay: 0.5 + i * 0.3, type: 'spring', stiffness: 200, damping: 10 }}
                  className="border-accent bg-background h-3.5 w-3.5 border-2"
                />
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.3 }}
                  className="flex flex-col items-center"
                >
                  <span className="text-foreground font-mono text-[10px] font-bold tracking-widest uppercase">
                    {step.title}
                  </span>
                  <span className="text-muted-foreground/50 mt-1 font-mono text-[8px] tracking-widest uppercase">
                    {step.sub}
                  </span>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.button
            onClick={() => window.dispatchEvent(new CustomEvent('GO_TO_CONTACT'))}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 1.55, ease: 'circOut' }}
            className="border-accent/30 bg-accent/5 text-accent hover:border-accent hover:bg-accent hover:text-background mt-2 inline-flex w-fit shrink-0 items-center gap-2 border px-6 py-3 font-mono text-[10px] font-bold tracking-widest uppercase transition-all duration-300 sm:text-xs lg:-mt-3.5"
          >
            {t('slides.workflow.cta')}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

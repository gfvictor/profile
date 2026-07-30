'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { BuilderOption } from '@/ui'
import { useTranslation } from 'react-i18next'
import { useBuilder } from '@/providers'
import type { Plan } from '@/slides'

export function Step1Plan() {
  const { t } = useTranslation()
  const { plan, setPlan } = useBuilder()

  const planDetails: Record<NonNullable<Plan>, string> = {
    basic: t('slides.builder.step1.plans.basic.desc'),
    intermediate: t('slides.builder.step1.plans.intermediate.desc'),
    advanced: t('slides.builder.step1.plans.advanced.desc'),
    scale: t('slides.builder.step1.plans.scale.desc'),
  }

  const planSpecs: Record<NonNullable<Plan>, { title: string; desc: string }[]> = {
    basic: t('slides.builder.step1.plans.basic.specs', { returnObjects: true }) as {
      title: string
      desc: string
    }[],
    intermediate: t('slides.builder.step1.plans.intermediate.specs', { returnObjects: true }) as {
      title: string
      desc: string
    }[],
    advanced: t('slides.builder.step1.plans.advanced.specs', { returnObjects: true }) as {
      title: string
      desc: string
    }[],
    scale: t('slides.builder.step1.plans.scale.specs', { returnObjects: true }) as {
      title: string
      desc: string
    }[],
  }

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-koho text-foreground mb-1 text-xl lowercase lg:mb-4 lg:text-2xl">
        {t('slides.builder.step1.title')}
      </h4>
      <div className="grid grid-cols-2 gap-2 lg:gap-4">
        {(['basic', 'intermediate', 'advanced', 'scale'] as Plan[]).map((p) => (
          <BuilderOption
            key={p!}
            title={p!}
            description={planDetails[p!]}
            isActive={plan === p}
            onClick={() => setPlan(p)}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {plan && (
          <motion.div
            key={plan}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-accent/50 mt-6 flex flex-col gap-3 border-l-2 pl-3 lg:mt-4 lg:gap-4 lg:pl-4">
              {planSpecs[plan].map((spec, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-foreground/90 font-mono text-[10px] uppercase sm:text-[11px] lg:text-[11px]">
                    <span className="text-accent">✓</span> {spec.title}
                  </span>
                  <span className="font-koho text-muted-foreground/60 text-[11px] lowercase sm:text-xs lg:mt-1 lg:text-sm">
                    {spec.desc}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

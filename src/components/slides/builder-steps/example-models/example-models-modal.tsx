'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ModalShell } from '@/ui'
import { ScreenshotCarousel } from './screenshot-carousel'
import { FumacaTruckPreview } from './fumaca-truck-preview'

type Tier = 'basic' | 'intermediate' | 'advanced'

const INTERMEDIATE_IMAGES = [1, 2, 3, 4, 5, 6].map((n) => `/models/intermediate/model2-${n}.webp`)
const ADVANCED_IMAGES = [1, 2, 3, 4].map((n) => `/models/advanced/model3-${n}.webp`)

export function ExampleModelsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { t } = useTranslation()
  const [tier, setTier] = useState<Tier>('basic')

  return (
    <ModalShell isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="border-accent/30 bg-background relative z-10 flex h-[min(760px,85vh)] w-full max-w-md flex-col border shadow-2xl"
      >
        <div className="border-accent/30 flex items-center justify-between border-b p-4">
          <h2 className="text-accent font-mono text-sm font-bold tracking-widest uppercase">
            {t('slides.builder.exampleModels.title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background flex h-8 w-8 shrink-0 items-center justify-center border transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="border-border/60 flex border-b">
          {(['basic', 'intermediate', 'advanced'] as const).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setTier(key)}
              className={`flex-1 border-b-2 px-2 py-3 font-mono text-[10px] font-bold tracking-widest uppercase transition-colors ${
                tier === key
                  ? 'border-accent text-accent'
                  : 'text-muted-foreground border-transparent'
              }`}
            >
              {t(`slides.builder.exampleModels.tabs.${key}`)}
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-1 px-5 pt-4 text-center">
          <p className="text-muted-foreground font-mono text-[10px] lowercase">
            {t(`slides.builder.exampleModels.${tier}.purpose`)}
          </p>
          <p className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase">
            {t('slides.builder.exampleModels.siteTypeLabel')}{' '}
            <span className="text-accent">
              {t(`slides.builder.exampleModels.${tier}.siteType`)}
            </span>
            <br />
            {t('slides.builder.exampleModels.addonsLabel')}{' '}
            <span className="text-accent">{t(`slides.builder.exampleModels.${tier}.addons`)}</span>
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto p-5">
          <div className={tier === 'basic' ? 'contents' : 'hidden'}>
            <div className="border-border/60 min-h-[504px] w-full max-w-[340px] overflow-y-auto rounded-2xl border shadow-lg">
              <FumacaTruckPreview />
            </div>
          </div>
          <div className={tier === 'intermediate' ? 'contents' : 'hidden'}>
            <ScreenshotCarousel images={INTERMEDIATE_IMAGES} alt="Intermediate" />
          </div>
          <div className={tier === 'advanced' ? 'contents' : 'hidden'}>
            <ScreenshotCarousel images={ADVANCED_IMAGES} alt="Advanced" />
          </div>
        </div>
      </motion.div>
    </ModalShell>
  )
}

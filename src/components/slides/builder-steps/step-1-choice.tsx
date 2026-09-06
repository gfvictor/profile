'use client'

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useBuilder } from '@/providers'
import { ExampleModelsModal } from './example-models'

function ChoiceButton({
  title,
  description,
  onClick,
}: {
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="border-accent/40 hover:border-accent hover:bg-accent/5 flex w-full flex-col items-center gap-1 border px-8 py-4 text-center transition-colors"
    >
      <span className="text-accent font-mono text-sm font-bold tracking-widest uppercase lg:text-base">
        {title}
      </span>
      <span className="text-muted-foreground font-mono text-[10px] lowercase lg:text-xs">
        {description}
      </span>
    </button>
  )
}

export function Step1Choice() {
  const { t } = useTranslation()
  const { setStep } = useBuilder()
  const [isExamplesOpen, setIsExamplesOpen] = useState(false)

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
        {t('slides.builder.choice.title')}
      </h4>
      <div className="flex flex-col gap-6">
        <ChoiceButton
          title={t('slides.builder.choice.know.title')}
          description={t('slides.builder.choice.know.desc')}
          onClick={() => setStep(3)}
        />
        <ChoiceButton
          title={t('slides.builder.choice.help.title')}
          description={t('slides.builder.choice.help.desc')}
          onClick={() => setStep(2)}
        />
      </div>

      <button
        type="button"
        onClick={() => setIsExamplesOpen(true)}
        className="text-muted-foreground hover:text-accent font-mono text-[10px] tracking-widest uppercase underline underline-offset-4 transition-colors"
      >
        {t('slides.builder.choice.examples')}
      </button>

      <ExampleModelsModal isOpen={isExamplesOpen} onClose={() => setIsExamplesOpen(false)} />
    </div>
  )
}

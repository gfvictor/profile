'use client'

import { useTranslation } from 'react-i18next'
import { useBuilder } from '@/providers'

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
      className="border-accent/40 hover:border-accent hover:bg-accent/5 flex w-fit flex-col items-center gap-1 border px-8 py-4 text-center transition-colors"
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

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
      <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
        {t('slides.builder.choice.title')}
      </h4>
      <div className="flex flex-col items-center gap-4">
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
    </div>
  )
}

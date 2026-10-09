'use client'

import { useTranslation } from 'react-i18next'

export function IncludedCard() {
  const { t } = useTranslation()

  return (
    <div className="border-accent/30 bg-accent/5 xs:p-3 flex w-full items-center justify-center border p-1.5 text-center lg:p-2">
      <span className="text-foreground xs:text-[9px] font-mono text-[8px] leading-tight font-bold tracking-widest uppercase lg:text-[11px]">
        {t('slides.builder.step3.included_card.site')}
        <br />
        +
        <br />
        {t('slides.builder.step3.included_card.qr')}
        <br />
        +
        <br />
        {t('slides.builder.step3.included_card.hosting')}{' '}
        <span className="text-muted-foreground/80 font-medium">
          {t('slides.builder.step3.included_card.price')}
        </span>
      </span>
    </div>
  )
}

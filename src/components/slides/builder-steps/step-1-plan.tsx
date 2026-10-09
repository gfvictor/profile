'use client'

import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useBuilder } from '@/providers'
import { IncludedCard } from '@/ui'

type Tier = 'basic' | 'intermediate' | 'advanced'

const TIERS: Tier[] = ['basic', 'intermediate', 'advanced']

const BASE: Record<Tier, { price: number; days: number }> = {
  basic: { price: 45000, days: 3 },
  intermediate: { price: 85000, days: 5 },
  advanced: { price: 155000, days: 10 },
}

const FEATURE_ROWS: {
  key: 'seo' | 'payments' | 'auth' | 'social'
  included: Record<Tier, boolean>
}[] = [
  { key: 'seo', included: { basic: true, intermediate: true, advanced: true } },
  { key: 'payments', included: { basic: false, intermediate: true, advanced: true } },
  { key: 'auth', included: { basic: false, intermediate: true, advanced: true } },
  { key: 'social', included: { basic: false, intermediate: false, advanced: true } },
]

const INTEGRATIONS: Record<Tier, boolean> = {
  basic: false,
  intermediate: false,
  advanced: true,
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(
    Math.floor(price * 1.1),
  )

export function Step1Plan() {
  const { t } = useTranslation()
  const { plan, setPlan, setStep, setQuizAccepted } = useBuilder()

  const selectPlan = (tier: Tier) => {
    setPlan(tier)
    setQuizAccepted(false)
  }

  return (
    <div className="xs:gap-4 flex flex-col gap-1.5 lg:gap-2">
      <h4 className="font-koho text-foreground xs:mb-1 xs:text-xl mb-0 text-lg lowercase lg:mb-1 lg:text-xl">
        {t('slides.builder.step1.title')}
      </h4>
      <IncludedCard />

      <div className="w-full min-w-0">
        <div className="xs:gap-y-2 grid grid-cols-[minmax(0,1.2fr)_repeat(3,minmax(0,1fr))] items-center gap-x-1 gap-y-0.5 lg:gap-x-4 lg:gap-y-1">
          <div />
          {TIERS.map((tier) => (
            <div key={tier} className="flex min-w-0 flex-col items-center gap-0.5 text-center">
              <span className="text-foreground xs:text-[9px] w-full truncate font-mono text-[9px] font-bold tracking-widest uppercase lg:text-xs">
                {tier}
              </span>
              <span className="text-accent xs:text-[11px] w-full truncate font-mono text-[11px] font-bold lg:text-[11px]">
                {formatPrice(BASE[tier].price)}
              </span>
              <span className="text-muted-foreground xs:text-[9px] w-full truncate font-mono text-[9px] lowercase lg:text-[9px]">
                {BASE[tier].days} {t('slides.builder.visualizer.work_days')}
              </span>
            </div>
          ))}

          <span className="text-muted-foreground min-w-0 truncate font-mono text-[10px] uppercase lg:text-[10px]">
            {t('slides.builder.step1.table.sessions.label')}
          </span>
          {TIERS.map((tier) => (
            <div
              key={`sessions-${tier}`}
              className="text-foreground/90 min-w-0 truncate text-center font-mono text-[9px] lowercase lg:text-[9px]"
            >
              {t(`slides.builder.step1.table.sessions.${tier}`)}
            </div>
          ))}

          {FEATURE_ROWS.map((row) => (
            <Fragment key={row.key}>
              <span className="text-muted-foreground min-w-0 truncate font-mono text-[10px] uppercase lg:text-[10px]">
                {t(`slides.builder.step3.addons.${row.key}.title`)}
              </span>
              {TIERS.map((tier) => (
                <div
                  key={`${row.key}-${tier}`}
                  className="xs:text-xs flex min-w-0 items-center justify-center font-mono text-[10px] lg:text-xs"
                >
                  {row.included[tier] ? (
                    <span className="text-accent">✓</span>
                  ) : (
                    <span className="text-muted-foreground/30">—</span>
                  )}
                </div>
              ))}
            </Fragment>
          ))}

          <span className="text-muted-foreground min-w-0 truncate font-mono text-[10px] uppercase lg:text-[10px]">
            {t('slides.builder.step1.table.integrations')}
          </span>
          {TIERS.map((tier) => (
            <div
              key={`integrations-${tier}`}
              className="xs:text-xs flex min-w-0 items-center justify-center font-mono text-[10px] lg:text-xs"
            >
              {INTEGRATIONS[tier] ? (
                <span className="text-accent">✓</span>
              ) : (
                <span className="text-muted-foreground/30">—</span>
              )}
            </div>
          ))}

          <span className="text-muted-foreground min-w-0 truncate font-mono text-[10px] uppercase lg:text-[10px]">
            {t('slides.builder.step1.table.access')}
          </span>
          <div className="text-muted-foreground/90 min-w-0 truncate text-center font-mono text-[9px] lowercase lg:text-[9px]">
            {t('slides.builder.step1.table.access_solo')}
          </div>
          <div className="text-muted-foreground/90 min-w-0 truncate text-center font-mono text-[9px] lowercase lg:text-[9px]">
            {t('slides.builder.step1.table.access_solo')}
          </div>
          <div className="text-accent min-w-0 truncate text-center font-mono text-[9px] lowercase lg:text-[9px]">
            {t('slides.builder.step1.table.access_team')}
          </div>

          <div />
          {TIERS.map((tier) => (
            <button
              key={`select-${tier}`}
              onClick={() => selectPlan(tier)}
              className={`min-w-0 truncate border px-1 py-1 font-mono text-[10px] tracking-wider uppercase transition-colors lg:px-2 lg:py-1 lg:text-[10px] ${
                plan === tier
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-muted-foreground hover:border-accent/50'
              }`}
            >
              {t('slides.builder.step1.table.select')}
            </button>
          ))}
        </div>
      </div>

      <p className="text-muted-foreground/60 xs:text-[10px] xs:leading-normal text-center font-mono text-[9px] leading-tight lowercase lg:text-[9px]">
        {t('slides.builder.step1.table.legend')}
      </p>

      <div className="xs:mt-4 xs:gap-4 mt-4 flex items-stretch justify-center gap-2 lg:mt-5">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="border-accent text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/5 xs:px-5 xs:py-2 flex-1 border px-2 py-1.5 text-center font-mono text-[10px] leading-tight tracking-wide uppercase transition-colors lg:px-4 lg:py-2 lg:text-xs lg:whitespace-nowrap"
        >
          {t('slides.builder.choice.help.title')}
        </button>
        <button
          type="button"
          onClick={() => {
            setPlan('scale')
            setStep(5)
          }}
          className="border-accent text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/5 xs:px-5 xs:py-2 flex-1 border px-2 py-1.5 text-center font-mono text-[10px] leading-tight tracking-wide uppercase transition-colors lg:px-4 lg:py-2 lg:text-xs lg:whitespace-nowrap"
        >
          {t('slides.builder.choice.scale.cta')}
        </button>
      </div>
    </div>
  )
}

'use client'

import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useBuilder } from '@/providers'

type Tier = 'basic' | 'intermediate' | 'advanced'

const TIERS: Tier[] = ['basic', 'intermediate', 'advanced']

const BASE: Record<Tier, { price: number; days: number }> = {
  basic: { price: 45000, days: 3 },
  intermediate: { price: 85000, days: 5 },
  advanced: { price: 155000, days: 10 },
}

const FEATURE_ROWS: {
  key: 'auth' | 'payments' | 'seo' | 'social'
  included: Record<Tier, boolean>
}[] = [
  { key: 'auth', included: { basic: false, intermediate: true, advanced: true } },
  { key: 'payments', included: { basic: false, intermediate: true, advanced: true } },
  { key: 'seo', included: { basic: true, intermediate: true, advanced: true } },
  { key: 'social', included: { basic: false, intermediate: false, advanced: true } },
]

const formatPrice = (price: number) =>
  new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(
    Math.floor(price * 1.1),
  )

export function Step3Plan() {
  const { t } = useTranslation()
  const { plan, setPlan, setQuizAccepted } = useBuilder()

  const selectPlan = (tier: Tier) => {
    setPlan(tier)
    setQuizAccepted(false)
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4">
      <h4 className="font-koho text-foreground mb-1 text-xl lowercase lg:mb-2 lg:text-2xl">
        {t('slides.builder.step1.title')}
      </h4>

      <div className="overflow-x-auto">
        <div className="grid min-w-[420px] grid-cols-[1fr_repeat(3,1fr)] items-center gap-x-2 gap-y-2 lg:gap-x-4 lg:gap-y-3">
          <div />
          {TIERS.map((tier) => (
            <div key={tier} className="flex flex-col items-center gap-0.5 text-center">
              <span className="text-foreground font-mono text-[10px] font-bold tracking-widest uppercase lg:text-xs">
                {tier}
              </span>
              <span className="text-accent font-mono text-[9px] font-bold lg:text-[11px]">
                {formatPrice(BASE[tier].price)}
              </span>
              <span className="text-muted-foreground font-mono text-[8px] lowercase lg:text-[9px]">
                {BASE[tier].days} {t('slides.builder.visualizer.work_days')}
              </span>
            </div>
          ))}

          {FEATURE_ROWS.map((row) => (
            <Fragment key={row.key}>
              <span className="text-muted-foreground font-mono text-[9px] uppercase lg:text-[10px]">
                {t(`slides.builder.step3.addons.${row.key}.title`)}
              </span>
              {TIERS.map((tier) => (
                <div
                  key={`${row.key}-${tier}`}
                  className="flex items-center justify-center font-mono text-xs lg:text-sm"
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

          <span className="text-muted-foreground font-mono text-[9px] uppercase lg:text-[10px]">
            {t('slides.builder.step1.table.access')}
          </span>
          <div className="text-muted-foreground/90 text-center font-mono text-[8px] lowercase lg:text-[9px]">
            {t('slides.builder.step1.table.access_solo')}
          </div>
          <div className="text-muted-foreground/90 text-center font-mono text-[8px] lowercase lg:text-[9px]">
            {t('slides.builder.step1.table.access_solo')}
          </div>
          <div className="text-accent text-center font-mono text-[8px] lowercase lg:text-[9px]">
            {t('slides.builder.step1.table.access_team')}
          </div>

          <div />
          {TIERS.map((tier) => (
            <button
              key={`select-${tier}`}
              onClick={() => selectPlan(tier)}
              className={`border px-2 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-colors lg:text-[10px] ${
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

      <p className="text-muted-foreground/60 text-center font-mono text-[8px] lowercase lg:text-[9px]">
        {t('slides.builder.step1.table.legend')}
      </p>
    </div>
  )
}

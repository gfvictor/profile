'use client'

import { BuilderOption } from '@/ui'
import { useTranslation, Trans as Translate } from 'react-i18next'
import { useBuilder } from '@/providers'

export function Step3Addons() {
  const { t } = useTranslation()
  const { plan, scope, addons, setAddons } = useBuilder()

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-koho text-foreground mb-2 text-xl lowercase lg:mb-4 lg:text-2xl">
        {t('slides.builder.step3.title')}
      </h4>
      <div className="border-accent/30 bg-accent/5 flex items-center justify-center border p-2 text-center lg:p-3">
        <span className="text-foreground font-mono text-[8px] font-bold tracking-widest uppercase lg:text-[10px]">
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

      <div className="grid grid-cols-2 gap-2 lg:gap-4">
        {(['auth', 'db', 'payments', 'seo'] as const).map((addon) => {
          const isSimpleObjective =
            scope.objective === 'Landing Page' || scope.objective === 'Site Institucional'
          const isDisabled =
            (plan === 'basic' && addon !== 'seo') ||
            (plan === 'intermediate' && addon === 'payments') ||
            (isSimpleObjective && addon !== 'seo')

          return (
            <BuilderOption
              key={addon}
              title={t(`slides.builder.step3.addons.${addon}.title`)}
              description={t(`slides.builder.step3.addons.${addon}.desc`)}
              isActive={addons[addon] && !isDisabled}
              disabled={isDisabled}
              type="checkbox"
              onClick={() => {
                if (isDisabled) return
                setAddons((prev) => {
                  const next = { ...prev, [addon]: !prev[addon] }
                  if (addon === 'payments' && next.payments) {
                    next.auth = true
                    next.db = true
                  }
                  if (addon === 'auth' && next.auth) next.db = true
                  if (addon === 'auth' && !next.auth) next.payments = false
                  if (addon === 'db' && !next.db) {
                    next.auth = false
                    next.payments = false
                  }
                  return next
                })
              }}
            />
          )
        })}
      </div>

      <div className="text-muted-foreground/60 mt-1 text-center font-mono text-[8px] lowercase lg:mt-2 lg:text-[10px]">
        <Translate
          i18nKey="slides.builder.step3.auth_warning"
          components={[
            <span className="text-accent/80" key="1" />,
            <span className="text-accent/80" key="2" />,
          ]}
        />
      </div>
    </div>
  )
}

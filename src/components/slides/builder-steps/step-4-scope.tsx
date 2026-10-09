'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation, Trans as Translate } from 'react-i18next'
import { useBuilder, getPlanObjectives, getAvailableObjectives } from '@/providers'

export function Step4Scope() {
  const { t } = useTranslation()
  const { plan, scope, setScope, addons, quizAccepted } = useBuilder()

  const allObjs = getPlanObjectives(plan)
  const availableObjs = getAvailableObjectives(plan, addons)

  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
        {t('slides.builder.step2.title')}
      </h4>

      {!quizAccepted && (
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
            {allObjs.map((obj) => {
              const isDisabled = !availableObjs.includes(obj)
              return (
                <button
                  key={t(`slides.builder.step2.objectives.${obj}`)}
                  onClick={() => {
                    if (isDisabled) return
                    setScope((prev) => ({ ...prev, objective: obj }))
                  }}
                  disabled={isDisabled}
                  className={`border p-2 font-mono text-[9px] uppercase transition-colors sm:p-2.5 sm:text-[10px] lg:p-3 lg:text-[10px] ${
                    scope.objective === obj
                      ? 'border-accent bg-accent/10 text-accent'
                      : isDisabled
                        ? 'border-border/40 text-muted-foreground/40 cursor-not-allowed'
                        : 'border-border text-muted-foreground hover:border-accent/50'
                  }`}
                >
                  {t(`slides.builder.step2.objectives.${obj}`)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {plan !== 'scale' && (
        <div className="flex flex-col gap-3 lg:gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-muted-foreground font-mono text-[9px] uppercase lg:text-[10px]">
              {t('slides.builder.step2.colors_label')}
            </label>
            <input
              type="text"
              placeholder={t('slides.builder.step2.colors_placeholder')}
              value={scope.colors}
              onChange={(e) => setScope((prev) => ({ ...prev, colors: e.target.value }))}
              className="border-border bg-background/50 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 w-full border p-2 font-mono text-[10px] transition-colors outline-none placeholder:text-xs placeholder:lowercase lg:p-3 lg:text-xs"
            />
          </div>

          <div className="flex flex-row items-start justify-between gap-2 lg:gap-4">
            <div className="flex-1 pr-2 lg:pr-8">
              <AnimatePresence mode="wait">
                {(!scope.hasLogo || !scope.hasImages) && (
                  <motion.div
                    key="creation-alert"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="border-accent/50 bg-accent/5 border-l-2 px-2 py-1 lg:mt-0">
                      <span className="text-muted-foreground block font-mono text-[8px] leading-relaxed uppercase lg:text-[10px]">
                        <Translate
                          i18nKey="slides.builder.step2.assets_alert"
                          components={[<span className="text-accent font-bold" key="1" />]}
                        />
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex w-auto flex-col gap-2 lg:items-end lg:gap-3">
              <div className="flex items-center justify-end gap-2 lg:gap-4">
                <span className="text-muted-foreground w-12 text-right font-mono text-[9px] uppercase lg:w-20 lg:text-[10px]">
                  {t('slides.builder.step2.logo_label')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setScope((prev) => ({ ...prev, hasLogo: true }))}
                    className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${scope.hasLogo ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                  >
                    {t('slides.builder.step2.btn_have')}
                  </button>
                  <button
                    onClick={() => setScope((prev) => ({ ...prev, hasLogo: false }))}
                    className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${!scope.hasLogo ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                  >
                    {t('slides.builder.step2.btn_create')}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 lg:gap-4">
                <span className="text-muted-foreground w-12 text-right font-mono text-[9px] uppercase lg:w-20 lg:text-[10px]">
                  {t('slides.builder.step2.images_label')}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setScope((prev) => ({ ...prev, hasImages: true }))}
                    className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${scope.hasImages ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                  >
                    {t('slides.builder.step2.btn_have')}
                  </button>
                  <button
                    onClick={() => setScope((prev) => ({ ...prev, hasImages: false }))}
                    className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${!scope.hasImages ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                  >
                    {t('slides.builder.step2.btn_create')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

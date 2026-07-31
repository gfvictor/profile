import { Plan } from '@/components/slides/builder-slide'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

interface BuilderVisualizerProps {
  plan: Plan
  addons: { auth: boolean; db: boolean; payments: boolean; seo: boolean }
  price: string
  time: string
}

export function BuilderVisualizer({ plan, addons, price, time }: BuilderVisualizerProps) {
  const { t } = useTranslation()
  return (
    <div className="bg-muted/10 border-accent/20 relative flex w-full flex-row items-center justify-between overflow-hidden rounded-xl border p-4 lg:h-full lg:flex-col lg:justify-center lg:p-8">
      {!plan ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-muted-foreground animate-pulse font-mono text-[10px] tracking-widest uppercase sm:text-xs lg:text-sm">
            {t('slides.builder.visualizer.awaiting')}
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-1/2 flex-row items-center gap-3 lg:w-full lg:flex-col lg:gap-8">
            <div className="text-foreground hidden font-mono text-sm font-bold tracking-widest uppercase lg:block lg:text-lg">
              {plan} {t('slides.builder.visualizer.tier')}
            </div>

            <motion.div
              layout
              className={`border-accent/40 bg-background relative flex aspect-video w-full max-w-[120px] shrink-0 flex-col gap-1 overflow-hidden border p-1.5 opacity-80 shadow-xl transition-colors duration-500 sm:max-w-[160px] lg:max-w-md lg:gap-2 lg:p-4 lg:shadow-2xl ${
                plan === 'scale' ? 'border-accent shadow-accent/20' : ''
              }`}
            >
              <motion.div
                layout
                className={`w-full transition-colors duration-500 ${
                  plan === 'advanced' || plan === 'scale'
                    ? 'bg-accent/40 h-3 rounded-full lg:h-6'
                    : 'bg-accent/20 h-2 lg:h-6'
                }`}
              />
              <motion.div layout className="flex flex-1 gap-1 overflow-hidden lg:gap-4">
                <AnimatePresence>
                  {plan !== 'basic' && (
                    <motion.div
                      key="sidebar"
                      layout
                      initial={{ opacity: 0, x: -20, width: 0 }}
                      animate={{ opacity: 1, x: 0, width: '30%' }}
                      exit={{ opacity: 0, x: -20, width: 0 }}
                      className={`h-full transition-colors duration-500 ${plan === 'scale' ? 'bg-accent/20' : 'bg-accent/10'}`}
                    />
                  )}
                </AnimatePresence>

                <motion.div layout className="flex h-full flex-1 flex-col gap-1 lg:gap-4">
                  <motion.div
                    layout
                    className={`w-full flex-1 transition-colors duration-500 ${plan === 'scale' ? 'bg-accent/10' : 'bg-accent/5'}`}
                  />

                  <AnimatePresence>
                    {(plan === 'advanced' || plan === 'scale') && (
                      <motion.div
                        key="dashboard"
                        layout
                        initial={{ opacity: 0, y: 20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: '40%' }}
                        exit={{ opacity: 0, y: 20, height: 0 }}
                        className="flex w-full gap-1 lg:gap-4"
                      >
                        <motion.div
                          layout
                          className="bg-accent/20 h-full flex-1 rounded-sm lg:rounded-md"
                        />
                        <motion.div
                          layout
                          className="bg-accent/20 h-full w-1/3 rounded-sm lg:rounded-md"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="flex min-h-[72px] w-[40px] shrink-0 flex-col flex-wrap items-center justify-center gap-1 sm:w-[60px] lg:min-h-[24px] lg:w-full lg:flex-row lg:gap-2">
              <AnimatePresence>
                {addons.auth && (
                  <motion.span
                    key="auth"
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-accent/50 bg-accent/10 border px-1.5 py-0.5 font-mono text-[6px] uppercase sm:text-[8px] lg:px-2 lg:py-1 lg:text-[10px]"
                  >
                    Auth
                  </motion.span>
                )}
                {addons.db && (
                  <motion.span
                    key="db"
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-accent/50 bg-accent/10 border px-1.5 py-0.5 font-mono text-[6px] uppercase sm:text-[8px] lg:px-2 lg:py-1 lg:text-[10px]"
                  >
                    DB
                  </motion.span>
                )}
                {addons.payments && (
                  <motion.span
                    key="pay"
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-accent/50 bg-accent/10 border px-1.5 py-0.5 font-mono text-[6px] uppercase sm:text-[8px] lg:px-2 lg:py-1 lg:text-[10px]"
                  >
                    Pay
                  </motion.span>
                )}
                {addons.seo && (
                  <motion.span
                    key="seo"
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="border-accent/50 bg-accent/10 border px-1.5 py-0.5 font-mono text-[6px] uppercase sm:text-[8px] lg:px-2 lg:py-1 lg:text-[10px]"
                  >
                    SEO
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="border-border/50 flex w-1/2 flex-col pl-4 text-right lg:mt-6 lg:w-full lg:border-t lg:pt-4 lg:pl-0">
            <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col lg:text-left">
                <span className="text-muted-foreground font-mono text-[8px] uppercase sm:text-[9px] lg:text-[10px]">
                  {t('slides.builder.visualizer.estimated_investment')}
                </span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={price}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="text-foreground inline-block font-mono text-xs font-bold sm:text-sm lg:text-xl"
                  >
                    {price}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="mt-2 flex flex-col lg:mt-0 lg:text-right">
                <span className="text-muted-foreground font-mono text-[8px] uppercase sm:text-[9px] lg:text-[10px]">
                  {t('slides.builder.visualizer.estimated_time')}
                </span>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={time}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 }}
                    className="text-accent inline-block font-mono text-xs font-bold sm:text-sm lg:text-xl"
                  >
                    {time}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

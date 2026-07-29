import { Plan } from '@/components/slides/builder-slide'

interface BuilderVisualizerProps {
  plan: Plan
  addons: { auth: boolean; db: boolean; payments: boolean; seo: boolean }
  price: string
  time: string
}

export function BuilderVisualizer({ plan, addons, price, time }: BuilderVisualizerProps) {
  return (
    <div className="bg-muted/10 border-accent/20 relative flex w-full flex-row items-center justify-between overflow-hidden rounded-xl border p-4 lg:h-full lg:flex-col lg:justify-center lg:p-8">
      {!plan ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-muted-foreground animate-pulse font-mono text-[10px] tracking-widest uppercase lg:text-sm">
            Awaiting parameters...
          </div>
        </div>
      ) : (
        <>
          <div className="flex w-1/2 flex-col items-start gap-2 lg:w-full lg:items-center lg:gap-8">
            <div className="text-foreground hidden font-mono text-sm font-bold tracking-widest uppercase lg:block lg:text-lg">
              {plan} tier
            </div>

            <div className="border-accent/40 bg-background flex aspect-video w-full max-w-[120px] flex-col gap-1 border p-2 opacity-80 shadow-xl transition-all duration-500 lg:max-w-md lg:gap-2 lg:p-4 lg:shadow-2xl">
              <div
                className={`bg-accent/20 w-full ${plan === 'advanced' || plan === 'pro' ? 'h-3 rounded-full lg:h-6' : 'h-2 lg:h-6'}`}
              />
              <div className="flex flex-1 gap-1 lg:gap-4">
                {plan !== 'basic' && <div className="bg-accent/10 h-full w-1/3" />}
                <div className="bg-accent/5 h-full flex-1" />
              </div>
            </div>

            <div className="hidden flex-wrap justify-center gap-2 lg:flex">
              {addons.auth && (
                <span className="border-accent/50 bg-accent/10 border px-2 py-1 font-mono text-[8px] uppercase lg:text-[10px]">
                  Auth
                </span>
              )}
              {addons.db && (
                <span className="border-accent/50 bg-accent/10 border px-2 py-1 font-mono text-[8px] uppercase lg:text-[10px]">
                  DB
                </span>
              )}
              {addons.payments && (
                <span className="border-accent/50 bg-accent/10 border px-2 py-1 font-mono text-[8px] uppercase lg:text-[10px]">
                  Pay
                </span>
              )}
              {addons.seo && (
                <span className="border-accent/50 bg-accent/10 border px-2 py-1 font-mono text-[8px] uppercase lg:text-[10px]">
                  SEO
                </span>
              )}
            </div>
          </div>

          <div className="border-border/50 flex w-1/2 flex-col pl-4 text-right lg:mt-6 lg:w-full lg:border-t lg:pt-4 lg:pl-0">
            <div className="flex w-full flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-col lg:text-left">
                <span className="text-muted-foreground font-mono text-[8px] uppercase lg:text-[10px]">
                  Investimento Total
                </span>
                <span className="text-foreground font-mono text-xs font-bold lg:text-xl">
                  {price}
                </span>
              </div>
              <div className="mt-2 flex flex-col lg:mt-0 lg:text-right">
                <span className="text-muted-foreground font-mono text-[8px] uppercase lg:text-[10px]">
                  prazo est. (após pagamento)
                </span>
                <span className="text-accent font-mono text-xs font-bold lg:text-xl">{time}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

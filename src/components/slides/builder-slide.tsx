'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BuilderOption, BuilderVisualizer } from '@/ui'
import { useTranslation } from 'react-i18next'

export type Plan = 'basic' | 'intermediate' | 'advanced' | 'pro' | null

export function BuilderSlide() {
  const { t } = useTranslation()
  const [step, setStep] = useState(1)

  const [plan, setPlan] = useState<Plan>(null)
  const [addons, setAddons] = useState({ auth: false, db: false, payments: false, seo: false })
  const [scope, setScope] = useState({
    objective: '',
    customObjective: '',
    colors: '',
    hasLogo: false,
    hasImages: true,
  })
  const [contact, setContact] = useState({ name: '', email: '', notes: '' })

  useEffect(() => {
    setScope((prev) => {
      if (plan === 'basic' && prev.objective !== 'Landing Page') {
        return { ...prev, objective: 'Landing Page' }
      }
      if (
        plan === 'intermediate' &&
        !['Landing Page', 'Site Institucional', 'Web App'].includes(prev.objective)
      ) {
        return { ...prev, objective: 'Site Institucional' }
      }
      return prev
    })
  }, [plan])

  const nextStep = () => {
    if (step < 4) {
      if (step === 1 && plan === 'pro') setStep(4)
      else setStep(step + 1)
    }
  }
  const prevStep = () => {
    if (step > 1) {
      if (step === 4 && plan === 'pro') setStep(1)
      else setStep(step - 1)
    }
  }

  const getEstimates = () => {
    if (!plan || plan === 'pro') return { price: 'Sob Consulta', time: 'A definir' }

    let price = 0
    let days = 0
    if (plan === 'basic') {
      price = 50000
      days = 3
    }
    if (plan === 'intermediate') {
      price = 100000
      days = 5
    }
    if (plan === 'advanced') {
      price = 180000
      days = 10
    }

    if (addons.auth) {
      price += 15000
      days += 1
    }
    if (addons.db) {
      price += 25000
      days += 2
    }
    if (addons.payments) {
      price += 20000
      days += 2
    }
    if (addons.seo) {
      price += 10000
      days += 1
    }

    const formattedPrice = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
    return { price: formattedPrice, time: `${days} dias úteis` }
  }

  const renderStepContent = () => {
    const planDetails: Record<NonNullable<Plan>, string> = {
      basic: 'página única ideal para capturar clientes.',
      intermediate: 'múltiplas páginas para apresentar o negócio.',
      advanced: 'plataforma completa com painel administrativo.',
      pro: 'solução de ponta criada do zero pra você.',
    }

    const planSpecs: Record<NonNullable<Plan>, string> = {
      basic:
        '✓ Landing page estática rápida\n✓ Design responsivo e dinâmico\n✓ Hospedagem em Cloud otimizada',
      intermediate:
        '✓ Até 5 páginas institucionais\n✓ Sessão de Portfólio / Blog\n✓ Animações e micro-interações',
      advanced:
        '✓ Plataforma robusta (Full-Stack)\n✓ Integração de APIs e Sistemas\n✓ Escalabilidade e Performance',
      pro: '✓ Arquitetura feita sob medida\n✓ UX/UI Design exclusivo\n✓ Consultoria técnica e de produto',
    }

    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <h4 className="font-koho text-foreground mb-1 text-xl lowercase lg:mb-4 lg:text-2xl">
              select foundation.
            </h4>
            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              {(['basic', 'intermediate', 'advanced', 'pro'] as Plan[]).map((p) => (
                <BuilderOption
                  key={p!}
                  title={p!}
                  description={planDetails[p!]}
                  isActive={plan === p}
                  onClick={() => setPlan(p)}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              {plan && (
                <motion.div
                  key={plan}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <div className="border-accent/50 text-muted-foreground mt-2 border-l-2 pl-3 font-mono text-[10px] leading-relaxed whitespace-pre-line lg:mt-4 lg:text-xs">
                    {planSpecs[plan]}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      case 2:
        const availableObjs =
          plan === 'basic'
            ? ['Landing Page']
            : plan === 'intermediate'
              ? ['Landing Page', 'Site Institucional', 'Web App']
              : ['Landing Page', 'Site Institucional', 'Web App', 'Loja Virtual', 'Outro']

        return (
          <div className="flex flex-col gap-4 lg:gap-6">
            <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
              project objective.
            </h4>

            <div className="flex flex-col">
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
                {availableObjs.map((obj) => (
                  <button
                    key={obj}
                    onClick={() => setScope((prev) => ({ ...prev, objective: obj }))}
                    className={`border p-2 font-mono text-[9px] uppercase transition-colors lg:p-3 lg:text-[10px] ${
                      scope.objective === obj
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-muted-foreground hover:border-accent/50'
                    }`}
                  >
                    {obj}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {scope.objective === 'Outro' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <textarea
                      placeholder="descreva sua visão..."
                      value={scope.customObjective}
                      onChange={(e) =>
                        setScope((prev) => ({ ...prev, customObjective: e.target.value }))
                      }
                      className="border-border bg-background/50 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 h-12 w-full resize-none border p-2 font-mono text-[10px] transition-colors outline-none placeholder:text-xs placeholder:lowercase lg:h-20 lg:text-xs"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {plan !== 'pro' && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-muted-foreground font-mono text-[9px] uppercase lg:text-[10px]">
                    Cores da Marca
                  </label>
                  <input
                    type="text"
                    placeholder="ex: preto, amarelo, minimalista..."
                    value={scope.colors}
                    onChange={(e) => setScope((prev) => ({ ...prev, colors: e.target.value }))}
                    className="border-border bg-background/50 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 w-full border p-2 font-mono text-[10px] transition-colors outline-none placeholder:text-xs placeholder:lowercase lg:p-3 lg:text-xs"
                  />
                </div>
                <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-center lg:gap-4">
                  <div className="flex items-center justify-end gap-4 lg:justify-start">
                    <span className="text-muted-foreground w-16 font-mono text-[9px] uppercase lg:w-20 lg:text-[10px]">
                      Logo?
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setScope((prev) => ({ ...prev, hasLogo: true }))}
                        className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${scope.hasLogo ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                      >
                        TENHO
                      </button>
                      <button
                        onClick={() => setScope((prev) => ({ ...prev, hasLogo: false }))}
                        className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${!scope.hasLogo ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                      >
                        CRIAR
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-4 lg:justify-start">
                    <span className="text-muted-foreground w-16 font-mono text-[9px] uppercase lg:w-20 lg:text-[10px]">
                      Imagens?
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setScope((prev) => ({ ...prev, hasImages: true }))}
                        className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${scope.hasImages ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                      >
                        TENHO
                      </button>
                      <button
                        onClick={() => setScope((prev) => ({ ...prev, hasImages: false }))}
                        className={`border px-3 py-1 font-mono text-[9px] transition-colors lg:text-[10px] ${!scope.hasImages ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-accent/50'}`}
                      >
                        CRIAR
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <h4 className="font-koho text-foreground mb-2 text-xl lowercase lg:mb-4 lg:text-2xl">
              system add-ons.
            </h4>
            <div className="border-accent/30 bg-accent/5 mb-2 border p-2 text-center">
              <span className="text-foreground font-mono text-[8px] font-bold tracking-widest uppercase lg:text-[10px]">
                INCLUSO NATIVAMENTE: Deploy na Cloud & Infraestrutura Vercel
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              {(['auth', 'db', 'payments', 'seo'] as const).map((addon) => {
                const titles = { auth: 'Auth', db: 'Database', payments: 'Payments', seo: 'SEO' }
                const descs = {
                  auth: 'permitir que usuários criem contas.',
                  db: 'guardar informações com segurança.',
                  payments: 'receber pagamentos online.',
                  seo: 'aparecer nos resultados do google.',
                }
                return (
                  <BuilderOption
                    key={addon}
                    title={titles[addon]}
                    description={descs[addon]}
                    isActive={addons[addon]}
                    type="checkbox"
                    onClick={() => {
                      setAddons((prev) => {
                        const next = { ...prev, [addon]: !prev[addon] }
                        if (addon === 'auth' && next.auth) next.db = true
                        if (addon === 'db' && !next.db && next.auth) next.auth = false
                        return next
                      })
                    }}
                  />
                )
              })}
            </div>

            <div className="text-muted-foreground/60 mt-1 text-center font-mono text-[8px] lowercase lg:mt-2 lg:text-[10px]">
              * sistemas de <span className="text-accent/80">auth</span> requerem obrigatoriamente a
              infra de <span className="text-accent/80">database</span>.
            </div>
          </div>
        )
      case 4:
        return (
          <div className="flex flex-col gap-4 lg:gap-6">
            <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
              finalize request.
            </h4>

            <div className="flex flex-col gap-4 lg:gap-6">
              <input
                type="text"
                placeholder="your name *"
                value={contact.name}
                onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                className="text-foreground border-accent/30 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 h-10 w-full border-b bg-transparent px-1 font-mono text-xs transition-colors placeholder:text-sm placeholder:lowercase focus:outline-none sm:text-sm"
              />
              <input
                type="email"
                placeholder="your email *"
                value={contact.email}
                onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                className="text-foreground border-accent/30 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 h-10 w-full border-b bg-transparent px-1 font-mono text-xs transition-colors placeholder:text-sm placeholder:lowercase focus:outline-none sm:text-sm"
              />
              <textarea
                placeholder="additional notes (optional)"
                value={contact.notes}
                onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
                className="text-foreground border-accent/30 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 h-16 w-full resize-none border-b bg-transparent px-1 pt-2 font-mono text-xs transition-colors placeholder:text-sm placeholder:lowercase focus:outline-none sm:text-sm"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="slide-container p-6 pt-8 pb-32 lg:p-12 lg:pr-32 xl:p-16 xl:pr-48">
      <div className="flex h-full w-full max-w-7xl flex-col lg:flex-row lg:items-center lg:gap-16">
        <div className="hidden h-full w-full shrink-0 lg:order-2 lg:block lg:h-[60%] lg:w-5/12">
          <BuilderVisualizer
            plan={plan}
            addons={addons}
            price={getEstimates().price}
            time={getEstimates().time}
          />
        </div>

        <div className="flex h-full w-full flex-col lg:order-1 lg:w-7/12">
          <div className="mb-6 flex items-center justify-between lg:mb-8">
            <div className="text-foreground font-mono text-[10px] font-bold tracking-widest uppercase lg:text-sm">
              Step {step} <span className="text-accent">/</span> 4
            </div>
            <h3 className="slide-eyebrow !mb-0 text-right">
              project builder.
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="cursor-blink"
              />
            </h3>
          </div>

          <div className="relative h-[340px] w-full sm:h-[350px] lg:h-[350px]">
            <AnimatePresence>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-auto flex w-full flex-col pb-6 lg:pb-0">
            <div className="mb-2 h-auto w-full shrink-0 lg:hidden">
              <BuilderVisualizer
                plan={plan}
                addons={addons}
                price={getEstimates().price}
                time={getEstimates().time}
              />
            </div>

            <div className="border-border flex items-center justify-end border-t pt-2 lg:pt-6">
              <div className="flex gap-4">
                {step > 1 && (
                  <button
                    className="text-muted-foreground hover:text-foreground font-mono text-xs font-bold tracking-widest uppercase transition-colors"
                    onClick={prevStep}
                  >
                    Back
                  </button>
                )}
                {step < 4 ? (
                  <button
                    disabled={(step === 1 && !plan) || (step === 2 && !scope.objective)}
                    className="border-accent text-accent hover:bg-accent disabled:border-border disabled:text-muted-foreground hover:text-background border px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:bg-transparent"
                    onClick={nextStep}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    disabled={!contact.name || !contact.email}
                    className="border-accent bg-accent text-background disabled:border-muted disabled:bg-muted disabled:text-muted-foreground border px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-all hover:opacity-90"
                    onClick={() => console.log('Deploy Request!', { plan, addons, scope, contact })}
                  >
                    Send Request
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

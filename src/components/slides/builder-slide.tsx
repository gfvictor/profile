'use client'

import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BuilderVisualizer } from '@/ui'
import { useTranslation } from 'react-i18next'
import { sendEmailAction } from '@/actions'
import { useBuilder } from '@/providers'

import { Step1Plan, Step2Quiz, Step3Addons, Step4Scope, Step5Contact } from '@/steps'

export type Plan = 'basic' | 'intermediate' | 'advanced' | 'scale' | null

export function BuilderSlide() {
  const { t } = useTranslation()
  const { step, setStep, plan, addons, scope, contact, status, setStatus, quizAccepted } =
    useBuilder()

  const pegatrouxaRef = useRef<HTMLInputElement>(null)

  const nextStep = () => {
    if (step === 1) {
      setStep(3)
      return
    }
    if (step < 5) setStep(step + 1)
  }
  const prevStep = () => {
    if (step === 1) return
    if (step === 5 && plan === 'scale') {
      setStep(1)
      return
    }
    if (step === 3) {
      setStep(quizAccepted ? 2 : 1)
      return
    }
    setStep(step - 1)
  }

  const submitRequest = async () => {
    if (contact.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(contact.email)) {
        alert('Email inválido / Invalid email')
        return
      }
    }

    setStatus('loading')
    try {
      const formData = new FormData()
      formData.append('name', contact.name)
      formData.append('whatsapp', contact.whatsapp)
      formData.append('email', contact.email)

      const message = `
Novo Projeto (Builder)
----------------------

Plano: ${plan}

Add-ons:
- Cadastro: ${addons.auth ? 'Sim' : 'Não'}
- Pagamentos: ${addons.payments ? 'Sim' : 'Não'}
- Visibilidade: ${addons.seo ? 'Sim' : 'Não'}
- Social: ${addons.social ? 'Sim' : 'Não'}

Escopo:
- Objetivo: ${scope.objective}
- Cores: ${scope.colors || 'N/A'}
- Possui Logo: ${scope.hasLogo ? 'Sim' : 'Não (Precisa Criar)'}
- Possui Imagens: ${scope.hasImages ? 'Sim' : 'Não (Precisa Criar)'}

Observações do cliente:
${contact.notes || 'Nenhuma observação.'}
      `.trim()

      formData.append('message', message)
      if (pegatrouxaRef.current?.value) {
        formData.append('_pegatrouxa', pegatrouxaRef.current.value)
      }

      const result = await sendEmailAction(formData)
      if (result.error) throw new Error(result.error)
    } catch (e) {
      console.error(e)
    }

    setStatus('success')
  }

  const getEstimates = () => {
    if (!plan || plan === 'scale')
      return {
        price: t('slides.builder.visualizer.upon_request'),
        time: t('slides.builder.visualizer.tbd'),
      }

    let price = 0
    let days = 0
    if (plan === 'basic') {
      price = 45000
      days = 3
    }
    if (plan === 'intermediate') {
      price = 85000
      days = 5
    }
    if (plan === 'advanced') {
      price = 155000
      days = 10
    }

    if (addons.auth) {
      price += 30000
      days += 3
    }
    if (addons.payments) {
      price += 30000
      days += 2
    }
    if (addons.seo) {
      price += 5000
      days += 1
    }
    if (addons.social) {
      price += 15000
      days += 1
    }

    if (!scope.hasLogo) {
      price += 15000
      days += 2
    }
    if (!scope.hasImages) {
      price += 10000
      days += 1
    }

    price = Math.floor(price * 1.1)

    const formattedPrice = new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(price)
    return { price: formattedPrice, time: `${days} ${t('slides.builder.visualizer.work_days')}` }
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1Plan />
      case 2:
        return <Step2Quiz />
      case 3:
        return <Step3Addons />
      case 4:
        return <Step4Scope />
      case 5:
        return <Step5Contact pegatrouxaRef={pegatrouxaRef} />
      default:
        return null
    }
  }

  return (
    <div className="slide-container p-6 pt-8 pb-20 sm:px-20 sm:pt-16 sm:pb-24 lg:p-12 lg:pr-32 lg:pb-32 lg:pl-28 xl:p-16 xl:pr-22 xl:pb-40 xl:pl-40">
      <div className="flex h-full w-full max-w-7xl flex-col lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          initial={false}
          animate={{ width: step >= 3 ? '41.6667%' : '0%', opacity: step >= 3 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="hidden h-full shrink-0 overflow-hidden lg:order-2 lg:block lg:h-[75%]"
        >
          <BuilderVisualizer
            plan={plan}
            addons={addons}
            price={getEstimates().price}
            time={getEstimates().time}
          />
        </motion.div>

        <div
          className={`flex h-full w-full flex-col lg:order-1 lg:flex-1 ${step >= 3 ? '' : 'xl:ml-4'}`}
        >
          <div className="mb-6 flex items-center justify-between lg:mb-8">
            <div className="text-foreground font-mono text-[10px] font-bold tracking-widest uppercase lg:text-sm">
              {t('slides.builder.step')} {step} <span className="text-accent">/</span> 5
            </div>
            <h3 className="slide-eyebrow !mb-0 text-right">
              {t('slides.builder.eyebrow')}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="cursor-blink"
              />
            </h3>
          </div>

          <div className="relative h-[340px] w-full sm:h-[350px] lg:h-[350px]">
            <AnimatePresence mode="wait">
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

          <div className="mt-auto flex w-full flex-col pb-0 lg:pb-0">
            <AnimatePresence>
              {step >= 3 && (
                <motion.div
                  key="visualizer-mobile"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="mb-1 h-auto w-full shrink-0 lg:hidden"
                >
                  <BuilderVisualizer
                    plan={plan}
                    addons={addons}
                    price={getEstimates().price}
                    time={getEstimates().time}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {step !== 2 && (
                <motion.div
                  key="step-nav"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="border-border flex items-center justify-end border-t pt-2 lg:pt-6"
                >
                  <div className="flex gap-4">
                    {step > 1 && (
                      <button
                        className="text-muted-foreground hover:text-foreground font-mono text-xs font-bold tracking-widest uppercase transition-colors"
                        onClick={prevStep}
                      >
                        {t('slides.builder.buttons.back')}
                      </button>
                    )}
                    {step < 5 ? (
                      <button
                        disabled={(step === 1 && !plan) || (step === 4 && !scope.objective)}
                        className="border-accent text-accent hover:bg-accent disabled:border-border disabled:text-muted-foreground hover:text-background border px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors disabled:bg-transparent disabled:opacity-40"
                        onClick={nextStep}
                      >
                        {t('slides.builder.buttons.next')}
                      </button>
                    ) : (
                      <button
                        disabled={
                          !contact.name ||
                          !contact.whatsapp ||
                          !contact.terms ||
                          status === 'loading' ||
                          status === 'success'
                        }
                        className="border-accent/30 bg-accent/5 text-accent hover:border-accent hover:bg-accent hover:text-background border px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50"
                        onClick={submitRequest}
                      >
                        {status === 'loading'
                          ? '...'
                          : status === 'success'
                            ? t('slides.builder.buttons.success')
                            : t('slides.builder.buttons.send')}
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

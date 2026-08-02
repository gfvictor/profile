'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation, Trans as Translate } from 'react-i18next'
import { TermsModal } from '@/ui'
import { useBuilder } from '@/providers'

interface Step4ContactProps {
  pegatrouxaRef: React.RefObject<HTMLInputElement | null>
}

export function Step4Contact({ pegatrouxaRef }: Step4ContactProps) {
  const { t } = useTranslation()
  const { contact, setContact, status, setStatus, setStep, setPlan } = useBuilder()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (status === 'success') {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border-accent/30 bg-accent/5 flex h-auto w-full flex-col items-center justify-center border px-4 py-6 text-center lg:py-8"
        >
          <span className="text-accent font-mono text-xs font-bold tracking-widest uppercase sm:text-sm">
            {t('slides.contact.form.success_title')}
          </span>
          <span className="text-muted-foreground mt-2 text-center font-mono text-[10px] sm:text-xs">
            {t('slides.contact.form.success_desc')}
          </span>
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('GO_TO_INTRO'))
              setTimeout(() => {
                setStep(1)
                setPlan(null)
                setStatus('idle')
              }, 500)
            }}
            className="border-accent/50 text-accent hover:bg-accent hover:text-background mt-4 border px-4 py-2 font-mono text-xs tracking-widest uppercase transition-colors"
          >
            {t('slides.contact.form.back_to_top')}
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 lg:gap-6">
      <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
        {t('slides.builder.step4.title')}
      </h4>
      <div className="absolute top-[-9999px] left-[-9999px]" aria-hidden="true" tabIndex={-1}>
        <input
          type="text"
          name="_pegatrouxa"
          ref={pegatrouxaRef}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 lg:gap-6">
        <div className="relative flex w-full flex-col">
          <input
            type="text"
            placeholder={t('slides.builder.step4.name_placeholder')}
            value={contact.name}
            onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
            className="peer text-foreground border-accent/30 focus:border-accent placeholder:font-koho h-10 w-full border-b bg-transparent px-1 font-mono text-[16px] transition-colors placeholder:text-transparent placeholder:lowercase focus:outline-none sm:text-sm"
          />
          <div className="text-muted-foreground/50 pointer-events-none absolute top-[10px] left-1 font-mono text-xs transition-opacity peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 sm:text-sm">
            {t('slides.builder.step4.name_placeholder')} <span className="text-accent">*</span>
          </div>
        </div>

        <div className="relative flex w-full flex-col">
          <input
            type="email"
            placeholder={t('slides.builder.step4.email_placeholder')}
            value={contact.email}
            onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
            className="peer text-foreground border-accent/30 focus:border-accent placeholder:font-koho h-10 w-full border-b bg-transparent px-1 font-mono text-[16px] transition-colors placeholder:text-transparent placeholder:lowercase focus:outline-none sm:text-sm"
          />
          <div className="text-muted-foreground/50 pointer-events-none absolute top-[10px] left-1 font-mono text-xs transition-opacity peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 sm:text-sm">
            {t('slides.builder.step4.email_placeholder')} <span className="text-accent">*</span>
          </div>
        </div>

        <div className="relative flex w-full flex-col">
          <textarea
            placeholder={t('slides.builder.step4.notes_placeholder')}
            value={contact.notes}
            onChange={(e) => setContact((prev) => ({ ...prev, notes: e.target.value }))}
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className="peer text-foreground border-accent/30 focus:border-accent placeholder:font-koho h-24 w-full touch-pan-y resize-none border bg-transparent p-2 font-mono text-[16px] transition-colors placeholder:text-transparent placeholder:lowercase focus:outline-none sm:text-sm"
          />
          <div className="text-muted-foreground/50 pointer-events-none absolute top-2 left-2 font-mono text-xs transition-opacity peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 sm:text-sm">
            {t('slides.builder.step4.notes_placeholder')}{' '}
            <span className="lowercase opacity-70">(opcional)</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-end gap-2 lg:mt-2">
          <input
            type="checkbox"
            id="builder-terms"
            checked={contact.terms}
            onChange={(e) => setContact((prev) => ({ ...prev, terms: e.target.checked }))}
            className="accent-accent h-3 w-3 cursor-pointer"
          />
          <label
            htmlFor="builder-terms"
            className="text-muted-foreground/60 font-mono text-[8px] text-[10px] tracking-wider lowercase 2xl:text-xs"
          >
            <Translate
              i18nKey="slides.contact.form.terms"
              components={{
                1: (
                  <span
                    className="text-accent cursor-pointer uppercase hover:underline"
                    onClick={(e) => {
                      e.preventDefault()
                      setIsModalOpen(true)
                    }}
                  />
                ),
              }}
            />
          </label>
        </div>
      </div>

      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => {
          setIsModalOpen(false)
          setContact((prev) => ({ ...prev, terms: true }))
        }}
      />
    </div>
  )
}

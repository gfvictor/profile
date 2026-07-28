'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation, Trans } from 'react-i18next'
import { TermsModal } from './terms-modal'
import { sendEmailAction } from '@/actions'

export function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [errors, setErrors] = useState<{
    name?: boolean
    email?: boolean
    message?: boolean
    terms?: boolean
  }>({})
  const termsRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const terms = (e.currentTarget.elements.namedItem('terms') as HTMLInputElement).checked

    const newErrors = {
      name: !name.trim(),
      email: !email.trim() || !/^\S+@\S+\.\S+$/.test(email),
      message: !message.trim(),
      terms: !terms,
    }

    if (Object.values(newErrors).some(Boolean)) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setStatus('loading')

    try {
      const result = await sendEmailAction(formData)

      if (result.error) throw new Error(result.error)
    } catch (e) {
      console.error(e)
    }

    setStatus('success')
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border-accent/30 bg-accent/5 flex h-full min-h-[96px] w-full flex-col items-center justify-center border p-6"
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
            setTimeout(() => setStatus('idle'), 500)
          }}
          className="border-accent/30 text-accent hover:border-accent mt-6 border-b font-mono text-[10px] font-bold tracking-widest uppercase transition-all"
        >
          {t('slides.contact.form.back_to_top')}
        </button>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid w-full grid-cols-3 gap-x-6 gap-y-4 sm:gap-x-10 sm:gap-y-6"
    >
      <div className="absolute top-[-9999px] left-[-9999px]" aria-hidden="true" tabIndex={-1}>
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="col-span-1 flex flex-col justify-between gap-4">
        <div className="relative flex w-full flex-col">
          <input
            type="text"
            name="name"
            placeholder={t('slides.contact.form.name')}
            onChange={() => setErrors((prev) => ({ ...prev, name: false }))}
            className={`peer text-foreground h-10 w-full border-b bg-transparent px-1 font-mono text-xs placeholder-transparent focus:outline-none sm:text-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-accent/30 focus:border-accent'}`}
          />
          <div
            className={`pointer-events-none absolute top-[10px] left-1 font-mono text-xs transition-opacity peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 sm:text-sm ${errors.name ? 'text-red-500' : 'text-muted-foreground/50'}`}
          >
            {t('slides.contact.form.name')}{' '}
            <span className={errors.name ? 'text-red-500' : 'text-accent'}>*</span>
          </div>
        </div>

        <div className="relative flex w-full flex-col">
          <input
            type="email"
            name="email"
            placeholder={t('slides.contact.form.email')}
            onChange={() => setErrors((prev) => ({ ...prev, email: false }))}
            className={`peer text-foreground h-10 w-full border-b bg-transparent px-1 font-mono text-xs placeholder-transparent focus:outline-none sm:text-sm ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-accent/30 focus:border-accent'}`}
          />
          <div
            className={`pointer-events-none absolute top-[10px] left-1 font-mono text-xs transition-opacity peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 sm:text-sm ${errors.email ? 'text-red-500' : 'text-muted-foreground/50'}`}
          >
            {t('slides.contact.form.email')}{' '}
            <span className={errors.email ? 'text-red-500' : 'text-accent'}>*</span>
          </div>
        </div>
      </div>

      <div className="col-span-2 flex flex-col justify-between gap-4">
        <div className="relative flex w-full flex-col">
          <input
            type="text"
            name="message"
            placeholder={t('slides.contact.form.message')}
            onChange={() => setErrors((prev) => ({ ...prev, message: false }))}
            className={`peer text-foreground h-10 w-full border-b bg-transparent px-1 font-mono text-xs placeholder-transparent focus:outline-none sm:text-sm ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-accent/30 focus:border-accent'}`}
          />
          <div
            className={`pointer-events-none absolute top-[10px] left-1 font-mono text-xs transition-opacity peer-focus:opacity-0 peer-[:not(:placeholder-shown)]:opacity-0 sm:text-sm ${errors.message ? 'text-red-500' : 'text-muted-foreground/50'}`}
          >
            {t('slides.contact.form.message')}{' '}
            <span className={errors.message ? 'text-red-500' : 'text-accent'}>*</span>
          </div>
        </div>

        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="terms"
              id="terms"
              ref={termsRef}
              onChange={() => setErrors((prev) => ({ ...prev, terms: false }))}
              className={`h-3 w-3 cursor-pointer ${errors.terms ? 'accent-red-500 outline outline-1 outline-red-500' : 'accent-accent'}`}
            />
            <label
              htmlFor="terms"
              className={`font-mono text-[8px] tracking-wider lowercase sm:text-[9px] lg:text-[10px] 2xl:text-xs ${errors.terms ? 'text-red-500' : 'text-muted-foreground/60'}`}
            >
              <Trans
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

          <button
            type="submit"
            disabled={status === 'loading'}
            className="border-accent/30 bg-accent/5 text-accent hover:border-accent hover:bg-accent hover:text-background ml-auto flex h-10 w-fit min-w-[90px] items-center justify-center border px-4 font-mono text-xs font-bold tracking-widest uppercase transition-all duration-300 disabled:opacity-50 sm:min-w-[120px] sm:px-6 sm:text-sm"
          >
            {status === 'loading' ? '...' : t('slides.contact.form.submit')}
          </button>
        </div>
      </div>

      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={() => {
          setIsModalOpen(false)
          if (termsRef.current) termsRef.current.checked = true
          setErrors((prev) => ({ ...prev, terms: false }))
        }}
      />
    </form>
  )
}

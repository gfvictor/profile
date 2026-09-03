'use client'

import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ModalShell } from './modal-shell'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export function TermsModal({ isOpen, onClose, onAccept }: TermsModalProps) {
  const { t } = useTranslation()

  return (
    <ModalShell isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="border-accent bg-background relative z-10 flex max-h-[85vh] w-full max-w-md flex-col border p-6 shadow-2xl sm:max-w-lg sm:p-8"
      >
        <div className="border-accent/30 mb-4 flex items-center justify-between border-b pb-4 text-left">
          <h2 className="text-accent font-mono text-sm font-bold tracking-widest uppercase sm:text-base">
            {t('slides.contact.terms_modal.title')}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-xs transition-colors"
          >
            X
          </button>
        </div>

        <div className="text-muted-foreground flex-1 overflow-y-auto pr-4 text-left font-mono text-[10px] leading-relaxed sm:text-xs">
          <p className="mb-4">{t('slides.contact.terms_modal.p1')}</p>
          <p className="text-foreground mb-4">{t('slides.contact.terms_modal.p2')}</p>
          <p className="text-foreground mb-4">{t('slides.contact.terms_modal.p3')}</p>
          <p className="text-foreground mb-4">{t('slides.contact.terms_modal.p4')}</p>
          <p className="border-accent text-accent mt-8 border-l-2 pl-4 italic">
            {t('slides.contact.terms_modal.p5')}
          </p>
        </div>

        <div className="border-accent/30 mt-4 border-t pt-4">
          <button
            type="button"
            onClick={onAccept}
            className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background flex w-full items-center justify-center border px-6 py-3 font-mono text-[10px] font-bold tracking-widest uppercase transition-all sm:text-xs"
          >
            {t('slides.contact.terms_modal.close')}
          </button>
        </div>
      </motion.div>
    </ModalShell>
  )
}

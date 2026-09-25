'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Trans } from 'react-i18next'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ModalShell } from './modal-shell'

interface ImageLightboxProps {
  images: string[]
  captionsI18nKey?: string
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageLightbox({
  images,
  captionsI18nKey,
  index,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  useEffect(() => {
    if (index === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [index, images.length, onClose, onNavigate])

  return (
    <ModalShell isOpen={index !== null} onClose={onClose} backdropClassName="bg-background/90">
      {index !== null && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="flex w-full max-w-2xl flex-col items-center gap-3"
        >
          <div className="relative w-full">
            <button
              type="button"
              onClick={onClose}
              className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center border transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate((index - 1 + images.length) % images.length)}
              className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate((index + 1) % images.length)}
              className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="border-accent/30 relative z-0 aspect-[4/5] w-full overflow-hidden border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundImage: `url(${images[index]})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            />

            <div className="absolute inset-x-0 bottom-3 z-10 flex justify-center gap-1.5">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => onNavigate(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? 'bg-accent w-5' : 'bg-border w-1.5'
                  }`}
                />
              ))}
            </div>
          </div>

          {captionsI18nKey && (
            <motion.p
              key={`caption-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="text-muted-foreground mt-6 px-4 text-center font-mono text-sm"
            >
              <Trans
                i18nKey={`${captionsI18nKey}.${index}`}
                components={{
                  1: <span className="text-accent" />,
                  2: <br />,
                }}
              />
            </motion.p>
          )}
        </motion.div>
      )}
    </ModalShell>
  )
}

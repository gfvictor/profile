'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { ModalShell } from './modal-shell'

interface ImageLightboxProps {
  images: string[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ImageLightbox({ images, index, onClose, onNavigate }: ImageLightboxProps) {
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
        <>
          <button
            type="button"
            onClick={onClose}
            className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute top-24 right-4 z-10 flex h-9 w-9 items-center justify-center border transition-colors sm:top-8 sm:right-8"
          >
            <X className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate((index - 1 + images.length) % images.length)}
            className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute left-6 z-10 flex h-9 w-9 items-center justify-center border transition-colors sm:left-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate((index + 1) % images.length)}
            className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute right-6 z-10 flex h-9 w-9 items-center justify-center border transition-colors sm:right-8"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="border-accent/30 relative z-0 aspect-[4/5] w-full max-w-2xl overflow-hidden border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundImage: `url(${images[index]})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </>
      )}
    </ModalShell>
  )
}

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useSyncExternalStore, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

const emptySubscribe = () => () => {}

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}

interface ModalShellProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  backdropClassName?: string
}

export function ModalShell({
  isOpen,
  onClose,
  children,
  backdropClassName = 'bg-background/80',
}: ModalShellProps) {
  const mounted = useMounted()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-blur-sm sm:p-12 ${backdropClassName}`}
          onWheel={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
            onClick={onClose}
          />
          {children}
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

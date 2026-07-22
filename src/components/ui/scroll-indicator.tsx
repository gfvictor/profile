'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollIndicatorProps {
  canScrollUp: boolean
  canScrollDown: boolean
  onUp: () => void
  onDown: () => void
}

export function ScrollIndicator({ canScrollUp, canScrollDown, onUp, onDown }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex flex-col items-center gap-3 md:right-10 md:bottom-10 lg:right-12 lg:bottom-12">
      
      {/* Seta para Cima */}
      <AnimatePresence>
        {canScrollUp && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={onUp}
            className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full border border-border bg-background/60 shadow-lg backdrop-blur-md transition-colors hover:bg-muted"
            aria-label="Back section"
          >
            <ChevronUp className="h-5 w-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Seta para Baixo */}
      <AnimatePresence>
        {canScrollDown && (
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={onDown}
            className="flex h-10 w-10 animate-pulse items-center justify-center rounded-full border border-border bg-background/60 shadow-lg backdrop-blur-md transition-colors hover:bg-muted"
            aria-label="Next section"
          >
            <ChevronDown className="h-5 w-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  )
}

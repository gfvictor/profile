'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScrollIndicatorProps {
  isFirst: boolean
  isLast: boolean
  onPrev: () => void
  onNext: () => void
}

export function ScrollIndicator({ isFirst, isLast, onPrev, onNext }: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-6 left-6 z-50 flex flex-col items-center gap-3 md:bottom-10 md:left-10 lg:bottom-12 lg:left-12">
      <AnimatePresence>
        {!isFirst && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={onPrev}
            className="border-border bg-background/60 hover:bg-muted flex h-10 w-10 animate-pulse items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-colors"
            aria-label="Back section"
          >
            <ChevronUp className="h-5 w-5 text-[#b38e00]" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="relative h-10 w-10">
        <AnimatePresence>
          {!isLast && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={onNext}
              className="border-border bg-background/60 hover:bg-muted absolute inset-0 flex h-10 w-10 animate-pulse items-center justify-center rounded-full border shadow-lg backdrop-blur-md transition-colors"
              aria-label="Next section"
            >
              <ChevronDown className="h-5 w-5 text-[#b38e00]" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

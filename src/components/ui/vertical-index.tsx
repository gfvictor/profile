'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
interface VerticalIndexProps {
  slides: { id: string; title: string }[]
  activeSlide: number
  onChange: (index: number) => void
}

export function VerticalIndex({ slides, activeSlide, onChange }: VerticalIndexProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="pointer-events-auto absolute right-6 bottom-6 z-50 flex flex-col items-end gap-2 lg:hidden">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-background/95 border-border flex flex-col items-end gap-4 rounded-xl border p-4 shadow-2xl"
            >
              {slides.map((slide, index) => {
                const isActive = activeSlide === index
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      onChange(index)
                      setIsOpen(false)
                    }}
                    className={`text-[10px] font-bold tracking-widest uppercase transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {String(index + 1).padStart(2, '0')} <span className="text-[#b38e00]">—</span>{' '}
                    {slide.title}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-foreground px-3 py-2 font-mono text-[10px] font-bold tracking-[0.2em] opacity-80 transition-opacity hover:opacity-100 focus:outline-none"
        >
          [ {String(activeSlide + 1).padStart(2, '0')} <span className="text-[#b38e00]">/</span>{' '}
          {String(slides.length).padStart(2, '0')} ]
        </button>
      </div>

      <div className="pointer-events-auto absolute right-6 bottom-6 z-50 hidden flex-col items-end gap-4 p-4 lg:right-12 lg:bottom-12 lg:flex">
        {slides.map((slide, index) => {
          const isActive = activeSlide === index
          return (
            <button
              key={slide.id}
              onClick={() => onChange(index)}
              className={`group flex items-center justify-end gap-3 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
            >
              <span
                className={`text-[10px] font-medium tracking-widest uppercase transition-all duration-300 ${isActive ? 'text-foreground translate-x-0 opacity-100' : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
              >
                {slide.title}
              </span>
              <div
                className={`h-[1px] bg-[#b38e00] transition-all duration-300 ${isActive ? 'w-8' : 'w-0 group-hover:w-4'}`}
              />
              <span
                className={`text-[10px] font-bold tracking-widest transition-all duration-300 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SlantedSlideProps {
  title: string
  stack: string
  description: string
  images: string[]
}

export function SlantedSlide({ title, stack, description, images }: SlantedSlideProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="relative h-full w-full overflow-hidden">
      
      <div 
        className="absolute left-0 top-0 h-full w-[65%] lg:w-[60%] z-10"
        style={{ 
          maskImage: 'linear-gradient(95deg, black 20%, transparent 70%)',
          WebkitMaskImage: 'linear-gradient(95deg, black 20%, transparent 70%)'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div 
              className="h-full w-full bg-muted flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${images[currentIndex]})` }}
            >
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute right-0 top-0 flex h-full w-[60%] lg:w-[65%] flex-col justify-center p-4 pr-6 lg:p-12 lg:pr-12 xl:pr-24 z-20 pointer-events-none text-right items-end">
        
        <div className="absolute top-6 right-6 lg:top-12 lg:right-12 xl:top-24 xl:right-24 flex flex-col items-end pointer-events-auto">
          <h4 className="text-xl lg:text-3xl font-extrabold tracking-tight drop-shadow-sm">{title}</h4>
          <div className="mt-1 lg:mt-2 flex flex-col items-end gap-y-1">
            {(() => {
              const items = stack.split('•').map(s => s.trim())
              const rows = []
              for (let i = 0; i < items.length; i += 2) {
                rows.push(items.slice(i, i + 2))
              }
              return rows.map((row, i) => (
                <span key={i} className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-muted-foreground drop-shadow-sm">
                  {row.join(' • ')}
                </span>
              ))
            })()}
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col items-end mt-12 lg:mt-0">
          <p className="text-xs lg:text-sm leading-relaxed text-foreground/80 line-clamp-[8] lg:line-clamp-none drop-shadow-md">
            {description}
          </p>
        </div>

      </div>

    </div>
  )
}

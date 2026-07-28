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
        className="absolute top-0 left-0 z-10 h-full w-[65%] lg:w-[60%]"
        style={{
          maskImage: 'linear-gradient(95deg, black 20%, transparent 80%)',
          WebkitMaskImage: 'linear-gradient(95deg, black 20%, transparent 80%)',
        }}
      >
        <div className="relative h-full w-full [mask-image:linear-gradient(to_bottom,transparent_0%,black_25%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_25%,black_100%)] lg:[mask-image:none] lg:[-webkit-mask-image:none]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <div
                className="bg-muted flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
              ></div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 right-0 z-20 flex h-full w-[60%] flex-col items-end justify-center p-4 pr-6 text-right lg:w-[65%] lg:p-12 lg:pr-12 xl:pr-24">
        <div className="pointer-events-auto absolute top-6 right-6 flex flex-col items-end lg:top-12 lg:right-12 xl:top-24 xl:right-24">
          <h4 className="text-xl font-extrabold tracking-tight drop-shadow-sm lg:text-3xl">
            {title}
          </h4>
          <div className="mt-1 flex flex-col items-end gap-y-1 lg:mt-2">
            {(() => {
              const items = stack.split('•').map((s) => s.trim())
              const rows = []
              for (let i = 0; i < items.length; i += 2) {
                rows.push(items.slice(i, i + 2))
              }
              return rows.map((row, i) => (
                <span
                  key={i}
                  className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase drop-shadow-sm lg:text-xs"
                >
                  {row.map((item, idx) => (
                    <span key={item}>
                      {item}
                      {idx < row.length - 1 && <span className="mx-2 text-[#b38e00]">•</span>}
                    </span>
                  ))}
                </span>
              ))
            })()}
          </div>
        </div>

        <div className="pointer-events-auto mt-12 flex flex-col items-end lg:mt-0">
          <p className="text-foreground/80 line-clamp-[8] text-xs leading-relaxed drop-shadow-md lg:line-clamp-none lg:text-sm">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

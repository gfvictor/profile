'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ScreenshotCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)

  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length)
  const goNext = () => setIndex((prev) => (prev + 1) % images.length)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="relative w-full">
        <div className="border-border/60 relative mx-auto aspect-[375/760] w-[min(340px,28.6vh)] overflow-hidden rounded-2xl border shadow-lg">
          {images.map((img, i) => (
            <motion.div
              key={img}
              className="absolute inset-0"
              initial={false}
              animate={{
                opacity: i === index ? 1 : 0,
                filter: i === index ? 'blur(0px)' : 'blur(8px)',
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ pointerEvents: i === index ? 'auto' : 'none' }}
            >
              <Image
                src={img}
                alt={`${alt} ${i + 1}`}
                fill
                className="object-contain"
                unoptimized
              />
            </motion.div>
          ))}
        </div>
        <button
          type="button"
          onClick={goPrev}
          className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute top-1/2 left-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="border-accent/30 bg-accent/5 text-accent hover:bg-accent hover:text-background absolute top-1/2 right-3 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center border transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="flex gap-1.5">
        {images.map((img, i) => (
          <button
            key={img}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? 'bg-accent w-5' : 'bg-border w-1.5'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

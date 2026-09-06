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
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className="border-border/60 relative aspect-[375/760] w-[min(340px,28.6vh)] overflow-hidden rounded-2xl border shadow-lg">
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
          className="border-accent/30 bg-accent/5 text-foreground hover:bg-background absolute top-1/2 left-[-24px] flex h-8 w-8 -translate-y-1/2 items-center justify-center border shadow-md backdrop-blur-sm transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="text-accent h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="border-accent/30 bg-accent/5 text-foreground hover:bg-background absolute top-1/2 right-[-24px] flex h-8 w-8 -translate-y-1/2 items-center justify-center border shadow-md backdrop-blur-sm transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="text-accent h-4 w-4" />
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

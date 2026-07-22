"use client"

import { useTranslation } from "react-i18next"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useCallback } from "react"
import { ThemeToggle, LanguageToggle } from "@/actions"
import { ScrollIndicator } from "@/ui"
import { useSlides } from "@/hooks"

export default function Home() {
  const { t } = useTranslation()
  const [activeSlide, setActiveSlide] = useState(0)
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  const slides = useSlides()

  const totalSlides = slides.length

  const handleNext = useCallback(() => {
    if (activeSlide < totalSlides - 1) setActiveSlide(p => p + 1)
  }, [activeSlide, totalSlides])

  const handlePrev = useCallback(() => {
    if (activeSlide > 0) setActiveSlide(p => p - 1)
  }, [activeSlide])

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling.current) return
    if (Math.abs(e.deltaY) < 30) return 

    isScrolling.current = true
    if (e.deltaY > 0) handleNext()
    else handlePrev()

    setTimeout(() => { isScrolling.current = false }, 800)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isScrolling.current) return
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) < 40) return 

    isScrolling.current = true
    if (diff > 0) handleNext()
    else handlePrev()

    setTimeout(() => { isScrolling.current = false }, 800)
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-background">
      
      <header className="relative z-50 flex h-[30vh] lg:h-screen w-full lg:w-[40%] flex-col justify-between border-b lg:border-b-0 lg:border-r border-border bg-muted/30 lg:bg-transparent p-6 lg:p-12 xl:p-24 rounded-br-[4rem] lg:rounded-none">
        <div className="flex h-full flex-col justify-center">
          <div className="lg:w-[130%] lg:z-50 relative pointer-events-none">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl lg:text-7xl xl:text-8xl drop-shadow-sm">
              Victor<br className="hidden lg:block"/> Farias.
            </h1>
            <h2 className="mt-2 text-base font-medium text-muted-foreground sm:text-lg lg:mt-6 lg:text-2xl">
              {t("hero.role")}
            </h2>
            <p className="mt-4 hidden max-w-sm text-sm leading-relaxed text-muted-foreground lg:block">
              {t("metadata.description")}
            </p>
          </div>
        </div>
        <div className="absolute right-6 top-6 flex items-center gap-4 lg:static lg:mt-auto lg:justify-start">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main 
        className="h-[70vh] lg:h-screen w-full lg:w-[70%] bg-background relative z-0 flex items-center justify-center lg:ml-auto outline-none touch-none"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
      >
        <div className="relative h-full w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              {slides[activeSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <ScrollIndicator 
          canScrollUp={activeSlide > 0} 
          canScrollDown={activeSlide < totalSlides - 1}
          onUp={handlePrev}
          onDown={handleNext}
        />
      </main>
    </div>
  )
}

'use client'

import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { ThemeToggle, LanguageToggle } from '@/actions'
import { useTheme } from 'next-themes'
import { ScrollIndicator, VerticalIndex, TypewriterText } from '@/ui'
import { useSlides, useSlideNavigation } from '@/hooks'

export default function Home() {
  const { t, i18n } = useTranslation()
  const typewriterPhrases = useMemo(
    () => t('hero.phrases', { returnObjects: true }) as string[],
    [t],
  )
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const slides = useSlides()
  const { activeSlide, setActiveSlide, handleNext, handlePrev, handlers } = useSlideNavigation(
    slides.length,
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="bg-background flex h-screen w-full flex-col overflow-hidden lg:flex-row">
      <main
        className="bg-background relative z-0 order-2 flex h-[70vh] w-full touch-none items-center justify-center outline-none lg:order-1 lg:h-screen lg:flex-1"
        {...handlers}
        tabIndex={0}
      >
        <div className="relative flex h-full w-full items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col justify-center"
            >
              {slides[activeSlide].content}
            </motion.div>
          </AnimatePresence>
        </div>

        <ScrollIndicator
          isFirst={activeSlide === 0}
          isLast={activeSlide === slides.length - 1}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        <VerticalIndex
          slides={slides.map((s) => ({ id: s.id, title: s.title }))}
          activeSlide={activeSlide}
          onChange={setActiveSlide}
        />
      </main>

      <header className="bg-background relative z-50 order-1 h-[25vh] w-full flex-shrink-0 overflow-hidden rounded-br-[4px] lg:order-2 lg:h-screen lg:w-[40%] lg:border-b-0 lg:border-l lg:bg-transparent">
        <div className="bg-background/40 absolute top-4 left-4 z-50 flex items-center gap-2 rounded-full p-1.5 backdrop-blur-sm lg:top-8 lg:left-8 lg:bg-transparent lg:backdrop-blur-none">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div>
          <div
            className="absolute top-0 right-0 z-0 h-full w-[60%] lg:w-[80%]"
            style={{
              maskImage: 'linear-gradient(-85deg, black 30%, transparent 80%)',
              WebkitMaskImage: 'linear-gradient(-85deg, black 30%, transparent 80%)',
            }}
          >
            <div
              className="relative h-full w-full"
              style={{
                maskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 70%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 25%, black 70%)',
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={
                    mounted && theme === 'dark'
                      ? '/avatar/victor-dark.png'
                      : '/avatar/victor-light.jpg'
                  }
                  alt="Victor Farias"
                  fill
                  quality={100}
                  unoptimized={true}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="hover:scale-1.05 pointer-events-auto object-cover transition-all duration-700"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 z-10 flex h-full w-[65%] flex-col justify-end p-6 lg:w-[30%] lg:p-12 xl:p-16">
          <div className="pointer-events-none lg:-ml-[30%] lg:w-[130%]">
            {i18n.language === 'ja' && (
              <span className="mb-1 ml-1 block text-[10px] font-bold tracking-[0.3em] text-[#b38e00] lg:mb-2">
                ファリアス　ビクトル
              </span>
            )}
            <h1 className="text-foreground text-3xl leading-[1.1] font-bold tracking-tighter drop-shadow-sm sm:text-4xl lg:text-6xl lg:whitespace-nowrap xl:text-7xl">
              {i18n.language === 'ja' ? 'Farias Victor.' : 'Victor Farias.'}
            </h1>
            <h2 className="text-foreground mt-1 text-xs font-medium whitespace-pre-line sm:text-sm lg:mt-2 lg:mt-4 lg:text-xl">
              {t('hero.role')}
            </h2>
            <div className="text-muted-foreground/80 mt-2 font-mono text-[10px] whitespace-nowrap lowercase lg:mt-4 lg:text-sm">
              <TypewriterText phrases={typewriterPhrases} />
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

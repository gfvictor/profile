import { useState, useRef, useCallback } from 'react'

export function useSlideNavigation(totalSlides: number) {
  const [activeSlide, setActiveSlide] = useState(0)
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  const handleNext = useCallback(() => {
    setActiveSlide((p) => (p < totalSlides - 1 ? p + 1 : p))
  }, [totalSlides])

  const handlePrev = useCallback(() => {
    setActiveSlide((p) => (p > 0 ? p - 1 : p))
  }, [])

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling.current) return
    if (Math.abs(e.deltaY) < 30) return

    isScrolling.current = true
    if (e.deltaY > 0) handleNext()
    else handlePrev()

    setTimeout(() => {
      isScrolling.current = false
    }, 800)
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

    setTimeout(() => {
      isScrolling.current = false
    }, 800)
  }

  return {
    activeSlide,
    setActiveSlide,
    handleNext,
    handlePrev,
    handlers: {
      onWheel: handleWheel,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
  }
}

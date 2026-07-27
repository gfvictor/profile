'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TypewriterTextProps {
  phrases: string[]
}

export function TypewriterText({ phrases }: TypewriterTextProps) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!phrases || phrases.length === 0) return

    const fullText = phrases[index]

    if (!isDeleting && text === fullText) {
      const timer = setTimeout(() => setIsDeleting(true), 3000)
      return () => clearTimeout(timer)
    }

    if (isDeleting && text === '') {
      const timer = setTimeout(() => {
        setIsDeleting(false)
        setIndex((prev) => (prev + 1) % phrases.length)
      }, 500)
      return () => clearTimeout(timer)
    }

    const typingSpeed = isDeleting ? 25 : 60
    const timer = setTimeout(() => {
      setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)))
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index, phrases])

  return (
    <span className="inline-flex items-center">
      <span>{text.length === 0 ? '\u200B' : text}</span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        className="ml-[2px] inline-block h-[1.1em] w-[3px] bg-[#b38e00]"
      />
    </span>
  )
}

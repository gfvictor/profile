'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-8 w-8" />

  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    
    if (!document.startViewTransition) {
      setTheme(newTheme)
      return
    }

    document.startViewTransition(() => {
      setTheme(newTheme)
    })
  }

  return (
    <button
      onClick={handleToggle}
      className="text-foreground hover:text-foreground/80 rounded-full p-2 transition-transform hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5 fill-current" />
      ) : (
        <Moon className="h-5 w-5 fill-current" />
      )}
    </button>
  )
}

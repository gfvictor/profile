"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex flex-col gap-12">
      {/* HEADER */}
      <header className="flex items-center justify-between pb-8 border-b border-border">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Victor Farias</h1>
          <p className="text-muted-foreground">Software Engineer | Aichi, Japan</p>
        </div>
        
        {/* THEME TOGGLE */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
          aria-label="Toggle theme"
        >
          <Sun className="h-5 w-5 dark:hidden" />
          <Moon className="h-5 w-5 hidden dark:block" />
        </button>
      </header>

      {/* CONTENT TEST */}
      <section className="space-y-6">
        <h2 className="text-xl font-semibold">About Me</h2>
        <p className="leading-7 text-muted-foreground">
          this is a temporary test page to validate the global design system. does the text contrast feels comfortable to the eyes? the background transition must be smooth, and the borders subtle. 
        </p>
      </section>

      {/* CARD TEST */}
      <section className="p-6 rounded-lg border border-border bg-muted/30">
        <h3 className="text-lg font-medium mb-2">Tech Stack</h3>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>Next.js & React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS v4</li>
          <li>Framer Motion</li>
        </ul>
      </section>

      {/* BUTTON TEST */}
      <section>
        <button className="px-6 py-3 rounded-md bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
          Let's Work Together
        </button>
      </section>
    </div>
  )
}

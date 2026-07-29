import { ReactNode } from 'react'

interface BuilderOptionProps {
  title: string
  description?: string
  isActive: boolean
  onClick: () => void
  type?: 'radio' | 'checkbox'
}

export function BuilderOption({
  title,
  description,
  isActive,
  onClick,
  type = 'radio',
}: BuilderOptionProps) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full flex-col justify-between border p-2 text-left transition-all lg:p-4 ${
        isActive
          ? 'border-accent bg-accent/10 text-foreground'
          : 'border-border text-muted-foreground hover:border-accent/50'
      }`}
    >
      <div className="flex w-full items-center justify-between">
        <span className="font-mono text-[9px] tracking-wider uppercase lg:text-xs">{title}</span>
        <div
          className={`flex h-3 w-3 items-center justify-center border ${isActive ? 'bg-accent border-accent' : 'border-border'}`}
        >
          {isActive && (
            <div className={`bg-background ${type === 'checkbox' ? 'h-1.5 w-1.5' : 'h-1 w-1'}`} />
          )}
        </div>
      </div>
      {description && (
        <span className="mt-1 font-mono text-[8px] lowercase opacity-80 lg:mt-2 lg:text-[10px]">
          {description}
        </span>
      )}
    </button>
  )
}

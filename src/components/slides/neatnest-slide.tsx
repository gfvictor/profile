'use client'

import { SlantedSlide } from '@/ui'

export function NeatNestSlide() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="min-h-0 w-full flex-1">
        <SlantedSlide
          title="NeatNest"
          stack="NestJS • Prisma • Angular • SCSS"
          description="Um sistema inteligente para gerenciamento e controle de inventário residencial. Engenharia full-stack conectando uma PWA moderna a um backend sólido no Supabase."
          images={[
            'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200',
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200',
            'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200',
          ]}
        />
      </div>
    </div>
  )
}

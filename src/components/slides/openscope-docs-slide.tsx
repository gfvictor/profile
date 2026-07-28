'use client'

import { SlantedSlide } from '@/ui'

export function OpenScopeDocsSlide() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="min-h-0 w-full flex-1">
        <SlantedSlide
          title="OpenScope Docs"
          stack="MDX • Fumadocs • Next.js • TailwindCSS"
          description="Documentação técnica oficial construída com Fumadocs. Arquitetura focada em legibilidade e performance."
          images={[
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
            'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200',
          ]}
        />
      </div>
    </div>
  )
}

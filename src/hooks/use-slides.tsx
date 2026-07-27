import { useTranslation } from 'react-i18next'
import { SlantedSlide } from '@/ui'

export function useSlides() {
  const { t } = useTranslation()

  return [
    {
      id: 'intro',
      title: 'intro',
      content: (
        <div className="flex h-full w-full flex-col items-end justify-center p-6 text-right lg:p-12 lg:pr-12 xl:p-24 xl:pr-24">
          <h3 className="mb-4 text-xs font-bold tracking-widest text-[#b38e00] uppercase">
            {t('about.title')}
          </h3>
          <p className="text-foreground text-lg leading-relaxed lg:text-3xl lg:leading-snug">
            Crafting bespoke micro-systems and enterprise-grade software.
          </p>
        </div>
      ),
    },
    {
      id: 'openscope',
      title: 'openscope',
      content: (
        <div className="flex h-full w-full flex-col">
          <div className="min-h-0 w-full flex-1">
            <SlantedSlide
              title="OpenScope"
              stack="NestJS • DrizzleORM • Next.js • Tailwind"
              description="Plataforma de gerenciamento institucional e landing pages de alta conversão. Desenvolvimento ativo focado em arquitetura limpa e UI/UX imersiva."
              images={[
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200',
                'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200',
                'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200',
              ]}
            />
          </div>
        </div>
      ),
    },
    {
      id: 'neatnest',
      title: 'neatnest',
      content: (
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
      ),
    },
    {
      id: 'core',
      title: 'core',
      content: (
        <div className="flex h-full w-full flex-col items-end justify-center p-6 text-right lg:p-12 lg:pr-12 xl:p-24 xl:pr-24">
          <h3 className="mb-4 text-xs font-bold tracking-widest text-[#b38e00] uppercase">
            the architecture
          </h3>
          <p className="text-foreground text-lg leading-relaxed lg:text-2xl">
            TypeScript, NestJS, Next.js, PostgreSQL. Built entirely on SOLID principles and Clean
            Architecture paradigms.
          </p>
        </div>
      ),
    },
    {
      id: 'genesis',
      title: 'genesis',
      content: (
        <div className="flex h-full w-full flex-col items-end justify-center p-6 text-right lg:p-12 lg:pr-12 xl:p-24 xl:pr-24">
          <h3 className="mb-4 text-xs font-bold tracking-widest text-[#b38e00] uppercase">
            the genesis
          </h3>
          <p className="text-foreground text-lg leading-relaxed lg:text-2xl">
            13 years of relentless Japanese industrial discipline fused into Computer Science. Code
            built to outlast.
          </p>
        </div>
      ),
    },
    {
      id: 'saga',
      title: 'the saga',
      content: (
        <div className="flex h-full w-full flex-col items-end justify-center p-6 text-right lg:p-12 lg:pr-12 xl:p-24 xl:pr-24">
          <h3 className="mb-4 text-xs font-bold tracking-widest text-[#b38e00] uppercase">
            git vol. i & ii
          </h3>
          <p className="text-foreground text-lg leading-relaxed lg:text-2xl">
            Authored a multi-volume deep dive manual on Git fundamentals, built purely in Markdown
            and Lua.
          </p>
        </div>
      ),
    },
    {
      id: 'workflow',
      title: 'workflow',
      content: (
        <div className="flex h-full w-full flex-col items-end justify-center p-6 text-right lg:p-12 lg:pr-12 xl:p-24 xl:pr-24">
          <h3 className="mb-4 text-xs font-bold tracking-widest text-[#b38e00] uppercase">
            engagement
          </h3>
          <p className="text-foreground text-lg leading-relaxed lg:text-2xl">
            Whether you need a bespoke micro-system or an enterprise architecture integration, we
            follow a strict deployment protocol.
          </p>
        </div>
      ),
    },
    {
      id: 'contact',
      title: 'handshake',
      content: (
        <div className="flex h-full w-full flex-col items-end justify-center p-6 text-right lg:p-12 lg:pr-12 xl:p-24 xl:pr-24">
          <h1 className="text-foreground text-5xl font-extrabold tracking-tighter sm:text-6xl lg:text-8xl">
            initiate
            <br />
            handshake.
          </h1>
        </div>
      ),
    },
  ]
}

import { useTranslation } from "react-i18next"
import { SlantedSlide } from "@/ui"

export function useSlides() {
  const { t } = useTranslation()

  return [
    {
      id: "intro",
      content: (
        <div className="w-full h-full flex flex-col justify-center p-6 lg:p-12 xl:p-24">
          <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {t("about.title")}
          </h3>
          <p className="text-lg leading-relaxed text-foreground lg:text-3xl lg:leading-snug">
            {t("about.description")}
          </p>
        </div>
      )
    },
    {
      id: "neatnest",
      content: (
        <div className="h-full w-full flex flex-col">
          <div className="flex-1 min-h-0 w-full">
            <SlantedSlide 
              title="NeatNest"
              stack="NestJS • React • Prisma"
              description="Um sistema inteligente para gerenciamento e controle de inventário residencial. Focado em organização pessoal, o aplicativo permite catalogar itens, categorizar pertences e ter controle total sobre onde as coisas estão."
              images={[
                "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=1200", 
                "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1200", 
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1200"
              ]}
            />
          </div>
        </div>
      )
    },
    {
      id: "rakudash",
      content: (
        <div className="h-full w-full flex flex-col">
          <div className="flex-1 min-h-0 w-full">
            <SlantedSlide 
              title="OpenScope"
              stack="Next.js • Tailwind • DrizzleORM"
              description="Plataforma de gerenciamento institucional e landing pages de alta conversão. A antiga Rakudash LP foi elevada para o ecossistema OpenScope com rebranding completo e arquitetura robusta."
              images={[
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200", 
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200", 
                "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200"
              ]}
            />
          </div>
        </div>
      )
    }
  ]
}

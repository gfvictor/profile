import { useMemo } from 'react'
import {
  IntroSlide,
  CoreSlide,
  OriginSlide,
  WorkflowSlide,
  FeaturedSlide,
  BuilderSlide,
  ContactSlide,
} from '@/slides'

export function useSlides() {
  return useMemo(
    () => [
      {
        id: 'intro',
        title: 'intro',
        content: <IntroSlide />,
      },
      {
        id: 'featured',
        title: 'codifylab',
        content: <FeaturedSlide />,
      },
      {
        id: 'builder',
        title: 'project planner',
        content: <BuilderSlide />,
      },
      {
        id: 'workflow',
        title: 'workflow',
        content: <WorkflowSlide />,
      },
      {
        id: 'origin',
        title: 'origin',
        content: <OriginSlide />,
      },
      {
        id: 'core',
        title: 'core',
        content: <CoreSlide />,
      },
      {
        id: 'contact',
        title: 'contact',
        content: <ContactSlide />,
      },
    ],
    [],
  )
}

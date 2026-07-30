import {
  IntroSlide,
  CoreSlide,
  OriginSlide,
  AcademicsSlide,
  WorkflowSlide,
  NeatNestSlide,
  BuilderSlide,
  ContactSlide,
} from '@/slides'

export function useSlides() {
  return [
    {
      id: 'intro',
      title: 'intro',
      content: <IntroSlide />,
    },
    {
      id: 'origin',
      title: 'origin',
      content: <OriginSlide />,
    },
    {
      id: 'academics',
      title: 'academics',
      content: <AcademicsSlide />,
    },
    {
      id: 'core',
      title: 'core',
      content: <CoreSlide />,
    },
    {
      id: 'neatnest',
      title: 'neatnest',
      content: <NeatNestSlide />,
    },
    {
      id: 'workflow',
      title: 'workflow',
      content: <WorkflowSlide />,
    },
    {
      id: 'builder',
      title: 'plan a project',
      content: <BuilderSlide />,
    },
    {
      id: 'contact',
      title: 'contact',
      content: <ContactSlide />,
    },
  ]
}

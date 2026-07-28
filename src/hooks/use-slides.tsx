import {
  IntroSlide,
  CoreSlide,
  OriginSlide,
  AcademicsSlide,
  WorkflowSlide,
  OpenScopeDocsSlide,
  NeatNestSlide,
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
      id: 'core',
      title: 'core',
      content: <CoreSlide />,
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
      id: 'workflow',
      title: 'workflow',
      content: <WorkflowSlide />,
    },
    {
      id: 'openscope-docs',
      title: 'openscope-docs',
      content: <OpenScopeDocsSlide />,
    },
    {
      id: 'neatnest',
      title: 'neatnest',
      content: <NeatNestSlide />,
    },
    {
      id: 'contact',
      title: 'contact',
      content: <ContactSlide />,
    },
  ]
}

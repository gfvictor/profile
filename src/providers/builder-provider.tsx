'use client'

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  ReactNode,
} from 'react'
import { sendGAEvent } from '@/lib'
import { Plan } from '@/slides'

const BUILDER_STEP_NAMES = ['plan', 'quiz', 'addons', 'scope', 'contact'] as const

interface Addons {
  auth: boolean
  payments: boolean
  seo: boolean
  social: boolean
}

interface Scope {
  objective: string
  colors: string
  hasLogo: boolean
  hasImages: boolean
}

interface Contact {
  name: string
  whatsapp: string
  email: string
  notes: string
  terms: boolean
}

export interface QuizAnswer {
  tier?: Exclude<Plan, null | 'scale'>
  objective?: string
  addons?: { auth?: boolean; payments?: boolean; seo?: boolean }
  forceAdvanced?: boolean
}

export interface QuizState {
  questionIndex: number
  answers: QuizAnswer[]
  showResult: boolean
}

const initialQuizState: QuizState = { questionIndex: 0, answers: [], showResult: false }

export function getPlanObjectives(plan: Plan): string[] {
  return plan === 'basic'
    ? ['Landing Page']
    : plan === 'intermediate'
      ? ['Landing Page', 'Site Institucional', 'Web App', 'Loja Virtual']
      : ['Landing Page', 'Site Institucional', 'Web App', 'Loja Virtual']
}

export function getAvailableObjectives(plan: Plan, addons: Addons): string[] {
  const needsSystem = addons.auth || addons.payments || addons.social

  return getPlanObjectives(plan).filter((obj) => {
    if (obj === 'Landing Page') return !needsSystem
    if (obj === 'Site Institucional') return !addons.social
    if (obj === 'Loja Virtual') return addons.payments
    return true
  })
}

interface BuilderContextType {
  step: number
  setStep: React.Dispatch<React.SetStateAction<number>>
  plan: Plan
  setPlan: React.Dispatch<React.SetStateAction<Plan>>
  addons: Addons
  setAddons: React.Dispatch<React.SetStateAction<Addons>>
  scope: Scope
  setScope: React.Dispatch<React.SetStateAction<Scope>>
  contact: Contact
  setContact: React.Dispatch<React.SetStateAction<Contact>>
  status: 'idle' | 'loading' | 'success'
  setStatus: React.Dispatch<React.SetStateAction<'idle' | 'loading' | 'success'>>
  quiz: QuizState
  setQuiz: React.Dispatch<React.SetStateAction<QuizState>>
  resetQuiz: () => void
  resetBuilder: () => void
  applyQuizRecommendation: (tier: Plan, objective: string, addons: Addons) => void
  quizAccepted: boolean
  setQuizAccepted: React.Dispatch<React.SetStateAction<boolean>>
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState<Plan>(null)
  const [addons, setAddons] = useState<Addons>({
    auth: false,
    payments: false,
    seo: false,
    social: false,
  })
  const [scope, setScope] = useState<Scope>({
    objective: '',
    colors: '',
    hasLogo: true,
    hasImages: true,
  })
  const [contact, setContact] = useState<Contact>({
    name: '',
    whatsapp: '',
    email: '',
    notes: '',
    terms: false,
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [quiz, setQuiz] = useState<QuizState>(initialQuizState)
  const [quizAccepted, setQuizAccepted] = useState(false)
  const resetQuiz = useCallback(() => setQuiz(initialQuizState), [])
  const isFirstStepRender = useRef(true)
  const pendingQuizAddonsRef = useRef<Addons | null>(null)

  const resetBuilder = useCallback(() => {
    setStep(1)
    setPlan(null)
    setAddons({ auth: false, payments: false, seo: false, social: false })
    setScope({
      objective: '',
      colors: '',
      hasLogo: true,
      hasImages: true,
    })
    setQuiz(initialQuizState)
    setQuizAccepted(false)
  }, [])

  const applyQuizRecommendation = useCallback(
    (tier: Plan, objective: string, quizAddons: Addons) => {
      pendingQuizAddonsRef.current = quizAddons
      setPlan(tier)
      setScope((prev) => ({ ...prev, objective }))
    },
    [],
  )

  useEffect(() => {
    if (isFirstStepRender.current) {
      isFirstStepRender.current = false
      return
    }
    sendGAEvent('event', 'builder_step_view', { step_name: BUILDER_STEP_NAMES[step - 1] })
  }, [step])

  useEffect(() => {
    setScope((prev) => {
      if (plan === 'basic' && prev.objective !== 'Landing Page') {
        return { ...prev, objective: 'Landing Page' }
      }
      if (plan === 'intermediate' && !getPlanObjectives(plan).includes(prev.objective)) {
        return { ...prev, objective: 'Site Institucional' }
      }
      return prev
    })

    if (pendingQuizAddonsRef.current) {
      setAddons(pendingQuizAddonsRef.current)
      pendingQuizAddonsRef.current = null
    } else {
      setAddons({ auth: false, payments: false, seo: false, social: false })
    }
  }, [plan])

  useEffect(() => {
    setAddons((prev) => {
      const next = { ...prev }
      if (scope.objective === 'Landing Page') {
        next.auth = false
        next.payments = false
        next.social = false
      }
      if (scope.objective === 'Site Institucional') {
        next.social = false
      }
      if (plan !== 'advanced') {
        next.social = false
      }
      return next
    })
  }, [scope.objective, plan])

  useEffect(() => {
    setScope((prev) => {
      if (prev.objective && !getAvailableObjectives(plan, addons).includes(prev.objective)) {
        return { ...prev, objective: '' }
      }
      return prev
    })
  }, [addons, plan])

  return (
    <BuilderContext.Provider
      value={{
        step,
        setStep,
        plan,
        setPlan,
        addons,
        setAddons,
        scope,
        setScope,
        contact,
        setContact,
        status,
        setStatus,
        quiz,
        setQuiz,
        resetQuiz,
        resetBuilder,
        applyQuizRecommendation,
        quizAccepted,
        setQuizAccepted,
      }}
    >
      {children}
    </BuilderContext.Provider>
  )
}

export function useBuilder() {
  const context = useContext(BuilderContext)
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider')
  }
  return context
}

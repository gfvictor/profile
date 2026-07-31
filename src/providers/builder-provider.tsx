'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Plan } from '@/slides'

interface Addons {
  auth: boolean
  db: boolean
  payments: boolean
  seo: boolean
}

interface Scope {
  objective: string
  customObjective: string
  colors: string
  hasLogo: boolean
  hasImages: boolean
}

interface Contact {
  name: string
  email: string
  notes: string
  terms: boolean
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
}

const BuilderContext = createContext<BuilderContextType | undefined>(undefined)

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState<Plan>(null)
  const [addons, setAddons] = useState<Addons>({
    auth: false,
    db: false,
    payments: false,
    seo: false,
  })
  const [scope, setScope] = useState<Scope>({
    objective: '',
    customObjective: '',
    colors: '',
    hasLogo: true,
    hasImages: true,
  })
  const [contact, setContact] = useState<Contact>({ name: '', email: '', notes: '', terms: false })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  useEffect(() => {
    setScope((prev) => {
      if (plan === 'basic' && prev.objective !== 'Landing Page') {
        return { ...prev, objective: 'Landing Page' }
      }
      if (
        plan === 'intermediate' &&
        !['Landing Page', 'Site Institucional', 'Web App'].includes(prev.objective)
      ) {
        return { ...prev, objective: 'Site Institucional' }
      }
      return prev
    })

    setAddons({ auth: false, db: false, payments: false, seo: false })
  }, [plan])

  useEffect(() => {
    setAddons((prev) => {
      const next = { ...prev }
      const isSimple =
        scope.objective === 'Landing Page' || scope.objective === 'Site Institucional'
      if (isSimple) {
        next.auth = false
        next.db = false
        next.payments = false
      }
      return next
    })
  }, [scope.objective])

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

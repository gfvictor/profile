'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useBuilder, type QuizAnswer } from '@/providers'
import type { Plan } from '@/slides'

type Tier = Exclude<Plan, null | 'scale'>

function QuizOption({
  title,
  description,
  onClick,
}: {
  title: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="border-accent/40 hover:border-accent hover:bg-accent/5 flex w-full flex-col gap-1 border p-3 text-left transition-colors lg:p-4"
    >
      <span className="text-foreground font-mono text-sm tracking-wider uppercase sm:text-base">
        {title}
      </span>
      <span className="text-muted-foreground font-mono text-xs lowercase opacity-80 sm:text-sm">
        {description}
      </span>
    </button>
  )
}

const QUESTIONS: {
  key: 'q1' | 'q2' | 'q3' | 'q4'
  answers: Record<'a' | 'b' | 'c', QuizAnswer>
}[] = [
  {
    key: 'q1',
    answers: {
      a: { tier: 'basic' },
      b: { tier: 'intermediate' },
      c: { tier: 'advanced' },
    },
  },
  {
    key: 'q2',
    answers: {
      a: { tier: 'basic' },
      b: { tier: 'intermediate', addons: { db: true } },
      c: { tier: 'advanced', addons: { auth: true, db: true, payments: true } },
    },
  },
  {
    key: 'q3',
    answers: {
      a: { tier: 'basic' },
      b: { tier: 'intermediate', addons: { seo: true } },
      c: { tier: 'advanced', addons: { seo: true, db: true } },
    },
  },
  {
    key: 'q4',
    answers: {
      a: { objective: 'Site Institucional' },
      b: { objective: 'Web App', addons: { auth: true, db: true } },
      c: { objective: 'Loja Virtual', addons: { auth: true, db: true, payments: true } },
    },
  },
]

export function Step2Quiz() {
  const { t } = useTranslation()
  const { setStep, quiz, setQuiz, resetQuiz, applyQuizRecommendation, scope, setScope } =
    useBuilder()
  const { questionIndex, answers, showResult } = quiz

  const showResultRef = useRef(showResult)
  useEffect(() => {
    showResultRef.current = showResult
  }, [showResult])

  useEffect(() => {
    return () => {
      if (!showResultRef.current) resetQuiz()
    }
  }, [resetQuiz])

  const question = QUESTIONS[questionIndex]

  const handleAnswer = (answer: QuizAnswer) => {
    const nextAnswers = [...answers.slice(0, questionIndex), answer]

    if (questionIndex < QUESTIONS.length - 1) {
      setQuiz({ questionIndex: questionIndex + 1, answers: nextAnswers, showResult: false })
    } else {
      setQuiz({ questionIndex, answers: nextAnswers, showResult: true })
    }
  }

  const goBack = () => {
    if (showResult) {
      setQuiz({ ...quiz, showResult: false })
      return
    }
    if (questionIndex === 0) {
      setStep(1)
      return
    }
    setQuiz({ ...quiz, questionIndex: questionIndex - 1 })
  }

  const computeResult = () => {
    const tierVotes = answers.map((a) => a.tier).filter(Boolean) as Tier[]
    const counts: Record<Tier, number> = { basic: 0, intermediate: 0, advanced: 0 }
    tierVotes.forEach((vote) => counts[vote]++)

    const maxCount = Math.max(counts.basic, counts.intermediate, counts.advanced)
    const leaders = (['basic', 'intermediate', 'advanced'] as Tier[]).filter(
      (candidate) => counts[candidate] === maxCount,
    )
    const tier = leaders.length === 1 ? leaders[0] : tierVotes[0] || 'basic'

    let objective = answers.find((a) => a.objective)?.objective || 'Site Institucional'
    if (tier === 'basic') {
      objective = 'Landing Page'
    } else if (
      tier === 'intermediate' &&
      !['Landing Page', 'Site Institucional', 'Web App'].includes(objective)
    ) {
      objective = 'Site Institucional'
    }

    const rawAddons = answers.reduce(
      (acc, a) => ({
        auth: acc.auth || !!a.addons?.auth,
        db: acc.db || !!a.addons?.db,
        payments: acc.payments || !!a.addons?.payments,
        seo: acc.seo || !!a.addons?.seo,
      }),
      { auth: false, db: false, payments: false, seo: false },
    )
    const isSimple = objective === 'Landing Page' || objective === 'Site Institucional'
    const addons = {
      auth: isSimple ? false : rawAddons.auth,
      db: isSimple ? false : rawAddons.db,
      payments: isSimple ? false : rawAddons.payments && tier !== 'intermediate',
      seo: rawAddons.seo,
    }

    return { tier, objective, addons }
  }

  const acceptRecommendation = () => {
    const { tier, objective, addons } = computeResult()
    applyQuizRecommendation(tier, objective, addons)
    setStep(5)
  }

  const { tier, objective, addons } = computeResult()
  const activeAddons = (['auth', 'db', 'payments', 'seo'] as const).filter((key) => addons[key])

  return (
    <div className="flex h-full flex-col gap-8">
      {!showResult && (
        <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase lg:text-[10px]">
          {t('slides.builder.quiz.progress')} {questionIndex + 1} {t('slides.builder.quiz.of')}{' '}
          {QUESTIONS.length}
        </span>
      )}

      <AnimatePresence mode="wait">
        {showResult ? (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex h-full flex-col items-center justify-center gap-3 text-center"
          >
            <span className="text-muted-foreground font-mono text-[10px] tracking-widest uppercase lg:text-xs">
              {t('slides.builder.quiz.recommendation_title')}
            </span>
            <span className="text-accent font-koho text-3xl lowercase lg:text-4xl">{tier}</span>

            <div className="border-border/60 mt-1 flex flex-col items-center gap-1.5 border-t pt-3">
              <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase lg:text-[10px]">
                {t('slides.builder.quiz.summary_site')}{' '}
                <span className="text-accent">
                  {t(`slides.builder.step2.objectives.${objective}`)}
                </span>
              </span>
              <span className="text-muted-foreground font-mono text-[9px] tracking-widest uppercase lg:text-[10px]">
                {t('slides.builder.quiz.summary_addons')}{' '}
                <span className="text-accent">
                  {activeAddons.length > 0
                    ? activeAddons
                        .map((key) => t(`slides.builder.step3.addons.${key}.title`))
                        .join(', ')
                    : t('slides.builder.quiz.summary_no_addons')}
                </span>
              </span>
            </div>

            <div className="mt-3 flex w-full flex-col gap-2">
              <label className="text-muted-foreground font-mono text-[9px] uppercase lg:text-[10px]">
                {t('slides.builder.step2.colors_label')}
              </label>
              <input
                type="text"
                placeholder={t('slides.builder.step2.colors_placeholder')}
                value={scope.colors}
                onChange={(e) => setScope((prev) => ({ ...prev, colors: e.target.value }))}
                className="border-border bg-background/50 focus:border-accent placeholder:font-koho placeholder:text-muted-foreground/50 w-full border p-2 font-mono text-[10px] transition-colors outline-none placeholder:text-xs placeholder:lowercase lg:p-3 lg:text-xs"
              />
            </div>

            <div className="mt-4 flex flex-col items-center gap-3">
              <button
                onClick={acceptRecommendation}
                className="border-accent text-accent hover:bg-accent hover:text-background border px-6 py-2 font-mono text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {t('slides.builder.quiz.accept')}
              </button>
              <button
                onClick={() => setStep(3)}
                className="border-border text-muted-foreground hover:border-foreground/50 hover:text-foreground border px-6 py-2 font-mono text-[10px] tracking-widest uppercase transition-colors"
              >
                {t('slides.builder.quiz.manual')}
              </button>
            </div>
            <button
              onClick={goBack}
              className="text-muted-foreground/60 hover:text-foreground mt-2 font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t('slides.builder.quiz.back')}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={question.key}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-1 flex-col gap-4"
          >
            <h4 className="font-koho text-foreground text-xl lowercase lg:text-2xl">
              {t(`slides.builder.quiz.${question.key}.title`)}
            </h4>
            <div className="flex flex-col gap-3 lg:gap-4">
              {(['a', 'b', 'c'] as const).map((key) => (
                <QuizOption
                  key={key}
                  title={t(`slides.builder.quiz.${question.key}.${key}.title`)}
                  description={t(`slides.builder.quiz.${question.key}.${key}.desc`)}
                  onClick={() => handleAnswer(question.answers[key])}
                />
              ))}
            </div>

            <button
              onClick={goBack}
              className="text-muted-foreground hover:text-foreground mt-4 self-center font-mono text-xs tracking-widest uppercase transition-colors"
            >
              {t('slides.builder.quiz.back')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

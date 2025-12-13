'use client'

import { useState, useEffect } from 'react'
import { X, ChevronRight, ChevronLeft, Check, Sparkles, BarChart3, Zap, Users } from 'lucide-react'

interface OnboardingStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  image?: string
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 1,
    title: 'Selamat Datang di OASIS BI PRO! 🎉',
    description: 'Platform Business Intelligence AI-powered untuk mengubah data bisnis Anda menjadi revenue. Mari kita mulai dengan tur singkat!',
    icon: <Sparkles className="w-12 h-12 text-purple-600" />
  },
  {
    id: 2,
    title: 'Dashboard Analytics Real-Time',
    description: 'Monitor revenue, traffic, dan konversi bisnis Anda secara real-time dengan visualisasi yang mudah dipahami.',
    icon: <BarChart3 className="w-12 h-12 text-blue-600" />
  },
  {
    id: 3,
    title: 'AI-Powered Insights',
    description: 'Dapatkan rekomendasi cerdas berdasarkan data Anda. AI kami menganalisis pola dan memberikan actionable insights.',
    icon: <Zap className="w-12 h-12 text-yellow-600" />
  },
  {
    id: 4,
    title: 'Kolaborasi Tim',
    description: 'Undang tim Anda, atur role & permissions, dan bekerja bersama dalam satu dashboard terpadu.',
    icon: <Users className="w-12 h-12 text-green-600" />
  },
  {
    id: 5,
    title: 'Siap Memulai! 🚀',
    description: 'Anda sudah siap! Mulai dengan menghubungkan data source pertama Anda atau explore dashboard demo.',
    icon: <Check className="w-12 h-12 text-green-600" />
  }
]

interface OnboardingTourProps {
  onComplete: () => void
  onSkip: () => void
}

export default function OnboardingTour({ onComplete, onSkip }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Fade in animation
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  const step = ONBOARDING_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === ONBOARDING_STEPS.length - 1

  const handleNext = () => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(() => onComplete(), 300)
  }

  const handleSkipNow = () => {
    setIsVisible(false)
    setTimeout(() => onSkip(), 300)
  }

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative transform transition-all duration-300 ${
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleSkipNow}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close onboarding tour"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              {step.icon}
            </div>
          </div>

          {/* Title */}
          <h2
            id="onboarding-title"
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            {step.title}
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
            {step.description}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mb-8" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={ONBOARDING_STEPS.length}>
          {ONBOARDING_STEPS.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentStep
                  ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                  : idx < currentStep
                  ? 'w-2 bg-green-500'
                  : 'w-2 bg-gray-300'
              }`}
              aria-label={`Go to step ${idx + 1}`}
              aria-current={idx === currentStep ? 'step' : undefined}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between gap-4">
          {/* Back button */}
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              isFirstStep
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5" />
            Kembali
          </button>

          {/* Step counter */}
          <span className="text-sm text-gray-500 font-medium">
            {currentStep + 1} / {ONBOARDING_STEPS.length}
          </span>

          {/* Next/Complete button */}
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            aria-label={isLastStep ? 'Complete onboarding' : 'Next step'}
          >
            {isLastStep ? (
              <>
                Mulai Sekarang
                <Check className="w-5 h-5" />
              </>
            ) : (
              <>
                Lanjut
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

        {/* Skip link */}
        {!isLastStep && (
          <div className="text-center mt-6">
            <button
              onClick={handleSkipNow}
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors"
            >
              Lewati tutorial
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export interface AchivementData {
  id: string
  title: string
  description: string
  type: 'loginSequenceValidation'

  icon: string
  color: string

  totalSteps: number
  initialStep: number
  currentStep: number
}

export const useAchievementsStore = defineStore('achievements', () => {
  const items = ref<AchivementData[]>([
    {
      id: 'beginner',
      title: 'Novato',
      icon: 'mdi-calendar-today',
      color: 'primary',
      description: 'Entre pela primeira vez.',

      totalSteps: 1,
      initialStep: 0,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'curious',
      title: 'Curioso',
      icon: 'mdi-calendar-range',
      color: 'primary',
      description: 'Entre por 3 dias seguidos.',

      totalSteps: 3,
      initialStep: 0,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'honorary',
      title: 'Honorário',
      icon: 'mdi-calendar-week',
      color: 'primary',
      description: 'Entre por 7 dias seguidos.',

      totalSteps: 7,
      initialStep: 0,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'hardworking',
      title: 'Esforçado',
      icon: 'mdi-calendar-month',
      color: 'primary',
      description: 'Entre por 30 dias seguidos.',

      totalSteps: 30,
      initialStep: 0,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'immortal',
      title: 'Imortal',
      icon: 'mdi-calendar-check',
      color: 'primary',
      description: 'Entre por 3 meses seguidos.',

      totalSteps: 90,
      initialStep: 0,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'legendary',
      title: 'Lendário',
      icon: 'mdi-calendar-star',
      color: 'secondary',
      description: 'Entre por 1 ano.',

      totalSteps: 365,
      initialStep: 0,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
  ])

  return {
    items,

    setAchievementCurrentStep(id: string, currentStep: number) {
      const arrItem = items.value.find(item => item.id === id)

      if (arrItem) {
        arrItem.currentStep = currentStep
      }
    },

    completeAchievementSteps(id: string) {
      const arrItem = items.value.find(item => item.id === id)

      if (arrItem) {
        arrItem.currentStep = arrItem.totalSteps
      }
    },

    incrementAchievementSteps(id: string) {
      const arrItem = items.value.find(item => item.id === id)

      if (arrItem) {
        arrItem.currentStep++
      }
    },

    resetAchievementSteps(id: string) {
      const arrItem = items.value.find(item => item.id === id)

      if (arrItem) {
        arrItem.currentStep = arrItem.initialStep
      }
    },
  }
})

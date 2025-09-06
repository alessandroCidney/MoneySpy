export interface AchivementData {
  id: string
  title: string
  description: string
  type: 'loginSequenceValidation'

  icon: string
  color: string

  totalSteps: number
  currentStep: number

  nextStepValidation?: (privateProfileData: DatabaseUserPrivateData) => void
}

export const useAchievementsStore = defineStore('achievements', () => {
  const authStore = useAuthStore()

  function loginSequenceValidation() {
    if (!authStore.privateProfileData) {
      throw new Error('Unauthenticated')
    }

    const lastDayOfLoginUnixTime = authStore.privateProfileData.achievements.inProgressPayload.lastDayOfLogin
    const lastDayOfLoginDate = unixTimestampToDate(lastDayOfLoginUnixTime)

    const currentUnixTime = getCurrentUnixTime()
    const currenDate = unixTimestampToDate(currentUnixTime)

    const isDifferenceLessThan24Hours = currentUnixTime - lastDayOfLoginUnixTime < 60 * 60 * 24
    const isSequenceDay = currenDate.getDate() === lastDayOfLoginDate.getDate() + 1
    const isSameDay = currenDate.getDate() === lastDayOfLoginDate.getDate()

    return {
      preserveLoginSequence: isDifferenceLessThan24Hours && (isSameDay || isSequenceDay),
      incrementLoginSequence: isDifferenceLessThan24Hours && isSequenceDay,
    }
  }

  const items = ref<AchivementData[]>([
    {
      id: 'beginner',
      title: 'Novato',
      icon: 'mdi-calendar-today',
      color: 'primary',
      description: 'Entre pela primeira vez.',
      totalSteps: 1,
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

    completeAchievement(id: string) {
      const arrItem = items.value.find(item => item.id === id)

      if (arrItem) {
        arrItem.currentStep = arrItem.totalSteps
      }
    },

    loginSequenceValidation,
  }
})

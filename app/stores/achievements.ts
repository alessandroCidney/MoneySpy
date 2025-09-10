export interface AchivementData {
  id: string
  title: string
  description: string
  type: 'loginSequenceValidation' | 'customValidation'

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
      initialStep: 1,
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
      initialStep: 1,
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
      initialStep: 1,
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
      initialStep: 1,
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
      initialStep: 1,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'legendary',
      title: 'Lendário',
      icon: 'mdi-calendar-star',
      color: 'black',
      description: 'Entre por 1 ano.',

      totalSteps: 365,
      initialStep: 1,
      currentStep: 0,

      type: 'loginSequenceValidation',
    },
    {
      id: 'loving',
      title: 'Amoroso',
      icon: 'mdi-heart',
      color: 'red',
      description: 'Registre uma doação.',

      totalSteps: 1,
      initialStep: 0,
      currentStep: 0,

      type: 'customValidation',
    },
  ])

  const usersCrud = useUsersCrud()
  const authStore = useAuthStore()
  const messagesStore = useMessagesStore()
  const notificationsStore = useNotificationsStore()

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

    async completeAchievement(id: string) {
      try {
        if (!authStore.databaseUser || !authStore.privateProfileData) {
          throw new ApplicationError({
            code: APP_ERROR_CODES.DEFAULT_ERRORS.UNAUTHORIZED,
            status: 401,
            message: 'Usuário não autenticado!',
          })
        }

        const achievementData = items.value.find(item => item.id === id)

        if (!achievementData) {
          throw new ApplicationError({
            code: APP_ERROR_CODES.DEFAULT_ERRORS.BAD_REQUEST,
            status: 500,
            message: 'Conquista não reconhecida pelo sistema',
          })
        }

        const privateProfileData = authStore.privateProfileData

        privateProfileData.achievements.complete.push({
          id,
          completedAt: getCurrentUnixTime(),
        })

        await usersCrud.updatePrivateProfileData(authStore.databaseUser.id, privateProfileData)

        this.completeAchievementSteps(id)

        messagesStore.showInfoMessage({
          text: `Conquista desbloqueada: ${achievementData.title}!`,
        })

        notificationsStore.addNotification({
          icon: achievementData.icon,
          text: `Você desbloqueou a conquista ${achievementData.title}!`,
          to: { name: 'achievements' },
        })
      } catch (err) {
        globalErrorHandler(err)
      }
    },
  }
})

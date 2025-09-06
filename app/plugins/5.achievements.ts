import _ from 'lodash'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()
  const achievementsStore = useAchievementsStore()
  const usersCrud = useUsersCrud()

  if (authStore.privateProfileData && authStore.databaseUser) {
    const newCompletedAchievements: string[] = []

    const profileAchievementsClone = _.cloneDeep(authStore.privateProfileData.achievements)
    const loginSequenceCounter = profileAchievementsClone.inProgressPayload.loginSequenceCounter

    const { preserveLoginSequence, incrementLoginSequence } = achievementsStore.loginSequenceValidation()

    for (const achievementData of achievementsStore.items) {
      // If the achievement has already been completed before, then this will show it as completed and skip loop
      if (profileAchievementsClone.complete.includes(achievementData.id)) {
        achievementsStore.completeAchievement(achievementData.id)
        continue
      }

      // Validations based on loginSequenceValidation
      if (achievementData.type === 'loginSequenceValidation') {
      // Loads the current step
        achievementsStore.setAchievementCurrentStep(
          achievementData.id,
          loginSequenceCounter > achievementData.totalSteps ? achievementData.totalSteps : loginSequenceCounter,
        )

        // If the user logged in yesterday and today, then this will increment the currentStep
        if (incrementLoginSequence && achievementData.currentStep < achievementData.totalSteps) {
          achievementsStore.setAchievementCurrentStep(achievementData.id, achievementData.currentStep + 1)
        }

        // If the user didn't logged in yesterday and today, then this will reset the currentStep and loginSequenceCounter,
        if (!preserveLoginSequence) {
          achievementsStore.setAchievementCurrentStep(achievementData.id, 0)

          profileAchievementsClone.inProgressPayload.loginSequenceCounter = 0
          profileAchievementsClone.inProgressPayload.lastDayOfLogin = getCurrentUnixTime()
        }
      }

      // Checks achievements that have been completed but not yet saved
      if (achievementData.currentStep === achievementData.totalSteps && !profileAchievementsClone.complete.includes(achievementData.id)) {
        newCompletedAchievements.push(achievementData.id)
      }
    }

    // Profile counter should be incremented outside of for loop
    if (incrementLoginSequence) {
      profileAchievementsClone.inProgressPayload.loginSequenceCounter++
      profileAchievementsClone.inProgressPayload.lastDayOfLogin = getCurrentUnixTime()
    }

    profileAchievementsClone.complete = [
      ...profileAchievementsClone.complete,
      ...newCompletedAchievements,
    ]

    const achievementsChanged = !_.isEqual(profileAchievementsClone, authStore.privateProfileData.achievements)

    if (achievementsChanged) {
      await usersCrud.updatePrivateProfileData(authStore.databaseUser.id, {
        ...authStore.privateProfileData,

        achievements: profileAchievementsClone,
      })
    }
  }
})

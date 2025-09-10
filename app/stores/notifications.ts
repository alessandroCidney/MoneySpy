interface AppNotification {
  text: string
  icon: string
  to?: { name: string }
}

interface InternalAppNotification extends AppNotification {
  read: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    items: [] as InternalAppNotification[],

    menuIsOpen: false,
  }),

  getters: {
    unreadNotifications(state) {
      return state.items.filter(item => !item.read)
    },
  },

  actions: {
    addNotification(data: AppNotification) {
      this.items.push({
        ...data,
        read: this.menuIsOpen,
      })
    },

    addAchievementNotification(achievementId: string) {
      const achievementsStore = useAchievementsStore()
      const messagesStore = useMessagesStore()

      const achievementData = achievementsStore.getAchievementData(achievementId)

      if (achievementData) {
        this.addNotification({
          text: `Você desbloqueou a conquista ${achievementData.title}! Clique para ver.`,
          icon: achievementData.icon,
          to: { name: 'achievements' },
        })

        messagesStore.showAchievementMessage(achievementId)
      }
    },

    markAllAsRead() {
      this.items = this.items.map(item => ({
        ...item,
        read: true,
      }))
    },

    setMenuIsOpen(bool: boolean) {
      if (bool) {
        this.markAllAsRead()
      }

      this.menuIsOpen = bool
    },
  },
})

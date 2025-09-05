interface AppMessage {
  active: boolean

  text: string
  icon: string
  color: string

  timeout: number
  multiline: boolean

  action?: () => void | Promise<void>
}

const defaultMessage: AppMessage = {
  active: false,
  text: '',
  icon: 'mdi-success',
  color: 'success',
  timeout: 4000,
  multiline: true,
  action: undefined,
}

export const useMessageStore = defineStore('message', {
  state: () => ({
    messageData: defaultMessage,
  }),

  actions: {
    setMessageData(messageData: AppMessage) {
      this.messageData = messageData
    },

    showMessage(messageData: Partial<AppMessage>) {
      this.setMessageData({
        ...defaultMessage,
        ...messageData,

        active: true,
      })
    },

    setMessageActive(active: boolean) {
      this.setMessageData({
        ...this.messageData,

        active,
      })
    },

    showSuccessMessage(messageData: Partial<AppMessage>) {
      this.showMessage({
        ...messageData,

        icon: 'mdi-check-circle',
        color: 'success',
      })
    },

    showErrorMessage(messageData: Partial<AppMessage>) {
      this.showMessage({
        ...messageData,

        icon: 'mdi-alert-circle',
        color: 'error',
      })
    },

    callAction() {
      this.setMessageActive(false)

      this.messageData.action?.()
    },
  },
})

export const useSidebarsStore = defineStore('sidebars', {
  state: () => ({
    defaultSidebarIsOpen: true,
  }),

  actions: {
    setDefaultSidebarIsOpen(data: typeof this.defaultSidebarIsOpen) {
      this.defaultSidebarIsOpen = data
    },

    toggleDefaultSidebarIsOpen() {
      this.setDefaultSidebarIsOpen(!this.defaultSidebarIsOpen)
    },
  },
})

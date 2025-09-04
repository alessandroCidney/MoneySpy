export const useExpensesStore = defineStore('expenses', {
  state: () => ({
    items: [] as DatabaseExpense[],

    loadingList: false,
    loadedOnce: false,

    loadingCreate: false,
    loadingUpdate: false,
    loadingRemove: false,

    selectedCurrency: 'R$',
  }),

  actions: {
    async list() {
      try {
        const expensesCrud = useExpensesCrud()

        this.items = await expensesCrud.list()
        this.loadedOnce = true
      } catch (err) {
        globalErrorHandler(err)
      }
    },

    async create(...rest: Parameters<Awaited<ReturnType<typeof useExpensesCrud>>['create']>) {
      try {
        this.loadingCreate = true

        const expensesCrud = useExpensesCrud()

        const itemObj = await expensesCrud.create(...rest)

        this.items.push(itemObj)

        return itemObj
      } catch (err) {
        globalErrorHandler(err)
      } finally {
        this.loadingCreate = false
      }
    },

    async update(...rest: Parameters<Awaited<ReturnType<typeof useExpensesCrud>>['update']>) {
      try {
        this.loadingUpdate = true

        const expensesCrud = useExpensesCrud()

        const itemObj = await expensesCrud.update(...rest)

        const itemIndex = this.items.findIndex(item => item.id === itemObj.id)

        if (itemIndex === -1) {
          this.items.push(itemObj)
        } else {
          this.items[itemIndex] = itemObj
        }

        return itemObj
      } catch (err) {
        globalErrorHandler(err)
      } finally {
        this.loadingUpdate = false
      }
    },

    async remove(id: string) {
      try {
        const expensesCrud = useExpensesCrud()

        await expensesCrud.remove(id)

        const itemIndex = this.items.findIndex(item => item.id === id)

        this.items.splice(itemIndex, 1)
      } catch (err) {
        globalErrorHandler(err)
      }
    },
  },
})

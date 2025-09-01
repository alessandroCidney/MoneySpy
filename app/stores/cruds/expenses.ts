export const useExpensesStore = defineStore('expenses', {
  state: () => ({
    items: [] as DatabaseExpense[],

    loadingList: false,
    loadedOnce: false,

    loadingCreate: false,
    loadingRemove: false,

    selectedCurrency: 'R$',
  }),

  actions: {
    async list() {
      try {
        console.log('expenses list')
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

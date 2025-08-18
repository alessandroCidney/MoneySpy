export function useLocalCrud<T extends DatabaseObject>(firestoreCrud: ReturnType<typeof useFirestoreCrud<T>>) {
  const itemsArr = ref<T[]>([]) as Ref<T[]>

  return {
    ...firestoreCrud,

    itemsArr,

    async list(...rest: Parameters<typeof firestoreCrud.list>) {
      try {
        itemsArr.value = await firestoreCrud.list(...rest)
      } catch (err) {
        globalErrorHandler(err)
      }
    },

    async create(...rest: Parameters<typeof firestoreCrud.create>) {
      try {
        const itemObj = await firestoreCrud.create(...rest)

        itemsArr.value.push(itemObj)

        return itemObj
      } catch (err) {
        globalErrorHandler(err)
      }
    },

    async remove(id: string) {
      try {
        await firestoreCrud.remove(id)

        const itemIndex = itemsArr.value.findIndex(item => item.id === id)

        itemsArr.value.splice(itemIndex, 1)
      } catch (err) {
        globalErrorHandler(err)
      }
    },
  }
}

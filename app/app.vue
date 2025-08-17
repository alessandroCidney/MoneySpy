<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const expensesCrud = useExpensesCrud()

const expensesArr = ref<BaseObject[]>([])

async function listExpenses() {
  try {
    expensesArr.value = await expensesCrud.list()
  } catch (err) {
    globalErrorHandler(err)
  }
}

async function createExpense() {
  const response = await expensesCrud.create({
    name: 'teste',
    currency: 'R$',
    type: 'mercado',
    value: 10,
  })

  expensesArr.value.push(response)
}

async function removeExpense(id: string) {
  await expensesCrud.remove(id)

  const arrIndex = expensesArr.value.findIndex(item => item.id === id)

  expensesArr.value.splice(arrIndex, 1)
}

onMounted(() => {
  // listExpenses()
})
</script>

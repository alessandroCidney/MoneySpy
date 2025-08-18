<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="expenseData in expensesCrud.itemsArr.value"
        :key="expenseData.id"
        :title="expenseData.name"
      />
    </v-list>

    <v-form @submit.prevent="handleSaveExpense">
      <v-text-field
        v-model="newExpensePayload.name"
        label="Nome da despesa"
      />

      <v-text-field
        v-model="newExpensePayload.value"
        label="Valor da despesa"
      />

      <v-combobox
        v-model="newExpensePayload.type"
        label="Tipo da despesa"
        :items="['Mercado', 'Conta', 'Delivery', 'Doação', 'Compra']"
      />

      <v-btn
        color="primary"
        type="submit"
      >
        Salvar
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
const expensesCrud = useLocalCrud(useExpensesCrud())

const newExpensePayload = ref<PartialDatabaseObject<DatabaseExpense>>({
  name: '',
  type: '',
  value: 0,
  currency: 'R$',
})

async function handleSaveExpense() {
  try {
    await expensesCrud.create(newExpensePayload.value)
  } catch (err) {
    globalErrorHandler(err)
  }
}

onMounted(() => {
  expensesCrud.list()
})
</script>

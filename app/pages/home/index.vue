<template>
  <v-container
    v-bind="$attrs"
    class="px-10"
    tag="section"
  >
    <h2>
      Valores da semana
    </h2>

    <charts-expenses-bars
      :expenses="fakeExpensesArr"
      height="500px"
    />

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

  <aside class="homePageAside pa-4 fill-height">
    <v-list>
      <v-list-item
        v-for="expenseData in fakeExpensesArr"
        :key="expenseData.id"
        class="mb-4"
      >
        <template #prepend>
          <v-icon>
            {{ expenseData.icon }}
          </v-icon>
        </template>

        <v-list-item-title>
          {{ expenseData.type }}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{ expenseData.currency }}{{ expenseData.value }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </aside>
</template>

<script setup lang="ts">
import _ from 'lodash'

const authStore = useAuthStore()

if (!authStore.databaseUser) {
  throw new Error('Unauthenticated')
}

const fakeExpensesArr = generateFakeExpensesArr().map((item) => {
  const expenseType = expenseTypes.find(typeData => typeData.name === item.type)

  return ({
    ...item,
    icon: expenseType?.icon,
  })
})

const expensesCrud = useLocalCrud(useExpensesCrud({ userId: authStore.databaseUser.id }))

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
  // expensesCrud.list()
})
</script>

<style lang="scss" scoped>
.homePageAside {
  width: 30%;
}
</style>

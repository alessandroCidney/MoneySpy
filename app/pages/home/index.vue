<template>
  <div class="bg-gray-background ultraRounded pa-8 my-2 mx-4 position-relative">
    <h1 class="mb-4">
      Resumo Geral
    </h1>

    <div class="d-flex align-start ga-6 justify-center w-100">
      <section class="homePageSection bg-white ultraRounded pa-8">
        <h2>
          Como foi a sua semana:
        </h2>

        <charts-expenses-bars
          :expenses="fakeExpensesArr"
          height="500px"
        />
      </section>

      <section class="homePageAside bg-white ultraRounded pa-8">
        <h2 class="mb-4">
          Movimentações recentes
        </h2>

        <v-list class="pa-0">
          <v-list-item
            v-for="expenseData in fakeExpensesArr"
            :key="expenseData.id"
            :class="{
              'py-5 px-0': true,
            }"
          >
            <template #prepend>
              <v-avatar color="black">
                <v-icon>
                  {{ expenseData.icon }}
                </v-icon>
              </v-avatar>
            </template>

            <v-list-item-title>
              {{ expenseData.type }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ formatExpenseDate(expenseData.createdAt) }}
            </v-list-item-subtitle>

            <template #append>
              <div>
                {{ expenseData.currency }}{{ Math.abs(expenseData.value).toFixed(2) }}
              </div>
            </template>
          </v-list-item>
        </v-list>
      </section>
    </div>

    <div class="position-absolute top-0 right-0 pa-8">
      <v-btn
        color="primary"
        size="large"
        rounded
        flat
      >
        <v-icon start>
          mdi-plus-circle
        </v-icon>

        Adicionar
      </v-btn>
    </div>
  </div>
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

function formatExpenseDate(unixTime: number) {
  const formatter = new Intl.DateTimeFormat('pt', {
    hour12: true,
    day: 'numeric',
    month: 'long',
    year: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return formatter.format(unixTimestampToDate(unixTime))
}

onMounted(() => {
  // expensesCrud.list()
})
</script>

<style lang="scss" scoped>
.homePageSection {
  flex: 1 1 0;
}

.homePageAside {
  height: 100%;

  width: 35%;

  max-width: 450px;

  .v-list {
    // Item height = 80px
    min-height: 800px;
  }
}
</style>

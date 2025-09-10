<template>
  <div
    v-if="expensesStore.loadingList"
    class="defaultPageContainer d-flex align-center justify-center"
  >
    <v-progress-circular
      color="primary"
      size="250"
      width="10"
      indeterminate
    />
  </div>

  <div
    v-else
    class="defaultPageContainer"
  >
    <h1 class="mb-4">
      Resumo Geral
    </h1>

    <div class="homePageGrid w-100">
      <section class="expensesBars defaultWhiteCard">
        <h2>
          Como foi a sua semana:
        </h2>

        <charts-expenses-bars
          :expenses="filterByTheLastSevenDays(expensesStore.items)"
          height="500px"
        />
      </section>

      <section class="expensesPie defaultWhiteCard">
        <h2>
          Entradas e saídas
        </h2>

        <charts-expenses-pie
          :expenses="filterByTheLastSevenDays(expensesStore.items)"
          width="400px"
          height="400px"
          class="mx-auto"
        />
      </section>

      <section class="mainExpenses defaultWhiteCard">
        <h2>
          Principais despesas
        </h2>

        <v-list bg-color="card">
          <v-list-item
            v-for="expenseData in expensesByType"
            :key="expenseData.type"
            :class="{
              'py-5 px-0': true,
            }"
          >
            <template #prepend>
              <v-avatar
                :color="'black'"
              >
                <v-icon>
                  {{ expenseData.icon }}
                </v-icon>
              </v-avatar>
            </template>

            <v-list-item-title>
              {{ expenseData.type }}
            </v-list-item-title>

            <template #append>
              <div>
                {{ expenseData.currency }}{{ Math.abs(expenseData.value).toFixed(2) }}
              </div>
            </template>
          </v-list-item>
        </v-list>
      </section>

      <section class="latestExpenses defaultWhiteCard">
        <h2 class="mb-4">
          Movimentações recentes
        </h2>

        <v-list
          bg-color="card"
          class="pa-0"
        >
          <v-list-item
            v-for="expenseData in filterByTheLastSevenDays(expensesStore.items)"
            :key="expenseData.id"
            :class="{
              'py-5 px-0': true,
            }"
          >
            <template #prepend>
              <v-avatar
                :color="expenseData.value > 0 ? 'primary' : 'secondary'"
              >
                <v-icon>
                  {{ getExpenseTypeData(expenseData.type)?.icon }}
                </v-icon>
              </v-avatar>
            </template>

            <v-list-item-title>
              {{ expenseData.type }}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ dateToLargeStr(expenseData.createdAt) }}
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
        @click="$router.push({
          path: '/expenses',
          query: { autofocus: 'true' },
        })"
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
import { useExpensesStore } from '~/stores/cruds/expenses'

definePageMeta({
  middleware: 'authenticated',
})

const authStore = useAuthStore()

if (!authStore.databaseUser) {
  throw new Error('Unauthenticated')
}

const expensesStore = useExpensesStore()

const expensesByType = computed(() => {
  interface ExpenseTypeData {
    type: string
    value: number
    icon: string
    currency: string
  }

  const expenseTypesData: ExpenseTypeData[] = []

  for (const expenseData of filterByTheLastSevenDays(expensesStore.items)) {
    if (expenseData.value < 0) {
      const expenseTypeDataItem = expenseTypesData.find(item => item.type === expenseData.type)

      if (expenseTypeDataItem) {
        expenseTypeDataItem.value += Math.abs(expenseData.value)
      } else {
        const expenseType = expenseTypes.find(typeData => typeData.name === expenseData.type)

        expenseTypesData.push({
          type: expenseData.type,
          value: Math.abs(expenseData.value),
          icon: expenseType?.icon || '',
          currency: 'R$',
        })
      }
    }
  }

  return expenseTypesData
})
</script>

<style lang="scss" scoped>
.homePageSection {
  flex: 1 1 0;
}

// .homePageAside {
//   height: 100%;

//   width: 35%;

//   max-width: 450px;

//   .v-list {
//     // Item height = 80px
//     min-height: 800px;
//   }
// }

.homePageGrid {
  display: grid;

  height: 1200px;
  width: 100%;

  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  grid-template-areas:
    "expensesBars expensesBars latestExpenses"
    "expensesPie mainExpenses latestExpenses";

  gap: 24px;

  .expensesBars {
    grid-area: expensesBars;
    // grid-row: 1 / 2;
    // grid-column: 1 / 3;
  }

  .mainExpenses {
    grid-area: mainExpenses;
  }

  .expensesPie {
    grid-area: expensesPie;
    // grid-row: 2 / 3;
    // grid-column: 1 / 2;
  }

  .latestExpenses {
    grid-area: latestExpenses;
    // grid-row: 1 / 3;
    // grid-column: 3 / 4;
  }
}

@media(max-width: 1280px) {
  .homePageGrid {
    height: auto;

    grid-template-areas:
      "expensesBars expensesBars expensesBars"
      "expensesPie expensesPie expensesPie"
      "mainExpenses mainExpenses mainExpenses"
      "latestExpenses latestExpenses latestExpenses";
  }
}
</style>

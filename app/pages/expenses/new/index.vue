<template>
  <div class="bg-gray-background ultraRounded pa-8 my-2 mx-4 position-relative">
    <h1 class="mb-4">
      Novo registro
    </h1>

    <section class="mb-8">
      <v-btn-toggle
        v-model="selectedMode"
        :color="selectedMode === 'expense' ? 'secondary' : 'primary'"
        class="mb-4 ultraRounded"
      >
        <v-btn
          value="expense"
          size="large"
        >
          <v-icon start>
            mdi-minus-circle
          </v-icon>

          Despesa
        </v-btn>

        <v-btn
          value="income"
          size="large"
        >
          <v-icon start>
            mdi-plus-circle
          </v-icon>

          Entrada
        </v-btn>
      </v-btn-toggle>

      <v-form class="d-flex align-center justify-start ga-4">
        <div class="bg-white giantInput d-flex align-center justify-start px-6">
          <div>R$</div>

          <v-text-field
            :value="0"
            variant="solo"
            type="number"
            class="mr-6"
            hide-details
            rounded
            flat
          />
        </div>

        <div class="bg-white giantInput d-flex align-center justify-start px-6">
          <v-combobox
            :items="expenseTypes"
            item-title="name"
            item-value="id"
            placeholder="Tipo"
            variant="solo"
            class="mr-6"
            hide-details
            rounded
            flat
          />
        </div>

        <v-btn
          :color="selectedMode === 'expense' ? 'secondary' : 'primary'"
          size="70"
          icon
        >
          <v-icon
            size="50"
          >
            mdi-plus
          </v-icon>
        </v-btn>
      </v-form>
    </section>

    <section class="bg-white pa-8 ultraRounded">
      <h2>Registros anteriores</h2>

      <v-data-table
        :items="fakeExpensesArr"
        :headers="expenseTableHeaders"
        class="expensesTable"
      >
        <template #[`item.type`]="{ item: expenseData }">
          <v-avatar
            :color="expenseData.value > 0 ? 'primary' : 'secondary'"
            class="mr-3"
          >
            <v-icon>
              {{ getExpenseTypeData(expenseData.type)?.icon }}
            </v-icon>
          </v-avatar>

          <span class="font-weight-medium">
            {{ expenseData.type }}
          </span>
        </template>

        <template #[`item.createdAt`]="{ item: expenseData }">
          {{ dateToLargeStr(expenseData.createdAt) }}
        </template>

        <template #[`item.value`]="{ item: expenseData }">
          {{ expenseData.currency }} {{ Math.abs(expenseData.value).toFixed(2) }}
        </template>

        <template #[`item.actions`]="{ item: expenseData }">
          <v-btn
            icon="mdi-pencil"
            color="secondary"
            variant="text"
            class="mr-2"
            flat
          />

          <v-btn
            icon="mdi-delete"
            color="secondary"
            variant="text"
            flat
          />
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { VDataTable } from 'vuetify/components'

type ReadonlyHeaders = VDataTable['$props']['headers']

const selectedMode = ref<'expense' | 'income'>('expense')

const expenseTableHeaders: ReadonlyHeaders = [
  {
    key: 'type',
    title: 'Tipo',
    align: 'start',
  },
  {
    key: 'value',
    title: 'Valor',
    align: 'start',
  },
  {
    key: 'createdAt',
    title: 'Data',
    align: 'start',
  },
  {
    key: 'actions',
    title: 'Ações',
    align: 'center',
  },
]

const fakeExpensesArr = ref(generateFakeExpensesArr())
</script>

<style lang="scss">
.giantInput {
  border-radius: 300px;
  overflow: hidden;

  height: 70px;
  min-width: 400px;

  * {
    font-size: 2rem !important;
  }
}

.expensesTable {
  * {
    font-size: 1rem;
  }

  tr {
    height: 70px;

    &:nth-child(2n) {
      background-color: #f9f9f9;
    }

    td {
      border-bottom: 0 !important;
    }
  }
}
</style>

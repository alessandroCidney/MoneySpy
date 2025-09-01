<template>
  <div class="defaultPageContainer">
    <h1 class="mb-4 onlyForScreenReader">
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

          Nova Despesa
        </v-btn>

        <v-btn
          value="income"
          size="large"
        >
          <v-icon start>
            mdi-plus-circle
          </v-icon>

          Nova Entrada
        </v-btn>
      </v-btn-toggle>

      <v-form
        v-model="createExpenseFormIsValid"
        class="d-flex align-center justify-start ga-4"
        @submit.prevent="handleSaveExpense"
      >
        <div
          :class="{
            'bg-white giantInput d-flex align-center justify-start px-6': true,
            'isFocused': valueFieldIsFocused,
          }"
        >
          <div>R$</div>

          <v-text-field
            v-model="createExpenseFormPayload.value"
            v-model:focused="valueFieldIsFocused"
            :rules="[formRules.requiredNumber]"
            :autofocus="$route.query.autofocus === 'true'"
            variant="solo"
            type="number"
            hide-details
            rounded
            flat
          />
        </div>

        <div
          :class="{
            'bg-white giantInput d-flex align-center justify-start px-6': true,
            'isFocused': typeFieldIsFocused,
          }"
        >
          <v-combobox
            v-model="createExpenseFormPayload.type"
            v-model:focused="typeFieldIsFocused"
            :rules="[formRules.requiredString]"
            :items="expenseTypes"
            item-title="name"
            item-value="name"
            placeholder="Tipo"
            variant="solo"
            hide-details
            rounded
            flat
          />
        </div>

        <v-btn
          :color="selectedMode === 'expense' ? 'secondary' : 'primary'"
          type="submit"
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

const formRules = useRules()

const valueFieldIsFocused = ref(false)
const typeFieldIsFocused = ref(false)

type ReadonlyHeaders = VDataTable['$props']['headers']

const createExpenseFormIsValid = ref(false)

const createExpenseFormPayload = ref({
  value: 0,
  type: '',
})

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
    sortable: false,
  },
]

const fakeExpensesArr = ref(generateFakeExpensesArr())

function handleSaveExpense() {
  window.alert('test')
}
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

  &.isFocused {
    outline: 3px solid rgb(var(--v-theme-secondary));
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

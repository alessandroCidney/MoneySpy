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
        ref="createExpenseForm"
        v-model="createExpenseFormIsValid"
        class="d-flex align-center justify-start ga-4"
        @submit.prevent="handleCreateExpense"
      >
        <div
          :class="{
            'bg-card giantInput d-flex align-center justify-start px-6': true,
            'isFocused': valueFieldIsFocused,
          }"
        >
          <div>R$</div>

          <v-text-field
            v-model="createExpenseFormPayload.value"
            v-model:focused="valueFieldIsFocused"
            :rules="[formRules.requiredNumber]"
            :autofocus="$route.query.autofocus === 'true'"
            :disabled="expensesStore.loadingCreate"
            bg-color="card"
            variant="solo"
            type="number"
            lang="pt"
            step="0.05"
            hide-details
            rounded
            flat
          />
        </div>

        <div
          :class="{
            'bg-card giantInput d-flex align-center justify-start px-6': true,
            'isFocused': typeFieldIsFocused,
          }"
        >
          <v-combobox
            v-model="createExpenseFormPayload.type"
            v-model:focused="typeFieldIsFocused"
            :rules="[formRules.requiredString]"
            :items="expenseTypes.filter(item => item.type === selectedMode).map(item => item.name)"
            :disabled="expensesStore.loadingCreate"
            bg-color="card"
            placeholder="Tipo"
            variant="solo"
            hide-details
            rounded
            flat
          />
        </div>

        <v-btn
          :color="selectedMode === 'expense' ? 'secondary' : 'primary'"
          :loading="expensesStore.loadingCreate"
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

    <section class="bg-card pa-8 ultraRounded">
      <h2>Registros anteriores</h2>

      <v-data-table
        :items="expensesStore.items"
        :headers="expenseTableHeaders"
        class="expensesTable bg-card"
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
          <commons-form-dialog
            :base-payload="expenseData"
            :confirm="(finalPayload) => expensesStore.update(finalPayload as DatabaseExpense)"
          >
            <template #title>
              Editar registro
            </template>

            <template #text>
              <p class="mb-4">
                Atualize as informações do seu registro!
              </p>
            </template>

            <template #form="{ internalPayload }">
              <v-text-field
                v-model="internalPayload.value"
                :rules="[formRules.requiredNumber]"
                label="Valor"
                type="number"
              />

              <v-combobox
                v-model="internalPayload.type"
                :rules="[formRules.requiredString]"
                :items="expenseTypes.map(item => item.name)"
                label="Tipo"
              />
            </template>

            <template #activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                icon="mdi-pencil"
                color="secondary"
                variant="text"
                class="mr-2"
                flat
              />
            </template>
          </commons-form-dialog>

          <commons-confirm-dialog
            :confirm="() => expensesStore.remove(expenseData.id)"
          >
            <template #title>
              Excluir registro
            </template>

            <template #text>
              <p>
                O registro será excluído e não poderá ser recuperado. Deseja continuar?
              </p>
            </template>

            <template #activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                icon="mdi-delete"
                color="secondary"
                variant="text"
                flat
              />
            </template>
          </commons-confirm-dialog>
        </template>
      </v-data-table>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { VDataTable } from 'vuetify/components'

import { useExpensesStore } from '@/stores/cruds/expenses'

definePageMeta({
  middleware: 'authenticated',
})

const expensesStore = useExpensesStore()
const messageStore = useMessagesStore()

const formRules = useRules()

const createExpenseForm = useTemplateRef('createExpenseForm')
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

async function handleCreateExpense() {
  const validationResult = await createExpenseForm.value?.validate()

  if (validationResult?.valid) {
    await expensesStore.create({
      value: selectedMode.value === 'expense' ? createExpenseFormPayload.value.value * -1 : createExpenseFormPayload.value.value,
      type: createExpenseFormPayload.value.type,
      currency: expensesStore.selectedCurrency,
      name: '',
    })
  } else {
    messageStore.showErrorMessage({ text: 'Dados inválidos!' })
  }
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
  *:not(i) {
    font-size: 1rem;
  }

  tr {
    height: 70px;

    &:nth-child(2n) {
      background-color: rgb(var(--v-theme-container));
    }

    td {
      border-bottom: 0 !important;
    }
  }
}
</style>

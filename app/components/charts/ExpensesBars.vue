<template>
  <v-chart
    class="chart"
    :option="option"
    autoresize
  />
</template>

<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, type BarSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

import _ from 'lodash'

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

const props = defineProps({
  height: { type: String, required: true },
  expenses: { type: Array as PropType<DatabaseExpense[]>, required: true },
})

const expensesPerDay = computed(() => {
  const registeredDays: {
    date: number
    positive: DatabaseExpense[]
    negative: DatabaseExpense[]
  }[] = []

  for (const expenseData of props.expenses) {
    const registeredDayData = registeredDays.find(registeredDay => registeredDay.date === expenseData.createdAt)

    const group = expenseData.value > 0 ? 'positive' : 'negative'

    if (registeredDayData) {
      registeredDayData[group].push(expenseData)
    } else {
      const newDayData: typeof registeredDays[0] = {
        date: expenseData.createdAt,
        positive: [],
        negative: [],
      }

      newDayData[group].push(expenseData)
      registeredDays.push(newDayData)
    }
  }

  return registeredDays
})

const optionData = computed(() => ({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      data: expensesPerDay.value.map(item => _.sum(item.positive.map(expenseData => expenseData.value))),
      type: 'bar',

      name: 'positive',

      barMaxWidth: '15px',
      itemStyle: {
        color: '#48EAA4',
        borderRadius: [
          50,
          50,
          0,
          0,
        ],
      },
    },
    {
      data: expensesPerDay.value.map(item => Math.abs(_.sum(item.negative.map(expenseData => expenseData.value)))),
      type: 'bar',

      name: 'negative',
      z: 2,

      barMaxWidth: '15px',
      itemStyle: {
        color: '#000000',
        borderRadius: [
          50,
          50,
          0,
          0,
        ],
      },
    },
  ] as BarSeriesOption,
}))

console.log('optionData', optionData.value)

const option = ref(optionData.value)
</script>

<style scoped lang="scss">
.chart {
  height: v-bind(height);
}
</style>

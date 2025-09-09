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
import { useTheme } from 'vuetify'

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
  const lastSevenDaysExpenses = props.expenses

  const allDays = getLastSevenDays().map(dayName => ({
    dayName,
    positive: [] as DatabaseExpense[],
    negative: [] as DatabaseExpense[],
  }))

  for (const expenseData of lastSevenDaysExpenses) {
    const registeredDayData = allDays.find(registeredDay => registeredDay.dayName === getDayName(expenseData.createdAt))

    const group = expenseData.value > 0 ? 'positive' : 'negative'

    if (registeredDayData) {
      registeredDayData[group].push(expenseData)
    }
  }

  return allDays
})

const vuetifyTheme = useTheme()

const optionData = computed(() => ({
  textStyle: {
    fontFamily: 'Roboto',
  },

  xAxis: {
    type: 'category',
    data: getLastSevenDays(),

    axisTick: { show: false },
    axisLine: {
      lineStyle: {
        color: '#',
      },
    },
  },
  yAxis: {
    type: 'value',

    splitLine: {
      lineStyle: {
        color: '#eee',
      },
    },

    axisLabel: {
      formatter: (value: number) => {
        return formatNumberToSmallStr(value)
      },
    },
  },
  grid: {
    left: '10px',
    right: '10px',
    top: '32px',
    bottom: '0',
    containLabel: true,
  },
  series: [
    {
      data: expensesPerDay.value.map(item => _.sum(item.positive.map(expenseData => expenseData.value))),
      type: 'bar',

      name: 'positive',

      barMaxWidth: '40px',
      itemStyle: {
        color: vuetifyTheme.current.value.colors.primary,
        borderRadius: [
          50,
          50,
          50,
          50,
        ],
      },
    },
    {
      data: expensesPerDay.value.map(item => Math.abs(_.sum(item.negative.map(expenseData => expenseData.value)))),
      type: 'bar',

      name: 'negative',
      z: 2,

      barMaxWidth: '40px',
      itemStyle: {
        color: vuetifyTheme.current.value.colors.secondary,
        borderRadius: [
          50,
          50,
          50,
          50,
        ],
      },
    },
  ] as BarSeriesOption,
}))

const option = ref(optionData.value)
</script>

<style scoped lang="scss">
.chart {
  height: v-bind(height);
}
</style>

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
  textStyle: {
    fontFamily: 'Roboto',
  },

  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

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

      // label: {
      //   show: true,
      //   position: 'top',

      //   formatter(params: BarsLabelFormatterParams) {
      //     return params.value === 0 ? '' : formatNumberToSmallStr(params.value)
      //   },

      //   fontWeight: '600',
      //   fontSize: '1rem',
      // },

      barMaxWidth: '40px',
      itemStyle: {
        color: '#48EAA4',
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

      // label: {
      //   show: true,
      //   position: 'top',

      //   formatter(params: BarsLabelFormatterParams) {
      //     return params.value === 0 ? '' : formatNumberToSmallStr(params.value)
      //   },

      //   fontWeight: '600',
      //   fontSize: '1rem',
      // },

      barMaxWidth: '40px',
      itemStyle: {
        color: '#000000',
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

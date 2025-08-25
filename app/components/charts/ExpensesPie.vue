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
import { PieChart, type PieSeriesOption } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

import { useTheme } from 'vuetify'
import _ from 'lodash'

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
])

const props = defineProps({
  width: { type: String, required: true },
  height: { type: String, required: true },
  expenses: { type: Array as PropType<DatabaseExpense[]>, required: true },
})

const chartData = computed(() => {
  const summary = {
    positive: 0,
    negative: 0,
  }

  for (const expenseData of props.expenses) {
    if (expenseData.value > 0) {
      summary.positive += expenseData.value
    } else {
      summary.negative += Math.abs(expenseData.value)
    }
  }

  return summary
})

const vuetifyTheme = useTheme()

const optionData = computed(() => ({
  tooltip: {
    trigger: 'item',
  },
  legend: {
    bottom: '5%',
    left: 'center',
  },
  series: [
    {
      name: 'Entradas e Saídas',
      color: [vuetifyTheme.computedThemes.value.customTheme?.colors.primary, '#000000'],
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: 'center',
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 40,
      //     fontWeight: 'bold',
      //   },
      // },
      labelLine: {
        show: false,
      },
      data: [
        {
          value: chartData.value.positive,
          name: 'Entradas',
        },
        {
          value: chartData.value.negative,
          name: 'Saídas',
        },
      ],
    },
  ] as PieSeriesOption,
}))

const option = ref(optionData.value)
</script>

<style scoped lang="scss">
.chart {
  height: v-bind(height);
  width: v-bind(width);
}
</style>

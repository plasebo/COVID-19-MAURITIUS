<template>
  <div class="rel">
    <content-loader :is-loading="isLoading" @refresh-data="renderDataTrendDaily">
      <template v-slot:content>
        <h5 class="abs">For Mauritius</h5>
        <div class="row">
          <div class="col-md-12 rel">
          <trend :data="trendData" class="trend"
          :gradient="['#fbc02d', '#f9a825', '#f57f17']" 
          auto-draw smooth></trend>
          <trend :data="trendDeathData" class="trend" style="height:500px;"
          :gradient="['#d32f2f', '#c62828', '#b71c1c']" 
          auto-draw smooth></trend>
          <v-chart :options="chartOptions" autoresize />
          
          </div>
        </div>
      </template>
    </content-loader>
  </div>
</template>

<script>
import { APIServiceCovidMauritiusDaily } from "../../services/APIServiceCovidMauritiusDaily";
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'


import ContentLoader from "@/components/ContentLoader";
import moment from "moment";
const apiServiceCovidMauritiusDaily = new APIServiceCovidMauritiusDaily();
export default {
  name: "TrendMauritiusDaily",
  components: {
    ContentLoader,
    'v-chart': ECharts
  },
  data() {
    return {
      isLoading: true,
      trendData: [],
      trendDeathData: [],
      chartOptions: {
        color: ['#ef6c00', '#b71c1c'],
        title: {
            text: '',
            textStyle: {
              fontFamily: 'Poppins'
            }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: [{
            type: 'shadow'
          }],
        },
        legend: {
          data: ['Positive cases', 'Death']
        },
        grid: {
          top: '10%',
          left: '1%',
          right: '5%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            scale: false,
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLine: { 
              show: false
            },
            axisLabel : {
              show: true,
              formatter: function (value, index) {
                  return moment(value).format("DD/MM")
              },
            },
            data: []
        },
        yAxis: {
            type: 'value',
            boundaryGap: false,
            scale: false,
            splitArea: {
                show: false
            },
            axisLine: { 
              show: true
            },
        },
        dataZoom: [
        {
          type: 'slider',
          xAxisIndex: 0,
          start: 80,
          end: 100
        },
        ],
        series: [{
          name: 'Positive cases',
          type: 'bar',
          stacked: 'cases',
          // barWidth: '50%',
          label: {
            show: true,
            position: 'outside'
          },
          data: [],
        }, 
        {
          name: 'Death',
          type: 'bar',
          stacked: 'cases',
          label: {
            show: false,
          },
          data: []
          
        },
        ]
      }
    }
  },
  methods: {
    renderDataTrendDaily() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovidMauritiusDaily.fetchDataDaily('Mauritius')
          .then(data => {
            this.chartOptions.xAxis.data = Object.keys(data.data.timeline.cases);
            this.chartOptions.series[0].data = Object.values(data.data.timeline.cases);
            this.chartOptions.series[1].data = Object.values(data.data.timeline.deaths);
            this.trendData = Object.values(data.data.timeline.cases);
            this.trendDeathData = Object.values(data.data.timeline.deaths);
          })
          .catch(error => {
            console.error(error);
          })
          .finally(error => {
            this.isLoading = false;
          });
    }
  },
  created() {
    this.renderDataTrendDaily();
  }
};
</script>

<style scoped>
  .echarts {
    width: 100%;
    min-width: 480px;
    height: 480px;
  }
  .rel {
    position: relative;
  }
  .trend {
    position: absolute;
    top: 0;
    left: 20px;
    width: calc(100% - 20px);
    height: 320px;
    opacity: 0.25;
  }
  .abs {
  position: absolute;
  top: 0px;
}
</style>

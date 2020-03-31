<template>
  <div class="rel">
    <div class="pb-3">
      <v-select
        v-model="countryCodeSelected"
        :options="countryCodeOptions"
        label="text" :clearable="false"
        @input="changeCountry"
      ></v-select>
    </div>
    <content-loader :is-loading="isLoading" @refresh-data="fetchCountryData">
      <template v-slot:content>
        <h5 class="abs">For country {{countryCodeSelected}}</h5>
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
import { APIServiceCovid } from "../../services/APIServiceCovid";
import ECharts from 'vue-echarts';
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/dataZoom'
import vSelect from "vue-select"


import ContentLoader from "@/components/ContentLoader";
import moment from "moment";
const apiServiceCovid = new APIServiceCovid();
export default {
  name: "TrendCountryDaily",
  components: {
    ContentLoader,
    'v-chart': ECharts,
    'v-select': vSelect

  },
  data() {
    return {
      isLoading: true,
      countryCodeSelected: 'Mauritius',
      countryCodeOptions: [],
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
    changeCountry(country) {
      this.countryCodeSelected = country.text;
      this.$emit("countryselected", country.text);
      this.renderDataTrendDaily();
    },
    fetchCountryData() {
      this.isLoading = true;
      this.countryCodeOptions = [];
      apiServiceCovid.getDataCountryCode()
        .then(data => {
          let countries = [];
          data.countries.forEach(function(val) {
            countries.push({
              value: val.name,
              text: val.name
            });
          });
          this.countryCodeOptions = countries;
          this.countryCodeSelected = 'Mauritius';
        })
        .then(() => {
          this.renderDataTrendDaily();
        })
        .catch(error => {
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    renderDataTrendDaily() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovid.getGlobalTrend(this.countryCodeSelected)
          .then(data => {
            this.chartOptions.xAxis.data = Object.keys(data.timeline.cases);
            this.chartOptions.series[0].data = Object.values(data.timeline.cases);
            this.chartOptions.series[1].data = Object.values(data.timeline.deaths);
            this.trendData = Object.values(data.timeline.cases);
            this.trendDeathData = Object.values(data.timeline.deaths);
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
    this.fetchCountryData();
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
    top: 53px;
  }
</style>

<template>
  <div class="rel">
    <content-loader :is-loading="isLoading" @refresh-data="renderDataChart">
      <template v-slot:content>
        <h5 class="abs d-sm-none d-md-block">For Mauritius</h5>
        <div class="row">
          <div class="col-md-6 rel">
            <div class="row">
              <div class="col-sm-12">
                <div class="text-center mb-4">
                  <b-button variant="danger">
                    <h4 class="m-0">Today confirmed
                    <b-badge variant="light" class="ml-2"> {{MUData.todayCases | numeralFormat}} </b-badge>
                    </h4>
                  </b-button>
                </div>
              </div>
              <div class="col-sm-6">
                <b-card text-variant="warning" header="Confirmed cases" class="rel text-center">
                  <b-card-text>
                    <h3>{{MUData.cases | numeralFormat}}</h3>
                    <b-progress :value="MUData.cases" :max="MUData.cases" variant="secondary"></b-progress>
                  </b-card-text>
                  <trend
                    :data="trendData"
                    class="trendy"
                    :gradient="['#fbc02d', '#f9a825', '#ef6c00']"
                    auto-draw
                    smooth
                  ></trend>
                </b-card>
              </div>

              <div class="col-sm-6">
                <b-card text-variant="success" header="Recovered" class="text-center rel">
                  <b-card-text>
                    <h3>{{MUData.recovered | numeralFormat}}</h3>
                    <b-progress :value="MUData.recovered" :max="MUData.cases" variant="success"></b-progress>
                  </b-card-text>
                </b-card>
              </div>

              <div class="col-sm-6">
                <b-card text-variant="danger" header="Death" class="text-center rel">
                  <b-card-text>
                    <h3>{{MUData.deaths | numeralFormat}}</h3>
                    <small>with {{MUData.todayDeaths | numeralFormat}} death today</small>
                    <b-progress :value="MUData.deaths" :max="MUData.cases" variant="danger"></b-progress>
                  </b-card-text>
                  <trend
                    :data="trendDeathData"
                    class="trendy"
                    :gradient="['#d32f2f', '#c62828', '#b71c1c']"
                    auto-draw
                    smooth
                  ></trend>
                </b-card>
              </div>
              <div class="col-sm-6">
                <b-card text-variant="secondary" header="Active cases" class="rel text-center">
                  <b-card-text>
                    <h3>{{MUData.active | numeralFormat}}</h3>
                    <small>with {{MUData.critical | numeralFormat}} critical patient</small>
                    <b-progress :value="MUData.active" :max="MUData.cases" variant="secondary"></b-progress>
                  </b-card-text>
                </b-card>
              </div>
              <div class="col-sm-12 text-center">
                <small class>Last updated on: {{MUData.updated | moment("dddd, Do MMMM YYYY")}}</small>
              </div>
            </div>
          </div>
          <div class="col-md-6 rel">
            <trend
              :data="trendData"
              class="trend"
              :gradient="['#fbc02d', '#f9a825', '#f57f17']"
              auto-draw
              smooth
            ></trend>
            <trend
              :data="trendDeathData"
              class="trend"
              style="height:500px;"
              :gradient="['#d32f2f', '#c62828', '#b71c1c']"
              auto-draw
              smooth
            ></trend>
            <v-chart :options="chartOptions" autoresize />
          </div>
        </div>
      </template>
    </content-loader>
  </div>
</template>

<script>
import { APIServiceCovidMauritiusDaily } from "../../services/APIServiceCovidMauritiusDaily";
import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";

import ContentLoader from "@/components/ContentLoader";
import moment from "moment";
const apiServiceCovidMauritiusDaily = new APIServiceCovidMauritiusDaily();
export default {
  name: "SummaryMauritius",
  components: {
    ContentLoader,
    "v-chart": ECharts
  },
  data() {
    return {
      isLoading: true,
      trendData: [],
      trendDeathData: [],
      MUData: [],
      chartOptions: {
        color: ["#ef6c00", "#b71c1c", "#119e47"],
        title: {
          text: "",
          textStyle: {
            fontFamily: "Poppins"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: [
            {
              type: "shadow"
            }
          ]
        },
        legend: {
          orient: "vertical",
          right: 25,
          top: 25,
          data: ["Cases", "Death", "Recovered"]
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "80%"],
            avoidLabelOverlap: false,
            label: {
              position: "outer",
              alignTo: "none",
              bleedMargin: 5,
              fontSize: "15",
              fontWeight: "normal",
              fontName: "Poppins"
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "15",
                fontWeight: "bold",
                fontName: "Poppins"
              }
            },
            labelLine: {
              show: false
            },
            tooltip: {
              trigger: "item",
              formatter: "{b} : {c} ({d}%)"
            },
            selectedMode: "single",
            data: [
              {
                value: null,
                name: "Cases",
                itemStyle: { normal: { color: "#ef6c00" } }
              },
              {
                value: null,
                name: "Death",
                itemStyle: { normal: { color: "#b71c1c" } }
              },
              {
                value: null,
                name: "Recovered",
                itemStyle: { normal: { color: "#119e47" } }
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    renderDataChart() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovidMauritiusDaily
          .getCountryDetails("Mauritius")
          .then(data => {
            this.MUData = data;
            this.chartOptions.series[0].data[0].value = data.cases;
            if ( data.deaths != 0) {
              this.chartOptions.series[0].data[1].value = data.deaths;
            }
            if (data.recovered != 0) {
              this.chartOptions.series[0].data[2].value = data.recovered;
            }
            this.renderDataTrendDaily();
          })
          .catch(error => {
            console.error(error);
          })
          .finally(error => {
            this.isLoading = false;
          });
    },
    renderDataTrendDaily() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovidMauritiusDaily
          .fetchDataDaily("Mauritius")
          .then(data => {
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
    this.renderDataChart();
    this.renderDataTrendDaily();
  }
};
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 420px;
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

.trendy {
  position: absolute;
  left: -9px;
  top: 30px;
  right: 0;
  width: calc(100% + 18px);
  height: 100%;
  opacity: 0.6;
}
.abs {
  position: absolute;
  top: 0px;
}
.card-text .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
}
</style>

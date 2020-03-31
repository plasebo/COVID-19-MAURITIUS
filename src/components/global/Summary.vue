<template>
  <div style="height: auto;">
    <content-loader :is-loading="isLoading" @refresh-data="renderGlobalTotals">
      <template v-slot:content>
        <div class="row">
          <div class="col-md-6">
            <div class="row">
              <div class="col-sm-6">
                <b-card text-variant="warning" header="Confirmed cases" class="rel text-center">
                  <b-card-text>
                    <h3>{{globalData.cases | numeralFormat}}</h3>
                    <b-progress :value="globalData.cases" :max="globalData.cases" variant="secondary"></b-progress>
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
                    <h3>{{globalData.recovered | numeralFormat}}</h3>
                    <b-progress :value="globalData.recovered" :max="globalData.cases" variant="success"></b-progress>
                  </b-card-text>
                </b-card>
              </div>
              <div class="col-sm-6">
                <b-card text-variant="danger" header="Death" class="text-center rel">
                  <b-card-text>
                    <h3>{{globalData.deaths | numeralFormat}}</h3>
                    <b-progress :value="globalData.deaths" :max="globalData.cases" variant="danger"></b-progress>
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
                    <h3>{{globalData.active | numeralFormat}}</h3>
                    <b-progress :value="globalData.active" :max="globalData.cases" variant="secondary"></b-progress>
                  </b-card-text>
                </b-card>
              </div>
              <div class="col-sm-12 text-center">
                <small class>Last updated on: {{globalData.updated | moment("dddd, Do MMMM YYYY")}}</small>
              </div>
            </div>
          </div>
          <div class="col-md-6 rel">
            <trend
              :data="trendData"
              class="trend"
              :gradient="['#fbc02d', '#f9a825', '#ef6c00']"
              auto-draw
              smooth
            ></trend>
            <trend
              :data="trendDeathData"
              class="trend"
              style="height:440px"
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
import { APIServiceCovid } from "../../services/APIServiceCovid";

import ECharts from "vue-echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

import ContentLoader from "@/components/ContentLoader";
import moment from "moment";
const apiServiceCovid = new APIServiceCovid();

export default {
  name: "SummaryGlobal",
  components: {
    ContentLoader,
    "v-chart": ECharts
  },
  data() {
    return {
      isLoading: true,
      globalData: [],
      trendData: [],
      trendActiveData: [],
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
    renderGlobalTotals() {
      this.isLoading = true;
      (this.chartData = []),
        apiServiceCovid
          .getGlobalTotals()
          .then(data => {
            this.globalData = data;
            this.chartOptions.series[0].data[0].value = data.cases;
            this.chartOptions.series[0].data[1].value = data.deaths;
            this.chartOptions.series[0].data[2].value = data.recovered;
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
        apiServiceCovid
          .getGlobalTrend("all")
          .then(data => {
            this.trendData = Object.values(data.cases);
            this.trendDeathData = Object.values(data.deaths);
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
    this.renderGlobalTotals();
    this.renderDataTrendDaily();
  }
};
</script>

<style scoped>
.echarts {
  width: 100%;
  min-width: 480px;
  height: 360px;
}
.rel {
  position: relative;
}
.trend {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 280px;
  opacity: 0.5;
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
.card-text .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0;
  width: 100%;
}
</style>

<template>
  <div id="app" class="container-fluid">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Header />
    <div class="card">
      <div class="card-header">Mauritius</div>
      <div class="card-body">
        <b-tabs
          active-nav-item-class="font-weight-bold btn"
          active-tab-class
          content-class="p-3"
          fill
        >
          <b-tab title="Overall Statistics" active lazy>
            <SummaryMauritius />
          </b-tab>
          <b-tab title="Trend over days" lazy>
            <TrendMauritiusDaily />
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <div class="card">
      <div class="card-header">Global</div>
      <div class="card-body">
        <b-tabs
          active-nav-item-class="font-weight-bold btn"
          active-tab-class
          content-class="p-3"
          fill
        >
          <b-tab title="Today global trend" active lazy>
            <SummaryGlobal />
          </b-tab>
          <b-tab title="Global trend over time" lazy>
            <TrendGlobalDaily />
          </b-tab>
        </b-tabs>
      </div>
    </div>
      <div class="card">
        <div class="card-header">Countrywise</div>
        <div class="card-body">
          <b-tabs
            active-nav-item-class="font-weight-bold btn"
            active-tab-class
            content-class="p-3"
            fill
          >
            <b-tab title="Global trend by country" lazy>
              <TrendPerCountry />
            </b-tab>
            <b-tab title="Global trend over time by country" lazy>
              <TrendPerCountryDaily />
            </b-tab>
          </b-tabs>
        </div>
      </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/header/Header";
import SummaryGlobal from "./components/global/Summary";
import TrendMauritiusDaily from "./components/Mauritius/TrendDaily";
import SummaryMauritius from "./components/Mauritius/Summary";
import TrendGlobalDaily from "./components/global/TrendDaily";
import TrendPerCountry from "./components/global/TrendPerCountry";
import TrendPerCountryDaily from "./components/global/TrendPerCountryDaily";
import Footer from "./components/footer/Footer";

export default {
  name: "App",
  components: {
    SummaryGlobal,
    TrendMauritiusDaily,
    SummaryMauritius,
    TrendPerCountry,
    TrendGlobalDaily,
    TrendPerCountryDaily,
    Footer,
    Header
  },
  data() {
    return {
      isMauritius: true
    };
  }
};
</script>

<style>

#app {
  font-family: Poppins, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.card {
  margin: 0 0 20px 0 !important;
}

.card-header {
  font-size: large;
  font-weight: 500;
}
.font-weight-bold {
  font-weight: 500 !important;
}
.tab-content {
  border: 1px solid #dee2e6;
  border-top: 0;
}
</style>
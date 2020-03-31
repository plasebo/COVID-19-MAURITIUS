import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';
const NINJA_URL = 'https://corona.lmao.ninja';

export class APIServiceCovid {

    constructor() {

    }
    getDataCountryCode() {
        const url = `${API_URL}/countries/`;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    getCountryDetails(countryCode) {
        const url = `${NINJA_URL}/countries/`+countryCode;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    getGlobalTotals() {
        const url = `${NINJA_URL}/all`;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    getGlobalTrend(country) {
        const url = `${NINJA_URL}/v2/historical/`+country;
        let data = axios.get(url).then(response => response.data);
        return data;
    }
}
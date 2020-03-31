import axios from 'axios';

const API_URL = 'https://corona.lmao.ninja';

export class APIServiceCovidMauritiusDaily {

    constructor() {
        this.config = {
            // mode: 'no-cors',
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json',
            // }
        };
    }

    getBaseUrl () {
        return API_URL;
    }

    httpGet = async function (url) {
        const response = await axios.get(url);
        return response;
    }

    getCountryDetails(country) {
        const url = `${API_URL}/countries/` +country;
        let data = axios.get(url).then(response => response.data);
        return data;
    }

    fetchDataDaily(country) {
        let url = `${API_URL}/v2/historical/` +country;
        let data = this.httpGet(url);
        return data;
    }

}
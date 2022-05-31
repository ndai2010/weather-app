import axios from "axios";

const BASE_URL = 'http://api.weatherapi.com/v1'
const API_KEY = 'cc8b0001f52b42e3a0951337223005'

export const DataWeather = (address) => {
    return axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${address}`)
}
import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const { REACT_APP_WEATHER_KEY } = process.env
const API_KEY = REACT_APP_WEATHER_KEY

const fetchWeather = async (query) => {
  try {
    const { data } = await axios.get(URL, {
      params: {
        q: query,
        units: 'metric',
        APPID: API_KEY,
      },
    })
    return data
  } catch (error) {
    return false
  }
}

export default fetchWeather

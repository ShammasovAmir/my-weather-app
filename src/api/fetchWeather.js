import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'ad2b679f8577443205e6f5a32d229534'

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

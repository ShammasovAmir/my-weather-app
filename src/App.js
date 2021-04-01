import React, { useState } from 'react'
import fetchWeather from './api/fetchWeather'
import './App.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  // Fetch data on input

  const search = async (e) => {
    if (e.key === 'Enter') {
      const data = await fetchWeather(query)
      setWeather(data)
      setQuery('')
    }
  }

  // Location time

  let currentLocationTime

  if (weather)
    currentLocationTime = new Date(
      Date.now() + 1000 * weather.timezone
    ).toLocaleDateString()

  return (
    <div className="app">
      <div
        className={
          typeof weather.main !== 'undefined'
            ? weather.main.temp < -40
              ? 'bg-arctic-day'
              : weather.main.temp >= -40 && weather.main.temp < -10
              ? 'bg-tundra-day'
              : weather.main.temp >= -10 && weather.main.temp < 20
              ? 'bg-forest-day'
              : weather.main.temp >= 20 && weather.main.temp < 35
              ? 'bg-tropics-day'
              : 'bg-desert-day'
            : 'bg-forest-day'
        }
      >
        <main className="main-container">
          <div className="search-box">
            <input
              type="text"
              name="search bar"
              placeholder="Search..."
              className="search-bar"
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={search}
            />
          </div>
          {weather.main && (
            <div className="location-box">
              <div className="location">
                <h2 className="location-name">
                  {weather.name}
                  <sup>{weather.sys.country}</sup>
                </h2>
                <div className="location-temp">
                  {Math.round(weather.main.temp)}&deg;C
                </div>
                <div className="info">
                  <div className="current-weather">
                    <img
                      className="weather-icon"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                    />
                    <p>{weather.weather[0].description}</p>
                  </div>
                  <div className="current-time">{currentLocationTime}</div>
                  <div className="temp-details">
                    <div>
                      <h5>Lowest:</h5>
                      <p>{Math.round(weather.main.temp_min)}&deg;C</p>
                    </div>
                    <div>
                      <h5>Highest:</h5>
                      <p>{Math.round(weather.main.temp_max)}&deg;C</p>
                    </div>
                    <div>
                      <h5>Feels Like:</h5>
                      <p>{Math.round(weather.main.feels_like)}&deg;C</p>
                    </div>
                  </div>
                  <div className="other-details">
                    <div>
                      <h5>Humidity</h5>
                      <p>{Math.round(weather.main.humidity)}%</p>
                    </div>
                    <div>
                      <h5>Pressure</h5>
                      <p>{Math.round(weather.main.pressure)}hPa</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App

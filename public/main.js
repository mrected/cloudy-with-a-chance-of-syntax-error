// variables ---------------------------------------------
const searchBox = document.querySelector('.search-box')
const searchButton = document.querySelector('.search-button')
const displayCity = document.querySelector('.display-city')
const displayTemp = document.querySelector('.display-temp')
const displayWindSpeed = document.querySelector('.display-wind-speed')
const displayWeather = document.querySelector('.display-weather')
let weatherApiData = ''

// dom class needs to...
// create an li element with the specified class to be targeted by displayData

class weatherElement {
  constructor(elementsArray) {
    let elements = elementsArray
    elements.forEach(element => {
      let weatherP = document.createElement('p')
      let weatherSpan = document.createElement('span')
      weatherSpan.classList.add(`display-${element}`)
      weatherP.innerHTML = `${element}: `
      weatherP.appendChild(weatherSpan)
      document.querySelector('main').appendChild(weatherP)
    })
  }
}

const weatherElements = new weatherElement([
  'city',
  'temp',
  'wind-speed',
  'weather'
])

class WeatherData {
  getData(query) {
    let response = fetch(
      `https://api.openweathermap.org/data/2.5/weather?${query}&units=imperial&appid=35c1d9a3bea84a41342db0b75d057c10`
    )
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          displayData('Please enter a valid city')
        }
      })
      .then(json => {
        weatherApiData = json
        displayData(
          weatherApiData.name,
          weatherApiData.main.temp,
          weatherApiData.wind.speed,
          weatherApiData.weather[0].description
        )
      })
  }

  isCityOrZip(query) {
    if (isNaN(query)) {
      this.getData(`q=${query}`)
    } else {
      this.getData(`zip=${query}`)
    }
  }
}

const displayData = (name, temp, speed, description) => {
  document.querySelector('.display-city').textContent = name
  document.querySelector('.display-temp').textContent = temp
  document.querySelector('.display-wind-speed').textContent = speed
  document.querySelector('.display-weather').textContent = description
}

searchButton.addEventListener('click', () => {
  let cityOrZip = searchBox.value
  let weatherData = new WeatherData()
  weatherData.isCityOrZip(cityOrZip)

  // if (isNaN(cityOrZip)) {
  //   weatherData.getData(`q=${cityOrZip}`)
  // } else {
  //   weatherData.getData(`zip=${cityOrZip}`)
  // }
})

const main = () => {}

document.addEventListener('DOMContentLoaded', main)

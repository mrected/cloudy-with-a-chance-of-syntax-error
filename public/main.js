// variables ---------------------------------------------
const searchBox = document.querySelector('.search-box')
const searchButton = document.querySelector('.search-button')
const displayCity = document.querySelector('.display-city')
const displayTemp = document.querySelector('.display-temp')
const displayWindSpeed = document.querySelector('.display-wind-speed')
const displayWeather = document.querySelector('.display-weather')
let weatherApiData = ''

const fetchData = (where) => {
  let response = fetch(`https://api.openweathermap.org/data/2.5/weather?${where}&units=imperial&appid=35c1d9a3bea84a41342db0b75d057c10`)
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        wrongLocation()
      }
    }).then((json) => {
      weatherApiData = json
      displayData()
    })
}

const displayData = () => {
  displayCity.textContent = weatherApiData.name
  displayTemp.textContent = weatherApiData.main.temp
  displayWindSpeed.textContent = weatherApiData.wind.speed
  displayWeather.textContent = weatherApiData.weather[0].description
}

const wrongLocation = () => {
  displayCity.textContent = 'Invalid City - Try again'
  displayTemp.textContent = ''
  displayWindSpeed.textContent = ''
  displayWeather.textContent = ''
}

const main = () => {
  searchButton.addEventListener('click', () => {
    let where = searchBox.value
    if (isNaN(where)) {
      fetchData(`q=${where}`)
    } else {
      fetchData(`zip=${where}`)
    }
  })
}
document.addEventListener('DOMContentLoaded', main)
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css'

const CountryList = ({ countries }) => {
  const rows = () => countries.map( item => <CountryListItem key={item.name} country={item} /> )
  return (
    <div>
      { rows() }
    </div>
  )
}

const CountryListItem = ({ country }) => {
  const [hidden, setHidden] = useState(true)

  const showCountryDetail = (event) => {    
    setHidden(!hidden)    
  }

  return (
    <div key={country.name}>
      {country.name}&nbsp;&nbsp;&nbsp;
      <button onClick={showCountryDetail}>show</button>
      { hidden ? <div></div> : <CountryDetail country={country} /> }
    </div>
  )
}

const CountryDetail = ({ country, hidden }) => {  
  const {capital, population, flag, languages} = country
  const rows = () => languages.map( item => <li key={item.name}>{ item.name }</li> )
  return (
    <div>
      <p>capital&nbsp;&nbsp;{ capital }</p>
      <p>population&nbsp;&nbsp;{ population }</p>
      <h4>languages</h4>
      <ul>
        { rows() }
      </ul>        
      <img src={flag} alt="flag"></img>      
      <CapitalWeather capital={capital} />
    </div>
  )
}

const CapitalWeather = ({ capital }) => {
  const [weatherObj, setWeatherObj] = useState({})
  const access_key = '196fce208984e91e5494ff4940d318c8'
  const weatherHook = () => {
    console.log('weather hook')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`)
      .then(response => {
        console.log('data', response.data)
        setWeatherObj(response.data.current)
      })
  }
  useEffect(weatherHook, [])

  return (    
    <div>
      <h2>Weather in { capital }</h2>
      <p>temperature { weatherObj.temperature }</p>
      {weatherObj.weather_icons ? <img src={weatherObj.weather_icons[0]} alt="weather_icons" /> : <div></div>}
      <p>wind {weatherObj.wind_speed}kph direction&nbsp;{weatherObj.wind_dir}</p>
    </div>
  )
}

const App = () => {
  const [searchText, setSearchText] = useState('enter a country name')
  const [countryData, setCountryData] = useState([])

  const searchHook = () => {
    console.log('hook')
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchText}`)
      .then(response => {
        const data = response.data
        setCountryData(data)        
      })
      .catch(response => {
        console.log('error', response)
      })
  }
  
  useEffect(searchHook, [searchText])

  const changeHandler = (event) => {  
    setSearchText(event.target.value)        
  }

  return (
    <div>
      <p>find countries <input type="text" value={searchText} onChange={changeHandler} /> </p>      
      <CountryList countries={countryData} />      
    </div>
  )
}

export default App;
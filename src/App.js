import axios from 'axios';
import { useState, useEffect  } from 'react';
import './App.css';

function App() {

  const [ weather, setWeather ] = useState({})

  const [ degrees, setDegrees ] = useState(true)



  useEffect(() => {
    function success(pos) {
      var crd = pos.coords;
    
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
  
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=df0a3091dfa9b9a822608047314cd715`)
        .then(res => setWeather(res.data))
    }
    
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    
    navigator.geolocation.getCurrentPosition(success, error);
  }, [])

  const degC = (weather.main?.temp - 273.15).toFixed(2) + "°C"
  const degF = ((weather.main?.temp - 273.15) * 9/5 + 32).toFixed(2) + "°F"

  return (
    <div className="App">
      <h2>Wheather App</h2>
      <h3>{weather.name}, {weather.sys?.country}</h3>
      <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
      <p>{weather.weather?.[0].description} </p>
      <p> <b> Came From: </b>{weather.wind?.deg}°</p>
      <p> <b> Speed: </b>{weather.wind?.speed} <small> Km/h</small></p>
      <p> <b>Temperature:</b>  {degrees ? degC:degF} </p>
      <button onClick={() => setDegrees(!degrees)} > °C / °F </button>
    </div>
  );
}

export default App;

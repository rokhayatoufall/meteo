import React, { useState } from 'react';
import './App.css';
function App() {
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [desc, setDesc] = useState('');
  const [icon, setIcon] = useState('');
  const [sunrise, setSunrise] = useState('');
  const [lat, setLat] = useState('12.5833');
  const [lon, setLon] = useState('-16.2719');
  const [sunSet, setSunSet] = useState('');
  const [isReady, setReady] = useState(false);

  let bgClass = 'success';
  if (temp > 29) {
    bgClass = 'danger';
  } else if (temp < 20) {
    bgClass = 'info';
  }

  React.useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=0948ebc7eea9459e147c04ee8cf9207a&units=metric`
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        setTemp(jsonresult.main.temp);
        setDesc(jsonresult.weather[0].main);
        setIcon(jsonresult.weather[0].icon);
        setCity(jsonresult.name);
        setSunrise(jsonresult.sys.sunrise);
        setSunSet(jsonresult.sys.sunset);
        setReady(true);
      })
      .catch((err) => console.error(err));
  }, [lat, lon]);

  if (isReady) {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 d-flex flex-column justify-content-center'>
            <div className='mt-2 text-bg-dark text-center'>
              <h1>My weather app</h1>
            </div>
            <div className={`mt-4 bg-${bgClass}-subtle rounded`}>
              <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
                <h4>Temperature</h4>
                <p> {temp} °C</p>
              </div>
              <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
                <h4>City</h4>
                <p> {city}</p>
              </div>
              <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
                <h4>Description</h4>
                <p> {desc}</p>
              </div>
              <div className='d-flex  align-items-center justify-content-between col-6 ms-3'>
                <h4>Illustration</h4>
                <img
                  src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                  alt='Weather icon'
                />
              </div>

              <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
                <h4>Sunrise</h4>
                <p> {sunrise}</p>
              </div>
              <div className='d-flex align-items-center justify-content-between col-6 ms-3'>
                <h4>Sunset</h4>
                <p> {sunSet}</p>
              </div>
            </div>
          </div>
          <div className='col-md-4'>
            <h1 className='mt-2 text-bg-dark text-center'>Put coordinates</h1>
            <div className='border border-dark p-2'>
              <div class='form-group'>
                <label for='lat'>Latitude:</label>
                <input
                  type='text'
                  class='form-control'
                  id='lat'
                  onChange={(event) => setLat(event.target.value)}
                />
              </div>
              <div class='form-group'>
                <label for='lon'>Longitude:</label>
                <input
                  type='text'
                  class='form-control'
                  id='lon'
                  onChange={(event) => setLon(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
export default App;

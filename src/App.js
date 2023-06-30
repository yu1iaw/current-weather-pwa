import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';

import './App.css';

const App = () => {
    const [value, setValue] = useState("");
    const [weather, setWeather] = useState(sessionStorage.getItem("weather") ? JSON.parse(sessionStorage.getItem("weather")) : {});
    

    const search = async (e) => {
        if (e.key === "Enter") {
            const data = await fetchWeather(value);
    
            setWeather(data);
            sessionStorage.setItem("weather", JSON.stringify(data));
            setValue("");
        }
    }

    return (
        <div className="main-container">
            <input 
                type="text"
                className='search'
                placeholder='Search for a city to get a forecast...'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyPress={search} />
            {
                weather.main && (
                    <div className="city">
                        <h2 className="city-name">
                            <span>{weather.name}</span>
                            <sup>{weather.sys.country}</sup>
                        </h2>
                        <div className="city-temp">
                            {Math.round(weather.main.temp)}
                            <sup>&deg;C</sup>
                        </div>
                        <div className="info">
                            <img 
                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                                alt={weather.weather[0].description} 
                                className='city-icon' />
                            <p>{weather.weather[0].description}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default App;
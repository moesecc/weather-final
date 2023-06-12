import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("Beirut");
  const [weatherData, setWeatherData] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=7b96e15176bf400498a181557230406&q=${city}`
    );
    setWeatherData(data);
    console.log(data);
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="City"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <button type="submit">Search</button>
        {weatherData && (
          <>
            <h1 className="display">This is {weatherData.location.country}</h1>
            <fieldset className="set">
              <h2>Temperature: {weatherData.current.temp_c} C</h2>
              <h2>Feels Like: {weatherData.current.feelslike_c} C</h2>
            </fieldset>
            <div className="current">
              <h1>Current Weather Details</h1>
              <p className="p">
                <img alt="condition" src={weatherData.current.condition.icon} />
                <p>{weatherData.current.condition.text}</p>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default App;

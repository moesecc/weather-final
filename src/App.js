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
  };
  return (
    <div className="App">
      <header className="header">
        <h1 className="h1">Find the weather anywhere in the world.</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="text"
            placeholder="City/Country"
            className="input"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button type="submit">Search</button>
        </div>

        {weatherData && (
          <div className="data">
            <h1 className="display">
              This is {weatherData.location.name} ,{" "}
              {weatherData.location.country}
            </h1>
            <fieldset className="set">
              <label>Current Weather Details</label>
              <h2>
                Temperature: {weatherData.current.temp_c} C /{" "}
                {weatherData.current.temp_f} F
              </h2>
              <h2>
                Feels Like: {weatherData.current.feelslike_c} C /{" "}
                {weatherData.current.feelslike_f} F
              </h2>
              <h2>
                Wind Speed: {weatherData.current.wind_mph} mph /{" "}
                {weatherData.current.wind_kph} kph
              </h2>

              <div className="current">
                <p className="p">
                  <p>{weatherData.current.condition.text} outside</p>
                  <hr />
                  <img
                    alt="condition"
                    src={weatherData.current.condition.icon}
                  />
                </p>
              </div>
            </fieldset>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;

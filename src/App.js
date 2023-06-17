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
      <header>
        <nav className="navbar">
          <li>Home</li>
          <li>Portfolio</li>
        </nav>
      </header>
      <hr />
      <h1 className="h1">Find the weather anywhere in the world.</h1>
      <hr />
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
        <hr />
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
                Wind Speed {weatherData.current.wind_mph} mph /{" "}
                {weatherData.current.wind_kph} kph
              </h2>

              <div className="current">
                <p className="p">
                  <p>it's {weatherData.current.condition.text} outside</p>
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

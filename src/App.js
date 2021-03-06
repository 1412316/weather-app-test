import { useState } from 'react';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: process.env.REACT_APP_API_BASE
}

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = e => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }

  return (
    <div className={
      (typeof weather.main != "undefined")
        ? ((weather.main.temp > 16) ? "app-warm" : "app")
        : "app"
    }>
      <main>
        <div className="search__box">
          <input
            className="search__box-bar"
            type="text"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ?
          (
            <div>
              <div className="info__box">
                <div className="info__box-location">
                  {weather.name}, {weather.sys.country}
                </div>
                <div className="info__box-date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather__box">
                <div className="weather__box-temp">
                  {Math.round(weather.main.temp)}°C
                </div>
                <div className="weather__box-weather">
                  {weather.weather[0].main}
                </div>
              </div>
            </div>
          ) : ""}

      </main>
    </div>
  );
}

export default App;

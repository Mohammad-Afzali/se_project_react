import "./WeatherCard.css"
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condation === weatherData.condation
    );
  });

  let weatherOption;
  if (filteredOptions.lenght === 0) {
    weatherOptions = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];

  }

  const {currentTemperatureUnit} = useContext (CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"} time ${weatherOption?.Condition 
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

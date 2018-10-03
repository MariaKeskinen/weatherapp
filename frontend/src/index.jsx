import React from 'react';
import ReactDOM from 'react-dom';
import DailyWeather from './components/dailyWeather';
import FiveDayForecast from './components/fiveDayForecast';


const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (type, position) => {
  if (type !== 'weather' && type !== 'forecast') {
    return {};
  }
  try {
    const response = await fetch(`${baseURL}/${type}/${position.lat}/${position.long}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getCurrentLocation = () => {
  if ('geolocation' in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position, error) => {
        if (error) reject(error);
        if (!position || !position.coords) reject('Cannot get position');

        resolve({ lat: position.coords.latitude, long: position.coords.longitude });
      });
    });
  }
  return { lat: 60.192059, long: 24.945831 }; // Helsinki, Finland
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      forecast: null,
      weatherLoadError: null,
      forecastLoadError: null,
    };
  }

  async componentWillMount() {
    const position = await getCurrentLocation();

    getWeatherFromApi('weather', position)
      .then((res) => {
        this.setState({
          weather: res,
        });
      }).catch(() => {
        this.setState({
          weatherLoadError: 'Error!',
        });
      });

    getWeatherFromApi('forecast', position)
      .then((res) => {
        this.setState({
          forecast: res,
        });
      }).catch(() => {
        this.setState({
          forecastLoadError: 'Error!',
        });
      });
  }

  render() {
    const { weather, forecast, weatherLoadError, forecastLoadError } = this.state;

    return (
      <div className="container">
        <div className="dailyWeather">
          <DailyWeather weather={weather} error={weatherLoadError} />
        </div>
        <div className="fiveDayForecast">
          <FiveDayForecast forecast={forecast} error={forecastLoadError} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);

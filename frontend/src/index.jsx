import React from 'react';
import ReactDOM from 'react-dom';

const baseURL = process.env.ENDPOINT;

const getWeatherFromApi = async (position) => {
  try {
    const response = await fetch(`${baseURL}/weather/${position.lat}/${position.long}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const getCurrentLocation = () => {
  if ("geolocation" in navigator) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position, error) => {
        if (error) reject(error);
        if (!position || !position.coords) reject("Cannot get position");

        resolve({ lat: position.coords.latitude, long: position.coords.longitude });
      })
    });
  } else {
    return { lat: 60.192059, long: 24.945831}; // Helsinki, Finland
  }
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: "",
    };
  }

  async componentWillMount() {
    const position = await getCurrentLocation();
    const weather = await getWeatherFromApi(position);
    this.setState({icon: weather.icon.slice(0, -1)});
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} /> }
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);

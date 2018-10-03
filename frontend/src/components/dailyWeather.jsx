import React from 'react';

export default class DailyWeather extends React.Component {

  render() {
    if (!this.props.weather && !this.props.error) {
      return (<p>Loading</p>);
    }

    if (this.props.error) {
      return (<h1>{this.props.error}</h1>);
    }

    const { weather, city } = this.props.weather;

    const icon = weather && weather.icon ? weather.icon.slice(0, -1) : null;

    return (<div>
      <h1>{city.name} - Weather</h1>
      <div className="icon">
        { icon && <img src={`/img/${icon}.svg`} alt={weather.main} /> }
      </div>
      <div className="description">
        <h2>{weather.main}</h2>
        <p>
          {weather.description}
        </p>
      </div>
    </div>);
  }
}

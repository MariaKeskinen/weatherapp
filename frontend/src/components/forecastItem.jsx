import React from 'react';

export default class ForecastItem extends React.Component {
  render() {
    const { item } = this.props;

    const icon = item.weather && item.weather[0] && item.weather[0].icon ?
      item.weather[0].icon.slice(0, -1) : null;
    const weather = item.weather && item.weather[0] && item.weather[0].main;

    return (
      <div className="forecastItem">
        <div>{item.dt_txt}</div>
        <div>
          <div className="forecastItemIcon">{ icon && <img src={`/img/${icon}.svg`} alt={weather} /> }</div>
          <strong>{weather}</strong>
        </div>
        <hr />
      </div>
    );
  }
}

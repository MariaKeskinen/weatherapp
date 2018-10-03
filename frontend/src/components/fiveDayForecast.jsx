import React from 'react';
import ForecastItem from './forecastItem';

export default class FiveDayForecast extends React.Component {

  render() {
    if (!this.props.forecast && !this.props.error) {
      return (<p>Loading</p>);
    }

    if (this.props.error) {
      return (<h1>{this.props.error}</h1>);
    }

    const { forecast, city } = this.props.forecast;

    const forecastElements = forecast.map((item) => <ForecastItem item={item} key={item.dt} />);

    return (
      <div>
        <h1>{city.name} - 5 day forecast</h1>
        {forecastElements}
      </div>
    );
  }
}

require('dotenv').config();

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (type, lat, long) => {
  if (type !== 'weather' && type !== 'forecast') {
    throw new Error('Type can be only weather or forecast');
  }
  let endpoint = `${mapURI}/${type}?lat=${lat}&lon=${long}&appid=${appId}`;

  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weather/:lat/:long', async ctx => {
  const weatherData = await fetchWeather('weather', ctx.params.lat, ctx.params.long);
  const city = weatherData.name ? { name: weatherData.name } : {};
  const weather = weatherData.weather ? weatherData.weather[0] : {};

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = { city, weather };
});

router.get('/api/forecast/:lat/:long', async ctx => {
  const weatherData = await fetchWeather('forecast', ctx.params.lat, ctx.params.long);
  const city = weatherData.city ? weatherData.city : {};
  const forecast = weatherData.list ? weatherData.list : [];

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = { city, forecast };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);

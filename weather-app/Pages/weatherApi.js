const API_KEY = 'b6fd4267a3bdb0ee573f147e2826b428';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const polishCityNames = {
  'warsaw': { pl: 'Warszawa', coords: { lat: 52.2297, lon: 21.0122 } },
  'krakow': { pl: 'Kraków', coords: { lat: 50.0647, lon: 19.9450 } },
  'gdansk': { pl: 'Gdańsk', coords: { lat: 54.3520, lon: 18.6466 } },
  'wroclaw': { pl: 'Wrocław', coords: { lat: 51.1079, lon: 17.0385 } },
  'poznan': { pl: 'Poznań', coords: { lat: 52.4064, lon: 16.9252 } },
  'lodz': { pl: 'Łódź', coords: { lat: 51.7755, lon: 19.4515 } },
  'szczecin': { pl: 'Szczecin', coords: { lat: 53.4285, lon: 14.5528 } },
  'bialystok': { pl: 'Białystok', coords: { lat: 53.1325, lon: 23.1688 } },
};

const defaultCities = [
  'warsaw',
  'krakow',
  'lodz',
  'wroclaw',
  'poznan',
  'gdansk',
  'szczecin',
  'bydgoszcz',
  'lublin',
  'katowice',
  'bialystok',
  'gdynia',
  'czestochowa',
  'radom',
  'sosnowiec',
  'torun',
  'kielce',
  'rzeszow',
  'gliwice',
  'zabrze',
  'olsztyn',
  'bielsko-biala',
  'rybnik',
  'ruda-slaska',
  'tychy',
  'dabrowa-gornicza',
  'opole',
  'elblag',
  'plock',
  'walbrzych',
];

export const fetchWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Nie znaleziono miasta: ${cityName}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      miasto: data.name,
      temperatura: Math.round(data.main.temp),
      pogoda: data.weather[0].main,
      opisPogody: data.weather[0].description,
      wiatr: Math.round(data.wind.speed),
      kierunekWiatru: getWindDirection(data.wind.deg),
      zachmurzenie: `${data.clouds.all}%`,
      wilgotnosc: `${data.main.humidity}%`,
      cisnienie: `${data.main.pressure} hPa`,
      temperatura_min: Math.round(data.main.temp_min),
      temperatura_max: Math.round(data.main.temp_max),
      ikonka: data.weather[0].icon,
    };
  } catch (error) {
    console.error('Błąd pobierania danych pogody:', error);
    throw error;
  }
};

export const fetchForecast = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Nie znaleziono prognozy dla: ${cityName}`);
    }

    const data = await response.json();
    const prognoza5dni = [];
    const dniNazwy = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'];

    for (let i = 0; i < data.list.length; i += 8) {
      const item = data.list[i];
      const date = new Date(item.dt * 1000);
      const dayName = dniNazwy[date.getDay()];

      prognoza5dni.push({
        dzien: dayName,
        data: date.toLocaleDateString('pl-PL'),
        temperatura: Math.round(item.main.temp),
        pogoda: item.weather[0].main,
        opisPogody: item.weather[0].description,
        kierunekWiatru: getWindDirection(item.wind.deg),
        zachmurzenie: `${item.clouds.all}%`,
        wiatr: Math.round(item.wind.speed),
      });
    }

    return prognoza5dni;
  } catch (error) {
    console.error('Błąd pobierania prognozy:', error);
    throw error;
  }
};

export const fetchAllCitiesWeather = async (cities = defaultCities) => {
  // Use allSettled so a failure for one city doesn't break the whole batch
  const results = await Promise.allSettled(cities.map((city) => fetchWeatherData(city)));
  const successful = [];
  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      successful.push(r.value);
    } else {
      console.warn(`fetchAllCitiesWeather: failed to load ${cities[i]}:`, r.reason);
    }
  });
  return successful;
};

const getWindDirection = (degrees) => {
  const directions = ['N', 'NW', 'W', 'SW', 'S', 'SE', 'E', 'NE'];
  const index = Math.round((degrees % 360) / 45) % 8;
  return directions[index];
};

export const getPolishCityName = (englishName) => {
  const lower = englishName.toLowerCase();
  return polishCityNames[lower]?.pl || englishName;
};

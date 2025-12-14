// Uwaga: Użyj własnego klucza API z https://openweathermap.org/api
// Aby uzyskać darmowy klucz, zarejestruj się na https://openweathermap.org/api
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
];

export const fetchWeatherData = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      // Fallback na dane testowe jeśli API nie działa
      console.warn(`API niedostępne dla ${cityName}, używam danych testowych`);
      return getTestWeatherData(cityName);
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
    console.warn(`Błąd API dla ${cityName}, używam danych testowych:`, error.message);
    return getTestWeatherData(cityName);
  }
};

export const fetchForecast = async (cityName) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(cityName)}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) {
      return getTestForecast();
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
    console.warn('Błąd pobierania prognozy, używam danych testowych:', error.message);
    return getTestForecast();
  }
};

// Fallback prognoza testowa
const getTestForecast = () => {
  const dniNazwy = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt'];
  const prognoza = [];
  
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    
    prognoza.push({
      dzien: dniNazwy[i],
      data: date.toLocaleDateString('pl-PL'),
      temperatura: Math.round(Math.random() * 10 + 1),
      pogoda: i % 2 === 0 ? 'Cloudy' : 'Rainy',
      opisPogody: i % 2 === 0 ? 'Pochmurnie' : 'Deszczowo',
      kierunekWiatru: 'NE',
      zachmurzenie: '60%',
      wiatr: Math.round(Math.random() * 10 + 8),
    });
  }
  
  return prognoza;
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

// Fallback dane testowe gdy API nie działa
const getTestWeatherData = (cityName) => {
  const testData = {
    'warsaw': { temp: 5, condition: 'Cloudy', description: 'Pochmurnie', wind: 12, humidity: 75, pressure: 1013, tempMin: 2, tempMax: 8 },
    'krakow': { temp: 3, condition: 'Rainy', description: 'Deszczowo', wind: 15, humidity: 80, pressure: 1012, tempMin: 1, tempMax: 6 },
    'gdansk': { temp: 6, condition: 'Partly Cloudy', description: 'Częściowo pochmurnie', wind: 18, humidity: 70, pressure: 1014, tempMin: 4, tempMax: 9 },
    'wroclaw': { temp: 4, condition: 'Cloudy', description: 'Pochmurnie', wind: 10, humidity: 72, pressure: 1013, tempMin: 2, tempMax: 7 },
    'poznan': { temp: 2, condition: 'Cloudy', description: 'Pochmurnie', wind: 14, humidity: 78, pressure: 1012, tempMin: 0, tempMax: 5 },
    'lodz': { temp: 3, condition: 'Rainy', description: 'Deszczowo', wind: 11, humidity: 79, pressure: 1013, tempMin: 1, tempMax: 6 },
    'szczecin': { temp: 5, condition: 'Cloudy', description: 'Pochmurnie', wind: 16, humidity: 74, pressure: 1013, tempMin: 3, tempMax: 8 },
    'bydgoszcz': { temp: 2, condition: 'Cloudy', description: 'Pochmurnie', wind: 12, humidity: 76, pressure: 1012, tempMin: 0, tempMax: 5 },
    'lublin': { temp: 1, condition: 'Cloudy', description: 'Pochmurnie', wind: 13, humidity: 77, pressure: 1012, tempMin: -1, tempMax: 4 },
    'katowice': { temp: 2, condition: 'Cloudy', description: 'Pochmurnie', wind: 9, humidity: 75, pressure: 1013, tempMin: 0, tempMax: 5 },
  };

  const lower = cityName.toLowerCase();
  const data = testData[lower] || testData['warsaw']; // Default do Warszawy
  const cityNamePL = polishCityNames[lower]?.pl || cityName;
  
  return {
    id: Math.floor(Math.random() * 1000000),
    miasto: cityNamePL,
    temperatura: data.temp,
    pogoda: data.condition,
    opisPogody: data.description,
    wiatr: data.wind,
    kierunekWiatru: 'NE',
    zachmurzenie: '65%',
    wilgotnosc: `${data.humidity}%`,
    cisnienie: `${data.pressure} hPa`,
    temperatura_min: data.tempMin,
    temperatura_max: data.tempMax,
    ikonka: '04d',
  };
};

export const getPolishCityName = (englishName) => {
  const lower = englishName.toLowerCase();
  return polishCityNames[lower]?.pl || englishName;
};

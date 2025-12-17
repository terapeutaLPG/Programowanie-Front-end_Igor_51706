import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { fetchWeatherData, fetchForecast } from '../utils/weatherApi';
import { convertTemperature, getUnitSymbol } from '../utils/temperature';
import FavoriteButton from '../components/FavoriteButton';
import UnitSwitcher from '../components/UnitSwitcher';

function CityDetailPage({ miasta }) {
  const { cityId } = useParams();
  const navigate = useNavigate();
  const unit = useSelector((state) => state.settings.temperatureUnit);
  const unitSymbol = getUnitSymbol(unit);

  const [miasto, setMiasto] = useState(null);
  const [prognoza, setPrognoza] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        const foundCity = miasta.find((m) => m.id === parseInt(cityId));

        if (foundCity) {
          setMiasto(foundCity);
          const forecastData = await fetchForecast(foundCity.miasto);
          setPrognoza(forecastData);
        } else {
          setError('Miasto nie znalezione');
        }
      } catch (err) {
        setError(err.message || 'Błąd pobierania szczegółów');
        console.error('Błąd:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [cityId, miasta]);

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}><h1>Ładowanie…</h1></div>;
  }

  if (error || !miasto) {
    return (
      <div style={{ padding: '2rem' }}>
        <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
          ← Powrót
        </button>
        <h1>Błąd</h1>
        <p>{error || 'Nie znaleziono miasta'}</p>
      </div>
    );
  }

  return (
    <div className="city-detail">
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        ← Powrót do listy
      </button>

      <UnitSwitcher />

      <div className="details">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1>{miasto.miasto}</h1>
          <FavoriteButton cityId={miasto.id} />
        </div>

        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
          {convertTemperature(miasto.temperatura, unit)}{unitSymbol}
        </div>

        <p><strong>Pogoda:</strong> {miasto.pogoda}</p>
        <p><strong>Opis:</strong> {miasto.opisPogody}</p>
        <p><strong>Temperatura min/max:</strong> {convertTemperature(miasto.temperatura_min, unit)}{unitSymbol} / {convertTemperature(miasto.temperatura_max, unit)}{unitSymbol}</p>
        <p><strong>Wiatr:</strong> {Math.round(miasto.wiatr)} m/s ({miasto.kierunekWiatru})</p>
        <p><strong>Wilgotność:</strong> {miasto.wilgotnosc}</p>
        <p><strong>Ciśnienie:</strong> {miasto.cisnienie}</p>
        <p><strong>Zachmurzenie:</strong> {miasto.zachmurzenie}</p>

        <h3 style={{ marginTop: '2rem' }}>Prognoza 5-dniowa</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
          {prognoza.map((dzien, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(96, 165, 250, 0.06)',
                border: '1px solid rgba(96, 165, 250, 0.2)',
                padding: '1rem',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <p style={{ fontWeight: 'bold' }}>{dzien.dzien} ({dzien.data})</p>
              <p style={{ fontSize: '1.5rem' }}>{convertTemperature(dzien.temperatura, unit)}{unitSymbol}</p>
              <p style={{ fontSize: '0.9rem', color: '#9aa4b2' }}>{dzien.opisPogody}</p>
              <p style={{ fontSize: '0.8rem' }}>💨 {Math.round(dzien.wiatr)} m/s</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CityDetailPage;

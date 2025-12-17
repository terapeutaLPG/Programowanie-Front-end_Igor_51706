import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import WeatherCard from '../components/WeatherCard';
import UnitSwitcher from '../components/UnitSwitcher';

function FavoritesPage({ miasta }) {
  const navigate = useNavigate();
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds);

  const favoriteCities = miasta.filter(m => favoriteIds.includes(m.id));

  return (
    <div className="favorites-page" style={{ padding: '2rem' }}>
      <button onClick={() => navigate('/')} style={{ marginBottom: '1rem' }}>
        ← Powrót do listy
      </button>

      <h1>⭐ Ulubione miasta</h1>

      <UnitSwitcher />

      {favoriteCities.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#9aa4b2' }}>
          <p>Nie masz jeszcze ulubionych miast. Kliknij ⭐ przy mieście, żeby dodać.</p>
        </div>
      ) : (
        <div className="weather-list">
          {favoriteCities.map((dane) => (
            <WeatherCard
              key={dane.id}
              cityId={dane.id}
              miasto={dane.miasto}
              temperatura={dane.temperatura}
              onClick={() => navigate(`/miasto/${dane.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;

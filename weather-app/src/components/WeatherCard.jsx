import { useSelector, useDispatch } from 'react-redux'
import { convertTemperature, getUnitSymbol } from '../utils/temperature'
import { toggleFavorite } from '../store/slices/favoritesSlice'

function WeatherCard({ miasto, temperatura, onClick, isSelected, cityId, icon, opady, ikonka }) {
  const unit = useSelector(state => state.settings.temperatureUnit)
  const displayTemp = convertTemperature(temperatura, unit)
  const unitSymbol = getUnitSymbol(unit)
  const className = `weather-card${isSelected ? ' selected' : ''}`
  
  // Mapowanie ikon na emoji
  const iconEmoji = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '🌙',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌧️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  }
  
  const iconCode = ikonka || icon
  
  const dispatch = useDispatch()
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds)
  const isFavorite = cityId && favoriteIds.includes(cityId)

  const handleFavoriteClick = (e) => {
    e.stopPropagation()
    if (cityId) {
      dispatch(toggleFavorite(cityId))
    }
  }

  return (
    <div
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick && onClick(); }}
      style={{ position: 'relative' }}
    >
      {cityId && (
        <button
          onClick={handleFavoriteClick}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'none',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            padding: '0',
            zIndex: 10
          }}
          title={isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      )}
      <div className="city">{miasto}</div>
      {iconCode && (
        <div style={{ fontSize: '3rem', margin: '5px 0' }}>
          {iconEmoji[iconCode] || '🌤️'}
        </div>
      )}
      <div className="temp">{displayTemp} {unitSymbol}</div>
      {opady && <div style={{ fontSize: '0.9rem', color: '#9aa4b2' }}>{opady}</div>}
    </div>
  )
}

export default WeatherCard

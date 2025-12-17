import { useSelector, useDispatch } from 'react-redux'
import { convertTemperature, getUnitSymbol } from '../utils/temperature'
import { toggleFavorite } from '../store/slices/favoritesSlice'

function WeatherCard({ miasto, temperatura, onClick, isSelected, cityId }) {
  const unit = useSelector(state => state.settings.temperatureUnit)
  const displayTemp = convertTemperature(temperatura, unit)
  const unitSymbol = getUnitSymbol(unit)
  const className = `weather-card${isSelected ? ' selected' : ''}`
  
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
      <div className="temp">{displayTemp} {unitSymbol}</div>
    </div>
  )
}

export default WeatherCard

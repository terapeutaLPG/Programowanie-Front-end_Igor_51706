import { useSelector } from 'react-redux'
import { convertTemperature, getUnitSymbol } from '../utils/temperature'

function WeatherCard({ miasto, temperatura, onClick, isSelected }) {
  const unit = useSelector(state => state.settings.temperatureUnit)
  const displayTemp = convertTemperature(temperatura, unit)
  const unitSymbol = getUnitSymbol(unit)
  const className = `weather-card${isSelected ? ' selected' : ''}`

  return (
    <div
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick && onClick(); }}
    >
      <div className="city">{miasto}</div>
      <div className="temp">{displayTemp} {unitSymbol}</div>
    </div>
  )
}

export default WeatherCard

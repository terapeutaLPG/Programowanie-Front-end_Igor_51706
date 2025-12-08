import { useSelector } from 'react-redux'
import { convertTemperature, getUnitSymbol } from '../utils/temperature'

function WeatherCard(props) {
  const unit = useSelector(state => state.settings.temperatureUnit)
  const displayTemp = convertTemperature(props.temperature, unit)
  const unitSymbol = getUnitSymbol(unit)
  const className = `city-card${props.selected ? ' selected' : ''}`

  return (
    <div
      className={className}
      onClick={props.onClick}
    >
      {/* Flex container with a favorite toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>{props.city}</h2>
        <button
          type="button"
          className="favorite-button"
          onClick={(e) => {
            e.stopPropagation()
            props.onToggleFavorite && props.onToggleFavorite(props.cityId)
          }}
        >
          ★
        </button>
      </div>

      <div className="meta">
        <div className="temperature">
          {displayTemp} {unitSymbol}
        </div>
      </div>
    </div>
  )
}

export default WeatherCard

export default WeatherCard

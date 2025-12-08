import WeatherIcon from './WeatherIcon';
import { useSelector } from 'react-redux';
import { convertTemperature, getUnitSymbol } from '../utils/temperature';

function WeatherDetails({ miasto }) {
  const unit = useSelector((state) => state.settings.temperatureUnit);
  const unitSymbol = getUnitSymbol(unit);

  if (!miasto) return null;

  return (
    <div className="weather-details">
      <div className="details-item">
        <strong>Temperatura:</strong>
        <div>
          {convertTemperature(miasto.aktualnaTemperatura, unit)}
          {unitSymbol}
        </div>
      </div>
      {/* ...inne szczegóły pogody... */}
      <div className="forecast">
        {miasto.prognoza5dniowa.map((dzień, idx) => (
          <div key={idx} className="details-item">
            Temperatura: {convertTemperature(dzień.temperatura, unit)}
            {unitSymbol}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;

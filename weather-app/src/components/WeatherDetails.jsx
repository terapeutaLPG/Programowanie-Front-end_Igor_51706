import { useSelector } from 'react-redux';
import { convertTemperature, getUnitSymbol } from '../utils/temperature';

function WeatherDetails({ wybraneMiasto }) {
  const unit = useSelector((state) => state.settings.temperatureUnit);
  const unitSymbol = getUnitSymbol(unit);

  if (!wybraneMiasto) return null;

  return (
    <div className="details">
      <h3>Szczegóły pogody: {wybraneMiasto.miasto}</h3>
      <p>Wiatr: {wybraneMiasto.wiatr} km/h</p>
      <p>Pogoda: {wybraneMiasto.pogoda}</p>
      <p>Kierunek wiatru: {wybraneMiasto.kierunekWiatru}</p>
      <p>Zachmurzenie: {wybraneMiasto.zachmurzenie}</p>
      <p>
        Temperatura: {convertTemperature(wybraneMiasto.temperatura, unit)}{unitSymbol}
      </p>

      <h4 style={{ marginTop: 12 }}>5-dniowa prognoza</h4>
      <div>
        {wybraneMiasto.prognoza5dni.map((dzien, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <strong>{dzien.dzien}:</strong> {convertTemperature(dzien.temperatura, unit)}{unitSymbol} — {dzien.pogoda} — {dzien.kierunekWiatru} — {dzien.zachmurzenie}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;
//d
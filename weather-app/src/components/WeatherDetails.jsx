function WeatherDetails({ wybraneMiasto }) {
  if (!wybraneMiasto) return null;

  return (
    <div className="details">
      <h3>Szczegóły pogody: {wybraneMiasto.miasto}</h3>
      <p>Wiatr: {wybraneMiasto.wiatr} km/h</p>
      <p>Pogoda: {wybraneMiasto.pogoda}</p>
      <p>Kierunek wiatru: {wybraneMiasto.kierunekWiatru}</p>
      <p>Zachmurzenie: {wybraneMiasto.zachmurzenie}</p>

      <h4 style={{ marginTop: 12 }}>5-dniowa prognoza</h4>
      <div>
        {wybraneMiasto.prognoza5dni.map((dzien) => (
          <div key={dzien.dzien} style={{ marginBottom: 8 }}>
            <strong>{dzien.dzien}:</strong> {dzien.temperatura}°C —{" "}
            {dzien.pogoda} — {dzien.kierunekWiatru} — {dzien.zachmurzenie}
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDetails;

import "./App.css";
import WeatherCard from "./components/WeatherCard.jsx";
import { useState, useEffect } from "react";
import WeatherDetails from "./components/WeatherDetails.jsx";
import miasta from "./data/weatherData.jsx";

function App() {
  const [wybraneMiasto, setWybraneMiasto] = useState(null);
  const [wszystkieMiasta, setWszystkieMiasta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleClick = (miasto) => {
    setWybraneMiasto(miasto);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      // symulacja ładowania danych
      await new Promise((resolve) => setTimeout(resolve, 600));
      setWszystkieMiasta(miasta);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Ładowanie strony…</h1>
      </div>
    );
  }

  return (
    <>
      <div className="search-tile">
        <input
          aria-label="Szukaj miasta"
          placeholder="szukaj miasto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h1>Pogoda</h1>

      <div className="weather-list">
        {wszystkieMiasta
          .filter((d) => d.miasto.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((dane) => (
            <WeatherCard
              key={dane.miasto}
              miasto={dane.miasto}
              temperatura={dane.temperatura}
              onClick={() => handleClick(dane)}
              isSelected={wybraneMiasto?.miasto === dane.miasto}
            />
          ))}
      </div>

      {wybraneMiasto && <WeatherDetails wybraneMiasto={wybraneMiasto} />}
    </>
  );
}

export default App;

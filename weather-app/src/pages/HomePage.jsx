//import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UnitSwitcher from "../components/UnitSwitcher";
import WeatherCard from "../components/WeatherCard";
import "../styles/HomePage.css";
import { useState, useMemo, useCallback } from "react";
const HomePage = ({ miasta }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredMiasta = useMemo(
    () =>
      miasta.filter((m) =>
        m.miasto.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [miasta, searchTerm]
  );

  const handleClick = useCallback(
    (dane) => {
      navigate(`/miasto/${dane.id}`, { state: { miasto: dane } });
    },
    [navigate]
  );

  return (
    <div className="home-page">
      <h1>Pogoda w Polsce</h1>

      <UnitSwitcher />

      <div className="search-tile">
        <input
          type="text"
          placeholder="Szukaj miasta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {filteredMiasta.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem", color: "#9aa4b2" }}>
          <p>Nie znaleziono miast spełniających kryteria wyszukiwania.</p>
        </div>
      ) : (
        <div className="weather-list">
          {filteredMiasta.map((dane) => (
            <WeatherCard
              key={dane.id}
              cityId={dane.id}
              miasto={dane.miasto}
              temperatura={dane.temperatura}
              onClick={() => handleClick(dane)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;

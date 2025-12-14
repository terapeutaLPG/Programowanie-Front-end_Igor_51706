import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import CityDetailPage from "./pages/CityDetailPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import { fetchAllCitiesWeather } from "./utils/weatherApi.js";

function App() {
  const [wszystkieMiasta, setWszystkieMiasta] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchAllCitiesWeather();
        setWszystkieMiasta(data);
      } catch (err) {
        setError(err.message || 'Błąd pobierania danych');
        console.error('Błąd ładowania danych:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Ładowanie pogody…</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h1>Błąd ładowania danych</h1>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Spróbuj ponownie</button>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage miasta={wszystkieMiasta} />} />
        <Route path="/miasto/:cityId" element={<CityDetailPage miasta={wszystkieMiasta} />} />
        <Route path="/ulubione" element={<FavoritesPage miasta={wszystkieMiasta} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

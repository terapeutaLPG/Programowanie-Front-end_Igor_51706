import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import miasta from "./data/weatherData.jsx";
import HomePage from "./pages/HomePage.jsx";
import CityDetailPage from "./pages/CityDetailPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";

function App() {
  const [wszystkieMiasta, setWszystkieMiasta] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage miasta={miasta} />} />
        <Route path="/miasto/:cityId" element={<CityDetailPage miasta={miasta} />} />
        <Route path="/ulubione" element={<FavoritesPage miasta={miasta} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

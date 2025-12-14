import { useState } from 'react';
import UnitSwitcher from '../components/UnitSwitcher';
import WeatherCard from '../components/WeatherCard';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const miasta = [
    { id: 1, miasto: 'Warszawa', aktualnaTemperatura: 5 },
    { id: 2, miasto: 'Kraków', aktualnaTemperatura: 3 },
    { id: 3, miasto: 'Gdańsk', aktualnaTemperatura: 6 },
  ];
  const filteredMiasta = miasta.filter((m) =>
    m.miasto.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleClick = (dane) => {
    console.log('Wybrane miasto:', dane);
  };

  return (
    <>
      <h1>Pogoda w Polsce</h1>

      <UnitSwitcher />

      <input
        type="text"
        placeholder="Szukaj miasta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredMiasta.map((dane) => (
        <WeatherCard
          key={dane.id}
          cityId={dane.id}              // ← NOWE: przekazujemy ID miasta
          miasto={dane.miasto}
          temperatura={dane.aktualnaTemperatura}
          onClick={() => handleClick(dane)}
        />
      ))}
    </>
  );
};

export default HomePage;
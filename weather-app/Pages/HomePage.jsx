import { useState } from 'react';
import UnitSwitcher from '../components/UnitSwitcher';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <>
      <h1>Pogoda w Polsce</h1>
      {/* Dodajemy przełącznik jednostek */}
      <UnitSwitcher />
      <div>
        <input
          type="text"
          placeholder="Szukaj miasta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );
};

export default HomePage;
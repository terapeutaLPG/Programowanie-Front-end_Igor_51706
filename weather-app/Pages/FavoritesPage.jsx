import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom'; 
import WeatherCard from '../components/WeatherCard'; 
import UnitSwitcher from '../components/UnitSwitcher'; 
 
function FavoritesPage({ miasta }) { 
  // miasta = wszystkie miasta (props z App.jsx) 
   
  const navigate = useNavigate(); 
   
  // Pobieramy tablicę ID ulubionych 
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds); 
   
  // Filtrujemy - zostawiamy tylko te miasta, których ID jest w ulubionych 
  // Przykład: favoriteIds = [1, 3] 
  // miasta = [{id:1, ...}, {id:2, ...}, {id:3, ...}, ...] 
  // favoriteCities = [{id:1, ...}, {id:3, ...}] 
  const favoriteCities = miasta.filter(m => favoriteIds.includes(m.id)); 
 
  return ( 
    <div> 
      <h1>⭐ Ulubione miasta</h1> 
       
      <UnitSwitcher /> 
       
      <button  
        onClick={() => navigate('/')} 
        style={{ margin: '1rem 0' }} 
      > 
        ← Powrót do listy 
      </button> 
       
      {favoriteCities.length === 0 ? ( 
        // Gdy nie ma ulubionych - pokazujemy komunikat 
        <p>Nie masz jeszcze ulubionych miast. Kliknij ☆ przy mieście, żeby 
dodać.</p> 
      ) : ( 
        // Gdy są ulubione - pokazujemy karty 
        <div className="cities-container"> 
          {favoriteCities.map((dane) => ( 
            <WeatherCard  
              key={dane.id} 
              cityId={dane.id} 
              miasto={dane.miasto}  
              temperatura={dane.aktualnaTemperatura}  
              onClick={() => navigate(`/miasto/${dane.id}`)} 
            /> 
          ))} 
        </div> 
      )} 
    </div> 
  ); 
} 
 
export default FavoritesPage;
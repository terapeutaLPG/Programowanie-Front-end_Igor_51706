import { useSelector, useDispatch } from 'react-redux'; 
import { toggleFavorite } from '../store/slices/favoritesSlice'; 
 
function FavoriteButton({ cityId }) { 
   
  const dispatch = useDispatch(); 
   
  const favoriteIds = useSelector((state) => state.favorites.favoriteIds); 
   
  const isFavorite = favoriteIds.includes(cityId); 
 
  const handleClick = (e) => { 
    e.stopPropagation(); 
     
    dispatch(toggleFavorite(cityId)); 
  }; 
 
  return ( 
    <button  
      onClick={handleClick} 
      style={{  
        background: 'none',  
        border: 'none',  
        fontSize: '1.5rem', 
        cursor: 'pointer', 
        padding: '0.25rem' 
      }} 
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'} 
    > 
      {/* Pełna gwiazdka gdy ulubione, pusta gdy nie */} 
      {isFavorite ? '⭐' : '☆'} 
    </button> 
  ); 
} 
 
export default FavoriteButton;
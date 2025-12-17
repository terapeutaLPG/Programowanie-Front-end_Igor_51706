import { useSelector, useDispatch } from 'react-redux';
import { setTemperatureUnit } from '../store/slices/settingsSlice';
import { useNavigate } from 'react-router-dom';

function UnitSwitcher() {
    const currentUnit = useSelector((state) => state.settings.temperatureUnit);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        dispatch(setTemperatureUnit(e.target.value));
    };

    return (
        <div className="unit-switcher">
            {/* ↓↓↓ NOWE: Przycisk do ulubionych ↓↓↓ */}
            <button
                onClick={() => navigate('/ulubione')}
                style={{ margin: '1rem 0' }}
            >
                ⭐ Ulubione miasta
            </button>
            {/* ↑↑↑ KONIEC NOWEGO ↑↑↑ */}

            <label>Temperature unit: </label>
            <select value={currentUnit} onChange={handleChange}>
                <option value="C">Celsius (°C)</option>
                <option value="F">Fahrenheit (°F)</option>
                <option value="K">Kelvin (K)</option>
            </select>
        </div>
    );
}

export default UnitSwitcher;

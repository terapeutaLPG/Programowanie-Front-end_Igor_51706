
import { createSlice } from '@reduxjs/toolkit';


const initialState = { 
  temperatureUnit: 'C',  // Możliwe wartości: 'C', 'F', 'K'
};


const settingsSlice = createSlice({
  name: 'settings',      // Nazwa slice'a (widoczna w Redux DevTools)
  initialState,          // Stan początkowy (zdefiniowany wyżej)
  reducers: {
    // ─────────────────────────────────────────────────────────
    // REDUCER: setTemperatureUnit
    // Co robi: Zmienia jednostkę temperatury
    // Kiedy wywoływany: Gdy użytkownik wybierze inną jednostkę w select
    // ─────────────────────────────────────────────────────────
    setTemperatureUnit: (state, action) => {
      // state = aktualny stan (np. { temperatureUnit: 'C' })
      // action.payload = nowa wartość przekazana przy wywołaniu (np. 'F')
      state.temperatureUnit = action.payload;
    },
  },
});

export const { setTemperatureUnit } = settingsSlice.actions;

export default settingsSlice.reducer;
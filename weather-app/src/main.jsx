// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// // render glownej aplikacji naszej
// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// );
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux' // ← NOWE: Provider z react-redux
import store from './store' // ← NOWE: nasz store
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
 <StrictMode>
 {/* ↓ NOWE: Opakowujemy aplikację w Provider */}
 {/* Provider udostępnia store wszystkim komponentom w środku */}
 <Provider store={store}>
 <App />
 </Provider>
 </StrictMode>,
)
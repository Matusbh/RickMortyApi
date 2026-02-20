import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/index.css";
import "./styles/App.css";
import { FavoritesProvider } from "../src/context/favouritesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      {/*  Se envuleve el componentea App para que todos los componentes hijos tengan acceso al contexto de favoritos*/}
      <FavoritesProvider>
        <App />
      </FavoritesProvider>
    </HashRouter>
  </React.StrictMode>,
);

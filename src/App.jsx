import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import CharactersPage from "./pages/CharactersPage.jsx";
import FavoritePages from "./pages/FavoritePages.jsx";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/characters" />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/favorites" element={<FavoritePages />} />
          <Route path="*" element={<h2>No encontrado</h2>} />
        </Routes>
      </main>
    </>
  );
}

import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import CharactersPage from "./pages/CharactersPage.jsx";

export default function App() {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="*" element={<h2>No encontrado</h2>} />
        </Routes>
      </main>
    </>
  );
}

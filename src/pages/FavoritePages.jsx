import { useEffect, useState, useContext } from "react";
import { fetchPersonajesId } from "../api/RickMorty.js";
import { useFavorites } from "../context/favouritesContext.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import CharacterGrid from "../components/characters/CharacterGrid.jsx";
import CharacterDetailModal from "../components/characters/CharacterDetailModal.jsx";

export default function FavoritePages() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  const { favoritesId } = useFavorites();
  const sortedFiltrado = [...favoritesId].sort((a, b) => a - b).join(",");

  useEffect(() => {
    async function loadCharactersID() {
      // Si no hay favoritos no llamamos a la api
      if (favoritesId.length === 0) {
        setLoading(false);
        setErrorMsg("");
        setPersonajes([]);
        return;
      }

      try {
        setLoading(true);
        setErrorMsg("");

        const data = await fetchPersonajesId(sortedFiltrado);
        setPersonajes(data);

        // Si solo pedimos un objeto:
        // Si lo que llega de data es array devolvemos lo que tenemos si no lo convertimos en array
        const normalize = Array.isArray(data) ? data : [data];
        setPersonajes(normalize);
      } catch (error) {
        setErrorMsg("Error al cargar personajes");
        setPersonajes([]);
        // Despues de la llamada a la api
      } finally {
        setLoading(false);
      }
    }
    loadCharactersID();
  }, [favoritesId, sortedFiltrado]);

  return (
    <>
      <article>
        <h1>Personajes favoritos</h1>
      </article>

      {loading && <p>Cargando...</p>}

      <div>
        {!loading && errorMsg && <p>{errorMsg}</p>}

        {!loading && !errorMsg && favoritesId.length === 0 && (
          <h2>No hay personajes añadidos a favoritos todavía</h2>
        )}
      </div>

      <div>
        {!loading && !errorMsg && favoritesId.length > 0 && (
          <CharacterGrid
            personajes={personajes}
            onSelect={setPersonajeSeleccionado}
          />
        )}
      </div>

      {
        //Si existe personajeSeleccionado renderiza el modal para mostrar el detalle
      }
      {personajeSeleccionado && (
        <CharacterDetailModal
          character={personajeSeleccionado}
          onClose={() => setPersonajeSeleccionado(null)}
        />
      )}
    </>
  );
}

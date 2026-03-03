import { useEffect, useState, useContext } from "react";
import { fetchPersonajesId } from "../api/RickMorty.js";
import { fetchEpisodiosID } from "../api/RickMorty.js";
import { useFavorites } from "../context/favouritesContext.jsx";
import CharacterGrid from "../components/characters/CharacterGrid.jsx";
import CharacterDetailModal from "../components/characters/CharacterDetailModal.jsx";
import EpisodeGrid from "../components/episodes/EpisodeGrid.jsx";

export default function FavoritePages() {
  const [personajes, setPersonajes] = useState(() => {
    const storedPersonajes = localStorage.getItem("personajes");
    if (!storedPersonajes) return [];

    try {
      const parsed = JSON.parse(storedPersonajes);
      // Si lo que tengo no es un array no se usa
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Si el json esta vacio arrancamos con una lista de personajes vacios
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading2, setLoading2] = useState(false);
  const [errorMsg2, setErrorMsg2] = useState("");

  const [listaEp, setListaEpisodios] = useState(() => {
    const storedEpisodios = localStorage.getItem("episodios");
    if (!storedEpisodios) return [];
  });
  const [episodioSeleccionado, setEpisodioSeleccionado] = useState(null);

  const [page2, setPage2] = useState(1);
  const [totalPage2, setTotalPages2] = useState(1);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);

  const { favoritesId } = useFavorites();
  const sortedFiltrado = [...favoritesId].sort((a, b) => a - b).join(",");
  const { favoritesEpisodesId } = useFavorites();
  const sortedFiltradoEpisodes = [...favoritesEpisodesId]
    .sort((a, b) => a - b)
    .join(",");

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

  // Episodios por ides para los favoritos
  useEffect(() => {
    // Si no hay favoritos no llamamos a la api
    if (favoritesEpisodesId.length === 0) {
      setLoading2(false);
      setErrorMsg2("");
      setListaEpisodios([]);
      return;
    }
    async function loadEpisodes() {
      try {
        setLoading2(true);
        setErrorMsg2("");

        const dataEpisode = await fetchEpisodiosID(sortedFiltradoEpisodes);
        setListaEpisodios(dataEpisode ?? []);
        console.log(dataEpisode);
      } catch (error) {
        setErrorMsg2("Ha fallado la carga de los episodios desde el favoritos");
        setListaEpisodios([]);
        setTotalPages2(1);
      } finally {
        setLoading2(false);
        console.log(listaEp);
      }
    }
    loadEpisodes();
  }, [favoritesEpisodesId, sortedFiltradoEpisodes]);

  return (
    <>
      <article id="personajes">
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

      <article id="episodios">
        <article>
          <h1>Todos los episodios</h1>
        </article>

        {loading2 && <p>Cargando...</p>}

        <div>
          {!loading2 && errorMsg2 && <p>{errorMsg2}</p>}

          {!loading2 && !errorMsg2 && favoritesEpisodesId.length === 0 && (
            <h2>No hay episodios disponibles</h2>
          )}
        </div>

        <div>
          {!loading2 && !errorMsg2 && (
            <EpisodeGrid
              episodios={listaEp}
              onSelect={setEpisodioSeleccionado}
            />
          )}
        </div>
      </article>
    </>
  );
}

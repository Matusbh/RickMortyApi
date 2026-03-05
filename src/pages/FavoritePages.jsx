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
      } catch (error) {
        setErrorMsg2("Ha fallado la carga de los episodios desde el favoritos");
        setListaEpisodios([]);
        setTotalPages2(1);
      } finally {
        setLoading2(false);
      }
    }
    loadEpisodes();
  }, [favoritesEpisodesId, sortedFiltradoEpisodes]);

  return (
    <>
      <article
        id="totales"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-10 border-b pb-10 border-green-500"
      >
        <div
          className="
      group flex items-center gap-4
      bg-dark-accent/80 backdrop-blur-md
      border border-white/5 hover:border-primary/40
      rounded-2xl p-6
      transition-all duration-300
      shadow-lg hover:shadow-primary/10
       hover:shadow-lg
        hover:-translate-y-1
        
      
    "
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5">
            <img src="/RickMortyApi/svg/user-svg.svg" className="w-6 h-6" />
          </div>

          <div className="flex flex-col ">
            <span className="text-3xl font-bold text-white">
              {favoritesId.length}
            </span>
            <span className="text-sm uppercase tracking-wide text-gray-400">
              Personajes
            </span>
          </div>
        </div>

        <div
          className="
      group flex items-center gap-4
      bg-dark-accent/80 backdrop-blur-md
      border border-white/5 hover:border-primary/40
      rounded-2xl p-6
      transition-all duration-300
      shadow-lg hover:shadow-primary/10
       hover:shadow-lg
        hover:-translate-y-1
        
    "
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5">
            <img src="/RickMortyApi/svg/tv-svg.svg" className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">
              {favoritesEpisodesId.length}
            </span>
            <span className="text-sm uppercase tracking-wide text-gray-400">
              Episodios
            </span>
          </div>
        </div>

        <div
          className="
      group flex items-center gap-4
      bg-dark-accent/80 backdrop-blur-md
      border border-white/5 hover:border-primary/40
      rounded-2xl p-6
      transition-all duration-300
      shadow-lg hover:shadow-yellow-400/10
       hover:shadow-lg
        hover:-translate-y-1
        
    "
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5">
            <img src="/RickMortyApi/svg/star-svg.svg" className="w-6 h-6" />
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-bold text-white">
              {favoritesEpisodesId.length + favoritesId.length}
            </span>
            <span className="text-sm uppercase tracking-wide text-gray-400">
              Total
            </span>
          </div>
        </div>
      </article>
      <article id="personajes">
        <h2 className="font-metal text-3xl text-center m-7">
          Personajes favoritos
        </h2>
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
          <h2 className="font-metal text-3xl text-center m-7">
            Todos los episodios
          </h2>
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

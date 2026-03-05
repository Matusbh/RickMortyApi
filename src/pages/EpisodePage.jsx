import { useEffect, useState } from "react";
import { fetchEpisodios } from "../api/RickMorty.js";
import Pagination from "../components/ui/Pagination.jsx";
import EpisodeGrid from "../components/episodes/EpisodeGrid.jsx";
import { useFavorites } from "../context/favouritesContext.jsx";
import EpisodeDetail from "../components/episodes/EpisodeDetail.jsx";

export default function EpisodePage() {
  const [listaEp, setListaEpisodios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [episodioSeleccionado, setEpisodioSeleccionado] = useState(null);

  // para la paginacion
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);

  //* Hacemos fetch de los episodios

  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoading(true);
        setErrorMsg("");

        const data = await fetchEpisodios(page);

        setListaEpisodios(data.results ?? []);
        setTotalPages(data.info.pages ?? 1);
      } catch (error) {
        setErrorMsg("Ha fallado la carga de los episodios");
        setListaEpisodios([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }
    loadEpisodes();
  }, [page]);

  //* Renderizados

  return (
    <>
      {loading && <p>Cargando...</p>}

      <div className="mt-8">
        {!loading && errorMsg && <p>{errorMsg}</p>}

        {!loading && !errorMsg && listaEp.length === 0 && (
          <h2>No hay episodios disponibles</h2>
        )}
      </div>

      <div>
        {!loading && !errorMsg && (
          <EpisodeGrid episodios={listaEp} onSelect={setEpisodioSeleccionado} />
        )}
      </div>

      <div className="text-center align-center">
        <Pagination
          page={page}
          totalPages={totalPage}
          onChangePage={setPage}
        ></Pagination>
      </div>

      {
        //Si existe episodioSeleccionado renderiza el modal para mostrar el detalle
      }
      {episodioSeleccionado && (
        <EpisodeDetail
          episode={episodioSeleccionado}
          onClose={() => setEpisodioSeleccionado(null)}
        />
      )}
    </>
  );
}

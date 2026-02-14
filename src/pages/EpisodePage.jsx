import { useEffect, useState } from "react";
import { fetchEpisodios } from "../api/RickMorty.js";

export default function EpisodePage() {
  // Estados necesarios

  const [listaEp, setListaEpisodios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [episodioSeleccionado, setEpisodioleccionado] = useState(null);

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
        //Actualizamos estados de los episodios
        setListaEpisodios(data.results);
        setTotalPages(data.info.pages);
      } catch {
        setErrorMsg("Ha fallado la carga de los episodios");
      } finally {
        setLoading(false);
      }
    }
    loadEpisodes();
    {
      /*Cada vez que cambia la pagina se actualiza */
    }
  }, [page]);

  //* Renderizados

  return (
    <>
      <section>
        <h2>Todos los episodios</h2>
        <p></p>
      </section>
    </>
  );
}

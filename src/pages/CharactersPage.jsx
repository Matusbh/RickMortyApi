// 2) En CharactersPage.jsx tendrás algo así:
// estado selectedCharacter
// al hacer click en una card → setSelectedCharacter(character)
// renderizas <CharacterDetailModal /> si hay seleccionado

import { useEffect, useState } from "react";
import CharacterGrid from "../components/characters/CharacterGrid.jsx";
import CharacterDetailModal from "../components/characters/CharacterDetailModal.jsx";
import { fetchPersonajes } from "../api/RickMorty.js";
import Pagination from "../components/ui/Pagination.jsx";
import Button from "../components/ui/Button.jsx";
import Imput from "../components/ui/Imput.jsx";

export default function CharactersPage() {
  const [personajes, setPersonajes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  // Null ya que no hay ninguno seleccionado
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  // para la paginacion
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPages] = useState(1);
  // input
  const [search, setSearch] = useState("");

  // Botones de filtrado
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  //Botones de busqueda por especie y por estado
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState("");

  function handleChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  function handleChangeStatus(status) {
    setPage(1);
    if (status === "alive") {
      setStatus("alive");
    } else if (status === "dead") {
      setStatus("dead");
    } else if (status === "unknow") {
      setStatus("unknow");
    }
    setOpen(false);
  }

  function handleChangeSpecies(species) {
    setPage(1);
    if (species === "human") {
      setSpecies("human");
    } else if (species === "alien") {
      setSpecies("alien");
    } else if (species === "unknow") {
      setSpecies("unknow");
    }
    setOpen2(false);
  }

  //* LLamda a la api con useEffect
  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setErrorMsg("");

        // La que intenta un fetch asincrono de los personajes
        const data = await fetchPersonajes(page, search, status, species);
        // Actualizamos el estado de todos los personajes
        setPersonajes(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setErrorMsg("Error cargando personajes");
        setPersonajes([]);
        setTotalPages(1);
        // Esto es lo que hacemos despues de la llamada a la api
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, [page, search, status, species]);

  return (
    <>
      <section>
        <section className="text-center flex gap-3 items-center">
          <Imput value={search} onChange={handleChange}></Imput>
          <div>
            <Button
              onClick={() => setOpen(!open)}
              className={"px-4 py-2 bg-dark-accent rounded-lg text-white"}
            >
              Status ▼
            </Button>

            {open && (
              <div>
                <Button onClick={() => handleChangeStatus("alive")}>
                  alive
                </Button>
                <Button onClick={() => handleChangeStatus("dead")}>dead</Button>
                <Button onClick={() => handleChangeStatus("unknown")}>
                  unknown
                </Button>
              </div>
            )}
          </div>

          <div>
            <Button
              onClick={() => setOpen2(!open2)}
              className={"px-4 py-2 bg-dark-accent rounded-lg text-white"}
            >
              Species ▼
            </Button>

            {open2 && (
              <div>
                <Button onClick={() => handleChangeSpecies("human")}>
                  human
                </Button>
                <Button onClick={() => handleChangeSpecies("alien")}>
                  alien
                </Button>
                <Button onClick={() => handleChangeSpecies("unknown")}>
                  unknown
                </Button>
              </div>
            )}
          </div>
        </section>

        <h2 className="text-4xl text-center mt-5 mb-5"></h2>
        {loading && <p>Cargando...</p>}
        {errorMsg && <p>{errorMsg}</p>}
        {
          // Si no esta cargando y no hay error, renderizamos la cuadricula de personajes
        }
        {!loading && !errorMsg && (
          <CharacterGrid
            personajes={personajes}
            onSelect={setPersonajeSeleccionado}
          />
        )}
      </section>

      <div>
        <Pagination
          page={page}
          totalPages={totalPage}
          onChangePage={setPage}
        ></Pagination>
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

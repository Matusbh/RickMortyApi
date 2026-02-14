import { useEffect, useState } from "react";

export default function CharacterDetailModal({ character, onClose }) {
  // onClose es para cerrar el modal
  // Si no hay personajes devuelve cero
  if (!character) return null;
  const [mensajeError, setMensajeErro] = useState("");
  const [load, setLoad] = useState(false);
  const [episodios, setEpisodios] = useState([]);

  //fetch a la api para los episodios en los que sal el personaje

  useEffect(() => {
    async function loadEpisodes() {
      try {
        setLoad(true);
        setMensajeErro("");

        const episodesPromises = character.episode.map(async (url) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Error episodio");
          return res.json(); // devuelve el objeto episodio
        });
        //Convertimos en objetos las promesas del map anterior
        const episodesData = await Promise.all(episodesPromises);
        setEpisodios(episodesData);
      } catch {
        setMensajeErro("Error cargando personajes");
        setEpisodios([]);
      } finally {
        setLoad(false);
      }
    }
    loadEpisodes();
  }, [character]);

  return (
    <div
      className="fixed inset-0 bg-background-dark/90 z-50 flex justify-center items-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Renderizamos el fondo backdrop*/}

      {/* La caja del detalle */}
      <div
        className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#222222] rounded-xl border border-white/10 shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-7 justify-normal">
          <img
            className="max-w-48 rounded-lg"
            src={character.image}
            alt={character.name}
          />
          <div className="flex flex-col gap-2">
            <p className="mt-2 w-40 py-2 bg-dark-accent text-center text-white rounded-lg text-sm font-bold transition-all p-4">
              ID de personaje: {character.id}
            </p>
            <div>
              <h2 className="text-white text-4xl font-bold leading-tight tracking-tight mb-2">
                {character.name}
              </h2>
              <div className="flex gap-2">
                <p className="text-muted-sage text-lg">{character.status}</p>
                <span>|</span>
                <p className="text-muted-sage text-lg ">{character.species}</p>
                <span>|</span>
                <p className="text-muted-sage text-lg ">{character.gender}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-center text-white text-lg font-bold leading-tight tracking-[-0.015em] mb-4">
            Detailed Information
          </h3>

          <div className="rounded-lg border border-white/10 overflow-hidden">
            {/* Fila */}
            <div className="grid grid-cols-2 px-4 py-3 border-b border-white/10">
              <span className="text-muted-sage text-sm font-semibold uppercase tracking-wider">
                Status
              </span>
              <span className="text-white/90 text-sm">{character.status}</span>
            </div>

            {/* Fila */}
            <div className="grid grid-cols-2 px-4 py-3 border-b border-white/10">
              <span className="text-muted-sage text-sm font-semibold uppercase tracking-wider">
                Species
              </span>
              <span className="text-white/90 text-sm">{character.species}</span>
            </div>

            {/* Fila */}
            <div className="grid grid-cols-2 px-4 py-3 border-b border-white/10">
              <span className="text-muted-sage text-sm font-semibold uppercase tracking-wider">
                Gender
              </span>
              <span className="text-white/90 text-sm">{character.gender}</span>
            </div>

            {/* Fila */}
            <div className="grid grid-cols-2 px-4 py-3 border-b border-white/10">
              <span className="text-muted-sage text-sm font-semibold uppercase tracking-wider">
                Origin
              </span>
              <span className="text-white/90 text-sm">
                {/*Solo accede a name si origin existe */}
                {character.origin?.name}
              </span>
            </div>

            <div className="grid grid-cols-2 px-4 py-3">
              <span className="text-muted-sage text-sm font-semibold uppercase tracking-wider">
                Location
              </span>
              <span className="text-white/90 text-sm">
                {character.location?.name}
              </span>
            </div>
          </div>
        </div>

        {/*Episodios en los que aparece */}
        <div className="mt-3 rounded-lg border border-white/10 overflow-hidden">
          {load && (
            <div className="px-4 py-3 text-white/80 border-b border-white/10">
              Cargando...
            </div>
          )}

          {mensajeError && (
            <div className="px-4 py-3 text-red-300 border-b border-white/10">
              {mensajeError}
            </div>
          )}
          {/*Si no hay load y si no hay error renderizamos los episodios */}
          {!load &&
            !mensajeError &&
            episodios.map((ep) => (
              <div
                key={ep.id}
                className="flex items-center justify-between px-4 py-4 border-b border-white/10 last:border-b-0 bg-dark-accent"
              >
                {/*  id  */}
                <div className="min-w-0">
                  <p className="text-white/90 font-medium truncate">{ep.id}</p>
                </div>
                {/*  nombre */}
                <div className="min-w-0">
                  <p className="text-white/90 font-medium truncate">
                    {ep.name}
                  </p>
                </div>

                {/* código */}
                <span className="ml-4 shrink-0 text-muted-sage text-sm font-semibold">
                  {ep.episode}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

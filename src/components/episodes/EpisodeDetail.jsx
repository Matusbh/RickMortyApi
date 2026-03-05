import { useEffect, useState } from "react";
import EpisodeCard from "./EpisodeCard";

export default function EpisodeDetail({ episode, onClose }) {
  // onClose es para cerrar el modal
  // Si no hay personajes devuelve cero
  if (!episode) return null;
  const [mensajeError, setMensajeErro] = useState("");
  const [load, setLoad] = useState(false);
  const [personajes, setpersonajes] = useState([]);

  //fetch a la api para los personajes en los que sal el personaje

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoad(true);
        setMensajeErro("");

        const charactersPromises = episode.characters.map(async (url) => {
          const res = await fetch(url);
          if (!res.ok) throw new Error("Error mostrando personajes");
          return res.json(); // devuelve el objeto personaje
        });
        //Convertimos en objetos las promesas del map anterior
        const charactersData = await Promise.all(charactersPromises);
        setpersonajes(charactersData);
      } catch (error) {
        setMensajeErro("Error cargando personajes");
        setpersonajes([]);
      } finally {
        setLoad(false);
      }
    }
    loadCharacters();
  }, [episode]);

  return (
    <div
      className="fixed inset-0 bg-background-dark/90 z-50 flex justify-center items-center backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* La caja del detalle */}
      <div
        className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#222222] rounded-xl border border-white/10 shadow-2xl p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div id="caja-episodio" className="w-full">
          {EpisodeCard({ episode, onSelect: () => {} })}
        </div>

        {/*personajes en los que aparece */}
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
          <h3 className="font-metal text-3xl p-5 border-b border-white/10 text-center">
            Personajes que aparecen en el episodio
          </h3>
          {/*Si no hay load y si no hay error renderizamos los personajes */}
          {!load &&
            !mensajeError &&
            (personajes.length > 0 ? (
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2  gap-4">
                {personajes.map((personaje) => (
                  <div
                    key={personaje.id}
                    className="bg-dark-accent p-4 rounded-lg"
                  >
                    <p className="text-white/90 font-medium truncate">
                      {personaje.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : null)}
        </div>
      </div>
    </div>
  );
}

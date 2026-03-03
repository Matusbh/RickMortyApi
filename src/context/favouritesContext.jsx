import { createContext, useContext, useEffect, useState } from "react";

//Creamos un contexto global para compartir el estado de favoritos entre los componentes sin necesidad de pasar props manualmente a cada nivel del árbol de componentes. Este contexto se encargará de almacenar los IDs de los personajes favoritos y proporcionar una función para agregar o eliminar personajes de la lista de favoritos.
const FavoriteContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favoritesId, setFavoritesId] = useState(() => {
    const storedPersonajes = localStorage.getItem("favoritesId");
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

  //Estado para gestionar los episodios facvoritos
  const [favoritesEpisodesId, setFavoritesEpisodesId] = useState(() => {
    const storedPersonajes = localStorage.getItem("favoritesEpisodesId");
    if (!storedPersonajes) return [];

    try {
      const parsed = JSON.parse(storedPersonajes);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Si el json esta vacio arrancamos con una lista de episodios vacios
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favoritesId", JSON.stringify(favoritesId));
  }, [favoritesId]);

  useEffect(() => {
    localStorage.setItem(
      "favoritesEpisodesId",
      JSON.stringify(favoritesEpisodesId),
    );
  }, [favoritesEpisodesId]);

  function toggleFavorite(id) {
    // Si existe ese id se quita
    if (favoritesId.includes(id)) {
      setFavoritesId(favoritesId.filter((item) => item !== id));
    } else {
      // Si no existe se añade
      setFavoritesId([...favoritesId, id]);
    }
  }
  function toggleFavoriteEpisode(id) {
    // Si existe ese id se quita de la lista
    if (favoritesEpisodesId.includes(id)) {
      setFavoritesEpisodesId(favoritesEpisodesId.filter((item) => item !== id));
    } else {
      // Si no existe se añade a la lista que ya tenemos
      setFavoritesEpisodesId([...favoritesEpisodesId, id]);
    }
  }

  return (
    // se llama a este apartado con .provider porque es el proveedor del contexto, y se le pasa el valor que queremos compartir a los componentes hijos, en este caso el estado de favoritos y la funcion para modificarlo

    // un objeto plano que contenga directamente los estados y funciones que quieres usar
    <FavoriteContext.Provider
      value={{
        favoritesId,
        toggleFavorite,
        favoritesEpisodesId,
        toggleFavoriteEpisode,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const contexto = useContext(FavoriteContext);
  if (!contexto)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return contexto;
}

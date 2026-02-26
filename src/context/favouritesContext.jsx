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

  useEffect(() => {
    localStorage.setItem("favoritesId", JSON.stringify(favoritesId));
  }, [favoritesId]);

  function toggleFavorite(id) {
    // Si existe ese id se quita
    if (favoritesId.includes(id)) {
      setFavoritesId(favoritesId.filter((item) => item !== id));
    } else {
      // Si no existe se añade
      setFavoritesId([...favoritesId, id]);
    }
  }

  // El valor que se va a compartir a traves del contexto en este caso el estado de favoritos y la funcion para modificarlo
  const value = { favoritesId, toggleFavorite };

  return (
    // se llama a este apartado con .provider porque es el proveedor del contexto, y se le pasa el valor que queremos compartir a los componentes hijos, en este caso el estado de favoritos y la funcion para modificarlo
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

// Necesito entender bien esta parte, es para usar el contexto en cualquier componente sin tener que importar el contexto y usar useContext cada vez, con esto solo importo esta funcion y ya tengo acceso a todo lo del contexto

export function useFavorites() {
  const contexto = useContext(FavoriteContext);
  if (!contexto)
    throw new Error("useFavorites debe usarse dentro de FavoritesProvider");
  return contexto;
}

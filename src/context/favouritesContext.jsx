import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext(null);

export function FavoritesProvider({ children }) {
  // estado
  const [favoritesId, setFavoritesId] = useState([]);

  function toggleFavorite(id) {
    // Si existe ese id se quita
    if (favoritesId.includes(character.id)) {
      setFavoritesId(favoritesId.filter((item) => item !== id));
    } else {
      // Si no existe se añade
      setFavoritesId([...favoritesId, id]);
    }
  }

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

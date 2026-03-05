import Button from "../ui/Button";
import { useFavorites } from "../../context/favouritesContext";

export default function CharacterCard({ character, onSelect }) {
  const { favoritesId, toggleFavorite } = useFavorites();
  const esFav = favoritesId.includes(character.id);

  function handleToggleFavorite(e, id) {
    e.stopPropagation();
    toggleFavorite(id);
  }

  return (
    <article
      className="
        group
        flex flex-col
        w-full
        bg-dark-accent/40
        border border-dark-accent/30
        hover:border-primary/40
        hover:shadow-lg
        hover:-translate-y-1
        transition-all
        rounded-xl
        p-3
        cursor-pointer
      "
    >
      <div className="relative w-full aspect-square mb-4">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-white text-2xl font-metal font-bold truncate">
          {character.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-semibold uppercase">
            {character.status}
          </span>

          <span className="px-2 py-0.5 rounded bg-sage/20 text-sage text-xs font-semibold uppercase">
            {character.species}
          </span>
        </div>

        <Button
          onClick={() => onSelect(character)}
          className="
            mt-2
            w-full
            py-2
            bg-dark-accent
            hover:bg-primary
            text-white
            rounded-lg
            text-sm
            font-bold
            transition-all
          "
        >
          Ver detalles →
        </Button>

        <Button onClick={(e) => handleToggleFavorite(e, character.id)}>
          {esFav ? "❤️" : "🤍"}
        </Button>
      </div>
    </article>
  );
}

import Button from "../ui/Button";
import { useFavorites } from "../../context/favouritesContext";

export default function EpisodeCard({ episode, onSelect }) {
  const { favoritesEpisodesId, toggleFavoriteEpisode } = useFavorites();
  const esFav = favoritesEpisodesId.includes(episode.id);

  function handleToggleFavorite(e, id) {
    e.stopPropagation();
    toggleFavoriteEpisode(id);
  }

  return (
    <article
      className="
        group bg-dark-accent rounded-xl p-4 border border-white/5 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-64 "
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-metal text-3xl font-bold truncate text-center">
          {episode.name}
        </h3>

        <div className="w-full flex flex-wrap gap-2 justify-center">
          <span className="px-2 py-0.5 text-lg rounded bg-primary/20 text-primary  font-semibold uppercase">
            {episode.episode}
          </span>
        </div>

        <div>
          <p className="flex justify-center text-lg gap-2">
            Personajes:
            <span className="font-bold font-sans">
              {episode.characters.length}
            </span>
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={() => onSelect(episode)}
            className="
            mt-2
            w-full
            bg-background-dark
            hover:bg-primary
            text-white
            rounded-lg
            text-lg
            font-bold
            transition-all
            
          "
          >
            Ver detalles →
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            className="bg-background-dark text-lg "
            onClick={(e) => handleToggleFavorite(e, episode.id)}
          >
            {esFav ? "❤️" : "🤍"}
          </Button>
        </div>
      </div>
    </article>
  );
}

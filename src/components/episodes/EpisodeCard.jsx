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
        group bg-card-dark rounded-xl p-4 border border-white/5 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between h-64"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-white  text-xl font-bold truncate">
          {episode.name}
        </h3>

        <div className="w-full flex flex-wrap gap-2">
          <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-semibold uppercase">
            {episode.episode}
          </span>
        </div>

        <Button
          onClick={() => onSelect(episode)}
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
          View Characters →
        </Button>

        <Button onClick={(e) => handleToggleFavorite(e, episode.id)}>
          {esFav ? "❤️" : "🤍"}
        </Button>
      </div>
    </article>
  );
}

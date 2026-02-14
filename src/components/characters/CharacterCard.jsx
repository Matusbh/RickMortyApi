import Button from "../ui/Button";

export default function CharacterCard({ character, onSelect }) {
  return (
    <article
      onClick={() => onSelect(character)}
      className="
        group
        flex flex-col
        w-full
        bg-dark-accent/20
        border border-dark-accent/30
        hover:border-primary/40
        rounded-xl
        p-3
        transition-all
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
        <h3 className="text-white text-lg font-bold truncate">
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
          View Details →
        </Button>
      </div>
    </article>
  );
}

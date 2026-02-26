import EpisdodeCard from "../episodes/EpisodeCard.jsx";

//Recibir una lista de personajes y pintarlos uno a uno usando CharacterCard
export default function EpisodeGrid({ episodios, onSelect }) {
  console.log(episodios);
  const episodes = Array.isArray(episodios) ? episodios : [];
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {episodes.map((ep) => (
        <EpisdodeCard key={ep.id} episode={ep} onSelect={onSelect} />
      ))}
    </section>
  );
}

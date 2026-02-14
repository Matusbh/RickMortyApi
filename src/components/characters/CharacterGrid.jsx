import CharcterCard from "./CharacterCard.jsx";

//Recibir una lista de personajes y pintarlos uno a uno usando CharacterCard
export default function CharacterGrid({ personajes, onSelect }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {personajes.map((personaje) => (
        <CharcterCard
          key={personaje.id}
          character={personaje}
          onSelect={onSelect}
        />
      ))}
    </section>
  );
}

export default function Imput({ value, onChange }) {
  return (
    <input
      className="form-input flex w-full h-10 border-none mt-2 py-2 bg-dark-accent text-white rounded-lg text-sm font-bold transition-all focus:ring-2 focus:ring-primary placeholder:text-sage px-4 "
      type="text"
      placeholder="Buscador..."
      value={value}
      onChange={onChange}
    ></input>
  );
}

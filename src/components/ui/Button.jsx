export default function Button({ children, className, ...props }) {
  const baseStyle =
    "mt-2 w-full py-2 bg-dark-accent hover:bg-primary text-white rounded-lg text-sm font-bold transition-all";
  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
}

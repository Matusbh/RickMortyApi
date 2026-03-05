import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b border-green-500">
      <div className="flex flex-col flex-1 sm:justify-between justify-between gap-8 mb-3">
        <h1 className="text-white text-center text-6xl font-metal  leading-tight tracking-tight uppercase">
          Rick and Morty Explorer
        </h1>

        <nav className="flex flex-col justify-center sm:flex-row items-center gap-4 font-sans font-bold text-xl">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              isActive
                ? "text-primary border-b-2 border-primary pb-1"
                : "text-white"
            }
          >
            Personajes
          </NavLink>
          {
            <NavLink
              to="/episodes"
              className={({ isActive }) =>
                isActive
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-white"
              }
            >
              Episodios
            </NavLink>
          }
          {
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-white"
              }
            >
              Favoritos
            </NavLink>
          }
        </nav>
      </div>

      <div></div>
    </header>
  );
}

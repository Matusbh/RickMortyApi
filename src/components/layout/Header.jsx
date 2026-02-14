import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="flex flex-1  sm:justify-between justify-between gap-8 mb-3">
        <h1 className="text-white text-xl font-bold leading-tight tracking-tight uppercase">
          Rick and Morty Explorer
        </h1>

        <nav className="flex flex-col sm:flex-row items-center gap-4">
          <NavLink
            to="/characters"
            className={({ isActive }) =>
              isActive ? "text-primary" : "text-white"
            }
          >
            Personajes
          </NavLink>
          {
            <NavLink
              to="/episodes"
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-white"
              }
            >
              Episodios
            </NavLink>
          }
          {
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? "text-primary" : "text-white"
              }
            >
              Ubicaciones
            </NavLink>
          }
        </nav>
      </div>

      <div></div>
    </header>
  );
}

import NavLink from "../components/Link.jsx";
import { useAuthStore } from "../store/AuthStore";
import { useFavorite } from "../store/FavoriteStore.jsx";
import styles from "./Header.module.css";

const UserAuthButton = () => {
  const { login, logout, isLoggedIn } = useAuthStore();
  const { clearFavorites } = useFavorite();
  const handleLogout = () => {
    logout();
    clearFavorites();
  };

  return isLoggedIn ? (
    <button onClick={handleLogout}>Cerrar sesión</button>
  ) : (
    <button onClick={login}>Iniciar sesión</button>
  );
};

export default function Header() {
  const { isLoggedIn } = useAuthStore();
  const { countFavorites } = useFavorite();
  const numberOfFavorites = countFavorites();
  return (
    <header>
      <h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-brackets-angle"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M8 4l-5 8l5 8" />
          <path d="M16 4l5 8l-5 8" />
        </svg>
        DevJobs
      </h1>

      <nav>
        <NavLink activeClass="activeLink" href="/">
          Inicio
        </NavLink>
        <NavLink activeClass="activeLink" href="/search">
          Empleos
        </NavLink>
        <NavLink activeClass="activeLink" href="/contact">
          Contacto
        </NavLink>
      </nav>

      {isLoggedIn && (
        <NavLink additionalClass={styles.profileLink} href="/profile">
          My Favorites 💖 ({numberOfFavorites})
        </NavLink>
      )}

      <UserAuthButton />
    </header>
  );
}

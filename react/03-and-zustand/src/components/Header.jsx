import Link from "./Link";
import styles from './Header.module.css'
import { useAuth } from "../context/AuthContext";


export default function Header() {

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
        <Link href='/'>
          DevJobs
        </Link>
      </h1>

      <nav>
        <Link href="/" activeClass={styles.active}>Inicio</Link>
        <Link href="/search" activeClass={styles.active}>Empleos</Link>
        <Link href="/contact" activeClass={styles.active}>Contacto</Link>

        <HeaderUserButton />
      </nav>
    </header>
  );
}

const HeaderUserButton = () => {
  const { login: handleLogin, logout: handleLogout, isLoggedIn } = useAuth()

  return !isLoggedIn ?
   <button onClick={handleLogin} >Iniciar sesión</button>
  : <button onClick={handleLogout} >Cerrar sesión</button>
}
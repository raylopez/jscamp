import Link from "./Link";

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
        <Link href="/">Inicio </Link>
        <Link href="/search">Empleos</Link>
        <Link href="/contact">Contacto</Link>
      </nav>

      <div>
        {/* <devjobs-avatar
            username="martogalde"
            service="x"
            size="32"
          ></devjobs-avatar>
          <devjobs-avatar
            username="rochababyface1"
            service="x"
            size="32"
          ></devjobs-avatar> */}
      </div>
    </header>
  );
}

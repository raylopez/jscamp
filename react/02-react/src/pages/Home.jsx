import useRouter from "../hooks/useRouter";

export default function Home() {
  const { navigateTo } = useRouter();
  const handleSearch = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const text = formData.get("search");
    const searchUrl = text
      ? `/search?text=${encodeURIComponent(text)}`
      : "/search";
    navigateTo(searchUrl);
  };

  return (
    <>
      <title>Inicio</title>
      <main className="home">
        <section>
          <img src="./bg-web.jpeg" width="200" height="200" />

          <h1>Encuentra el trabajo de tus sueños</h1>
          <p>Únete a la comunidad más grande y busca mejores oportunidades</p>
          <form role="search" onSubmit={handleSearch}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-search"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Buscar empleo por título, empresa, nivel"
              />
              <button type="submit">Buscar</button>
            </div>
          </form>
        </section>

        <section>
          <header>
            <h1>¿Porque DevJobs?</h1>
            <p>
              Porque puedes conectar con la empresa que más se acople a tus
              necesitades, perfil
            </p>
          </header>
          <footer>
            <article className="card">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-briefcase"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9" />
                <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
                <path d="M12 12l0 .01" />
                <path d="M3 13a20 20 0 0 0 18 0" />
              </svg>
              <h3>Encuentra el trabajo de tus sueños</h3>
              <p>Explora en miles de trabajos a lo largo del mundo</p>
            </article>
            <article>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-users"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
              </svg>
              <h3>Conecta con las mejores empresas</h3>
              <p>
                Conecta con las mejores empresas que te estan buscando por tus
                habilidadas
              </p>
            </article>
            <article>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-building-skyscraper"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 21l18 0" />
                <path d="M5 21v-14l8 -4v18" />
                <path d="M19 21v-10l-6 -4" />
                <path d="M9 9l0 .01" />
                <path d="M9 12l0 .01" />
                <path d="M9 15l0 .01" />
                <path d="M9 18l0 .01" />
              </svg>
              <h3>Obten el salario que te mereces</h3>
              <p>
                Obten el salario que te mereces con nuestra calculadora de
                salarios
              </p>
            </article>
          </footer>
        </section>
      </main>
    </>
  );
}

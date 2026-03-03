import { useId } from "react";
import useSearchJobs from "../hooks/useSearchJobs";

export default function SearchFormSection({ onSearch, onTextFilter }) {
  const searchId = useId();
  const technologyId = useId();
  const locationId = useId();
  const levelId = useId();

  const {
    handleSubmit,
    handleTextFilter,
    handleClearFilters,
    hasSearchFilters,
  } = useSearchJobs({
    onSearch,
    onTextFilter,
    technologyId,
    levelId,
    locationId,
  });

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo empleo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico</p>

      <form role="search" id="search-form" onChange={handleSubmit}>
        <div className="search-bar">
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
            placeholder="Buscar trabajos, empresas o habilidades"
            name={searchId}
            onChange={handleTextFilter}
          />

          {/* <button>Buscar</button> */}
        </div>

        <div className="search-filters">
          <select id="filter-technology" name={technologyId}>
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>
          <select id="filter-location" name={locationId}>
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>
          <select id="filter-level" name={levelId}>
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

          {hasSearchFilters && (
            <button type="button" onClick={handleClearFilters}>
              Limpiar filtros
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

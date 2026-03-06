import SearchFormSection from "../components/SearchFormSection.jsx";
import JobsListing from "../components/JobsListing.jsx";
import Pagination from "../components/Pagination.jsx";
import { useEffect, useState } from "react";
import { useSearchParams } from 'react-router'

const RESULTS_PER_PAGE = 5;

function useFilters() {

  const [ searchParams, setSearchParams ] = useSearchParams()

  const [currentPage, setCurrentPage] = useState(() => {
    const page = Number(searchParams.get("page"));
    return Number.isNaN(page) || page == 0 ? 1 : page;
  });
  const [textFilter, setTextFilter] = useState(() => searchParams.get("text") || "" );
  const [filters, setFilters] = useState(() => {

    return {
      technology: searchParams.get("technology") || '',
      level: searchParams.get("level") || '',
      location: searchParams.get("location") || '',
    }

  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (textFilter) params.append("text", textFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.level) params.append("level", filters.level);
        if (filters.location) params.append("type", filters.location);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("offset", offset);
        params.append("limit", RESULTS_PER_PAGE);

        const queryParams = params.toString();
        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );
        const json = await response.json();
        setJobs(json.data);
        setTotal(json.total);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [textFilter, filters, currentPage]);

  useEffect(() => {

    setSearchParams((params) => {
      params = new URLSearchParams();
      if (textFilter) params.set("text", textFilter);
      if (filters.technology) params.set("technology", filters.technology);
      if (filters.location) params.set("location", filters.location);
      if (filters.level) params.set("level", filters.level);

      if (currentPage > 1)
        params.set("page", currentPage)

      return params
    })


  }, [textFilter, filters, currentPage, setSearchParams])


  const totalPages = Math.ceil(total / RESULTS_PER_PAGE);

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handleOnSearch = (filters) => {
    setFilters(filters);
    setCurrentPage(1);
  };

  const handleTextFilter = (text) => {
    setTextFilter(text);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({  })
  }

  return {
    jobs,
    total,
    loading,
    currentPage,
    handleOnSearch,
    handleTextFilter,
    handlePaginationChange,
    totalPages,
    textFilter,
    filters,
    handleClearFilters
  };
}

export default function Search() {
  const {
    jobs,
    total,
    loading,
    totalPages,
    currentPage,
    handleOnSearch,
    handleTextFilter,
    handlePaginationChange,
    textFilter,
    filters,
    handleClearFilters
  } = useFilters();

  const loadingSvg = (
    <span className="rotate">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-rotate"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
      </svg>
    </span>
  );

  const title = `Resultados: ${total} | Página ${currentPage}`;

  return (
    <>
      <title>{title}</title>
      <div className="employees-section">
        <SearchFormSection
          onSearch={handleOnSearch}
          onTextFilter={handleTextFilter}
          initialText={textFilter}
          initialFilters={filters}
          onClearFilters={handleClearFilters}
        />
        <h2>Resultados de búsqueda</h2>
        {loading ? loadingSvg : <JobsListing jobs={jobs} />}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePaginationChange}
        />
      </div>
    </>
  );
}

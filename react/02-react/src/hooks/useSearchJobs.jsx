import { useRef, useState } from "react";

export default function useSearchJobs({
  onSearch,
  onTextFilter,
  technologyId,
  levelId,
  locationId,
  searchTextId,
  formId,
}) {
  const timeoutId = useRef(null);

  const initalFilters = {
    technology: "",
    level: "",
    location: "",
  };
  const [hasSearchFilters, setHasSearchFilters] = useState(false);
  const [textFilter, setTextFilter] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.name === searchTextId) {
      const text = event.target.value;
      setTextFilter(text);

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      //Debounce: Cancelar el timeout anterior
      timeoutId.current = setTimeout(() => {
        onTextFilter(text);
      }, 500);

      return;
    }

    const formData = new FormData(event.currentTarget);
    const filters = {
      technology: formData.get(technologyId),
      level: formData.get(levelId),
      location: formData.get(locationId),
    };
    onSearch(filters);
    setHasSearchFilters(
      filters.technology || filters.level || filters.location,
    );
  };

  const handleClearFilters = () => {
    onSearch(initalFilters);
    setHasSearchFilters(false);
  };

  return {
    hasSearchFilters,
    handleSubmit,
    handleClearFilters,
    textFilter,
  };
}

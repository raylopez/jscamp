import { useState } from "react";

let timeoutId = null;

export default function useSearchJobs({
  onSearch,
  onTextFilter,
  technologyId,
  levelId,
  locationId,
  searchId
}) {
  const initalFilters = {
    technology: "",
    level: "",
    location: "",
  };
  const [hasSearchFilters, setHasSearchFilters] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.name === searchId) return;

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

  const handleTextFilter = (event) => {
    const text = event.target.value;

    if (timeoutId)
        clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      onTextFilter(text);
    }, 500);


  };

  const handleClearFilters = () => {
    onSearch(initalFilters);
    setHasSearchFilters(false);
  };

  return {
    hasSearchFilters,
    handleSubmit,
    handleTextFilter,
    handleClearFilters,
  };
}

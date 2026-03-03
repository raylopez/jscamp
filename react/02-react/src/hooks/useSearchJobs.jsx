import { useState } from "react";

export default function useSearchJobs({
  onSearch,
  onTextFilter,
  technologyId,
  levelId,
  locationId,
}) {
  const initalFilters = {
    technology: "",
    level: "",
    location: "",
  };
  const [hasSearchFilters, setHasSearchFilters] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
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
    onTextFilter(text);
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

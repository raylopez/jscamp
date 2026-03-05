import JobCard from "./JobCard.jsx";

export default function JobsListing({ jobs }) {
  return (
    <section className="search-results">
      <div className="search-results-container">
        {jobs.length == 0 && (
          <p className="not-found-message">No se encontraron resultados</p>
        )}
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </section>
  );
}

import { useState } from "react";

export default function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);
  const buttonClass = `button-apply-job ${isApplied ? "is-applied" : ""}`;
  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  const handleApplied = () => {
    setIsApplied((old) => !old);
  };

  return (
    <article>
      <div className="header">
        <div>
          <h2>{job.titulo}</h2>
          <small>
            {job.empresa} | {job.data.modalidad}
          </small>
        </div>
        <button
          onClick={handleApplied}
          disabled={isApplied}
          className={buttonClass}
        >
          {buttonText}
        </button>
      </div>
      <p>{job.descripcion}</p>
    </article>
  );
}

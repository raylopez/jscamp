import { useState } from "react";
import Link from "./Link";
import styles from "./JobCard.module.css";

export default function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);
  const buttonClass = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  const handleApplied = () => {
    setIsApplied((old) => !old);
  };

  return (
    <article>
      <div className="header">
        <div>
          <h2>
            <Link className={styles.title} href={`/job/${job.id}`}>
              {job.titulo}
            </Link>
          </h2>
          <small>
            {job.empresa} | {job.data.modalidad}
          </small>
        </div>
        <div className={styles.actions}>
          <Link className={styles.details} href={`/job/${job.id}`}>
            Ver detalles
          </Link>
          <button
            onClick={handleApplied}
            disabled={isApplied}
            className={buttonClass}
          >
            {buttonText}
          </button>
        </div>
      </div>
      <p>{job.descripcion}</p>
    </article>
  );
}

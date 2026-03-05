import { useState } from "react";
import Link from "./Link";
import styles from './JobCard.module.css'

export default function JobCard({ job }) {
  const [isApplied, setIsApplied] = useState(false);
  const buttonClass = `button-apply-job ${isApplied ? "is-applied" : ""}`;
  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  const handleApplied = () => {
    setIsApplied((old) => !old);
  };

  return (
    <article className="job-card">
      <div className="header">
        <div>
          <h2 className={styles.title}>
            <Link href={`/job/${job.id}`}>
              {job.titulo}
            </Link>
          </h2>
          <small>
            {job.empresa} | {job.data.modalidad}
          </small>
        </div>
        <div className={styles.actions}>
          <Link href={`/job/${job.id}`}>Ver detalles</Link>
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

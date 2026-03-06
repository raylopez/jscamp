import { useState } from "react";
import Link from "./Link";
import styles from "./JobCard.module.css";
import { useFavorite } from "../store/FavoriteStore";
import { useAuthStore } from "../store/AuthStore";

export const FavoriteButton = ({ jobId }) => {
  const { isFavorite, toggleFavorite } = useFavorite();
  const { isLoggedIn } = useAuthStore();

  return (
    <button
      disabled={!isLoggedIn}
      onClick={() => toggleFavorite(jobId)}
      className={styles.favButton}
    >
      {isFavorite(jobId) ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
        </svg>
      ) : (
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
        </svg>
      )}
    </button>
  );
};

const ApplyButton = ({ jobId }) => {
  const [isApplied, setIsApplied] = useState(false);
  const buttonClass = isApplied
    ? "button-apply-job is-applied"
    : "button-apply-job";
  const buttonText = isApplied ? "Aplicado" : "Aplicar";
  const handleApplied = () => {
    console.log(`Aplicando en trabajo: ${jobId}`);
    setIsApplied(true);
  };
  return (
    <button
      onClick={handleApplied}
      disabled={isApplied}
      className={buttonClass}
    >
      {buttonText}
    </button>
  );
};

export default function JobCard({ job }) {
  return (
    <article>
      <div className="header">
        <div>
          <h2 className={styles.title}>
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

          <FavoriteButton jobId={job.id} />

          <ApplyButton jobId={job.id} />
        </div>
      </div>
      <p>{job.descripcion}</p>
    </article>
  );
}

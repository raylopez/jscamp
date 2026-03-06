import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";
import snarkdown from "snarkdown";
import styles from "./JobDetail.module.css";
import Link from "../components/Link";
import { useAuthStore } from "../store/AuthStore";
import { FavoriteButton } from "../components/JobCard";

function JobSection({ title = "", content = "" }) {
  const html = snarkdown(content);
  return (
    <div className={styles.container}>
      <article>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div
          className={`${styles.sectionContent} prose`}
          dangerouslySetInnerHTML={{
            __html: html,
          }}
        />
      </article>
    </div>
  );
}

function ApplyButton() {
  const [isApplied, setIsApplied] = useState(false);
  const { isLoggedIn } = useAuthStore();

  const handleApply = (event) => {
    event.preventDefault();
    setIsApplied((old) => !old);
  };

  return (
    <button
      className={styles.applyButton}
      disabled={isApplied || !isLoggedIn}
      onClick={handleApply}
    >
      {isLoggedIn ? "Aplicar ahora" : "Inicia sesión para aplicar"}
    </button>
  );
}

function JobCardBreadcrumb({ job }) {
  return (
    <div className={styles.containerNavigation}>
      <nav className={styles.breadcrumb}>
        <Link href="/search" className={styles.breadcrumbButton}>
          Empleos
        </Link>
        <span className={styles.breadcrumbSeparator}>/</span>
        <span className={styles.breadcrumbCurrent}>{job?.titulo}</span>
      </nav>
    </div>
  );
}

function JobHeader({ job }) {
  return (
    <header className={styles.header}>
      <div className={styles.titles}>
        <h1 className={styles.title}>{job?.titulo}</h1>
        <p className={styles.meta}>
          {job?.empresa} | {job?.ubicacion}
        </p>
      </div>

      <div className={styles.actions}>
        <ApplyButton />
        <FavoriteButton jobId={job.id} />
      </div>
    </header>
  );
}

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://jscamp-api.vercel.app/api/jobs/${id}`;
    fetch(url)
      .then((resp) => {
        if (!resp.ok) {
          navigate("/notFound");
        }
        return resp.json();
      })
      .then((json) => {
        setJob(json);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.loading}>
          <p className={styles.loadingText}>Cargando</p>
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1rem" }}>
        <div className={styles.error}>
          <h2 className={styles.errorTitle}>Oferta no encontrada</h2>
          <NavLink to="/" className={styles.errotButton}>
            Volver al inicio
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <>
      <title>{job?.titulo}</title>
      <div className={styles.container}>
        <JobCardBreadcrumb job={job} />
        <JobHeader job={job} />

        <JobSection title="Descripción" content={job?.content?.description} />
        <JobSection
          title="Responsabilidades"
          content={job?.content?.responsibilities}
        />
        <JobSection
          title="Requerimientos"
          content={job?.content?.requirements}
        />
        <JobSection
          title="Acerca de la empresa"
          content={job?.content?.about}
        />
      </div>
    </>
  );
}

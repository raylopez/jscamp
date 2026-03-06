import { useParams, useNavigate, Link } from "react-router";
import { useState, useEffect } from "react";
import styles from "./JobDetail.module.css";
import snarkdown from "snarkdown";
import { useAuth } from "../context/AuthContext";

function JobSection({ title, content = "" }) {
	const html = snarkdown(content);

	return (
		<section className={`${styles.section} prose`}>
			<h2 className={styles.sectionTitle}>{title}</h2>
			<div
				dangerouslySetInnerHTML={{ __html: html }}
				className={`${styles.sectionContent}`}
			/>
		</section>
	);
}

function BreadcrumbSection({ job }) {
	return (
		<nav className={styles.breadcrumb}>
					<Link to="/search">Empleos</Link>
					<div className={styles.breadcrumSeparator}>/</div>
					<span>{job.titulo}</span>
				</nav>
	)
}

function ApplyButton () {
	const { isLoggedIn } = useAuth()

	return(
		<button className={styles.applyButton} disabled={!isLoggedIn}>
			{ isLoggedIn ? 'Aplicar ahora' : 'Inicia sesión para aplicar' }
		</button>
	)
}

function JobHeaderSection({ job }) {


	return (
		<header className={styles.header}>
					<div>
						<h1 className={styles.title}>{job.titulo}</h1>
						<p className={styles.meta}>
							{job.empresa} | {job.ubicacion}
						</p>
					</div>

					<ApplyButton />
				</header>
	)
}

export default function JobDetail() {
	const { jobId } = useParams();
	const [job, setJob] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`)
			.then((resp) => {
				if (!resp.ok) throw new Error("Job not found");

				return resp.json();
			})
			.then((json) => {
				setJob(json);
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [jobId]);

	if (loading) {
		return (
			<div className={styles.loading}>
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
						className="rotate icon icon-tabler icons-tabler-outline icon-tabler-rotate-clockwise"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
					</svg>
				<div className={styles.loadingText}>
					Cargando...
				</div>
			</div>
		);
	}

	if (error || !job) {
		return (
			<div className={styles.error}>
				<div className={styles.errorTitle}>Oferta no encontrada</div>
				<button className={styles.errorButton} onClick={() => navigate("/")}>
					Volver al inicio
				</button>
			</div>
		);
	}

	return (
		<div style={{ margin: "0 auto", padding: "1rem" }}>
			<title>DevJobs</title>
			<div className={styles.container}>
				<BreadcrumbSection job={job} />

				<JobHeaderSection job={job} />

				<JobSection
					title="Descripción del puesto"
					content={job.content.description}
				/>
				<JobSection
					title="Responsabilidades"
					content={job.content.responsibilities}
				/>
				<JobSection title="Requerimientos" content={job.content.requirements} />
				<JobSection
					title="Acerca de la empresa"
					content={job.content.description}
				/>
			</div>
		</div>
	);
}

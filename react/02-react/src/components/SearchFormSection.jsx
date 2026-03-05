import { useId, useRef, useState } from "react";
function useSearchJobs({
	onSearch,
	onTextFilter,
	technologyId,
	levelId,
	locationId,
	searchId,
}) {
	const initalFilters = {
		technology: "",
		level: "",
		location: "",
	};

	let timeoutId = useRef(null);
	const [searchText, setSearchText] = useState("");
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
		setSearchText(text);

		if (timeoutId.current) clearTimeout(timeoutId.current);

		timeoutId.current = setTimeout(() => {
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

export default function SearchFormSection({
	onSearch,
	onTextFilter,
	initialText,
}) {
	const searchId = useId();
	const technologyId = useId();
	const locationId = useId();
	const levelId = useId();

	const {
		handleSubmit,
		handleTextFilter,
		handleClearFilters,
		hasSearchFilters,
	} = useSearchJobs({
		onSearch,
		onTextFilter,
		technologyId,
		levelId,
		locationId,
		searchId,
	});

	const handleClearInput = (event) => {
		event.preventDefault();
		inputRef.current.value = "";
		onTextFilter("");
	};

	const inputRef = useRef();

	return (
		<section className="jobs-search">
			<h1>Encuentra tu próximo empleo</h1>
			<p>Explora miles de oportunidades en el sector tecnológico</p>

			<form role="search" id="search-form" onChange={handleSubmit}>
				<div className="search-bar">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.25"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="icon icon-tabler icons-tabler-outline icon-tabler-search"
					>
						<path stroke="none" d="M0 0h24v24H0z" fill="none" />
						<path d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
						<path d="M21 21l-6 -6" />
					</svg>
					<input
						type="text"
						placeholder="Buscar trabajos, empresas o habilidades"
						name={searchId}
						onChange={handleTextFilter}
						ref={inputRef}
            defaultValue={initialText}
					/>

					<button
						className="clearInput"
						type="button"
						onClick={handleClearInput}
					>
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
							className="icon icon-tabler icons-tabler-outline icon-tabler-square-x"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14" />
							<path d="M9 9l6 6m0 -6l-6 6" />
						</svg>
					</button>
				</div>

				<div className="search-filters">
					<select id="filter-technology" name={technologyId}>
						<option value="">Tecnología</option>
						<optgroup label="Tecnologías populares">
							<option value="javascript">JavaScript</option>
							<option value="python">Python</option>
							<option value="react">React</option>
							<option value="nodejs">Node.js</option>
						</optgroup>
						<option value="java">Java</option>
						<hr />
						<option value="csharp">C#</option>
						<option value="c">C</option>
						<option value="c++">C++</option>
						<hr />
						<option value="ruby">Ruby</option>
						<option value="php">PHP</option>
					</select>
					<select id="filter-location" name={locationId}>
						<option value="">Ubicación</option>
						<option value="remoto">Remoto</option>
						<option value="cdmx">Ciudad de México</option>
						<option value="guadalajara">Guadalajara</option>
						<option value="monterrey">Monterrey</option>
						<option value="barcelona">Barcelona</option>
					</select>
					<select id="filter-level" name={levelId}>
						<option value="">Nivel de experiencia</option>
						<option value="junior">Junior</option>
						<option value="mid">Mid-level</option>
						<option value="senior">Senior</option>
						<option value="lead">Lead</option>
					</select>

					{hasSearchFilters && (
						<button type="button" onClick={handleClearFilters}>
							Limpiar filtros
						</button>
					)}
				</div>
			</form>
		</section>
	);
}

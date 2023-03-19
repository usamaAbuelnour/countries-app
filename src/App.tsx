import { useEffect, useState, useRef, memo } from "react";
import {
	Navigate,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from "react-router-dom";
import restCountries from "./APIs/restCountries";
import classes from "./App.scss";
import Countries from "./Countries/Countries";
import CountryDetails from "./CountryDetails/CountryDetails";
import CountryInterface from "./models/country";
import QueryFields from "./QueryFields/QueryFields";
import ToolBar from "./ToolBar/ToolBar";
import CircleLoader from "react-spinners/CircleLoader";


function App() {
	const [countries, setCountries] = useState<CountryInterface[]>();
	const [cachedCountries, setCachedCountries] = useState<CountryInterface[]>();
	const [filteredCountries, setFilteredCountries] =
		useState<CountryInterface[]>();

	const [selectedCountry, setSelectedCountry] = useState<
		CountryInterface | undefined
	>();

	const [filterOption, setFilterOption] = useState("Filter by Region");

	const [darkMode, setDarkMode] = useState(!!localStorage.getItem("dark"));

	const modeToggle = () => {
		setDarkMode((prev) => !prev);
		if (darkMode) localStorage.setItem("dark", "");
		else localStorage.setItem("dark", "1");
	};

	const selectCountry = (country: CountryInterface | undefined): void => {
		setSelectedCountry(country);
		setCountries(filteredCountries? filteredCountries: countries);
	};
	const searchCountry = (name: string): void => {
		const countries = filteredCountries
			? filteredCountries?.filter((country: CountryInterface) => {
					const position = country.name.common.search(
						new RegExp(`${name}`, "i")
					);
					if (position > -1) return true;
					else return false;
			  })
			: cachedCountries?.filter((country: CountryInterface) => {
					const position = country.name.common.search(
						new RegExp(`${name}`, "i")
					);
					if (position > -1) return true;
					else return false;
			  });

		if (!countries?.length)
			setCountries(filteredCountries ? filteredCountries : cachedCountries);
		else setCountries(countries);
	};

	const filterBy = (continent: string): void => {
		const countries = cachedCountries?.filter(
			(country: CountryInterface) => country.continents[0] === continent
		);

		if (!countries?.length) setCountries(cachedCountries);
		else {
			setCountries(countries);
			setFilteredCountries(countries);
		}
	};

	const clear = (): void => {
		setFilteredCountries(undefined);
		setCountries(cachedCountries);
	};

	useEffect(() => {
		restCountries.get("all").then((res) => {
			setCountries(res.data);
			setCachedCountries(res.data);
		});
	}, []);


	const location = useLocation();

	if (darkMode)
		document.body.style.backgroundColor = "var(--very-dark-blue-bg)";
	else document.body.style.backgroundColor = "var(--very-light-gray)";

	const styles = [classes.app, darkMode ? classes.dark : null];
	return (
		<div className={styles.join(" ")}>
			<div className={classes.container}>
				<div className={classes.header}>
					<ToolBar darkMode={darkMode} modeToggle={modeToggle} />
					{location.pathname === "/" ? (
						<QueryFields
							searchCountry={searchCountry}
							filterBy={filterBy}
							clear={clear}
							darkMode={darkMode}
							filterOption={filterOption}
							setFilterOption={setFilterOption}
						/>
					) : null}
				</div>

				{countries && cachedCountries ? (
					<Routes>
						<Route
							path="/"
							element={
								<Countries
									countries={countries}
									selectCountry={selectCountry}
									darkMode={darkMode}
								/>
							}
						/>
						<Route
							path="/country"
							element={
								selectedCountry ? (
									<CountryDetails
										countries={cachedCountries}
										country={selectedCountry}
										selectCountry={selectCountry}
										darkMode={darkMode}
									/>
								) : (
									<Navigate to="/" />
								)
							}
						/>
					</Routes>
				) : (
					<CircleLoader
						color={darkMode ? "white" : "black"}
						size={120}
						cssOverride={{ margin: "50vh auto" }}
						speedMultiplier={1.3}
					/>
				)}
			</div>
		</div>
	);
}

export default memo(App);
// export default App;

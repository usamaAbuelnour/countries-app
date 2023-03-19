import Country from "../Country/Country";
import CountryDetails from "../CountryDetails/CountryDetails";
import CountryInterface from "../models/country";
import classes from "./Countries.scss";

interface CountriesProps {
	countries: CountryInterface[];
	selectCountry: (country: CountryInterface | undefined) => void;
	darkMode: boolean;
}

export default function Countries({
	countries,
	selectCountry,
	darkMode,
}: CountriesProps): JSX.Element {
	return (
		<div className={classes.countries}>
			{countries.map((country) => (
				<Country
					key={Math.random()}
					country={country}
					selectCountry={selectCountry}
					darkMode={darkMode}
				/>
			))}
		</div>
	);
}

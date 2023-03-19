import classes from "./CountryDetails.scss";
import CountryInterface from "../models/country";
import Country from "../Country/Country";

interface CountryDetailsProps {
	country: CountryInterface;
    countries: CountryInterface[];
    selectCountry: (country: CountryInterface | undefined)=>void;
	darkMode: boolean;
}

export default function CountryDetails({
	country,
    countries,
    selectCountry,
	darkMode
}: CountryDetailsProps): JSX.Element {
	return (
		<div className={classes.countryDetails}>
			<Country country={country} details countries={countries} selectCountry={selectCountry} darkMode={darkMode}/>
		</div>
	);
}

import { useEffect } from "react";
import CountryInterface from "../models/country";
import classes from "./Country.scss";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

interface CountryProps {
	country: CountryInterface;
	details?: boolean;
	countries?: CountryInterface[];
	selectCountry?: (country: CountryInterface | undefined) => void;
	darkMode: boolean;
}

export default function Country({
	country,
	details,
	countries,
	selectCountry,
	darkMode,
}: CountryProps): JSX.Element {
	const nativeNames = country.name.nativeName
		? Object.keys(country.name.nativeName)
		: [];
	const currencies = country.currencies ? Object.keys(country.currencies) : [];
	const languages = country.languages ? Object.keys(country.languages) : [];

	const navigate = useNavigate();

	const countryNameResolve = (
		countryCode: string
	): CountryInterface | undefined => {
		const country = countries?.find((country) => {
			if (country.cca2 === countryCode) return true;
			else return country.cca3 === countryCode;
		});
		if (country) return country;
		else return undefined;
	};

	const styles = [
		classes.country,
		details ? classes.details : null,
		darkMode ? classes.dark : null,
	];
	return (
		<div
			className={styles.join(" ")}
			onClick={details ? () => {} : () => selectCountry?.(country)}
		>
			<HashLink to="/country#" smooth>
				{details ? (
					<button className={classes.backButton} onClick={() => navigate(-1)}>
						<BiArrowBack />
						Back
					</button>
				) : null}
				<div className={classes.mainContainer}>
					<div className={classes.flag}>
						<img src={country.flags.png} alt={country.flags.alt} />
					</div>
					<div className={classes.container}>
						<div className={classes.sectionContainer}>
							<div className={classes.upperSection}>
								<h2 className={classes.name}>{country.name.common}</h2>
								{details ? (
									<p>
										<strong>Native Name: </strong>
										{country.name.nativeName[nativeNames[0]].common}
									</p>
								) : null}
								<p>
									<strong>Population: </strong>
									{country.population.toLocaleString()}
								</p>
								<p>
									<strong>Region: </strong>
									{country.region}
								</p>
								{details ? (
									<p>
										<strong>Sub Region: </strong>
										{country.subregion}
									</p>
								) : null}
								<p>
									<strong>Capital: </strong>
									{country.capital}
								</p>
							</div>
							{details ? (
								<div className={classes.middleSection}>
									<p>
										<strong>Top Level Domain: </strong>
										{country.tld ? country.tld[0] : null}
									</p>
									<p>
										<strong>Currencies: </strong>
										{currencies.map(
											(currency) => country.currencies[currency].name
										)}
									</p>
									<p>
										<strong>Languages: </strong>
										{languages.map((language, index) => {
											let delimiter =
												index === languages.length - 1 ? "" : ", ";

											return `${country.languages[language]}${delimiter}`;
										})}
									</p>
								</div>
							) : null}
						</div>
						{details ? (
							<div className={classes.lowerSection}>
								<h3>Border Countries:</h3>
								<div className={classes.buttonGroup}>
									{country.borders?.map((border) => (
										<button
											key={Math.random()}
											className={classes.borderButton}
											onClick={() => {
												selectCountry?.(countryNameResolve(border));
											}}
										>
											{countryNameResolve(border)?.name.common}
										</button>
									))}
								</div>
							</div>
						) : null}
					</div>
				</div>
			</HashLink>
		</div>
	);
}

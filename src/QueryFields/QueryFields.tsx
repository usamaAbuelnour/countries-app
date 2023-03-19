import classes from "./QueryFields.scss";
import { FaSearch } from "react-icons/fa";
import DropDown from "../UI/DropDown/DropDown";
import { useRef } from "react";

interface QueryFieldsProps {
	searchCountry: (name: string) => void;
	filterBy: (continent: string) => void;
	clear: () => void;
	darkMode: boolean;
	filterOption: string;
	setFilterOption: React.Dispatch<React.SetStateAction<string>>;
}

export default function QueryFields({
	searchCountry,
	filterBy,
	clear,
	darkMode,
	filterOption,
	setFilterOption
}: QueryFieldsProps): JSX.Element {
	const searchField = useRef(null);
	const styles = [classes.queryFields, darkMode ? classes.dark : null];
	return (
		<div className={styles.join(' ')}>
			<div className={classes.search}>
				<div className={classes.searchIcon}>
					<FaSearch />
				</div>
				<input
					ref={searchField}
					className={classes.searchField}
					type="text"
					placeholder="Search for a country ..."
					onChange={(e) => searchCountry(e.target.value)}
				/>
			</div>
			<div className={classes.filter}>
				<DropDown filterBy={filterBy} searchField={searchField} clear={clear} darkMode={darkMode} filterOption={filterOption}
				setFilterOption={setFilterOption} />
			</div>
		</div>
	);
}

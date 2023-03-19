import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import classes from "./DropDown.scss";
let dark: boolean;
const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "center",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "center",
		}}
		{...props}
	/>
))
(({ theme }) => ({
	"& .MuiPaper-root": {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		width: "50%",
		"@media (min-width: 992px)" : {
			width: '17%'
		},
		backgroundColor: dark ? 'var(--dark-blue)' : 'white',
		color: dark ? 'white' : 'black',

		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			'&:hover': dark ?  {backgroundColor: 'var(--very-dark-blue)'} : {},
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

export default function CustomizedMenus({
	filterBy,
	searchField,
	clear,
	darkMode,
	filterOption,
	setFilterOption
}: {
	filterBy: (continent: string) => void;
	searchField: React.MutableRefObject<any>;
	clear: () => void;
	darkMode: boolean;
	filterOption: string;
	setFilterOption: React.Dispatch<React.SetStateAction<string>>;
}) {
	dark = darkMode;
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	


	const styles = [classes.dropDown, darkMode ? classes.dark : null];

	return (
		<div className={styles.join(' ')}>
			<Button
				id="demo-customized-button"
				aria-controls={open ? "demo-customized-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				variant="contained"
				disableElevation
				onClick={handleClick}
				endIcon={<KeyboardArrowDownIcon />}
				className={classes.button}
			>
				{filterOption}
			</Button>
			<StyledMenu 
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem 
					onClick={() => {
						filterBy("Africa");
						handleClose();
						setFilterOption("Africa");
					}}
					disableRipple
				>
					Africa
				</MenuItem>
				<MenuItem
					onClick={() => {
						filterBy("North America");
						handleClose();
						setFilterOption("North America");
						searchField.current.value = "";
					}}
					disableRipple
				>
					North America
				</MenuItem>
				<MenuItem
					onClick={() => {
						filterBy("South America");
						handleClose();
						setFilterOption("South America");
						searchField.current.value = "";
					}}
					disableRipple
				>
					South America
				</MenuItem>
				<MenuItem
					onClick={() => {
						filterBy("Asia");
						handleClose();
						setFilterOption("Asia");
						searchField.current.value = "";
					}}
					disableRipple
				>
					Asia
				</MenuItem>
				<MenuItem
					onClick={() => {
						filterBy("Europe");
						handleClose();
						setFilterOption("Europe");
						searchField.current.value = "";
					}}
					disableRipple
				>
					Europe
				</MenuItem>
				<MenuItem
					onClick={() => {
						filterBy("Oceania");
						handleClose();
						setFilterOption("Oceania");
						searchField.current.value = "";
					}}
					disableRipple
				>
					Oceania
				</MenuItem>
			</StyledMenu>
			<button
				className={classes.clear}
				onClick={() => {
					setFilterOption("Filter by Region");
					clear();
					searchField.current.value = "";
				}}
			>
				Clear
			</button>
		</div>
	);
}

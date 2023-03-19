import classes from "./ToolBar.scss";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

interface ToolBarProps {
	darkMode: boolean;
	modeToggle: () => void;
}

export default function ToolBar(props: ToolBarProps): JSX.Element {
	const styles = [classes.toolBar, props.darkMode ? classes.dark : null];
	return (
		<div className={styles.join(' ')} id="toolBar">
			<div className={classes.container}>
				<h4 className={classes.logo}>Where in the world?</h4>
				<div className={classes.themeButton} onClick={props.modeToggle}>
					<div className={classes.modeIcon}>
						{props.darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
					</div>
					<div className={classes.mode}>{props.darkMode ? 'Light Mode' : 'Dark Mode'}</div>
				</div>
			</div>
		</div>
	);
}

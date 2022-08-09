import { Component } from 'react';
import styles from './Navbar.module.css';

type NavbarHeaderProps = {
	/**
	 * The label of the header
	 */
	label: string;
};

/**
 * A texet header for a Navbar. Goes on the left and vanishes in mobile mode.
 */
export default class NavbarHeader extends Component<NavbarHeaderProps> {
	render() {
		return (
			<div className={styles.header}>
				<h1>{this.props.label}</h1>
			</div>
		);
	}
}

import { Component } from 'react';
import styles from './Navbar.module.css';

type NavbarProps = {
	/**
	 * Name of the current classroom
	 */
	classroomName: string;
};

/**
 * Navbar for managing & working with the current classroom
 */
export default class Navbar extends Component<NavbarProps> {
	render() {
		return (
			<nav className={styles.navbar}>
				<div className={styles.left}>
					<h1>{this.props.classroomName}</h1>
				</div>
				<div className={styles.right}>
					<a href="#">Navbar test</a>
				</div>
			</nav>
		);
	}
}

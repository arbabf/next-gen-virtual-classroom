import { Component, PropsWithChildren, ReactNode } from 'react';
import styles from './Navbar.module.css';

/**
 * Navbar for managing & working with the current classroom
 */
export default class Navbar extends Component<PropsWithChildren> {
	render(): ReactNode {
		return <nav className={styles.navbar}>{this.props.children}</nav>;
	}
}

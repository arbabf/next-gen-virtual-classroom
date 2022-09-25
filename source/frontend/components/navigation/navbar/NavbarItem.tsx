import { Component, MouseEventHandler, PropsWithChildren, ReactNode } from 'react';
import styles from './Navbar.module.css';

type NavbarItemProps = {
	/**
	 * Click event listener for the item
	 */
	onClick?: MouseEventHandler;

	/**
	 * Flags if mobile-only item
	 */
	mobile?: boolean;

	/**
	 * Flags if active (currently at this location)
	 */
	active?: boolean;

	/**
	 * HTML ID unique to the item
	 */
	id?: string;
};

/**
 * An item shown in a Navbar.
 */
export default class NavbarItem extends Component<PropsWithChildren<NavbarItemProps>> {
	render(): ReactNode {
		let classes = styles.item;

		if (this.props.mobile === true) classes += ` ${styles.mobile}`;
		if (this.props.active === true) classes += ` ${styles.active}`;

		return (
			<div className={classes} onClick={this.props.onClick} id={this.props.id}>
				{this.props.children}
			</div>
		);
	}
}

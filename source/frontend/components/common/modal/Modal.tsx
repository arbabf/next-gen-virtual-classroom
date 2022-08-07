import { Component, PropsWithChildren } from 'react';
import styles from './Modal.module.css';

type ModalProps = {
	/**
	 * Whether the modal is visible or not.
	 */
	open?: boolean;
};

/**
 * Represents a modal window, which is similar to a Card, but it is overlayed on the app and can be
 * dismissed either with the close button, clicking outside of it, or pressing an action button.
 */
export default class Modal extends Component<PropsWithChildren<ModalProps>> {
	render() {
		let classes = styles.modal;

		if (this.props.open === true) classes += ` ${styles.open}`;

		return <div className={classes}>{this.props.children}</div>;
	}
}

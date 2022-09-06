import { Component, PropsWithChildren } from 'react';
import styles from './ScreenEditor.module.css';

/**
 * Displays all of the editing/settings of a screen within the display/panel space.
 */
export class ScreenEditor extends Component<PropsWithChildren> {
	render() {
		return <div className={styles.editor}>{this.props.children}</div>;
	}
}

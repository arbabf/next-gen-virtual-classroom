import { Component, PropsWithChildren } from 'react';
import styles from './ScreenSpace.module.css';

/**
 * Holds multiple screen containers together
 */
export class ScreenSpace extends Component<PropsWithChildren> {
	render() {
		return <div className={styles.container}>{this.props.children}</div>;
	}
}

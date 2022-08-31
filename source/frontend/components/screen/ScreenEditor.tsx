import { Component, PropsWithChildren } from 'react';
import styles from './ScreenEditor.module.css';

export class ScreenEditor extends Component<PropsWithChildren> {
	render() {
		return <div className={styles.editor}>{this.props.children}</div>;
	}
}

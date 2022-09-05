import { Component, PropsWithChildren } from 'react';
import styles from './ContextMenu.module.css';

export class ContextMenu extends Component<PropsWithChildren<{}>> {
	render() {
		return <div className={styles.contextMenu}>{this.props.children}</div>;
	}
}

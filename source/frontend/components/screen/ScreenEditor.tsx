import { Component, PropsWithChildren, ReactNode } from 'react';
import styles from './ScreenEditor.module.css';

type ScreenEditorProps = {
	fileShareSpace?: ReactNode;
	mainList?: ReactNode;
}

/**
 * Displays all of the editing/settings of a screen within the display/panel space.
 */
export class ScreenEditor extends Component<ScreenEditorProps> {
	render() {
		return <div className={styles.editor}>
			{this.props.fileShareSpace}
			{this.props.mainList}
		</div>;
	}
}

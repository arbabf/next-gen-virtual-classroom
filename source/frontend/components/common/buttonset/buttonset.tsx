import { Component, PropsWithChildren } from 'react';
import styles from './ButtonSet.module.css';

/**
 * A set of buttons in a row. Can flow into a stack of buttons if the screen is narrow.
 */
class ButtonSet extends Component<PropsWithChildren> {
	render() {
		return <div className={styles.buttons}>{this.props.children}</div>;
	}
}

export default ButtonSet;

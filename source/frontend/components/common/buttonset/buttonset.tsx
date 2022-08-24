import { Component, PropsWithChildren } from 'react';
import styles from './ButtonSet.module.css';

type ButtonSetProps = {
	/**
	 * Additional classes to apply to the button set.
	 */
	className?: string;
};

/**
 * A set of buttons in a row. Can flow into a stack of buttons if the screen is narrow.
 */
class ButtonSet extends Component<PropsWithChildren<ButtonSetProps>> {
	render() {
		let classes = styles.buttons;

		if (this.props.className) {
			classes += ' ' + this.props.className;
		}

		return <div className={classes}>{this.props.children}</div>;
	}
}

export default ButtonSet;

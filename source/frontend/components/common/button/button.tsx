import { Component, MouseEventHandler, PropsWithChildren } from 'react';
import styles from './Button.module.css';

/**
 * Button properties.
 */
type ButtonProps = {
	/**
	 * A click handler to make this button do something should it be pressed.
	 */
	onClick?: MouseEventHandler<HTMLButtonElement>;

	/**
	 * Whether to show button as disabled or not. Defaults to false if not specified.
	 */
	disabled?: boolean;

	/**
	 * Don't show a background fill to make it blend in better. Defaults to false.
	 */
	unfilled?: boolean;

	/**
	 * Whether button is blue on white
	 */
	inverted?: boolean;

	/**
	 * Whether this is a slimmed-down button
	 */
	slim?: boolean;

	/**
	 * Whether the button should be shown in a less-saturated manner.
	 */
	light?: boolean;

	/**
	 * Whether to stack contents vertically
	 */
	vertical?: boolean;

	/**
	 * Additional classes
	 */
	className?: string;
};

/**
 * Represents a simple button containing a label and icons at either end. It accepts a click
 * listener.
 *
 * It can be disabled (preventing clicks and greying itself out) and it can have a filled in or
 * unfilled style.
 */
class Button extends Component<PropsWithChildren<ButtonProps>> {
	render() {
		let classes = styles.button;

		if (this.props.unfilled) classes += ' ' + styles.unfilled;
		if (this.props.inverted) classes += ' ' + styles.inverted;
		if (this.props.slim) classes += ' ' + styles.slim;
		if (this.props.light) classes += ' ' + styles.light;
		if (this.props.vertical) classes += ' ' + styles.vertical;
		if (this.props.className) classes += ' ' + this.props.className;

		return (
			<button
				className={classes}
				onClick={this.props.disabled ? undefined : this.props.onClick}
				disabled={this.props.disabled}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;

import { Component, MouseEventHandler, PropsWithChildren } from 'react';
import Icon from '../icon/icon';
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
};

/**
 * State of a button that can be dynamically controlled.
 *
 * e.g. a send button can be disabled until a message is written
 */
type ButtonState = {
	disabled: boolean;
};

/**
 * Represents a simple button containing a label and icons at either end. It accepts a click
 * listener.
 *
 * It can be disabled (preventing clicks and greying itself out) and it can have a filled in or
 * unfilled style.
 */
class Button extends Component<PropsWithChildren<ButtonProps>, ButtonState> {
	constructor(props: ButtonProps) {
		super(props);

		this.state = {
			// sets to false by default (not defined in props), otherwise use the props value
			disabled: this.props.disabled === undefined ? false : this.props.disabled,
		};
	}

	render() {
		return (
			<button
				className={
					styles.button +
					' ' +
					(this.props.unfilled === undefined ? styles.filled : styles.unfilled)
				}
				onClick={this.state.disabled ? undefined : this.props.onClick}
				disabled={this.state.disabled}
			>
				{this.props.children}
			</button>
		);
	}
}

export default Button;

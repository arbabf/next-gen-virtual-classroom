import { Component, MouseEventHandler } from 'react';
import styles from './Panel.module.css';

/**
 * Panel properties.
 */
 type PanelProps = {

    label: string;
	/**
	 * A click handler to make this button do something should it be pressed.
	 */
	onClick?: MouseEventHandler<HTMLButtonElement>;
};

class Panel extends Component<PanelProps> {
	constructor(props: PanelProps) {
		super(props);
	}

	render() {
		return (
			<button
				className={
					styles.screen
				}
				onClick={this.props.onClick}
			>
                {this.props.label}
			</button>
		);
	}
}

export default Panel;
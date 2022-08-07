import { Component, MouseEventHandler } from 'react';
import styles from './Panel.module.css';

/**
 * Panel properties.
 */
 type PanelProps = {

    label: string;
	expanded?: boolean;
	/**
	 * A click handler to make this button do something should it be pressed.
	 */
	onClick?: MouseEventHandler<HTMLElement>;
};

class Panel extends Component<PanelProps> {
	constructor(props: PanelProps) {
		super(props);
	}

	render() {
		return (
			<div
				className={
					styles.screen + ' ' + (this.props.expanded === undefined ? styles.screen : styles.expandedscreen)
				}
				onClick={this.props.onClick}				
			>
                {this.props.label}
			</div>
		);
	}
}

export default Panel;
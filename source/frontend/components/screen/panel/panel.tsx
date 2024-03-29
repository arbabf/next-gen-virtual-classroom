/**
 * Panels. These can be clicked to be expanded and clicked again to be shrunken, but by default they do nothing.
 * Last modified: 11/08/2022
 */

import { Component } from 'react';
import styles from './Panel.module.css';

/**
 * Panel properties.
 */
type PanelProps = {
	expanded?: boolean;
	expandable?: boolean;
	media: boolean;
	label: string;
};

/**
 * Panel state - dynamically assigned.
 */
type PanelState = {
	expanded: boolean;
};

class Panel extends Component<PanelProps, PanelState> {
	constructor(props: PanelProps) {
		super(props);
		this.state = {
			expanded: this.props.expanded === undefined ? false : this.props.expanded,
		};
	}

	expandScreen = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	render() {
		let classes = styles.screen;

		if (this.state.expanded) classes += " " + styles.expandedscreen;
		if (this.props.media) classes += " " + styles.mediaOn;
		if (this.props.expandable) classes += " " + styles.expandable;

		return (
			<div
				className={
					classes
				}
				onClick={this.props.expandable === true ? this.expandScreen : undefined}
			>
				{this.props.label}
			</div>
		);
	}
}

export default Panel;

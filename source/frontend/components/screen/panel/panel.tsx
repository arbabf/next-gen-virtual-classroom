/**
 * Panels. These can be clicked to be expanded and clicked again to be shrunken, but by default they do nothing.
 * Author: Arbab Ahmed, Group 15 [Project 5]
 * Last modified: 11/08/2022
 */

import { Component } from 'react';
import React from 'react';
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
}

class Panel extends Component<PanelProps, PanelState> {
	constructor(props: PanelProps) {
		super(props);
		this.state = {
					expanded: this.props.expanded === undefined ? false : this.props.expanded
					}
	} 

	expandScreen = () => { 
		this.setState({expanded: !this.state.expanded})
	}
	
	render() {
		return (
			<div
				className={
					styles.screen + 
					' ' + 
					(this.state.expanded === false ? styles.screen : styles.expandedscreen)
				}
				onClick={this.props.expandable === true ? this.expandScreen : undefined}
				media={this.props.media.toString()} // State doesn't work here. Why? I don't know. But we're going to use props anyway.
				expandable={this.props.expandable === undefined ? "false" : this.props.expandable.toString()}
			>
                {this.props.label}
			</div>
		);
	}
}

export default Panel;
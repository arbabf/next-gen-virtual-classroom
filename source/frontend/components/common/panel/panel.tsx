/**
 * Panels. These can be clicked to be expanded and clicked again to be shrunken.
 * Author: Arbab Ahmed, Group 15 [Project 5]
 * Last modified: 09/08/2022
 */

import { Component } from 'react';
import React from 'react';
import styles from './Panel.module.css';

/**
 * Panel properties.
 */
 type PanelProps = {
    label: string;
	expanded?: boolean;
};

class Panel extends Component<PanelProps> {
	constructor(props: PanelProps) {
		super(props);
		this.state = {expanded: this.props.expanded === undefined ? false : this.props.expanded}
	} 

	// If using vscode with ts-react plugin, this will throw an error (alongside the classname code). But it works perfectly and is the way we should do it.
	expandScreen = () => { 
		this.setState({expanded: !this.state.expanded})
	}
	
	render() {
		return (
			<div
				className={
					styles.screen + ' ' + (this.state.expanded === false ? styles.screen : styles.expandedscreen)
				}
				onClick={this.expandScreen}
			>
                {this.props.label}
			</div>
		);
	}
}

export default Panel;
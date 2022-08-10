/**
 * Screen container; contains and controls a Panel (the screen) and the buttons that interact with it.
 * Author: Arbab Ahmed, Group 15 [Project 5]
 * Last modified: 10/08/2022
 */

import { Component } from 'react';
import React from 'react';
import styles from './ScreenContainer.module.css';
import Button from '../../common/button/button';
import ButtonSet from '../../common/buttonset/buttonset';
import Card from '../../common/card/card';
import Panel from '../../common/panel/panel';

/**
 * Screen container props. Mostly useless.
 */
type ScreenContainerProps = {
    screenOn?: boolean;
    mediaOn?: boolean;
}

class ScreenContainer extends Component<ScreenContainerProps> {
    constructor(props: ScreenContainerProps) {
        super(props);
        this.state = {
            screenOn: this.props.screenOn === undefined ? false : this.props.screenOn,
            mediaOn: this.props.mediaOn === undefined ? false : this.props.mediaOn
        }
    } 
    
    toggleScreen = () => {
        this.setState({screenOn: !this.state.screenOn})
    }

    toggleMedia = () => {
        this.setState({mediaOn: !this.state.mediaOn})
    }

    render() {
        return (
            <div
                className={
                    styles.container
                }
            >
                <Card>
					<h1>Component test</h1>

					<p>This is a paragraph within a card.</p>

					<p>Below is a set of buttons.</p>

					<ButtonSet>
						<Button onClick={this.toggleScreen} label={this.state.screenOn ? "Hide screen" : "Show screen"}/>
						<Button onClick={this.toggleMedia} label="Change screen medium" />
					</ButtonSet>
				</Card>
				{this.state.screenOn ? <Panel label="Screen" media={this.state.mediaOn}/> : null}
            </div>
        );
    }
}
 
export default ScreenContainer;
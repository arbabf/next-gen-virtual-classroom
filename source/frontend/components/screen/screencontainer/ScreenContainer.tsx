/**
 * Screen container; contains and controls a Panel (the screen) and the buttons (and other Panels) that interact with it.
 * Author: Arbab Ahmed, Group 15 [Project 5]
 * Last modified: 16/08/2022
 */

import { Component } from 'react';
import styles from './ScreenContainer.module.css';
import Button from '../../common/button/button';
import ButtonSet from '../../common/buttonset/buttonset';
import Card from '../../common/card/card';
import Panel from '../panel/panel';

/**
 * Screen container props.
 */
type ScreenContainerProps = {
	/**
	 * Whether the screen initially starts on
	 */
	screenOn?: boolean;
	/**
	 * Whether the media is marked as initially on
	 */
	mediaOn?: boolean;
	/**
	 * Whether the media selector is marked initially as on
	 */
	mediaSelectorOn?: boolean;
};

/**
 * Defines the state for the screen container.
 *
 * Can be defined inline but this is cleaner.
 */
type ScreenContainerState = {
	/**
	 * Screen activity state
	 */
	screenOn: boolean;
	/**
	 * Whether there is currently active media
	 */
	mediaOn: boolean;
	/**
	 * Whether the media selector is open
	 */
	mediaSelectorOn: boolean;
};

class ScreenContainer extends Component<ScreenContainerProps, ScreenContainerState> {
	constructor(props: ScreenContainerProps) {
		super(props);
		this.state = {
			screenOn: this.props.screenOn === undefined ? false : this.props.screenOn,
			mediaOn: this.props.mediaOn === undefined ? false : this.props.mediaOn,
			mediaSelectorOn:
				this.props.mediaSelectorOn === undefined ? false : this.props.mediaSelectorOn,
		};
	}

	toggleScreen = () => {
		this.setState({ screenOn: !this.state.screenOn });
		if (this.state.screenOn) {
			this.setState({ mediaSelectorOn: false }); // Screen selector shouldn't exist if the screen doesn't exist.
		}
	};

	toggleMedia = () => {
		this.setState({ mediaOn: !this.state.mediaOn });
	};

	toggleMediaSelector = () => {
		this.setState({ mediaSelectorOn: !this.state.mediaSelectorOn });
	};

	render() {
		return (
			<div className={styles.container}>
				<Card>
					<h1>Component test</h1>

					<p>This is a paragraph within a card.</p>

					<p>Below is a set of buttons.</p>

					<ButtonSet>
						<Button onClick={this.toggleScreen}>
							<span>{this.state.screenOn ? 'Hide screen' : 'Show screen'}</span>
						</Button>
						{this.state.screenOn ? (
							<Button onClick={this.toggleMediaSelector}>
								<span>{'Change screen medium'}</span>
							</Button>
						) : null}
					</ButtonSet>
				</Card>
				{this.state.screenOn ? (
					<Panel label="Screen" media={this.state.mediaOn} expandable />
				) : null}
				{this.state.mediaSelectorOn ? (
					<Card>
						<Panel label="Screen Example" media={false} />
						<Button onClick={this.toggleMedia}>
							<span>{'Toggle media'}</span>
						</Button>
					</Card>
				) : null}
			</div>
		);
	}
}

export default ScreenContainer;

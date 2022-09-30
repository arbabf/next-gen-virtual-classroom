/**
 * Screen container; contains and controls a Panel (the screen) and the buttons (and other Panels) that interact with it.
 * Author: Arbab Ahmed, Group 15 [Project 5]
 * Last modified: 08/09/2022
 */

import { Component } from 'react';
import styles from './ScreenContainer.module.css';
import Button from '../../common/button/button';
import ButtonSet from '../../common/buttonset/buttonset';
import Panel from '../panel/panel';
import Icon from '../../common/icon/icon';
import { ScreenEditor } from '../ScreenEditor';

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
			screenOn: this.props.screenOn || false,
			mediaOn: this.props.mediaOn || false,
			mediaSelectorOn: !this.props.mediaOn || false,
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
		let classes = styles.container;

		if (this.state.mediaOn) {
			classes += ' ' + styles.active;
		}

		// screen editor parts
		const mainList = <div className={styles.editorMainList}>
			<Button onClick={this.toggleMedia} light>
				<Icon iconName="screen_share" />
				<span>Share screen</span>
			</Button>
			<Button light disabled>
				<Icon iconName="web_asset" />
				<span>Embed a page</span>
			</Button>
			<Button light disabled>
				<Icon iconName="whiteboard" />
				<span>Whiteboard</span>
			</Button>
			<Button light disabled>
				<Icon iconName="apps" />
				<span>More media types</span>
			</Button>
		</div>;

		const fileDrop = <div className={styles.editorFileDrop}>
			<Button light vertical disabled>
				<Icon iconName="file_upload" size="2.5em" />
				<span>Upload a file</span>
			</Button>
		</div>

		return (
			<details className={classes}>
				<summary>
					<Icon iconName="present_to_all" size="1.5em" />
					{this.state.mediaOn ? <span>Sharing media</span> : <span>Screen available</span>}
					<Icon iconName="expand_more" size="1.5em" />
				</summary>
				{/* {this.state.screenOn && ( // Replace with this.state.screenOn when our context gets its functionality. As of now it just has the screen on forever.
					<Panel label="Screen" media={this.state.mediaOn} expandable />
				)} */}
				<div className={styles.screenContent}>
					{!this.state.mediaOn || this.state.mediaSelectorOn ? (
						<ScreenEditor mainList={mainList} fileShareSpace={fileDrop} />
					) : (
						<Panel label="Screen" media={this.state.mediaOn} expandable />
					)}
					{this.state.mediaOn &&
						<ButtonSet className={styles.buttons}>
							<Button onClick={this.toggleMediaSelector} inverted>
								<Icon iconName={this.state.mediaSelectorOn ? 'arrow_back' : 'present_to_all'} />
								<span>{this.state.mediaSelectorOn ? 'Show screen' : 'Change share'}</span>
							</Button>
							<Button onClick={this.toggleMedia} inverted>
								<Icon iconName="cancel_presentation" />
								<span>Stop sharing</span>
							</Button>
						</ButtonSet>
					}
				</div>
			</details>
		);
	}
}
export default ScreenContainer;

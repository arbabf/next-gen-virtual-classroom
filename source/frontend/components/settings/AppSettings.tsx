import { Component } from 'react';
import { LocalSettings } from '../../lib/settings/LocalSettings';
import { LocalSettingsManager } from '../../lib/settings/LocalSettingsManager';
import SwitchSetting from './items/SwitchSetting';

/**
 * State of existing settings.
 */
type AppSettingsState = {
	/**
	 * Local app settings
	 */
	localSettings: LocalSettings;
};

/**
 * Settings specifically for configuring the app
 */
export default class AppSettings extends Component<{}, AppSettingsState> {
	// default state values before we retrieve their real values from respective locations
	state = {
		localSettings: new LocalSettings(),
	};

	componentDidMount() {
		// get local settings from local storage
		this.setState({ localSettings: LocalSettingsManager.getAll() });
	}

	render() {
		return (
			<>
				<section>
					<h3>Appearance</h3>
					<SwitchSetting
						label="Enable wide UI"
						description="Makes floating windows span the whole screen"
						value={this.state.localSettings.wideUI}
						onChange={(event) => this.setWideUI(event.currentTarget.checked)}
					/>
				</section>

				<section>
					<h3>Audio and Video</h3>
				</section>
			</>
		);
	}

	/**
	 * Sets wide UI setting, updates state, and saves to local storage.
	 *
	 * @param newValue new value of wide UI setting
	 */
	private setWideUI(newValue: boolean): void {
		let newSettings = { ...this.state.localSettings };
		newSettings.wideUI = newValue;

		// update settings and state
		LocalSettingsManager.setAll(newSettings);
		this.setState({ localSettings: newSettings });
	}
}

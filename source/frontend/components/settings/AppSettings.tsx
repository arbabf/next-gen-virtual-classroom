import { Component } from 'react';
import SwitchSetting from './items/SwitchSetting';

/**
 * Local app settings that only affect current device.
 */
type LocalSettings = {
	/**
	 * If true, UI always spans the screen, even if it's very wide.
	 */
	wideUI: boolean;
};

let defaultLocalSettings: LocalSettings = {
	wideUI: false,
};

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
		localSettings: { wideUI: false },
	};

	componentDidMount() {
		// get local settings from local storage
		this.setState({ localSettings: this.getLocalSettings() });
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
	 * Retrieves local settings from local storage.
	 *
	 * Note: if no settings are set, the default settings will be saved to local storage.
	 *
	 * @returns Local settings from local storage, or default settings if none exist
	 */
	private getLocalSettings(): LocalSettings {
		// get local settings from local storage
		let settingsString = localStorage.getItem('localSettings');

		if (settingsString === null) {
			// if there are no local settings, return default settings save them
			this.setLocalSettings(defaultLocalSettings);
			return defaultLocalSettings;
		} else {
			return JSON.parse(settingsString) as LocalSettings;
		}
	}

	/**
	 * Saves given local settings to local storage.
	 *
	 * @param localSettings Local settings to save
	 */
	private setLocalSettings(localSettings: LocalSettings): void {
		// put local settings in local storage
		localStorage.setItem('localSettings', JSON.stringify(localSettings));
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
		this.setLocalSettings(newSettings);
		this.setState({ localSettings: newSettings });
	}
}

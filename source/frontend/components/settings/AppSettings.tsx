import { Component } from "react";

/**
 * State of existing settings.
 */
type AppSettingsState = {
	/**
	 * If true, the UI always spans the screen, even if it's very wide.
	 */
	wideUI: boolean;
}

/**
 * Settings specifically for configuring the app
 */
export default class AppSettings extends Component<{}, AppSettingsState> {
	// default state values before we retrieve their real values from respective locations
	state = {
		wideUI: false
	}

	componentDidMount() {
		// get local settings from local storage
	}

	render() {
		return (
			<section>

			</section>
		)
	}
}
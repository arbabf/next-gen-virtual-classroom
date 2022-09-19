import { LocalSettings } from "./LocalSettings";

/**
 * Helps manage retrieval and storage of app settings.
 */
export class LocalSettingsManager {
	/**
	 * Retrieves user's app settings from localStorage
	 * @returns user's app settings
	 */
	static getAll(): LocalSettings {
		const settings = localStorage.getItem("settings");
		if (settings) {
			return LocalSettings.fromObject(settings);
		} else {
			return new LocalSettings();
		}
	}

	/**
	 * Stores user's app settings in local storage
	 * @param settings new settings to store
	 */
	static setAll(settings: LocalSettings) {
		localStorage.setItem("settings", JSON.stringify(settings));
	}
}
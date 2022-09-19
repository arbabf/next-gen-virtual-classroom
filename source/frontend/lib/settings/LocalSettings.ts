export class LocalSettings {
	/**
	 * The user's preferred language
	 */
	language: string;

	/**
	 * The user's preferred theme
	 */
	theme: 'system' | 'light' | 'dark';

	/**
	 * Whether to show wide UI or not (make constrained items fill the screen)
	 */
	wideUI: boolean;

	constructor(language: string = 'en-AU', theme: 'system' | 'light' | 'dark' = 'system', wideUI: boolean = false) {
		this.language = language;
		this.theme = theme;
		this.wideUI = wideUI;
	}

	static fromObject(json: string): LocalSettings {
		const obj = JSON.parse(json);
		return new LocalSettings(obj.language, obj.theme, obj.wideUI);
	}
}
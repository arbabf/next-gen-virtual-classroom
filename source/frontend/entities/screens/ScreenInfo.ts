export class ScreenInfo {
	/**
	 * Unique screen ID
	 */
	id: string;

	/**
	 * A label given to the screen
	 */
	name: string;

	constructor(id: string, name: string) {
		this.id = id;
		this.name = name;
	}
}

export const testScreenInfo = new ScreenInfo('0', 'Test Screen');

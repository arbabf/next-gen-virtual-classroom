import { v4 as uuidv4 } from 'uuid';

/**
 * Static info about a screen
 */
export class ScreenInfo {
	/**
	 * Unique screen ID
	 */
	id: string;

	/**
	 * A label given to the screen
	 */
	name: string;

	constructor(name: string, id: string = uuidv4()) {
		this.id = id;
		this.name = name;
	}
}

export const testScreenInfo = new ScreenInfo('Test Screen', '0');

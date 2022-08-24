import { Resource } from './Resource';
import { v4 as uuidv4 } from 'uuid';

/**
 * A folder holds multiple resources
 */
export class Folder {
	/**
	 * Unique ID
	 */
	id: string;

	/**
	 * Resources within folder
	 */
	contents: Resource[];

	/**
	 * Folder label
	 */
	name: string;

	constructor(contents: Resource[], name: string, id?: string) {
		this.id = id || uuidv4();
		this.contents = contents;
		this.name = name;
	}
}

export const testFolder = new Folder([], 'Test Folder');

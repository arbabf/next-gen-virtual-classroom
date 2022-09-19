import { v4 as uuidv4 } from 'uuid';

/**
 * An organisation encompassing rooms and users. All users and rooms are associated with an org.
 */
export class Organisation {
	id: string;
	name: string;
	description?: string;

	/**
	 * Endpoint for querying the server for the list of rooms in this organisation
	 */
	directoryEndpoint: string;

	/**
	 * default server for rooms
	 */
	defaultServer: string;

	constructor(name: string, directoryEndpoint: string, defaultServer: string, description?: string, id: string = uuidv4()) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.directoryEndpoint = directoryEndpoint;
		this.defaultServer = defaultServer;
	}
}

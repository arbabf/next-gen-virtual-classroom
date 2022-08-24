import { v4 as uuidv4 } from 'uuid';

/**
 * An organisation encompassing rooms and users. All users and rooms are associated with an org.
 */
export class Organisation {
	id: string;
	name: string;
	description?: string;

	constructor(name: string, description?: string, id: string = uuidv4()) {
		this.id = id;
		this.name = name;
		this.description = description;
	}
}

export const testOrganisation = new Organisation(
	'Test Organisation',
	'Organisation made for testing purposes',
	'0'
);

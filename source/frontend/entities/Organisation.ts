/**
 * An organisation encompassing rooms and users. All users and rooms are associated with an org.
 */
export class Organisation {
	id: string;
	name: string;
	description?: string;

	constructor(id: string, name: string, description?: string) {
		this.id = id;
		this.name = name;
		this.description = description;
	}
}

export const testOrganisation = new Organisation(
	'0',
	'Test Organisation',
	'Organisation made for testing purposes'
);

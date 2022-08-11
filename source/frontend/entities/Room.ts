import { Organisation, testOrganisation } from './Organisation';

/**
 * Represents a room, such as a Classroom, where meetings, classes, etc. are held with
 * participants.
 *
 * All rooms are hosted by their respective organisation.
 */
export class Room {
	/**
	 * Unique room ID
	 */
	id: string;

	/**
	 * A label given to the room
	 */
	name: string;

	/**
	 * Short description
	 */
	description: string;

	/**
	 * Organisations group rooms
	 */
	organisation: Organisation;

	constructor(id: string, name: string, description: string, organisation: Organisation) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.organisation = organisation;
	}
}

export const testRoom = new Room(
	'0',
	'Test Room',
	'Room made for testing purposes',
	testOrganisation
);

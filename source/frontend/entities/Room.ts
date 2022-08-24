import { Organisation, testOrganisation } from './Organisation';
import { v4 as uuidv4 } from 'uuid';

/**
 * Represents a room, such as a Classroom, where meetings, classes, etc. are held with
 * participants.
 *
 * All rooms are hosted by their respective organisation.
 */
export class RoomInfo {
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

	constructor(
		name: string,
		description: string,
		organisation: Organisation,
		id: string = uuidv4()
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.organisation = organisation;
	}
}

export const testRoom = new RoomInfo(
	'Test Room',
	'Room made for testing purposes',
	testOrganisation,
	'0'
);

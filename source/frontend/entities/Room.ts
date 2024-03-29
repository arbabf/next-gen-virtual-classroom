import { Organisation } from './Organisation';
import { v4 as uuidv4 } from 'uuid';
import { RoomLayout } from './roomdata/RoomLayout';
import { RoomGroup } from './org/RoomGroup';

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

	/**
	 * Info about the room's current layout
	 */
	layout: RoomLayout;

	/**
	 * Address of the room's server
	 */
	server: string;

	/**
	 * The group this room is in. If not defined, it's top-level or shown aside.
	 */
	group?: RoomGroup;

	constructor(
		name: string,
		description: string,
		organisation: Organisation,
		group?: RoomGroup,
		id: string = uuidv4(),
		layout = new RoomLayout(),
		server?: string
	) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.organisation = organisation;
		this.group = group;
		this.layout = layout;
		this.server = server || organisation.defaultServer;
	}
}

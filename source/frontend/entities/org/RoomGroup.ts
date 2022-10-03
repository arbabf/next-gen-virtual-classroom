import { v4 as uuidv4 } from 'uuid';
import { RoomGroupType } from './RoomGroupType';

/**
 * Defines a grouping of rooms or other groups.
 * 
 * This groups classrooms into units such as floors, buildings etc.
 * 
 * Each RoomGroup has a GroupLevel, which defines its place in the organisation's hierarchy.
 */
export class RoomGroup {
	/**
	 * ID of this room group
	 */
	id: string;

	/**
	 * Name of this room group
	 */
	name: string;

	/**
	 * Description of this room group
	 */
	description: string;

	/**
	 * The type of this grouping
	 */
	type: RoomGroupType;

	/**
	 * The parents of this group. Ordered so that the last element is the immediate parent.
	 * 
	 * This is in the style of domain names, so the least-significant item is the lowest tier.
	 */
	parents: RoomGroup[];

	constructor(name: string, description: string, type: RoomGroupType, parents: RoomGroup[] = [], id: string = uuidv4()) {
		this.id = id;
		this.name = name;
		this.description = description;
		this.type = type;
		this.parents = parents;
	}
}
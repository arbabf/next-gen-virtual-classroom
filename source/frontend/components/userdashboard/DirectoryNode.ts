import { RoomGroup } from "../../entities/org/RoomGroup";
import { RoomInfo } from "../../entities/Room";

/**
 * A node within the room directory. Used to help construct the full hierarchy from a room list.
 */
export class DirectoryNode {
	/**
	 * ID of this node retrieved from its entity
	 */
	id: string;

	/**
	 * Entity to attach to this node
	 */
	entity: RoomGroup | RoomInfo;

	/**
	 * Parent of this node
	 */
	parent?: DirectoryNode;

	/**
	 * Children of this node
	 */
	children: DirectoryNode[];

	constructor(entity: RoomGroup | RoomInfo) {
		this.id = entity.id;
		this.entity = entity;
		this.children = [];
	}
}
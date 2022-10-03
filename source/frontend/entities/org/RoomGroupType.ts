/**
 * Defines a type of room group, such as a floor
 */
export class RoomGroupType {
	/**
	 * The name of the level
	 */
	name: string;

	/**
	 * Description of the level
	 */
	description: string;

	/**
	 * Constructor for a group level
	 * @param name The name of the level
	 * @param description A short description about it
	 */
	constructor(name: string, description: string) {
		this.name = name;
		this.description = description;
	}


}
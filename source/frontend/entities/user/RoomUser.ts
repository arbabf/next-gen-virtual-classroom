import { Avatar } from "../avatar/Avatar";
import { Capabilities } from "../roles/Capabilities";
import { Participant } from "../roles/Participant";
import { Role } from "../roles/Role";
import { User } from "../User";

/**
 * Per-room user information, including avatar, roles, etc.
 */
export class RoomUser {
	/**
	 * The user's global info
	 */
	user: User;

	/**
	 * User's room-specific avatar
	 */
	avatar?: Avatar;

	/**
	 * User's room-specific name
	 */
	name?: string;

	/**
	 * User's role
	 */
	role: Role;

	constructor(user: User, role: Role = new Participant()) {
		this.user = user;
		this.role = role;
	}

	getCapabilities(): Capabilities[] {
		return this.role.capabilities;
	}
}
import { Avatar } from "../avatar/Avatar";
import { Capabilities } from "../roles/Capabilities";
import { Participant } from "../roles/Participant";
import { Role } from "../roles/Role";
import { User } from "../User";
import { RoomUserState } from "./RoomUserState";

/**
 * Per-room user information, including avatar, roles, etc.
 */
export class RoomUser {
	/**
	 * The user's global info
	 */
	globalInfo: User;

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

	/**
	 * Room user state
	 */
	state?: RoomUserState;

	constructor(user: User, role: Role = new Participant()) {
		this.globalInfo = user;
		this.role = role;
	}

	/**
	 * Get caps
	 */
	getCapabilities(): Capabilities[] {
		return this.role.capabilities;
	}

	/**
	 * Gets user's avatar. If they have a room-specific avatar, that is selected.
	 * 
	 * Otherwise, the user's preferred avatar is selected.
	 * 
	 * @returns user's per-room avatar or their preferred global one
	 * @see User.getPeferredAvatar
	 */
	getAvatar(): Avatar {
		return this.avatar || this.globalInfo.getPeferredAvatar();
	}

	/**
	 * Returns copy of this user with new state.
	 * 
	 * @param state new user state to attach
	 * @returns a copy of this with state
	 */
	withState(state: RoomUserState) {
		let userWithState = this;
		userWithState.state = state;
		return userWithState;
	}
}